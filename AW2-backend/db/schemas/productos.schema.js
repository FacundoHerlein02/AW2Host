import mongoose from 'mongoose' 
const {Schema,models,model}= mongoose;

//Configuracion del esquema producto
const ProductosSchema = new Schema({
    marca: {type:String,required:true},
    descripcion:{type:String,required:true},
    precio:{type:Number,required:true},
    stock:{type:Number,required:true,default:0},
    img:{type:String,required:true},
    imagenes:{type:[String],required:true,default:[]}
});
//Busca si existe el modelo, sino lo crea pasando la configuracion
const Producto= models.productos || model('productos',ProductosSchema);

export default Producto