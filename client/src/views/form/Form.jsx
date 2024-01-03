import styles from "./Form.module.css";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { createPokemon, cerrarNavbar, getTypes } from "../../redux/action";
import { Link } from "react-router-dom";
import axios from "axios";
import validationSubmit from "./validationSubmit";

const Form = () => {
  const dispatch = useDispatch();
  const pokemonTypes = useSelector((state) => state.pokemonTypes) || [];

  const [pokemon, setPokemon] = useState({
    name: "",
    image: "",
    health: 1,
    attack: 1,
    defense: 1,
    speed: 1,
    height: null,
    weight: null,
    types: [],
  });

  const [image, setImage] = useState(null);
  const [selectedTypesCount, setSelectedTypesCount] = useState(0);

  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const response = await axios.get("http://localhost:3001/types");
       
        dispatch(getTypes(response.data));
      } catch (error) {
        console.error ("Error fetching types:", error);
      }
    };

    fetchTypes();
  }, [dispatch]);

const handleChange = (event) => {
  const property = event.target.name;
  let value = event.target.value;

  if (property === "image") {
    setImage(event.target.files[0]);
    return;
  }

  const numericProperties = ["health", "attack", "defense", "speed", "height", "weight"];
  if (numericProperties.includes(property)) {
    value = Number(value);
  }

  setPokemon({ ...pokemon, [property]: value });
};

const submitImage = async () => {
  const formData = new FormData();
  formData.append("image", image);

  try {
    const response = await fetch("https://api.imgbb.com/1/upload?key=9e430c5e95bf23e4e358a33120c0c77d", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      const responseData = await response.json();
      return responseData.data.url;
    } else {
      console.error("Error uploading image to ImgBB:", response.statusText);
      return false;
    }
  } catch (error) {
    console.error("Error uploading image to ImgBB:", error);
    return false;
  }
};



  const handleClick = (event) => {
    const typeInput = event.target.name;

    if (selectedTypesCount === 2 && event.target.checked === true) {
      event.target.checked = false;
      return window.alert("No puedes tener más de 2 tipos por Pokemon");
    }

    const updatedTypes = event.target.checked
      ? [...pokemon.types, typeInput]
      : pokemon.types.filter((type) => type !== typeInput);

    // Actualizar el estado de 'types' utilizando setPokemon
    setPokemon({ ...pokemon, types: updatedTypes });
    setSelectedTypesCount(updatedTypes.length);
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  const errors = validationSubmit(pokemon);

  if (Object.keys(errors).length > 0) {
    console.error("Errores de validación:", errors);
    window.alert("Por favor, corrige los errores antes de continuar.");
    return;
  }

  try {
    const urlImage = await submitImage();
    await dispatch(createPokemon({ ...pokemon, image: urlImage }));
    window.alert("Pokemon creado");
  } catch (error) {
    console.error("Error al crear el Pokémon:", error);
    window.alert("Error al crear el Pokémon");
  }
};

  return (
    <div
      className={styles.form_container}
      onClick={() => dispatch(cerrarNavbar(false))}
    >
      <form onSubmit={handleSubmit} className={styles.form}>
      <Link className={styles.link} to="/home">
            <button className={styles.button_return}>Return</button>
          </Link>
        <h2 className={styles.title}>Create a new Pokemon</h2>
        <div className={styles.inputs_container}>
          <div className={styles.image_container}>
            <label htmlFor="image">Image</label>
            {image ? (
              <img
                src={URL.createObjectURL(image)}
                alt={pokemon.name}
                className={styles.pokemon_image}
              />
            ) : null}
            <input
              type="file"
              name="image"
              id="image"
              accept=".jpg, .png, image/*"
              required
              onChange={handleChange}
            />
          </div>
          <div className={styles.name_container}>
            <label htmlFor="name">Name</label>
            <input type="text" name="name" id="name" onChange={handleChange} />
          </div>
          <div className={styles.health_container}>
            <label htmlFor="health">Health</label>
            <input
              type="range"
              min="1"
              max="250"
              name="health"
              id="health"
              onChange={handleChange}
            />
            <p>{pokemon.health}</p>
          </div>
          <div className={styles.attack_container}>
            <label htmlFor="attack">Attack</label>
            <input
              type="range"
              min="1"
              max="200"
              name="attack"
              id="attack"
              onChange={handleChange}
            />
            <p>{pokemon.attack}</p>
          </div>
          <div className={styles.defense_container}>
            <label htmlFor="defense">Defense</label>
            <input
              type="range"
              min="1"
              max="200"
              name="defense"
              id="defense"
              onChange={handleChange}
            />
            <p>{pokemon.defense}</p>
          </div>
          <div className={styles.speed_container}>
            <label htmlFor="speed">Speed</label>
            <input
              type="range"
              min="1"
              max="200"
              name="speed"
              id="speed"
              onChange={handleChange}
            />
            <p>{pokemon.speed}</p>
          </div>
          <div className={styles.height_container}>
            <label htmlFor="height">Height</label>
            <input
              type="number"
              name="height"
              id="height"
              onChange={handleChange}
            />
          </div>
          <div className={styles.weight_container}>
            <label htmlFor="weight">Weight</label>
            <input
              type="number"
              name="weight"
              id="weight"
              onChange={handleChange}
            />
          </div>
        </div>
         <div className={styles.types_container}>
          <label>Select Types (Up to 2):</label>
          {pokemonTypes.map((type) => (
            <div key={type.type} className={styles.checkbox_container}>
              <input
                type="checkbox"
                name={type.type}
                id={type.type}
                onChange={handleClick}
                checked={pokemon.types.includes(type.type)}
              />
              <label htmlFor={type.type}>{type.type}</label>
            </div>
          ))}
        </div>
        <div className={styles.submit_container}>
          {/* Muestra los tipos seleccionados */}
          {pokemon.types.length > 0 ? (
            <p>Selected Types: {pokemon.types.join(", ")}</p>
          ) : null}
        </div>
        <button className={styles.submit_button} type="submit">Create</button>
      </form>
    </div>
    
  );
};

export default Form;
