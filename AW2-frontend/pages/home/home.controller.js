import {filtro} from "../../components/filtroMarca.component.js"
import{getAllProductos,getProductosMarca,getProductosId} from"../../api/productos.api.js";
import {cards} from "../../components/cards.component.js"
import {DecodeUser} from "../../api/usuarios.api.js";
import {navbar,navbarEventos} from"/components/navbar.component.js"
import {navbarAdmin,navbarEventosAdmin} from "/components/navbarAdmin.component.js"
import {footer} from"/components/footer.component.js";
const footerContainer= document.getElementById('footerContainer');
const navContainer= document.getElementById('headerContainer');
const cardContainer = document.getElementById('ContainerProductos');
const containerfiltroMarcas= document.getElementById('filtroMarca');
let productos;
let cardsHTML;
document.addEventListener('DOMContentLoaded', async () => {
    //Valida el usuario e inserta el navbar que corresponde    
    await obtenerUsuario ();
    //navContainer.innerHTML=navbar;
    footerContainer.innerHTML=footer;
    //Carga todos los productos
    productos= await getAllProductos()    
    cardsHTML = cards(productos);       
    cardContainer.innerHTML=cardsHTML;    
    //Inserto de manera dinamica los filtros de marca
    containerfiltroMarcas.innerHTML= filtro;
    asignarEventos()       
});
function asignarEventos(){
    asignarEventosCarrito()
    asignarEventosFiltro()    
};
function asignarEventosFiltro(){
    const marcas= containerfiltroMarcas.querySelectorAll('div[data-marca]');
    marcas.forEach(div=>{
        div.addEventListener('click',async()=>{
            const marca= div.getAttribute('data-marca');            
            //Agrega los productos filtrados por marca
            productos= await getProductosMarca(marca);            
            cardsHTML= cards(productos);            
            cardContainer.innerHTML=cardsHTML;
            asignarEventosCarrito()                      
        });
    }); 
};
function asignarEventosCarrito() {
    const btnsCarrito = document.querySelectorAll('.btnCarrito');
    btnsCarrito.forEach(btn => {
        btn.addEventListener('click', async(e) => {
            const card = e.target.closest('[data-id]');
            const id = card?.getAttribute('data-id');
            if (!id) return alert("No se pudo obtener el ID del producto.");
            const moto = await getProductosId(id)
            if (moto.error) {
                return alert(`Error al obtener la moto: ${moto.error}`);
            }            
            agregarAlCarrito(moto.result);            
        });
    });
};
function agregarAlCarrito(moto) {
    // Trae el carrito actual
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    // Buscamos si ya existe la moto en el carrito
    const index = carrito.findIndex(p => p.id === moto.id);
    if (index !== -1) {
        if(carrito[index].cantidad < moto.Stock)
        {
            carrito[index].cantidad += 1;
            //Mantiene el stock actualizado
            carrito[index].Stock=moto.Stock;            
            alert(`Moto agregada al carrito: ${moto.Descripcion} | Cantidad: ${carrito[index].cantidad}`);
        }
        else {
            alert("No hay stock suficiente para agregar más unidades de este producto.");
        }        
    } else {
        // Si no está, la agregamos con cantidad 1
        if (moto.Stock > 0) {
            const motoConCantidad = { ...moto, cantidad: 1 };
            carrito.push(motoConCantidad);
            alert(`Moto agregada al carrito: ${moto.Descripcion} | Cantidad: 1`);
        }
        else {
            alert("No hay stock disponible para este producto.");
        }         
    }
    // Guardamos el carrito actualizado
    localStorage.setItem('carrito', JSON.stringify(carrito));      
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

