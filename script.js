
var numero_instrucciones = 1;
const ids_rebanadas = ['rebanada_superior_izquierdo_id', 'rebanada_superior_derecho_id', 'rebanada_inferior_izquierda_id', 'rebanada_inferior_derecha_id'];

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

const myModal = new bootstrap.Modal(document.getElementById('myModal'), {})



function añadirQuitarColor(id, clase)
{
    $('#' + id).addClass(clase);

    setTimeout(() =>
    {
        $('#' + id).removeClass(clase);

    }, 100);
}

function iluminarUnCojin(figura_id, posicion, clase)
{

    figuaras_seleccionadas.push(posicion);

    añadirQuitarColor(figura_id, clase);

}


async function iluminarCojinJugador(figura_id, posicion, clase)
{
    if (figuaras_seleccionadas[0] === posicion)
    {
        añadirQuitarColor(figura_id, clase);

        figuaras_seleccionadas.shift();

        if (figuaras_seleccionadas.length === 0)
        {

            puede_seleccionar = false;

            await pintar_body('green');
            await pintar_body('dark');

            if (numero_instrucciones === maximo_nivel)
            {
                setTimeout(() =>
                {
                    // felicitar_con_imagen();

                    $('body').removeClass('bg-dark');
                    $('body').addClass('bg-success');
                    $('#titulo_id').text('Felicidades');
                    $('#inicio_id').show();
                    myModal.show();
                }, 500);

                return;
            }

            setTimeout(() =>
            {
                numero_instrucciones++;

                instrucciones(numero_instrucciones);

            }, 700);

        }

    } else 
    {
        console.log('errores permitidos antes del codigo ' + errores_permitidos);
        errores_permitidos--;
        console.log('errores permitidos  ' + errores_permitidos);
        await pintar_body('red');
        await pintar_body('dark');
        if (errores_permitidos === 0)
        {
            pintar_body('red');
            figuaras_seleccionadas = [];
            numero_instrucciones = 1;
            $('#inicio_id').show();
            return;
        }

    }

}


function iniciarJuego()
{
    figuaras_seleccionadas = [];
    numero_instrucciones = 1;

    $('#inicio_id').hide();
    $('body').removeClass('bg-success');
    $('body').addClass('bg-dark');


    setTimeout(() =>
    {
        instrucciones(1);

        $('#titulo_id').hide();
    }, 1400);
}

const permitirSeleccionar = () =>
{

    return new Promise((res, rej) =>
    {
        setTimeout(() =>
        {
            puede_seleccionar = true;
            res();
        }, 800)
    })

}

const instrucciones = async function (clicks)
{
    let clicks_a_seguir = clicks;

    if (clicks_a_seguir === 0)
    {
        errores_permitidos = 3;
        await permitirSeleccionar();
        return;

    } else
    {


        setTimeout(() =>
        {
            let indice_ids_rebanadas = Math.floor(4 * Math.random());

            let rebanada = document.getElementById(ids_rebanadas[indice_ids_rebanadas]);

            rebanada.click();

            instrucciones(clicks_a_seguir - 1);

        }, 1200);

    }


}



const pintar_body = async function (color)
{


    switch (color)
    {
        case 'green':
            await colorear_verde();

            break;
        case 'red':
            $('body').removeClass('bg-dark')
            $('body').addClass('bg-danger');

            break;

        case 'dark':

            await oscurecer_body();

            break;
        default:
            break;
    }
}

const colorear_verde = function ()
{
    return new Promise((resolve) =>
    {
        setTimeout(() =>
        {
            $('body').removeClass('bg-dark');
            $('body').removeClass('bg-danger');
            $('body').addClass('bg-success');
            resolve('');
        }, 500);
    })
}

const oscurecer_body = function ()
{
    return new Promise((resolve) =>
    {
        setTimeout(() =>
        {
            $('body').removeClass('bg-success');
            $('body').removeClass('bg-danger');
            $('body').addClass('bg-dark');
            resolve('');
        }, 500);
    })
}




// const felicitar_con_imagen = function ()
// {

//     exito_img.style.display = 'block';
//     exito_img_2.style.display = 'block';

//     return;
// }


// const esconder_imagen = function ()
// {

//     exito_img.style.display = 'none';
//     exito_img_2.style.display = 'none';

// }




rebanada_superior_izquierdo_js.addEventListener('click',
    function (evento)
    {
        if (evento.isTrusted)
        {
            if (puede_seleccionar === true && figuaras_seleccionadas.length > 0)
            {
                iluminarCojinJugador(ids_rebanadas[0], 0, 'supererior_izquierda_click');
            }


        } else
        {

            iluminarUnCojin(ids_rebanadas[0], 0, 'supererior_izquierda_click');

        }
    }
)

rebanada_superior_derecho_js.addEventListener('click',
    function (evento)
    {
        if (evento.isTrusted)
        {

            if (puede_seleccionar === true && figuaras_seleccionadas.length > 0)
            {

                iluminarCojinJugador(ids_rebanadas[1], 1, 'supererior_derecha_click');
            }


        } else
        {

            iluminarUnCojin(ids_rebanadas[1], 1, 'supererior_derecha_click');

        }
    }
)

rebanada_inferior_izquierdo_js.addEventListener('click',
    function (evento)
    {
        if (evento.isTrusted)
        {
            if (puede_seleccionar === true && figuaras_seleccionadas.length > 0)
            {

                iluminarCojinJugador(ids_rebanadas[2], 2, 'inferior_izquierda_click');
            }

        } else
        {

            iluminarUnCojin(ids_rebanadas[2], 2, 'inferior_izquierda_click');

        }
    }
)

rebanada_inferior_derecho_js.addEventListener('click',
    function (evento)
    {
        if (evento.isTrusted)
        {
            if (puede_seleccionar === true && figuaras_seleccionadas.length > 0)
            {

                iluminarCojinJugador(ids_rebanadas[3], 3, 'inferior_derecha_click');
            }


        } else
        {

            iluminarUnCojin(ids_rebanadas[3], 3, 'inferior_derecha_click');

        }
    }
)






