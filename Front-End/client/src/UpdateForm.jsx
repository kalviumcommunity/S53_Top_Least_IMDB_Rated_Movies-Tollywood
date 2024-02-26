import React from 'react';
import { useForm } from 'react-hook-form';
import axios from "axios";

export default function Update() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const formSubmitHandler = async (data) => {
    try {
      const response = await axios.post("https://s53-top-least-imdb-rated-movies-tollywood.onrender.com/movies/update", data);
      console.log(response);
      if (response && response.data.Message === "User with this email already exists") {
        alert("This user already exists");
      }
    } catch (error) {
      console.log("error:", error.message);
    }
  };

  return (
    <div>
      <fieldset>
        <legend style={{color:"cyan"}}>Update</legend>
        <form onSubmit={handleSubmit(formSubmitHandler)}>
          <label style={{ color: 'gold' }}>Ratings</label>
          <input 
            type="text"
            name="Ratings"
            placeholder='Please update the Ratings'
            {...register('Ratings', {
              required: 'Please update the Ratings'
            })}
          />
          {errors.Ratings && <p className="error">{errors.Ratings.message}</p>}
          <button onClick={()=>{
            
          }}>SUBMIT</button>
        </form>
      </fieldset>
    </div>
  );
}
