import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Pokecard from '../components/Pokedex/PokeCard'
import SelectTypes from '../components/Pokedex/SelectTypes'

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
            setPokemons({results})
          })
          .catch(err => console.log(err))
      }
  }, [selectValue])

  const handleSubmit = e =>{
    e.preventDefault()
    const inputValue = e.target.pokemon.value.trim().toLowerCase()
    navigate(`/pokedex/${inputValue}`)
    e.target.pokemon.value = ''
  }

  return (
    <div className='pokeDex__container'>
      <header>
      <h1>Pokedex</h1>
        {/* <img src="" alt="" /> */}
      </header>
      <h1>Hello <span>{nameTrainer}</span>, here you'll find your favorite Pokemon</h1>
      <form onSubmit={handleSubmit}>
      <input type="text" id="pokemon" />
      <button>Search Pokemon</button>
      </form>
      <SelectTypes
      setSelectValue={setSelectValue}/>
      <div className='pokeItem__container'>
        {
          pokemons?.results.map(pokemon => (
            <Pokecard
              key={pokemon.url}
              pokemon={pokemon}
            />
          ))
        }
      </div>
    </div>
  )
}

export default Pokedex