import {api} from "./API.js"
export const logIn =async(usuario,contraseña)=>{
    try 
    {
        const Res= await fetch(`${api}/usuarios/login`,{
            method:'POST',
            headers:{
                'Content-Type' : 'application/json'
            },
            body:JSON.stringify({usuario,contraseña}),
        });
        if (!Res.ok) {
            const errorData = await Res.json();
            throw new Error(errorData.error || "Error desconocido en login");
        }
        const data= await Res.json();        
        return data;  
    } 
    catch (error) {
        console.error("Error en logIn:", error.message);
        return { error: error.message };
    }
};
export const register =async(nombre,apellido,usuario,clave)=>{
    try 
    {
        const Res= await fetch(`${api}/usuarios/newUser`,{
            method:'POST',
            headers:{
                'Content-Type' : 'application/json'
            },
            body:JSON.stringify({nombre,apellido,usuario,clave}),
        });
        if (!Res.ok) {
            const errorData = await Res.json();
            throw new Error(errorData.error || "Error desconocido en al crear usuario");
        }
        const data= await Res.json();        
        return data;  
    } 
    catch (error) {
        console.error("Error en Register:", error.message);
        return { error: error.message };
    }
};

