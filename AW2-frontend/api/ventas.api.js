import {api} from "./API.js";
export const NuevaVenta= async(venta)=>{    
    try
    {
        const Res= await fetch(`${api}/ventas/newVenta`,{
            method:'POST',
            headers:{
                'Content-Type' : 'application/json'
            },
            body:JSON.stringify(venta)
        });
        if(!Res.ok)
        {
            const errorData = await Res.json();
            throw new Error(errorData.error || "Error desconocido al realizar venta");
        }        
        const data= await Res.json();            
        if (!data.NuevaVenta) {
            throw new Error("La respuesta no contiene una venta.");
        }     
        return data;
    }
    catch(error)
    {
        console.error("Error al generar venta:", error.message);
        return { error: error.message };
    }
};