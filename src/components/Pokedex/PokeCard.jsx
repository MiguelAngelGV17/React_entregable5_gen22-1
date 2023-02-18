import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const PokeCard = ({pokemon}) => {

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
    onClick={handleClick}
    className='poke__card-container'
    >
        <header>
            <img src={poke?.sprites.other['official-artwork'].front_default} alt="" />
        </header>
        <h2>{poke?.name}</h2>
        <ul>
            {
                poke?.types.map(type =>(
                    <li key={type.type.name}>{type.type.name}</li>
                ))
            }
        </ul>
        <hr />
        <ul>
            {
                poke?.stats.map(stat => (
                <li key={stat.stat.url}>
                    <span>{stat.stat.name} </span>
                    <span>{stat.base_stat}</span>
                </li>
                ))
            }
        </ul>
    </article>
  )
}

export default PokeCard