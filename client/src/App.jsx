import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// PhonePe imports
// import Header from './components/PhonePe/header';
// import AboutMe from './components/PhonePe/aboutMe';
// import Hero from './components/PhonePe/hero';
// import Payment from './components/PhonePe/payment';


// PayPal Imports
import Header from './components/PayPal/header';
import AboutMe from './components/PayPal/aboutMe';
import Hero from './components/PayPal/hero';
import Payment from './components/PayPal/payment';
import PaymentCancel from './components/PayPal/PaymentCancel';
import PaymentSuccess from './components/PayPal/PaymentSuccess';



function App () {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={
            <>
            <Hero />
            <Payment />
            </>
          } />
          <Route path='/about' element={<AboutMe/>} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/payment-cancel" element={<PaymentCancel />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App;