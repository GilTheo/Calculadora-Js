alert('Bienvenido a mi calculadora!');

let dato;

do{
    dato = prompt('Escribe CONTINUAR para usarla o SALIR para salir').toUpperCase();
    if(dato === 'CONTINUAR'){
        primerNumero = parseInt(prompt('Ingresa el primer numero'));
        calculo = prompt('Ingresa el calculo que quieras hacer\n\n"x" Multiplicacion\n"+" Suma\n"-" Resta\n"/" Division');
        segundoNumero = parseInt(prompt('Ingresa el segundo numero'));
        switch (calculo) {
            case 'x':
                alert('El resultado es ' + (primerNumero * segundoNumero));
                break;
            case '+':
                alert('El resultado es ' + (primerNumero + segundoNumero));
            break;
            case '/':
                alert('El resultado es ' + (primerNumero / segundoNumero));
            break;
            case '-':
                alert('El resultado es ' + (primerNumero - segundoNumero));                
            break;
            case '':
                alert('Te olvidaste de poner el calculo!');
            break;
            default:
                alert('Math error, seguro pusiste cualquier cosa cuando te pedi el calculo.');
            break;
        }
    }else if(dato === ''){
        alert('No pusiste nada. Volve a intentarlo!')
    }else if(dato === 'SALIR'){
        alert('Nos vemos!')
    }else{
        alert('Pusiste cualquier cosa amigo, fijate de escribir bien.')
    }

}while(dato !== 'SALIR');
