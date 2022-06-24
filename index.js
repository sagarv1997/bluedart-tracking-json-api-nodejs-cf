const axios = require("axios");
const xmlConvert = require("xml-js");

const CONSTANTS = require("./constants");
const Shipment = require("./models/shipment");
const { sequelize } = require("./database/sql");
const { save, bulkSave } = require("./repository/ShipmentRepository");

try {
  sequelize.authenticate();
  sequelize.sync();
} catch (error) {}

exports.getBluedartShipmentStatus = async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");

  try {
    let { trackingId, checkpoints = false } = req.body;
    let bulk = false;
    trackingArray = "";

    if (req.method === "OPTIONS") {
      res.set("Access-Control-Allow-Methods", "POST");
      res.set("Access-Control-Allow-Headers", "Content-Type");
      res.set("Access-Control-Max-Age", "3600");
      res.status(204).send("");
    }

    // Generating Tracking number for Bulk shipment
    if (trackingId instanceof Array) {
      bulk = true;
      trackingId.forEach((id) => (trackingArray = trackingArray + id + ","));
      if (trackingId.length > 1) {
        trackingId = trackingArray.slice(0, -1);
      } else {
        trackingId = trackingId[0];
      }
    }

    const data = await fetch(trackingId, checkpoints, bulk);

    // Saving the response in the DB
    saveResponse(data, checkpoints, bulk);
    res.status(200).send({
      success: true,
      data: data,
    });
  } catch (err) {
    const data = Shipment.fromJson({
      additionalInfo: err.message,
    });
    res.status(404).send({
      success: false,
      data: Shipment.toJson(data),
    });
  }
};

const fetch = async (trackingId, checkpoints, bulk) => {
  let promise = new Promise((resolve, reject) => {
    axios
      .get(CONSTANTS.BLUEDART_API, {
        params: {
          handler: CONSTANTS.BLUEDART.HANDLER,
          action: CONSTANTS.BLUEDART.ACTION,
          loginid: CONSTANTS.BLUEDART.LOGIN_ID,
          awb: "awb",
          numbers: trackingId,
          format: "xml",
          lickey: CONSTANTS.BLUEDART.LICENSE_KEY,
          verno: CONSTANTS.BLUEDART.VERSION_NUMBER,
          scan: checkpoints ? 1 : 0,
        },
      })
      .then(function (response) {
        if (response.status == 200) {
          const xmlToJs = xmlConvert.xml2js(response.data, {
            compact: true,
            ignoreDoctype: true,
            ignoreDeclaration: true,
            ignoreCdata: true,
          });

          // Checking if request type is bulk
          const bulkData = [];
          if (bulk) {
            if (trackingId.split(",").length == 1) {
              const data = Shipment.fromJson(
                xmlToJs["ShipmentData"]["Shipment"]
              );
              bulkData.push(Shipment.toJson(data));
            } else {
              xmlToJs.ShipmentData.Shipment.forEach((tracking) => {
                const data = Shipment.fromJson(tracking);
                bulkData.push(Shipment.toJson(data));
              });
            }

            resolve(bulkData);
          } else {
            const data = Shipment.fromJson(xmlToJs["ShipmentData"]["Shipment"]);
            resolve(Shipment.toJson(data));
          }
        } else {
          reject("Error while fetching information");
        }
      })
      .catch(function (error) {
        reject(
          "No Information available right now, Please try again after sometime."
        );
      });
  });

  return promise;
};

const saveResponse = async (data, checkpoints, bulk) => {
  if (!bulk) {
    if (data.shipmentStatus !== CONSTANTS.SHIPMENT_STATUS.NO_INFO) {
      save({
        tracking_id: data.trackingId,
        checkpoint: checkpoints,
        response_dump: JSON.stringify(data),
        comment: "",
        status: data.shipmentStatus,
      });
    }
  } else if (bulk) {
    const bulkData = [];
    data.forEach((d) => {
      if (d.shipmentStatus !== CONSTANTS.SHIPMENT_STATUS.NO_INFO) {
        const s = {};
        s.tracking_id = d.trackingId;
        s.checkpoint = checkpoints;
        s.response_dump = JSON.stringify(d);
        s.comment = "";
        s.status = d.shipmentStatus;
        s.courier = "BLUEDART";

        bulkData.push(s);
      }
    });

    bulkSave(bulkData);
  }
};
