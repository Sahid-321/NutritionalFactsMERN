import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
export default function Home({setSendDataProp}) {
    const [input, setInput] = useState("");
    const [foodData, setFoodData] = useState([])
    const [clickedData, setClickedData] = useState('')
    const navigate = useNavigate();
    const handleInput = (e) => {
        //console.log(e.target.value);
        setInput(e.target.value)
        // console.log(input, "input");

    }
    const handleSearch = async () => {
      //  console.log(input, "input from handlesearch");
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

    const handleDelete = async (id) => {
        console.log(id);
        await axios.delete(`http://localhost:8000/delete/${id}`)
            .then((res) => console.log(res))
            .catch((err) => console.log(err))
    }

    const handleClick = (elem) => {


        const dataString = {
            name: elem.name,
            calories: elem.calories,
            Fat_Total: elem.fat_total_g,
            Fat_Saturated: elem.fat_saturated_g,
            Protein: elem.protein_g,
            Sodium: elem.sodium_mg,
            Potassium: elem.potassium_mg,
            Cholesterol: elem.cholesterol_mg,
            Carbohydrates: elem.carbohydrates_total_g,
            Fiber: elem.fiber_g,
            Sugar: elem.sugar_g,
        };


        const dataJSONString = JSON.stringify(dataString);

        // console.log(dataJSONString);
    //    setClickedData(dataJSONString)
        setSendDataProp(dataJSONString)
        return dataJSONString;
    };

    const handleNext = ()=>{
        navigate("/send")
    }
    return (
        <>
            <div>
                <input onChange={(e) => handleInput(e)} type='text' placeholder='Enter food name' />
                <button onClick={handleSearch}>Search</button>
            </div>
            <div>
                {
                    foodData && foodData.map((elem) => {
                        return (
                            <div key={elem._id} onClick={() => handleClick(elem)}>

                                <h2>{elem.name} <button onClick={() => handleDelete(elem._id)}>Delete</button></h2>
                                <p>calories: {elem.calories}</p>
                                <p>Fat Total:{elem.fat_total_g} g</p>
                                <p>Fat Saturated: {elem.fat_saturated_g} g</p>
                                <p>Protein : {elem.protein_g} g</p>
                                <p>Sodium : {elem.sodium_mg} mg</p>
                                <p>Potassium: {elem.potassium_mg} mg</p>
                                <p>Cholesterol: {elem.cholesterol_mg} mg</p>
                                <p>Carbohydrates Total: {elem.carbohydrates_total_g} g</p>
                                <p>Fiber: {elem.fiber_g} g</p>
                                <p>Sugar: {elem.sugar_g} g</p>
                            </div>
                        )
                    })
                }
            </div>

            <button onClick={handleNext}>Next</button>
        </>
    )
}
