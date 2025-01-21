const express = require('express');
const cors = require('cors');
const crypto = require('crypto');
const axios = require('axios');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// const salt_key = '96434309-7796-489d-8924-ab56988a7076';
// const merchant_id = 'PGTESTPAYUAT86';

const salt_key = '58a63b64-574d-417a-9214-066bee1e4caa';
const merchant_id = 'ATMOSTUAT';


app.get('/', (req, res)=>{
    res.send('GET api is running')
});

app.post('/order', async(req, res) => {
    try {
        const {
            name, mobile, amount, MUID, transactionID
        } = req.body;

        // Log the request data
        console.log('Request Data:', {
            merchantId: merchant_id,
            amount,
            mobile,
            MUID,
            transactionID
        });

        const data = {
            merchantId: merchant_id,
            merchantTransactionId: transactionID,
            merchantUserId: MUID,
            amount: parseInt(amount) * 100,
            redirectUrl: `http://localhost:8000/status/${transactionID}`,
            redirectMode: "POST",
            callbackUrl: `http://localhost:8000/callback/${transactionID}`,
            mobileNumber: mobile,
            paymentInstrument: {
                type: "PAY_PAGE"
            }
        };

        const payload = JSON.stringify(data);
        const payloadMain = Buffer.from(payload).toString('base64');
        
        // Log the encoded payload
        console.log('Encoded Payload:', payloadMain);

        // const string = payloadMain + '/pg/v1/pay' + salt_key;
        const string = payloadMain + '/apis/pg-sandbox/pg/v1/pay' + salt_key;
        const sha256 = crypto.createHash('sha256').update(string).digest('hex');
        const checksum = sha256 + '###1';

        // Log the checksum
        console.log('Generated Checksum:', checksum);

        const response = await axios({
            method: 'POST',
            url: 'https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay',
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json',
                'X-VERIFY': checksum,
                'X-MERCHANT-ID': merchant_id
            },
            data: {
                request: payloadMain
            }
        });

        return res.status(200).json(response.data);

    } catch (error) {
        console.error('Full Error:', error);
        console.error('Response Data:', error.response?.data);
        return res.status(500).json({
            success: false,
            error: error.response?.data || error.message
        });
    }
});



// Add callback endpoint
app.post('/callback/:transactionId', async (req, res) => {
    console.log('Callback received:', req.body);
    res.json({ status: 'OK' });
});

// Add status endpoint
app.post('/status/:transactionId', async (req, res) => {
    console.log('Status update received:', req.body);
    res.json({ status: 'OK' });
});
app.listen(8000, ()=>{
    console.log('Server is listening on port 8000')
});
