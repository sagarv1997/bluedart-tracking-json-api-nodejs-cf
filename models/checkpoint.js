const CONSTANTS = require("../constants");
const { cleanObject, getShipmentStatusFromCode } = require("../utils");

module.exports = class Checkpoint {
  scan = "";
  scanCode = "";
  scanType = "";
  scanGroupType = "";
  scanDate = "";
  scanTime = "";
  scannedLocation = "";
  scannedLocationCode = "";
  checkpointState = CONSTANTS.SHIPMENT_STATUS.NO_INFO;

  constructor() {}

  static fromJson(info) {
    let checkpoint = new Checkpoint();
    checkpoint.scan = info?.["Scan"]?.["_text"];
    checkpoint.scanCode = info?.["ScanCode"]?.["_text"];
    checkpoint.scanType = info?.["ScanType"]?.["_text"];
    checkpoint.scanGroupType = info?.["ScanGroupType"]?.["_text"];
    checkpoint.scanDate = info?.["ScanDate"]?.["_text"];
    checkpoint.scanTime = info?.["ScanTime"]?.["_text"];
    checkpoint.scannedLocation = info?.["ScannedLocation"]?.["_text"];
    checkpoint.scannedLocationCode = info?.["ScannedLocationCode"]?.["_text"];
    checkpoint.checkpointState = getShipmentStatusFromCode(
      info?.["ScanType"]?.["_text"]
    );

    return cleanObject(checkpoint);
  }

  static toJson(info) {
    let json = {
      ...info,
    };

    return cleanObject(json);
  }
};
