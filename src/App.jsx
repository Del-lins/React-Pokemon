import { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import axios from "axios";

import "./App.css";

function App() {
  const [pokemons, setPokemons] = useState({});
  const [input, setInpunt] = useState("");

  const getpokemons = async (id) => {
    try {
      const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
      setPokemons((prevPokemon) => ({ ...prevPokemon, [id]: res.data }));
    } catch (error) {
      console.log(error);
    }
  };

  const buscarPokemon = Object.values(pokemons).filter(
    (pokemon) =>
      pokemon.name.toLocaleLowerCase().includes(input.toLocaleLowerCase()) ||
      pokemon.id === parseInt(input)
  );

  useEffect(() => {
    const listPokemons = () =>
      Array(30)
        .fill()
        .map((_, index) => getpokemons(index + 1));
    listPokemons();
  }, []);

  return (
    <>
      <div className="container">
        <h1>DMs Pokedevs</h1>
        <div className="input-container">
          <BiSearch size={40} color="#fff" />
          <input
            type="search"
            placeholder="Pokemon"
            className="input"
            value={input}
            onChange={({ target }) => setInpunt(target.value)}
          />
        </div>

        <ul className="pokemons">
          {buscarPokemon.map(({ id, name, types }) => (
            <li key={id} className={`card ${types[0].type.name}`}>
              <img
                className="card-img"
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}
                alt={name}
              />
              <h2>
                {id}. {name}
              </h2>
              <p className="type">
                {types.map((item) => item.type.name).join(" || ")}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
