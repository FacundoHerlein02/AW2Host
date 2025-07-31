import {logIn,register} from "./api/login.api.js"
import {footer} from"/components/footer.component.js";
import {formLogin} from "./components/formLogin.component.js";
import {formRegister} from "./components/formRegister.component.js"
const divForm =document.querySelector('.divForm');   
const footerContainer= document.getElementById('footerContainer');
document.addEventListener('DOMContentLoaded',async()=>{        
    footerContainer.innerHTML=footer;    
    //Carga el login
    renderLoginForm();        
});
//Carga el Fromulario de inicio sesion
function renderLoginForm() {
    //Inserta el form login
    divForm.innerHTML = formLogin;
    const frmLogin = document.getElementById("frmLogin");
    if (frmLogin) {
        frmLogin.addEventListener('submit', async (e) => {
            e.preventDefault();
            const submitButton = frmRegister.querySelector('input[type="submit"]');
            const spinner = document.getElementById('spinnerLogin');
            submitButton.value = 'Iniciando Sesión...'; 
            submitButton.disabled = true; 
            spinner.classList.remove('hidden'); // muestra spinner
            const usuario = document.getElementById('user').value;
            const contraseña = document.getElementById('pass').value;
            const Res = await logIn(usuario, contraseña);
            if (Res.error) {
                alert(Res.error);
                submitButton.value = 'Iniciar Sesión'; 
                submitButton.disabled = false;
                spinner.classList.add('hidden'); // Oculta spinner
            } else {
                alert(Res.mensaje);
                sessionStorage.setItem('usuario', Res.token);
                window.location.href = './pages/home/home.html';
            }
        });
    }

    const btnRegister = document.querySelector('.btnRegister');
    if (btnRegister) {
        btnRegister.addEventListener('click', () => {
            renderRegisterForm();
        });
    }
};
//Carga el Fromulario de Registro
function renderRegisterForm() {
    //Inserta el formulario de regitro
    divForm.innerHTML = formRegister;
    const frmRegister= document.getElementById("frmRegister");
    //Si existe añade los eventos
    if(frmRegister)
    {                   
        frmRegister.addEventListener('submit',async(e)=>{            
            e.preventDefault();
            const submitButton = frmRegister.querySelector('input[type="submit"]');
            const spinner = document.getElementById('spinnerRegister');            
            submitButton.value = 'Registrando...';
            submitButton.disabled = true;
            spinner.classList.remove('hidden'); // muestra spinner
            const nombre= document.getElementById('nombre').value;
            const apellido=document.getElementById('apellido').value;   
            const usuario= document.getElementById('user').value;
            const clave=document.getElementById('pass').value;
            const Res=await register(nombre,apellido,usuario,clave);
            if(Res.error)
            {
                alert(Res.error);
                submitButton.value = 'Registrarse';
                submitButton.disabled = false;
                spinner.classList.add('hidden'); // muestra spinner        
            }
            else
            {
                alert(Res.mensaje)
                sessionStorage.setItem('usuario',Res.token);     
                window.location.href='./pages/home/home.html'
            }
        });
    }    
    //Evento del boton login
    const btnLogin = document.querySelector('.btnLogin');
    if (btnLogin) {
        btnLogin.addEventListener('click', () => {
            renderLoginForm();
        });
    };    
};




