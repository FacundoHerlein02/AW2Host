import mongoose from 'mongoose' 
const {Schema,models,model,ObjectId}= mongoose;

//Configuracion del esquema ventas
const VentasSchema = new Schema({
    fecha: {type:String,required:true},
    // id_cliente:{type:ObjectId,required:true,ref:'usuarios'},
    id_cliente:{type:String,required:true},
    productos:[
        {
            _id: false,
            id_producto: { type:ObjectId, ref: 'producto', required: true },
            cantidad: { type: Number, required: true },
            subtotal: { type: Number, required: true }
        }
    ],
    total:{type:Number,required:true}   
},{timestamps:true});
//Busca si existe el modelo, sino lo crea pasando la configuracion
const Venta= models.ventas || model('ventas',VentasSchema);

export default Venta
