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
//Crea un nuevo Producto
export const newMoto= async(marca,descripcion,precio,stock,img,imagenes)=>{
    try 
    {
        const Res= await fetch(`${api}/productos/newMoto`,{
            method:'POST',
            headers:{
                'Content-Type' : 'application/json'
            },
            body:JSON.stringify({marca,descripcion,precio,stock,img,imagenes})
        });
        if(!Res.ok)
        {
            const errorData = await Res.json();
            throw new Error(errorData.error || "Error desconocido al crear el producto");
        }              
        const data= await Res.json();        
        if(!data) {
            throw new Error("Repuesta al crear producto invalida.");
        }           
        return data;
    } 
    catch (error) 
    {
        console.error("Error al crear Producto:", error.message);
        return { error: error.message };
    }
};
//Actualiza un producto
export const updateMoto= async(id,marca,descripcion,precio,stock,img,imagenes)=>{
    try 
    {
        const Res= await fetch(`${api}/productos/updateMoto`,{
            method:'PUT',
            headers:{
                'Content-Type' : 'application/json'
            },
            body:JSON.stringify({id,marca,descripcion,precio,stock,img,imagenes})
        });
        if(!Res.ok)
        {
            const errorData = await Res.json();
            throw new Error(errorData.error || "Error desconocido al actualizar el producto");
        }              
        const data= await Res.json();        
        if(!data) {
            throw new Error("Repuesta al actualizar producto invalida.");
        }           
        return data;
    } 
    catch (error) 
    {
        console.error("Error al actualizar Producto:", error.message);
        return { error: error.message };
    }
};
//Actualiza Precios por ID, Marca o todos
export const updatePrecio=async(id,marca,porcentaje)=>
{
    try 
    {
        const Res= await fetch(`${api}/productos/updatePrecio`,{
            method:'PUT',
            headers:{
                'Content-Type' : 'application/json'
            },
            body:JSON.stringify({id,marca,porcentaje})
        });
        if(!Res.ok)
        {
            const errorData = await Res.json();
            throw new Error(errorData.error || "Error desconocido al actualizar el precio");
        }              
        const data= await Res.json();        
        if(!data) {
            throw new Error("Repuesta al actualizar precio invalida.");
        }           
        return data;
    } 
    catch (error) 
    {
        console.error("Error al actualizar Precios:", error.message);
        return { error: error.message };
    }
};
//Elimina motos por ID
export const deleteMoto=async(id)=>
{
    try 
    {
        const Res= await fetch(`${api}/productos/deleteMoto/${encodeURIComponent(id)}`,{
            method:'DELETE',
            headers:{
                'Content-Type' : 'application/json'
            }
        });
        if(!Res.ok)
        {
            const errorData = await Res.json();
            throw new Error(errorData.error || "Error desconocido al eliminar moto");
        }              
        const data= await Res.json();        
        if(!data) {
            throw new Error("Repuesta al eliminar moto invalida.");
        }           
        return data;
    } 
    catch (error) 
    {
        console.error("Error al eliminar moto:", error.message);
        return { error: error.message };
    }
};