import { useState } from "react";
import { useDispatch } from "react-redux";
import { showNotification,setNotification } from "../reducers/notificationReducer";

import {
  Button,
  TextField
} from '@mui/material'

const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch()
  const handleSubmit = (event) => {
    event.preventDefault();
    onLogin(username, password);
  };

  return (
    <div>
      <h2>Log in to the application</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <TextField
            value={username}
            size="small"
            label="username"
            onChange={({ target }) => setUsername(target.value)}
            id="username"
          />
        </div>
        <div>
          <TextField
            type="password"
            size="small"
            label="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            id="password"
          />
        </div>
        <Button variant="contained" color="primary" id="login-button" type="submit">
          login
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
