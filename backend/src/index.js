import dotenv from 'dotenv';
import connectdb from './db/configmongo.js';
import {app} from './app.js'

dotenv.config({
    path:'./env'
});


connectdb()
.then(()=>{
    app.listen(process.env.PORT || 8000,()=>{
        console.log(`Server is running of the port ${process.env.PORT}`)
    })
})
.catch((error)=>{
    console.log("Mongodb connection failed",error);
})
