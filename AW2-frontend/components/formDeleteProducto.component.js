export const formDeleteProducto=(productos)=>{
    if (!Array.isArray(productos.result) || productos.result.length === 0) {
        console.error("No se encontraron productos.");
        return;
    }
    return`
        <div class=" bg-stone-200 w-4/5 min-h-100 rounded-2xl sm:w-3/5 lg:w-3/6 xl:min-h-120 2xl:w-2/6">
            <h1 class="flex text-center justify-center font-semibold text-3xl mt-5 mb-5">Datos del Producto</h1>            
            <form class="flex flex-col justify-around items-center bg-stone-200  min-h-70 rounded-2xl " id="frmEliminarProducto" >                        
                <div class="flex flex-col items-center space-y-8 w-full">                                      
                    <div class="w-3/4 bg-stone-100 space-y-2 rounded-full sm:w-3/4 2xl:w-3/5">
                        <select id="cboProductos" name="marcas" class="w-full pl-5 text-lg rounded-full">
                            ${productos.result.map(prod => `<option value="${prod.id}">${prod.Descripcion}</option>`).join('')}                                                         
                        </select>
                    </div>
                    <div class="w-3/4 bg-stone-300 space-y-2 rounded-full sm:w-3/4 2xl:w-3/5 border-gray-500 border">                        
                        <p class="flex items-center h-11 w-full pl-5 text-lg xl:h-11 rounded-full bg-stone-50" id="lblMarca">Marca:</p>
                    </div>                    
                    <div class="space-y-2 w-2/3 rounded-full sm:w-3/4 2xl:w-3/5">                    
                        <img id="preview" class="w-full max-h-60 object-contain rounded-md" src="https://www.smarttools.com.mx/wp-content/uploads/2019/05/imagen-no-disponible.png" alt="Vista previa img">
                    </div>                        
                </div>
                <input type="submit" class="active:scale-95 bg-green-400 rounded-3xl font-semibold w-3/4 h-10 m-5 2xl:w-2/5"value="Eliminar Producto">
                <span id="spinnerProductos" class="hidden ml-2 border-2 border-t-2 border-t-white border-green-700 rounded-full w-5 h-5 animate-spin"></span>                                         
            </form>
        </div>    
    `
};