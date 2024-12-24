const registerUserError=()=>{
    return 'Uno o mas de lo datos del usuario son inválidos'

}

const registerPetsError=()=>{
    return 'Uno o mas de lo datos de la mascota son inválidos'

}

const databaseRegisterDataError= ()=>{

    return 'Problemas en al registrar los datos en BDD'
}

export default {
    registerUserError,
    registerPetsError,
    databaseRegisterDataError
}