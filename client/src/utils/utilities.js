import mongoose from 'mongoose';

export const isMongoId = (str) => {
  try {
    mongoose.Types.ObjectId(str);
    return true;
  } catch (err) {
    return false;
  }
};
