import React from 'react';
import '../Views/Global.css';
import  SmileSad from '../assets/smileySad2.png';

const Error = () => {
  return (
    <div className='Container'>
        <img src={SmileSad} alt="Error 404" />
        <h1>Oops</h1>
        <h3>Parece que algo deu errado</h3>
        
    </div>
  )
}

export default Error