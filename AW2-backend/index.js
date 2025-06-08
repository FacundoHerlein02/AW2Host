import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import usuariosRouter from './routes/usuarios.routes.js';
import ventasRouter from './routes/ventas.routes.js';
import productosRouter from './routes/productos.routes.js';

const app= express() //crea una instancia, facilita la creacion de servers
dotenv.config()//Trae las variables de entorno
//Configura el puerto
const port= process.env.PORT || 3000
//Se usa para que el server entienda json
app.use(express.json());

app.use(cors({
    origin: 'https://fastmotos.netlify.app/'
}))

/*RUTAS DE USUARIOS*/
app.use('/usuarios',usuariosRouter)
/*RUTAS DE PRODUCTOS*/
app.use('/productos',productosRouter)
/*RUTAS DE VENTAS*/
app.use('/ventas',ventasRouter)

//Levanta el Front-End
app.use(express.static ('./public'))
//Levanta el servidor. Rutas End-Point
app.listen(port,()=>{
    console.log(`Servidor levantado en el puerto ${port}`)
})

