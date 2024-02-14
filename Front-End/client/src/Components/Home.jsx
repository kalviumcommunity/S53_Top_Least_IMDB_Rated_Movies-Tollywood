import "../App.css";
import { useEffect, useState } from "react";
import axios from "axios";

function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const url = "https://s53-top-least-imdb-rated-movies-tollywood.onrender.com/movies/movies";
      axios.get(url).then((res) => {
        console.log(res);
        setData(res.data);
        console.log();
      });
    }

    fetchData();
  },[]);

  return (
    // <div className="all-movies">
    //   {data.map((e)=>(
    //     <div className="each-movie">
    //       <img src={e.Image} alt="Image not found" />
    //       <p>Hero :{e.Hero}</p>
    //       <p>Title :{e.Title}</p>
    //       <p>Ratings :⭐{e.Ratings}</p>
    //       <p>Director :{e.Director}</p>
    //     </div>
    //   ))}
    // </div>
    <div className="all-movies2">
      {data.map((e)=>(
        <div className="each-movie2">
                <div className="card card-side bg-base-100 shadow-xl">
                <figure><img src={e.Image} alt="Movie"/></figure>
                <div className="card-body">
                <h2 className="card-title">Title : {e.Title}</h2>
                <h2 className="card-title">Hero : {e.Hero}</h2>
                <h2 className="card-title">Ratings : ⭐{e.Ratings}</h2>
                <p>Click the button to view detailed analysis</p>
                <div className="card-actions justify-end">
                  
                  <button className="btn btn-primary">UPDATE</button>
                  <button className="btn btn-primary">DELETE</button>
                  <button className="btn btn-primary">GO</button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Home;
