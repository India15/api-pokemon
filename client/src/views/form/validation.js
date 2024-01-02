const validation = (pokemon) => {
    const errors = {}
//   typeName -----------------------
if(pokemon.name){
    const regexName = /^[a-zA-Z]+$/
    if(pokemon.name.length < 3 || pokemon.name.length > 12){
        errors.name = "Rango de 3 a 12 caracteres"
    }
    if(!regexName.test(pokemon.name)){
        errors.name = "Debe contener solo letras"
    }
}



return errors;
}

export default validation