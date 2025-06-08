import {cardsCart,detalleVenta,calcularTotal} from "../../components/cardCart.component.js";
import {NuevaVenta} from "../../api/ventas.api.js";
import {DecodeIdUser} from "../../api/usuarios.api.js"
import {navbar,navbarEventos} from"/components/navbar.component.js"
import {footer} from"/components/footer.component.js";
const cartContainer=document.getElementById('ContainerProductos');
const detalleContainer=document.getElementById('detalleContainer');
const total= document.getElementById('totalCarrito');
const footerContainer= document.getElementById('footerContainer');
const navContainer= document.getElementById('headerContainer');
document.addEventListener('DOMContentLoaded',async()=>{     
    navContainer.innerHTML=navbar;
    footerContainer.innerHTML=footer;
    let productos= obtenerProductos();
    ActualizarCarrito(productos);
    //LLama aparte para que no se asignen multiples listener
    EventobtnComprar();
    navbarEventos();              
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
        const idUser = await DecodeIdUser(token);        
        const productos= obtenerProductos();        
        if (!productos || !productos.result || productos.result.length === 0) {
            alert("El carrito está vacío. Agregue productos antes de comprar.");
            return;
        }
        const venta={
            fecha:dayjs().format('DD/MM/YYYY'),
            id_cliente:idUser.id,
            prods:productos.result.map((p)=>({
                idProd: p.id,
                cantidad: p.cantidad
            }))
        };        
        const ventaNueva= await NuevaVenta(venta);
        if(ventaNueva.error)
        {
            return alert(`Error al obtener la venta: ${ventaNueva.error}`);
        }
        if (!ventaNueva || !ventaNueva.NuevaVenta){
            return alert("Error: La respuesta de la venta es inválida.");
        }    
        console.log(JSON.stringify(ventaNueva, null, 2));        
        //Borra los productos del carrito
        localStorage.removeItem('carrito');
        alert("Gracias por su compra!")        
        let carritoObj=obtenerProductos();                 
        ActualizarCarrito(carritoObj);        
    });
};
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
