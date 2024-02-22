import React from 'react';
import { useForm } from 'react-hook-form';
import axios from "axios"


export default function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    getValues,
  } = useForm();


  const formSubmitHandler = async (data) => {
    // console.log(data);
    try {
      const response = await axios.post("https://s53-top-least-imdb-rated-movies-tollywood.onrender.com/movies/signupForm", data)
      console.log(response)
      if(response){
        if (response.data.Message=="User with this email already exists"){
          alert("This user already exists")
        }
      }
   
    } catch (error) {
      console.log("error:", error.message)
    }
  };

  return (
    <div className="signup">
      <fieldset>
        <legend style={{color:"cyan"}}>Signup</legend>
        <form onSubmit={handleSubmit(formSubmitHandler)}>
          

          <label style={{ color: 'gold' }}>User Name:</label>
          <input 
            type="text"
            name="Username"
            placeholder='Enter the User Name'
            {...register('Username', {
              required: 'Please provide the User Name',
              minLength: {
                value: 4,
                message: 'Minimum four characters required',
              },
            })}
          />
          {errors.Username  && <p className="error">{errors.Username.message}</p>}
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

          <label style={{ color: 'gold' }}>Confirm Password:</label>
          <input
            type="password"
            name="ConfirmPassword"
            placeholder='Re-Enter your Password'
            {...register('ConfirmPassword', {
              required: 'Enter Confirm Password',
              validate: {
                matchesPassword: (value) => {
                  const password = getValues('Password');
                  return password === value || 'Passwords do not match';
                },
              },
            })}
          />
          {errors.ConfirmPassword && <p className="error">{errors.ConfirmPassword.message}</p>}
       
          <input type="submit" value={'Signup'} className='signupBtn' />
        </form>
      </fieldset>
    </div>
  );
}