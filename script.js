
var numero_instrucciones = 1;
const ids_rebanadas = ['uno', 'dos', 'tres', 'cuatro'];

const rebanada_superior_izquierdo_js = document.getElementById(ids_rebanadas[0])
const rebanada_superior_derecho_js = document.getElementById(ids_rebanadas[1])
const rebanada_inferior_izquierdo_js = document.getElementById(ids_rebanadas[2])
const rebanada_inferior_derecho_js = document.getElementById(ids_rebanadas[3])
const globos_1 = document.getElementById('finalizado_1_id');


var figuaras_seleccionadas = [];
let maximo_nivel = 5;
let errores_permitidos;
let puede_seleccionar = false;


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





rebanada_superior_izquierdo_js.addEventListener('click',
    function (evento) {
        if (evento.isTrusted) {
            if (puede_seleccionar === true && figuaras_seleccionadas.length > 0) {
                iluminarCojinJugador(ids_rebanadas[0], 0, 'supererior_izquierda_click');
            }
        } else {
            iluminarUnCojin(ids_rebanadas[0], 0, 'supererior_izquierda_click');
        }

    }
)

rebanada_superior_derecho_js.addEventListener('click',
    function (evento) {
        if (evento.isTrusted) {

            if (puede_seleccionar === true && figuaras_seleccionadas.length > 0) {
                iluminarCojinJugador(ids_rebanadas[1], 1, 'supererior_derecha_click');
            }
        } else {
            iluminarUnCojin(ids_rebanadas[1], 1, 'supererior_derecha_click');
        }

    }
)

rebanada_inferior_izquierdo_js.addEventListener('click',
    function (evento) {
        if (evento.isTrusted) {
            if (puede_seleccionar === true && figuaras_seleccionadas.length > 0) {
                iluminarCojinJugador(ids_rebanadas[2], 2, 'inferior_izquierda_click');
            }
        } else {
            iluminarUnCojin(ids_rebanadas[2], 2, 'inferior_izquierda_click');
        }

    }
)

rebanada_inferior_derecho_js.addEventListener('click',
    function (evento) {
        if (evento.isTrusted) {

            if (puede_seleccionar === true && figuaras_seleccionadas.length > 0) {
                iluminarCojinJugador(ids_rebanadas[3], 3, 'inferior_derecha_click');
            }
        } else {
            iluminarUnCojin(ids_rebanadas[3], 3, 'inferior_derecha_click');
        }

    }
)




const myModal = new bootstrap.Modal(document.getElementById('myModal'), {})




function indentificarBarrasVisibles() {
    let barras_visibles = [ninguna_oportunidad.classList];
    console.log(barras_visibles);
    return barras_visibles

}


function mostrar_oportunidades(cantidad_oportunidades, inicia_juego) {



    if (inicia_juego) {
        tres_oportunidades.classList.remove('d-none');
        dos_oportunidades.classList.remove('d-none');
        una_oportunidad.classList.remove('d-none');
        ninguna_oportunidad.classList.remove('d-none');

        dos_oportunidades.classList.add('d-none');
        una_oportunidad.classList.add('d-none');
        ninguna_oportunidad.classList.add('d-none');
    }

    switch (cantidad_oportunidades) {
        case 3:

            break;
        case 2:
            tres_oportunidades.classList.add('d-none');
            dos_oportunidades.classList.remove('d-none');
            break;
        case 1:
            dos_oportunidades.classList.add('d-none');
            una_oportunidad.classList.remove('d-none');
            break;
        case 0:
            una_oportunidad.classList.add('d-none');
            ninguna_oportunidad.classList.remove('d-none');
            break;
        default:
            break;
    }
}









function añadirQuitarColor(id, clase) {
    $('#' + id).addClass(clase);
    console.log("id", id);
    console.log("clase", clase);
    setTimeout(() => {
        $('#' + id).removeClass(clase);
    }, 600);
}

function iluminarUnCojin(figura_id, posicion, clase) {

    figuaras_seleccionadas.push(posicion);
    añadirQuitarColor(figura_id, clase);

}


async function iluminarCojinJugador(figura_id, posicion, clase) {


    if (figuaras_seleccionadas[0] === posicion) {
        añadirQuitarColor(figura_id, clase);
        figuaras_seleccionadas.shift();
        if (figuaras_seleccionadas.length === 0) {
            puede_seleccionar = false;

            if (numero_instrucciones === maximo_nivel) {
                setTimeout(() => {

                    $('#inicio_id').show();
                    myModal.show();
                }, 500);

                return;
            }
            setTimeout(() => {
                numero_instrucciones++;
                instrucciones(numero_instrucciones);
            }, 1200);

        }

    } else {
        errores_permitidos--;
        mostrar_oportunidades(errores_permitidos, false);

        if (errores_permitidos === 0) {

            figuaras_seleccionadas = [];
            numero_instrucciones = 1;
            $('#inicio_id').show();
            return;
        }

    }

}


function iniciarJuego() {


    mostrar_oportunidades(3, true);


    figuaras_seleccionadas = [];
    numero_instrucciones = 1;
    $('#inicio_id').hide();
    setTimeout(() => {
        instrucciones(1);

    }, 1400);
}

const permitirSeleccionar = () => {

    return new Promise((res, rej) => {
        setTimeout(() => {
            senial_de_observar.classList.remove('d-block');
            senial_de_observar.classList.add('d-none');
            senial_de_jugar.classList.remove('d-none');
            senial_de_jugar.classList.add('d-block');
            puede_seleccionar = true;
            res();
        }, 2000)
    })

}

const instrucciones = async function (clicks) {

    mostrar_oportunidades(3,true);

    senial_de_jugar.classList.remove('d-block');
    senial_de_jugar.classList.add('d-none');
    senial_de_observar.classList.remove('d-none');
    senial_de_observar.classList.add('d-block');



    let clicks_a_seguir = clicks;

    if (clicks_a_seguir === 0) {
        errores_permitidos = 3;
        await permitirSeleccionar();

        return;

    } else {



        setTimeout(() => {
            let indice_ids_rebanadas = Math.floor(4 * Math.random());
            let rebanada = document.getElementById(ids_rebanadas[indice_ids_rebanadas]);
            rebanada.click();
            instrucciones(clicks_a_seguir - 1);

        }, 1800);

    }


}



