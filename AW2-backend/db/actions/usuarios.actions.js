//Conexion a la BD
import {connectDataBase} from '../connection.js';
import Usuario from '../schemas/usuarios.schema.js';
//Todos los usuarios
export const allUsers= async()=>{
    try {
        await connectDataBase();
        const Res=await Usuario.find();              
        return JSON.parse(JSON.stringify(Res))
    } catch (error) {
        console.log(error)
    }
}
//Crea Usuarios en la base
export const newUser=async({nombre,apellido,usuario,contraseña})=>{
    try {
        await connectDataBase();
        const Res=await Usuario.create({nombre,apellido,usuario,contraseña});        
        return JSON.parse(JSON.stringify(Res))
    } catch (error) {
        console.log(error)
    }
};
//Login
export const login=async({usuario})=>{
    try {
        await connectDataBase();
        const Res=await Usuario.findOne({usuario});        
        return JSON.parse(JSON.stringify(Res))
    } catch (error) {
        console.log(error)
    }
};
//Usuario por ID
export const userById=async({id})=>{
    try {
        await connectDataBase();
        const Res=await Usuario.findById(id);        
        return JSON.parse(JSON.stringify(Res))
    } catch (error) {
        console.log(error)
    }
};
//Busca usuario
export const findUser=async({usuario})=>{
    try {
        await connectDataBase();
        const Res=await Usuario.findOne({usuario});        
        return JSON.parse(JSON.stringify(Res))
    } catch (error) {
        console.log(error)
    }
};
//Actualiza la clave
export const updateClave=async(id,contraseña)=>{
    try {
        await connectDataBase();
        const user = await Usuario.findById(id)
        console.log(user)
        if(!user)
        {
            throw new Error("Usuario no encontrado");
        }        
        user.contraseña = contraseña;
        //Aplica los cambios
        await user.save();
        console.log(user)
        return JSON.parse(JSON.stringify(user));
    } catch (error) {
        console.log(error);
        throw error;              
    }
};
export const updateUser=async({ usuario, nombre, apellido, usuarioNew })=>{
    try {
        await connectDataBase();
        const user = await Usuario.findOneAndUpdate(
            { usuario }, // Filtro
            {
                nombre,
                apellido,
                usuario: usuarioNew
            },
            {
                new: true,       // Devuelve el documento actualizado
                runValidators: true // Aplica validaciones del schema
            }
        );
        console.log(user)
        return JSON.parse(JSON.stringify(user));
    } catch (error) {
        console.log(error);
    }
};



