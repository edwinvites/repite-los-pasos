let numero_instrucciones = 1;
const ids_botones = ['uno', 'dos', 'tres', 'cuatro'];

const boton_uno = document.getElementById(ids_botones[0])
const boton_dos = document.getElementById(ids_botones[1])
const boton_tres = document.getElementById(ids_botones[2])
const boton_cuatro = document.getElementById(ids_botones[3])


let ids_aleatorios = [];
let respaldo_ids_aleatorios = [];
let puede_seleccionar = false;

// let divCantidadDRepeticiones = document.getElementById("div_cantidad_D_Combinaciones");

let botonRepetir = document.getElementById("repetir");


// let svg_moneda = document.createElement("img");
// svg_moneda.src = './moneda.svg';

// let div_monedas = document.getElementById("div_monedas");


// div_monedas.appendChild(svg_moneda);
// div_monedas.appendChild(svg_moneda.cloneNode());
// div_monedas.appendChild(svg_moneda.cloneNode());
// div_monedas.appendChild(svg_moneda.cloneNode());
// div_monedas.appendChild(svg_moneda.cloneNode());






boton_uno.addEventListener('click',
    function (evento) {

        if (puede_seleccionar === true) {


            if (evento.isTrusted) {
                logicaJuego(0);

            }



        }


    }
)

boton_dos.addEventListener('click',
    function (evento) {
        if (puede_seleccionar === true) {

            
            if (evento.isTrusted) {
                logicaJuego(1);

            }



        }


    }
)

boton_tres.addEventListener('click',
    function (evento) {
        if (puede_seleccionar === true) {


            if (evento.isTrusted) {
                logicaJuego(2);

            }



        }


    }
)

boton_cuatro.addEventListener('click',
    function (evento) {
        if (puede_seleccionar === true) {


            if (evento.isTrusted) {
                logicaJuego(3);

            }



        }


    }
)




function animacion_botones(clase,elemento) {
    switch (elemento) {
        case "clickBotonJugar":
            anime({
                targets: clase,
                scale: [
                    { value: 2, duration: 100,  easing: 'easeOutExpo' },
                    { value: 1, duration: 500 }],
                opacity: [
                    { value: 1, duration: 200,  easing: 'easeOutExpo' },
                    { value: 0.2, duration: 300 }],
                easing: 'easeInOutSine'
            });
            break;
        case "botonJugarAlIniciar":
            anime({
                targets: clase,
                scale: [
                    { value: 2, duration: 100,  easing: 'easeOutExpo' },
                    { value: 1, duration: 500 }],
                opacity: [
                    { value: 0.2, duration: 100,  easing: 'easeOutExpo' },
                    { value: 1, duration: 500 }],
                easing: 'easeInOutSine'
            });
            break;
    
            case "botones":
                anime({
                    targets: clase,
                    scale: [
                        { value: 2, duration: 100,  easing: 'easeOutExpo' },
                        { value: 1, duration: 500 }],
                    opacity: [
                        { value: 1, duration: 100,  easing: 'easeOutExpo' },
                        { value: 0.2, duration: 500 }],
                    easing: 'easeInOutSine'
                });
            break;
            case "acerto":
                anime({
                    targets: clase,
                    scale: [
                        { value: 2, duration: 100,  easing: 'easeOutExpo' },
                        { value: 1, duration: 500 }],
                    opacity: [
                        { value: 1, duration: 100,  easing: 'easeOutExpo' },
                        { value: 0.2, duration: 500 }],
                    easing: 'easeInOutSine'
                });
            break;
            case "fallo":
                anime({
                    targets: clase,
                    scale: [
                        { value: 2, duration: 100,  easing: 'easeOutExpo' },
                        { value: 1, duration: 500 }],
                    easing: 'easeInOutSine'
                });
            break;
            case "oscurecerBotones":
                anime({
                    targets: [".bg-uno",".bg-dos",".bg-tres",".bg-cuatro"],
                    opacity: [
                        { value: 1, duration: 200,  easing: 'easeOutExpo' },
                        { value: 0.2, duration: 900 }],
                    easing: 'easeInOutSine'
                });

            break;
            case "escalarBotones":
                anime({
                    targets: [".bg-uno",".bg-dos",".bg-tres",".bg-cuatro"],
                    scale: [
                        { value: 2, duration: 100,  easing: 'easeOutExpo' },
                        { value: 1, duration: 500 }],
                    easing: 'easeInOutSine'
                });

            break;
            case "iluminar":
                anime({
                    targets: [".bg-uno",".bg-dos",".bg-tres",".bg-cuatro"],
                    opacity: [
                        { value: 1, duration: 200,  easing: 'easeOutExpo' },
                        { value: 0.2, duration: 900 }],
                    easing: 'easeInOutSine'
                });
            break;
        default:
            break;
    }



}


