import errorNum from "../../services/errors/errorsCode.js";

export default (error, req, res, next)=>{
    switch (error.code) {
        case errorNum.DATABASE_ERROR:
            res.send({status:"ERROR",error: error.name})
            break;
        case errorNum.INVALID_PARAMS:
            res.send({status:"ERROR",error: error.name})
            break;
        case errorNum.INVALID_TYPE:
            res.send({status:"ERROR",error: error.name})
            break;
        case errorNum.ROUTING_ERROR:
            
            break;
    
        default:
            res.send({status:"ERROR",error: 'Error desconocido'})
            break;
    }
}