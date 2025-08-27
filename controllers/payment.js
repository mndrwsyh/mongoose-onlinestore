const { createHmac } = require("crypto");

const Order = require("../models/order");

const verifyPayment = async (
  billplz_id,
  billplz_paid,
  billplz_paid_at,
  billplz_x_signature
) => {
  // 1. generate the x-signature
  const billplz_string = `billplzid${billplz_id}|billplzpaid_at${billplz_paid_at}|billplzpaid${billplz_paid}`;
  const x_signature = createHmac("sha256", process.env.BILLPLZ_X_SIGNATURE)
    .update(billplz_string)
    .digest("hex");

  console.log(billplz_string);
  console.log("Generated Signature", x_signature);
  console.log("Billplz x signature", billplz_x_signature);

  // 2. compare the generated x-signature with the one from billplz
  if (x_signature !== billplz_x_signature) {
    throw new Error("Signature not valid.");
  }

  // 3. if x-signature is match, then we update the order

  // 3.1 find the order using the billplz id
  const selectedOrder = await Order.findOne({ billplz_id: billplz_id });

  // 3.2 check if order exist
  if (!selectedOrder) {
    throw new Error("Order not found.");
  }

  // 3.3 if exist, update the order status and paid at date
  if (billplz_paid === "true") {
    // if billplzpaid equal ture, then payment is succesful
    selectedOrder.status = "paid";
    selectedOrder.paid_at = billplz_paid_at;
  } else {
    // if billplz_paid is not true, payment failed
    selectedOrder.status = "failed";
  }

  // 4. save the order to update
  await selectedOrder.save();

  // 5. return the updated order
  return selectedOrder;
};

module.exports = {
  verifyPayment,
};
