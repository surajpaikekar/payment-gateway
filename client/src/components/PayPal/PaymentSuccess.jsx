import { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const PaymentSuccess = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const token = searchParams.get('token');

    useEffect(() => {
        const capturePayment = async () => {
            try {
                const response = await axios.post(`http://localhost:8000/capture/${token}`);
                console.log('Payment captured:', response.data);
                // Handle successful payment (e.g., show success message, update order status)
            } catch (error) {
                console.error('Payment capture failed:', error);
                // Handle capture failure
            }
        };

        if (token) {
            capturePayment();
        }
    }, [token]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
                <h1 className="text-2xl font-bold text-green-600 mb-4">
                    Payment Successful!
                </h1>
                <p className="text-gray-600 mb-4">
                    Your payment has been processed successfully.
                </p>
                <button
                    onClick={() => navigate('/')}
                    className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
                >
                    Return to Home
                </button>
            </div>
        </div>
    );
};

export default PaymentSuccess;

