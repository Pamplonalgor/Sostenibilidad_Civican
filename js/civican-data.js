/**
 * CIVICAN: TU IMPACTO EN JUEGO
 * Contenido pedagógico autoinclusivo y accesible para todos los públicos.
 * Diseñado para vivirse sin conocimiento previo de conferencias o ponencias.
 * Basado en las aportaciones de Andreu Escrivà (ecología y comunidad) y Verificat / Desfake (verificación periodística).
 */

const CIVICAN_DATA = {
  meta: {
    title: "Tu impacto en juego",
    subtitle: "Un futuro sostenible empieza por mirar y decidir",
    location: "CIVICAN - Fundación Caja Navarra",
    version: "3.0.0",
    curators: [
      {
        name: "Andreu Escrivà",
        role: "Ambientólogo, doctor en Biodiversidad y divulgador",
        contribution: "Aporta la visión sobre límites biofísicos de los materiales, debate sobre PIB y bienestar humano, y la importancia de la acción comunitaria."
      },
      {
        name: "Verificat / Desfake",
        role: "Plataforma de periodismo de verificación y educación mediática",
        contribution: "Aporta las herramientas de pensamiento crítico: detección de bulos climáticos, método de las 4 preguntas, estrategias de manipulación y análisis de greenwashing."
      },
      {
        name: "Algorithmics",
        role: "Academia internacional de programación y pensamiento computacional",
        contribution: "Diseño pedagógico y desarrollo de la experiencia interactiva táctil para CIVICAN."
      }
    ]
  },

  experiences: [
    /* ==========================================================================
       JUEGO A: TRANSFORMA TU BARRIO
       ========================================================================== */
    {
      id: "juego-a",
      title: "Transforma tu barrio",
      typology: "Simulación Urbana / Reflexión y Comunidad",
      icon: "fa-city",
      badgeColor: "var(--forest)",
      invitation: "Explora los recursos, el bienestar y lo que podemos hacer en común.",
      duration: "3-4 min",
      cta: "Transformar el barrio",
      summary: "Tres decisiones cotidianas para descubrir qué hace que un barrio sea realmente habitable: el uso de los materiales, qué entendemos por bienestar y la fuerza de colaborar con los vecinos.",
      badgeTopic: "Recursos y Comunidad",
      rounds: [
        {
          id: "a1",
          stepNumber: "1 de 3",
          badge: "Economía Circular y Recursos",
          situation: "Se habla mucho de reciclar para no agotar el planeta. De todos los materiales que consume la economía mundial cada año, ¿qué porcentaje crees que proviene realmente del reciclaje?",
          options: [
            { id: "a1-opt1", text: "Menos del 10% (apenas un 7,2%)", isKey: true, desc: "Dato científico real medido a nivel internacional." },
            { id: "a1-opt2", text: "Entre el 10% y el 30%", isKey: false, desc: "Cifra superior a la realidad global registrada." },
            { id: "a1-opt3", text: "Entre el 30% y el 50%", isKey: false, desc: "Rango muy optimista alejado de las estadísticas." },
            { id: "a1-opt4", text: "Más del 50%", isKey: false, desc: "Supondría que la mayor parte de la economía ya es circular." },
            { id: "a1-opt5", text: "No lo sé con certeza", isKey: false, desc: "Una respuesta prudente ante un dato tan desconocido." }
          ],
          feedbackTitle: "Solo el 7,2% de los materiales mundiales son reciclados",
          feedbackBody: "Los informes científicos internacionales confirman que en 2023 solo el 7,2% de los recursos utilizados procedían del reciclaje. El 92,8% restante se sigue extrayendo virgen de la naturaleza.",
          takeaway: "Reciclar es un paso imprescindible, pero no hace milagros. Para no agotar el planeta, la prioridad real es reducir el consumo innecesario, reparar lo que se rompe y compartir herramientas.",
          illustrationType: "materials-cycle"
        },
        {
          id: "a2",
          stepNumber: "2 de 3",
          badge: "Economía y Calidad de Vida",
          situation: "En las noticias se repite que si el PIB (Producto Interior Bruto) crece, todo va bien. ¿El crecimiento económico continuo es siempre sinónimo de mayor bienestar para las personas?",
          options: [
            { id: "a2-opt1", text: "Creo que sí: más dinero en movimiento siempre mejora la vida." },
            { id: "a2-opt2", text: "Depende: importa qué cosas crecen y a quién benefician." },
            { id: "a2-opt3", text: "Creo que no: la economía puede crecer destruyendo salud y naturaleza." },
            { id: "a2-opt4", text: "No lo tengo claro / Prefiero reflexionar." }
          ],
          subQuestion: "¿Qué sensación te produce la palabra 'decrecimiento'?",
          subOptions: [
            { id: "sub-1", label: "Curiosidad por nuevos estilos de vida" },
            { id: "sub-2", label: "Preocupación por el empleo y la economía" },
            { id: "sub-3", label: "Dudas sobre cómo funcionaría en la práctica" },
            { id: "sub-4", label: "Esperanza de tener más tiempo libre y salud" }
          ],
          feedbackTitle: "Distinguir la actividad económica del bienestar humano",
          feedbackBody: "El PIB suma como 'riqueza' situaciones como limpiar un vertido de petróleo, reparar destrozos tras una tormenta o comprar medicinas por contaminación. Eso aumenta el gasto, pero no mejora nuestra calidad de vida.",
          takeaway: "El verdadero bienestar no se mide en consumir más objetos cada semana, sino en tener tiempo de calidad, salud, transporte público accesible, parques cuidados y redes vecinales de apoyo.",
          illustrationType: "pib-wellbeing"
        },
        {
          id: "a3",
          stepNumber: "3 de 3",
          badge: "La Fuerza de la Comunidad",
          situation: "¿Estarías dispuesto/a a aportar el 1% de tus ingresos anuales (por ejemplo, 10€ de cada 1.000€) para financiar mejoras públicas que protejan el clima y hagan tu barrio más verde y habitable?",
          disclaimer: "Nota: Es un ejercicio de reflexión inspirado en estudios sociológicos, no una petición de dinero real.",
          options: [
            { id: "a3-opt1", text: "Sí, estaría dispuesto/a a colaborar" },
            { id: "a3-opt2", text: "No, preferiría no aportar" },
            { id: "a3-opt3", text: "No lo sé con seguridad" },
            { id: "a3-opt4", text: "Prefiero no responder" }
          ],
          subQuestion: "¿Qué porcentaje de tus vecinos crees que responderían que 'SÍ'?",
          subOptions: [
            { id: "perc-1", label: "Menos del 25% (casi nadie colaboraría)" },
            { id: "perc-2", label: "Entre el 25% y el 50%" },
            { id: "perc-3", label: "Entre el 50% y el 75%" },
            { id: "perc-4", label: "Más del 75% (la inmensa mayoría)" }
          ],
          feedbackTitle: "Creemos que los demás son más egoístas de lo que son",
          feedbackBody: "Un estudio internacional en 125 países descubrió algo sorprendente: el 69% de la población mundial afirma estar dispuesta a contribuir económicamente, pero esa misma gente cree que en su entorno solo lo haría una minoría.",
          takeaway: "Sufrimos una falsa sensación de soledad. Cuando salimos del aislamiento y nos encontramos en la plaza o en asociaciones de barrio, descubrimos que la mayoría de nuestros vecinos sí quiere cuidar el futuro en común.",
          illustrationType: "community-network"
        }
      ],
      closing: {
        title: "Un futuro sostenible se construye en común",
        subtitle: "Has completado la experiencia de 'Transforma tu barrio'",
        takeaways: [
          "Límites reales: Solo el 7,2% de los materiales mundiales se reciclan; la clave es reducir y reparar.",
          "Bienestar auténtico: La calidad de vida no es comprar más, sino tener mejor salud, tiempo y comunidad.",
          "Fuerza colectiva: Estamos mucho más dispuestos a colaborar de lo que creemos en soledad."
        ],
        sourceNote: "Conceptos inspirados en las investigaciones ecosociales de Andreu Escrivà."
      }
    },

    /* ==========================================================================
       JUEGO B: DETECTIVES DEL CLIMA
       ========================================================================== */
    {
      id: "juego-b",
      title: "Detectives del clima",
      typology: "Trivial de Investigación / Fact-Checking",
      icon: "fa-magnifying-glass-chart",
      badgeColor: "var(--cyanotype)",
      invitation: "Pon a prueba dos casos reales y descubre cómo verificar noticias.",
      duration: "3-4 min",
      cta: "Investigar mensajes",
      summary: "Conviértete en verificador periodístico: audita dos noticias virales sobre el clima y los mapas meteorológicos, y llévate las 4 preguntas para no caer en bulos.",
      badgeTopic: "Verificación de Noticias",
      cases: [
        {
          id: "b1",
          stepNumber: "1 de 3",
          badge: "Caso 1: Clima y Alimentación",
          headline: "«El aumento de sequías y olas de calor extremas pone en riesgo las cosechas y la producción global de alimentos»",
          contextText: "Titular publicado en prensa generalista sobre el impacto agrícola del calentamiento.",
          question: "¿Te lo crees?",
          options: [
            { id: "b1-opt1", text: "Me lo creo", isKey: true },
            { id: "b1-opt2", text: "No me lo creo", isKey: false },
            { id: "b1-opt3", text: "Necesito comprobarlo", isKey: true, isPrudent: true }
          ],
          tools: {
            queVeo: "Un titular de prensa que relaciona la escasez de lluvias con pérdidas en las cosechas agrícolas.",
            quePuedoComprobar: "Consultar informes técnicos de agencias internacionales como la FAO (Naciones Unidas para la Alimentación) y el Ministerio de Agricultura.",
            queFaltaSaber: "Qué cultivos concretos se ven afectados hoy (olivar, cereales) y qué medidas de adaptación al agua se están probando."
          },
          verdictInSlide: "VERDADERO",
          feedbackTitle: "Veredicto: Noticia VERDADERA",
          feedbackBody: "Los datos científicos y agronómicos confirman que el estrés hídrico y las olas de calor récord ya reducen las cosechas de cereales y frutas en el sur de Europa y otras regiones del planeta.",
          methodNote: "Si elegiste 'Necesito comprobarlo', ¡tu instinto es excelente! La regla de oro del periodismo es no creerse nada a ciegas: verificar las fuentes científicas antes de compartir es el mejor escudo contra la desinformación."
        },
        {
          id: "b2",
          stepNumber: "2 de 3",
          badge: "Caso 2: Los Mapas del Tiempo",
          headline: "«Bulo viral: Comparan un mapa del tiempo de 1986 verde con uno de 2022 en rojo oscuro para acusar a los meteorólogos de exagerar el calor»",
          contextText: "Publicación que circuló masivamente en redes sociales con dos mapas televisivos yuxtapuestos.",
          question: "¿Te lo crees?",
          options: [
            { id: "b2-opt1", text: "Me lo creo (parece que exageran los colores)", isKey: false },
            { id: "b2-opt2", text: "No me lo creo (hay una trampa en la imagen)", isKey: true },
            { id: "b2-opt3", text: "Necesito comprobarlo", isKey: true, isPrudent: true }
          ],
          tools: {
            queVeo: "Dos mapas de televisión con colores muy distintos (uno suave y otro rojo fuego).",
            quePuedoComprobar: "Si representan la misma variable física: un mapa era de temperatura del aire y el otro mostraba el índice de radiación ultravioleta o la masa térmica a 1.500 m de altitud.",
            queFaltaSaber: "La fecha exacta de emisión, la cadena de televisión de origen y la leyenda oficial de colores que explicaba cada tono."
          },
          verdictInSlide: "FALSO",
          feedbackTitle: "Veredicto: Bulo FALSO",
          feedbackBody: "Los verificadores demostraron que la imagen mezclaba mapas con objetivos técnicos completamente diferentes. No era manipulación meteorológica, sino un montaje engañoso para desacreditar los avisos por calor.",
          methodQuestion: "Para no caer en trampas visuales, comprueba siempre:",
          methodPills: ["¿Qué miden exactamente los colores?", "¿De qué fecha y medio procede cada mapa?", "¿Muestran la misma escala?"]
        },
        {
          id: "b3",
          stepNumber: "3 de 3",
          badge: "Tu Caja de Herramientas Crítica",
          headline: "¿Cómo comprobar cualquier información antes de compartirla?",
          contextText: "Aplica las 4 preguntas maestras del periodismo de verificación (desarrolladas por Verificat) para proteger tus redes:",
          isMethodBuilder: true,
          questions: [
            {
              id: "q1",
              number: "1",
              text: "¿Cómo me quiere hacer reaccionar?",
              focus: "Emoción e Impulso",
              desc: "Los bulos buscan provocar indignación, miedo o burla rápida para que los compartas sin pararte a pensar."
            },
            {
              id: "q2",
              number: "2",
              text: "¿Quién hay tras el mensaje?",
              focus: "Autoría y Fuentes",
              desc: "Mira si lo firma una institución científica reconocida, un periodista con nombre o una cuenta anónima en redes."
            },
            {
              id: "q3",
              number: "3",
              text: "¿Qué dicen otras fuentes de confianza?",
              focus: "Contraste",
              desc: "Si un descubrimiento es real, otros medios independientes y organismos científicos también hablarán de él."
            },
            {
              id: "q4",
              number: "4",
              text: "¿Qué pruebas concretas aporta?",
              focus: "Evidencias",
              desc: "Desconfía de frases vagas como 'los expertos dicen' si no citan el estudio, la fecha y los datos auditables."
            }
          ],
          feedbackTitle: "Las 4 preguntas que frenan la desinformación",
          feedbackBody: "Hacerte estas preguntas solo te llevará 10 segundos antes de reenviar un mensaje en WhatsApp o redes sociales.",
          takeaway: "Verificar no es desconfiar de todo el mundo; es saber buscar pruebas sólidas y apoyar a quienes comunican con rigor."
        }
      ],
      closing: {
        title: "Antes de compartir, detente y comprueba",
        subtitle: "Has completado la investigación de 'Detectives del clima'",
        takeaways: [
          "Hechos demostrados: El impacto en las cosechas está respaldado por la ciencia agrícola internacional.",
          "Trampas visuales: Desconfía de capturas de mapas recortados sin leyenda ni procedencia clara.",
          "Las 4 preguntas de oro: Emoción, Autoría, Contraste y Pruebas."
        ],
        sourceNote: "Casos prácticos y metodología de alfabetización mediática desarrollada por Verificat / Desfake."
      }
    },

    /* ==========================================================================
       JUEGO C: ¿VERDE DE VERDAD?
       ========================================================================== */
    {
      id: "juego-c",
      title: "¿Verde de verdad?",
      typology: "Auditoría de Campaña / Detección de Greenwashing",
      icon: "fa-tags",
      badgeColor: "var(--terracotta)",
      invitation: "Abre una promesa publicitaria y descubre qué hay detrás.",
      duration: "2-3 min",
      cta: "Examinar promesas",
      summary: "Sigue la investigación real sobre la recogida de ropa en grandes tiendas: qué promete el anuncio, qué descubrieron los periodistas con rastreadores GPS y cómo detectar el 'greenwashing'.",
      badgeTopic: "Moda Rápida y Publicidad",
      layers: [
        {
          id: "c1",
          stepNumber: "Capa 1 de 3",
          name: "El Anuncio en Tienda",
          subtitle: "Campaña de reciclaje de ropa de moda rápida",
          question: "Ves carteles que dicen: «Trae tu ropa vieja a nuestras tiendas para reciclarla y cerremos el ciclo de la moda sin residuos». ¿Qué busca la marca con esta campaña?",
          claimPresented: "«Deja aquí tu ropa usada para reciclar. Cerremos el ciclo de la moda sin generar basura.»",
          options: [
            { id: "c1-o1", text: "Mejorar su imagen de marca ante consumidores preocupados por el planeta" },
            { id: "c1-o2", text: "Fidelizar a clientes entregando cupones de descuento para seguir comprando" },
            { id: "c1-o3", text: "Promocionar una iniciativa ambiental corporativa" },
            { id: "c1-o4", text: "Un poco de todo lo anterior" }
          ],
          feedbackTitle: "La doble cara de las promesas publicitarias",
          feedbackBody: "Muchos anuncios utilizan palabras bonitas como 'circular', 'eco' o 'cero residuos' para que sigamos comprando sin sentir culpa. Pero la clave no está en el eslogan: está en comprobar qué ocurre realmente con esa ropa.",
          insight: "Fijarse solo en la estética del anuncio oculta la pregunta decisiva: ¿adónde van esas prendas una vez depositadas en el contenedor de la tienda?"
        },
        {
          id: "c2",
          stepNumber: "Capa 2 de 3",
          name: "La Investigación con GPS",
          subtitle: "Qué descubrieron los periodistas de investigación",
          question: "¿Cómo comprobaron los periodistas suecos adónde iba realmente la ropa entregada para 'reciclaje'?",
          options: [
            { id: "c2-opt1", text: "Ocultaron 10 pequeños rastreadores GPS dentro de 10 prendas entregadas en tiendas", isKey: true },
            { id: "c2-opt2", text: "Se limitaron a creer lo que ponía en la página web oficial de la marca", isKey: false },
            { id: "c2-opt3", text: "Preguntaron opiniones a influencers de moda en redes", isKey: false }
          ],
          feedbackTitle: "Los rastreadores GPS revelaron la verdad",
          feedbackBody: "Un equipo del periódico Aftonbladet cosió rastreadores GPS en prendas entregadas en tiendas de moda rápida. La señal satelital reveló que la ropa viajó miles de kilómetros en barco y camión, y varias prendas acabaron amontonadas en vertederos de otros continentes o quemadas.",
          insight: "La investigación demostró que la promesa de 'cero residuos' no coincidía con la realidad operativa de la empresa."
        },
        {
          id: "c3",
          stepNumber: "Capa 3 de 3",
          name: "¿Qué es el Greenwashing?",
          subtitle: "Aprende a reconocer el 'lavado verde'",
          question: "¿Cómo podemos protegernos del 'greenwashing' al comprar?",
          options: [
            { id: "c3-opt1", text: "Exigir datos claros de trazabilidad y recordar que lo más ecológico es cuidar y reparar lo que ya tenemos", isKey: true },
            { id: "c3-opt2", text: "Fiarme de cualquier producto que use etiquetas de cartón marrón o letras verdes", isKey: false },
            { id: "c3-opt3", text: "Pensar que ninguna empresa del mundo hace nada bien", isKey: false }
          ],
          feedbackTitle: "Definición de Greenwashing: Apariencia sin pruebas",
          feedbackBody: "El 'greenwashing' o lavado de imagen verde consiste en gastar más recursos en publicidad ecológica que en cambiar realmente las prácticas de fabricación y reciclaje.",
          takeaway: "No todo lo que se anuncia es falso, pero los lemas absolutos ('100% ecológico', 'cero impacto') siempre exigen pruebas. La prenda más sostenible del mundo siempre será la que ya tienes en tu armario."
        }
      ],
      closing: {
        title: "No todo lo verde es un engaño, pero exige pruebas",
        subtitle: "Has completado la auditoría sobre publicidad y moda rápida",
        takeaways: [
          "Trazabilidad comprobada: Los rastreadores GPS demostraron que prometer reciclaje no asegura que ocurra.",
          "Ojo al Greenwashing: Cuidado con las marcas que usan sellos ecológicos para incentivar que compres más.",
          "El mejor reciclaje: Alargar la vida de lo que ya tenemos y comprar solo lo que realmente necesitamos."
        ],
        sourceNote: "Basado en la investigación periodística sobre moda rápida y los análisis de publicidad engañosa de Verificat."
      }
    },

    /* ==========================================================================
       JUEGO D: MISIÓN: ROMPER LA CADENA
       ========================================================================== */
    {
      id: "juego-d",
      title: "Misión: romper la cadena",
      typology: "Escape Room Digital / Desmontar el Retardismo",
      icon: "fa-link-slash",
      badgeColor: "var(--ink)",
      invitation: "Descubre las estrategias que frenan la acción por el clima.",
      duration: "3-4 min",
      cta: "Iniciar la misión",
      summary: "Un escape room colaborativo para desbloquear 3 llaves: aprender a filtrar emociones, reconocer las trampas lógicas (E.F.E.C.T.) y vencer las excusas del 'retardismo'.",
      badgeTopic: "Desmontar Excusas",
      trials: [
        {
          id: "d1",
          stepNumber: "Enigma 1 de 3",
          keyName: "Pruebas",
          badge: "Filtro de Emociones",
          title: "¿Cómo me quiere hacer reaccionar este mensaje?",
          situation: "Para desbloquear la Llave de las PRUEBAS, identifica qué objetivo tiene la primera pregunta del método de verificación:",
          pairingTask: {
            questionGiven: "Ves una publicación con titulares alarmistas en mayúsculas y música dramática. ¿Para qué sirve preguntarse '¿Cómo me quiere hacer reaccionar?'",
            options: [
              { id: "pair-1", text: "Para detectar si están usando mis emociones (miedo o enfado) para hacerme compartir por impulso", isCorrect: true },
              { id: "pair-2", text: "Para saber si el autor de la noticia tiene muchos seguidores", isCorrect: false },
              { id: "pair-3", text: "Para buscar comentarios de personas que piensen exactamente igual que yo", isCorrect: false }
            ]
          },
          feedbackTitle: "¡Llave 1 Desbloqueada: Pruebas!",
          feedbackBody: "Los desinformadores saben que cuando nos enfadamos o asustamos, bajamos la guardia crítica. Pararte a respirar y preguntarte '¿por qué me hace sentir esto?' es el primer cortafuegos para no propagar bulos."
        },
        {
          id: "d2",
          stepNumber: "Enigma 2 de 3",
          keyName: "Estrategias",
          badge: "El Método E.F.E.C.T.",
          title: "¿Qué trampa de desinformación es esta?",
          situation: "Lee la siguiente táctica habitual de manipulación e identifica a cuál de las estrategias corresponde:",
          efectChallenge: {
            definition: "«Elegir únicamente un año o un mes frío aislado para decir 'el clima no se calienta', ignorando los últimos 50 años de mediciones globales que demuestran un calentamiento continuado.»",
            options: [
              { id: "efect-1", name: "Cherry Picking (Selección sesgada de datos)", isCorrect: true, desc: "Coger solo la 'cereza' que interesa y esconder el árbol entero." },
              { id: "efect-2", name: "Falsos Expertos", isCorrect: false, desc: "Presentar a un tertuliano sin formación en clima como si fuera un climatólogo." },
              { id: "efect-3", name: "Expectativas Imposibles", isCorrect: false, desc: "Exigir certeza al 100% en las predicciones para no tomar ninguna medida." },
              { id: "efect-4", name: "Teorías de la Conspiración", isCorrect: false, desc: "Afirmar que todo es un complot secreto sin aportar pruebas comprobables." }
            ]
          },
          feedbackTitle: "¡Llave 2 Desbloqueada: Estrategias!",
          feedbackBody: "¡Exacto! El 'Cherry Picking' es una de las trampas más repetidas: recortar el trozo de dato que conviene para engañar a quien no ve la gráfica histórica completa."
        },
        {
          id: "d3",
          stepNumber: "Enigma 3 de 3",
          keyName: "Acción",
          badge: "Vencer el Retardismo",
          title: "¿Qué consecuencia busca este tipo de mensaje?",
          situation: "El 'retardismo' acepta que el cambio climático existe, pero inventa excusas para aplazar cualquier cambio. Lee este mensaje:",
          narrativeClaim: "«Como la tecnología del futuro inventará una máquina milagrosa que lo resolverá todo, no vale la pena que hagamos ningún esfuerzo hoy en nuestras ciudades ni en nuestros hábitos.»",
          options: [
            { id: "d3-opt1", text: "Desanimar a la ciudadanía para que no exijamos mejoras ni cambiemos nada hoy", isCorrect: true },
            { id: "d3-opt2", text: "Promover el avance de la ciencia y la investigación ecológica", isCorrect: false },
            { id: "d3-opt3", text: "Acelerar la inversión en transporte público y energías limpias", isCorrect: false }
          ],
          feedbackTitle: "¡Misión Cumplida! Has roto la cadena del retardismo",
          feedbackBody: "El tecnooptimismo ciego promete milagros futuros para no actuar en el presente. La tecnología es una gran aliada, pero no sustituye las decisiones valientes de hoy: más sombras, mejor transporte y ciudades pensadas para las personas.",
          takeaway: "Frente a las excusas que nos invitan a la pasividad, la solución más eficaz siempre es informarse bien, organizarse con los vecinos y construir comunidad."
        }
      ],
      closing: {
        title: "¡Cadena de desinformación detenida!",
        subtitle: "Has transformado las excusas del retardismo en acción informada",
        takeaways: [
          "Filtra la emoción: Si una noticia te provoca rabia o miedo inmediato, desconfía y comprueba.",
          "Reconoce el Cherry Picking: No te fíes de fragmentos aislados que contradicen la ciencia global.",
          "Supera el retardismo: No esperes soluciones milagrosas lejanas cuando podemos mejorar nuestros barrios hoy."
        ],
        sourceNote: "Conceptos inspirados en la metodología EFECT de Verificat y el pensamiento ecosocial de Andreu Escrivà."
      }
    }
  ]
};
