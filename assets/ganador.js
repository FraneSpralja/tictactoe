let win = 0;

export function ganadorEs(jugador) {
    const bloques = document.querySelectorAll('.row > div')
    definirGanador(win)
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