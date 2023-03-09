import React from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";

function App() {
  const [httpState, setHttpState] = React.useState("");
  async function onClickHttp() {
    const apiResult = await axios.get("http://localhost:4000/api");
    apiResult.status && setHttpState(apiResult.data.message);
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <button onClick={onClickHttp}>HTTP 통신 TEST</button>

        {httpState && <p>백엔드 통신 성공, {httpState}</p>}
      </header>
    </div>
  );
}

export default App;
