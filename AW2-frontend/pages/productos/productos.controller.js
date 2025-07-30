import {navbarAdmin,navbarEventosAdmin} from "/components/navbarAdmin.component.js"
import {footer} from"/components/footer.component.js";
import {formCrearProducto} from '/components/formCrearProducto.component.js';
import {formEditarProducto} from '/components/formEditProducto.component.js';
import {formUpdatePrecios} from "/components/formUpdatePrecios.component.js";
import {formDeleteProducto} from "/components/formDeleteProducto.component.js";
import {getAllProductos,getProductosId,newMoto,updateMoto,updatePrecio,deleteMoto} from '../../api/productos.api.js';

const footerContainer= document.getElementById('footerContainer');
const navContainer= document.getElementById('headerContainer');
const mainContainer= document.querySelector('.divForm');
//Detecta la accion
const params = new URLSearchParams(window.location.search);
const action = params.get('action');
document.addEventListener('DOMContentLoaded',async()=>{  
    navContainer.innerHTML=navbarAdmin
    navbarEventosAdmin();
    footerContainer.innerHTML=footer;
    
    // Según la acción, redirige al frm correcto
    if (action === 'crear') {
        CrearProducto();
    } else if (action === 'actualizar') {
        ActualizarProducto();
    } else if (action === 'precios') {        
        ActualizarPrecios();
    } else if (action === 'eliminar') {
        EliminarProducto();
    } else {
        //Acción desconocida
        alert('Acción no válida.');
        window.location.href = '../home/home.html'
    }                  
});
async function ActualizarPrecios()
{
    //Obtiene los productos
    const productos=await getAllProductos();    
    let marcas=await obtenerMarcas(productos.result);
    mainContainer.innerHTML=formUpdatePrecios(marcas,productos);
    //Actualiza un producto en especial
    const rdbProducto= document.getElementById('radioProducto');
    //Actualiza una marca en especial
    const rdbMarca= document.getElementById('radioMarca');
    //Actualiza Todos
    const rdbTodos= document.getElementById('radioTodos');
    const frmActualizarPrecios= document.getElementById('frmActualizarPrecio');
    //Combos
    const cboProductos=document.getElementById('SelectProductos');
    const cboMarcas=document.getElementById('SelectMarcas'); 
    
    frmActualizarPrecios.addEventListener('submit',async(e)=>{
        e.preventDefault();
        const submitButton= frmActualizarPrecios.querySelector('input[type="submit"]');
        const spinnerProductos=document.getElementById('spinnerProductos'); 
        //Porcentaje de aumento   
        const porcentaje= parseFloat(document.getElementById('porcentaje').value);
        //Muestra el simbolo de carga
        spinnerProductos.classList.remove('hidden');
        submitButton.value = 'Actualizando Precios...';        
        submitButton.disabled=true;
        if(rdbProducto.checked)
        {
            //Actualiza un producto en especial
            const idProducto =cboProductos.value;              
            if(isNaN(porcentaje) || porcentaje <= -30 || porcentaje>100)
            {
                alert('Porcentaje inválido. Ingrese un valor entre -30% y 100%.');
                return;
            }
            else
            {                
                const res = await updatePrecio(idProducto,null,porcentaje);
                //Si no hay error muesta el mensaje                
                if(!res.error)
                {          
                    alert(
                        `Precio de ${res.MotoActualizada.descripcion} actualizado en un ${porcentaje}% correctamente.`                                             
                    );
                    //Recarga la pagina
                    window.location.reload()                       
                }
                else {
                    alert(res.error);
                    spinnerProductos.classList.add('hidden');
                    submitButton.value = 'Actualizar Precios';        
                    submitButton.disabled=false;
                }
            }
        }
        else if (rdbMarca.checked) {
            //Actualiza una marca en especial            
            const Marca =cboMarcas.value;                      
            if(isNaN(porcentaje) || porcentaje <= -30 || porcentaje>100)
            {
                alert('Porcentaje inválido. Ingrese un valor entre -30% y 100%.');
                return;
            }
            else
            {                
                const res = await updatePrecio(null,Marca,porcentaje);
                if(!res.error)
                {          
                    alert(
                        `Precios de ${Marca} actualizados en un ${porcentaje}% correctamente.`                                             
                    );
                    //Recarga la pagina
                    window.location.reload()                       
                }
                else {
                    alert(res.error);
                    spinnerProductos.classList.add('hidden');
                    submitButton.value = 'Actualizar Precios';        
                    submitButton.disabled=false;
                }
            }
        } 
        else 
        {
            //Actualiza Todos
            alert('todos')
            if(isNaN(porcentaje) || porcentaje <= -30 || porcentaje>100)
            {
                alert('Porcentaje inválido. Ingrese un valor entre -30% y 100%.');
                return;
            }
            else
            {
                const res = await updatePrecio(null,null,porcentaje);
                 if(!res.error)
                {          
                    alert(
                        `Precios de todos los productos actualizados en un ${porcentaje}% correctamente.`                                             
                    );
                    //Recarga la pagina
                    window.location.reload()                       
                }
                else {
                    alert(res.error);
                    spinnerProductos.classList.add('hidden');
                    submitButton.value = 'Actualizar Precios';        
                    submitButton.disabled=false;
                }
            }
            
        }
    });
    //Detecta los cambios y adapta el front
    rdbMarca.addEventListener('change',MostrarOcultarCampos);
    rdbProducto.addEventListener('change',MostrarOcultarCampos);
    rdbTodos.addEventListener('change',MostrarOcultarCampos);    
    //Desactiva los combo que no necesita
    function MostrarOcultarCampos()
    {
        if(rdbProducto.checked)
        {
            cboMarcas.disabled=true;
            cboProductos.disabled=false;
        }
        else if(rdbMarca.checked)
        {
            cboProductos.disabled=true;
            cboMarcas.disabled=false;
        }
        else
        {
            cboProductos.disabled=true;
            cboMarcas.disabled=true;
        };
    };
};
async function ActualizarProducto()
{
    //Obtiene los productos
    const productos=await getAllProductos();    
    let marcas=await obtenerMarcas(productos.result)

    mainContainer.innerHTML=formEditarProducto(marcas,productos);
    const frmEditarProducto=document.getElementById('frmEditarProducto');
    //Combo con los productos
    const SelectProducto= document.getElementById('SelectProductos');
    const inputImagen = document.getElementById('imagen');
    const previewImagen = document.getElementById('preview');
    if(inputImagen)
    {
        inputImagen.addEventListener('input', () => {
            // Cambia el src
            previewImagen.src = inputImagen.value || 'https://www.smarttools.com.mx/wp-content/uploads/2019/05/imagen-no-disponible.png';
        });
    }
    //Detecta el cambio de item
    SelectProducto.addEventListener('change', async() =>{
        let prodId =SelectProducto.value        
        //Obtiene el producto seleccionado
        let producto = await getProductosId(prodId)        
        //Asigno los valores de la moto
        document.getElementById('marcas').value=producto.result.Marca;
        document.getElementById('descripcion').value = producto.result.Descripcion;
        document.getElementById('precio').value = (producto.result.Precio).replace('$','');
        document.getElementById('stock').value = producto.result.Stock;
        document.getElementById('imagen').value = producto.result.Imagen;
        previewImagen.src =producto.result.Imagen
    });
    //Actualiza el producto    
    frmEditarProducto.addEventListener('submit',async(e)=>{
        e.preventDefault();
        const submitButton= frmEditarProducto.querySelector('input[type="submit"]');
        const spinnerProductos=document.getElementById('spinnerProductos');        
        //Trae el select
        const marcas=document.getElementById('marcas');
        //Selecciona el valor del select
        const marca=marcas.value;
        //Id del select
        const id=SelectProducto.value; 
        const descripcion=document.getElementById('descripcion').value;
        const precioString=document.getElementById('precio').value;
        const stock=document.getElementById('stock').value;
        const img=document.getElementById('imagen').value;                
        //Imagenes no disponibles
        const imagenes=[
            "https://www.smarttools.com.mx/wp-content/uploads/2019/05/imagen-no-disponible.png",
            "https://www.smarttools.com.mx/wp-content/uploads/2019/05/imagen-no-disponible.png",
            "https://www.smarttools.com.mx/wp-content/uploads/2019/05/imagen-no-disponible.png"
        ];
        let precio = parseFloat(precioString);
        // Verificar si es un número válido
        if (isNaN(precio)) {
            alert('El precio ingresado no es un número válido.');            
        } else {
            spinnerProductos.classList.remove('hidden');
            submitButton.value = 'Editando Producto...';        
            submitButton.disabled=true;
            const res = await updateMoto(id,marca,descripcion,precio,stock,img,imagenes);   

            //Si no hay error muesta el mensaje
            if(!res.error)
            {          
                alert(
                    `${res.mensaje}:\n` +
                    `Marca: ${res.MotoActualizada.marca}\n` +
                    `Descripción: ${res.MotoActualizada.descripcion}\n` +
                    `Precio: ${res.MotoActualizada.precio}\n` +
                    `Stock: ${res.MotoActualizada.stock}`                      
                );
                //Recarga la pagina
                window.location.reload()                       
            }
            else {
                alert(res.error);
                spinnerProductos.classList.add('hidden');
                submitButton.value = 'Editar Producto';        
                submitButton.disabled=false;
            }
        };
    });
};

