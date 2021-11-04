const { DataTypes } = require("sequelize");
const sequelize = require("../database/sql").sequelize;
const CONSTANTS = require("../constants");

const tableName = "shipments";

ShipmentModel = sequelize.define(
  tableName,
  {
    tracking_id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    courier: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    checkpoint: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      primaryKey: true,
    },
    response_dump: {
      type: DataTypes.TEXT("long"),
      allowNull: false,
    },
    comment: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM(
        CONSTANTS.SHIPMENT_STATUS.NO_INFO,
        CONSTANTS.SHIPMENT_STATUS.IN_TRANSIT,
        CONSTANTS.SHIPMENT_STATUS.UNDELIVERED,
        CONSTANTS.SHIPMENT_STATUS.DELIVERED,
        CONSTANTS.SHIPMENT_STATUS.RTO,
        CONSTANTS.SHIPMENT_STATUS.REDIRECTED
      ),
      defaultValue: CONSTANTS.SHIPMENT_STATUS.NO_INFO,
    },
  },
  {
    sequelize,
    tableName: tableName,
    timestamps: true,
    underscored: true,
  }
);

module.exports = ShipmentModel;
