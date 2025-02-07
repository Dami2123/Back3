
export const swaggerOptions= {
    definition:{
        openapi: '3.0.1',
        info: {
            title: 'API Adoptme - Documentacion',
            description: 'Documentacion de los endpoints de la API de la APP web Adoptme'
        }
    },
    apis: [`./src/docs/**/*.yaml`]

}