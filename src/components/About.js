import React from 'react';
import { NavLink } from 'react-router-dom';

const About = () => {
  return (
    <section>
      <div style={{padding: 10, border: '1px solid #ccc'}}>
        <h1 style={{textAlign: 'center'}}>Data Peserta Sanbercode Bootcamp Reactjs</h1>
        <ol>
          <li><strong style={{width: 100}}>Nama:</strong> Muhammad Fahrur Rifai</li> 
          <li><strong style={{width: 100}}>Email:</strong> mfahrurrifai[at]gmail.com</li> 
          <li><strong style={{width: 100}}>Sistem Operasi yang digunakan:</strong> MacOS</li>
          <li><strong style={{width: 100}}>Akun Github/Gitlab:</strong> @faytranevozter</li> 
          <li><strong style={{width: 100}}>Akun Telegram:</strong> @elfay12</li> 
        </ol>
      </div>
      <br/>
      <br/>
      <NavLink to="/">kembali ke index</NavLink>
    </section>
  );
};

export default About;
