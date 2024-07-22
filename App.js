import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import cur from './assest/curr.png'
function App() {
  const [amount, setAmount] = useState(1);
  const [tocurramount,setTocurramount]=useState(1)
  const [fromcurr, setFromcurr] = useState("INR");
  const [tocurr, setTocurr] = useState("USD");  
  const [converted, setConverted] = useState(null);

  useEffect(() => {
    const getdata = async () => {
      try {
        let url = `https://api.exchangerate-api.com/v4/latest/${fromcurr}`;
        const response = await fetch(url);
        const data = await response.json();
        const rate = data.rates[tocurr];
        setTocurramount((amount * rate).toFixed(2));
      } catch (error) {
        console.error("error in fetching data", error);
      }
    };

    getdata();
  }, [fromcurr, tocurr, amount]);

  return (
    <>
      <div className="tot-box">
        <div className="img">
          <img src={cur} alt="" />
        </div>
        <div className="logo">
          <p>CURRENCY CONVERTOR</p>
        </div>
        <div className="fromcurr">
          <select id="from-curr" value={fromcurr} onChange={(e) => setFromcurr(e.target.value)}>
            <option value="INR">INR</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
            <option value="JPY">JPY</option>
            <option value="AUD">AUD</option>
            <option value="CAD">CAD</option>
            <option value="CNY">CNY</option>
            <option value="BRL">BRL</option>
            <option value="ZAR">ZAR</option>
            <option value="MYR">MYR</option>
            <option value="KWD">KWD</option>
          </select>
          <input type="text"  value={amount} onChange={(e) => {setAmount(e.target.value);}}  />
        </div>
        <div className="fromcurr">
          <select id="to-curr" value={tocurr} onChange={(e) => setTocurr(e.target.value)}>
            <option value="INR">INR</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
            <option value="JPY">JPY</option>
            <option value="AUD">AUD</option>
            <option value="CAD">CAD</option>
            <option value="CNY">CNY</option>
            <option value="BRL">BRL</option>
            <option value="ZAR">ZAR</option>
            <option value="MYR">MYR</option>
            <option value="KWD">KWD</option>
          </select>
          <input type="text"  value={tocurramount} onChange={(e) => setTocurramount(e.target.value)}  />
        </div>
        <div className="output">
          <h5>{amount} {fromcurr} is equal to {converted} {tocurr}</h5>
        </div>
      </div>
    </>
  );
}

export default App;
