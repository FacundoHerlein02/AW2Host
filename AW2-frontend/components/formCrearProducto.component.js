export const formCrearProducto =(marcas)=>{    
    if (!Array.isArray(marcas) || marcas.length === 0) {
        console.error("No se encontraron marcas.");
        return;
    }
    return `
            <div class=" bg-stone-200 w-4/5 min-h-100 rounded-2xl sm:w-3/5 lg:w-3/6 xl:min-h-120 2xl:w-2/6">
                <h1 class="flex text-center justify-center font-semibold text-3xl mt-5 mb-5">Datos del Producto</h1>            
                <form class="flex flex-col justify-around items-center bg-stone-200  min-h-70 rounded-2xl " id="frmCrearProducto" >                        
                    <div class="flex flex-col items-center space-y-8 w-full">                
                        <!-- <div class="bg-stone-300 space-y-2 rounded-full sm:w-3/4 2xl:w-3/5">                    
                            <input type="text" class="w-full pl-5 text-lg xl:h-9 rounded-full" placeholder="Marca" id="marca" required>
                        </div>                     -->
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
                    <input type="submit" class="active:scale-95 bg-green-400 rounded-3xl font-semibold w-3/4 h-10 m-5 2xl:w-2/5"value="Crear Producto">
                    <span id="spinnerProductos" class="hidden ml-2 border-2 border-t-2 border-t-white border-green-700 rounded-full w-5 h-5 animate-spin"></span>                                         
                </form>
            </div>
    `;
};



//ORIGINAL
export const formCrearProducto2 =(marcas)=>{    
    if (!Array.isArray(marcas) || marcas.length === 0) {
        console.error("No se encontraron marcas.");
        return;
    }
    return `
            <div class=" bg-stone-200 w-4/5 min-h-100 rounded-2xl sm:w-3/5 lg:w-3/6 xl:min-h-120 2xl:w-2/6">
                <h1 class="flex text-center justify-center font-semibold text-3xl mt-5 mb-5">Datos del Producto</h1>            
                <form class="flex flex-col justify-around items-center bg-stone-200  min-h-70 rounded-2xl " id="frmLogin" >                        
                    <div class="flex flex-col items-center space-y-8 w-full">                
                        <!-- <div class="bg-stone-300 space-y-2 rounded-full sm:w-3/4 2xl:w-3/5">                    
                            <input type="text" class="w-full pl-5 text-lg xl:h-9 rounded-full" placeholder="Marca" id="marca" required>
                        </div>                     -->
                        <div class="bg-stone-100 space-y-2 rounded-full sm:w-3/4 2xl:w-3/5">
                            <select id="marcas" name="marcas" class="w-full pl-5 text-lg rounded-full">
                                ${marcas.map(marca => `<option value="${marca.toLowerCase()}">${marca}</option>`).join('')}                                
                            </select>
                        </div>
                        <div class="bg-stone-300 space-y-2 rounded-full sm:w-3/4 2xl:w-3/5">
                            <input type="text" class="w-full pl-5 text-lg xl:h-9 rounded-full" placeholder="Descripción" id="descripcion" required>
                        </div>
                        <div class="bg-stone-300 space-y-2 rounded-full sm:w-3/4 2xl:w-3/5">
                            <input type="number" class="w-full pl-5 text-lg xl:h-9 rounded-full" placeholder="Precio" id="precio" required>
                        </div>
                        <div class="bg-stone-300 space-y-2 rounded-full sm:w-3/4 2xl:w-3/5">                    
                            <input type="number" class="w-full pl-5 text-lg xl:h-9 rounded-full" placeholder="Stock" id="stock" required>
                        </div>               
                        <div class="bg-stone-300 space-y-2 rounded-full sm:w-3/4 2xl:w-3/5">                    
                            <input type="url" class="w-full pl-5 text-lg xl:h-9 rounded-full" placeholder="URL Imagen" id="imagen" required>
                        </div>
                        <div class="space-y-2 w-2/3 rounded-full sm:w-3/4 2xl:w-3/5">                    
                            <img id="preview" class="w-full max-h-60 object-contain rounded-md" src="https://www.smarttools.com.mx/wp-content/uploads/2019/05/imagen-no-disponible.png" alt="Vista previa img">
                        </div>
                        <div class="bg-stone-300 space-y-2 rounded-full sm:w-3/4 2xl:w-3/5">                    
                            <input type="text" class="w-full pl-5 text-lg xl:h-9 rounded-full" placeholder="Imagenes" id="imagenes" required>
                        </div>
                        <div id="default-carousel" class="relative  max-h-60 space-y-2 w-2/3 rounded-full sm:w-3/5 md:w-4/8 xl:w-2/5 2xl:w-2/5" data-carousel="slide">
                            <!-- Carousel wrapper -->
                            <div id="carousel-wrapper" class="relative h-56 overflow-hidden rounded-lg md:h-60 ">
                                <!-- Item 1 -->
                                <div class="hidden duration-700 ease-in-out" data-carousel-item>
                                    <img src="https://www.smarttools.com.mx/wp-content/uploads/2019/05/imagen-no-disponible.png" class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 rounded-md object-contain" alt="...">
                                </div>                                                            
                            </div>
                            <!-- Slider indicators -->
                            <div id="carousel-indicators" class="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
                                <button type="button" class="w-3 h-3 rounded-full" aria-current="true" aria-label="Slide 1" data-carousel-slide-to="0"></button>                                                            
                            </div>
                            <!-- Slider controls -->
                            <button type="button" class="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-prev>
                                <span class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                                    <svg class="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4"/>
                                    </svg>
                                    <span class="sr-only">Previous</span>
                                </span>
                            </button>
                            <button type="button" class="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-next>
                                <span class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                                    <svg class="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
                                    </svg>
                                    <span class="sr-only">Next</span>
                                </span>
                            </button>
                        </div>
                    </div>
                    <input type="submit" class="active:scale-95 bg-green-400 rounded-3xl font-semibold w-3/4 h-10 m-5 2xl:w-2/5"value="Crear Producto">
                    <span id="spinnerLogin" class="hidden ml-2 border-2 border-t-2 border-t-white border-green-700 rounded-full w-5 h-5 animate-spin"></span>                                         
                </form>
            </div>
    `;
};