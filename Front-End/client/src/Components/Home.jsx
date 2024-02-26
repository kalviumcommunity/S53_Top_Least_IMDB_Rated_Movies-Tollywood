import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import animation from "../assets/lottie-movie.json";
import lottie from "lottie-web";
import { AppContext } from "../ParentContext";

function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedActor, setSelectedActor] = useState(null);
  const { login } = useContext(AppContext);

  useEffect(() => {
    async function fetchData() {
      const url = "http://localhost:3000/movies/movies";
      try {
        const res = await axios.get(url);
        setData(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    const animationContainer = document.getElementById("lottie-animation");
    const animationOption = {
      loop: true,
      autoplay: true,
      animationData: animation,
      rendererSettings: {
        preserveAspectRatio: "xMidyMid slice",
      },
    };
    lottie.loadAnimation({
      container: animationContainer,
      ...animationOption,
    });
  }, []);

  const deleteItem = async (id) => {
    try {
      await axios.delete(
        `https://s53-top-least-imdb-rated-movies-tollywood.onrender.com/movies/${id}`
      );
      console.log("Movie deleted Successfully");
      fetchData();
    } catch (error) {
      console.log("Error in deleting movie", error);
    }
  };

  const filteredMovies = selectedActor ? data.filter(movie => movie.Hero === selectedActor) : data;

  return (
    <div>
      {loading && (
        <div
          id="lottie-animation"
          style={{ width: "350px", margin: "auto", marginTop: "18%" }}
        ></div>
      )}
      <div className="all-movies2" style={{ filter: !login ? "blur(10px)" : "none" }}>
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn m-1">Filter By</div>
          <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
            <li><a onClick={() => setSelectedActor(null)}>All</a></li> 
            <li><a onClick={() => setSelectedActor("Mahesh Babu")}>Mahesh Babu</a></li>
            <li><a onClick={() => setSelectedActor("Ram Charan")}>Ram Charan</a></li>
            <li><a onClick={() => setSelectedActor("N.T.R")}>N.T.R</a></li>
            <li><a onClick={() => setSelectedActor("Nani")}>Nani</a></li>
            <li><a onClick={() => setSelectedActor("Raviteja")}>Raviteja</a></li>
            <li><a onClick={() => setSelectedActor("Prabhas")}>Prabhas</a></li>
          </ul>
        </div>
        {filteredMovies.map((movie) => (
          <div className="each-movie2" key={movie._id}>
            <div className="card card-side bg-base-100 shadow-xl">
              <figure>
                <img src={movie.Image} alt="Movie" />
              </figure>
              <div className="card-body">
                <h2 className="card-title">Title: {movie.Title}</h2>
                <h2 className="card-title">Hero: {movie.Hero}</h2>
                <h2 className="card-title">Ratings: ⭐{movie.Ratings}</h2>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary">UPDATE</button>
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      deleteItem(movie._id);
                    }}
                  >
                    DELETE
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
