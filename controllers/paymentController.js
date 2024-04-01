const crypto = require("crypto");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const https = require("https");

const makeHttpRequest = (options, requestBody) => {
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let data = "";

      res.setEncoding("utf8");

      res.on("data", (chunk) => {
        data += chunk;
      });

      res.on("end", () => {
        resolve(data);
      });
    });

    req.on("error", (e) => {
      reject(new Error(`Problem with request: ${e.message}`));
    });

    req.write(requestBody);
    req.end();
  });
};
const paymentController = {
  momoMethod: async (req, res) => {
    var accessKey = "F8BBA842ECF85";
    var secretKey = "K951B6PE1waDMi640xX08PD3vg6EkVlz";
    var orderInfo = "pay with MoMo";
    var partnerCode = "MOMO";
    var redirectUrl = process.env.MOMO_RETURN_URL;
    var ipnUrl = process.env.MOMO_RETURN_URL;
    var requestType = "payWithMethod";
    var amount = req.body.amount;
    var orderId = partnerCode + new Date().getTime();
    var requestId = orderId;
    var extraData = "";
    var paymentCode =
      "T8Qii53fAXyUftPV3m9ysyRhEanUs9KlOPfHgpMR0ON50U10Bh+vZdpJU7VY4z+Z2y77fJHkoDc69scwwzLuW5MzeUKTwPo3ZMaB29imm6YulqnWfTkgzqRaion+EuD7FN9wZ4aXE1+mRt0gHsU193y+yxtRgpmY7SDMU9hCKoQtYyHsfFR5FUAOAKMdw2fzQqpToei3rnaYvZuYaxolprm9+/+WIETnPUDlxCYOiw7vPeaaYQQH0BF0TxyU3zu36ODx980rJvPAgtJzH1gUrlxcSS1HQeQ9ZaVM1eOK/jl8KJm6ijOwErHGbgf/hVymUQG65rHU2MWz9U8QUjvDWA==";
    var orderGroupId = "";
    var autoCapture = true;
    var lang = "vi";

    var rawSignature =
      "accessKey=" +
      accessKey +
      "&amount=" +
      amount +
      "&extraData=" +
      extraData +
      "&ipnUrl=" +
      ipnUrl +
      "&orderId=" +
      orderId +
      "&orderInfo=" +
      orderInfo +
      "&partnerCode=" +
      partnerCode +
      "&redirectUrl=" +
      redirectUrl +
      "&requestId=" +
      requestId +
      "&requestType=" +
      requestType;

    var signature = crypto
      .createHmac("sha256", secretKey)
      .update(rawSignature)
      .digest("hex");
    const requestBody = JSON.stringify({
      partnerCode: partnerCode,
      partnerName: "Test",
      storeId: "MomoTestStore",
      requestId: requestId,
      amount: amount,
      orderId: orderId,
      orderInfo: orderInfo,
      redirectUrl: redirectUrl,
      ipnUrl: ipnUrl,
      lang: lang,
      requestType: requestType,
      autoCapture: autoCapture,
      extraData: extraData,
      orderGroupId: orderGroupId,
      signature: signature,
    });
    try {
      const options = {
        hostname: "test-payment.momo.vn",
        port: 443,
        path: "/v2/gateway/api/create",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Content-Length": Buffer.byteLength(requestBody),
        },
      };
      const response = await makeHttpRequest(options, requestBody);
      return res.status(200).json(JSON.parse(response));
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  visaMethod: async (req, res) => {
    const { amount } = req.body;
    try {
      const customer = await stripe.customers.create();
      const ephemeralKey = await stripe.ephemeralKeys.create(
        { customer: customer.id },
        { apiVersion: "2023-08-16" }
      );
      const intent = await stripe.paymentIntents.create({
        amount,
        currency: "vnd",
        automatic_payment_methods: { enabled: true },
      });

      return res.status(200).json({
        client_secret: intent.client_secret,
        id: intent.id,
        ephemeralKey: ephemeralKey.secret,
        customer: customer.id,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  },
};

module.exports = paymentController;
