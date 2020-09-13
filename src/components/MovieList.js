import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';

const MovieList = () => {
  const [dataMovies, setDataMovies] = useState(null);
  const [disableSubmit, setDisableSubmit] = useState(false);
  const [input, setInput] = useState({
    name: '',
    price: '',
    weight: 0,
    id: null,
  });
  const inputName = useRef(null);
  const inputPrice = useRef(null);
  const inputWeight = useRef(null);

  const fetchData = async () => {
    try {
      const { data } = await axios.get('http://backendexample.sanbercloud.com/api/movies');
      setDataMovies(data);
    } catch (err) {
      console.error(err);
    }
  };
  
  useEffect(() => {
    if (dataMovies === null) {
      fetchData();
    }
  }, [dataMovies]);

  const handleChangeInput = () => {
    setInput({
      name: inputName.current.value,
      price: inputPrice.current.value,
      weight: inputWeight.current.value,
      id: input.id,
    });
  };

  const handleEditBtn = (id) => {
    const row = dataMovies.find((v) => v.id === id);
    setInput({
      name: row.name,
      price: row.price,
      weight: row.weight,
      id,
    });
  };

  const handleDeleteBtn = async (id) => {
    try {
      await axios.delete(`http://backendexample.sanbercloud.com/api/movies/${id}`);
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
      name,
      price,
      weight,
    } = input;
    try {
      if (id === null) {
        // add data
        const { data: newRow } = await axios.post('http://backendexample.sanbercloud.com/api/movies', {
          name,
          price,
          weight,
        });

        setDataMovies([
          ...dataMovies,
          newRow
        ]);
      } else {
        // update
        const { data: updatedRow } = await axios.put(`http://backendexample.sanbercloud.com/api/movies/${id}`, {
          name,
          price,
          weight,
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
        name: '',
        price: '',
        weight: 0,
        id: null,
      });
      setDisableSubmit(false);
    } catch (err) {
      console.error(err);
    }
  };

  const iImageUrl = useRef();
  const iTitle = useRef();
  const iDescription = useRef();
  const iYear = useRef();
  const iDuration = useRef();
  const iGenre = useRef();
  const iRating = useRef();
  return (
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
          <input type="text" ref={iTitle} />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea ref={iDescription} />
        </div>
        <div className="form-group">
          <label>Year</label>
          <input type="number" ref={iYear} />
        </div>
        <div className="form-group">
          <label>Duration</label>
          <input type="number" ref={iDuration} />
        </div>
        <div className="form-group">
          <label>Genre</label>
          <input type="text" ref={iGenre} />
        </div>
        <div className="form-group">
          <label>Rating</label>
          <input type="number" min="0" max="10" ref={iRating} />
        </div>
        <div className="form-group">
          <label>ImageUrl</label>
          <input type="text" ref={iImageUrl} />
        </div>
        <div className="form-group">
          <button type="submit" disabled={disableSubmit}>Save</button>
        </div>
      </form>
    </section>
  );
};

export default MovieList;
