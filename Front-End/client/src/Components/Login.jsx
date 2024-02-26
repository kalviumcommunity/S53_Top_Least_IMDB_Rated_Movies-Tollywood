import React, { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from "axios"
import { AppContext } from '../ParentContext';
import { useNavigate } from "react-router-dom"

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { login,setlogin } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    const data = localStorage.getItem("isLoggedin");
    // const isLoggedin = data === "true";
    if (data==="true") {
      navigate("/");
    }
  }, []);

  const formSubmitHandler = async (data) => {
    try {
      const response = await axios.post("http://localhost:3000/movies/loginform", data);
      if (response && response.data.Message === "Login success") {
        alert("Login success");
        setlogin(true);
        localStorage.setItem("isLoggedin", true);
        navigate("/");
      } else {
        alert("Please enter correct credentials");
      }
    } catch (error) {
      console.log("error:", error.message);
    }
  };

  return (
    <div className="login">
      <fieldset>
        <legend style={{ color: "cyan" }}>Login</legend>
        <form onSubmit={handleSubmit(formSubmitHandler)}>
          <label style={{ color: 'gold' }}>Email:</label>
          <input
            type="email"
            name="Email"
            placeholder='Enter the Email address'
            {...register('Email', {
              required: 'Please provide the Email',
              minLength: {
                value: 5,
                message: 'Type valid Email',
              },
            })}
          />
          {errors.Email && <p className="error">{errors.Email.message}</p>}
          <label style={{ color: 'gold' }}>Password:</label>
          <input
            type="password"
            name="Password"
            placeholder='Enter the Password'
            {...register('Password', {
              required: 'Please Enter the Password',
              minLength: {
                value: 5,
                message: 'Please enter a valid password',
              },
            })}
          />
          {errors.Password && <p className="error">{errors.Password.message}</p>}
          <input type="submit" value={'Login'} className='signupBtn' />
        </form>
      </fieldset>
    </div>
  );
}
