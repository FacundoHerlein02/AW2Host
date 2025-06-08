import {api} from "./API.js"
//Todos los productos
export const getAllProductos =async()=>{
    try
    {
        const Res=await fetch(`${api}/productos/allProductos`,{
            method:'GET',
            headers:{
                'Content-Type' : 'application/json'
            }
        });
        if(!Res.ok)
        {
            const errorData = await Res.json();
            throw new Error(errorData.error || "Error desconocido listado productos");
        }        
        const data= await Res.json();   
        if (!Array.isArray(data.result)) {
            throw new Error("La respuesta no contiene un array de productos.");
        }     
        return data;
    }
    catch(error){
        console.error("Error en Listado Productos:", error.message);
        return { error: error.message };
    }
};
//Filtro por marca
export const getProductosMarca= async(marca)=>{
    try 
    {
        const Res= await fetch(`${api}/productos/motosMarca/${encodeURIComponent(marca)}`,{
            method:'GET',
            headers:{
                'Content-Type' : 'application/json'
            }
        });
        if(!Res.ok)
        {
            const errorData = await Res.json();
            throw new Error(errorData.error || "Error desconocido listado productos");
        }        
        const data= await Res.json();   
        if (!Array.isArray(data.result)) {
            throw new Error("La respuesta no contiene un array de productos.");
        }     
        return data;
    } 
    catch (error) 
    {
        console.error("Error en Listado Productos:", error.message);
        return { error: error.message };
    }
};
//Filtro por id
export const getProductosId= async(id)=>{
    try 
    {
        const Res= await fetch(`${api}/productos/motosId/${encodeURIComponent(id)}`,{
            method:'GET',
            headers:{
                'Content-Type' : 'application/json'
            }
        });
        if(!Res.ok)
        {
            const errorData = await Res.json();
            throw new Error(errorData.error || "Error desconocido listado producto");
        }        
        const data= await Res.json();   
        if(!data.result) {
            throw new Error("Repuesta producto invalida.");
        }     
        return data;
    } 
    catch (error) 
    {
        console.error("Error en Listado Producto:", error.message);
        return { error: error.message };
    }
};