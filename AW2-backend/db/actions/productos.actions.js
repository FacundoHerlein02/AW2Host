//Conexion a la BD
import {connectDataBase} from '../connection.js';
import Producto from '../schemas/productos.schema.js';
//Crea productos en la base
export const newMoto= async({marca,descripcion,precio,stock,img,imagenes})=>{
    try {
        await connectDataBase();
        const Res=await Producto.create({marca,descripcion,precio,stock,img,imagenes});        
        return JSON.parse(JSON.stringify(Res))
    } catch (error) {
        console.log(error)
    }
};
//Trae todos los productos
export const allProductos=async()=>{
    try {
        await connectDataBase();
        const Res = await Producto.find();
        return JSON.parse(JSON.stringify(Res))
    } catch (error) {
        console.log(error);
    }
};
//Productos por Id
export const motosId=async(id)=>{
 try {
        await connectDataBase();
        const Res = await Producto.findById(id);
        return JSON.parse(JSON.stringify(Res))
    } catch (error) {
        console.log(error);
    }
};
//Productos por Marca
export const motosMarca=async(marca)=>{
 try {
        await connectDataBase();
        const Res = await Producto.find({marca});
        return JSON.parse(JSON.stringify(Res))
    } catch (error) {
        console.log(error);
    }
};
//Productos por precio
export const filtroPrecio=async(min,max)=>{
    try {
        await connectDataBase();
        const Res = await Producto.find({precio: { $gte: min, $lte: max }});
        return JSON.parse(JSON.stringify(Res))
    } catch (error) {
        console.log(error)
    }
};
//Actualiza stock
export const updateStock=async(id,cantidad)=>{
    try {
        await connectDataBase();
        const producto = await Producto.findById(id)
        console.log(producto)
        if(!producto)
        {
            throw new Error("Producto no encontrado");
        }
        const nuevoStock = producto.stock - cantidad;

        if (nuevoStock < 0) {
            throw new Error("No hay suficiente stock");
        }
        producto.stock = nuevoStock;
        //Aplica los cambios
        await producto.save();
        console.log(producto)
        return JSON.parse(JSON.stringify(producto));
    } catch (error) {
        console.log(error);
        throw error;              
    }
};
//Actualiza la moto
export const updateMoto=async(id,moto)=>{
    try {
        await connectDataBase();
        const Res= Producto.findByIdAndUpdate(id,moto, { new: true });       
        return Res
    } catch (error) {
        console.log(error);
        throw error;    
    }
};
//ACTUALIZA LOS PRECIOS POR MARCA
export const updatePrecioPorMarca=async(marca,factor)=>{    
    try {
        await connectDataBase();
        const Res=await Producto.updateMany(
            { marca: marca },
            [
                {
                    $set: {
                        precio: { $round: [{ $multiply: ["$precio", factor] }, 2] }
                    }
                }
            ]        
        );
        return Res
    } catch (error) {
        console.log(error);
        throw error; 
    }
};
//Actualiza el precio de todas las motos
export const updatePrecioGeneral = async (factor) => {
    try {
        await connectDataBase();
        const Res = await Producto.updateMany(
            {}, // Sin filtro,busca todos los productos
            [
                {
                    $set: {
                        precio: { $round: [{ $multiply: ["$precio", factor] }, 2] }
                    }
                }
            ]
        );
        return Res;
    } catch (error) {
        console.log(error);
        throw error;
    }
};
export const deleteMoto=async(id)=>{
    try {
        await connectDataBase();
        const Res=await Producto.findByIdAndDelete(id);
        return Res
    } catch (error) {
        console.log(error);
        throw error;
    }
};