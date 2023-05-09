import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
export default function Send({sendDataProp}) {
  const navigate = useNavigate();
  const [mobileNumber, setMobileNumber] = useState('');
  const CHARACTER_LIMIT = 100;

  const [numberEmptyError, setNumberEmptyError] = useState(false);
  const [messageEmptyError, setMessageEmptyError] = useState(false);
  const [messageData, setMessageData] = useState([]);
  const handleSend = (e) => {
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
  
      // Create an array of message objects to send
      const messageData = sendDataProp.map((elem) => {
        return {
          // name: elem.name,
          // calories: elem.calories,
          // Fat_Total: elem.fat_total_g,
          // Fat_Saturated: elem.fat_saturated_g,
          // Protein: elem.protein_g,
          // Sodium: elem.sodium_mg,
          // Potassium: elem.potassium_mg,
          // Cholesterol: elem.cholesterol_mg,
          // Carbohydrates: elem.carbohydrates_total_g,
          // Fiber: elem.fiber_g,
          // Sugar: elem.sugar_g,
          message: `Hi! Here's the nutritional information for ${elem.name}:
          Calories: ${elem.calories}
          Total Fat: ${elem.fat_total_g}g
          Saturated Fat: ${elem.fat_saturated_g}g
          Protein: ${elem.protein_g}g
          Sodium: ${elem.sodium_mg}mg
          Potassium: ${elem.potassium_mg}mg
          Cholesterol: ${elem.cholesterol_mg}mg
          Total Carbohydrates: ${elem.carbohydrates_total_g}g
          Fiber: ${elem.fiber_g}g
          Sugar: ${elem.sugar_g}g`,
        };
      });
  
  
      // Convert the message data to JSON string and encode it
      const dataJSONString =JSON.stringify(messageData);
  
      // Append the phone number and message data to the WhatsApp URL
      let url = `https://web.whatsapp.com/send?phone=${number}`;
      url += `&text=${encodeURI(dataJSONString)}&app_absent=0`;
      window.open(url);
  
      // Open the WhatsApp URL in a new tab to send the message
      
    }
  };
  return (
    <div className="flex flex-col items-center mt-1 mb-10">
          <h4 className="text-lg font-medium mb-2">Your Text to be sent to {mobileNumber}</h4>
    <div className="flex items-center flex-wrap justify-center w-full max-w-screen-lg space-x-4">
      <input 
        className="p-5 w-full max-w-screen-lg lg:w-80 py-2 mb-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        onChange={(e)=>setMobileNumber(e.target.value)}
        placeholder='Enter whatsapp number' 
      />
 
  
      {numberEmptyError && (
        <div className='text-red-500 mb-2'>Mobile number cannot be empty!</div>
      )}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4 w-full max-w-screen-lg">
           
           {sendDataProp &&
             sendDataProp.map((elem) => (
               <div
                 key={elem._id}
                 className={`border rounded-lg p-4 cursor-pointer`}
                 
               >
                 <h2 className="text-xl font-medium">
                   {elem.name}{" "}
                  
                 </h2>
                 <p>calories: {elem.calories}</p>
                 <p>Fat Total: {elem.fat_total_g} g</p>
                 <p>Fat Saturated: {elem.fat_saturated_g} g</p>
                 <p>Protein : {elem.protein_g} g</p>
                 <p>Sodium : {elem.sodium_mg} mg</p>
                 <p>Potassium: {elem.potassium_mg} mg</p>
                 <p>Cholesterol: {elem.cholesterol_mg} mg</p>
                 <p>Carbohydrates Total: {elem.carbohydrates_total_g} g</p>
                 <p>Fiber: {elem.fiber_g} g</p>
                 <p>Sugar: {elem.sugar_g} g</p>
               </div>
             ))}
         </div>
         <p   className="w-full py-2 text-blue-500   mt-4">send these data on whatsapp</p>
      <button 
        className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg mt-4"
        onClick={handleSend}
      >
        Send
      </button>
    </div>
  </div>
  
  
  )
  
}
