import React, { useState } from 'react'
import axios from 'axios'

const CardMovies = ({movie, getAllMovies, setUpdateInfo, handleOpenForm}) => {
    const deleteMovie = () =>{
        const URL = `https://movies-crud-academlo.herokuapp.com/movies/${movie.id}/`
        axios.delete(URL)
        .then(res => {
            console.log(res.data)
            getAllMovies()
        })
        .catch(err=>console.log(err))
    }

    const handleUpdate = () =>{
        setUpdateInfo(movie)
        handleOpenForm()
    }

    return (
        <article className='card'>
            <h2 className='card__title'>{movie.name}</h2>
            <ul className='card__list'>
                <li className='card__item'>Genre <span className='card__span'>{movie.genre}</span></li>
                <li className='card__item'>Duration <span className='card__span'>{movie.duration}</span></li>
                <li className='card__item'>Relase Date <span className='card__span'>{movie['release_date']}</span></li>
            </ul>
            <footer className='card__btn'>
                <button onClick={deleteMovie} className='card__delete'>Delete</button>
                <button onClick ={handleUpdate} className='card__update'>Update</button>
            </footer>
        </article>
    )
}

export default CardMovies