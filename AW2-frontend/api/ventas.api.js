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
//List las ventas por fecha
export const getVentasFecha= async(desde,hasta)=>{    
    try
    {
        const Res= await fetch(`${api}/ventas/getVentasFecha`,{
            method:'POST',
            headers:{
                'Content-Type' : 'application/json'
            },
            body:JSON.stringify({desde,hasta})
        });
        if(!Res.ok)
        {
            const errorData = await Res.json();
            throw new Error(errorData.error || "Error desconocido al listar ventas");
        }        
        const data= await Res.json();            
        if (!Array.isArray(data)) {
            throw new Error("La respuesta no contiene una lista de ventas.");
        }     
        return data;
    }
    catch(error)
    {
        console.error("Error al listar ventas:", error.message);
        return { error: error.message };
    }
};