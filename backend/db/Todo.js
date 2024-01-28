require("dotenv").config();
const mongoose = require("mongoose");

mongoose
  .connect(process.env.Mongoose_URL)
  .then(function () {
    console.log("Database Connected Successfully !!");
  })
  .catch(function () {
    console.log("Some Error connnecting Database !!");
  });

const todoSchema = mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  completed: {
    type: Boolean,
  },
});

const todos = mongoose.model("todos", todoSchema);

module.exports = {
  todos,
};
