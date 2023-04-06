// CRUD create read update delete
// console.log("its starting?")

const mongoose = require('mongoose');

const connectionURL = "mongodb://127.0.0.1:27017/test";
const databaseName = "task-manager";

const Schema = mongoose.Schema;
const SchemaUsers = new Schema({
    Name: String,
    Age: Number,
  });

const connect = () => {

    mongoose
    .connect(connectionURL)
    .then(() => {
        console.log("Connection succesful");
    })
    .catch((err) => {
        throw new Error(err);
    });

};

connect();

db = mongoose.model(databaseName, SchemaUsers);

db.create({
    Name: "Rushabh",
    Age: 19
},{
    Name: "Takshal",
    Age: 120
},{
    Name: "Tanish",
    Age: 18
},{
    Name: "Varun",
    Age: 17
},{
    Name: "Paran",
    Age: 21
}
)