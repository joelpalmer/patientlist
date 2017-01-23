import { Request, Response } from 'express';
import { MongoError, Db, Collection } from 'mongodb';
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mongodb = require("mongodb");
const config = require("./config.json");
const ObjectID = mongodb.ObjectID;

const PATIENTS_COLLECTION = "patients";

const app = express();
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

var db: Db;
var collection: Collection;

mongodb.MongoClient.connect(`mongodb://${config.USERNAME}:${config.PASSWORD}@ds117819.mlab.com:17819/patientlist`, (err: MongoError, database: Db) => {
  err && (console.log(err), process.exit(1))
  db = database;
  collection = db.collection(PATIENTS_COLLECTION);
  console.log("Database connected");

  const server = app.listen(process.env.PORT || 3000, () => {
    const port = server.address().port;
    console.log("App available on port", port);
  });
});

function handleError(res: Response, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({ "error": message });
}

app.get("/patientrecords", (req: Request, res: Response) => {
  collection.find({ "treatment.name": config.TRIAL })
    .toArray((err, docs) => {
      err ? handleError(res, err.message, "Failed to get patient.", null) : res.status(200).json(docs);
    });
});

app.get("/patientrecords/:id", (req: Request, res: Response) => {
  collection.findOne({ _id: new ObjectID(req.params.id) }, (err, doc) => {
    err ? handleError(res, err.message, "Failed to find record", null) : res.status(200).json(doc);
  });
});

app.put("/patientrecords/:id", (req: Request, res: Response) => {
  const updateDoc = req.body;
  delete updateDoc._id;

  collection.updateOne({ _id: new ObjectID(req.params.id) }, updateDoc, (err, doc) => {
   err ? handleError(res, err.message, "Failed to update record", null) : res.status(204).end();
  });
});

app.delete("/patientrecords/:id", (req: Request, res: Response) => {
  collection.deleteOne({ _id: new ObjectID(req.params.id) }, (err, result) => {
    err ? handleError(res, err.message, "Failed to delete record", null) : res.status(204).end();
  });
});