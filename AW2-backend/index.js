import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import usuariosRouter from './routes/usuarios.routes.js';
import paymentRoutes from './routes/payment.routes.js';
import ventasRouter from './routes/ventas.routes.js';
import productosRouter from './routes/productos.routes.js';

const app= express() //crea una instancia, facilita la creacion de servers
dotenv.config()//Trae las variables de entorno
//Configura el puerto
const port= process.env.PORT || 3000
//Se usa para que el server entienda json
app.use(express.json());

//Muestra en consola las peticiones al server
app.use(morgan('dev'))

// app.use(cors({
//     origin:'https://fastmotos.netlify.app/'
// }))
app.use(cors());

/*RUTAS DE USUARIOS*/
app.use('/usuarios',usuariosRouter)
/*RUTAS DE PRODUCTOS*/
app.use('/productos',productosRouter)
/*RUTAS DE PAGOS*/
app.use('/payment',paymentRoutes)
/*RUTAS DE VENTAS*/
app.use('/ventas',ventasRouter)


//Levanta el Front-End
// app.use(express.static ('./public'))
//Levanta el servidor. Rutas End-Point
app.listen(port,()=>{
    console.log(`Servidor levantado en el puerto ${port}`)
})

