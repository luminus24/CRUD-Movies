import React, { useEffect } from 'react'
import axios from 'axios'
import { useForm } from 'react-hook-form'

const Form = ({getAllMovies,updateInfo,setUpdateInfo, handleCloseForm}) => {

    const defaultValue = {
        name:'' ,
        genre:'',
        duration: '',
        release_date:''

    }
    useEffect(() => {
        if(updateInfo){
            reset(updateInfo)
        }
    }, [updateInfo])

    const createMovie = data =>{
        const URL = 'https://movies-crud-academlo.herokuapp.com/movies/'
        axios.post(URL, data)
            .then(res=>{
                console.log(res.data)
                getAllMovies()
            })
            .catch(err =>console.log(err))
        reset(defaultValue)
    }

    const updateMovie = data =>{
        const URL = `https://movies-crud-academlo.herokuapp.com/movies/${updateInfo.id}/`
        axios.patch(URL,data)
            .then(res =>{
                console.log(res.data)
                getAllMovies()
            })
            .catch(err=>console.log(err))
    }
    const {handleSubmit, register, reset} = useForm()

    const submit = data =>{
        if(updateInfo){
            updateMovie(data)
            setUpdateInfo()
        }else{
            createMovie(data)
        }
        reset(defaultValue)
        handleCloseForm()
    }
    return (
        <form onSubmit ={handleSubmit(submit)} className='form'>
            <h2>{updateInfo ? "Update Movie": 'Create Movie'}</h2>
            <ul>
                <li>
                    <label htmlFor="name">Name</label>
                    <input {...register('name')} type="text" id='name' />
                </li>
                <li>
                    <label htmlFor="genre">Genre</label>
                    <input {...register('genre')} type="text" id='genre' />
                </li>
                <li>
                    <label htmlFor="duration">Duration</label>
                    <input {...register('duration')} type="text" id='duration' />
                </li>
                <li>
                    <label htmlFor="name">Release Date</label>
                    <input {...register('release_date')} type="date" id='release_date' />
                </li>
            </ul>
            <button className='form__btn'>{updateInfo ? 'Update':'Create'}</button>
        </form>
    )
}



export default Form