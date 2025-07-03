let longitud_secuencia = 1;

const cuadro_sup_izq = document.getElementsByClassName("cuadro-sup-izq")[0];
const cuadro_sup_der = document.getElementsByClassName("cuadro-sup-der")[0];
const cuadro_inf_izq = document.getElementsByClassName("cuadro-inf-izq")[0];
const cuadro_inf_der = document.getElementsByClassName("cuadro-inf-der")[0];

console.log(cuadro_sup_izq);

let secuencia_de_botones = [];
let respaldo_ids_aleatorios = [];
let puede_clickear_cuadros = false;
let numero_del_cuadro = {
  0: "cuadro-sup-izq",
  1: "cuadro-sup-der",
  2: "cuadro-inf-izq",
  3: "cuadro-inf-der",
};

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

cuadro_sup_izq.addEventListener("click", function (evento) {
  if (puede_clickear_cuadros === true) {
    if (evento.isTrusted) {
      evaluar_clicks(0);
    }
  }
});

cuadro_sup_der.addEventListener("click", function (evento) {
  if (puede_clickear_cuadros === true) {
    if (evento.isTrusted) {
      evaluar_clicks(1);
    }
  }
});

cuadro_inf_izq.addEventListener("click", function (evento) {
  if (puede_clickear_cuadros === true) {
    if (evento.isTrusted) {
      evaluar_clicks(2);
    }
  }
});

cuadro_inf_der.addEventListener("click", function (evento) {
  if (puede_clickear_cuadros === true) {
    if (evento.isTrusted) {
      evaluar_clicks(3);
    }
  }
});

function correr_animaciones(clase, nombre_d_la_animacion) {
  switch (nombre_d_la_animacion) {
    case "clickBotonJugar":
      anime({
        targets: clase,
        scale: [
          { value: 2, duration: 100, easing: "easeOutExpo" },
          { value: 1, duration: 500 },
        ],
        opacity: [
          { value: 1, duration: 200, easing: "easeOutExpo" },
          { value: 0.2, duration: 300 },
        ],
        easing: "easeInOutSine",
      });
      break;
    case "botonJugarAlIniciar":
      anime({
        targets: clase,
        scale: [
          { value: 2, duration: 100, easing: "easeOutExpo" },
          { value: 1, duration: 500 },
        ],
        opacity: [
          { value: 0.2, duration: 100, easing: "easeOutExpo" },
          { value: 1, duration: 500 },
        ],
        easing: "easeInOutSine",
      });
      break;

    case "click_cuadro":
      anime({
        targets: clase,
        scale: [
          { value: 2, duration: 100, easing: "easeOutExpo" },
          { value: 1, duration: 500 },
        ],
        easing: "easeInOutSine",
      });
      break;
    case "acerto":
      anime({
        targets: clase,
        scale: [
          { value: 2, duration: 100, easing: "easeOutExpo" },
          { value: 1, duration: 500 },
        ],
        easing: "easeInOutSine",
      });
      break;
    case "fallo":
      anime({
        targets: clase,
        scale: [
          { value: 2, duration: 100, easing: "easeOutExpo" },
          { value: 1, duration: 500 },
        ],
        easing: "easeInOutSine",
      });
      break;
    case "oscurecerBotones":
      anime({
        targets: [".bg-uno", ".bg-dos", ".bg-tres", ".bg-cuatro"],
        opacity: [
          { value: 1, duration: 200, easing: "easeOutExpo" },
          { value: 0.2, duration: 900 },
        ],
        easing: "easeInOutSine",
      });

      break;
    case "escalarBotones":
      anime({
        targets: [".bg-uno", ".bg-dos", ".bg-tres", ".bg-cuatro"],
        scale: [
          { value: 2, duration: 100, easing: "easeOutExpo" },
          { value: 1, duration: 500 },
        ],
        easing: "easeInOutSine",
      });

      break;
    case "iluminar":
      anime({
        targets: [".bg-uno", ".bg-dos", ".bg-tres", ".bg-cuatro"],
        opacity: [
          { value: 1, duration: 200, easing: "easeOutExpo" },
          { value: 0.2, duration: 900 },
        ],
        easing: "easeInOutSine",
      });
      break;
    default:
      break;
  }
}

async function evaluar_clicks(numero) {
  if (numero === secuencia_de_botones[0]) {
    correr_animaciones(`.${numero_del_cuadro[numero]}`, "acerto");
    secuencia_de_botones.shift();
  }
  if (secuencia_de_botones.length == 0) {
    puede_clickear_cuadros = false;
    await siguienteCombinacion();
    return;
  }
}


async function repetir() {
  secuencia_de_botones = respaldo_ids_aleatorios.map((_) => _);
  for (let index = 0; index < secuencia_de_botones.length; index++) {
    await mostrar_secuencia(secuencia_de_botones[index], "botones");
  }
}

// const myModal = new bootstrap.Modal(document.getElementById("myModal"), {});

async function siguienteCombinacion() {
  longitud_secuencia++;
  await pausa(2000);
  armar_secuencia(longitud_secuencia);
  for (let index = 0; index < secuencia_de_botones.length; index++) {
    await mostrar_secuencia(secuencia_de_botones[index], "click_cuadro");
  }

  puede_clickear_cuadros = true;
}

async function iniciarJuego() {
  secuencia_de_botones = [];
  $("#btn-inicio").attr("disabled", true);
  $("#repetir").removeClass("disabled");
  armar_secuencia(longitud_secuencia);
  //   await pausaInicio();

  for (let index = 0; index < secuencia_de_botones.length; index++) {
    await mostrar_secuencia(secuencia_de_botones[index], "click_cuadro");
  }

  puede_clickear_cuadros = true;
}

function pausa(milisegundos) {
  //   correr_animaciones(0, "oscurecerBotones");
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, milisegundos);
  });
}

function armar_secuencia(cantidad) {
  for (let index = 0; index < cantidad; index++) {
    secuencia_de_botones.push(Math.floor(4 * Math.random()));
  }
  respaldo_ids_aleatorios = [...secuencia_de_botones];
}

const mostrar_secuencia = function (index, nombre_d_la_animacion) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      correr_animaciones(`.${numero_del_cuadro[index]}`, nombre_d_la_animacion);
      resolve();
    }, 800);
  });
};
