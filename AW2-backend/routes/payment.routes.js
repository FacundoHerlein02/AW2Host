import {Router} from "express";
import dotenv from 'dotenv';
dotenv.config()
//SDK de Mercado Pago
import { MercadoPagoConfig, Preference , Payment} from 'mercadopago';
const router= Router();
//Configuracion API
const client = new MercadoPagoConfig({ accessToken: `${process.env.AccesToken}` });

//GET
//Si se aprueba el pago
router.get('/succes',(req,res)=>{
    const img='https://static.vecteezy.com/system/resources/previews/015/876/264/non_2x/success-payment-in-hand-illustration-in-flat-style-approved-money-illustration-on-isolated-background-successful-pay-sign-business-concept-vector.jpg'
});
//Si se rechaza el pago
router.get('/failure',(req,res)=>{
    const img="https://lacnic.zendesk.com/hc/article_attachments/25998694928663";
});
//Si queda pendiente el pago
router.get('/pending',(req,res)=>{
    const img="https://cdn3d.iconscout.com/3d/premium/thumb/pendiente-de-pago-5460707-4565163.png";
});
//POST
//crea la orden de pago
router.post('/createOrder',async (req,res)=>{
    //Items de la orden    
    const { productos, id_cliente,fecha } = req.body;    
    //Adapta los items a la api de MP
    const Items=productos.result.map(prod=>({
        title: prod.Descripcion,
        quantity: Number(prod.cantidad),
        unit_price: parseFloat(prod.Precio.replace('$', '')),
        currency_id: "ARS"
    }));      
    try {        
        const preference = new Preference(client);
        const result=await preference.create({
                    body: {
                        notification_url:`${process.env.api}/payment/webHook`,
                        auto_return: "approved",
                        back_urls:{
                            success: 'https://fastmotos.netlify.app/pages/cart/cart.html?status=success',
                            failure: 'https://fastmotos.netlify.app/pages/cart/cart.html?status=failure',
                            pending: 'https://fastmotos.netlify.app/pages/cart/cart.html?status=pending'
                        },                                        
                        items: Items,          
                        payment_methods: {                            
                            installments: 12
                        },
                        statement_descriptor:"FastMotos",
                        //Datos para crear la venta
                        metadata: {  
                            id_cliente,
                            prods: productos.result.map(p => ({
                                id_prod: p.id,
                                cantidad: p.cantidad
                            })),
                            fecha
                        }
                    }
                });        
        console.log(result)             
        return res.status(200).send(result)
    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }    
});

//Recibe datos del pago
router.post('/webHook',async(req,res)=>{
    try {        
        const payment=req.query           
        if(payment.type==="payment")
        {
            //Id del pago           
            const PayId=payment['data.id']
            const pay = new Payment(client);       
            //Obtiene el pago     
            const payData = await pay.get({ id: `${PayId}` });
            //console.log('RESPUESTA:', payData)           
            //console.log("ESTADO:",payData.status);
            //Si se aprueba el pago realiza la venta
            if (payData.status === 'approved') {                
                //Genera la venta una vez que se aprueba el pago
                try{
                    const {id_cliente, prods, fecha} = payData.metadata;
                    //Adapta para generar la venta
                    const prodsNormalizados = prods.map(p => ({
                        cantidad: p.cantidad,
                        idProd:p.id_prod
                    }));                    
                    console.log(id_cliente, prodsNormalizados, fecha)                    
                    const response = await fetch(`${process.env.api}/ventas/newVenta`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            fecha,
                            id_cliente,
                            prods:prodsNormalizados                            
                        })
                    });
                    const data = await response.json();
                    if (!response.ok) {
                        console.error('Error al crear la venta:', data.error);
                    } else {
                        console.log('Venta registrada con éxito:', data);
                    }
                } catch (error) {
                    console.log(error)
                }                
            }                           
        }           
        return res.status(200).send('OK');
    } catch (error) {
        console.log(error)
    }
});

export default router
