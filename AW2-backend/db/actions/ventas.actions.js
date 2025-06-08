//Conexion a la BD
import {connectDataBase} from '../connection.js';
import Venta from '../schemas/ventas.schema.js';
//Crea Ventas en la base
export const newVenta=async({fecha,id_cliente,productos,total})=>{
    try {
        await connectDataBase();
        const Res=await Venta.create({fecha,id_cliente,productos,total});        
        return JSON.parse(JSON.stringify(Res))
    } catch (error) {
        console.log(error)
    }
};
//Trae todas las ventas
export const getAllVentas=async()=>{
    try {
        await connectDataBase();
        const Res = await Venta.find();
        return JSON.parse(JSON.stringify(Res))
    } catch (error) {
        console.log(error);
    }
};
export const ventaByid=async(id)=>{
    try {
        await connectDataBase();
        const Res= await Venta.findById(id)
        return JSON.parse(JSON.stringify(Res))
    } catch (error) {
        console.log(error);
    }
};
//Actualiza la venta
export const updateVenta=async(id,venta)=>{
    try {
        await connectDataBase();
        const Res= Venta.findByIdAndUpdate(id,venta, { new: true });       
        return Res
    } catch (error) {
        console.log(error);
        throw error;    
    }
};
export const deleteVentasXidProd=async (id)=>{
    try {
        await connectDataBase();
        const Res =await Venta.deleteMany({ 'productos.id_producto': id });
        return Res
    } catch (error) {
        console.log(error);
    }
};
export const deleteVentasId=async (id)=>{
    try {
        await connectDataBase();
        const Res =await Venta.findByIdAndDelete(id);
        return Res
    } catch (error) {
        console.log(error);
    }
};


