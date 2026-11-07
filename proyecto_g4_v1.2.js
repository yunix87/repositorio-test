// BANCO DE PREGUNTAS
// Cada objeto: enunciado, alternativas (4), indiceCorrecto (0-3), categoria, dificultad.

const bancoPreguntas = [
  // Programación básica (4)
  {
    enunciado: "¿Qué significa la sigla HTML?",
    alternativas: [
      "HyperText Markup Language",
      "High Level Machine Language",
      "Hyperlink Text Machine Layout",
      "Home Tool Markup Language"
    ],
    indiceCorrecto: 0,
    categoria: "Tecnología",
    dificultad: "fácil"
  },
  {
    enunciado: "¿Qué palabra clave declara una constante en JavaScript?",
    alternativas: ["let", "const", "interface", "static"],
    indiceCorrecto: 1,
    categoria: "Tecnología",
    dificultad: "fácil"
  },
  {
    enunciado: "¿Con qué operador se compara valor y tipo en JavaScript?",
    alternativas: ["==", "===", "=", "!="],
    indiceCorrecto: 1,
    categoria: "Tecnología",
    dificultad: "media"
  },
  {
    enunciado: "¿Qué resultado devuelve typeof null en JavaScript?",
    alternativas: ["'null'", "'undefined'", "'object'", "'boolean'"],
    indiceCorrecto: 2,
    categoria: "Tecnología",
    dificultad: "difícil"
  },

  // Cultura general (6)
  {
    enunciado: "¿Cuál es el planeta más grande del sistema solar?",
    alternativas: ["Saturno", "Neptuno", "Júpiter", "Tierra"],
    indiceCorrecto: 2,
    categoria: "Cultura General",
    dificultad: "fácil"
  },
  {
    enunciado: "¿En qué continente se encuentra Egipto?",
    alternativas: ["Asia", "África", "Europa", "Oceanía"],
    indiceCorrecto: 1,
    categoria: "Cultura General",
    dificultad: "fácil"
  },
  {
    enunciado: "¿Cuál es el océano más grande del mundo?",
    alternativas: ["Atlántico", "Índico", "Ártico", "Pacífico"],
    indiceCorrecto: 3,
    categoria: "Cultura General",
    dificultad: "fácil"
  },
  {
    enunciado: "¿Cuál es el símbolo químico del oro?",
    alternativas: ["Ag", "Fe", "Cu", "Au"],
    indiceCorrecto: 3,
    categoria: "Cultura General",
    dificultad: "media"
  },
  {
    enunciado: "¿Cuál es la capital de Australia?",
    alternativas: ["Sídney", "Melbourne", "Canberra", "Perth"],
    indiceCorrecto: 2,
    categoria: "Cultura General",
    dificultad: "media"
  },
  {
    enunciado: "¿Cuántos huesos tiene el cuerpo humano adulto?",
    alternativas: ["206", "186", "226", "246"],
    indiceCorrecto: 0,
    categoria: "Cultura General",
    dificultad: "difícil"
  },

  // Historia (5)
  {
    enunciado: "¿En qué año comenzó la Segunda Guerra Mundial?",
    alternativas: ["1914", "1929", "1939", "1945"],
    indiceCorrecto: 2,
    categoria: "Historia",
    dificultad: "fácil"
  },
  {
    enunciado: "¿Quién fue el primer presidente de los Estados Unidos?",
    alternativas: ["Abraham Lincoln", "Thomas Jefferson", "Benjamin Franklin", "George Washington"],
    indiceCorrecto: 3,
    categoria: "Historia",
    dificultad: "fácil"
  },
  {
    enunciado: "¿En qué año llegó Cristóbal Colón a América?",
    alternativas: ["1486", "1492", "1498", "1500"],
    indiceCorrecto: 1,
    categoria: "Historia",
    dificultad: "fácil"
  },
  {
    enunciado: "¿Qué civilización construyó Machu Picchu?",
    alternativas: ["Los incas", "Los aztecas", "Los mayas", "Los olmecas"],
    indiceCorrecto: 0,
    categoria: "Historia",
    dificultad: "media"
  },
  {
    enunciado: "¿Cuál fue el muro que cayó en 1989?",
    alternativas: ["El Muro de Adriano", "El Muro de Berlín", "La Gran Muralla", "El Muro de los Lamentos"],
    indiceCorrecto: 1,
    categoria: "Historia",
    dificultad: "difícil"
  }
];

// LÓGICA DEL JUEGO
// Compara la respuesta del jugador con el índice correcto de la pregunta
const esCorrecta = (pregunta, respuesta) => respuesta === pregunta.indiceCorrecto;

