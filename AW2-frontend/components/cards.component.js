export const cards =(productos)=>{      
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
            <div id="card" class="max-w-sm max-h-96 bg-stone-50 border border-gray-200 rounded-lg shadow-lg overflow-hidden" data-id="${m.id}">
                <div class="mt-2 bg-none aspect-video overflow-hidden">
                    <img class="w-full h-full object-contain" src="${m.Imagen}" alt="Moto${m.Marca}">
                </div>
                <div class="mt-5 flex flex-col items-center">                
                    <h3 class="text-center font-semibold text-2xl text-ellipsis overflow-hidden w-4/5 text-nowrap">${m.Descripcion}</h3>
                    <h3 class="text-center text-1xl">${m.Precio}</h3>
                    <button class="btnCarrito m-3 w-4/5 bg-indigo-300 text-white px-4 py-2 rounded-full hover:bg-indigo-400  hover:scale-105 transition-transform" type="button">carrito</button>
                </div>
            </div>`).join('');
};

        