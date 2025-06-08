import mongoose from 'mongoose' 
const {Schema,models,model}= mongoose;

//Configuracion del esquema usuarios
const UsuariosSchema = new Schema({
    nombre: {type:String,required:true},
    apellido:{type:String,required:true},
    usuario:{type:String,required:true,unique:true},
    contraseña:{type:String,required:true}    
});
//Busca si existe el modelo, sino lo crea pasando la configuracion
const Usuario= models.usuarios || model('usuarios',UsuariosSchema);

export default Usuario