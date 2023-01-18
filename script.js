var numero_instrucciones = 1;
const ids_rebanadas = ['uno', 'dos', 'tres', 'cuatro'];

const rebanada_superior_izquierdo_js = document.getElementById(ids_rebanadas[0])
const rebanada_superior_derecho_js = document.getElementById(ids_rebanadas[1])
const rebanada_inferior_izquierdo_js = document.getElementById(ids_rebanadas[2])
const rebanada_inferior_derecho_js = document.getElementById(ids_rebanadas[3])
const globos_1 = document.getElementById('finalizado_1_id');


var figuaras_seleccionadas = [];
let maximo_nivel = 5;
let errores_permitidos = 7;
let errores_cometidos = 0;
let puede_seleccionar = false;
let cantidad_pulsaciones = 1;


let imagenes_html = document.getElementById('imagenes_id');
let exito_img = document.getElementById('exito_id');
let exito_img_2 = document.getElementById('exito_2_id');
let main_container = document.querySelector('body');
let centro_de_juego = document.getElementById('centro-de-juego');
let senial_de_jugar = document.getElementById('senial_de_jugar');
let senial_de_observar = document.getElementById('senial_de_observar');
let input_numero_de_oportunidades = document.getElementById("numero_de_oportunidades");


let ninguna_oportunidad = document.getElementById("ninguna_oportunidad");
let una_oportunidad = document.getElementById("una_oportunidad");
let dos_oportunidades = document.getElementById("dos_oportuniades");
let tres_oportunidades = document.getElementById("tres_oportunidades");
let contenido_nav = document.getElementById("contenido_nav");
let contenedor_monedas = document.createElement("div");

contenedor_monedas.classList.add("w-25");
contenedor_monedas.id = "contendor_monedas";

contenido_nav.appendChild(contenedor_monedas);

let moneda_svg0 = new Image;
moneda_svg0.src = "./moneda.svg";
let moneda_svg1 = new Image;
moneda_svg1.src = "./moneda.svg";
let moneda_svg2 = new Image;
moneda_svg2.src = "./moneda.svg";
let moneda_svg3 = new Image;
moneda_svg3.src = "./moneda.svg";
let moneda_svg4 = new Image;
moneda_svg4.src = "./moneda.svg";
let moneda_svg5 = new Image;
moneda_svg5.src = "./moneda.svg";
let moneda_svg6 = new Image;
moneda_svg6.src = "./moneda.svg";




aniadirImagenes(contenedor_monedas.childNodes)




function aniadirImagenes(array_nodos_contenedor) {
    let numero_nodos = 7- array_nodos_contenedor.length;
    for (let index = 1; index <= numero_nodos; index++) {
        switch (index) {
            case 1:
                contenedor_monedas.appendChild(moneda_svg0);
                break;
            case 2:
                contenedor_monedas.appendChild(moneda_svg1);
                break;
            case 3:
                contenedor_monedas.appendChild(moneda_svg2);
                break;
            case 4:
                contenedor_monedas.appendChild(moneda_svg3);
                break;
            case 5:
                contenedor_monedas.appendChild(moneda_svg4);
                break;
            case 6:
                contenedor_monedas.appendChild(moneda_svg5);
                break;
            case 7:
                contenedor_monedas.appendChild(moneda_svg6);
                break;
        
            default:
                break;
        }        
    }

}



function anime_tiempo(clase) {

    return new Promise((res,rej)=>{
        anime({
            targets: clase,
            scale: [1, 0.8, 1],
            loop: 1,
            delay: 0,
            easing: 'easeInOutSine'
        });
        setTimeout(() => {
            res();
        }, 1200);

    })
    
}

async function animacionOprimir(cuadro) {
    switch (cuadro) {
        case "bg-uno":
            await anime_tiempo('.bg-uno');
            console.log("paso de largo promesa");
            break;
        case "bg-dos":
            await anime_tiempo('.bg-dos');
            break;
        case "bg-tres":
            await anime_tiempo('.bg-tres');
            break;
        case "bg-cuatro":
            await anime_tiempo('.bg-cuatro');
            break;

        default:
            break;
    }

    // $( "#dos" ).effect( "scale", {porcent: 50}, 500 );
}

function animacionInicial() {

    animacionOprimir("bg-uno");
    animacionOprimir("bg-dos");
    animacionOprimir("bg-cuatro");
    animacionOprimir("bg-tres");
}

document.addEventListener("DOMContentLoaded", (event) => { animacionInicial() });


