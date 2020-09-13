import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Homepage = () => {
  const [dataMovies, setDataMovies] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get('http://backendexample.sanbercloud.com/api/movies');
        console.log(data)
        setDataMovies(data);
      } catch (err) {
        console.error(err);
      }
    };

    if (dataMovies === null) {
      fetchData();
    }
  }, [dataMovies, setDataMovies]);

  return (
    <section>
      <h1>Featured Posts</h1>
      <div id="article-list">
        {dataMovies !== null && dataMovies.map((v) => (
          <div className="article" key={v.id}>
            <h2>{`${v.title} (${v.year})`}</h2>
            <img src={v.image_url} alt={v.title} className="img" />
            <p className="genre">
              <strong>Genre : </strong>
              {v.genre}
            </p>
            <p className="rating">
              <strong>Rating : </strong>
              {`${v.rating}/10`}
            </p>
            <p>{v.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Homepage;
