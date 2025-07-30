export const formEditarProducto=(marcas,productos)=>{
    if (!Array.isArray(marcas) || marcas.length === 0) {
        console.error("No se encontraron marcas.");
        return;
    }
    if (!Array.isArray(productos.result) || productos.result.length === 0) {
        console.error("No se encontraron productos.");
        return;
    }
    return`
            <div class=" bg-stone-200 w-4/5 min-h-100 rounded-2xl sm:w-3/5 lg:w-3/6 xl:min-h-120 2xl:w-2/6 items-center">               
                <div class="flex flex-col p-1 items-center">
                    <h1 class="flex text-center justify-center font-bold text-3xl mt-5 mb-5">Seleccion el Producto a editar:</h1>
                    <div class="bg-stone-100 w-3/4 space-y-2 rounded-full sm:w-3/4 2xl:w-3/5 ">
                        <select id="SelectProductos" name="productos" class="w-full pl-5 text-lg rounded-full">
                            ${productos.result.map(prod => `<option value="${prod.id}">${prod.Descripcion}</option>`).join('')}                                
                        </select>
                    </div>
                </div>                                                
                <h3 class="flex text-center justify-center font-semibold text-3xl mt-5 mb-5">Datos del Producto</h1>            
                <form class="flex flex-col justify-around items-center bg-stone-200  min-h-70 rounded-2xl " id="frmEditarProducto" >                        
                    <div class="flex flex-col items-center space-y-8 w-full">                       
                        <div class="w-3/4 bg-stone-100 space-y-2 rounded-full sm:w-3/4 2xl:w-3/5">
                            <select id="marcas" name="marcas" class="w-full pl-5 text-lg rounded-full">
                                ${marcas.map(marca => `<option value="${marca}">${marca}</option>`).join('')}                                
                            </select>
                        </div>
                        <div class="w-3/4 bg-stone-300 space-y-2 rounded-full sm:w-3/4 2xl:w-3/5">
                            <input type="text" class="w-full pl-5 text-lg xl:h-9 rounded-full" placeholder="Descripción" id="descripcion" required>
                        </div>
                        <div class="w-3/4 bg-stone-300 space-y-2 rounded-full sm:w-3/4 2xl:w-3/5">
                            <input type="text" class="w-full pl-5 text-lg xl:h-9 rounded-full" placeholder="Precio" id="precio" required>
                        </div>
                        <div class="w-3/4 bg-stone-300 space-y-2 rounded-full sm:w-3/4 2xl:w-3/5">                    
                            <input type="number" class="w-full pl-5 text-lg xl:h-9 rounded-full" placeholder="Stock" id="stock" required>
                        </div>               
                        <div class="w-3/4 bg-stone-300 space-y-2 rounded-full sm:w-3/4 2xl:w-3/5">                    
                            <input type="url" class="w-full pl-5 text-lg xl:h-9 rounded-full" placeholder="URL Imagen" id="imagen" required>
                        </div>
                        <div class="space-y-2 w-2/3 rounded-full sm:w-3/4 2xl:w-3/5">                    
                            <img id="preview" class="w-full max-h-60 object-contain rounded-md" src="https://www.smarttools.com.mx/wp-content/uploads/2019/05/imagen-no-disponible.png" alt="Vista previa img">
                        </div>                        
                    </div>
                    <input type="submit" class="active:scale-95 bg-green-400 rounded-3xl font-semibold w-3/4 h-10 m-5 2xl:w-2/5"value="Editar Producto">
                    <span id="spinnerProductos" class="hidden ml-2 border-2 border-t-2 border-t-white border-green-700 rounded-full w-5 h-5 animate-spin"></span>                                         
                </form>
            </div>`;
};
