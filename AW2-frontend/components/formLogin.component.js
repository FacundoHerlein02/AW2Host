export const formLogin=`
    <h3 class="flex justify-center font-semibold text-3xl mt-5 mb-5">Login</h3>
        <form class="flex flex-col justify-around items-center bg-stone-200  min-h-70 rounded-2xl " id="frmLogin" >                        
            <div class="flex flex-col items-center space-y-8 w-full">                
                <div class="bg-stone-300 space-y-2 rounded-full sm:w-3/4 2xl:w-3/5">
                    <label for="user"></label>
                    <input type="text" class="w-full pl-5 text-lg xl:h-9 rounded-full" placeholder="Usuario" id="user">
                </div>
                <div class="bg-stone-300 space-y-2 rounded-full sm:w-3/4 2xl:w-3/5">
                    <label for="pass"></label>
                    <input type="password" class="w-full pl-5 text-lg xl:h-9 rounded-full" placeholder="Contraseña" id="pass">
                </div>
            </div>          
            <input type="submit" class="bg-green-400 rounded-3xl font-semibold w-3/4 h-10 m-5 2xl:w-2/5"value="Iniciar Sesion">
            <span id="spinnerLogin" class="hidden ml-2 border-2 border-t-2 border-t-white border-green-700 rounded-full w-5 h-5 animate-spin"></span>                            
        </form>
    <div class="flex flex-col items-center mb-5">
        <p flex>¿Todavía no tenés una cuenta?</p><button type="button" class="btnRegister text-blue-500">Registrarse</button>                
    </div>
`;