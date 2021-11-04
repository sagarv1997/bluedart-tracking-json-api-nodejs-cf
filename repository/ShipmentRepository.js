const ShipmentModel = require("../models/shipment.model");

exports.save = async ({
  tracking_id,
  checkpoint,
  response_dump,
  comment,
  status,
}) => {
  return await ShipmentModel.create(
    {
      tracking_id,
      checkpoint,
      response_dump,
      comment,
      status,
      courier: "BLUEDART",
    },
    {
      updateOnDuplicate: ["response_dump", "comment", "status"],
    }
  );
};

exports.bulkSave = async (data) => {
  return await ShipmentModel.bulkCreate(data, {
    updateOnDuplicate: ["response_dump", "comment", "status"],
  });
};
