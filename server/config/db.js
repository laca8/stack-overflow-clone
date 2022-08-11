const mongoose = require("mongoose");
const connectedDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://laca:jae09908@cluster0.gjxhg.mongodb.net/?retryWrites=true&w=majority"
    );
    console.log("connected on database....");
  } catch (err) {
    console.log(err);
  }
};
module.exports = connectedDB;