async function CrearProducto()
{
    //Obtiene los productos
    const productos=await getAllProductos();    
    let marcas=await obtenerMarcas(productos.result)

    //Inserta el componente
    mainContainer.innerHTML=formCrearProducto(marcas);
    const formProducto=document.getElementById('frmCrearProducto');
    const inputImagen = document.getElementById('imagen');
    const previewImagen = document.getElementById('preview');    
    if(inputImagen)
    {
        inputImagen.addEventListener('input', () => {
            // Cambia el src
            previewImagen.src = inputImagen.value || 'https://www.smarttools.com.mx/wp-content/uploads/2019/05/imagen-no-disponible.png';
        });
    }
    formProducto.addEventListener('submit',async(e)=>{
        e.preventDefault();
        const submitButton= formProducto.querySelector('input[type="submit"]');
        const spinnerProductos=document.getElementById('spinnerProductos');        
        //Trae el select
        const marcas=document.getElementById('marcas');
        //Selecciona el valor del select
        const marca=marcas.value;
        const descripcion=document.getElementById('descripcion').value;
        const precioString=document.getElementById('precio').value;
        const stock=document.getElementById('stock').value;
        const img=document.getElementById('imagen').value;                
        //Imagenes no disponibles
        const imagenes=[
            "https://www.smarttools.com.mx/wp-content/uploads/2019/05/imagen-no-disponible.png",
            "https://www.smarttools.com.mx/wp-content/uploads/2019/05/imagen-no-disponible.png",
            "https://www.smarttools.com.mx/wp-content/uploads/2019/05/imagen-no-disponible.png"
        ];
        let precio = parseFloat(precioString);
        // Verificar si es un número válido
        if (isNaN(precio)) {
            alert('El precio ingresado no es un número válido.');            
        } else {
            spinnerProductos.classList.remove('hidden');
            submitButton.value = 'Creando Producto...';        
            submitButton.disabled=true;           
            const res = await newMoto(marca,descripcion,precio,stock,img,imagenes);        
            //Si no hay error muesta el mensaje
            if(!res.error)
            {          
                alert(
                    `${res.mensaje}:\n` +
                    `Marca: ${res.NuevaMoto.marca}\n` +
                    `Descripción: ${res.NuevaMoto.descripcion}\n` +
                    `Precio: ${res.NuevaMoto.precio}\n` +
                    `Stock: ${res.NuevaMoto.stock}`                      
                );
                //Recarga la pagina
                window.location.reload()                       
            }
            else {
                alert(res.error);
                spinnerProductos.classList.add('hidden');
                submitButton.value = 'Crear Producto';        
                submitButton.disabled=false;
            }
        };       
    }); 
};
async function EliminarProducto()
{    
    //Obtiene los productos
    const productos=await getAllProductos();    
    mainContainer.innerHTML=formDeleteProducto(productos);
    //Obtiene el form
    const frmEliminarProductos=document.getElementById('frmEliminarProducto');
    //Combo con marcas
    const cboMarcas=document.getElementById('cboProductos');
    let idProducto
    //Detecta cambios en el select
    cboMarcas.addEventListener('change',async()=>{        
        //id de la moto
        idProducto=cboMarcas.value;
        if(!idProducto)
        {
            alert("Error al obtener el ID de producto.")
            lblMarca.textContent = "Marca:";
            previewImagen.src = "https://www.smarttools.com.mx/wp-content/uploads/2019/05/imagen-no-disponible.png";
        } 
        else
        {
            //Busca la moto por id
            const moto= await getProductosId(idProducto);
            if(!moto.result)
            {
                alert("No se encontró ninguna moto con ese ID.");
                lblMarca.textContent = "Marca: no encontrada";
                previewImagen.src = "https://www.smarttools.com.mx/wp-content/uploads/2019/05/imagen-no-disponible.png";
            }
            else
            {
                const previewImagen = document.getElementById('preview');
                const lblMarca=document.getElementById('lblMarca');
                //Carga la marca
                lblMarca.textContent=`Marca: ${moto.result.Marca}`
                //Carga imagen
                previewImagen.src=moto.result.Imagen;
            };
        };        
    });
    frmEliminarProductos.addEventListener('submit',async(e)=>{
        e.preventDefault();
        const submitButton= frmEliminarProductos.querySelector('input[type="submit"]');
        const spinnerProductos=document.getElementById('spinnerProductos');
        //Muestra el simbolo de carga
        spinnerProductos.classList.remove('hidden');
        submitButton.value = 'Eliminando Producto...';        
        submitButton.disabled=true;
        //Obtiene el id de la moto
        idProducto=cboMarcas.value        
        if(!idProducto)
        {
            alert("Error al obtener el ID de producto.")
            lblMarca.textContent = "Marca:";
            previewImagen.src = "https://www.smarttools.com.mx/wp-content/uploads/2019/05/imagen-no-disponible.png";
        }   
        else
        {            
            const res =await deleteMoto(idProducto);            
            //Si no hay error muesta el mensaje                
            if(!res.error)
            {                          
                alert(
                    `Moto ${res.motoEliminada.descripcion} eliminada correctamente.`                                             
                );
                //Recarga la pagina
                window.location.reload()                       
            }
            else {
                alert(res.error);
                spinnerProductos.classList.add('hidden');
                submitButton.value = 'Eliminar Productos';        
                submitButton.disabled=false;
            };
        };        
    });   
};
//Genera un arreglo de marcas unicas
function obtenerMarcas(productos)
{
    const marcas = productos.map(p => p.Marca);
    const marcasUnicas = [...new Set(marcas)];
    return marcasUnicas;
};

