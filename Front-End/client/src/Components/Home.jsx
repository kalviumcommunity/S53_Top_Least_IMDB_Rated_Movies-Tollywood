import "../App.css";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import animation from "../assets/lottie-movie.json";
import lottie from "lottie-web";
import { AppContext } from "../ParentContext";

function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { login } = useContext(AppContext);

  useEffect(() => {
    async function fetchData() {
      const url = "https://s53-top-least-imdb-rated-movies-tollywood.onrender.com/movies/movies";
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

  const animationOption = {
    loop: true,
    autoplay: true,
    animationData: animation,
    rendererSettings: {
      preserveAspectRatio: "xMidyMid slice",
    },
  };

  const deleteItem = async (id) => {
    try {
      await axios.delete(
        `https://s53-top-least-imdb-rated-movies-tollywood.onrender.com/movies/${id}`
      );
      console.log("Movie deleted Successfully");
      // Refetch data after deletion
      fetchData();
    } catch (error) {
      console.log("Error in deleting movie", error);
    }
  };

  useEffect(() => {
    const animationContainer = document.getElementById("lottie-animation");
    lottie.loadAnimation({
      container: animationContainer,
      ...animationOption,
    });
  }, []);

  return (
    <div>
      {loading && (
        <div
          id="lottie-animation"
          style={{ width: "350px", margin: "auto", marginTop: "18%" }}
        ></div>
      )}
      <div className="all-movies2" style={{ filter: login ? "none" : "blur(10px)" }}>
        {data.map((movie) => (
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
