import chai from 'chai'
import supertest from 'supertest'
import adoptionsController from '../controllers/adoptions.controller.js';

const expect = chai.expect
const requester = supertest('http://localhost:8080')

describe('Test Adoptme', () => {

    describe('Test adoption.router', function() {

        let user, pet, adoption

        before(async function(){
            // Registro de los datos para el testing
            const userMock = {
                first_name: "Misuki",
                last_name: "Alexandre",
                email: "snweudl2o@mail.com",
                password: "contrasena123"
            }
            const userResponse = await requester.post('/api/users').send(userMock)
            user = userResponse._body.payload
           
            const petMock = {
                name: "Sakura",
                specie: "Perro",
                birthDate: "2020-05-15",
                adopted: false
            }
            const petResponse = await requester.post('/api/pets').send(petMock)
            pet = petResponse._body.payload
        })

       
        

        // Test para el endpoint GET /api/adoptions/
        it('El endpoint GET /api/adoptions/ debe obtener todas las adopciones registradas', async () => {
            const { _body, statusCode } = await requester.get('/api/adoptions/')
            expect(statusCode).to.equal(200)
            expect(_body).to.have.property('status', 'success')
            expect(Array.isArray(_body.payload)).to.be.ok
        })


        // Test para el endpoint POST /api/adoptions/:uid/:pid 
        it('El endpoint POST /api/adoptions/:uid/:pid debe registrar una adopción correctamente', async () => {
            const { _body, statusCode } = await requester.post(`/api/adoptions/${user._id}/${pet._id}`)
            expect(statusCode).to.equal(200)
            expect(_body).to.have.property('status', 'success')
            adoption = _body.payload
        })

        it('El endpoint POST /api/adoptions/:uid/:pid debe devolver error 400 si la mascota ya fue adoptada', async () => {
            const { _body, statusCode } = await requester.post(`/api/adoptions/${user._id}/${pet._id}`)
            expect(statusCode).to.equal(400)
            expect(_body).to.have.property('status', 'error')
            expect(_body).to.have.property('error', 'Pet is already adopted')
        })

        it('El endpoint POST /api/adoptions/:uid/:pid debe devolver error 404 si el usuario no existe', async () => {
            const fakeUserId = '65a7f89b6e2d3c0098765432'
            const { _body, statusCode } = await requester.post(`/api/adoptions/${fakeUserId}/${pet._id}`)
            expect(statusCode).to.equal(404)
            expect(_body).to.have.property('status', 'error')
            expect(_body).to.have.property('error', 'user Not found')
        })

        it('El endpoint POST /api/adoptions/:uid/:pid debe devolver error 404 si la mascota no existe', async () => {
            const fakePetId = '65a7f89b6e2d3c0098765434'
            const { _body, statusCode } = await requester.post(`/api/adoptions/${user._id}/${fakePetId}`)
            expect(statusCode).to.equal(404)
            expect(_body).to.have.property('status', 'error')
            expect(_body).to.have.property('error', 'Pet not found')
        })

        it('Debe devolver un error 400 si el ID del usuario es inválido', async () => {
            const invalidUserId = '123user'
            const { _body, statusCode } = await requester.post(`/api/adoptions/${invalidUserId}/${pet._id}`)
            expect(statusCode).to.equal(400)
            expect(_body).to.have.property('status', 'error')
            expect(_body).to.have.property('error', 'Invalid ID format')
        });
    
        it('Debe devolver un error 400 si el ID de la mascota es inválido', async () => {
            const invalidPetId = '123pet'
            const { _body, statusCode } = await requester.post(`/api/adoptions/${user._id}/${invalidPetId}`)
            expect(statusCode).to.equal(400)
            expect(_body).to.have.property('status', 'error')
            expect(_body).to.have.property('error', 'Invalid ID format')
        });


        // Test para el endpoint GET /api/adoptions/:aid
        it('El endpoint GET /api/adoptions/:aid debe obtener el registro de una adopción por ID', async () => {
            const { _body, statusCode } = await requester.get(`/api/adoptions/${adoption._id}`)
            expect(statusCode).to.equal(200)
            expect(_body).to.have.property('status', 'success')
            expect(_body.payload).to.have.property('_id', adoption._id)
            
        })

        it('Debe devolver un error 404 si la adopción no existe', async () => {
            const fakeAdoptionId = '65a7f89b6e2d3c0098765439';
            const { _body, statusCode } = await requester.get(`/api/adoptions/${fakeAdoptionId}`);
            expect(statusCode).to.equal(404);
            expect(_body).to.have.property('status', 'error');
            expect(_body).to.have.property('error', 'Adoption not found');
        });

        it('Debe devolver un error 400 si el ID de la adopción es inválido', async () => {
            const invalidAdoptionId = '123adoption'
            const { _body, statusCode } = await requester.get(`/api/adoptions/${invalidAdoptionId}`)
            expect(statusCode).to.equal(400)
            expect(_body).to.have.property('status', 'error')
            expect(_body).to.have.property('error', 'Invalid ID format')
        });

        after(async function(){
            // Limpieza de los datos
            const userDelete = await requester.delete(`/api/users/${user._id}`)
            const petDelete = await requester.delete(`/api/pets/${pet._id}`)
            
        })

        

    })

})