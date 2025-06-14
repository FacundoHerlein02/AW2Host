export const ResultSuccess=`
    <section class="flex flex-col items-center w-3/4 min-h-100 bg-stone-300 justify-around rounded-xl shadow-gray-500 shadow-xl m-10 md:w-3/5 md:m-2 lg:w-2/4 xl:w-2/5 2xl:w-2/6 2xl:min-h-150 2xl:max-w-200 2xl:p-5">            
        <h1 class="text-center font-bold text-3xl md:m-5">¡Gracias por su compra!</h1>
        <img class="bg-stone-300  w-2/4 md:m-5" src="/resource/img/navbar-logo.webp" alt="FastMotos logo">
        <img class="rounded-md w-3/4 object-contain md:m-5" src="/resource/img/pagoExitoso.png" alt="Pago Exitoso">            
        <button onclick="window.location.href='/pages/home/home.html'" class="btnComprar  md:m-5 lg:mb-10 bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-500 hover:scale-105 transition-transform" type="button">Continuar comprando</button>                       
    </section>
`;
export const ResultFailure=`
    <section class="flex flex-col items-center w-3/4 min-h-100 bg-stone-300 justify-around rounded-xl shadow-gray-500 shadow-xl m-10 md:w-3/5 md:m-2 lg:w-2/4 xl:w-2/5 2xl:w-2/6 2xl:min-h-150 2xl:max-w-200 2xl:p-5">            
        <h1 class="text-center font-bold text-3xl md:m-5">¡Error al procesar el pago!</h1>
        <img class="bg-stone-300  w-2/4 md:m-5" src="/resource/img/navbar-logo.webp" alt="FastMotos logo">
        <img class="rounded-md w-3/4 object-contain md:m-5" src="/resource/img/pagoError.png" alt="Pago Error">            
        <button class="btnComprar  md:m-5 lg:mb-10 bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-500 hover:scale-105 transition-transform" type="button">Volver a intentarlo</button>                       
    </section>
`;
export const ResultPending=`
    <section class="flex flex-col items-center w-3/4 min-h-100 bg-stone-300 justify-around rounded-xl shadow-gray-500 shadow-xl m-10 md:w-3/5 md:m-2 lg:w-2/4 xl:w-2/5 2xl:w-2/6 2xl:min-h-150 2xl:max-w-200 2xl:p-5">            
        <h1 class="text-center font-bold text-3xl md:m-5">¡Procesando!, por favor espere...</h1>
        <img class="bg-stone-300  w-2/4 md:m-5" src="/resource/img/navbar-logo.webp" alt="FastMotos logo">
        <img class="rounded-md w-3/4 object-contain md:m-5" src="/resource/img/pagoPendiente.png" alt="Pago Pendiente">                              
    </section>
`;