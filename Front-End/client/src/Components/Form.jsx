import React from 'react';
import { useForm } from "react-hook-form";
import axios from "axios"

export default function FormsUse() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitSuccessful } } = useForm();

  const formSubmitHandler = async(data) => {

    try{
    const movieData= await axios.post("http://localhost:3000/movies/create",data)
    console.log(movieData);
    console.log(data);
  }catch(err){
    console.log(err,"error");
  }
  };

  return (
    <div className='form-container'>
      <fieldset>
        <form onSubmit={handleSubmit(formSubmitHandler)}>
          {isSubmitSuccessful && (
            <div className='success'>
              <p>Form filled Successful</p>
            </div>
          )}

          <label>Hero:</label>
          <input
            type="text"
            {...register("Hero", {
              required: "Please Enter the Hero name",
              minLength: { value: 4, message: "Minimum 4 characters are required" }
            })}
          />
          {errors.Hero && <p className='err'>{errors.Hero.message}</p>}

          <label>Title of the Movie:</label>
          <input
            type="text"
            {...register("Title", {
              required: "Please Enter the Movie name",
              minLength: { value: 4, message: "Minimum 4 characters are required" }
            })}
          />
          {errors.Title && <p className='err'>{errors.Title.message}</p>}

          <label>Ratings:</label>
          <input
            type="integer"
            {...register("Ratings", {
              required: "Fill the Ratings"
            })}
          />
          {errors.Ratings && <p className='err'>{errors.Ratings.message}</p>}

          <label>Director:</label>
          <input
            type='text'
            {...register("Director", {
              required: "Please enter the Director",
              minLength: { value: 4, message: "Minimum 4 characters are required" }
            })}
          />
          {errors.Director && <p className='err'>{errors.Director.message}</p>}


          <label>Image Link :</label>
          <input 
          type="text"
          {...register("Image",{
            required: "Please provide Image Link"
          })}
           />

          <input type="submit" className='submit' />
          <button onClick={reset}>RESET</button>
        </form>
      </fieldset>
    </div>
  );
}