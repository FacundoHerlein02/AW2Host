import { readFile, writeFile } from 'fs/promises';
let productos=[];
export async function cargarProductos() {
    try {
        const prodJson = await readFile('./JSON/productos.json', 'utf-8');
        productos = prodJson.trim() === "" ? [] : JSON.parse(prodJson);
    } catch (error) {
        console.error("Error cargando productos:", error);
        productos = [];
    }
}
//Devuelve el json productos
export function getProductos() {
    return productos;
}
//Añade productos al Json
export async function agregarProducto(producto) {
    productos.push(producto);
    await writeFile('./JSON/productos.json', JSON.stringify(productos, null, 2));
}
//Actualiza productos al Json
export async function actualizarProducto(producto) {
    const index = productos.findIndex(p => p.id_producto === producto.id_producto);
    if (index === -1) {
        throw new Error(`Producto con id ${producto.id_producto} no encontrado`);
    }
    productos[index] = producto;
    await writeFile('./JSON/productos.json', JSON.stringify(productos, null, 2));
}
//Actualiza productos al Json
export async function actualizaProductos(Productos) {   
    await writeFile('./JSON/productos.json', JSON.stringify(Productos, null, 2));
}

//Obtiene la ultima Id de productos y suma 1
export const getUltId= ()=> {    
    const maxId = Math.max(...productos.map(m => m.id_producto));
    return maxId + 1;
};
//Obtener producto por id
export const getProdByid=(id)=>{
    const prod= productos.find(p=>p.id_producto==id)
    if(!prod)
    {
        throw new Error(`Producto con id ${id} no encontrado`);
    }
    else
    {
        return prod
    }    
};
export const updateStockMem = (id, cant) => {
    const prod = productos.find(p => p.id_producto == id);
    if (!prod) throw new Error(`Producto con id ${id} no encontrado`);
    const stock = prod.stock + cant;  // <-- acá el cambio
    if (stock < 0) throw new Error(`Stock insuficiente para el producto id ${id}`);
    prod.stock = stock;    
};
//Graba de manera definitiva el Json
export const UpdateStock=async()=>{   
    await writeFile('./JSON/productos.json', JSON.stringify(productos, null, 2));
}   


