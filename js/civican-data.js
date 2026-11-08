/**
 * CIVICAN: TU IMPACTO EN JUEGO
 * Modelo de datos editorial estructurado para las 4 experiencias interactivas.
 * Fuentes teóricas y metodológicas:
 * 1. Andreu Escrivà (Límites materiales, acción colectiva y transición ecológica justa).
 * 2. Verificat / Desfake (Metodología de verificación, alfabetización mediática y detección de greenwashing).
 */

const CIVICAN_DATA = {
  meta: {
    title: "Tu impacto en juego",
    subtitle: "Un futuro sostenible empieza por mirar y decidir",
    location: "CIVICAN - Fundación Caja Navarra",
    version: "1.0.0",
    sources: [
      {
        name: "Andreu Escrivà",
        role: "Ambientólogo, doctor en Biodiversidad y divulgador",
        contribution: "Perspectiva sobre límites biofísicos del planeta, transición ecológica sin culpabilización individual, fomento de la acción colectiva y creación de infraestructuras comunitarias (reparación, sombras públicas, movilidad compartida)."
      },
      {
        name: "Verificat / Desfake",
        role: "Plataforma de periodismo de verificación y educación mediática",
        contribution: "Estrategias de fact-checking climático (estrategia EFECT), formulación de preguntas críticas (quién respalda la información, qué fuentes se aportan, qué contexto falta) y análisis de greenwashing publicitario."
      }
    ]
  },

  experiences: [
    {
      id: "juego-a",
      title: "Transforma tu barrio",
      typology: "Simulación Urbana / Toma de Decisiones",
      icon: "fa-city",
      badgeColor: "var(--verde-barrio)",
      invitation: "Toma tres decisiones para vivir mejor utilizando menos recursos.",
      duration: "3-4 min",
      cta: "Transformar el barrio",
      summary: "Descubre cómo las decisiones compartidas en urbanismo, consumo y movilidad generan bienestar colectivo duradero.",
      sourceRef: "Basado en la charla de Andreu Escrivà (acción colectiva y límites físicos) y criterios Verificat",
      rounds: [
        {
          id: "a1",
          stepNumber: "1 de 3",
          badge: "Consumo y Reparación",
          situation: "Hay objetos que se dejan de usar y vecinos que necesitan herramientas. ¿Qué impulsarías?",
          illustrationType: "neighborhood-repair",
          options: [
            {
              id: "a1-opt1",
              title: "Taller de reparación y biblioteca de objetos",
              desc: "Crear un espacio comunal para reparar averías y prestar herramientas de uso puntual.",
              opportunity: "Alarga la vida útil de los objetos y evita compras innecesarias.",
              condition: "Requiere organizar turnos vecinales, mantenimiento y normas de uso.",
              feedback: "Reparar y compartir permite acceder a bienes sin multiplicar la extracción de materiales. Es un modelo colaborativo con impacto real.",
              isOptimal: true
            },
            {
              id: "a1-opt2",
              title: "Campaña para sustituir objetos por modelos 'eco'",
              desc: "Incentivar que cada vecino compre versiones nuevas catalogadas como ecológicas.",
              opportunity: "Promueve tecnologías con menor consumo puntual.",
              condition: "Fabricar nuevos objetos sigue requiriendo materias primas y energía.",
              feedback: "Antes de reemplazar algo que funciona, conviene revisar su ciclo de vida: la etiqueta 'eco' no anula el impacto de producir un objeto nuevo.",
              isOptimal: false
            },
            {
              id: "a1-opt3",
              title: "Mejorar solo la recogida de reciclaje",
              desc: "Instalar más contenedores para facilitar el desecho selectivo en la acera.",
              opportunity: "Facilita la gestión de residuos ya generados.",
              condition: "El reciclaje no recupera el 100% ni evita la generación continua de residuos.",
              feedback: "Reciclar es fundamental, pero insuficiente por sí solo: debe combinarse prioritariamente con reducir y reparar para disminuir la presión material.",
              isOptimal: false
            }
          ],
          microChallenge: {
            title: "Mira este mensaje publicitario",
            claim: "«Si un producto se recicla, comprarlo no tiene ningún impacto ambiental.»",
            question: "¿Qué aspecto crucial se ignora en este mensaje?",
            options: [
              { id: "mc-1", text: "La energía, agua y materias primas empleadas en su fabricación y transporte.", correct: true },
              { id: "mc-2", text: "Únicamente el color del contenedor donde se deposita.", correct: false },
              { id: "mc-3", text: "Nada, la afirmación es totalmente correcta.", correct: false }
            ],
            feedback: "Fabricar y transportar cualquier objeto consume energía y recursos no renovables. El reciclaje mitiga el final de vida, pero no borra el ciclo previo."
          }
        },
        {
          id: "a2",
          stepNumber: "2 de 3",
          badge: "Movilidad Sostenible",
          situation: "El barrio busca mejorar sus desplazamientos diarios y reducir humos y ruido. ¿Por dónde empezarías?",
          illustrationType: "neighborhood-mobility",
          options: [
            {
              id: "a2-opt1",
              title: "Conectar transporte público y recorridos peatonales accesibles",
              desc: "Mejorar frecuencias de bus, carriles seguros y aceras amplias con sombra.",
              opportunity: "Garantiza movilidad accesible para todas las edades y reduce el tráfico.",
              condition: "Exige inversión pública sostenida, coordinación municipal y seguridad vial.",
              feedback: "El transporte colectivo y activo aprovecha mejor el espacio urbano y es inclusivo para jóvenes, mayores y personas con movilidad reducida.",
              isOptimal: true
            },
            {
              id: "a2-opt2",
              title: "Ayudar a sustituir todos los coches por eléctricos",
              desc: "Subvencionar la compra de vehículos privados eléctricos y puntos de recarga.",
              opportunity: "Reduce las emisiones locales directas en tubo de escape.",
              condition: "No soluciona atascos, espacio público ocupado ni la extracción masiva de minerales para baterías.",
              feedback: "La electrificación del transporte es útil, pero mantener la misma flota de vehículos privados consume cantidades enormes de litio, cobre y espacio.",
              isOptimal: false
            },
            {
              id: "a2-opt3",
              title: "Pedir únicamente que cada persona camine más",
              desc: "Lanzar una campaña de concienciación individual para hacer deporte caminando.",
              opportunity: "Fomenta hábitos saludables en quienes tienen trayectos cortos.",
              condition: "No atiende a distancias largas, climatología adversa ni personas con movilidad reducida.",
              feedback: "La voluntad individual no basta sin infraestructura: hacen falta rutas seguras, sombra y alternativas viables de transporte público.",
              isOptimal: false
            }
          ],
          microChallenge: {
            title: "Mensaje en redes sobre tecnología",
            claim: "«Una nueva tecnología resolverá la movilidad urbana sin que tengamos que cambiar nuestras ciudades.»",
            question: "¿Cuál es la respuesta con mayor rigor crítico?",
            options: [
              { id: "mc-2-1", text: "Pedir datos contrastados de plazos y comparar con soluciones colectivas disponibles hoy.", correct: true },
              { id: "mc-2-2", text: "Aceptar la promesa y no realizar ninguna mejora urbana hasta que llegue.", correct: false },
              { id: "mc-2-3", text: "Rechazar de antemano cualquier innovación técnica.", correct: false }
            ],
            feedback: "La tecnología apoya la transición, pero confiar ciegamente en milagros futuros no debe retrasar medidas comprobadas que podemos aplicar hoy."
          }
        },
        {
          id: "a3",
          stepNumber: "3 de 3",
          badge: "Espacio Público y Convivencia",
          situation: "La plaza central es una explanada de hormigón que en verano quema y no tiene vida. ¿Cómo organizarías la mejora?",
          illustrationType: "neighborhood-square",
          options: [
            {
              id: "a3-opt1",
              title: "Diseño colaborativo de arbolado, bancos y fuentes",
              desc: "Reunir a vecinos, comerciantes y técnicos para crear zonas de sombra natural y encuentro.",
              opportunity: "Baja la temperatura urbana, fomenta la vida de barrio y mitiga olas de calor.",
              condition: "Requiere consenso entre vecinos, riego eficiente y mantenimiento de zonas verdes.",
              feedback: "El espacio público verde es un refugio climático y un punto de unión comunitaria. La acción colectiva transforma el entorno cotidiano.",
              isOptimal: true
            },
            {
              id: "a3-opt2",
              title: "Difundir consejos para que cada uno se proteja en casa",
              desc: "Repartir folletos recomendando no salir en horas de sol y poner aire acondicionado.",
              opportunity: "Aporta consejos prácticos inmediatos de autoprotección.",
              condition: "Excluye a quienes no tienen climatización y abandona la vida en la calle.",
              feedback: "Aislarse en casa con climatizadores individuales incrementa la factura eléctrica y calienta aún más el exterior. La solución debe ser comunitaria.",
              isOptimal: false
            },
            {
              id: "a3-opt3",
              title: "Esperar a un proyecto arquitectónico futurista premiado",
              desc: "Posponer la intervención hasta conseguir un diseño monumental de alta tecnología.",
              opportunity: "Podría generar un edificio icónico a largo plazo.",
              condition: "El barrio necesita sombra y salud ahora; los proyectos faraónicos suelen demorarse años.",
              feedback: "Las mejoras ecológicas no necesitan esperar a megaproyectos: plantar árboles autóctonos y habilitar sombras es rápido, asequible y eficaz.",
              isOptimal: false
            }
          ],
          microChallenge: {
            title: "Reflexión colectiva",
            claim: "«Como nuestras acciones vecinales son pequeñas, no merece la pena organizarse ni pedir cambios.»",
            question: "¿Qué efecto produce esta afirmación?",
            options: [
              { id: "mc-3-1", text: "Paraliza y desanima la acción comunitaria, favoreciendo que nada mejore.", correct: true },
              { id: "mc-3-2", text: "Estimula el debate científico riguroso.", correct: false },
              { id: "mc-3-3", text: "Demuestra que la responsabilidad es 100% de los individuos aislados.", correct: false }
            ],
            feedback: "El discurso del derrotismo (retardismo) desmoviliza a la ciudadanía. Las grandes transformaciones sociales siempre han nacido de la cooperación local."
          }
        }
      ],
      closing: {
        title: "Un barrio sostenible se construye en común",
        subtitle: "Has completado la transformación de tu entorno",
        takeaways: [
          "Aprovechar y reparar lo que ya existe reduce drásticamente la extracción de recursos.",
          "La infraestructura compartida (transporte público, plazas verdes) beneficia a toda la comunidad.",
          "La responsabilidad ecológica no es una carga individual solitaria: requiere organización colectiva e instituciones comprometidas."
        ],
        sourceNote: "Conceptos inspirados en las ponencias de Andreu Escrivà sobre urbanismo ecológico y decrecimiento material."
      }
    },

    {
      id: "juego-b",
      title: "Detectives del clima",
      typology: "Trivial de Investigación / Fact-Checking",
      icon: "fa-magnifying-glass-chart",
      badgeColor: "var(--azul-detectives)",
      invitation: "Investiga tres mensajes antes de creerlos o compartirlos.",
      duration: "3-4 min",
      cta: "Investigar mensajes",
      summary: "Aprende a identificar sesgos gráficos, promesas vacías y argumentos retardistas utilizando herramientas reales de verificación.",
      sourceRef: "Metodología Verificat / Desfake (Estrategia EFECT de verificación de fuentes e imágenes)",
      cases: [
        {
          id: "b1",
          stepNumber: "Caso 1 de 3",
          title: "La gráfica recortada",
          badge: "Datos y Estadísticas",
          headline: "«El consumo de recursos y materiales ya está bajando a nivel global»",
          sourceAuthor: "Canal Digital 'EcoTrend News'",
          publishedTime: "Hace 2 horas · 15.4K visualizaciones",
          chartPreviewType: "truncated",
          tools: {
            fuente: "La publicación proviene de un canal comercial que no enlaza el estudio original ni la base de datos completa.",
            pruebas: "Al ampliar la serie temporal completa (2000-2025), el consumo subió de 100 a 130 puntos, y solo cayó 5 puntos en el último trimestre.",
            contexto: "Recortar la ventana temporal (mostrar solo el descenso de 130 a 125) oculta que la tendencia general del siglo XXI sigue en máximos históricos."
          },
          question: "¿Qué conclusión está verdaderamente respaldada por los datos completos?",
          options: [
            {
              id: "b1-opt1",
              text: "La bajada reciente demuestra una reducción sostenida e irreversible.",
              feedback: "No es correcto. Un descenso puntual de 3 meses no demuestra un cambio estructural de tendencia si se observa la gráfica histórica.",
              isCorrect: false
            },
            {
              id: "b1-opt2",
              text: "Hay un descenso puntual reciente, pero falta contexto para afirmar una bajada global sostenida.",
              feedback: "¡Exacto! Comprobar el período completo, la escala y la fuente original evita caer en engaños por gráficas sesgadas.",
              isCorrect: true
            },
            {
              id: "b1-opt3",
              text: "Todas las gráficas de datos estadísticos son automáticamente falsas.",
              feedback: "Cuidado: el escepticismo extremo tampoco ayuda. Los datos científicos rigurosos son imprescindibles; la clave es saber auditarlos.",
              isCorrect: false
            }
          ]
        },
        {
          id: "b2",
          stepNumber: "Caso 2 de 3",
          title: "La prenda verde",
          badge: "Greenwashing Publicitario",
          headline: "«Camiseta 100% ECO: Vístete a la moda sin ningún impacto en el planeta»",
          sourceAuthor: "Anuncio de marca internacional de moda rápida",
          publishedTime: "Campaña patrocinada en redes sociales",
          chartPreviewType: "shirt",
          tools: {
            fuente: "Es un mensaje publicitario autofinanciado por la marca para incentivar la compra impulsiva.",
            pruebas: "La letra pequeña indica que solo el envoltorio plástico contiene un 20% de material reciclado; no hay datos de la tela ni tintes.",
            contexto: "Fabricar una camiseta de algodón o poliéster requiere miles de litros de agua, pesticidas y energía. Prometer 'cero impacto' es engañoso."
          },
          question: "¿Está respaldada la promesa de 'compra sin impacto'?",
          options: [
            {
              id: "b2-opt1",
              text: "Sí, porque el anuncio incluye un sello verde y la palabra ECO en mayúsculas.",
              feedback: "Los colores verdes y logotipos no regulados son recursos clásicos de marketing; no equivalen a una certificación auditada.",
              isCorrect: false
            },
            {
              id: "b2-opt2",
              text: "No está respaldada: una mejora parcial en el embalaje no elimina el impacto ecológico de la prenda.",
              feedback: "¡Muy bien visto! Es una técnica típica de 'Greenwashing': resaltar un detalle menor para ocultar el impacto del producto completo.",
              isCorrect: true
            },
            {
              id: "b2-opt3",
              text: "Toda ropa que mencione reciclaje es una estafa legal.",
              feedback: "El reciclaje real es positivo, pero las afirmaciones absolutas ('cero impacto') deben ser examinadas con lupa.",
              isCorrect: false
            }
          ]
        },
        {
          id: "b3",
          stepNumber: "Caso 3 de 3",
          title: "Esperar al invento milagroso",
          badge: "Discursos de Retardismo",
          headline: "«La inteligencia artificial y la fusión arreglarán el clima: no necesitamos cambiar nada ahora»",
          sourceAuthor: "Columna de opinión 'TecnoFuturo'",
          publishedTime: "Artículo viral en foros tecnológicos",
          chartPreviewType: "tech",
          tools: {
            fuente: "Es una columna de opinión especulativa, no un informe de viabilidad técnica o científica con fechas.",
            pruebas: "No se especifica cuándo estará disponible dicha tecnología a escala global ni cuánta energía o materiales consumirá.",
            contexto: "Apelar a soluciones milagrosas lejanas se utiliza a menudo para retrasar regulaciones ambientales y cambios de modelo actuales."
          },
          question: "¿Qué postura ayuda a avanzar con mayor rigor?",
          options: [
            {
              id: "b3-opt1",
              text: "Esperar pasivamente sin revisar consumos ni aplicar medidas en la actualidad.",
              feedback: "Aplazar las decisiones aumenta el riesgo ambiental y la pérdida de biodiversidad.",
              isCorrect: false
            },
            {
              id: "b3-opt2",
              text: "Exigir pruebas científicas, apoyar la innovación pero aplicar hoy soluciones comunitarias ya contrastadas.",
              feedback: "¡Excelente! La innovación es una gran aliada, pero no reemplaza la necesidad de reducir la sobreexplotación de recursos hoy.",
              isCorrect: true
            },
            {
              id: "b3-opt3",
              text: "Rechazar cualquier avance científico o desarrollo tecnológico.",
              feedback: "La tecnología aporta sensores, energías renovables y medicina. Lo cuestionable es usarla como excusa para la inacción.",
              isCorrect: false
            }
          ]
        }
      ],
      closing: {
        title: "Antes de compartir, detente y comprueba",
        subtitle: "Has completado la investigación periodística",
        takeaways: [
          "¿Quién lo dice? Identifica si es publicidad, opinión interesada o una fuente verificable.",
          "¿Qué pruebas aporta? No te fíes de sellos autoproclamados ni de fragmentos de gráficas recortadas.",
          "¿Qué contexto falta? Cuidado con las promesas de impacto cero o las soluciones mágicas que invitan a la pasividad."
        ],
        sourceNote: "Basado en los talleres de Verificat y Desfake para detectar desinformación y pensamiento crítico."
      }
    },

    {
      id: "juego-c",
      title: "¿Verde de verdad?",
      typology: "Auditoría de Escaparate / Greenwashing",
      icon: "fa-tags",
      badgeColor: "var(--terracota)",
      invitation: "Abre tres promesas verdes y descubre qué las respalda.",
      duration: "2-3 min",
      cta: "Examinar promesas",
      summary: "Explora tres objetos del escaparate de consumo: zapatilla, teléfono y servicio de reparto. Audita sus capas y clasifica con criterio.",
      sourceRef: "Casos prácticos de publicidad y códigos de alegaciones ambientales (Verificat)",
      objects: [
        {
          id: "c1",
          name: "Zapatilla Urbana",
          tag: "Calzado y Moda",
          icon: "fa-shoe-prints",
          claim: "«Caja hecha íntegramente de cartón 100% reciclado»",
          layers: {
            promesa: "El fabricante destaca con grandes tipografías su compromiso con el cartón reciclado en la caja de embalaje.",
            pruebas: "La ficha técnica y la certificación independiente confirman que el cartón de la caja es efectivamente reciclado.",
            loQueFalta: "No se facilita ninguna información sobre el origen del cuero sintético, el pegamento de la suela ni las condiciones de fabricación."
          },
          expectedClassification: "respaldada-alcance",
          question: "¿Cómo clasificarías esta afirmación publicitaria?",
          options: [
            {
              id: "respaldada-alcance",
              label: "Respaldada en su alcance específico",
              desc: "Las pruebas demuestran lo que afirma sobre la caja, aunque no dice nada del resto de la zapatilla.",
              isCorrect: true,
              explanation: "¡Exacto! Las pruebas confirman lo relativo a la caja. No comete fraude sobre el cartón, pero su alcance es limitado al embalaje, no al calzado."
            },
            {
              id: "faltan-pruebas",
              label: "Faltan pruebas para la caja",
              desc: "No hay ninguna evidencia que acredite el cartón reciclado.",
              isCorrect: false,
              explanation: "En este caso concreto, la ficha independiente sí avala el cartón de la caja. La prudencia exige no rechazar lo que sí está probado."
            },
            {
              id: "contradice-pruebas",
              label: "Contradice abiertamente los hechos",
              desc: "Se ha demostrado que la caja es de plástico virgen.",
              isCorrect: false,
              explanation: "Las pruebas no contradicen la caja. Lo importante es distinguir entre una afirmación cierta de alcance pequeño y un fraude total."
            }
          ]
        },
        {
          id: "c2",
          name: "Teléfono Móvil",
          tag: "Electrónica de Consumo",
          icon: "fa-mobile-screen-button",
          claim: "«El teléfono eterno: diseñado para durar toda la vida sin residuos»",
          layers: {
            promesa: "Un eslogan publicitario afirma que este terminal nunca se quedará obsoleto ni generará chatarra electrónica.",
            pruebas: "Solo se muestra un render 3D con un lema comercial. No se detallan piezas desmontables ni disponibilidad de recambios.",
            loQueFalta: "Faltan años garantizados de actualizaciones de software, manuales de reparación abiertos y precio de baterías de sustitución."
          },
          expectedClassification: "faltan-pruebas",
          question: "¿Cómo clasificarías esta promesa comercial?",
          options: [
            {
              id: "respaldada-alcance",
              label: "Respaldada en su alcance",
              desc: "El render 3D demuestra que durará toda la vida.",
              isCorrect: false,
              explanation: "Una imagen de marketing no es una prueba de durabilidad ni garantiza repuestos a largo plazo."
            },
            {
              id: "faltan-pruebas",
              label: "Faltan pruebas determinantes",
              desc: "Una promesa tan absoluta requiere pruebas técnicas y garantías de soporte que aquí no aparecen.",
              isCorrect: true,
              explanation: "¡Correcto! Afirmar que dura 'para siempre' requiere planes de reparación, derecho a reparar y soporte de software que la marca no acredita."
            },
            {
              id: "contradice-pruebas",
              label: "Contradice pruebas documentadas",
              desc: "Existe una sentencia que demuestra que se rompe a los dos días.",
              isCorrect: false,
              explanation: "No tenemos pruebas de que sea inservible, sino ausencia total de datos técnicos que respalden su grandilocuente afirmación."
            }
          ]
        },
        {
          id: "c3",
          name: "Servicio de Reparto",
          tag: "Logística Urbana",
          icon: "fa-truck-fast",
          claim: "«Garantizado: Todos nuestros envíos a domicilio llegan con 0% de plásticos de un solo uso»",
          layers: {
            promesa: "La plataforma de comercio electrónico asegura que en ningún pedido se utilizan bolsas plásticas desechables.",
            pruebas: "En las propias auditorías de la empresa y quejas de clientes del mismo mes, se documenta el uso de fundas de plástico virgen en un 35% de paquetes.",
            loQueFalta: "Un sistema estandarizado de empaque retornable que funcione en toda la red de reparto."
          },
          expectedClassification: "contradice-pruebas",
          question: "¿Cómo clasificarías esta afirmación?",
          options: [
            {
              id: "respaldada-alcance",
              label: "Respaldada en su alcance",
              desc: "Es una promesa de la empresa, por lo que es válida.",
              isCorrect: false,
              explanation: "Las declaraciones corporativas deben coincidir con la operativa real comprobada."
            },
            {
              id: "faltan-pruebas",
              label: "Faltan pruebas para evaluarlo",
              desc: "No hay ninguna información sobre los paquetes.",
              isCorrect: false,
              explanation: "Aquí sí disponemos de auditorías de la propia empresa que contradicen directamente el lema del '0%'."
            },
            {
              id: "contradice-pruebas",
              label: "Contradice las pruebas disponibles",
              desc: "La promesa dice 'todos', pero las auditorías del mismo período registran plástico de un solo uso en un tercio de envíos.",
              isCorrect: true,
              explanation: "¡Exacto! Cuando una promesa usa términos absolutos ('todos', 'cero residuos') pero la realidad documentada muestra excepciones continuadas, la afirmación contradice los hechos."
            }
          ]
        }
      ],
      closing: {
        title: "No todo lo verde es un engaño, pero exige precisión",
        subtitle: "Has completado la auditoría del escaparate",
        takeaways: [
          "Distingue la parte del todo: una caja reciclada no hace que un producto entero sea ecológico.",
          "Exige derechos y repuestos: la durabilidad no es un eslogan, es diseño reparable y soporte legal.",
          "Compara las afirmaciones absolutas ('100%', 'cero emisiones') con las auditorías operativas reales."
        ],
        sourceNote: "Casos simulados con fines pedagógicos basados en las guías de alegaciones ambientales de Verificat."
      }
    },

    {
      id: "juego-d",
      title: "Misión: romper la cadena",
      typology: "Escape Room Digital / Romper la Cadena",
      icon: "fa-link-slash",
      badgeColor: "var(--azul-tinta)",
      invitation: "Supera tres pruebas para frenar un mensaje engañoso.",
      duration: "3-4 min",
      cta: "Iniciar la misión",
      summary: "Una cadena viral de desinformación está a punto de propagarse. Desbloquea las llaves de Fuente, Contexto y Acción para reconvertirla en una red de cooperación vecinal.",
      sourceRef: "Estrategias de frenado de bulos y alfabetización cívica (Verificat & Andreu Escrivà)",
      trials: [
        {
          id: "d1",
          stepNumber: "Enigma 1 de 3",
          keyName: "Fuente",
          title: "¿Quién respalda esta afirmación?",
          claimViral: "«Un nuevo estudio secreto prueba que el reciclaje permite consumir plásticos sin ningún límite.»",
          situation: "Para desbloquear la Llave de la Fuente, debes seleccionar qué perfil ofrece los elementos más sólidos para verificar la validez técnica de la afirmación.",
          cards: [
            {
              id: "d1-card1",
              name: "Influencer famoso con 2 millones de seguidores",
              desc: "Comparte el titular alarmista en vídeo con música tensa, pero no cita el estudio ni la institución científica que lo firma.",
              isCorrect: false,
              feedback: "La popularidad o el número de seguidores en redes sociales no garantiza la veracidad técnica de una afirmación."
            },
            {
              id: "d1-card2",
              name: "Investigadora en materiales de una universidad pública",
              desc: "Publica un artículo de revisión por pares con metodología abierta, fuentes bibliográficas y datos contrastables.",
              isCorrect: true,
              feedback: "¡Llave conseguida! La competencia técnica, el método explícito y las fuentes públicas auditables son la base del rigor."
            },
            {
              id: "d1-card3",
              name: "Cuenta anónima 'NoticiasLibres24'",
              desc: "Afirma tener 'la verdad que nadie quiere que sepas' con enlaces a tiendas de productos milagro.",
              isCorrect: false,
              feedback: "Las cuentas anónimas sin atribución editorial que apelan a teorías conspirativas suelen buscar monetizar visitas mediante el clickbait."
            }
          ]
        },
        {
          id: "d2",
          stepNumber: "Enigma 2 de 3",
          keyName: "Contexto",
          title: "La foto con otra historia",
          claimViral: "«¡Mira esta foto! Queda demostrado que nunca se recicla ninguna prenda en todo el planeta.»",
          situation: "Una fotografía viral muestra una montaña de ropa tirada en un vertedero. Toca las pistas de contexto para descubrir qué revela y qué oculta una imagen descontextualizada.",
          photoContext: {
            lugar: "Vertedero textil en el desierto de Atacama (Chile), año 2021.",
            realidad: "Documenta un gravísimo problema real de sobreproducción y gestión de residuos de la moda rápida importada.",
            limite: "Una foto ilustra una realidad local dramática, pero no demuestra la frase matemática de que 'nunca y en ningún lugar' se recicle nada."
          },
          question: "¿Cuál es la conclusión mejor fundamentada sobre esta imagen?",
          options: [
            {
              id: "d2-opt1",
              text: "La foto demuestra de forma concluyente que el 100% de la ropa del planeta acaba quemada.",
              isCorrect: false,
              feedback: "Una imagen aislada, por impactante que sea, no permite inferir una conclusión universal absoluta sin datos estadísticos agregados."
            },
            {
              id: "d2-opt2",
              text: "Muestra un problema real y urgente de residuos, pero la frase viral exagera el alcance para generar cinismo y desmovilización.",
              isCorrect: true,
              feedback: "¡Llave de Contexto conseguida! El rigor periodístico nos enseña a denunciar el problema real sin caer en generalizaciones que alimentan la resignación."
            },
            {
              id: "d2-opt3",
              text: "La foto es un montaje creado por ordenador y no existe ningún vertedero textil.",
              feedback: "La crisis de la moda rápida y los vertederos es dolorosamente real. Negar la realidad es tan peligroso como manipularla."
            }
          ]
        },
        {
          id: "d3",
          stepNumber: "Enigma 3 de 3",
          keyName: "Acción",
          title: "Cambia el mensaje, abre una posibilidad",
          claimViral: "«Como no podemos frenar el cambio climático al 100% mañana mismo, no tiene sentido hacer nada.»",
          situation: "El último eslabón de la desinformación es el derrotismo: convencerte de que nada sirve para que no exijas mejoras. ¿Qué respuesta rompe la cadena y abre una acción colectiva?",
          options: [
            {
              id: "d3-opt1",
              text: "«Esperemos a que los gobiernos mundiales se pongan de acuerdo sin intervenir desde la ciudadanía.»",
              isCorrect: false,
              feedback: "La pasividad posterga la adopción de medidas que ya salvan vidas y reducen vulnerabilidad."
            },
            {
              id: "d3-opt2",
              text: "«Cada décima de grado y cada recurso ahorrado cuenta: organizando mejoras vecinales con las instituciones logramos cambios reales y evaluables.»",
              isCorrect: true,
              feedback: "¡Misión cumplida! Has roto la cadena de desinformación y la has transformado en una red ciudadana de soluciones."
            },
            {
              id: "d3-opt3",
              text: "«La única salida es que cada persona se construya un refugio privado aislado del resto.»",
              isCorrect: false,
              feedback: "El individualismo extremo agrava la crisis ecológica. Las soluciones reales son solidarias e interconectadas."
            }
          ]
        }
      ],
      closing: {
        title: "¡Cadena viral detenida!",
        subtitle: "Has transformado la desinformación en cooperación",
        takeaways: [
          "Verifica las fuentes: busca competencia técnica y metodologías transparentes.",
          "Pon contexto a las imágenes: no permitas que un impacto visual se convierta en una verdad absoluta engañosa.",
          "Supera el derrotismo: la acción colectiva fundamentada es la respuesta más potente frente a la inacción."
        ],
        sourceNote: "Conceptos inspirados en el combate a los discursos de retardismo climático (Andreu Escrivà) y la verificación cívica (Verificat)."
      }
    }
  ]
};
