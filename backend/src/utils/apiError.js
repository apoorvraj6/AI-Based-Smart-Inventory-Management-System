class ApiError extends Error {

    constructor(
        statusCode,
        message,
        errors = [],
        stack=""
    )
    {
        this.statusCode = statusCode,
        this.message = message,
        this.data = null,
        this.success = false,
        this.errors = errors
        
        if(stack){
            this.stack = stack;
        }
        else{
            Error.captureStackTrace(this,this.constructor);
        }
    }
} 

export default {ApiError}