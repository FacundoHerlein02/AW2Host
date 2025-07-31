import {cardsCart,detalleVenta,calcularTotal} from "../../components/cardCart.component.js";
import {NuevaVenta} from "../../api/ventas.api.js";
import {DecodeIdUser,DecodeUser} from "../../api/usuarios.api.js";
import {createOrder} from '../../api/payment.api.js';

import {navbar,navbarEventos} from"/components/navbar.component.js";
import {navbarAdmin,navbarEventosAdmin} from "/components/navbarAdmin.component.js"
import {footer} from"/components/footer.component.js";
import {DetalleVenta} from "/components/detalleVenta.component.js"
import {ResultSuccess,ResultFailure,ResultPending} from '/components/paymentResult.component.js';


const cartContainer=document.getElementById('ContainerProductos');
const footerContainer= document.getElementById('footerContainer');
const navContainer= document.getElementById('headerContainer');
const detalleVentaContainer= document.getElementById('detVenta');
//Variables detalle compra
let detalleContainer=''
let total='' 
document.addEventListener('DOMContentLoaded',async()=>{    
    const urlParams = new URLSearchParams(window.location.search);
    const status = urlParams.get('status');
    //Valida el usuario e inserta el navbar que corresponde
    await obtenerUsuario();  
    footerContainer.innerHTML=footer;
    //Evento de cerrar Sesion
    //navbarEventos()
    if(status === 'success') 
    {
        //Oculta los containers que no uso
        detalleVentaContainer.classList.add('hidden');
        cartContainer.classList.add('hidden');  
        const mainElement = document.getElementById('mainContainer');
        mainElement.className = 'flex flex-row justify-center min-h-100  2xl:p-10';
        mainElement.innerHTML=ResultSuccess;
       //Borra los productos del carrito
        localStorage.removeItem('carrito');                           
    }
    else if(status === 'failure')
    {
        //Oculta los containers que no uso
        detalleVentaContainer.classList.add('hidden');
        cartContainer.classList.add('hidden');  
        const mainElement = document.getElementById('mainContainer');
        mainElement.className = 'flex flex-row justify-center min-h-100  2xl:p-10';
        mainElement.innerHTML=ResultFailure;
        //Permite reintentar el pago
        EventobtnComprar();        
    }
    else if(status === 'pending')
    {
        //Oculta los containers que no uso
        detalleVentaContainer.classList.add('hidden');
        cartContainer.classList.add('hidden');  
        const mainElement = document.getElementById('mainContainer');
        mainElement.className = 'flex flex-row justify-center min-h-100  2xl:p-10';
        mainElement.innerHTML=ResultPending;         
    }
    else{      
        detalleVentaContainer.innerHTML=DetalleVenta;
        detalleContainer=document.getElementById('detalleContainer');
        total= document.getElementById('totalCarrito');
        let productos= obtenerProductos();
        ActualizarCarrito(productos);
        //LLama aparte para que no se asignen multiples listener
        EventobtnComprar();        
    }    
                  
});
function ActualizarCarrito(productos){
    if (productos?.error || productos.result.length === 0) {
        cartContainer.innerHTML = `<p class="text-center text-lg text-red-500">${productos.error ?? "No hay productos en el carrito."}</p>`;
        detalleContainer.innerHTML = `<p class="text-center text-lg text-red-500">Error al mostrar el detalle.</p>`;
        total.innerHTML = `<p class="text-center text-lg text-red-500">$0</p>`;
        document.querySelector('.btnComprar').disabled = true;
        return;
    }
    const cardsHTML = cardsCart(productos);
    const detalleHTML=detalleVenta(productos);
    const totalCarrito=calcularTotal(productos);     
    if (cardsHTML,detalleHTML,totalCarrito) {
        cartContainer.innerHTML = cardsHTML;
        detalleContainer.innerHTML=detalleHTML;        
        total.innerText=`$${totalCarrito}`
        document.querySelector('.btnComprar').disabled = false;
        asignarEventosCarrito();        
    }
}
function asignarEventosCarrito() {
    const btnsCarrito = document.querySelectorAll('.btnEliminarCarrito');
    const btnsMenos=document.querySelectorAll('.btnMenos');
    const btnsMas=document.querySelectorAll('.btnMas');   
    btnsCarrito.forEach(btn => {
        btn.addEventListener('click',(e) => {
            const card = e.target.closest('[data-id]');
            const id = card?.getAttribute('data-id');
            if (!id) return alert("No se pudo obtener el ID del producto.");            
            let carritoObj = obtenerProductos();
            let carrito = carritoObj?.result || [];
            // Filtrar el carrito sin el producto que tiene ese ID
            carrito = carrito.filter(moto => moto.id !== id);
            // Guardar el carrito actualizado
            localStorage.setItem('carrito', JSON.stringify(carrito));
            alert("Moto eliminada del carrito.");
            //Recarga la vista
            ActualizarCarrito({ result: carrito });            
        });
    });
    btnsMenos.forEach(btnM=>{
        btnM.addEventListener('click',(e)=>{
            const card = e.target.closest('[data-id]');
            const id = card?.getAttribute('data-id');
            if (!id) return alert("No se pudo obtener el ID del producto.");            
            let carritoObj = obtenerProductos();
            let carrito = carritoObj?.result || [];
            //busca por id      
            const index = carrito.findIndex(p => p.id === id);
            if (index !== -1) {
                //Disminuye cantidad
                if(carrito[index].cantidad>1)
                {
                    carrito[index].cantidad -= 1;  
                }                      
            }        
            // Guardamos el carrito actualizado
            localStorage.setItem('carrito', JSON.stringify(carrito));                             
            ActualizarCarrito({ result: carrito });
        });        
    });
    btnsMas.forEach(btnMas=>{
        btnMas.addEventListener('click',(e)=>{
            const card = e.target.closest('[data-id]');
            const id = card?.getAttribute('data-id');
            if (!id) return alert("No se pudo obtener el ID del producto.");            
            let carritoObj = obtenerProductos();
            let carrito = carritoObj?.result || [];
            //busca por id      
            const index = carrito.findIndex(p => p.id === id);
            if (index !== -1) {
                //Aumenta cantidad
                if(carrito[index].Stock > carrito[index].cantidad)
                {
                    carrito[index].cantidad += 1;  
                }
                else{
                    alert("Stock insuficiente");
                }                                     
            }        
            // Guardamos el carrito actualizado
            localStorage.setItem('carrito', JSON.stringify(carrito));            
            ActualizarCarrito({ result: carrito });
        });        
    });   
};
//Accion De compra
function EventobtnComprar(){  
    const btnComprar= document.querySelector('.btnComprar');
    btnComprar.addEventListener('click',async()=>{        
        const token= sessionStorage.getItem('usuario');
        //Pasa el id de cliente               
        const idUser = await DecodeIdUser(token);
        const id_cliente=idUser.id;
        //pasa los productos        
        const productos= obtenerProductos();
        //Pasa la fecha
        const fecha=dayjs().format('DD/MM/YYYY')        
        if (!productos || !productos.result || productos.result.length === 0) {
            alert("El carrito está vacío. Agregue productos antes de comprar.");
            return;
        }
        //Crea la ORDEN DE PAGO        
        const ordenPago= await createOrder(productos,id_cliente,fecha)               
        if(ordenPago.init_point)
        {            
            //Redirige a la pagina de pago
            window.location.href = ordenPago.init_point;            
        }               
    });
};
// function EventobtnComprar(){  
//     const btnComprar= document.querySelector('.btnComprar');
//     btnComprar.addEventListener('click',async()=>{        
//         const token= sessionStorage.getItem('usuario');               
//         const idUser = await DecodeIdUser(token);        
//         const productos= obtenerProductos();        
//         if (!productos || !productos.result || productos.result.length === 0) {
//             alert("El carrito está vacío. Agregue productos antes de comprar.");
//             return;
//         }
//         const venta={
//             fecha:dayjs().format('DD/MM/YYYY'),
//             id_cliente:idUser.id,
//             prods:productos.result.map((p)=>({
//                 idProd: p.id,
//                 cantidad: p.cantidad
//             }))
//         };        
//         const ventaNueva= await NuevaVenta(venta);
//         if(ventaNueva.error)
//         {
//             return alert(`Error al obtener la venta: ${ventaNueva.error}`);
//         }
//         if (!ventaNueva || !ventaNueva.NuevaVenta){
//             return alert("Error: La respuesta de la venta es inválida.");
//         }    
//         console.log(JSON.stringify(ventaNueva, null, 2));        
//         //Borra los productos del carrito
//         localStorage.removeItem('carrito');
//         alert("Gracias por su compra!")        
//         let carritoObj=obtenerProductos();                 
//         ActualizarCarrito(carritoObj);        
//     });
// };
//Lee los productos del LocalStorage
function obtenerProductos(){
    const productosCarritoJSON = localStorage.getItem('carrito');
    if (!productosCarritoJSON) {
        cartContainer.innerHTML = `<p class="text-center text-lg">No hay productos en el carrito.</p>`;
        return { error: "No hay productos en el carrito" };
    }
    const productosCarrito = JSON.parse(productosCarritoJSON);
    const productos = { result: productosCarrito };
    return productos
};
//Obtiene el usuario y valida si es admin
async function obtenerUsuario (){
    const token= sessionStorage.getItem('usuario')
    if(token)
    {
        const usuario = await DecodeUser(token);
        console.log(usuario)        
        if(usuario.user.usuario==="Admin" && usuario.user.id==="688a532a72a1f2908db9371b")
        {
            //Inserta nav Admin            
            navContainer.innerHTML=navbarAdmin;            
            //Evento de cerrar Sesion
            navbarEventosAdmin();
        }
        else
        {

            //Inserta nav Comun
            navContainer.innerHTML=navbar;
            //Evento de cerrar Sesion
            navbarEventos();            
        }
    };
};
