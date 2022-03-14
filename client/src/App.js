
import {BrowserRouter, Routes, Route} from "react-router-dom";
import AuthView from "./components/AuthView";
import Editor from "./components/Editor";
import Home from "./components/Home";
import "./styles/main.css";
import DataContextProvider from "./contexts/dataContextProvider";
import SocketContextProvider from "./contexts/socketContextProvider";
import Dashboard from "./components/dashboard/Dashboard";


function App() {
  return (
    <div className="App">
      <DataContextProvider>
      <SocketContextProvider>
        <BrowserRouter>
          <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="/auth/:comp" element={<AuthView/>}/>
              <Route path="/dashboard" element={<Dashboard/>}/>
              <Route path="/documents/:docId" element={<Editor/>}/>
          </Routes>
        </BrowserRouter>
      </SocketContextProvider>
      </DataContextProvider>
    </div>
  );
}

export default App;
