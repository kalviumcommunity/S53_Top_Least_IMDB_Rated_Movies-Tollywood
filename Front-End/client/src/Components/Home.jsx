import "../App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import animation from "../assets/lottie-movie.json";
import lottie from "lottie-web";

function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const url = "https://s53-top-least-imdb-rated-movies-tollywood.onrender.com/movies/movies";
      axios.get(url).then((res) => {
        console.log(res);
        setData(res.data);
        setLoading(false);
      });
    }

    fetchData();
  }, []);

  const animationOption = {
    loop: true,
    autoplay: true,
    animationData: animation,
    rendererSettings: {
      preserveAspectRatio: 'xMidyMid slice'
    }
  };

  const deleteItem = async (id) => {
    try {
      await axios.delete(`https://s53-top-least-imdb-rated-movies-tollywood.onrender.com/movies/${id}`);
      console.log("Movie deleted Successfully");
      // fetchData()  
    } catch (error) {
      console.log("Error in deleting movie", error);
    }
  }

  useEffect(() => {
    const animationContainer = document.getElementById("lottie-animation");
    lottie.loadAnimation({
      container: animationContainer,
      ...animationOption
    });
  }, []);

  return (
    <div>
      {loading && (
        <div id="lottie-animation" style={{width:"350px",margin:"auto",marginTop:"18%"}}></div>
      )}
      <div className="all-movies2">
        {data.map((e) => (
          <div className="each-movie2">
            <div className="card card-side bg-base-100 shadow-xl">
              <figure><img src={e.Image} alt="Movie" /></figure>
              <div className="card-body">
                <h2 className="card-title">Title: {e.Title}</h2>
                <h2 className="card-title">Hero: {e.Hero}</h2>
                <h2 className="card-title">Ratings: ⭐{e.Ratings}</h2>
                <p>Click the button to view detailed analysis</p>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary">UPDATE</button>
                  <button className="btn btn-primary" onClick={() => {
                    deleteItem(e._id);
                  }}>DELETE</button>
                  <button className="btn btn-primary">GO</button>
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
