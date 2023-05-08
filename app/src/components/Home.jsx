import React, { useEffect, useState } from 'react'
import axios from 'axios'
export default function Home() {
    const [input, setInput] = useState("");
    const [apiFoodData, setApiFoodData] = useState([])
    const handleSearch = () => {
        console.log(input, "input");

        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `https://api.api-ninjas.com/v1/nutrition?query=${input}`,
            headers: {
                'X-Api-Key': 'Z2R4IXVBoAQiVHL+05m6JQ==rTLWc0psIUwJrXsb'
            }
        };

        axios.request(config)
            .then((response) => {
                //    console.log(response.data);
                setApiFoodData(response.data)
            })
            .catch((error) => {
                console.log(error);
            });
    }

    useEffect(() => {
      //  console.log(apiFoodData, "api");
        axios.post(`http://localhost:8000/post`, {apiFoodData})
            .then((res) => console.log(res))
            .catch((err) => console.log(err))
    }, [apiFoodData])
    return (
        <>
            <div>
                <input onChange={(e) => setInput(e.target.value)} type='text' placeholder='Enter food name' />
                <button onClick={handleSearch}>Search</button>
            </div>
        </>
    )
}
