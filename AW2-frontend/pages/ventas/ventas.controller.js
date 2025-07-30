import {navbarAdmin,navbarEventosAdmin} from "/components/navbarAdmin.component.js"
import {footer} from"/components/footer.component.js";
import {getVentasFecha} from "/api/ventas.api.js";

const footerContainer= document.getElementById('footerContainer');
const navContainer= document.getElementById('headerContainer');
const mainContainer= document.querySelector('.divVentas');
//Detecta la accion
const params = new URLSearchParams(window.location.search);
const action = params.get('action');
document.addEventListener('DOMContentLoaded',async()=>{
    navContainer.innerHTML=navbarAdmin;
    navbarEventosAdmin();
    footerContainer.innerHTML=footer;
    if(action==='listar')
    {
        ListadoVentas();
    }
});
async function ListadoVentas(){
    //mainContainers.innerHTML=
    const btnFiltrar=document.getElementById('btnFiltrar');
    const FechaDesde=document.getElementById('fechaDesde');
    const FechaHasta=document.getElementById('fechaHasta');
    const spinnerProductos=document.getElementById('spinnerProductos');
    //Muestra la fecha del dia
    const hoy = dayjs().format('YYYY-MM-DD');
    if(FechaDesde) FechaDesde.value=hoy;
    if(FechaHasta) FechaHasta.value=hoy;
    btnFiltrar.addEventListener('click',async()=>{       
        //Muestra el simbolo de carga
        spinnerProductos.classList.remove('hidden');
        btnFiltrar.value = 'Listando Ventas...';        
        btnFiltrar.disabled=true;
        //Consulta BD       
        const res = await getVentasFecha(FechaDesde.value,FechaHasta.value);
        const tablaVentas = document.getElementById('tablaVentas');
        if(!res.error)
        {
            //Muestra las ventas            
            tablaVentas.innerHTML = ''; // limpio tabla
            res.forEach(venta => {
                // Creo tablas para cada columna de productos
                const marcasTabla = `
                    <table class="w-full text-sm border-collapse">
                        <tbody>
                            ${venta.Productos.map(p => `
                                <tr><td class="border px-2 py-1">${p.Marca}</td></tr>
                            `).join('')}
                        </tbody>
                    </table>
                `;
                const descripcionesTabla = `
                    <table class="w-full text-sm border-collapse">
                        <tbody>
                            ${venta.Productos.map(p => `
                                <tr><td class="border px-2 py-1">${p.Descripcion}</td></tr>
                            `).join('')}
                        </tbody>
                    </table>
                `;
                const cantidadesTabla = `
                    <table class="w-full text-sm border-collapse text-center">
                        <tbody>
                            ${venta.Productos.map(p => `
                                <tr><td class="border px-2 py-1">${p.Cantidad}</td></tr>
                            `).join('')}
                        </tbody>
                    </table>
                `;
                const subtotalesTabla = `
                    <table class="w-full text-sm border-collapse text-right">
                        <tbody>
                            ${venta.Productos.map(p => `
                                <tr><td class="border px-2 py-1">${p.Subtotal}</td></tr>
                            `).join('')}
                        </tbody>
                    </table>
                `;
                // Creo la fila de la tabla principal
                const fila = document.createElement('tr');
                fila.classList.add('hover:bg-gray-100');
                fila.innerHTML = `
                    <td class="p-2 border align-top">${venta.Fecha}</td>
                    <td class="p-2 border align-top">${venta.Cliente}</td>
                    <td class="p-2 border">${marcasTabla}</td>
                    <td class="p-2 border">${descripcionesTabla}</td>
                    <td class="p-2 border">${cantidadesTabla}</td>
                    <td class="p-2 border">${subtotalesTabla}</td>
                    <td class="p-2 border align-middle text-right">${venta.Total}</td>
                `;
                tablaVentas.appendChild(fila);
            });
            spinnerProductos.classList.add('hidden');
            btnFiltrar.value = 'Filtrar';        
            btnFiltrar.disabled=false;
        }
        else
        {
            alert(res.error);
            tablaVentas.innerHTML = ''; // limpio tabla
            spinnerProductos.classList.add('hidden');
            btnFiltrar.value = 'Filtrar';        
            btnFiltrar.disabled=false;
        };
    });
};

//  <thead>
//                             <tr class="bg-gray-200">
//                                 <th class="border px-2 py-1">Marca</th>
//                                 <th class="border px-2 py-1">Descripción</th>
//                                 <th class="border px-2 py-1">Cant.</th>
//                                 <th class="border px-2 py-1 text-right">Subtotal</th>
//                             </tr>
//                         </thead>