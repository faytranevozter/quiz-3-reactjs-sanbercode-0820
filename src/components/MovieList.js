import React, { useContext, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../contexts/Authorization';
import { Redirect } from 'react-router-dom';

const MovieList = () => {
  const [dataMovies, setDataMovies] = useState(null);
  const [disableSubmit, setDisableSubmit] = useState(false);
  const [input, setInput] = useState({
    imageUrl: '',
    title: '',
    description: '',
    year: 0,
    duration: 0,
    genre: '',
    rating: 0,
    id: null,
  });

  const [isLogin] = useContext(AuthContext);

  // prevent bug api & bypass http on https site
  const prefixApi = 'https://cors-anywhere.herokuapp.com/';
  const apiUrl = `${prefixApi}http://backendexample.sanbercloud.com/api/movies`;

  const iImageUrl = useRef();
  const iTitle = useRef();
  const iDescription = useRef();
  const iYear = useRef();
  const iDuration = useRef();
  const iGenre = useRef();
  const iRating = useRef();
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(apiUrl);
        setDataMovies(data);
      } catch (err) {
        console.error(err);
      }
    };
    if (dataMovies === null) {
      fetchData();
    }
  }, [dataMovies, apiUrl]);

  const handleChangeInput = () => {
    setInput({
      imageUrl: iImageUrl.current.value,
      title: iTitle.current.value,
      description: iDescription.current.value,
      year: iYear.current.value,
      duration: iDuration.current.value,
      genre: iGenre.current.value,
      rating: iRating.current.value,
      id: input.id,
    });
  };

  const handleEditBtn = (id) => {
    const row = dataMovies.find((v) => v.id === id);
    setInput({
      imageUrl: row.image_url,
      title: row.title,
      description: row.description,
      year: row.year,
      duration: row.duration,
      genre: row.genre,
      rating: row.rating,
      name: row.name,
      price: row.price,
      weight: row.weight,
      id,
    });
  };

  const handleDeleteBtn = async (id) => {
    try {
      await axios.delete(`${apiUrl}/${id}`);
      const newData = dataMovies.filter((v) => v.id !== id);
      setDataMovies(newData);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setDisableSubmit(true);
    const {
      id,
      imageUrl,
      title,
      description,
      year,
      duration,
      genre,
      rating,
    } = input;
    try {
      if (id === null) {
        // add data
        const { data: newRow } = await axios.post(apiUrl, {
          image_url: imageUrl,
          title,
          description,
          year,
          duration,
          genre,
          rating,
        });

        setDataMovies([
          ...dataMovies,
          newRow
        ]);
      } else {
        // update
        const { data: updatedRow } = await axios.put(`${apiUrl}/${id}`, {
          image_url: imageUrl,
          title,
          description,
          year,
          duration,
          genre,
          rating,
        });
        const newData = dataMovies.map((v) => {
          if (v.id === id) {
            return updatedRow;
          }
          return v;
        });
        
        setDataMovies(newData);
      }

      setInput({
        imageUrl: '',
        title: '',
        description: '',
        year: 0,
        duration: 0,
        genre: '',
        rating: 0,
        id: null,
      });
      setDisableSubmit(false);
    } catch (err) {
      console.error(err);
    }
  };

  return !isLogin ? <Redirect to="/login" /> : (
    <section>
      <h1>Tabel Harga Buah</h1>
      <table className="custom">
        <thead>
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Description</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {dataMovies !== null && dataMovies.map((v) => (
            <tr key={v.id}>
              <td>
                <img src={v.image_url} alt="Movie Cover" style={{width:100}} />
              </td>
              <td style={{verticalAlign:'top'}}>
                <strong>Title (Year) : </strong>
                <br />
                {`${v.title} (${v.year})`}
                <br />
                <strong>Genre : </strong>
                <br />
                {v.genre}
                <br />
                <strong>Duration : </strong>
                <br />
                {`${v.duration}min`}
                <br />
              </td>
              <td style={{verticalAlign:'top'}}>{v.description}</td>
              <td>
                <button type="button" onClick={() => handleEditBtn(v.id)}>Edit</button>
                <button type="button" onClick={() => handleDeleteBtn(v.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <br />
      <h2>Form</h2>

      <form style={{ textAlign: 'center' }} onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input type="text" ref={iTitle} required value={input.title} onChange={handleChangeInput} />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea ref={iDescription} required value={input.description} onChange={handleChangeInput} />
        </div>
        <div className="form-group">
          <label>Year</label>
          <input type="number" ref={iYear} required value={input.year} onChange={handleChangeInput} />
        </div>
        <div className="form-group">
          <label>Duration</label>
          <input type="number" ref={iDuration} required value={input.duration} onChange={handleChangeInput} />
        </div>
        <div className="form-group">
          <label>Genre</label>
          <input type="text" ref={iGenre} required value={input.genre} onChange={handleChangeInput} />
        </div>
        <div className="form-group">
          <label>Rating</label>
          <input type="number" min="0" max="10" ref={iRating} required value={input.rating} onChange={handleChangeInput} />
        </div>
        <div className="form-group">
          <label>ImageUrl</label>
          <input type="text" ref={iImageUrl} required value={input.imageUrl} onChange={handleChangeInput} />
        </div>
        <div className="form-group">
          <button type="submit" className="btn block" disabled={disableSubmit}>Save</button>
        </div>
      </form>
    </section>
  );
};

export default MovieList;
