const functions = require("firebase-functions");
const admin = require("firebase-admin");
require("dotenv").config();

const serviceAccountKey = require("./serviceAccountKey.json");

const express = require("express");
const app = express();

// body parser for json data

app.use(express.json());

// cors origin
const cors = require("cors");
app.use(cors({ origin: true }));


app.use((req, res, next) => {
  res.set("Access-Control-Allow-Origin", "http://localhost:5173");
  next();
});

//  FIREBASE CREDENTIALS
admin.initializeApp({
  credential: admin.credential.cert(serviceAccountKey),
});

// API END POINTS
app.get("/", (req, res) => {
  return res.send("hello world");
});

const UserRoutes = require("./routes/User")
app.use("/api/users", UserRoutes)

const productRoute = require("./routes/Proudct")
app.use("/api/products", productRoute)

exports.app = functions.https.onRequest(app);
