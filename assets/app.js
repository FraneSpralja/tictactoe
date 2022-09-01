import { ganadorEs} from "./ganador.js";
// import { dificultadCPU } from "./dificultad.js";

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
                    // dificultadCPU()
                    seleccionarBloqueRandom(ele.dataset.id)            
                    bloques.forEach(div => {
                        div.classList.remove('noEvents')
                    })           
                }, 1000)
                
                ganadorEs(jugador)
                
            }
        })
    } else if (start !== true) {
        
        // dificultadCPU()
        seleccionarBloqueRandom(jugador.marca)
        
        const stop = document.querySelector('.stop');
        
        ganadorEs(jugador)
        
        if(stop) {
            return
        }

        bloques.forEach(ele => {
            ele.onclick = function() {
                // dificultadCPU()
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
                    // dificultadCPU()           
                    seleccionarBloqueRandom(ele.dataset.id)
                }, 1000)
                
                ganadorEs(jugador)

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

        ganadorEs(jugador)
    } else if (divArrays.length === 1) {
        let bloqueCPU = divArrays[0]
        bloqueCPU.classList.add('cpu')

        if(id == 'circulo') {
            bloqueCPU.dataset.id = 'cruz'
        } else {
            bloqueCPU.dataset.id = 'circulo'
        }

        ganadorEs(jugador)
    }
}