// Devuelve los puntos según la dificultad y 0 si no acertó
const calcularPuntaje = (pregunta, acerto) => {
  if (!acerto) return 0;

  const puntosPorDificultad = {
    "fácil": 10,
    "media": 20,
    "difícil": 30
  };

  return puntosPorDificultad[pregunta.dificultad] ?? 0;
};

// Elige una cantidad de preguntas al azar del banco sin repetir
const elegirPreguntas = (preguntas, cantidad) => {
  const copia = [...preguntas];

  // Mezclamos el array usando Math.random()
  // Algoritmo Fisher Yates
  for (let i = copia.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    const temporal = copia[i];
    copia[i] = copia[j];
    copia[j] = temporal;
  }

  // Devolvemos la cantidad exacta solicitada
  return copia.slice(0, cantidad);
};

// RESPUESTAS SIMULADAS DEL JUGADOR 
// Índices simulados elegidos por el usuario (del 0 al 3) para una partida de 5 preguntas
const respuestasJugador = [0, 1, 2, 3, 1];

// Seleccionamos 5 preguntas al azar para la partida actual
const partidaActual = elegirPreguntas(bancoPreguntas, 5);

let puntajeAcumulado = 0;
// ESTADÍSTICAS FINALES DE LA PARTIDA
let cantidadAciertos = 0;
let cantidadErrores = 0;
let erroresPorCategoria = {};

console.log("========================================");
console.log("     ¡COMIENZA LA PARTIDA DE TRIVIA!    ");
console.log("========================================\n");

// Recorremos cada pregunta de la partida usando un bucle for
for (let i = 0; i < partidaActual.length; i++) {
  const pregunta = partidaActual[i];
  const respuestaUsuario = respuestasJugador[i];
  const acerto = esCorrecta(pregunta, respuestaUsuario);

  // Calculamos los puntos de esta ronda
  const puntosObtenidos = calcularPuntaje(pregunta, acerto);
  puntajeAcumulado += puntosObtenidos;

  // Imprimimos la información de la ronda en consola
  console.log(`Ronda ${i + 1} | Categoría: ${pregunta.categoria} | Dificultad: ${pregunta.dificultad}`);
  console.log(`Enunciado: ${pregunta.enunciado}`);
  console.log(`  1) ${pregunta.alternativas[0]}`);
  console.log(`  2) ${pregunta.alternativas[1]}`);
  console.log(`  3) ${pregunta.alternativas[2]}`);
  console.log(`  4) ${pregunta.alternativas[3]}`);
  
  console.log(`-> Respuesta del jugador: ${pregunta.alternativas[respuestaUsuario]}`);

  if (acerto) { 
    console.log(`Resultado: ¡Acertaste! (+${puntosObtenidos} puntos)`);
    cantidadAciertos += 1;
  } else {
    console.log(`Resultado: Fallaste.`);
    console.log(`La respuesta correcta era: ${pregunta.alternativas[pregunta.indiceCorrecto]}`);
    
    cantidadErrores += 1;

    // Contamos el error en la categoría de la pregunta
    if (erroresPorCategoria[pregunta.categoria] === undefined) {
      erroresPorCategoria[pregunta.categoria] = 0;
    }

    erroresPorCategoria[pregunta.categoria] += 1;
  }

  console.log(`Puntaje acumulado: ${puntajeAcumulado}`);
  console.log("----------------------------------------");
}




// 8. ESTADÍSTICAS FINALES
const totalPreguntas = partidaActual.length;
let porcentajeAcierto = 0;

if (totalPreguntas > 0) {
  porcentajeAcierto = (cantidadAciertos / totalPreguntas) * 100;
}

// Buscamos la categoría en la que más falló el jugador
let categoriaMasFallada = "Ninguna";
let maximoErrores = 0;

for (const categoria in erroresPorCategoria) {
  if (erroresPorCategoria[categoria] > maximoErrores) {
    maximoErrores = erroresPorCategoria[categoria];
    categoriaMasFallada = categoria;
  }
}

// 9. CLASIFICACIÓN DEL JUGADOR
let clasificacion = "";

if (porcentajeAcierto < 40) {
  clasificacion = "Principiante";
} else if (porcentajeAcierto <= 70) {
  clasificacion = "Intermedio";
} else {
  clasificacion = "Experto";
}

// Mostramos todo en consola
console.log("\n========================================");
console.log("          ESTADÍSTICAS FINALES          ");
console.log("========================================");
console.log(`Aciertos: ${cantidadAciertos}`);
console.log(`Errores: ${cantidadErrores}`);
console.log(`Porcentaje de acierto: ${porcentajeAcierto.toFixed(1)}%`);
console.log(`Puntaje total: ${puntajeAcumulado}`);
console.log(`Categoría en la que más falló: ${categoriaMasFallada}`);
console.log(`Clasificación del jugador: ${clasificacion}`);
console.log("========================================");
