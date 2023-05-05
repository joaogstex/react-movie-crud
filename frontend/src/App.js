import { BrowserRouter, Routes, Route, } from "react-router-dom";
import Add from "./browserpages/Add";
import Movies from "./browserpages/Movies";
import Update from "./browserpages/Update";
import "./style.css"


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Movies/>}/>
        <Route path="/add" element={<Add/>}/>
        <Route path="/update/:id" element={<Update/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}


export default App;