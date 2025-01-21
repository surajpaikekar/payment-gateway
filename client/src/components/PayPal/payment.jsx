import { useState } from "react";
import axios from "axios";
import paypalMobile from './paypalMobile.png'; // Import

const Payment = () => {

    const [name, setName] = useState('');
    const [mobile, setMobile] = useState('');
    const [amount, setAmount] = useState('');
    const [loading, setLoading] = useState(false);
    const [currency, setCurrency] = useState('USD');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
    
        const data = {
            name: name,
            mobile: mobile,
            amount: amount, // Use appropriate data type if needed
            currency: currency,
            MUID: 'MUID' + Date.now(),
            transactionID: 'T' + Date.now(),
        };
    
        try {
            const response = await axios.post('http://localhost:8000/order', data);
            console.log('PayPal Response:', response.data);
            
            // Find and redirect to the PayPal approval URL
            const approvalLink = response.data.links.find(link => link.rel === "approve");
            if (approvalLink) {
                window.location.href = approvalLink.href;
            }
        } catch (error) {
            console.error('Error:', error);
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-between h-[600px] mx-20">
            <img 
                src={paypalMobile} 
                alt="Paypal Mobile"
                className="max-w-[100%] max-h-[100%]" 
            />

            {/* right section: payment form */}
            <div className="w-1/2 border-2 max-w-3x1 p-6 rounded-md border-dashed border-[#3463e2]">
                <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <h2 className="text-4x1 font-bold mb-6 text-blue-700">
                        Make Payment
                    </h2>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Name
                        </label>
                        <input
                            id="Name"
                            name="Name"
                            type="text"
                            placeholder="Enter your name"
                            value={name}
                            onChange={(e)=>setName(e.target.value)}
                            required
                            className="block w-full p-2 text-gray-900 border border-gray-500 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Mobile
                        </label>
                        <input
                            className="block w-full p-2 text-gray-900 border border-gray-500 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500"
                            id="Mobile"
                            name="Mobile"
                            type="text"
                            placeholder="Enter your Mobile Number"
                            required
                            value={mobile}
                            onChange={(e)=> setMobile(e.target.value)}
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Amount
                        </label>
                        <div className="relative">
                            <input
                                className="block w-full p-2 text-gray-900 border border-gray-500 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 pr-24"
                                id="Amount"
                                name="Amount"
                                type="text"
                                placeholder="0.0"
                                required
                                value={amount}
                                onChange={(e)=> setAmount(e.target.value)}
                            />
                            <select
                                id="currency"
                                name="currency"
                                className="absolute right-0 top-0 h-full w-24 border border-gray-500 bg-gray-50 text-gray-900 text-sm rounded-r-lg focus:ring-blue-500 focus:border-blue-500"
                                value={currency}
                                onChange={(e) => setCurrency(e.target.value)}
                            >
                                <option value="">Currency</option>
                                <option value="INR">INR</option>
                                <option value="CAD">CAD</option>
                                <option value="USD">USD</option>
                            </select>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="focus:outline-none text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2"
                    >
                        Pay Now
                    </button>
                </form>
                <p className="text-center text-gray-500 text-xs">
                    &copy;2020 Acme Corp. All rights reserved.
                </p>
            </div>
        </div>
    );
};

export default Payment;





