import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FramePagesBottom from "../components/Pokedex/FramePagesBottom";
import FramePagesTop from "../components/Pokedex/FramePagesTop";
import "../styles/pokeInfo.css";
import { useDispatch, useSelector } from "react-redux";

const PokeInfo = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [poke, setPoke] = useState();
  const [hasError, setHasError] = useState(false);
  const { loading } = useSelector((state) => state);
  const dispatch = useDispatch();

  const myFunction = useEffect(() => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    axios
      .get(url)
      .then((res) => {
        setPoke(res.data);
        setHasError(false);
      })
      .catch((err) => {
        console.log(err);
        setHasError(true);
      });
  }, [id]);

  const handleClick = () => {
    navigate(`/pokedex`);
  };
  console.log(poke?.moves.length);
  if (hasError === "hello") {
    return (
      <>
        <h1> Pokemon with name "{id}" was not founded</h1>
        <button onClick={handleClick}>Try again</button>
      </>
    );
  } else {
    return (
      <section className="" onLoad={myFunction}>
        <FramePagesTop />
        {hasError ? (
          <header className="pokeInfo_container not-found">
            <h1 className="pokeInfo-error">
              Pokemon named <span>"{id}"</span> not founded
            </h1>
            <button onClick={handleClick}>Try again</button>
            <img src="../not-found.gif" alt="pokemon-not-found.png" />
          </header>
        ) : (
          <div className="pokeInfo_container">
            <div className="pokeInfo_items">
              <div className="pokeInfo_aside_1">
                <div className="aside1_items">
                  <img
                    className="pokeInfo_img"
                    src={poke?.sprites.other["official-artwork"].front_default}
                    alt=""
                  />
                  <div className="aside_1_heightAndWeight">
                    <h3 className={`color_${poke?.types[0].type.name}`}>
                      # {poke?.id}
                    </h3>
                    <li>
                      <small style={{ lineHeight: 1.5 + "em" }}>Height</small>
                      <h3>{poke?.height}</h3>
                    </li>
                    <li>
                      <small style={{ lineHeight: 1.5 + "em" }}>Weight</small>
                      <h3>{poke?.weight}</h3>
                    </li>
                  </div>
                </div>
                <h1
                  className={` pokeInfo_namePoke color_${poke?.types[0].type.name}`}
                >
                  {poke?.name}
                </h1>
                <div className="aside1_typeAndeAbility">
                  <ul>
                    <h4 style={{ marginBottom: 0.5 + "em" }}>Type</h4>
                    {poke?.types.map((type) => (
                      <span className="pokeInfo_types" key={type.type.name}>
                        {type.type.name}{" "}
                      </span>
                    ))}
                  </ul>
                  <ul>
                    <h4 style={{ marginBottom: 0.5 + "em" }}>Ability</h4>
                    {poke?.abilities.map((ability) => (
                      <span
                        className="pokeInfo_ability"
                        key={ability.ability.url}
                      >
                        {ability.ability.name}{" "}
                      </span>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pokeInfo_aside_2">
                <h1 className={`color_${poke?.types[0].type.name}`}>Stats</h1>
                {poke?.stats.map((stat) => (
                  <li key={stat.stat.url}>
                    <div className="aside2_text">
                      <span>{stat.stat.name}</span>
                      <span>{stat.base_stat} / 200</span>
                    </div>
                    <div className="aside2_barStat">
                      <p
                        className={`barStat`}
                        style={{ width: stat.base_stat / 2 + "%" }}
                      ></p>
                    </div>
                  </li>
                ))}
              </div>
              <div className="pokeInfo_aside_3">
                <h1
                  className={`color_${poke?.types[0].type.name}`}
                >{`Moves (${poke?.moves.length})`}</h1>
                <ul className="aside3_containerMoves">
                  {poke?.moves.map((move) => (
                    <li
                      key={move.move.name}
                      className={`aside3_move border_${poke?.types[0].type.name}`}
                    >
                      {move.move.name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
        <FramePagesBottom />
      </section>
    );
  }
};

export default PokeInfo;
