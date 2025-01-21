import { useNavigate } from 'react-router-dom';

const PaymentCancel = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
                <h1 className="text-2xl font-bold text-red-600 mb-4">
                    Payment Cancelled
                </h1>
                <p className="text-gray-600 mb-4">
                    Your payment was cancelled. No charges were made.
                </p>
                <button
                    onClick={() => navigate('/')}
                    className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
                >
                    Try Again
                </button>
            </div>
        </div>
    );
};

export default PaymentCancel;