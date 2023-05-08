import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
export default function Send({sendDataProp}) {
  const navigate = useNavigate();
  const [mobileNumber, setMobileNumber] = useState('');
  const CHARACTER_LIMIT = 100;

  const [numberEmptyError, setNumberEmptyError] = useState(false);
  const [messageEmptyError, setMessageEmptyError] = useState(false);

  const handleSend = (e)=>{
    e.preventDefault();
    if (mobileNumber.length < 1) {
      setNumberEmptyError(true);
      setTimeout(() => setNumberEmptyError(false), 3000);
    } else if (sendDataProp.length < 1) {
      setMessageEmptyError(true);
      setTimeout(() => setMessageEmptyError(false), 3000);
    } else {
        
    // Regex expression to remove all characters which are NOT alphanumeric 
      let number = mobileNumber.replace(/[^\w\s]/gi, "").replace(/ /g, "");

    // Appending the phone number to the URL
      let url = `https://web.whatsapp.com/send?phone=${number}`;

    // Appending the message to the URL by encoding it
      url += `&text=${encodeURI(sendDataProp)}&app_absent=0`;

    // Open our newly created URL in a new tab to send the message
      window.open(url);
     console.log(mobileNumber);   
    }
    console.log(mobileNumber, 'outer');   
  }

  return (
    <>
    <div>
      <input onChange={(e)=>setMobileNumber(e.target.value)} placeholder='Enter mobile number' />
      {numberEmptyError && (
          <div className='errors'>Mobile number cannot be empty!</div>
        )}
      <h4>Your Text to be sent</h4>
      <p>{sendDataProp}</p>
    </div>

    <button onClick={handleSend}>send</button>
    </>
  )
}
