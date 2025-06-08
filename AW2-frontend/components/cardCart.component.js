export const cardsCart =(productos)=>{      
    if(productos.error)    
    {
        console.error("Error al cargar productos:", productos.error);
        return;
    }   
    const motos= productos.result;
    if (!Array.isArray(motos) || motos.length === 0) {
        console.error("No se encontraron productos.");
        return;
    }
    return motos.map((m)=>`
            <div id="card" class="max-w-sm bg-stone-50 border border-gray-200 rounded-lg shadow-lg overflow-hidden" data-id="${m.id}">
                <div class="mt-2 bg-none aspect-video overflow-hidden">
                    <img class="w-full h-full object-contain" src="${m.Imagen}" alt="Moto${m.Marca}">
                </div>
                <div class="mt-5 flex flex-col items-center">                
                    <h3 class="text-center font-semibold text-2xl text-ellipsis overflow-hidden w-4/5 text-nowrap">${m.Descripcion}</h3>
                    <h3 class="text-center text-1xl">${m.Precio}</h3>
                    <div class="shadow-lg shadow-gray-400 bg-stone-300 w-2/4 flex flex-row justify-between items-center rounded-xl pl-5 pr-5 p-1">                        
                        <button class="btnMenos text-2xl font-semibold cursor-pointer hover:text-white"><i class="fa-solid fa-minus"></i></button>
                        <label class="lblCant text-xl font-medium">${m.cantidad}</label>
                        <button class="btnMas text-2xl font-semibold cursor-pointer hover:text-white"><i class="fa-solid fa-plus"></i></button>
                    </div>                    
                    <button class="btnEliminarCarrito m-1 w-4/5 bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 hover:scale-105 transition-transform" type="button">Eliminar</button>
                </div>
            </div>`).join('');
};

export const detalleVenta= (productos)=>{
    if(productos.error)    
    {
        console.error("Error al cargar detalle:", productos.error);
        return;
    }   
    const motos= productos.result;
    if (!Array.isArray(motos) || motos.length === 0) {
        console.error("No se encontro detalle.");
        return;
    }
    return motos.map((m)=>`           
        <div class="flex justify-between m-1">
            <label class="text-lg font-semibold w-3/5 border-b-2">${m.Descripcion}: *${m.cantidad}</label> <label class="w-2/5 text-end border-b-2">${m.Precio}</label>
        </div>            
    `).join('');
}
export function calcularTotal(productos){
    let total=0;
    if(productos.error)    
    {
        console.error("Error al calcular el total:", productos.error);
        return;
    }   
    const motos= productos.result;
    if (!Array.isArray(motos) || motos.length === 0) {
        console.error("No se encontro detalle.");
        return;
    }
    motos.forEach((e)=>{
        const precioNumerico = Number(e.Precio.replace('$', '').replace(',', ''));
        let subtotal=e.cantidad * precioNumerico;        
        total= total+ subtotal
    })    
    return new Intl.NumberFormat('es-AR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(total);
};


