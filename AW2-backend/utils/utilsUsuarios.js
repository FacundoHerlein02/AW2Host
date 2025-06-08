import { readFile, writeFile } from 'fs/promises';
let users = [];
//Lee el Json
export async function cargarUsuarios() {
    try {
        const usersJson = await readFile('./JSON/usuarios.json', 'utf-8');
        users = usersJson.trim() === "" ? [] : JSON.parse(usersJson);
    } catch (error) {
        console.error("Error cargando usuarios:", error);
        users = [];
    }
}
//Devuelve el json usuarios
export function getUsuarios() {
    return users;
}
//Añade usuarios al Json
export async function agregarUsuario(usuario) {
    users.push(usuario);
    await writeFile('./JSON/usuarios.json', JSON.stringify(users, null, 2));
}
//Actualiza ventas al Json
export async function actualizarUsuario(usuario) {
    const index = users.findIndex(u => u.id_cliente === usuario.id_cliente);
    if (index === -1) {
        throw new Error(`Usuario con id ${usuario.id_cliente} no encontrado`);
    }
    users[index] = usuario;
    await writeFile('./JSON/usuarios.json', JSON.stringify(users, null, 2));
}

//Obtiene la ultima Id de usuario y suma 1
export const getUltId= ()=> {    
    const maxId = Math.max(...users.map(u => u.id_cliente));
    return maxId + 1;
};

//Obtener usuario por id
export const getUserByid=(id)=>{
    const user= users.find(u=>u.id_cliente==id)
    if (!user) {
        throw new Error(`Usuario con id ${id} no encontrado`);
    }
    else
    {
        return user
    }
};
