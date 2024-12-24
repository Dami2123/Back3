import { Faker,en,es } from "@faker-js/faker" 
import { createHash } from "../utils/index.js"

const faker= new Faker({
    locale: [es, en]
})

export const generatePets= (number, mode='create')=>{
    const pets= []
    for (let i = 0; i <number; i++) {
        const pet= {
            _id: faker.database.mongodbObjectId(),
            name: faker.animal.petName(),
            specie: faker.animal.type(),
            birthDate: faker.date.birthdate(),
            adopted:false,
            image: faker.image.urlLoremFlickr({category: 'pet'})
        }

        if(mode==='insert') delete pet._id;
        
        pets.push( pet)
    }
    return pets
}

export const generateUsers= async(number,mode='create')=>{ 
    const users= []
    const password= await createHash('coder123')
    for (let i = 0; i <number; i++) {
        const user= {
            _id: faker.database.mongodbObjectId(),
            first_name: faker.person.firstName(),
            last_name: faker.person.lastName(),
            email: faker.internet.email(),
            password:password,
            role: faker.number.int()%2===0?'user':'admin',
            pets:[]
        }
        users.push(user)
        if(mode==='insert') delete user._id;

    }
    return users
}