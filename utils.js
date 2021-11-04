const CONSTANTS = require("./constants");

const cleanObject = (obj, blank = false) => {
  for (let key in obj) {
    if (obj.hasOwnProperty(key))
      if (
        obj[key] === null ||
        obj[key] === undefined ||
        obj[key] === "undefined" ||
        (blank && obj[key] === "")
      ) {
        delete obj[key];
      }
  }
  return obj;
};

const removeNull = (obj, exception) => {
  for (let key in obj) {
    if (!exception.includes(key) && obj[key] === null) {
      obj[key] = "";
    }
  }
  return obj;
};

const getShipmentStatusFromCode = (code) => {
  switch (code) {
    case "NF":
      return CONSTANTS.SHIPMENT_STATUS.NO_INFO;
    case "IT":
      return CONSTANTS.SHIPMENT_STATUS.IN_TRANSIT;
    case "UD":
      return CONSTANTS.SHIPMENT_STATUS.UNDELIVERED;
    case "DL":
      return CONSTANTS.SHIPMENT_STATUS.DELIVERED;
    case "RL":
      return CONSTANTS.SHIPMENT_STATUS.REDIRECTED;
    case "RT":
      return CONSTANTS.SHIPMENT_STATUS.RTO;
    default:
      return CONSTANTS.SHIPMENT_STATUS.NO_INFO;
  }
};

module.exports = {
  removeNull,
  cleanObject,
  getShipmentStatusFromCode,
};
