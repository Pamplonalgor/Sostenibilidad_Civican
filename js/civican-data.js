/**
 * CIVICAN: TU IMPACTO EN JUEGO (VERSIÓN 2 - CONTRATO DE FIDELIDAD)
 * Modelo de datos editorial estructurado fiel a las dos presentaciones originales:
 * P1 = "CIVICAN.pptx.pdf" (Andreu Escrivà: Recursos, PIB/Bienestar, Acción colectiva)
 * P2 = "Presentación CIVICAN.pdf" (Verificat / Desfake: Casos reales, EFECT, Campaña H&M, Retardismo)
 */

const CIVICAN_DATA = {
  meta: {
    title: "Tu impacto en juego",
    subtitle: "Un futuro sostenible empieza por mirar y decidir",
    location: "CIVICAN - Fundación Caja Navarra",
    version: "2.0.0",
    sources: [
      {
        code: "P1",
        name: "Andreu Escrivà",
        document: "CIVICAN.pptx.pdf (27 páginas)",
        role: "Ambientólogo, doctor en Biodiversidad y divulgador",
        contribution: "Límites biofísicos de materiales (p.4, 14-15), debate PIB y bienestar (p.16-18), futuros y acción comunitaria (p.19-24), y estudio sobre la subestimación de la disposición colectiva a actuar (p.25-27)."
      },
      {
        code: "P2",
        name: "Verificat / Desfake",
        document: "Presentación CIVICAN.pdf (43 páginas)",
        role: "Asociación de periodismo de verificación y educación mediática",
        contribution: "Dinámica '¿Te lo crees?' de casos reales (p.2-17), las 4 preguntas de verificación (p.20-22), las estrategias de desinformación EFECT (p.23-28), caso de investigación publicitaria de H&M (p.30-34) y análisis del retardismo climático (p.35-42)."
      }
    ]
  },

  experiences: [
    /* ==========================================================================
       JUEGO A: TRANSFORMA TU BARRIO (P1 - Andreu Escrivà)
       ========================================================================== */
    {
      id: "juego-a",
      title: "Transforma tu barrio",
      typology: "Simulación Urbana / Reflexión y Comunidad",
      icon: "fa-city",
      badgeColor: "var(--verde-barrio)",
      invitation: "Explora recursos, bienestar y lo que podemos hacer en común.",
      duration: "3-4 min",
      cta: "Transformar el barrio",
      summary: "Tres escenas basadas en la ponencia de Andreu Escrivà para repensar los límites de los materiales, el sentido del bienestar y la fuerza de la acción vecinal.",
      sourceRef: "CIVICAN.pptx.pdf (P1, p.4, 14-18, 25-27)",
      rounds: [
        {
          id: "a1",
          stepNumber: "1 de 3",
          badge: "Límites y Circularidad",
          sourceRef: "P1 p.14-15 y p.4",
          originalQuestion: "¿Cuántos materiales reciclados se consumen en el mundo?",
          situation: "Según el dato global de 2023 mostrado en la presentación, ¿qué proporción de todos los materiales consumidos era secundaria (reciclada)?",
          isEstimate: true,
          options: [
            { id: "a1-opt1", text: "Menos del 10% (apenas un 7,2%)", isKey: true, desc: "Dato exacto del gráfico de la presentación: 7,2% en 2023." },
            { id: "a1-opt2", text: "Del 10% al 30%", isKey: false, desc: "Cifra estimada superior a la realidad global documentada." },
            { id: "a1-opt3", text: "Del 30% al 50%", isKey: false, desc: "Rango muy alejado de las estadísticas de materiales secundarios." },
            { id: "a1-opt4", text: "Más del 50%", isKey: false, desc: "Supondría que la mayor parte de la economía es circular." },
            { id: "a1-opt5", text: "No lo sé con certeza", isKey: false, desc: "Una respuesta prudente ante datos estadísticos complejos." }
          ],
          feedbackTitle: "Circularidad no equivale a cerrar el ciclo material",
          feedbackBody: "El gráfico original de la presentación (P1 p.14) muestra que en 2023 solo el 7,2% de los materiales consumidos a nivel mundial procedían del reciclaje (frente al 9,1% en 2018).",
          takeaway: "Hablar más de circularidad no significa que hayamos cerrado el ciclo. También los servicios y la tecnología dependen de una base material finita: reciclar es necesario, pero reducir la extracción virgen es imprescindible.",
          illustrationType: "materials-cycle"
        },
        {
          id: "a2",
          stepNumber: "2 de 3",
          badge: "Economía y Bienestar",
          sourceRef: "P1 p.16-18",
          originalQuestion: "¿El crecimiento del PIB es siempre positivo?",
          situation: "¿El crecimiento del PIB (Producto Interior Bruto) es siempre sinónimo de mayor bienestar social?",
          isReflection: true,
          options: [
            { id: "a2-opt1", text: "Creo que sí: más actividad económica siempre mejora la vida.", reaction: "postura tradicional" },
            { id: "a2-opt2", text: "Depende de qué crezca y para quién.", reaction: "enfoque distributivo" },
            { id: "a2-opt3", text: "Creo que no: puede crecer destruyendo recursos y salud.", reaction: "enfoque ecológico" },
            { id: "a2-opt4", text: "No lo tengo claro / Prefiero reflexionar.", reaction: "duda abierta" }
          ],
          subQuestion: "¿Qué piensas cuando se habla de 'decrecimiento'?",
          subOptions: [
            { id: "sub-1", label: "Curiosidad por alternativas" },
            { id: "sub-2", label: "Preocupación por el empleo" },
            { id: "sub-3", label: "Rechazo o escepticismo" },
            { id: "sub-4", label: "Esperanza de vivir con más tiempo y salud" },
            { id: "sub-5", label: "Dudas sobre cómo se organizaría" }
          ],
          feedbackTitle: "Distinguir actividad económica de calidad de vida",
          feedbackBody: "Como explica Andreu Escrivà en P1 p.16-18, el PIB contabiliza gastos de reconstrucción tras catástrofes o contaminación como 'crecimiento', pero eso no significa mayor bienestar humano.",
          takeaway: "El debate clave no es crecer o no crecer en abstracto, sino qué actividades deben desarrollarse (sanidad, educación, transporte público, cuidados) y cuáles deben reducir su consumo de energía y materiales.",
          illustrationType: "pib-wellbeing"
        },
        {
          id: "a3",
          stepNumber: "3 de 3",
          badge: "Comunidad y Acción Colectiva",
          sourceRef: "P1 p.25-27 y p.3",
          originalQuestion: "¿Aportarías el 1% de tu sueldo anual para políticas eficaces contra el cambio climático?",
          situation: "¿Estarías dispuesto/a a aportar el 1% de tus ingresos anuales para financiar políticas públicas eficaces contra el cambio climático?",
          disclaimer: "Nota: Es un ejercicio de reflexión personal inspirado en el estudio de la presentación, no una solicitud de dinero.",
          isSurvey: true,
          options: [
            { id: "a3-opt1", text: "Sí, estaría dispuesto/a" },
            { id: "a3-opt2", text: "No, no estaría dispuesto/a" },
            { id: "a3-opt3", text: "No lo sé" },
            { id: "a3-opt4", text: "Prefiero no responder" }
          ],
          subQuestion: "¿Qué porcentaje de personas crees que responden afirmativamente a esta pregunta?",
          subOptions: [
            { id: "perc-1", label: "Menos del 25% (muy poca gente)" },
            { id: "perc-2", label: "Entre el 25% y el 50%" },
            { id: "perc-3", label: "Entre el 50% y el 75%" },
            { id: "perc-4", label: "Más del 75% (la gran mayoría)" }
          ],
          feedbackTitle: "Subestimamos la voluntad de los demás",
          feedbackBody: "El macroestudio global recogido en P1 p.26 demuestra un fenómeno psicológico sorprendente: la inmensa mayoría de la población mundial (el 69%) afirma estar dispuesta a contribuir, pero esa misma gente cree que en su país solo lo haría una minoría.",
          takeaway: "Tendemos a creer que los demás son más egoístas e indiferentes de lo que realmente son. Superar ese aislamiento y conectar en redes vecinales y comunitarias es el primer paso para impulsar transformaciones reales.",
          illustrationType: "community-network"
        }
      ],
      closing: {
        title: "Mirar los recursos, distinguir bienestar y actuar en común",
        subtitle: "Has completado las tres reflexiones de 'Transforma tu barrio'",
        takeaways: [
          "Límites materiales: La circularidad no es mágica; solo el 7,2% de materiales consumidos son secundarios.",
          "Bienestar real: El aumento continuo del PIB no garantiza felicidad ni sostenibilidad.",
          "Fuerza comunitaria: La sociedad está mucho más dispuesta a actuar de lo que creemos en soledad."
        ],
        sourceNote: "Contenidos desarrollados fielmente a partir de la conferencia de Andreu Escrivà (CIVICAN.pptx.pdf, p.4, 14-18, 25-27)."
      }
    },

    /* ==========================================================================
       JUEGO B: DETECTIVES DEL CLIMA (P2 - Casos reales de Verificat)
       ========================================================================== */
    {
      id: "juego-b",
      title: "Detectives del clima",
      typology: "Trivial de Investigación / Fact-Checking",
      icon: "fa-magnifying-glass-chart",
      badgeColor: "var(--azul-detectives)",
      invitation: "Pon a prueba dos casos y descubre cómo verificar.",
      duration: "3-4 min",
      cta: "Investigar mensajes",
      summary: "Dos casos reales de la dinámica de Verificat (alimentación y mapas del tiempo) y la construcción de las 4 preguntas de comprobación.",
      sourceRef: "Presentación CIVICAN.pdf (P2, p.2-17, 20-22)",
      cases: [
        {
          id: "b1",
          stepNumber: "1 de 3",
          badge: "Caso 2 Original: Clima y Alimentación",
          sourceRef: "P2 p.4 y p.12",
          headline: "«El cambio climático y las olas de calor amenazan el futuro de las cosechas y la producción global de alimentos»",
          contextText: "Noticia publicada en medios de comunicación con base en estudios agronómicos internacionales.",
          question: "¿Te lo crees?",
          options: [
            { id: "b1-opt1", text: "Me lo creo", isKey: true, label: "Me lo creo" },
            { id: "b1-opt2", text: "No me lo creo", isKey: false, label: "No me lo creo" },
            { id: "b1-opt3", text: "Necesito comprobarlo", isKey: true, isPrudent: true, label: "Necesito comprobarlo" }
          ],
          tools: {
            queVeo: "Un titular de prensa que relaciona eventos meteorológicos extremos con el rendimiento de cultivos agrícolas.",
            quePuedoComprobar: "Informes de la FAO y el IPCC sobre estrés hídrico, polinización y rendimiento de cereales en el sur de Europa.",
            queFaltaSaber: "Si se trata de una proyección para décadas futuras o de pérdidas agrícolas ya registradas en las campañas actuales."
          },
          verdictInSlide: "VERDADERO",
          feedbackTitle: "Veredicto del material: Clasificado como VERDADERO",
          feedbackBody: "La presentación de Verificat (P2 p.12) clasifica este caso como VERDADERO. La evidencia científica acumulada constata que las sequías recurrentes y el estrés térmico impactan negativamente en las cosechas.",
          methodNote: "Optar por 'Necesito comprobarlo' es una actitud metodológica intachable: el rigor periodístico consiste precisamente en acudir a las fuentes primarias antes de compartir."
        },
        {
          id: "b2",
          stepNumber: "2 de 3",
          badge: "Caso 6 Original: Los Mapas del Tiempo",
          sourceRef: "P2 p.8 y p.16",
          headline: "«Comparativa viral: Mapa del tiempo de 1986 en verde frente a mapa de 2022 en rojo oscuro para simular que hace más calor»",
          contextText: "Publicación viral en redes que compara dos mapas televisivos para sugerir manipulación gráfica del clima.",
          question: "¿Te lo crees?",
          options: [
            { id: "b2-opt1", text: "Me lo creo", isKey: false, label: "Me lo creo" },
            { id: "b2-opt2", text: "No me lo creo", isKey: true, label: "No me lo creo" },
            { id: "b2-opt3", text: "Necesito comprobarlo", isKey: true, isPrudent: true, label: "Necesito comprobarlo" }
          ],
          tools: {
            queVeo: "Dos imágenes yuxtapuestas con tonalidades visualmente muy diferentes (una verde y otra roja).",
            quePuedoComprobar: "Si ambos mapas representan la misma variable (temperatura superficial frente a índice de radiación o temperaturas a 850 hPa).",
            queFaltaSaber: "La procedencia exacta de cada mapa, la fecha real de emisión y la leyenda técnica de colores utilizada por el canal."
          },
          verdictInSlide: "FALSO",
          feedbackTitle: "Veredicto del material: Clasificado como FALSO",
          feedbackBody: "La presentación (P2 p.16) clasifica este bulo como FALSO. La comparativa manipulaba la escala: confrontaba un mapa de temperaturas con otro de índice UV o utilizaba mapas de diferentes cadenas y épocas con códigos cromáticos distintos.",
          methodQuestion: "¿Qué pistas son esenciales comprobar antes de comparar imágenes?",
          methodPills: ["Fecha y procedencia real", "Variable física representada", "Escala y leyenda de colores"]
        },
        {
          id: "b3",
          stepNumber: "3 de 3",
          badge: "Construye tu Método",
          sourceRef: "P2 p.20 y p.22",
          headline: "¿Qué preguntas os haríais para verificar una información?",
          contextText: "Explora las 4 preguntas maestras propuestas por Verificat para auditar cualquier mensaje antes de creerlo o difundirlo:",
          isMethodBuilder: true,
          questions: [
            {
              id: "q1",
              number: "1",
              text: "¿Cómo me quiere hacer reaccionar?",
              focus: "Emoción y Sesgo",
              desc: "Los desinformadores apelan al miedo, la indignación o la sorpresa rápida para anular nuestro pensamiento analítico."
            },
            {
              id: "q2",
              number: "2",
              text: "¿Quién hay tras la información?",
              focus: "Autoría y Fuentes",
              desc: "Comprueba si firma una institución técnica, una persona especialista o una cuenta anónima con intereses comerciales."
            },
            {
              id: "q3",
              number: "3",
              text: "¿Qué dicen otras fuentes fiables?",
              focus: "Contraste Cruzado",
              desc: "Verifica si agencias científicas u otros medios independientes contrastados confirman el hallazgo."
            },
            {
              id: "q4",
              number: "4",
              text: "¿Qué pruebas aporta?",
              focus: "Evidencia Documentada",
              desc: "Exige datos, metodología y enlaces comprobables; desconfía de afirmaciones grandilocuentes sin soporte."
            }
          ],
          feedbackTitle: "Las cuatro preguntas de verificación (P2 p.22)",
          feedbackBody: "Hacerte estas cuatro preguntas antes de compartir un titular frena en seco la propagación de desinformación.",
          takeaway: "Verificar no es desconfiar de todo, sino dotarse de un método ordenado para distinguir hechos de manipulaciones."
        }
      ],
      closing: {
        title: "Antes de compartir, detente y comprueba",
        subtitle: "Has completado la auditoría con la metodología Verificat",
        takeaways: [
          "Casos reales: El rigor científico confirma impactos reales (cosechas) y desmonta manipulaciones visuales (mapas).",
          "Duda metódica: Decir 'Necesito comprobarlo' no es ignorancia, es la actitud más inteligente frente a un titular.",
          "Las 4 preguntas maestras: Emoción, Autoría, Contraste y Pruebas."
        ],
        sourceNote: "Basado en los casos prácticos y preguntas de verificación de Verificat / Desfake (Presentación CIVICAN.pdf, p.2-17, 20-22)."
      }
    },

    /* ==========================================================================
       JUEGO C: ¿VERDE DE VERDAD? (P2 - Caso H&M y Greenwashing)
       ========================================================================== */
    {
      id: "juego-c",
      title: "¿Verde de verdad?",
      typology: "Auditoría de Campaña / Detección de Greenwashing",
      icon: "fa-tags",
      badgeColor: "var(--terracota)",
      invitation: "Explora una campaña y descubre cómo comprobar su promesa.",
      duration: "2-3 min",
      cta: "Examinar promesas",
      summary: "Tres capas de análisis sobre la campaña real de recogida y reciclaje de ropa de H&M ('Let's Close The Loop') analizada en la presentación.",
      sourceRef: "Presentación CIVICAN.pdf (P2, p.30-34, 38-39)",
      layers: [
        {
          id: "c1",
          stepNumber: "Capa 1 de 3",
          name: "La Campaña Publicitaria",
          sourceRef: "P2 p.30-31",
          subtitle: "Campaña 'Let's Close The Loop' (H&M)",
          question: "¿Qué puede buscar esta marca haciendo este tipo de publicidad?",
          claimPresented: "«Trae tu ropa usada a nuestras tiendas para reciclarla y cerremos juntos el ciclo de la moda sin residuos.»",
          isReflectionMulti: true,
          options: [
            { id: "c1-o1", text: "Comunicar una iniciativa ambiental corporativa" },
            { id: "c1-o2", text: "Mejorar la reputación e imagen de marca" },
            { id: "c1-o3", text: "Fidelizar a la clientela con cupones de descuento" },
            { id: "c1-o4", text: "Incentivar que los clientes vuelvan a tienda y compren más prendas" },
            { id: "c1-o5", text: "No lo sé con certeza" }
          ],
          feedbackTitle: "Hipótesis sobre la comunicación publicitaria",
          feedbackBody: "Como plantea la diapositiva P2 p.30-31, una campaña publicitaria de una multinacional de moda rápida persigue múltiples objetivos a la vez: imagen, fidelización e incentivo al consumo continuo.",
          insight: "Fijarse solo en la estética verde del anuncio oculta las preguntas de fondo: ¿adónde va realmente esa ropa?"
        },
        {
          id: "c2",
          stepNumber: "Capa 2 de 3",
          name: "La Investigación Periodística",
          sourceRef: "P2 p.33-34",
          subtitle: "Investigación del diario sueco Aftonbladet",
          question: "¿Cómo comprobaron los periodistas qué ocurría realmente con la ropa entregada en las tiendas?",
          options: [
            { id: "c2-opt1", text: "Colocaron diez rastreadores GPS ocultos en diez prendas donadas", isKey: true },
            { id: "c2-opt2", text: "Se limitaron a confiar en el informe de sostenibilidad de la marca", isKey: false },
            { id: "c2-opt3", text: "Hicieron una encuesta de opinión en redes sociales", isKey: false }
          ],
          feedbackTitle: "El método de los rastreadores GPS (P2 p.33)",
          feedbackBody: "El periódico Aftonbladet introdujo rastreadores satelitales en prendas entregadas en tiendas de la marca. El seguimiento documentó que la ropa no se reciclaba en circuito cerrado local: viajó miles de kilómetros en barco y camión, y varias prendas acabaron en vertederos textiles o en el mercado de segunda mano en África.",
          insight: "Auditar la realidad exige pruebas operativas físicas y trazabilidad independiente, no solo declaraciones corporativas."
        },
        {
          id: "c3",
          stepNumber: "Capa 3 de 3",
          name: "Definición y Conclusión",
          sourceRef: "P2 p.36, 38-39 y P1 p.14-15",
          subtitle: "Comprender el Greenwashing",
          question: "¿Qué debemos comprobar siempre antes de aceptar una promesa de reciclaje?",
          options: [
            { id: "c3-opt1", text: "Comprobar con datos independientes qué ocurre realmente con los materiales", isKey: true },
            { id: "c3-opt2", text: "Basta con que el anuncio use fondos verdes, música emotiva y letras ECO", isKey: false },
            { id: "c3-opt3", text: "Basta con que la empresa sea una multinacional conocida", isKey: false }
          ],
          feedbackTitle: "¿Qué es el Greenwashing? (P2 p.36)",
          feedbackBody: "La presentación define el greenwashing como la práctica de proyectar una imagen engañosa de responsabilidad ecológica sin pruebas suficientes ni coherencia con el modelo de negocio global.",
          takeaway: "Este caso no significa que todo reciclaje sea inútil, pero nos enseña a exigir pruebas proporcionales. Como recuerda Andreu Escrivà (P1 p.15), la solución más ecológica sigue siendo comprar menos, cuidar y usar más tiempo lo que ya tenemos."
        }
      ],
      closing: {
        title: "No todo lo verde es un engaño, pero exige comprobación",
        subtitle: "Has completado la auditoría de la campaña analizada en la charla",
        takeaways: [
          "Trazabilidad real: El caso de los rastreadores GPS demuestra que prometer reciclaje no garantiza que ocurra.",
          "Definición de Greenwashing: Apariencia publicitaria de sostenibilidad sin respaldo operativo medible.",
          "Prioridad de recursos: Reciclar no sustituye reducir la sobreproducción y alargar la vida de las prendas."
        ],
        sourceNote: "Basado en la investigación de Aftonbladet y el análisis de greenwashing de Verificat (Presentación CIVICAN.pdf, p.30-34, 36-39)."
      }
    },

    /* ==========================================================================
       JUEGO D: MISIÓN: ROMPER LA CADENA (P2 - EFECT y Retardismo)
       ========================================================================== */
    {
      id: "juego-d",
      title: "Misión: romper la cadena",
      typology: "Escape Room Digital / Desmontar el Retardismo",
      icon: "fa-link-slash",
      badgeColor: "var(--azul-tinta)",
      invitation: "Descubre las estrategias que frenan la acción climática.",
      duration: "3-4 min",
      cta: "Iniciar la misión",
      summary: "Desbloquea las tres piezas clave (Pruebas, Estrategias EFECT y Acción Colectiva) para detener los discursos de inacción y retardismo.",
      sourceRef: "Presentación CIVICAN.pdf (P2, p.22-28, 35-42)",
      trials: [
        {
          id: "d1",
          stepNumber: "Enigma 1 de 3",
          keyName: "Pruebas",
          badge: "Las 4 Llaves de Verificación",
          sourceRef: "P2 p.22",
          title: "Empareja cada pregunta de verificación con su objetivo",
          situation: "Para desbloquear la Llave de las PRUEBAS, empareja correctamente una de las 4 preguntas con su finalidad metodológica:",
          pairingTask: {
            questionGiven: "¿Cómo me quiere hacer reaccionar esta información?",
            options: [
              { id: "pair-1", text: "Examinar la emoción y evitar compartir por impulso", isCorrect: true },
              { id: "pair-2", text: "Comprobar los títulos universitarios del autor", isCorrect: false },
              { id: "pair-3", text: "Buscar únicamente a personas que opinen igual que yo", isCorrect: false }
            ]
          },
          feedbackTitle: "¡Llave de Pruebas desbloqueada!",
          feedbackBody: "Revisar la emoción que nos suscita un titular es el primer filtro. Sentir indignación o euforia no hace que algo sea cierto ni falso, pero nos alerta de un posible anzuelo para que compartamos sin pensar."
        },
        {
          id: "d2",
          stepNumber: "Enigma 2 de 3",
          keyName: "Estrategias",
          badge: "Estrategias de Desinformación EFECT",
          sourceRef: "P2 p.23-28",
          title: "¿Qué estrategia EFECT describe este mecanismo?",
          situation: "Lee la definición extraída de las diapositivas de Verificat e identifica a cuál de las 5 estrategias corresponde:",
          efectChallenge: {
            definition: "«Seleccionar y mostrar únicamente datos o periodos favorables a una postura, ignorando deliberadamente el conjunto de la evidencia científica.»",
            options: [
              { id: "efect-1", name: "Cherry Picking (Selección sesgada de datos)", isCorrect: true, desc: "P2 p.26: Escoger solo la cereza que conviene para falsear la tendencia general." },
              { id: "efect-2", name: "Falsos Expertos", isCorrect: false, desc: "P2 p.24: Presentar a personas sin competencia acreditada en la materia." },
              { id: "efect-3", name: "Expectativas Imposibles", isCorrect: false, desc: "P2 p.25: Exigir certezas o precisiones absolutas antes de tomar cualquier medida." },
              { id: "efect-4", name: "Falacias Lógicas", isCorrect: false, desc: "P2 p.27: Argumentos que contienen errores de razonamiento." },
              { id: "efect-5", name: "Teorías de la Conspiración", isCorrect: false, desc: "P2 p.28: Atribuir hechos a planes secretos sin pruebas contrastables." }
            ]
          },
          feedbackTitle: "¡Llave de Estrategias desbloqueada!",
          feedbackBody: "¡Correcto! El 'Cherry Picking' (P2 p.26) es una de las tácticas más habituales: elegir un año atípico o un fragmento de gráfico para ocultar la tendencia global del calentamiento."
        },
        {
          id: "d3",
          stepNumber: "Enigma 3 de 3",
          keyName: "Acción",
          badge: "Desmontar el Retardismo",
          sourceRef: "P2 p.36-42 y P1 p.3, 19-26",
          title: "¿Qué consecuencias producen las narrativas de retardismo?",
          situation: "El retardismo acepta que el cambio climático existe, pero difunde argumentos para posponer la acción. ¿Qué efecto busca este mensaje?",
          narrativeClaim: "«Como la tecnología del futuro lo solucionará todo y nuestras acciones individuales son insignificantes, no tiene sentido cambiar nada ahora.»",
          options: [
            { id: "d3-opt1", text: "Desmovilizar a la ciudadanía y retrasar regulaciones colectivas efectivas", isCorrect: true },
            { id: "d3-opt2", text: "Fomentar un debate científico constructivo y riguroso", isCorrect: false },
            { id: "d3-opt3", text: "Impulsar de inmediato la transición energética local", isCorrect: false }
          ],
          feedbackTitle: "¡Misión Cumplida! Cadena de retardismo rota",
          feedbackBody: "La presentación P2 p.36-42 identifica cuatro narrativas retardistas: tecnooptimismo ciego, greenwashing, culpabilización individual y catastrofismo paralizante. Todas buscan un mismo resultado: que nada cambie.",
          takeaway: "Frente al retardismo, Andreu Escrivà propone la acción colectiva: redes comunitarias, infraestructuras públicas y exigencia de políticas basadas en la ciencia."
        }
      ],
      closing: {
        title: "¡Cadena de desinformación detenida!",
        subtitle: "Has transformado las trampas del retardismo en acción informada",
        takeaways: [
          "Las 4 preguntas maestras: Emoción, Autoría, Contraste y Evidencia.",
          "El acrónimo EFECT: Expertos falsos, Falacias, Expectativas imposibles, Cherry picking y Conspiración.",
          "Superar el retardismo: La tecnología ayuda, pero no sustituye la organización comunitaria y las decisiones valientes hoy."
        ],
        sourceNote: "Conceptos inspirados en la metodología EFECT de Verificat (P2 p.22-28) y el análisis de retardismo y acción colectiva de Andreu Escrivà (P1 p.19-26, P2 p.35-42)."
      }
    }
  ]
};
