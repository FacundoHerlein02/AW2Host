import { Router } from 'express';
import {decodeToken} from "../utils/middleware.js"
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken"
import 'dotenv/config';
const secret=process.env.SECRET;
//Actions Usuarios
import {allUsers,newUser,login,userById,findUser,updateClave,updateUser} from '../db/actions/usuarios.actions.js';
import { connectDataBase } from '../db/connection.js';
const router= Router();

// /usuarios
// GET
//Obtiene todos los usuarios
router.get('/allUsers',async (req,res)=>{
    try
    { 
        await connectDataBase();      
        let users=await allUsers();
        const result= users.map(e=>{
            return{
                Id: e._id,
                Nombre: e.nombre,
                Apellido: e.apellido,
                Usuario:e.usuario           
            }
        })
        if(result && result.length>0)
        {
            return res.status(200).json(result);
        }
        else
        {
            return res.status(404).json(`No se encontraron usuarios.`);
        }
    }
    catch(error)
    {
        return res.status(500).json({ error: "Error del servidor" });
    }
});
//Obtiene usuarios por id
router.get('/userById/:id',async(req,res)=>{    
    const id= req.params.id;
    try {
        await connectDataBase();
        const result=await userById({id});
        if(result)
        {
            res.status(200).json(result);
        }
        else
        {
            res.status(404).json(`${id} no encontrado`);
        }
    } catch (error) {
        res.status(500).json({ error: "Error del servidor" });
    }
});

//POST

//Crea Usuarios
router.post('/newUser',async(req,res)=>{    
    const {nombre,apellido,usuario,clave}=req.body
    try {
        await connectDataBase();       
        if(!nombre || !apellido || !usuario || !clave)
        {
            return res.status(404).json({ error: "Faltan datos obligatorios" });
        }
        else
        {
            // Valida si el usuario ya existe
            const existeUsuario = await findUser({usuario})
            if (existeUsuario) 
            {
                return res.status(409).json({ error: "El nombre de usuario ya está en uso"});
            }
            // Encriptar la contraseña antes de guardarla
            const contraseña = await bcrypt.hash(clave, 10);            
            // Agregar a la BD
            const nuevoUsuario= await newUser({nombre,apellido,usuario,contraseña})             
            if(nuevoUsuario)
            {
                const user={
                    id: nuevoUsuario._id,
                    nombre: nuevoUsuario.nombre,
                    apellido: nuevoUsuario.apellido,
                    usuario: nuevoUsuario.usuario                 
                }           
                // Responder con el nuevo usuario                
                const token= jwt.sign({...user},secret,{expiresIn:86400});              
                return res.status(200).json({ mensaje: "Register exitoso", token });
            }
            else
            {
                return res.status(401).json({ error: "No fue posible crear el usuario"});
            }                    
            
        }        
    } catch (error) {
        console.error(error);
        res.status(500).json({error: "Error del servidor"})
    }
});
//Login
router.post('/login',async (req,res)=>{    
    const {usuario,contraseña} = req.body;
    try {
        await connectDataBase();
        if(!usuario || !contraseña)
        {
            return res.status(404).json({ error: "Faltan completar campos" });
        }
        const userfind= await login({usuario})        
        if (!userfind) {
            return res.status(401).json({ error: "Usuario o contraseña incorrectos" });
        }
        // Compara la contraseña que mandó el usuario con la encriptada        
        const match = await bcrypt.compare(contraseña, userfind.contraseña);
        if(match)
        {
            const user={
                id: userfind._id,
                nombre: userfind.nombre,
                apellido: userfind.apellido,
                usuario: userfind.usuario                 
            }
            const token= jwt.sign({...user},secret,{expiresIn:86400})     
            return res.status(200).json({ mensaje: "Login exitoso", token });
        }
        else
        {
            res.status(401).json({ error: "Usuario o contraseña incorrectos" });
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({error:"Error del servidor."});
    }
});
//Obtener ID Token Usuario
router.post('/tokenId',async(req,res)=>{
    const {token}= req.body
    try {        
        if(!token)
        {
           return res.status(401).json({error:"Token invalido"})
        }
        console.log(token);
        const usuarioDecode= decodeToken(token);        
        if(!usuarioDecode)
        {
           return res.status(401).json({error:"Error al decodificar"})
        }
        const id= usuarioDecode.id
        return res.status(200).json({ mensaje: "Usuario encontrado", id});
    } catch (error) {
        console.log(error)
        res.status(500).json({error:"Error del servidor."});
    }
});
//PUT

//Cambio de clave
router.put('/updateClave',async(req,res)=>{
    try
    {
        await connectDataBase();   
        const paramUsuario= req.body.usuario;
        const claveVieja= req.body.claveOld;
        const claveNueva= req.body.claveNew;        
        
        if(!paramUsuario || !claveVieja || !claveNueva)
        {
            return res.status(404).json("Faltan completar campos");
        }
        //Busca si existe el nombre de usuario
        const user= await findUser({ usuario: paramUsuario });        
        if (!user) {
            return res.status(404).json("Usuario no encontrado");
        }        
        if(user)
        {
            //Compara la contraseña vieja
            const match= await bcrypt.compare(claveVieja, user.contraseña)
            if(!match)
            {
                return res.status(401).json("Contraseña anterior incorrecta");                
            }            
            // Encripta la clave
            const hashedPassword = await bcrypt.hash(claveNueva, 10);
            user.contraseña=hashedPassword
            await updateClave(user._id,user.contraseña);           
            res.status(200).json("Clave actualizada correctamente") 
        }       
    }
    catch(error)
    {
        res.status(500).json({error:"Error del servidor"});
    }
});
//Actualizar usuario
router.put('/updateUser',async (req,res)=>{
    try
    {      
        await connectDataBase(); 
        const {nombre,apellido,usuario,usuarioNew} = req.body;        
        if(!nombre ||!apellido ||!usuario ||!usuarioNew)
        {
            return res.status(401).json("Faltan completar campos");
        }
        let user= await findUser({usuario});
        if(user)
        {           
            user =await updateUser({ usuario, nombre, apellido, usuarioNew });
            return res.status(200).json({mensaje:"Usuario actualizado correctamente",user});            
        }
        else
        {
            return res.status(404).json("Usuario no encontrado");
        }
    }
    catch(error)
    {
        res.status(500).json({error:"Error del servidor."});
    }
});
export default router

