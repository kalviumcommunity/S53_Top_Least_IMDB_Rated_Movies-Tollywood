import "../App.css";
import { useEffect, useState } from "react";
import axios from "axios";

function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const url = "http://localhost:3000/movies";
      axios.get(url).then((res) => {
        console.log(res);
        setData(res.data);
        console.log();
      });
    }

    fetchData();
  },[]);

  return (
    <div className="all-movies">
      {data.map((e)=>(
        <div className="each-movie">
          <img src={e.Image} alt="Image not found" />
          <p>Hero :{e.Hero}</p>
          <p>Title :{e.Title}</p>
          <p>Ratings :{e.Ratings}</p>
          <p>Director :{e.Director}</p>
        </div>
      ))}
    </div>
  );
}

export default Home;
