const app = document.querySelector('#app')
const jugador = {
    nombre: '',
    marca: ''
}
const cpu = {
    nombre: 'CPU',
    marca: '',
}

let start;
let circulo = false;
let cruz = false;
let win = 0;

eventListener()

function eventListener() {
    document.addEventListener('DOMContentLoaded', () => {
        iniciarJuego()
    })
}

function iniciarJuego() {
    preguntarJugador()
}

function preguntarJugador() {
    formularioJugador()
    
    const buttonForm = document.querySelector('.button')
    const nombreJugador = document.querySelector('.container > .nombre');
    const inputCircle = document.querySelector('.inputCircle');
    const inputCross = document.querySelector('.inputCross');
    
    buttonForm.onclick = function () {
        validarInfoJugador(nombreJugador.value, inputCircle, inputCross)
        seleccionarQuienParte()
        setTimeout(() => {
            document.querySelector('.container.formJugador').remove()
            jugarGato()
        }, 1500)
    }
}

function formularioJugador() {
    const formulario = document.createElement('div')
    formulario.classList.add('container', 'formJugador')

    const inputNombre = document.createElement('input');
    inputNombre.type = 'text';
    inputNombre.classList.add('nombre')
    const nombreLabel = document.createElement('label');
    nombreLabel.textContent = '¿Cuál es tu nombre?'

    const marcaBox = document.createElement('div');
    marcaBox.classList.add('marcaBox');

    const inputCircle = document.createElement('input');
    inputCircle.type = 'radio';
    inputCircle.classList.add('inputCircle');
    inputCircle.value = 'circulo'
    const inputCircleLabel = document.createElement('label');
    inputCircleLabel.textContent = 'Círculo';

    const inputCross = document.createElement('input');
    inputCross.type = 'radio';
    inputCross.classList.add('inputCross');
    inputCross.value = 'cruz'
    const inputCrossLabel = document.createElement('label');
    inputCrossLabel.textContent = 'Cruz';

    const button = document.createElement('button');
    button.classList.add('button');
    button.textContent = 'Enviar Info'
    
    marcaBox.appendChild(inputCircleLabel);
    marcaBox.appendChild(inputCircle);
    marcaBox.appendChild(inputCrossLabel);
    marcaBox.appendChild(inputCross);

    formulario.appendChild(nombreLabel)
    formulario.appendChild(inputNombre);
    formulario.appendChild(marcaBox);
    formulario.appendChild(button)


    app.appendChild(formulario);
}

function validarInfoJugador(nombreJugador, inputCircle, inputCross) {
    jugador.nombre = nombreJugador;
    if(inputCircle.checked) {
        jugador.marca = inputCircle.value;
        cpu.marca = inputCross.value;
        circulo = true;
    }else if(inputCross.checked){
        jugador.marca = inputCross.value;
        cpu.marca = inputCircle.value;
        cruz = true;
    }

    console.log(jugador)
    console.log(cpu)
    console.log(`Circulo = ${circulo}`)
    console.log(`Cruz = ${cruz}`)
}

function seleccionarQuienParte() {
    let startNumber = Math.floor(Math.random() * 4);

    if(startNumber > 1) {
        console.log(startNumber + 'Comienza Jugador');
        start = true
    } else {
        console.log(startNumber + 'Comienza CPU')
        start = false
    }

    console.log(start)
}

function jugarGato() {
    pintarJuegoGato();
    competirContraPC();
}

function pintarJuegoGato() {
    const container = document.createElement('div');
    container.classList.add('container')
    // TOP
    const divTop = document.createElement('div');
    divTop.classList.add('row', 'top');

    const topUno = document.createElement('div');
    topUno.classList.add('uno')
    const topDos = document.createElement('div');
    topDos.classList.add('dos')
    const topTres = document.createElement('div');
    topTres.classList.add('tres')

    divTop.appendChild(topUno);
    divTop.appendChild(topDos);
    divTop.appendChild(topTres);

    // Mid
    const divMid = document.createElement('div');
    divMid.classList.add('row', 'middle');

    const midUno = document.createElement('div');
    midUno.classList.add('uno')
    const midDos = document.createElement('div');
    midDos.classList.add('dos')
    const midTres = document.createElement('div');
    midTres.classList.add('tres')

    divMid.appendChild(midUno);
    divMid.appendChild(midDos);
    divMid.appendChild(midTres);

    // Bottom
    const divBottom = document.createElement('div');
    divBottom.classList.add('row', 'bottom');

    const bottomUno = document.createElement('div');
    bottomUno.classList.add('uno')
    const bottomDos = document.createElement('div');
    bottomDos.classList.add('dos')
    const bottomTres = document.createElement('div');
    bottomTres.classList.add('tres')

    divBottom.appendChild(bottomUno);
    divBottom.appendChild(bottomDos);
    divBottom.appendChild(bottomTres);

    container.appendChild(divTop);
    container.appendChild(divMid);
    container.appendChild(divBottom);

    app.appendChild(container)
}

