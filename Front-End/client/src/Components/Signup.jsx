import React, { useState } from "react";

function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const[signUpSuccess,setSignUpSuccess] = useState(false)

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = () => {
    console.log("Username:", username);
    console.log("Password:", password);

    setUsername("")
    setPassword("")
    setSignUpSuccess(true)
  };

  return (
    <div className="signUpPage">
      <div>
        <p className="signup">SIGN UP</p>
        <p className="username">Username :</p>
        <input
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={handleUsernameChange}
        />
        <p className="password">Password :</p>
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={handlePasswordChange}
        />
      </div>
      <button className="signupBtn" onClick={handleSubmit}>
        SIGNUP
      </button>
    </div>
  );
}

export default Signup;
