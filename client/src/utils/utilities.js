const mongoose = require("mongoose");
const isMongoId = (str) => {
  try {
    mongoose.Types.ObjectId(str);
    return true;
  } catch (err) {
    return false;
  }
};
module.exports = {
  isMongoId: isMongoId,
};