function ganadorEs() {
    const bloques = document.querySelectorAll('.row > div')
    definirGanador()
    if(win === 1) {
        bloques.forEach(div => {
            div.classList.add('stop')
        })
        return mensaje(`Felicitaciones ${jugador.nombre}, haz ganado`)
    }else if(win === 2) {
        bloques.forEach(div => {
            div.classList.add('stop')
        })
        return mensaje(`Lo sentimos ${jugador.nombre}, prueba de nuevo`)
    }
}

function competirContraPC() {

    const stop = document.querySelector('.stop');
        
    if(stop) {
        return
    }

    const bloques = document.querySelectorAll('.row > div')
    if(start === true) {
        const stop = document.querySelector('.stop');

        if(stop) {
            return
        }

        bloques.forEach(ele => {
            ele.onclick = function() {
                if(circulo === true) {
                    ele.dataset.id = 'circulo';
                    ele.classList.add('jugador')
                    setTimeout(() => {
                        bloques.forEach(div => {
                            div.classList.add('noEvents')
                        }, 30)
                    })
                } else {
                    ele.dataset.id = 'cruz';
                    ele.classList.add('jugador')
                    setTimeout(() => {
                        bloques.forEach(div => {
                            div.classList.add('noEvents')
                        }, 30)
                    })
                }
                setTimeout(() => {
                    seleccionarBloqueRandom(ele.dataset.id)            
                    bloques.forEach(div => {
                        div.classList.remove('noEvents')
                    })           
                }, 1000)
                
                ganadorEs()
                
            }
        })
    } else if (start !== true) {
        
        
        seleccionarBloqueRandom(jugador.marca)
        
        const stop = document.querySelector('.stop');
        
        ganadorEs()
        
        if(stop) {
            return
        }

        bloques.forEach(ele => {
            ele.onclick = function() {
                if(circulo === true) {
                    ele.dataset.id = 'circulo';
                    ele.classList.add('jugador')
                    setTimeout(() => {
                        bloques.forEach(div => {
                            div.classList.add('noEvents')
                        }, 30)
                    })
                } else {
                    ele.dataset.id = 'cruz';
                    ele.classList.add('jugador')
                    setTimeout(() => {
                        bloques.forEach(div => {
                            div.classList.add('noEvents')
                        }, 30)
                    })
                }     
                setTimeout(() => {
                    bloques.forEach(div => {
                        div.classList.remove('noEvents')
                    })           
                    seleccionarBloqueRandom(ele.dataset.id)
                }, 1000)
                
                ganadorEs()

                }
            })
    }
}

function seleccionarBloqueRandom(id) {

    const stop = document.querySelector('.stop');
        
    if(stop) {
        return
    }

    const divArrays = document.querySelectorAll('#app > .container > .row > div:not(.jugador, .cpu)');
    if(divArrays.length > 1) {
        let index = Math.floor(Math.random() * (0 - divArrays.length + 1)) + divArrays.length;

        let bloqueCPU = divArrays[index]
        bloqueCPU.classList.add('cpu')

        if(id == 'circulo') {
            bloqueCPU.dataset.id = 'cruz'
        } else {
            bloqueCPU.dataset.id = 'circulo'
        }

        ganadorEs()
    } else if (divArrays.length === 1) {
        let bloqueCPU = divArrays[0]
        bloqueCPU.classList.add('cpu')

        if(id == 'circulo') {
            bloqueCPU.dataset.id = 'cruz'
        } else {
            bloqueCPU.dataset.id = 'circulo'
        }

        ganadorEs()
    }
}

