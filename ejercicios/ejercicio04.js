// si supera los 100kilomreso (mostrar velodidad elevada)
//si supera los 120 mostrar (exceso de velocidad   )
//si supera los 150 kilometros (mostrar velocidad extremadamente peligrosa)

let velocidad = -120;

//validador
if(velocidad <= 0){
    console.log(`Velocidad debe ser mayor a 0`);
}

if(velocidad >0 && velocidad <=100){
    console.log('Velocidad Normal');
}else if(velocidad >100 && velocidad <=120){
    console.log('Velocidad elevada');
}else if(velocidad >120 && velocidad <=150){    
    console.log('Exceso de velocidad')
}else if(velocidad >150){
    console.log('Velocidad extremadamente peligrosa')
}
