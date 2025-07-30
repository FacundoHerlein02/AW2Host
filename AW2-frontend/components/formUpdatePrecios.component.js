export const formUpdatePrecios =(marcas,productos)=>{
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
            <h3 class="flex text-center justify-center font-semibold text-3xl mt-5 mb-5">Actualización de Precios:</h1>                 
            <div class="flex flex-col ml-3 space-x-4 mb-4">
                <div id="GrupoTodos" class="flex items-center space-x-2 ">
                    <input type="radio" name="opcion" id="radioTodos" class="form-radio" checked/>                        
                    <label for="radioTodos">Actualizar Todos</label>
                </div>
                <div id="GrupoProductos" class="flex items-center space-x-2">
                    <input type="radio" name="opcion" id="radioProducto" class="form-radio" />                        
                    <label for="radioProducto">Actualizar por Producto</label>
                </div>
                <div id="GrupoMarcas" class="flex items-center space-x-2">
                    <input type="radio" name="opcion" id="radioMarca" class="form-radio" />                        
                    <label for="radioMarca">Actualizar por Marca</label>
                </div>
            </div>    
            
            <form class="flex flex-col justify-around items-center bg-stone-200  min-h-70 rounded-2xl " id="frmActualizarPrecio" >                        
                <div class="flex flex-col items-center space-y-8 w-full">
                    <div class="w-3/4 bg-stone-100 space-y-2 rounded-full sm:w-3/4 2xl:w-3/5">
                        <select id="SelectProductos" name="productos" class="w-full pl-5 text-lg rounded-full" disabled>
                            ${productos.result.map(prod => `<option value="${prod.id}">${prod.Descripcion}</option>`).join('')}                                
                        </select>
                    </div>                       
                    <div class="w-3/4 bg-stone-100 space-y-2 rounded-full sm:w-3/4 2xl:w-3/5">
                        <select id="SelectMarcas" name="marcas" class="w-full pl-5 text-lg rounded-full" disabled>
                            ${marcas.map(marca => `<option value="${marca}">${marca}</option>`).join('')}                                
                        </select>
                    </div>                        
                    <div class="w-3/4 bg-stone-300 space-y-2 rounded-full sm:w-3/4 2xl:w-3/5">
                        <input type="number" class="w-full pl-5 text-lg xl:h-9 rounded-full" placeholder="Porcentaje" id="porcentaje" required>
                    </div>                                               
                </div>
                <input type="submit" class="active:scale-95 bg-green-400 rounded-3xl font-semibold w-3/4 h-10 m-5 2xl:w-2/5"value="Actualizar Precios">
                <span id="spinnerProductos" class="hidden ml-2 border-2 border-t-2 border-t-white border-green-700 rounded-full w-5 h-5 animate-spin"></span>                                         
            </form>
        </div>
    `;

}