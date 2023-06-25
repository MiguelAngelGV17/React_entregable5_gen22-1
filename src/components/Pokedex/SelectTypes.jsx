import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../store/slices/loading.slice";

const SelectTypes = ({ setSelectValue }) => {
  const [types, setTypes] = useState();
  const { loading } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLoading(true));
    const url = `https://pokeapi.co/api/v2/type`;
    axios
      .get(url)
      .then((res) => setTypes(res.data))
      .catch((err) => console.log(err))
      .finally(() => {
        setTimeout(() => {
          dispatch(setLoading(false));
        }, 1000);
      });
  }, []);

  const handleChange = (e) => {
    setSelectValue(e.target.value);
  };

  return (
    <select className="pokedex_select" onChange={handleChange}>
      <option value="allpokemons">All Pokemons</option>
      {types?.results.map((type) => (
        <option key={type.url} value={type.url}>
          {type.name}
        </option>
      ))}
    </select>
  );
};

export default SelectTypes;
