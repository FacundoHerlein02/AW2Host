import mongoose from 'mongoose';
import 'dotenv/config';
const MONGODB_URI= process.env.MONGODB_URI;

//Verifica si existe la conexion, sino la crea
let cached = (global.mongoose || {conn:null,promise:null});

export const connectDataBase = async()=>{
    if(cached.conn) return cached.conn
    if(!MONGODB_URI) throw new Error('MONGODB_URI is missing')
    //Conecta a la BD y la crea si no existe
    cached.promise= cached.promise || mongoose.connect (MONGODB_URI,{
        dbName:'FastMotos',
        bufferCommands: false
    });
    cached.conn= await cached.promise;
    return cached.conn    
};
