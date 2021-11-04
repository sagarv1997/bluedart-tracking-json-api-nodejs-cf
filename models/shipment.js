const Utils = require("../utils");
const Checkpoint = require("./checkpoint");

module.exports = class Shipment {
  trackingId = "";
  prodCode = "";
  service = "";
  pickupDate = "";
  pickupTime = "";
  origin = "";
  originAreaCode = "";
  destination = "";
  destinationAreaCode = "";
  productType = "";
  senderName = "";
  consigneeName = "";
  weight = "";
  shipmentStatus = "";
  shipmentStatusText = "";
  shipmentStatusType = "";
  expectedDeliveryDate = "";
  shipmentStatusDate = "";
  shipmentStatusTime = "";
  receivedBy = "";
  instructions = "";
  checkpoints = [];

  constructor() {}

  static fromJson(info) {
    let shipment = new Shipment();
    shipment.trackingId = info?.["_attributes"]?.["WaybillNo"];
    shipment.prodCode = info?.["Prodcode"]?.["_text"];
    shipment.service = info?.["Service"]?.["_text"];
    shipment.pickupDate = info?.["PickUpDate"]?.["_text"];
    shipment.pickupTime = info?.["PickUpTime"]?.["_text"];
    shipment.origin = info?.["Origin"]?.["_text"];
    shipment.originAreaCode = info?.["OriginAreaCode"]?.["_text"];
    shipment.destination = info?.["Destination"]?.["_text"];
    shipment.destinationAreaCode = info?.["DestinationAreaCode"]?.["_text"];
    shipment.productType = info?.["ProductType"]?.["_text"];
    shipment.senderName = info?.["SenderName"]?.["_text"];
    shipment.consigneeName = info?.["ToAttention"]?.["_text"];
    shipment.weight = info?.["Weight"]?.["_text"];
    shipment.shipmentStatusText = info?.["Status"]?.["_text"];
    shipment.shipmentStatusType = info?.["StatusType"]?.["_text"];
    shipment.expectedDeliveryDate = info?.["ExpectedDeliveryDate"]?.["_text"];
    shipment.shipmentStatusDate = info?.["StatusDate"]?.["_text"];
    shipment.shipmentStatusTime = info?.["StatusTime"]?.["_text"];
    shipment.receivedBy = info?.["ReceivedBy"]?.["_text"];
    shipment.instructions = info?.["Instructions"]?.["_text"];
    shipment.shipmentStatus = Utils.getShipmentStatusFromCode(
      info?.["StatusType"]?.["_text"]
    );

    shipment.checkpoints = info?.["Scans"]?.["ScanDetail"].map((c) => {
      const data = Checkpoint.fromJson(c);
      return Checkpoint.toJson(data);
    });

    return Utils.cleanObject(shipment, true);
  }

  static toJson(info) {
    let json = {
      ...info,
    };

    return Utils.cleanObject(json);
  }
};