function definirGanador() {
    const rowTopUno = document.querySelector('.row.top > .uno');
    const rowTopDos = document.querySelector('.row.top > .dos');
    const rowTopTres = document.querySelector('.row.top > .tres');
    
    const rowMidUno = document.querySelector('.row.middle > .uno');
    const rowMidDos = document.querySelector('.row.middle > .dos');
    const rowMidTres = document.querySelector('.row.middle > .tres');
    
    const rowBottomUno = document.querySelector('.row.bottom > .uno');
    const rowBottomDos = document.querySelector('.row.bottom > .dos');
    const rowBottomTres = document.querySelector('.row.bottom > .tres');

    if(
        rowTopUno.classList.contains('jugador') 
        && rowTopDos.classList.contains('jugador') 
        && rowTopTres.classList.contains('jugador')) {

        console.log('El Jugador hizo línea arriba')
        win = 1;

    } else if (
        rowMidUno.classList.contains('jugador') 
        && rowMidDos.classList.contains('jugador') 
        && rowMidTres.classList.contains('jugador')
    ){        

        console.log('El Jugador hizo línea al medio')
        win = 1;

    } else if (
        rowBottomUno.classList.contains('jugador') 
        && rowBottomDos.classList.contains('jugador') 
        && rowBottomTres.classList.contains('jugador')){        

        console.log('El Jugador hizo línea abajo')
        win = 1;

    } else if (
        rowTopUno.classList.contains('jugador') 
        && rowMidDos.classList.contains('jugador') 
        && rowBottomTres.classList.contains('jugador')){        

        console.log('El Jugador hizo línea en la primera columna')
        win = 1;

    } else if (
        rowTopUno.classList.contains('jugador') 
        && rowMidDos.classList.contains('jugador') 
        && rowBottomTres.classList.contains('jugador')){        

        console.log('El Jugador hizo línea en la primera diagonal')
        win = 1;

    } else if (
        rowTopTres.classList.contains('jugador') 
        && rowMidDos.classList.contains('jugador') 
        && rowBottomUno.classList.contains('jugador')){        

        console.log('El Jugador hizo línea en la segunda diagonal')
        win = 1;

    } else if (
        rowTopUno.classList.contains('jugador') 
        && rowMidUno.classList.contains('jugador') 
        && rowBottomUno.classList.contains('jugador')){        

        console.log('El Jugador hizo línea en la primera columna')
        win = 1;

    } else if (
        rowTopDos.classList.contains('jugador') 
        && rowMidDos.classList.contains('jugador') 
        && rowBottomDos.classList.contains('jugador')){        

        console.log('El Jugador hizo línea en la primera columna')
        win = 1;

    } else if (
        rowTopTres.classList.contains('jugador') 
        && rowMidTres.classList.contains('jugador') 
        && rowBottomTres.classList.contains('jugador')){        

        console.log('El Jugador hizo línea en la primera columna')
        win = 1;

        
        // CPU
    }else if(
        rowTopUno.classList.contains('cpu') 
        && rowTopDos.classList.contains('cpu') 
        && rowTopTres.classList.contains('cpu')) {

        console.log('El cpu hizo línea arriba')
        win = 2

    }else if(
        rowMidUno.classList.contains('cpu') 
        && rowMidDos.classList.contains('cpu') 
        && rowMidTres.classList.contains('cpu')){   
        
        console.log('El cpu hizo línea al medio')
        win = 2

    }else if(
        rowBottomUno.classList.contains('cpu') 
        && rowBottomDos.classList.contains('cpu') 
        && rowBottomTres.classList.contains('cpu')){    

        console.log('El cpu hizo línea abajo')
        win = 2

    }else if(
        rowTopUno.classList.contains('cpu') 
        && rowMidDos.classList.contains('cpu') 
        && rowBottomTres.classList.contains('cpu')){  

        console.log('El cpu hizo línea en la primera columna')
        win = 2

    }else if(
        rowTopUno.classList.contains('cpu') 
        && rowMidDos.classList.contains('cpu') 
        && rowBottomTres.classList.contains('cpu')){  

        console.log('El cpu hizo línea en la primera diagonal')
        win = 2

    }else if(
        rowTopTres.classList.contains('cpu') 
        && rowMidDos.classList.contains('cpu') 
        && rowBottomUno.classList.contains('cpu')){   

        console.log('El cpu hizo línea en la segunda diagonal')
        win = 2

    }else if(
        rowTopUno.classList.contains('cpu') 
        && rowMidUno.classList.contains('cpu') 
        && rowBottomUno.classList.contains('cpu')){ 

        console.log('El cpu hizo línea en la primera columna')
        win = 2

    }else if(
        rowTopDos.classList.contains('cpu') 
        && rowMidDos.classList.contains('cpu') 
        && rowBottomDos.classList.contains('cpu')){   

        console.log('El cpu hizo línea en la primera columna')
        win = 2

    }else if(
        rowTopTres.classList.contains('cpu') 
        && rowMidTres.classList.contains('cpu') 
        && rowBottomTres.classList.contains('cpu')){ 

        console.log('El cpu hizo línea en la primera columna')
        win = 2

    } else if(document.querySelectorAll('#app > .container > .row > div:not(.jugador, .cpu)').length < 1) {
        console.log('Esto fue un empate')
    }
}

function mensaje(mensaje) {
    const container = document.querySelector('.container')

    const mensajeDiv = document.createElement('div');
    if(win == 1) {
        mensajeDiv.classList.add('mensaje', 'ganador');
    }
    if(win == 2) {
        mensajeDiv.classList.add('mensaje', 'perdedor');
    }
    
    const parrafoMesaje = document.createElement('p');
    parrafoMesaje.classList.add('parrafoMensaje');
    parrafoMesaje.textContent = mensaje;

    mensajeDiv.appendChild(parrafoMesaje);

    container.appendChild(mensajeDiv);
}