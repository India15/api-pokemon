const validationSubmit = (pokemon) => {
    const errors = {}
    // datos obligatorios que se envien sin modificar nada (deben validarse)
    if(pokemon.name === ""){
        errors.name = "Debe contener un nombre"
    }
   
    // datos obligatorios que se envian modificados sin nada (deben validarse)
    if(pokemon.name.length > 0){
        const regexName = /^[a-zA-Z]+$/
        if(pokemon.name.length < 3 || pokemon.name.length > 15){
            errors.name = "Rango de 3 a 12 caracteres"
        }
        if(!regexName.test(pokemon.name)){
        errors.name = "Debe de contener solo letras"
        }
    }
   
    return errors
}

export default validationSubmit