import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import FramePagesBottom from '../components/Pokedex/FramePagesBottom'
import FramePagesTop from '../components/Pokedex/FramePagesTop'
import Pokecard from '../components/Pokedex/PokeCard'
import SelectTypes from '../components/Pokedex/SelectTypes'
import '../styles/pokeDex.css'

const Pokedex = () => {

  const { nameTrainer } = useSelector(state => state)
  const [pokemons, setPokemons] = useState()
  const [selectValue, setSelectValue] = useState('allpokemons')

  const navigate = useNavigate()

  useEffect(() => {
    if (selectValue === 'allpokemons') {
      const url = `https://pokeapi.co/api/v2/pokemon?limit=10&offset=0`
      axios.get(url)
        .then(res => setPokemons(res.data))
        .catch(err => console.log(err))

    } else {
      axios.get(selectValue)
        .then(res => {
          const results = res.data.pokemon.map(e => e.pokemon)
          setPokemons({ results })
        })
        .catch(err => console.log(err))
    }
  }, [selectValue])

  const handleSubmit = e => {
    e.preventDefault()
    const inputValue = e.target.pokemon.value.trim().toLowerCase()
    navigate(`/pokedex/${inputValue}`)
    e.target.pokemon.value = ''
  }

  return (
    <div 
    className='pokedex__container'>
      <FramePagesTop />
      <div className='pokedex_header'>
        <h1 className='pokedex_trainer'>
          Hello
          <span className='pokedex_title'
          > {nameTrainer}
          </span>, here you can find your favorite pokemon
        </h1>
        <form 
        className='pokedex_form'
        onSubmit={handleSubmit}>
          <div>
          <input type="text" id="pokemon" placeholder='Search a pokemon'/>
          <button>Search</button>

          </div>
          <SelectTypes
            setSelectValue={setSelectValue} />
        </form>
      </div>
      <div className='card__container'>
        {
          pokemons?.results.map(pokemon => (
            <Pokecard
              key={pokemon.url}
              pokemon={pokemon}
            />
          ))
        }
      </div>
      <FramePagesBottom />
    </div>
  )
}

export default Pokedex