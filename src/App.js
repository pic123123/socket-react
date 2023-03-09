import React, { useEffect, useState } from "react";
import "./App.css";
import io from "socket.io-client";
import { TextField } from "@mui/material";

function App() {
  const [state, setState] = useState({ message: "", name: "" });
  const [chat, setChat] = useState([]);
  const [socket, setSocket] = useState(
    io(`http://localhost:4000`, {
      transports: ["websocket"],
    })
  );
  useEffect(() => {
    //  소켓 연결
    socket.on("message", ({ name, message }) => {
      setChat([...chat, { name, message }]);
    });
  }, [chat, socket]);

  //TextField에 입력하는 이벤트 감지해서 상태에 담는 함수
  const onTextChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const onMessageSubmit = (e) => {
    e.preventDefault();
    const { name, message } = state;
    socket.emit("message", { name, message });
    setState({ message: "", name });
  };

  const renderChat = () => {
    return chat.map(({ name, message }, index) => (
      <div key={index}>
        <h3>
          {name}:<span>{message}</span>
        </h3>
      </div>
    ));
  };

  return (
    <div className="card">
      <form onSubmit={onMessageSubmit}>
        <h1>Messenger</h1>
        <div className="name-field">
          <TextField
            name="name"
            onChange={(e) => onTextChange(e)}
            value={state.name}
            label="Name"
          />
        </div>
        <div>
          <TextField
            name="message"
            onChange={(e) => onTextChange(e)}
            value={state.message}
            id="outlined-multiline-static"
            variant="outlined"
            label="Message"
          />
        </div>
        <button>Send Message</button>
      </form>
      <div className="render-chat">
        <h1>채팅방</h1>
        {renderChat()}
      </div>
    </div>
  );
}

export default App;
