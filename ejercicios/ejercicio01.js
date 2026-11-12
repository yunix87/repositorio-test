//una tienda virtual ofre envío gratuito cuandi el cliente realiza una compra de S/100 o mas
//Necesitamos verificar si el importe de la compra cumple esta condición.

let montoCompra = 160;
let envioGratis = false;

console.log(`Monto de la compra: S/${montoCompra}`);
if (montoCompra >= 100) {
    envioGratis = true;
    console.log(`Envío gratuito`);
}
else {  
console.log('el envió tine un costo de S/10');  }