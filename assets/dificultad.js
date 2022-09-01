export function dificultadCPU() {
    const bloquesGato = document.querySelectorAll('.row > div');
    
    console.log(bloquesGato)

    for(let i = 0; i < bloquesGato.length; i++) {
        if(bloquesGato[i].classList.contains('jugador') && bloquesGato[i + 1].classList.contains('jugador')) {
            bloquesGato[i + 2].style.backgroundColor = 'red' 
        } else if(bloquesGato[i].classList.contains('jugador') && bloquesGato[i + 3].classList.contains('jugador')) {
            bloquesGato[i + 6].style.backgroundColor = 'green' 
        }
    }
}