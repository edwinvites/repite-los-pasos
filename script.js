
var numero_instrucciones = 1;
const ids_rebanadas = ['rebanada_superior_izquierdo_id', 'rebanada_superior_derecho_id', 'rebanada_inferior_izquierda_id', 'rebanada_inferior_derecha_id'];

const rebanada_superior_izquierdo_js = document.getElementById(ids_rebanadas[0])
const rebanada_superior_derecho_js = document.getElementById(ids_rebanadas[1])
const rebanada_inferior_izquierdo_js = document.getElementById(ids_rebanadas[2])
const rebanada_inferior_derecho_js = document.getElementById(ids_rebanadas[3])
const globos_1 = document.getElementById('finalizado_1_id');

let clicks_a_seguir = 0;


var figuaras_seleccionadas = [];
let maximo_nivel = 5;
let errores_permitidos = 2;


var x =
{
    valor: 10,
    funcionListener: function (val)
    {
        alert('cambio la variable');
    },
    set a(val)
    {
        this.aListener = val;
        this.funcionListener(val);
    },
    get a()
    {
        return this.valor;
    },

    registerListener: function (listener)
    {
        this.funcionListener = listener;
    }
}


function añadirQuitarColor(id, clase)
{
    $('#' + id).addClass(clase);

    setTimeout(() =>
    {
        $('#' + id).removeClass(clase);

    }, 100);
}

function pintarRebanadasSimon(figura_id, posicion, callback, clase)
{
    
    figuaras_seleccionadas.push(posicion);
    
    callback(figura_id, clase);
    
}


async function pintarRebanadasJugador(figura_id, posicion, callback, clase)
{
    if (figuaras_seleccionadas[0] === posicion)
    {
        callback(figura_id, clase);

        figuaras_seleccionadas.shift();

        if (figuaras_seleccionadas.length === 0)
        {



            if (numero_instrucciones === maximo_nivel)
            {
                setTimeout(() => {
                    felicitar_con_imagen();

                    $('body').removeClass('bg-dark');
                    $('body').addClass('bg-success');
                    $('#titulo_id').text('Felicidades');
                    $('#inicio_id').removeClass('btn-success');
                    $('#inicio_id').addClass('btn-light');
                    $('#inicio_id').show();                    
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
        callback(figura_id, clase);
        errores_permitidos--;
        console.log(errores_permitidos);
        enrojecer_body();
        await oscurecer_body();
        if (errores_permitidos === 0)
        {
            enrojecer_body();
            figuaras_seleccionadas = [];
            numero_instrucciones = 1;
            $('#inicio_id').removeClass('btn-success');
            $('#inicio_id').addClass('btn-light');
            $('#inicio_id').show(); 
            return;
        }

    }

}

rebanada_superior_izquierdo_js.addEventListener('click',
    function (evento)
    {
        if (evento.isTrusted)
        {
            if (clicks_a_seguir === 0 && figuaras_seleccionadas.length > 0)
            {
                pintarRebanadasJugador(ids_rebanadas[0], 0, añadirQuitarColor, 'supererior_izquierda_click');
            }


        } else
        {

            pintarRebanadasSimon(ids_rebanadas[0], 0, añadirQuitarColor, 'supererior_izquierda_click');

        }
    }
)

rebanada_superior_derecho_js.addEventListener('click',
    function (evento)
    {
        if (evento.isTrusted)
        {

            if (clicks_a_seguir === 0 && figuaras_seleccionadas.length > 0)
            {

                pintarRebanadasJugador(ids_rebanadas[1], 1, añadirQuitarColor, 'supererior_derecha_click');
            }


        } else
        {

            pintarRebanadasSimon(ids_rebanadas[1], 1, añadirQuitarColor, 'supererior_derecha_click');

        }
    }
)

rebanada_inferior_izquierdo_js.addEventListener('click',
    function (evento)
    {
        if (evento.isTrusted)
        {
            if (clicks_a_seguir === 0 && figuaras_seleccionadas.length > 0)
            {

                pintarRebanadasJugador(ids_rebanadas[2], 2, añadirQuitarColor, 'inferior_izquierda_click');
            }

        } else
        {

            pintarRebanadasSimon(ids_rebanadas[2], 2, añadirQuitarColor, 'inferior_izquierda_click');

        }
    }
)

rebanada_inferior_derecho_js.addEventListener('click',
    function (evento)
    {
        if (evento.isTrusted)
        {
            if (clicks_a_seguir === 0 && figuaras_seleccionadas.length > 0)
            {

                pintarRebanadasJugador(ids_rebanadas[3], 3, añadirQuitarColor, 'inferior_derecha_click');
            }


        } else
        {

            pintarRebanadasSimon(ids_rebanadas[3], 3, añadirQuitarColor, 'inferior_derecha_click');

        }
    }
)



const instrucciones = async function (clicks)
{
    clicks_a_seguir = clicks;

    if (clicks_a_seguir === 0)
    {

        return;

    } else
    {


        setTimeout(() =>
        {
            let indice_ids_rebanadas = Math.floor(4 * Math.random());

            let rebanada = document.getElementById(ids_rebanadas[indice_ids_rebanadas]);

            rebanada.click();

            instrucciones(clicks_a_seguir - 1);

        }, 800);

    }


}

function iniciarJuego()
{
    errores_permitidos = 2;
    figuaras_seleccionadas = [];
    numero_instrucciones = 1;
    esconder_imagen();

    $('body').removeClass('bg-success');
    $('body').addClass('bg-dark');


    setTimeout(() =>
    {
        instrucciones(1);
    
        $("#inicio_id").css('zIndex',10);
        $('#inicio_id').hide();
        $('#titulo_id').hide();
    }, 1400);
}



let flamas_container = document.getElementById('flamas_id');
let main_container = document.querySelector('body');

const enrojecer_body = function () {
    $('body').removeClass('bg-dark');
    $('#titulo_id').removeClass('text-dark');
    $('#titulo_id').addClass('text-red');
    $('body').addClass('bg-danger');
}

const oscurecer_body = function () {
    return new Promise ((resolve)=>{
        setTimeout(() => {
            $('body').removeClass('bg-danger');
            $('body').addClass('bg-dark');
            resolve('');
        }, 500);
    })
}

let luz_verde = document.getElementById('verde_smforo');
let luz_amarilla = document.getElementById('amarillo_smforo');
let luz_roja = document.getElementById('rojo_smforo');

let imagenes_html = document.getElementById('imagenes_id');
let exito_img = document.getElementById('exito_id');
let exito_img_2 = document.getElementById('exito_2_id');

const felicitar_con_imagen = function () {
    
    exito_img.style.display = 'block';
    exito_img_2.style.display = 'block';

    return;
}


const esconder_imagen = function () {
    
    exito_img.style.display = 'none';            
    exito_img_2.style.display = 'none';            

}








