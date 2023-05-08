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
    <div className="flex flex-col items-center">
    <div className="w-full max-w-md px-4">
      <input 
        className="w-full py-2 mb-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        onChange={(e)=>setMobileNumber(e.target.value)}
        placeholder='Enter mobile number' 
      />
      {numberEmptyError && (
        <div className='text-red-500 mb-2'>Mobile number cannot be empty!</div>
      )}
      <h4 className="text-lg font-medium mb-2">Your Text to be sent</h4>
      <p className="mb-4">{sendDataProp}</p>
      <button 
        className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
        onClick={handleSend}
      >
        send
      </button>
    </div>
  </div>
  
  
  )
}
