// const { easing } = require("./anime.min");

const sup_izq = document.getElementById("sup_izq");
const sup_der = document.getElementById("sup_der");
const inf_izq = document.getElementById("inf_izq");
const inf_der = document.getElementById("inf_der");
const barra_intentos = document.getElementsByClassName("progress-bar")[0];
const cantidad_d_toques = document.getElementById("cantidad_de_toques");
const caja_mensajes = document.getElementById("caja_mensajes");
const caja_botones = document.getElementById("caja_botones");


let longitud_secuencia = undefined;
let porcentaje_de_oportunidades = 0;
let secuencia = [];
let usuario_secuencia = [];
let respaldo_ids_aleatorios = [];
let activados_los_botones = false;
let dando_secuencia = false;
let botones = {
  0: sup_der,
  1: sup_izq,
  2: inf_der,
  3: inf_izq,
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


let a_sound = document.createElement("audio");
let b_sound = document.createElement("audio");
let c_sound = document.createElement("audio");
let d_sound = document.createElement("audio");
let e_sound = document.createElement("audio");
let f_sound = document.createElement("audio");
a_sound.src = "./assets/fail-234710.mp3"
b_sound.src = "./assets/spin-complete-295086.mp3"
c_sound.src = "./assets/electronic-instrument.mp3"
d_sound.src = "./assets/electronic-instrument-sharp-close-short.mp3"
e_sound.src = "./assets/electronic-instrument-high-digital-close.mp3"
f_sound.src = "./assets/electronic-instrument-single-high.mp3"


const cssHexColors = [
  "#F0F8FF",
  "#F0FFFF",
  "#00FFFF",
  "#00FFFF",
  "#7FFFD4",
  "#6495ED",
  "#0000FF",
  "#00008B",
  "#8A2BE2",
  "#8B008B",
  "#DC143C",
  "#FF1493",
  "#FF7F50",
  "#D2691E",
  "#A52A2A",
  "#8B0000",
  "#FF8C00",
  "#FFD700",
  "#B8860B",
  "#F0E68C",
  "#F5F5DC",
  "#FAEBD7",
  "#FFE4C4",
  "#FFEBCD",
  "#FFF8DC",
  "#DEB887",
  "#5F9EA0",
  "#008B8B",
  "#006400",
  "#556B2F"
];


const redShades = [
  "#FFEBEB",
  "#FFC9C9",
  "#FFA8A8",
  "#FF8787",
  "#FF6B6B",
  "#FA5252",
  "#F03E3E",
  "#E03131",
  "#C92A2A",
  "#A51111",
  "#FFCCCC",
  "#FF9999",
  "#FF6666",
  "#FF3333",
  "#FF0000",
  "#CC0000",
  "#990000",
  "#660000",
  "#400000",
  "#1A0000"
];





function show_luces(num_cilcos = 1, exito) {
  let cantidad_ciclos = 15;
  if (num_cilcos === 1) {
    sup_izq.classList.remove("bg-uno");
    sup_der.classList.remove("bg-dos");
    inf_izq.classList.remove("bg-tres");
    inf_der.classList.remove("bg-cuatro");
  }
  num_cilcos = num_cilcos || 1;
  if (num_cilcos === cantidad_ciclos) {
    sup_izq.classList.add("bg-uno");
    sup_der.classList.add("bg-dos");
    inf_izq.classList.add("bg-tres");
    inf_der.classList.add("bg-cuatro");
  }

  if (num_cilcos < cantidad_ciclos)
    anime({
      targets: '.colores',
      backgroundColor: function () {
        return exito ? cssHexColors[anime.random(0, 29)] : redShades[anime.random(0, 19)]
      },
      easing: 'easeInOutQuad',
      duration: 100,
      complete: () => { show_luces(num_cilcos + 1, exito) },
    });


}

sup_izq.addEventListener("click", async function (evento) {

  if (evento.isTrusted && !dando_secuencia) {
    await c_sound.play();
    correr_animaciones(evento.target, "click_cuadro")
    if (secuencia.length) {
      usuario_secuencia.push(evento.target);
      evaluar_usuario(0);
    }
  }
  if (!evento.isTrusted && dando_secuencia) {
    await c_sound.play();
    await correr_animaciones(evento.target, "click_cuadro")
  }
});

sup_der.addEventListener("click", async function (evento) {
  if (evento.isTrusted && !dando_secuencia) {
    await d_sound.play();
    correr_animaciones(evento.target, "click_cuadro")
    if (secuencia.length) {
      usuario_secuencia.push(evento.target);
      evaluar_usuario(0);
    }
  }
  if (!evento.isTrusted && dando_secuencia) {
    await d_sound.play();
    await correr_animaciones(evento.target, "click_cuadro")
  }
});

inf_izq.addEventListener("click", async function (evento) {
  if (evento.isTrusted && !dando_secuencia) {
    await e_sound.play();
    correr_animaciones(evento.target, "click_cuadro")
    if (secuencia.length) {
      usuario_secuencia.push(evento.target);
      evaluar_usuario(0);
    }
  }
  if (!evento.isTrusted && dando_secuencia) {
    await e_sound.play();
    await correr_animaciones(evento.target, "click_cuadro")
  }
});

inf_der.addEventListener("click", async function (evento) {
  if (evento.isTrusted && !dando_secuencia) {
    await f_sound.play();
    correr_animaciones(evento.target, "click_cuadro")
    if (secuencia.length) {
      usuario_secuencia.push(evento.target);
      evaluar_usuario(0);
    }
  }
  if (!evento.isTrusted && dando_secuencia) {
    await f_sound.play();
    await correr_animaciones(evento.target, "click_cuadro")
  }
});

async function correr_animaciones(clase, nombre_d_la_animacion) {
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
          { value: 1, duration: 100, easing: "easeOutExpo" },
          { value: 4, duration: 500 },
        ],
        opacity: [
          { value: 0.1, duration: 800, easing: "easeOutExpo" },
          { value: 1, duration: 500 },
        ],
        easing: "easeInOutSine",
      });
      break;

    case "click_cuadro":
      await anime({
        targets: clase,
        filter: [{ value: 'blur(6px)', duration: 100, easing: "easeOutExpo" },
        { value: 'blur(0)', duration: 100 }
        ],
        easing: "easeInOutSine",
      });
      break;
    case "click_adecuado":
      anime({
        targets: clase,
        filter: [{ value: 'brightness(0.4)', duration: 100 },
        { value: 'brightness(1.0)', duration: 500 }
        ],
        easing: 'easeInOutSine'
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

async function evaluar_usuario() {
  // se evalua hasta donde ha clickeado el usuario
  let usuario_replica_secuencia = usuario_secuencia.every((element, index) => element === secuencia[index]);

  if (usuario_replica_secuencia) {

    if (usuario_secuencia.length === secuencia.length) {
      dando_secuencia = true;
      caja_botones.style.cursor = "";
      usuario_secuencia = [];
      await pausa(1000);
      // await b_sound.play();
      // show_luces(1,true);
      // await pausa(1500);
      await siguienteCombinacion();
    }


  } else {
    dando_secuencia = true;
    caja_botones.style.cursor = "";
    await pausa(1000);
    a_sound.play();
    usuario_secuencia = [];
    porcentaje_de_oportunidades -= 20;
    console.log({ porcentaje_de_oportunidades });
    if (porcentaje_de_oportunidades) {
      caja_mensajes.innerText = "De Nuevo";
      await pausa(2000);
      caja_mensajes.innerText = `Nivel ${secuencia.length}`;
      await mostrar_secuencia();
    } else {
      show_luces(1, false);
      await pausa(1500);
      caja_mensajes.innerText = "Press Any Key";
    }
    // barra_intentos.setAttribute("style", `width: ${porcentaje_de_oportunidades}%`);
    // await pausa(1000);
  }
}


// const myModal = new bootstrap.Modal(document.getElementById("myModal"), {});

async function siguienteCombinacion() {
  dando_secuencia = true;
  incrementar_secuencia();
  caja_mensajes.innerText = `Nivel ${secuencia.length}`;
  // cantidad_d_toques.innerText = secuencia.length;
  mostrar_secuencia();
}

async function iniciarJuego() {
  caja_mensajes.innerText = "";
  dando_secuencia = true;
  secuencia = [];
  porcentaje_de_oportunidades = 100;
  // barra_intentos.setAttribute("style", `width: ${porcentaje_de_oportunidades}%`)
  await pausa(800).catch(e => console.log(e));
  incrementar_secuencia();
  caja_mensajes.innerText = `Nivel ${secuencia.length}`;
  await mostrar_secuencia().catch(e => console.log(e));
  caja_mensajes.innerText = `Nivel ${secuencia.length}`;
}

function pausa(milisegundos) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, milisegundos);
  });
}

function incrementar_secuencia() {
  secuencia.push(botones[Math.floor(4 * Math.random())]);
}

async function mostrar_secuencia() {
  for (let index = 0; index < secuencia.length; index++) {
    // await mostrar_secuencia(secuencia[index], "click_cuadro");
    await new Promise((resolve, reject) => {
      setTimeout(() => {
        secuencia[index].click();
        resolve();
      }, 500);
    });
  }
  await pausa(1000);
  caja_mensajes.innerText = `Nivel ${secuencia.length}`;
  dando_secuencia = false;
  caja_botones.style.cursor = "pointer";
}


document.addEventListener("keypress", () => {
  if (!porcentaje_de_oportunidades) iniciarJuego();
})