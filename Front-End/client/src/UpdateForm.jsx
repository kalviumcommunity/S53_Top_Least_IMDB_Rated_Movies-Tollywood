import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from "axios";
import {useParams} from 'react-router-dom'

export default function Update() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const [review,setReview] = useState("")
  const {id} = useParams();
  const UpdatingReview = () =>{
    axios.patch(`https://s53-top-least-imdb-rated-movies-tollywood.onrender.com/movies/${id}`,{
      "Ratings" : review
    })
    .then((res)=>{
      console.log(res)
      console.log("updated")
    }).catch((err)=>{
      console.err(err)
    })

  }

  const formSubmitHandler = async (data) => {
    try {
      // const updatedData = await axios.patch(`https://s53-top-least-imdb-rated-movies-tollywood.onrender.com/movies/${id}`)
    } catch (error) {
      console.log("error:", error.message);
    }
  };

  return (
    <div className='updateForm'>
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
            onChange={(e)=>{setReview(e.target.value)}}
          />
          {errors.Ratings && <p className="error">{errors.Ratings.message}</p>}
          <button onClick={UpdatingReview}>SUBMIT</button>
        </form>
      </fieldset>
    </div>
  );
}