function animacionInicial() {

    animacion_botones('.btn-info', "botonJugarAlIniciar");

}

document.addEventListener("DOMContentLoaded", (event) => { animacionInicial() });



async function logicaJuego(idBoton) {

    if (ids_aleatorios[0] === idBoton) {

        animacion_botones(".bg-"+ids_botones[idBoton],"acerto");
        ids_aleatorios.shift();
        // await click_maquina(idBoton,"acerto");
        
        // await animacion_click(idBoton,true);
        // if (ids_aleatorios.length === 0 && cantidad_pulsaciones <= maximo_nivel) {
        //     cantidad_pulsaciones++;
        //     setTimeout(() => {
        //         click_maquina(cantidad_pulsaciones);
        //     }, 800);
        // }


        if (ids_aleatorios.length == 0) {
            puede_seleccionar = false;

            await pausaSiguienteCombinacion();
            siguienteCombinacion();
            return;
            
        }


    } else {

        animacion_botones(".bg-"+ids_botones[idBoton],"fallo");
        div_monedas.lastChild.remove();


    }

}

function pausaSiguienteCombinacion() {
    return new Promise((resolve, reject) => {
        setTimeout(()=>{
            animacion_botones(null,"escalarBotones");
            resolve();
        },500)
    })
}

async function repetir() {
    ids_aleatorios = respaldo_ids_aleatorios.map(_=>_);
    for (let index = 0; index < ids_aleatorios.length; index++) {

        await click_maquina(ids_aleatorios[index],"botones")

    }
}





const myModal = new bootstrap.Modal(document.getElementById('myModal'), {})

async function siguienteCombinacion() {
    numero_instrucciones++;
    // divCantidadDRepeticiones.innerText = numero_instrucciones;
    ids_random(numero_instrucciones);
    for (let index = 0; index < ids_aleatorios.length; index++) {

        await click_maquina(ids_aleatorios[index],"botones")

    }

    puede_seleccionar = true;
}


async function iniciarJuego() {

    ids_aleatorios = [];
    $('#inicio').attr('disabled', true);
    $('#repetir').removeClass('disabled');
    animacion_botones('.btn-info', "clickBotonJugar");
    ids_random(numero_instrucciones);
    // divCantidadDRepeticiones.innerText = numero_instrucciones;
    await pausaInicio();

    for (let index = 0; index < ids_aleatorios.length; index++) {

        await click_maquina(ids_aleatorios[index],"botones")

    }


    puede_seleccionar = true;

}


function pausaInicio() {
    animacion_botones(0,"oscurecerBotones");
    return new Promise((resolve, reject) => {
        setTimeout(()=>{
            
            resolve();
        },1000)
    })
}

function ids_random(cantidad) {
    while (cantidad > 0) {
        let indice = Math.floor(4 * Math.random());
        ids_aleatorios.push(indice);
        cantidad--;
    }

    respaldo_ids_aleatorios = ids_aleatorios.map(_=>_);


}



const click_maquina = function (index,elemento) {
    
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            animacion_botones(".bg-"+ids_botones[index],elemento);
            resolve();
        }, 800);
    })

}

