import { readFile, writeFile } from 'fs/promises';
let ventas = [];
//Lee el Json
export async function cargarVentas() {
    try {
        const ventasJson = await readFile('./JSON/ventas.json', 'utf-8');
        ventas = ventasJson.trim() === "" ? [] : JSON.parse(ventasJson);
    } catch (error) {
        console.error("Error cargando ventas:", error);
        ventas = [];
    }
}
//Devuelve el json ventas
export function getVentas() {
    return ventas;
}
//Añade ventas al Json
export async function agregarVenta(venta) {
    ventas.push(venta);
    await writeFile('./JSON/ventas.json', JSON.stringify(ventas, null, 2));
}

//Actualiza ventas al Json
export async function actualizarVenta(venta) {
    const index = ventas.findIndex(v => v.id_venta === venta.id_venta);
    if (index === -1) {
        throw new Error(`Venta con id ${venta.id_venta} no encontrada`);
    }
    ventas[index] = venta;
    await writeFile('./JSON/ventas.json', JSON.stringify(ventas, null, 2));
}

//Actualiza ventas del Json
export async function actualizaVentas(Ventas) {   
    await writeFile('./JSON/ventas.json', JSON.stringify(Ventas, null, 2));
}

//Obtiene la ultima Id de Venta y suma 1
export const  getUltId=()=> {           
    const maxId = Math.max(...ventas.map(v => v.id_venta));
    return maxId + 1;
};
//Obtener ventas por id
export const getVentaByid=(id)=>{      
    const venta= ventas.find(v=>v.id_venta===id)
    if (!venta) {
        throw new Error(`Venta con id ${id} no encontrada`);
    }
    else
    {
        return venta
    }
};
