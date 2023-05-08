
import { useState } from 'react';
import Home from './components/Home';
import { Route, Routes } from 'react-router-dom';
import Send from './components/Send';
function App() {
  const [sendDataProp, setSendDataProp] = useState([])
 console.log(sendDataProp, "data props");
  return (
    <Routes>
    <Route path='/' element= {<Home setSendDataProp={setSendDataProp} sendDataProp={sendDataProp} />}/>
     <Route path='/send' element={<Send sendDataProp={sendDataProp} />} />
  
  </Routes>

   
  )
}

export default App;