async function animacion_click(idCuadro,acerto) {
    switch (idCuadro) {
        case 0:
            await animacionOprimir("bg-uno");
            if (acerto) {
                figuaras_seleccionadas.shift();
            }
            break;
        case 1:
            await animacionOprimir("bg-dos");
            if (acerto) {
                figuaras_seleccionadas.shift();
            }
            break;
        case 2:
            await animacionOprimir("bg-tres");
            if (acerto) {
                figuaras_seleccionadas.shift();
            }
            break;
        case 3:
            await animacionOprimir("bg-cuatro");
            if (acerto) {
                figuaras_seleccionadas.shift();
            }
            break;

        default:
            break;
    }
}

async function logicaJuego(idCuadro) {
    if (figuaras_seleccionadas[0] === idCuadro) {
        await animacion_click(idCuadro,true);
        if (figuaras_seleccionadas.length === 0 && cantidad_pulsaciones <= maximo_nivel) {
            cantidad_pulsaciones++;
            setTimeout(() => {
                instrucciones(cantidad_pulsaciones);
            }, 800);
        }
    } else {
        await animacion_click(idCuadro,false);
        errores_cometidos++;
        console.log("errores cometidos", errores_cometidos);
        contenedor_monedas.removeChild(contenedor_monedas.firstChild);
        if (errores_cometidos === errores_permitidos) {
            puede_seleccionar = false;
            $('#inicio_id').show();
        }

    }

}

rebanada_superior_izquierdo_js.addEventListener('click',
    function (evento) {
        console.log("puede_seleccionar",puede_seleccionar);
        console.log("figuaras_seleccionadas.length",figuaras_seleccionadas.length);
        if (evento.isTrusted) {
            if (puede_seleccionar === true && figuaras_seleccionadas.length > 0) {
                logicaJuego(0);
            }
        } else {
            animacionOprimir("bg-uno");
        }

    }
)

rebanada_superior_derecho_js.addEventListener('click',
    function (evento) {
        if (evento.isTrusted) {
            if (puede_seleccionar === true && figuaras_seleccionadas.length > 0) {
                logicaJuego(1);
            }
        } else {
            animacionOprimir("bg-dos");
        }

    }
)

rebanada_inferior_izquierdo_js.addEventListener('click',
    function (evento) {
        if (evento.isTrusted) {
            if (puede_seleccionar === true && figuaras_seleccionadas.length > 0) {
                logicaJuego(2);
            }
        } else {
            animacionOprimir("bg-tres");
        }

    }
)

rebanada_inferior_derecho_js.addEventListener('click',
    function (evento) {
        if (evento.isTrusted) {
            if (puede_seleccionar === true && figuaras_seleccionadas.length > 0) {
                logicaJuego(3);
            }
        } else {
            animacionOprimir("bg-cuatro");
        }

    }
)




const myModal = new bootstrap.Modal(document.getElementById('myModal'), {})




function indentificarBarrasVisibles() {
    let barras_visibles = [ninguna_oportunidad.classList];
    console.log(barras_visibles);
    return barras_visibles

}


// function mostrar_oportunidades(cantidad_oportunidades, inicia_juego) {

//     if (inicia_juego) {
//         tres_oportunidades.classList.remove('d-none');
//         dos_oportunidades.classList.remove('d-none');
//         una_oportunidad.classList.remove('d-none');
//         ninguna_oportunidad.classList.remove('d-none');

//         dos_oportunidades.classList.add('d-none');
//         una_oportunidad.classList.add('d-none');
//         ninguna_oportunidad.classList.add('d-none');
//     }

//     switch (cantidad_oportunidades) {
//         case 3:
//             break;
//         case 2:
//             tres_oportunidades.classList.add('d-none');
//             dos_oportunidades.classList.remove('d-none');
//             break;
//         case 1:
//             dos_oportunidades.classList.add('d-none');
//             una_oportunidad.classList.remove('d-none');
//             break;
//         case 0:
//             una_oportunidad.classList.add('d-none');
//             ninguna_oportunidad.classList.remove('d-none');
//             break;
//         default:
//             break;
//     }
// }


function iniciarJuego() {
    aniadirImagenes(contenedor_monedas.childNodes)
    // mostrar_oportunidades(3, true);
    errores_cometidos=0;
    figuaras_seleccionadas = [];
    numero_instrucciones = 1;
    $('#inicio_id').hide();
    setTimeout(() => {
        instrucciones(1);
    }, 500);
}


function clickCuadro(params) {

    return new Promise((res, rej) => {


    })

}

const instrucciones = async function (clicks) {
    if (clicks === 0) {
        puede_seleccionar = true;
        return;
    } else {
        setTimeout(() => {
            let indice_ids_rebanadas = Math.floor(4 * Math.random());
            figuaras_seleccionadas.push(indice_ids_rebanadas);
            let rebanada = document.getElementById(ids_rebanadas[indice_ids_rebanadas]);
            rebanada.click();
            instrucciones(clicks - 1);
        }, 800);

    }
}


