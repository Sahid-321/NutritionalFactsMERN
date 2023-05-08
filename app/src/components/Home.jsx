import React, { useState } from 'react'

export default function Home() {
const [input, setInput] = useState("");

    const handleSearch  = ()=>{
      console.log(input, "input");
    }
  return (
    <>
    <div>
        <input onChange={(e)=>setInput(e.target.value)} type='text' placeholder='Enter food name' />
        <button onClick={handleSearch}>Search</button>
    </div>
    </>
  )
}
