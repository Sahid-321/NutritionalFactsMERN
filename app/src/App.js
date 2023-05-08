
import { useState } from 'react';
import Home from './components/Home';
import { Route, Routes } from 'react-router-dom';
import Send from './components/Send';
function App() {
  const [sendDataProp, setSendDataProp] = useState('')
 
  return (
    <Routes>
    <Route path='/' element= {<Home setSendDataProp={setSendDataProp} />}>
     <Route path='/send' element={<Send sendDataProp={sendDataProp} />} />
    </Route>
  </Routes>

   
  )
}

export default App;
