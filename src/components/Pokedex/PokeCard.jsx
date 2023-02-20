import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../../styles/pokeCard.css'
import FramePagesTop from './FramePagesTop'

const PokeCard = ({ pokemon }) => {

  const [poke, setPoke] = useState()
  const navigate = useNavigate()

  useEffect(() => {
    axios.get(pokemon.url)
      .then(res => setPoke(res.data))
      .catch(err => console.log(err))
  }, [])

  const handleClick = () => {
    navigate(`/pokedex/${poke?.id}`)
  }

  return (
    <article
      className='poke__card-container'
      onClick={handleClick}
    >
      <header>
        <img 
        className='poke_card_img'
        src={poke?.sprites.other['official-artwork'].front_default} alt="img-pokemon" />
      </header>
      <h2>{poke?.name}</h2>
      <ul>
        {
          poke?.types.map(type => (
            <li key={type.type.name}>{type.type.name}</li>
          ))
        }
      </ul>
      <hr />
      <ul className='poke_card_status_pokemon'>
        {
          poke?.stats.map(stat => (
            <li 
            key={stat.stat.url}>
              <span> {stat.stat.name} </span>
              <span> {stat.base_stat} </span></li>
          ))
        }
      </ul>
    </article>
  )
}

export default PokeCard