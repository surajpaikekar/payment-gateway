// Hero.jsx
import phonePeImage from './phonepe.jpg'; // Import your image



const Hero = () => {
  return (
    <section className="flex items-center justify-between p-10 bg-gradient-to-r bg-gray-200 rounded-xl shadow-lg mx-5 my-5">
      <div className="max-w-lg pr-5">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">PhonePe</h1>
        <p className="text-l text-gray-800 mb-6">
          Experience seamless and secure digital payments with our trusted
          solutions. Join millions of users today!
        </p>
        <button className="bg-purple-700 text-white py-3 px-6 rounded-md text-lg font-semibold hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 transition duration-300 shadow-lg">
          Need our Help?
        </button>
      </div>
      <div className="max-w-xl flex justify-center items-center">
        <img src={phonePeImage} alt="PhonePe" className="max-w-full bg-white rounded-lg shadow-lg h-35 object-cover" />
      </div>
    </section>
  );
};

export default Hero;
