import {api} from "./API.js"
//Decodifia el token de usuario y trae solo el ID
export const DecodeIdUser =async(token)=>{
    try 
    {
        const Res= await fetch(`${api}/usuarios/tokenId`,{
            method:'POST',
            headers:{
                'Content-Type' : 'application/json'
            },
            body:JSON.stringify({token}),
        });
        if (!Res.ok) {
            const errorData = await Res.json();
            throw new Error(errorData.error || "Error desconocido al obtener usuario");
        }
        const data= await Res.json();        
        return data;  
    } 
    catch (error) {
        console.error("Error al decodificar usuario:", error.message);
        return { error: error.message };
    }
};