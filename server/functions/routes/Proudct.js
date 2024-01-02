const express = require("express");
const router = express.Router();
const admin = require("firebase-admin");
const db = admin.firestore();
db.settings({ ignoreUndefinedProperties: true });

router.post("/create", async (req, res) => {
  try {
    const id = Date.now();
    const data = {
      productId: id,
      product_name: req.body.product_name,
      product_category: req.body.product_category,
      product_price: req.body.product_price,
      imageURL: req.body.imageURL,
    };

    const response = await db.collection("products").doc(`/${id}/`).set(data);
    return res.status(200).send({ status: true, data: response });
  } catch (error) {
    return res.send({ success: false, msg: `Error : ${error}` });
  }
});
module.exports = router;
