import { Router } from 'express';
//Actions Productos
import {newMoto,allProductos,motosId,motosMarca,filtroPrecio,updateMoto,updatePrecioPorMarca,updatePrecioGeneral,deleteMoto} from '../db/actions/productos.actions.js';
//Actions Ventas
import {deleteVentasXidProd} from"../db/actions/ventas.actions.js";
//Conexion a la BD 
import { connectDataBase } from '../db/connection.js';
const router= Router();

// /productos

// GET
//Obtiene todos los productos
router.get('/allProductos',async(req,res)=>{   
    try {
        await connectDataBase()
        let productos= await allProductos()
        const result= productos.map(e=>{
            return{
                id:e._id,
                Marca: e.marca,
                Descripcion: e.descripcion,
                Precio:'$'+ e.precio,
                Stock:e.stock,
                Imagen: e.img,
                Imagenes: e.imagenes                        
            }
        });
        if(result && result.length>0)
        {
            res.status(200).json({mensaje:'Todas las motos',result});
        }
    } catch (error) {
        res.status(500).json({ error: "Error del servidor" });
    }
});

//Nombre de todas las motos que sean de una marca especifica
router.get('/motosMarca/:marca',async(req,res)=>{    
    const marca= req.params.marca;
    try {     
        await connectDataBase()           
        const motosFiltradas= await motosMarca(marca);
        if (!motosFiltradas || motosFiltradas.length === 0) {
            return res.status(404).json({ mensaje: "La marca no existe" });
        }
        const result= motosFiltradas.map(e=>{
            return{
                id:e._id,
                Marca: e.marca,
                Descripcion: e.descripcion,
                Precio:'$'+ e.precio,
                Stock:e.stock,
                Imagen: e.img,
                Imagenes: e.imagenes                        
            }
        });
        if(result && result.length>0)
        {
            res.status(200).json({mensaje:`Productos de la marca ${result[0].Marca}`,result});
        }
    } catch (error) {
        res.status(500).json({ error: "Error del servidor" });
    }
});
router.get('/motosId/:id',async(req,res)=>{    
    const id=req.params.id;
    try { 
        await connectDataBase()       
        //Busca la moto       
        const moto = await motosId(id);
        if (!moto) {
            return res.status(404).json({ mensaje: "El producto no existe" });
        };
        const result={
            id:moto._id,
            Marca: moto.marca,
            Descripcion: moto.descripcion,
            Precio:'$'+ moto.precio,
            Stock:moto.stock,
            Imagen: moto.img,
            Imagenes: moto.imagenes                        
        };       
        res.status(200).json({mensaje:`Moto encontrada ${result.id}`,result}); 

    } catch (error) {
        res.status(500).json({ error: "Error del servidor" });
    }
});
//Todas las motos en un rango de precio
router.get('/filtroPrecio/:min/:max',async(req,res)=>{    
    try 
    {
        await connectDataBase()
        const min= Number(req.params.min);
        const max= Number(req.params.max);
        const motosFiltradas= await filtroPrecio(min,max)     
        const result= motosFiltradas.map(e=>{
            return{
                Marca: e.marca,
                Descripción: e.descripcion,
                Precio:'$'+ e.precio,
                Stock:e.stock,
                Imagen: e.img,
                Imagenes: e.imagenes                        
            }
        });
        if(result && result.length>0)
        {
            res.status(200).json(result);
        }
    } 
    catch (error) 
    {
        res.status(500).json({ error: "Error del servidor" });
    }
});

