import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FramePagesBottom from "../components/Pokedex/FramePagesBottom";
import FramePagesTop from "../components/Pokedex/FramePagesTop";
import Pokecard from "../components/Pokedex/PokeCard";
import SelectTypes from "../components/Pokedex/SelectTypes";
import { setLoading } from "../store/slices/loading.slice";
import "../styles/pokeDex.css";
import "../styles/pokeCard.css";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Mousewheel, EffectCoverflow } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";

const Pokedex = () => {
  const { nameTrainer, loading } = useSelector((state) => state);
  const [pokemons, setPokemons] = useState();
  const [selectValue, setSelectValue] = useState("allpokemons");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const myFunction = useEffect(() => {
    dispatch(setLoading(true));
    if (selectValue === "allpokemons") {
      const url = `https://pokeapi.co/api/v2/pokemon?limit=150&offset=0`;
      axios
        .get(url)
        .then((res) => {
          setPokemons(res.data);
        })
        .catch((err) => console.log(err))
        .finally(() => {
          // setTimeout(() => dispatch(setLoading(false)), 1000);
          // dispatch(setLoading(false));
        });
    } else {
      dispatch(setLoading(true));
      axios
        .get(selectValue)
        .then((res) => {
          const results = res.data.pokemon.map((e) => e.pokemon);
          setPokemons({ results });
        })
        .catch((err) => console.log(err))
        .finally(() => {
          // setTimeout(() => dispatch(setLoading(false)), 1000)
          // dispatch(setLoading(false));
        });
    }
  }, [selectValue]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const inputValue = e.target.pokemon.value.trim().toLowerCase();
    navigate(`/pokedex/${inputValue}`);
    e.target.pokemon.value = "";
  };

  // console.log(loading);

  return (
    <section className="">
      <FramePagesTop />
      <div className="pokedex__container">
        <div className="pokedex_header">
          <h1 className="pokedex_trainer">
            Hello
            <span className="pokedex_title"> {nameTrainer}</span>, here you can
            find your favorite pokemon
          </h1>
          <form className="pokedex_form" onSubmit={handleSubmit}>
            <div className="pokedex_input_field">
              <input
                type="text"
                id="pokemon"
                placeholder="Ej: pikachu"
                className="pokedex_input"
                maxLength={30}
              />
              <button className="pokedex_btn_search">Search</button>
            </div>
            <SelectTypes setSelectValue={setSelectValue} />
          </form>
        </div>
        {loading && <img src="../animated-loading.gif" alt="loading.png" />}
        <Swiper
          // install Swiper modules
          modules={[Navigation, Mousewheel, EffectCoverflow]}
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={1.89}
          coverflowEffect={{
            rotate: 60,
            stretch: -40,
            depth: 700,
            modifier: 1,
            slideShadows: true,
          }}
          navigation
          mousewheel
          className={`card_container ${loading}`}
        >
          {pokemons?.results.map((pokemon) => (
            <SwiperSlide key={pokemon.url}>
              <Pokecard
                pokemon={pokemon}
                // onLoad={() => {
                //   myFunction();
                // }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <FramePagesBottom />
    </section>
  );
};

export default Pokedex;
