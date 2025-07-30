export const navbarAdmin = `<nav class="bg-white border-gray-200 dark:bg-gray-900">
  <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
    <a href="/pages/home/home.html" class="flex items-center space-x-3 rtl:space-x-reverse">
      <img src="/resource/img/navbar-logo.webp" class="w-40" alt="FastMotos" />
      <!-- <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">FastMotos</span> -->
    </a>
    <button data-collapse-toggle="navbar-default" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
      <span class="sr-only">Open main menu</span>
      <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
      </svg>
    </button>
    <div class="hidden w-full md:block md:w-auto" id="navbar-default">
      <ul class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
        <li class="relative inline-block text-left">
          <div>
            <button type="button" id="menu-button-productos" aria-expanded="false" aria-haspopup="true" class="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50">
              PRODUCTOS
              <svg class="-mr-1 size-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                <path fill-rule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
              </svg>
            </button>
          </div>
          <div id="dropdown-menu-productos" class="hidden absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
            <div class="py-1" role="none">
              <a href="/pages/productos/productos.html?action=crear" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem" tabindex="-1" id="menu-item-0">Crear Producto</a>
              <a href="/pages/productos/productos.html?action=actualizar" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem" tabindex="-1" id="menu-item-1">Actualizar Producto</a>
              <a href="/pages/productos/productos.html?action=precios" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem" tabindex="-1" id="menu-item-1">Actualizar Precios</a>
              <a href="/pages/productos/productos.html?action=eliminar" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem" tabindex="-1" id="menu-item-2">Eliminar Producto</a>                         
            </div>
          </div>
        </li>
        <li class="relative inline-block text-left">
          <div>
            <button type="button" id="menu-button-ventas" aria-expanded="false" aria-haspopup="true" class="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50">
              VENTAS
              <svg class="-mr-1 size-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                <path fill-rule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
              </svg>
            </button>
          </div>
          <div id="dropdown-menu-ventas" class="hidden absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
            <div class="py-1" role="none">
              <a href="/pages/ventas/ventas.html?action=listar" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem" tabindex="-1" id="menu-item-0">Listar Ventas</a>                           
            </div>
          </div>
        </li>
        <li>
          <a href="/pages/home/home.html" class="block py-2 px-3 text-black  rounded-sm md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-200" aria-current="page">HOME</a>
        </li>        
        <li>
          <a href="https://motos.honda.com.ar/postventa/service" class="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">SERVICE</a>
        </li>
        <li>
          <a href="https://wa.me/5492923469165" class="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">CONTACTO</a>
        </li>
        <li>
          <a href="/pages/cart/cart.html" class="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent material-icons">shopping_cart</a>
        </li>
        <li>
          <a href="/index.html" title="Cerrar Sesión" class="btnlogOut block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent material-icons">logout</a>
        </li>
      </ul>
    </div>
  </div>
</nav>`;
export function navbarEventosAdmin() {
    const navBarLogOut = document.querySelector('.btnlogOut');  
    navBarLogOut.addEventListener('click', (e) => {       
      e.preventDefault();
      sessionStorage.removeItem('usuario'); // Eliminar datos del usuario
      alert("Cerrando Sesión...");
      window.location.href = '/index.html'; // Redirigir al login
    });
    //Hace que detecte el click el menu desplegable
    const toggleBtn = document.querySelector('[data-collapse-toggle="navbar-default"]');
    const menu = document.getElementById('navbar-default');
    if (toggleBtn && menu) {
        toggleBtn.addEventListener('click', () => {
            menu.classList.toggle('hidden');
        });
    };

    // Toggle dropdown menu Productos
    const menuButtonProd = document.getElementById('menu-button-productos');
    const dropdownMenuProd = document.getElementById('dropdown-menu-productos');
    if (menuButtonProd && dropdownMenuProd) {
        menuButtonProd.addEventListener('click', (e) => {
            e.preventDefault();
            const isExpanded = menuButtonProd.getAttribute('aria-expanded') === 'true';
            menuButtonProd.setAttribute('aria-expanded', String(!isExpanded));
            dropdownMenuProd.classList.toggle('hidden');
        });
        //cerrar dropdown si clickeas fuera
        document.addEventListener('click', (e) => {
            if (!menuButtonProd.contains(e.target) && !dropdownMenuProd.contains(e.target)) {
                dropdownMenuProd.classList.add('hidden');
                menuButtonProd.setAttribute('aria-expanded', 'false');
            }
        });
    };
    // Toggle dropdown menu Ventas
    const menuButtonVentas = document.getElementById('menu-button-ventas');
    const dropdownMenuVentas = document.getElementById('dropdown-menu-ventas');
    if (menuButtonVentas && dropdownMenuVentas) {
        menuButtonVentas.addEventListener('click', (e) => {
            e.preventDefault();
            const isExpanded = menuButtonVentas.getAttribute('aria-expanded') === 'true';
            menuButtonVentas.setAttribute('aria-expanded', String(!isExpanded));
            dropdownMenuVentas.classList.toggle('hidden');
        });
        //cerrar dropdown si clickeas fuera
        document.addEventListener('click', (e) => {
        if (!menuButtonVentas.contains(e.target) && !dropdownMenuVentas.contains(e.target)) {
            dropdownMenuVentas.classList.add('hidden');
            menuButtonVentas.setAttribute('aria-expanded', 'false');
        }
        });
    };
}; 
        