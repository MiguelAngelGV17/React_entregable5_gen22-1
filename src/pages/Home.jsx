import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setNameTrainer } from '../store/slices/trainerName.slice'

const Home = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

const handleSubmit = e => {
    e.preventDefault()
    dispatch(setNameTrainer( e.target.name.value.trim()))
    e.target.name.value = ''
    navigate('/pokedex')
}

  return (
    <div>
      <div className='home_top'>
      </div>
      <div className='home_form'>
        <h1>Pokedex</h1>
        <h2>Hello Trainer</h2>
        <p>Give me your name to start the adventure</p>
        <form onSubmit={handleSubmit}>
            <input id='name' type="text"/>
            <button>Start</button>
        </form>
      </div>
      <div className='home_bottom'>
      </div>
    </div>
  )
}

export default Home