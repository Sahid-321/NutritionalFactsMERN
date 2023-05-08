import React, { useEffect, useState } from 'react'
import axios from 'axios'
export default function Home() {
    const [input, setInput] = useState("");
    const [foodData, setFoodData] = useState([])

    const handleInput = (e) => {
        //console.log(e.target.value);
        setInput(e.target.value)
        // console.log(input, "input");

    }
    const handleSearch = async () => {
        console.log(input, "input from handlesearch");
        // console.log(apiFoodData, "api");
        try {
            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `https://api.api-ninjas.com/v1/nutrition?query=${input}`,
                headers: {
                    'X-Api-Key': 'Z2R4IXVBoAQiVHL+05m6JQ==rTLWc0psIUwJrXsb'
                }
            };

            axios.request(config)
                .then(async (response) => {
                    console.log(response.data);
                    // setApiFoodData(response.data)
                    //post data in mongodb
                    const apiFoodData = response.data
                    await axios.post(`http://localhost:8000/post`, { apiFoodData })
                        .then((res) => console.log(res))
                        .catch((err) => console.log(err))
                })
                .catch((error) => {
                    console.log(error);
                });
        } catch (error) {
            console.log(error);
        }



    }

    useEffect(() => {
        //
        axios.get(`http://localhost:8000/get`)
            .then((res) => { return res.data })
            .then((data) => {
               // console.log(data)
                setFoodData(data)
            })
            .catch((err) => console.log(err))
    }, [])
    //console.log(foodData, "food data")

    return (
        <>
            <div>
                <input onChange={(e) => handleInput(e)} type='text' placeholder='Enter food name' />
                <button onClick={handleSearch}>Search</button>
            </div>
            <div>
                {
                   foodData && foodData.map((elem)=>{
                        return(
                            <div key={elem._id}>
                                <p>{elem.name}</p>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}
