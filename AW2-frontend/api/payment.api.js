import {api} from "./API.js"
//Crea la orden de pago
export const createOrder=async(productos,id_cliente,fecha)=>{
    try {
        const Res= await fetch(`${api}/payment/createOrder`,{
            method:'POST',
            headers:{
                'Content-Type' : 'application/json'
            },
            body:JSON.stringify({productos,id_cliente,fecha})
        });
        const data= await Res.json();        
        if(!Res.ok)
        {
            const errorData = data.error || "Error desconocido al realizar la orden venta";
            throw new Error(errorData.error);
        }                          
        if (!data) {
            throw new Error("La respuesta no contiene una orden venta.");
        }                
        return data;
    } catch (error) {
        console.error("Error al generar orden de venta:", error.message);
        return { error: error.message };
    }
};