const express = require("express");
const { verifyPayment } = require("../controllers/payment");
const router = express.Router();

/*
?billplz[id]=642cc14a42cca928&billplz[paid]=true&billplz[paid_at]=2025-08-26+11%3A20%3A02+%2B0800&billplz[x_signature]=9e84a22213f5b99d98916f4c2c4663f09dc2203cb99ac2c7beaebe09bd1bb83d
*/

router.post("/", async (req, res) => {
  try {
    const billplz_id = req.body.billplz_id;
    const billplz_paid = req.body.billplz_paid;
    const billplz_paid_at = req.body.billplz_paid_at;
    const billplz_x_signature = req.body.billplz_x_signature;

    const updatedOrder = await verifyPayment(
      billplz_id,
      billplz_paid,
      billplz_paid_at,
      billplz_x_signature
    );
    res.status(200).send(updatedOrder);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      error: "Unable to verify payment.",
    });
  }
});

module.exports = router;
