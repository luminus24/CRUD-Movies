import axios from 'axios'
import { useEffect, useState } from 'react'
import './App.css'
import CardMovies from './Components/cardMovies'
import Form from './Components/Form'

function App() {

  const [movies ,setMovies] = useState()
  const [updateInfo, setUpdateInfo] = useState()
  const [openForm, setIsFormOpen] = useState(false)

  const getAllMovies = () =>{
    const URL = 'https://movies-crud-academlo.herokuapp.com/movies/'
    axios.get(URL)
      .then(res => setMovies(res.data))
      .catch(err=> console.log(err))
  }

  const handleOpenForm = () => setIsFormOpen(true)
  const handleCloseForm = () => setIsFormOpen(false)

  useEffect(() => {
    getAllMovies()
  }, [])


  return (
    <div className="App">
      <h1>Movies CRUD</h1>
      <button onClick={handleOpenForm} className='open__form'>Create Movie</button>
      <div className={openForm ? 'form__container' : 'form__none'}>
        <Form
          getAllMovies={getAllMovies}
          updateInfo={updateInfo}
          setUpdateInfo={setUpdateInfo}
          handleCloseForm={handleCloseForm}
        />
      </div>
      <div className='card-container'>
        {
          movies?.map(movie =>(
            <CardMovies
              key = {movie.id}
              movie = {movie}
              getAllMovies = {getAllMovies}
              setUpdateInfo={setUpdateInfo}
              handleOpenForm={handleOpenForm}
            />
          ))
        }
      </div>
    </div>
  )
}

export default App
