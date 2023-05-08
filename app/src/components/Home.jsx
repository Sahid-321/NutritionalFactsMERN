import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
export default function Home({ setSendDataProp }) {
    const [input, setInput] = useState("");
    const [foodData, setFoodData] = useState([])
    const [selectedFoodId, setSelectedFoodId] = useState('')
const [selectedItems,setSelectedItems] = useState('')
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
                        .then((res) => {console.log(res)
                            navigate(0)})
                        .catch((err) => console.log(err))
                })
                .catch((error) => {
                    console.log(error);
                });
        } catch (error) {
            console.log(error);
        }

//setTimeout(()=>{}, 1000)

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
            .then((res) => {console.log(res)
                navigate(0)})
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

        if (selectedItems.includes(elem._id)) {
            setSelectedItems(selectedItems.filter((id) => id !== elem._id));
          } else {
            setSelectedItems([...selectedItems, elem._id]);
          }
      
          setSendDataProp(dataJSONString);
    };

    const handleNext = () => {
        navigate("/send")
    }
    return (
        <div className="flex flex-col items-center">
        <div className="flex items-center flex-wrap justify-center w-full max-w-screen-lg space-x-4">
          <input
            className="p-2 border rounded-lg w-full md:w-96 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => handleInput(e)}
            type="text"
            placeholder="Enter food name"
          />
          <button
            className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4 w-full max-w-screen-lg">
          {foodData &&
            foodData.map((elem) => (
              <div
                key={elem._id}
                className={`border rounded-lg p-4 cursor-pointer ${
                  selectedItems.includes(elem._id) ? "bg-gray-100" : ""
                }`}
                onClick={() => {
                  handleClick(elem);
                  setSelectedFoodId(elem._id);
                }}
              >
                <h2 className="text-xl font-medium">
                  {elem.name}{" "}
                  <button
                    onClick={() => handleDelete(elem._id)}
                    className="ml-4 bg-red-500 hover:bg-red-600 text-white rounded-lg px-2 py-1"
                  >
                    Delete
                  </button>
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
        <button
          className="mt-4 p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg w-full max-w-screen-lg"
          onClick={handleNext}
        >
          Next
        </button>
      </div>
      

    )
}
