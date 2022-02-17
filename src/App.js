import TextBox from "./components/TextBox";
import Navbar from "./components/Navbar"
// import {HashRouter as Router,Route,Switch,Routes} from "react-router-dom" 
import {BrowserRouter as Router,Route,Switch,Routes} from "react-router-dom" 
import Home from "./components/Home"
import Display from "./components/Display"
import Edit from "./components/Edit";

function App() {
  return (
    <div className="App">
      <h1>PasteBin</h1>
      <Navbar/>
      <Router>
        <Routes>
    <Route path="/" exact element={<Home/>}></Route>
    <Route path="/new" element={<TextBox/>}></Route>
    <Route path="/display" element={<Display/>}></Route>
    <Route path="/edit" element={<Edit/>}></Route>
        </Routes>
    
    </Router>
      
    </div>
  );
}

export default App;
