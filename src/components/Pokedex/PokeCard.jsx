import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../../styles/pokeCard.css'

const PokeCard = ({ pokemon }) => {

  const [poke, setPoke] = useState()
  const navigate = useNavigate()

  useEffect(() => {
    axios.get(pokemon.url)
      .then(res => {
        setPoke(res.data)
      })
      .catch(err => console.log(err))
  }, [])

  const handleClick = () => {
    navigate(`/pokedex/${poke?.id}`)
  }

  return (
    <article
      className={`poke__card_container border_${poke?.types[0].type.name}`}
      onClick={handleClick}
    >
      <header className={`poke_card_img `}>
        <img
          src={poke?.sprites.other['official-artwork'].front_default} alt="img-pokemon" />
      </header>
        <div className={`pokecard_bg_img ${poke?.types[0].type.name}`}></div>
      <div className='pokeCard_text'>
        <h2 className={`pokeCard_namePoke color_${poke?.types[0].type.name}`}>{poke?.name}</h2>
        <ul>
          {
            poke?.types.map(type => (
              <span key={type.type.name}>- {type.type.name}  - </span>
            ))
          }
        </ul>
        <hr className='poke_card_separator_line' />
        <ul className='poke_card_status_pokemon'>
          {/* {
            poke?.stats.map(stat => (
              <li
                key={stat.stat.url}>
                <span> {stat.stat.name} </span>
                <span> {stat.base_stat} </span></li>
            ))
          } */}
          <div>
          <li className='pokecard_stat'>
          <p>{poke?.stats[0].stat.name} </p>
          <p className={`pokecard_base_stat color_${poke?.types[0].type.name}`}>{poke?.stats[0].base_stat}</p>
          </li>
            
          <li>
          <p>{poke?.stats[2].stat.name} </p>
          <p className={`pokecard_base_stat color_${poke?.types[0].type.name}`}>{poke?.stats[2].base_stat}</p>
          </li>
          </div>

          <div>            
          <li className='pokecard_stat'>
          <p>{poke?.stats[1].stat.name} </p>
          <p className={`pokecard_base_stat color_${poke?.types[0].type.name}`}>{poke?.stats[1].base_stat}</p>
          </li>

          <li>
          <p>{poke?.stats[5].stat.name} </p>
          <p className={`pokecard_base_stat color_${poke?.types[0].type.name}`}>{poke?.stats[5].base_stat}</p>
          </li>
          </div>
        </ul>
      </div>
    </article>
  )
}

export default PokeCard