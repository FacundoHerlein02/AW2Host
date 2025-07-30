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
//Trae ventas por fecha
export const getVentasFecha = async (desde, hasta) => {
  try {
    await connectDataBase();

    // Paso 1: convertir fechas "DD/MM/YYYY" a "YYYYMMDD"
    const desdeStr = desde.split('-').join(''); // "25/05/2025" -> ["25","05","2025"] -> ["2025","05","25"] -> "20250525"
    const hastaStr = hasta.split('-').join('');
    const Res = await Venta.aggregate([
      {
        $addFields: {
          fechaStringComparable: {
            $concat: [
              { $substr: ["$fecha", 6, 4] }, // año
              { $substr: ["$fecha", 3, 2] }, // mes
              { $substr: ["$fecha", 0, 2] }  // día
            ]
          }
        }
      },
      {
        $match: {
          fechaStringComparable: {
            $gte: desdeStr,
            $lte: hastaStr
          }
        }
      }
    ]);

    return JSON.parse(JSON.stringify(Res));
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


