const https = require('https');
const {generateSignature} = require('paytmchecksum');

// Ensure that required environment variables are defined
if (!process.env.NEXT_PUBLIC_PAYTM_MID || !process.env.NEXT_PUBLIC_HOST || !process.env.PAYTM_MKEY) {
  throw new Error('Required environment variables are not defined');
}

const handler = async (req, res) => {
  if (req.method === 'POST') {
    /* initialize an object */
    const paytmParams = {};

    /* body parameters */
    paytmParams.body = {
      requestType: 'Payment',
      mid: `${process.env.NEXT_PUBLIC_PAYTM_MID}`,
      websiteName: 'YOUR_WEBSITE_NAME',
      orderId: req.body.orderid,
      callbackUrl: `${process.env.NEXT_PUBLIC_HOST}/api/posttransaction`,
      txnAmount: {
        value: req.body.subTotal,
        currency: 'INR',
      },
      userInfo: {
        custId: req.body.email,
      },
    };
    const checksum = await generateSignature(
      JSON.stringify(paytmParams.body),
      process.env.PAYTM_MKEY
    );
    /* head parameters */
    paytmParams.head = {
      /* put generated checksum value here */
      signature: checksum,
    };

    /* prepare JSON string for request */
    const postData = JSON.stringify(paytmParams);
    const requestAsync = async () => {
      return new Promise((resolve, reject) => {
        const options = {
          /* for Production */
          hostname: 'securegw-stage.paytm.in',
          port: 443,
          path: `/theia/api/v1/initiateTransaction?mid=${process.env.NEXT_PUBLIC_PAYTM_MID}&orderId=${req.body.orderid}`,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Content-Length': postData.length,
          },
        };

        // Set up the request
        let response = '';
        const postReq = https.request(options, (postRes) => {
          postRes.on('data', (chunk) => {
            response += chunk;
          });

          postRes.on('end', () => {
            console.log('Response: ', response);
            resolve(JSON.parse(response).body);
          });
        });
        // post the data
        postReq.write(postData);
        postReq.end();
      });
    };

    const myr = await requestAsync();
    res.status(200).json(myr);
  }
};

export default handler;
