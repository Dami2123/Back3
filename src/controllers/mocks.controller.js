import { generatePets, generateUsers } from "../utils/mockers.js";
import { usersService } from "../services/index.js";
import { petsService } from "../services/index.js";
import CustomeErrors from "../services/errors/customErrors.js";
import errorGeneratorInfo from "../services/errors/errorGeneratorInfo.js";
import errorNum from "../services/errors/errorsCode.js";

const getGeneratedPets = async(req,res)=>{
    
    res.send({status:"success",payload:generatePets(100)})
}

const getGeneratedUsers = async(req,res)=>{
  
    res.send({status:"success",payload: await generateUsers(100)})
}

const postGeneratePets = async(req,res)=>{
    const pets= await generatePets(parseInt(req.params.number), 'insert')
    let result=false
    for (let i = 0; i < pets.length; i++) {
        result = await petsService.create(pets[i]); 
        if(!result){
            CustomeErrors.createError({
                name: 'Error de escritura',
                cause: errorGeneratorInfo.databaseRegisterDataError(),
                message: 'Hubo un problema al tratar de registrar alguna de las Mascotas de la data generada',
                code: errorNum.DATABASE_ERROR
                    
            })
        }
    }
    
    res.send({status:"success",message: "Las mascotas se insertaron corectamente en BD"})
}

const postGenerateUsers = async(req,res)=>{
  
   const users= await generateUsers( parseInt(req.params.number), 'insert' )
   let result=false

    for (let i = 0; i < users.length; i++) {
        result = await usersService.create(users[i]); 
        if(!result){
            CustomeErrors.createError({
                name: 'Error de escritura',
                cause: errorGeneratorInfo.databaseRegisterDataError(),
                message: 'Hubo un problema al tratar de registrar alguno de los usuarios de la data generada',
                code: errorNum.DATABASE_ERROR
                    
            })
        }
    }
   
    res.send({status:"success",message: "Los usuarios se insertaron corectamente en BD"})
}


export default {
    getGeneratedPets,
    getGeneratedUsers,
    postGenerateUsers,
    postGeneratePets
}