const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const clientId = process.env.clientId;
const clientSecret = process.env.clientSecret;

if (!clientId || !clientSecret) {
    console.error('PayPal clientId and clientSecret must be set in the environment variables.');
    process.exit(1);
}

const basicAuth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

// Middleware to log requests
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    console.log('Headers:', req.headers);
    console.log('Body:', req.body);
    next();
});

// Utility function to fetch PayPal access token
const fetchAccessToken = async () => {
    try {
        const authResponse = await axios.post(
            'https://api-m.sandbox.paypal.com/v1/oauth2/token',
            'grant_type=client_credentials',
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': `Basic ${basicAuth}`
                }
            }
        );
        return authResponse.data.access_token;
    } catch (error) {
        console.error('Error fetching access token:', error.response?.data || error.message);
        if (error.response) {
            console.error('Status Code:', error.response.status);
            console.error('Response Headers:', error.response.headers);
            console.error('Response Data:', error.response.data);
        }
        throw new Error('Failed to fetch access token');
    }
};

// Middleware to inject access token into requests
const withAccessToken = async (req, res, next) => {
    try {
        req.accessToken = await fetchAccessToken();
        next();
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

app.get('/', (req, res) => {
    res.send('GET API is running');
});

app.post('/order', withAccessToken, async (req, res) => {
    try {
        const { name, mobile, amount, currency = 'USD', transactionID } = req.body;

        const orderResponse = await axios.post(
            'https://api-m.sandbox.paypal.com/v2/checkout/orders',
            {
                intent: 'CAPTURE',
                application_context: {
                    return_url: 'http://localhost:5173/payment-success',
                    cancel_url: 'http://localhost:5173/payment-cancel',
                    brand_name: 'Your Store Name',
                    user_action: 'PAY_NOW',
                    shipping_preference: 'NO_SHIPPING'
                },
                purchase_units: [{
                    reference_id: transactionID,
                    description: `Payment for ${name}, Mobile: ${mobile}`,
                    amount: {
                        currency_code: currency,
                        value: amount
                    }
                }]
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${req.accessToken}`
                }
            }
        );

        console.log('Order Response:', orderResponse.data);
        res.status(200).json(orderResponse.data);
    } catch (error) {
        console.error('Order Error:', error.response?.data || error.message);
        if (error.response) {
            console.error('Status Code:', error.response.status);
            console.error('Response Headers:', error.response.headers);
            console.error('Response Data:', error.response.data);
        }
        res.status(500).json({
            success: false,
            error: error.response?.data || error.message
        });
    }
});

app.post('/capture/:orderId', withAccessToken, async (req, res) => {
    try {
        const { orderId } = req.params;

        const captureResponse = await axios.post(
            `https://api-m.sandbox.paypal.com/v2/checkout/orders/${orderId}/capture`,
            {},
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${req.accessToken}`
                }
            }
        );

        console.log('Capture Response:', captureResponse.data);
        res.status(200).json(captureResponse.data);
    } catch (error) {
        console.error('Capture Error:', error.response?.data || error.message);
        if (error.response) {
            console.error('Status Code:', error.response.status);
            console.error('Response Headers:', error.response.headers);
            console.error('Response Data:', error.response.data);
        }
        res.status(500).json({
            success: false,
            error: error.response?.data || error.message
        });
    }
});

app.listen(8000, () => {
    console.log('Server is listening on port 8000');
});