//POST
//Añade nuevos productos
router.post('/newMoto',async (req,res)=>{    
    const {marca,descripcion,precio,stock,img,imagenes} = req.body;
    try {
        await connectDataBase()
        if(!marca||!descripcion||!precio||!stock||!img||!imagenes)
        {
            return res.status(401).json("Faltan completar campos");
        }
        else
        {        
            const NuevaMoto= await newMoto({marca,descripcion,precio,stock,img,imagenes})
            console.log(NuevaMoto);
            res.status(201).json(NuevaMoto);
        }
    } catch (error) {
        res.status(500).json({ error: "Error del servidor" });
    }
});
//PUT
//Actualiza los datos de una moto
router.put('/updateMoto',async (req,res)=>{    
    const {id,marca,descripcion,precio,stock,img,imagenes} = req.body;
    try 
    {
        await connectDataBase()       
        if(!id||!marca||!descripcion||!precio||!stock||!img||!imagenes)
        {
            return res.status(401).json("Faltan completar campos");
        }
        else
        {
            //Busca si existe el producto
            const moto= await motosId(id);
            if (!moto) {
                return res.status(404).json("Moto no encontrada");
            }   
            if(moto)
            {
                //Actualiza el producto                             
                moto.marca=marca
                moto.descripcion=descripcion
                moto.precio=precio
                moto.stock=stock
                moto.img=img
                moto.imagenes=imagenes
                const MotoActualizada=await updateMoto(id,moto)     
                if(MotoActualizada)
                {
                    return res.status(200).json({mensaje:"Producto actualizado correctamente",MotoActualizada});   
                }           
                return res.status(404).json({error:"No se pudo actualizar"});                    
            }            
        }
    } 
    catch (error) 
    {
        console.error("Error en updateMoto:", error);
        res.status(500).json({ error: error.message || "Error del servidor" });
    }
});
//Actualiza precio por marca,id o todos
//Aumentar o bajar precios por porcentaje (EJ:10, -5)
router.put('/updatePrecio',async(req,res)=>{
    try
    {
        await connectDataBase()       
        let  productos=await allProductos(); 
        const {id,marca,porcentaje}= req.body;
        //Valida que se ingrese un numero
        if (typeof porcentaje !== 'number') {
            return res.status(400).json("Porcentaje inválido");
        }
        let precioNuevo
        //Actualiza por id
        if(id)
        {
            const moto= await motosId(id);
            if(!moto)
            {
                return res.status(404).json("Moto no encontrada");
            }
            else
            {              
                precioNuevo = Math.round((moto.precio + (moto.precio * (porcentaje / 100))) * 100) / 100;   
                if (precioNuevo <= 0) {
                    return res.status(400).json("No se permite precio negativo");
                }                             
                moto.precio=precioNuevo
                const MotoActualizada=await updateMoto(id,moto)   
                return res.status(200).json({mensaje:"Precio actualizado correctamente",MotoActualizada});
            }
            
        }
        //Actualiza por marca
        else if(marca)
        {
            const motos= await motosMarca(marca);
            if(!motos)
            {
                return res.status(404).json("Marca no encontrada");
            }
            else
            {                
                const factor = 1 + (porcentaje / 100);
                //verificar que el precio no sea negativo
                const preciosInvalidos = motos.some(bike => {                    
                    precioNuevo = Math.round(bike.precio * factor * 100)/100;
                    return precioNuevo <= 0;
                });
                if (preciosInvalidos) {
                    return res.status(400).json("No se permite precio negativo");
                }
                //Actualiza por marca
                await updatePrecioPorMarca(marca, factor);
                res.status(200).json("Precios actualizados correctamente");
            }
        }
        //Actualiza todos
        else
        {
            const factor = 1 + (porcentaje / 100);
            //verificar que el precio no sea negativo
            const preciosInvalidos = productos.some(bike => {                    
                precioNuevo = Math.round(bike.precio * factor * 100)/100;
                return precioNuevo <= 0;
            });
            if (preciosInvalidos) {
                return res.status(400).json("No se permite precio negativo");
            }
            await updatePrecioGeneral(factor)       
            return res.status(200).json("Precios actualizados correctamente");
        }       
    } 
    catch (error) 
    {
        res.status(500).json({ error: "Error del servidor" });
    }
});

//DELETE

router.delete('/deleteMoto/:id',async (req,res)=>{
    const id=req.params.id;
    try 
    {   
        await connectDataBase();   
        let moto= await motosId(id);        
        //Valida que exista la moto        
        if (!moto) {
            return res.status(404).json({ mensaje: "La moto que se intenta eliminar no existe" });
        };
        // Elimina las ventas relacionadas a esa moto        
        const ventasEliminadas = await deleteVentasXidProd(id);
        //Elimina la moto
        const motoEliminada =await deleteMoto(id)
        //Graba las ventas ya filtradas        
        res.status(200).json({ mensaje: "Moto eliminada correctamente",motoEliminada,ventasEliminadas });
    } 
    catch (error) 
    {
        console.error("Error eliminando moto:", error);
        res.status(500).json({ error: "Error del servidor" });
    }
});
export default router