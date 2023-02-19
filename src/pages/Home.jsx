import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setNameTrainer } from '../store/slices/trainerName.slice'
import { setOpenPokeball } from '../store/slices/openPokeball.slice'
import '../styles/home.css'

const Home = () => {
  const { openPokeBall } = useSelector((state => state))

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = e => {
    e.preventDefault()
    dispatch(setNameTrainer(e.target.name.value.trim()))
    e.target.name.value = ''
    navigate('/pokedex')
  }
  const handleSearch = () => {
    dispatch(setOpenPokeball())
  }

  return (
    <div className='home_container'>
      <div
        onClick={handleSearch}
        className={`home_btn_open ${!openPokeBall && `hidden_btn`}`}
      >Push</div>
      <div className='home_top'>
        <p className='circle_center_top top'></p>
        <p className='circle left'></p>
        <p className='circle right'></p>
        <p className='circle left small'></p>
        <p className='circle right small'></p>
        <img
          className='home_logo'
          src="../logo-pokedex.png"
          alt="logo-pokedex.png" />
      </div>
      <div className={`container_form ${openPokeBall && `open_pokeBall`}`}>
        <div className='home_form '>
          <h1></h1>
          <h2>Hello Trainer!</h2>
          <p>Give me your name to start the adventure</p>
          <form onSubmit={handleSubmit}>
            <input id='name' type="text" />
            <button>Start</button>
          </form>
        </div>

      </div>
      <div className='home_bottom'>
        <p className='circle_center_bottom bottom'></p>
        <p className='circle left_b'></p>
        <p className='circle right_b'></p>
        <p className='circle left_b small'></p>
        <p className='circle right_b small'></p>
      </div>
    </div>
  )
}

export default Home