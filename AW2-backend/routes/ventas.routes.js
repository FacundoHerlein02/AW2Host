import  { Router } from 'express';
//Acciones Ventas
import {newVenta,getAllVentas,ventaByid,updateVenta,deleteVentasId} from '../db/actions/ventas.actions.js';
//Acciones Productos
import {motosId,updateStock} from '../db/actions/productos.actions.js'
//Acciones Usuarios
import {userById} from '../db/actions/usuarios.actions.js'
import { connectDataBase } from '../db/connection.js';
const router= Router();
//ventas

//GET
//Muestra detalle de las ventas
router.get('/getAllVentas', async(req, res) => {
    try {
        await connectDataBase();
        //Carga las ventas en la variable
        let ventas=await getAllVentas();
        const result = [];
        for (const e of ventas) {
            let user;            
            try {
                user =await userById({ id: e.id_cliente });                
            } catch (error) {
                return res.status(400).json({ error: error.message });
            }
            if(!user)
            {
                return res.status(404).json({error:"Usuario no encontrado"})
            }
            let productosDetalle;
            try {
                productosDetalle =await Promise.all( e.productos.map(async(item )=> {
                    const prod =await motosId(item.id_producto);
                    console.log(prod)
                    return {                        
                        Marca: prod.marca,
                        Descripcion: prod.descripcion,
                        Cantidad: item.cantidad,
                        Subtotal:'$'+ item.subtotal
                    };
                }));
            } catch (error) {
                return res.status(400).json({ error: error.message });
            }

            result.push({
                Fecha: e.fecha,
                Cliente: user.nombre + ' ' + user.apellido,
                Productos: productosDetalle,
                Total:'$'+ e.total
            });
        }

        if (result.length > 0) {
            res.status(200).json(result);
        } else {
            res.status(404).json(`No se encontraron ventas.`);
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Error del servidor." });
    }
});
//Muestra detalle de venta por Id
router.get('/ventaByid/:id',async(req,res)=>{    
    try 
    {
        await connectDataBase();           
        const id=req.params.id;
        let result={};
        let venta =''        
        try
        {
            venta =await ventaByid(id);
        }
        catch(error)
        {
            return res.status(400).json({ error: error.message });
        }       
        if (venta) 
        {
            let user;
            //Obtiene el usuario            
            try 
            {
                user = await userById({ id: venta.id_cliente });                
            } catch (error) 
            {
                return res.status(400).json({ error: error.message });
            } 
            let productosDetalle;
            try 
            {
                productosDetalle = await Promise.all(venta.productos.map(async(item) => {
                    const prod = await motosId(item.id_producto);
                    return {                        
                        Marca: prod.marca,
                        Descripcion: prod.descripcion,
                        Cantidad: item.cantidad,
                        Subtotal:'$'+ item.subtotal
                    };
                }));
            } catch (error) {
                return res.status(400).json({ error: error.message });
            }

            result={
                Fecha: venta.fecha,
                Cliente: user.nombre + ' ' + user.apellido,
                Productos: productosDetalle,
                Total:'$'+ venta.total
            }
                       
            res.status(200).json(result);
        } else {
            res.status(404).json(`No se encontraron ventas.`);
        }
    } 
    catch (error) 
    {
        res.status(500).json({error:"Error del servidor."});
    }
});

//POST

//Crea ventas
router.post('/newVenta',async(req,res)=>{    
    const{fecha,id_cliente,prods}= req.body
    try {
        await connectDataBase();        
        if(!fecha||!id_cliente||!Array.isArray(prods) || prods.length === 0)
        {
            return res.status(401).json({error:"Faltan completar campos"});
        }        
        else
        {
            //Valida que exista el usuario
            try 
            {
                const user= await userById({id:id_cliente});
                if(!user)
                {
                    return res.status(404).json({error:"El usuario no existe."});
                }
            } catch (error) 
            {
                res.status(500).json({error:"Error del servidor."});
            }
            const productos = [];            
            let total = 0;
            for (const item of prods) {
                const { idProd, cantidad } = item;

                if (!idProd || !cantidad || cantidad <= 0) {
                    return res.status(400).json({error: "Producto o cantidad inválidos"});
                }    

                const producto = await motosId(idProd); 
                   
                if (!producto) {
                    return res.status(404).json({error: `Producto con id ${idProd} no encontrado`});
                }
                
                //Actualiza el stock en memoria                                        
                try {
                    await updateStock(idProd,cantidad);
                } catch (error) {                    
                    return res.status(400).json({error: error.message});
                }                
                
                let subtotal = Math.round(producto.precio * cantidad * 100) / 100; 
                
                productos.push({
                    id_producto: idProd,
                    cantidad,
                    subtotal
                });    

                total += subtotal;
            }
            //Redondea
            total = Math.round(total * 100) / 100;
            //Aplica en la base de datos            
            const NuevaVenta= await newVenta({fecha,id_cliente,productos,total});
            console.log(NuevaVenta)                              
            res.status(201).json({mensaje: "Venta realizada con éxito",NuevaVenta});
        }        
    } catch (error) {
        res.status(500).json({error:"Error del servidor."});
    }
});

//PUT
router.put('/updateVenta',async(req,res)=>{         
    const{id,fecha,prods,idCli}= req.body;    
    let venta;
    if(!id||!fecha||!Array.isArray(prods) || prods.length === 0 ||!idCli)
    {
        return res.status(401).json("Faltan completar campos");
    }
    try {
        await connectDataBase();
        try 
        {
            //Obtiene la venta
            venta =await ventaByid(id);  
        } 
        catch (error) 
        {
            return res.status(404).json(error.message);
        }
        //Valida si existe el cliente
        try {
            await userById({id:idCli});
        } catch (error) {
            return res.status(404).json(`Cliente con id ${idCli} no encontrado`);
        }
        //Mapa con productos Originales de la venta
        const originalProductosMap = new Map();
        //Guarda los productos y cantidades de la venta
        for (const p of venta.productos) 
        {
            originalProductosMap.set(p.id_producto, p.cantidad);
        }
        //Si la venta existe
        if(venta)
        {
            const productosVenta = [];            
            let Total = 0;
            //Recorre el arreglo de productos
            for(const item of prods)
            {
                const { idProd, cantidad } = item;
                if (!idProd || !cantidad || cantidad <= 0) {
                    return res.status(400).json("Producto o cantidad inválidos");
                }
                //Valida si existe el producto  
                const producto = await motosId(idProd);  
                console.log("PRODUCTOOOOO:" + producto)               
                if (!producto) {
                    return res.status(404).json(`Producto con id ${idProd} no encontrado`);
                }
                // Cantidad original vendida (si existe)
                const cantidadOriginal = originalProductosMap.get(idProd) || 0;

                if (cantidadOriginal !== cantidad) {
                    //actualizamos stock según la diferencia
                    const diferencia =cantidad - cantidadOriginal;
                    try {
                        await updateStock(idProd, diferencia);
                    } catch (error) {
                        return res.status(400).json(error.message);
                    }
                }
                // Eliminamos del mapa para luego saber qué productos fueron removidos
                originalProductosMap.delete(idProd);                

                let subtotal = Math.round(producto.precio * cantidad * 100) / 100; 
                
                productosVenta.push({
                    id_producto: idProd,
                    cantidad,
                    subtotal
                });    

                Total += subtotal;
            }

            // Los productos que quedaron en originalProductosMap fueron removidos de la venta
            for (const [idProdRemovido, cantidadRemovida] of originalProductosMap.entries()) {
                try {
                    // Sumamos la cantidad removida al stock
                    await updateStock(idProdRemovido,cantidadRemovida);
                } catch (error) {
                    return res.status(400).json(error.message);
                }
            }
            // Una vez validado el stock, graba permanente
            Total = Math.round(Total * 100) / 100;
            venta.fecha=fecha
            venta.id_cliente=idCli
            venta.productos=productosVenta
            venta.total=Total
            await updateVenta(id,venta);                    
            res.status(200).json("Venta actualizada correctamente")            
        }
        else
        {
            return res.status(404).json("Venta no encontrada");
        }
    } catch (error) {
        res.status(500).json({error:"Error del servidor."});
        console.log(error)
    }
    
});

//DELETE

router.delete('/deleteVenta/:id',async(req,res)=>{
    const id = req.params.id; 
    try 
    {
        await connectDataBase();               
        // Buscar la venta a eliminar
        const ventaAEliminar = await ventaByid(id);
        if (!ventaAEliminar) {
          return res.status(404).json({ error: "Venta no encontrada" });
        }       
        for (const item of ventaAEliminar.productos) {
            const prod = await motosId(item.id_producto);
            if (!prod) {
                return res.status(404).json({ error: `Producto con id ${item.id_producto} no encontrado` });
            }
            const nuevoStock = item.cantidad;
            await updateStock(item.id_producto, -nuevoStock);
        }    
        //eliminar la venta por id
        await deleteVentasId(id);       
        res.status(200).json({ mensaje: "Venta eliminada correctamente" });
    } catch (error) {
        console.error("Error eliminando moto:", error);
        res.status(500).json({ error: "Error del servidor" });
    }
});

export default router