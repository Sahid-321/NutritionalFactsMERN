import React from 'react'

export default function Send({sendDataProp}) {
  const handleSend = ()=>{
    console.log("send");
  }
  return (
    <>
    <div>
      <input placeholder='Enter mobile number' />
      <button>Send</button>
    </div>
    <div>
      <h4>Your Text to be sent</h4>
      <p>{sendDataProp}</p>
    </div>

    <button onClick={handleSend}>send</button>
    </>
  )
}
