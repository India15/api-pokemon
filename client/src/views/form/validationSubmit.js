const validationSubmit = (pokemon) => {
    const errors = {}

    // Validación para el nombre del Pokémon
    if (pokemon.name === "") {
        errors.name = "Debe contener un nombre";
    } else {
        const regexName = /^[a-zA-Z]+$/;

        if (pokemon.name.length < 3 || pokemon.name.length > 15) {
            errors.name = "Rango de 3 a 15 caracteres";
        }

        if (!regexName.test(pokemon.name)) {
            errors.name = "Debe contener solo letras";
        }
    }

    // Validación para la altura del Pokémon
    if (pokemon.height === null || isNaN(pokemon.height) || pokemon.height <= 0) {
        errors.height = "La altura debe ser un número positivo";
    }

    // Validación para el peso del Pokémon
    if (pokemon.weight === null || isNaN(pokemon.weight) || pokemon.weight <= 0) {
        errors.weight = "El peso debe ser un número positivo";
    }

    // Validación para el tipo del Pokémon
    if (!pokemon.types || pokemon.types.length === 0) {
        errors.types = "Debe seleccionar al menos un tipo";
    }

    return errors;
};

export default validationSubmit;


