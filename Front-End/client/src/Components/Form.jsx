import React from 'react';
import { useForm } from "react-hook-form";

export default function FormsUse() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitSuccessful } } = useForm();

  const formSubmitHandler = (data) => {
    console.log(data);
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

          <input type="submit" className='submit' />
          <button onClick={reset}>RESET</button>
        </form>
      </fieldset>
    </div>
  );
}