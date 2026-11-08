---
name: civican-tu-impacto-en-juego
description: Construir y verificar una web de exposición para CIVICAN, con cuatro experiencias educativas sobre sostenibilidad y desinformación, menú compartido, uso táctil de gran formato, sesiones independientes y despliegue estático en Netlify. Aplicar al implementar o modificar esta instalación en Antigravity.
---

# Tu impacto en juego — Instrucciones para Antigravity

## 1. Encargo y resultado

Actuar como diseñador de experiencias educativas, desarrollador frontend e ingeniero de pruebas. Implementar una web completa y funcional, no únicamente una maqueta o un plan. Entregar cuatro juegos completos desde un menú común: «Transforma tu barrio», «Detectives del clima», «¿Verde de verdad?» y «Misión: romper la cadena». Aplicar en primer lugar la dirección visual de la sección 7 y sus tokens, que concretan cualquier indicación visual genérica del resto del documento. Priorizar una instalación visual, divertida, estable y autónoma, que cada visitante pueda empezar desde cero. No desarrollar la dinamización de la conferencia: es otro proyecto.

Construir para una pantalla grande táctil con una persona o pequeño grupo por partida. Mantener compatibilidad con móviles sin exigir un móvil para jugar en la pantalla. Duración objetivo: 3–4 minutos para A, B y D; 2–3 minutos para C, sin cuenta atrás de juego ni penalización por leer despacio. Idioma inicial: español. Separar textos y contenido de la lógica para facilitar revisiones y traducción posterior.

Usar «Tu impacto en juego» como título general y «Un futuro sostenible empieza por mirar y decidir» como subtítulo. No inventar logotipos institucionales ni aprobaciones.

## 2. Contexto comprobado y asuntos pendientes

Revisión de correo de 7 de noviembre de 2026:
- Miren Faus, programación de CIVICAN, compartió el 5 de junio el nombre «Tu impacto en juego», la ubicación «Videowall Atrio» y las fechas del 17 al 27 de noviembre, de 09:00 a 21:00. Correo: https://mail.google.com/mail/#all/19e977a0e93fe0ff
- Ese texto describe participación «desde el propio móvil». No confirma que el videowall sea táctil. No se han localizado pulgadas, dimensiones, resolución, orientación, distribución de paneles, sistema operativo, navegador, ordenador disponible ni conectividad.
- En el hilo de visita técnica, el equipo pide conocer videowall, pantallas y conexiones. Miren facilita una visita; no aporta una ficha técnica. Correo: https://mail.google.com/mail/#all/1a18868e572c4b78
- No tratar 1920×1080, 4K ni orientación horizontal como especificaciones confirmadas. Son perfiles de prueba provisionales.
- Mantener la decisión del usuario: experiencia táctil directa, preparada para ajustar al equipo real. Implementar también diseño móvil independiente. No crear sincronización móvil-videowall ni votos colectivos en tiempo real: requieren otro alcance y backend.
- Si el videowall no admite toque, la misma web podrá jugarse individualmente desde un enlace/QR en móvil. Esto no permite controlar el videowall desde el móvil: explicar esa diferencia en la entrega técnica.

Continuar con una implementación adaptable sin bloquearse por estos datos pendientes. Señalar como pendiente la aceptación en el hardware real. Preparar una lista breve para la visita: modelo y pulgadas; resolución del escritorio y escalado del sistema; orientación; paneles y juntas; altura accesible; capacidad táctil y conexión de datos táctiles; ordenador/OS/navegador; acceso a una URL HTTPS; internet; autorización para modo quiosco y arranque automático; horario y apagado.

## 3. Fuentes de contenido y rigor editorial

Leer las dos presentaciones que acompañan a estas instrucciones. No suponer que las rutas de este entorno existen en el equipo del usuario. Identificar los documentos por nombre:

1. «CIVICAN.pptx.pdf» (27 páginas): responsabilidad comunitaria (3), límites materiales y recursos finitos (4), sostenibilidad y generaciones futuras (6–9), mirada más amplia que emisiones (10–13), reciclaje y base material (14–15), crecimiento/PIB/decrecimiento (16–18), futuros y acción (19–24), disposición a actuar y percepción de los demás (25–27).
2. «Presentación CIVICAN.pdf» (43 páginas), Desfake/Verificat: siete casos y su revisión (2–17); preguntas de verificación (20–22); estrategias EFECT (23–28); publicidad y caso H&M (30–34); retardismo, tecnooptimismo, greenwashing, responsabilidad individual y catastrofismo (35–42).

Si no están adjuntas en Antigravity, continuar con los ejemplos ficticios completos de este documento y marcar la revisión de fuentes como pendiente. No afirmar haber leído archivos ausentes. No copiar capturas ilegibles como interfaz ni reproducir marcas o casos reales sin verificar contexto y autorización de uso.

Integrar en los cuatro juegos las dos perspectivas: recursos/bienestar/acción colectiva y verificación/desinformación. Evitar culpabilizar a personas por su renta, movilidad o posibilidades de compra. Hablar de responsabilidad compartida, infraestructura, empresas, instituciones y comunidad. No convertir el juego en «comprar el producto verde correcto». No presentar crecimiento del PIB como sinónimo automático de bienestar ni toda tecnología como solución falsa.

Cada caso debe tener id, texto, opciones, explicación por opción, objetivo, referencia a documento/página, tipo de ejemplo (ficticio o real), fuentes externas verificadas si las hubiera y estado editorial (draft/approved). No inventar URLs, estudios, citas, cifras ambientales ni conclusiones científicas. No presentar los ejemplos ficticios como noticias reales ni como afirmaciones validadas por los ponentes.

En desarrollo mostrar una banda discreta «Prototipo: contenido pendiente de validación». Para release exigir aprobación explícita en los datos de contenido. Si falta, generar el build de revisión pero no etiquetarlo como listo para exposición. Los contenidos deben revisarlos el equipo de Algorithmics y Andreu / Carla y Laura según corresponda; no enviarles comunicaciones automáticamente.

## 4. Menú y navegación

Diseñar una portada de exposición con ilustración protagonista y cuatro tarjetas grandes, con títulos, invitación, duración y CTA específico según la sección 7:
- «Transforma tu barrio»: «Toma tres decisiones para vivir mejor utilizando menos recursos».
- «Detectives del clima»: «Investiga tres mensajes antes de creerlos o compartirlos» (3–4 min).
- «¿Verde de verdad?»: «Abre tres promesas verdes y descubre qué las respalda» (2–3 min).
- «Misión: romper la cadena»: «Supera tres pruebas para frenar un mensaje engañoso» (3–4 min).

Ofrecer una demo visual suave y no interactiva del barrio y las pistas en reposo. No avanzar al juego sin toque. Sin vídeo ni audio obligatorio. Incluir «Cómo jugar» en un panel breve y créditos/fuentes en un panel interno legible. No abrir sitios externos ni nuevas pestañas durante el recorrido público.

En juego mostrar progreso «Reto 1 de 3» y un botón «Inicio» accesible, con confirmación «¿Quieres terminar esta partida?» y botones «Seguir jugando» / «Volver al inicio». Mantener el botón Inicio en una zona alcanzable; no colocar controles esenciales solo arriba en una pared gigante.

Tras confirmar la elección mostrar explicación y un botón explícito «Continuar»: nunca ocultar la explicación por avance automático. Al terminar ofrecer «Elegir otra experiencia» como CTA principal y «Volver al inicio» como secundario. Ambos borran por completo la partida. El primero abre el selector con las cuatro opciones, sin iniciar ninguna automáticamente; el segundo vuelve a la portada. En el selector no conservar puntuaciones ni historial personal. Mostrar todas disponibles, incluida repetir la misma, con duración y nombre. No usar un carrusel ni imponer recorrerlas todas.

## 5. Juego A — Transforma tu barrio

Crear un barrio ficticio ilustrado con SVG por capas, personas diversas, zona de movilidad, taller/tienda y plaza. Cambiar elementos visibles tras cada decisión. No depender de mapas externos ni 3D. Ofrecer tres opciones plausibles por decisión y retroalimentación específica; no usar opciones absurdas para forzar el acierto.

No puntuar la sostenibilidad con un medidor pseudocientífico ni sumar porcentajes de CO₂. Mostrar cualitativamente oportunidades y condiciones: «Facilita reparar», «Necesita mantenimiento», «Mejora el acceso». Llamar a los cambios «escenario ilustrativo», no predicción.

### A1. Aprovechar lo que ya existe
Situación: «Hay objetos que se dejan de usar y vecinos que necesitan herramientas. ¿Qué impulsarías?»
Opciones:
1. «Taller de reparación y biblioteca de objetos». Mostrar taller abierto y personas compartiendo herramientas. Explicar: «Reparar y compartir puede alargar la vida de los objetos y evitar algunas compras. Hace falta organizar préstamo, mantenimiento y acceso».
2. «Campaña para sustituir objetos por modelos eco». Mostrar escaparate. Explicar: «Antes de sustituir algo que funciona, conviene comprobar si hace falta y comparar su ciclo de vida. La etiqueta eco por sí sola no demuestra menor impacto».
3. «Mejorar la recogida para reciclar». Mostrar punto de recogida. Explicar: «Reciclar es necesario para muchos residuos, pero no recupera todo ni elimina el uso de recursos nuevos. Conviene combinarlo con prevención y reparación».
Micro-reto: anuncio ficticio «Si se recicla, comprar no tiene impacto». Preguntar «¿Qué falta considerar?»; opciones «Fabricación y recursos», «Solo el color del contenedor», «Nada». Explicar sin castigo: fabricar y transportar también utiliza recursos. Referencias: primera 14–15; segunda 30–39.

### A2. Poder moverse de distintas maneras
Situación: «El barrio quiere mejorar sus desplazamientos. ¿Por dónde empezarías?»
Opciones:
1. «Conectar transporte público y recorridos accesibles». Mostrar parada y pasos accesibles. Explicar la oportunidad de acceso compartido y condiciones: frecuencia, coste, seguridad y necesidades diversas.
2. «Ayudar a sustituir coches por eléctricos». Mostrar recarga. Explicar: «La electrificación puede reducir impactos en determinados contextos, pero no elimina materiales, espacio ocupado ni todas las emisiones. Hay que comparar alternativas y usos».
3. «Pedir que cada persona camine más». Mostrar personas caminando, sin culpabilizar a quien no puede. Explicar que caminar puede ser útil, pero las distancias, accesibilidad y seguridad necesitan soluciones colectivas.
Micro-reto: mensaje ficticio «Una nueva tecnología resolverá la movilidad sin cambiar nada más». Elegir «Pedir pruebas y comparar opciones» frente a «Darlo por resuelto». Referencias: primera 12, 15–18; segunda 36–40.

### A3. Organizar una mejora compartida
Situación: «La plaza necesita sombra y un espacio de encuentro. ¿Cómo pondrías en marcha la mejora?»
Opciones:
1. «Acordar una propuesta vecinal con el ayuntamiento». Mostrar reunión, sombra y banco accesible. Explicar que requiere escuchar necesidades, presupuesto y mantenimiento.
2. «Difundir consejos individuales». Mostrar panel. Explicar que informar ayuda, aunque por sí solo no crea sombra ni cambia infraestructura.
3. «Esperar a una solución perfecta». Mantener plaza con indicador de propuesta pendiente. Explicar que la incertidumbre no obliga a paralizar medidas fundamentadas; se puede actuar, evaluar y ajustar.
Micro-reto: «Como nuestras acciones no sirven, no merece la pena organizarnos». Identificar «Desanima la acción colectiva» y explicar que no todas las medidas tienen el mismo alcance; conviene evaluar propuestas concretas. Referencias: primera 3, 19–27; segunda 40–42.

### Cierre A
Mostrar el barrio según las tres elecciones y un resumen personalizado de oportunidades y condiciones, sin clasificar al visitante como bueno/malo. Titular: «Un barrio sostenible se construye en común». Tres recordatorios: aprovechar recursos; comprobar promesas; facilitar decisiones colectivas. No afirmar haber transformado el mundo real.

## 6. Juego B — Detectives del clima

Crear tres publicaciones ficticias, rotuladas «Ejemplo ficticio para aprender». No usar un falso medio real. Ofrecer pistas tocables y una decisión. Mostrar «Fuente», «Pruebas» y «Contexto» con textos cortos. Se pueden consultar en cualquier orden, sin obligar a abrir todas. No tratar «faltan pruebas» como prueba automática de falsedad.

Puntuación interna: un sello «Investigué» por consultar al menos una pista y un sello «Decidí con criterio» por resolver bien cada caso. Máximo tres de cada tipo. No premiar velocidad, no ranking ni nombres. Explicar errores con respeto. Diferenciar puntos/sellos de una evaluación científica de la persona.

### B1. La gráfica recortada
Publicación: «El consumo de materiales ya está bajando». Mostrar serie ficticia de índice 100, 115, 130, 125 en cuatro periodos, inicialmente destacando 130→125. Rotular siempre «Datos ficticios» y «Índice ilustrativo, sin unidades reales».
Pistas:
- Fuente: «La publicación no enlaza el conjunto de datos».
- Pruebas: ampliar la gráfica y mostrar los cuatro valores.
- Contexto: «Elegir solo el último tramo puede cambiar la impresión que produce una serie».
Pregunta: «¿Qué puedes concluir con lo mostrado?»
Opciones: «La bajada reciente demuestra una reducción sostenida» / «Hay una bajada al final, pero falta contexto para la conclusión general» / «Todas las gráficas engañan».
Correcta: segunda. Feedback: «Comprueba periodo, escala, indicador y datos completos. Un tramo no basta para demostrar una tendencia sostenida».
Referencias: primera 14–15; segunda 22, 27.

### B2. La prenda verde
Anuncio: «Camiseta ECO. Compra sin impacto». Mostrar una prenda y sello de diseño ficticio.
Pistas:
- Fuente: «El mensaje lo publica la marca; eso no lo hace falso, pero debemos examinar la evidencia».
- Pruebas: «Dice que el envoltorio tiene material reciclado; no aporta datos del impacto total de la prenda».
- Contexto: «El envase es solo una parte. También cuentan fabricación, uso, durabilidad y fin de vida».
Pregunta: «¿Está demostrada la promesa de compra sin impacto?»
Opciones: «Sí, porque lleva un sello verde» / «No está respaldada por la información ofrecida» / «Toda prenda con material reciclado es un engaño».
Correcta: segunda. Feedback: «Una mejora parcial no demuestra impacto cero. Pide afirmaciones concretas, alcance y pruebas verificables».
Referencias: primera 9–15; segunda 30–39.

### B3. Esperar al invento perfecto
Publicación: «La tecnología lo arreglará todo: no necesitamos cambiar nada ahora».
Pistas:
- Fuente: «Es una opinión; no aporta un plan contrastable».
- Pruebas: «No concreta cuándo estará disponible, a qué escala ni con qué recursos».
- Contexto: «La innovación puede contribuir. La promesa de una solución futura no demuestra que convenga aplazar medidas actuales».
Pregunta: «¿Qué respuesta ayuda a avanzar?»
Opciones: «Esperar sin revisar nada más» / «Pedir pruebas y combinar innovación con medidas colectivas fundamentadas» / «Rechazar toda tecnología».
Correcta: segunda. Feedback: «Verificar también significa preguntar por plazos, límites y alternativas. La responsabilidad no recae únicamente en las decisiones de compra individuales».
Referencias: primera 3–6, 19–27; segunda 36–42.

### Cierre B
Titular «Antes de compartir, detente y comprueba». Mostrar sellos y un resumen de las pistas usadas. Cuatro recordatorios inspirados en la presentación: qué reacción busca; quién lo dice; qué dicen otras fuentes fiables; qué pruebas aporta. Añadir «Informarse mejor también ayuda a actuar en común».

## 6C. Juego C — ¿Verde de verdad?

Diferenciarlo de Detectives: explorar objetos y promesas publicitarias por capas, no otra secuencia de publicaciones con lupa. Crear un escaparate ilustrado de tres objetos ficticios: zapatilla, teléfono y servicio de reparto. Permitir elegir el orden tocando objetos grandes o sus botones equivalentes; nunca exigir tocar un detalle pequeño. Marcar «Caso explorado» por partida, permitir revisitar sin duplicar sellos y conservar un orden canónico para teclado. Al completar tres casos ofrecer el resultado. No prometer que el propio hecho de comprar algo es sostenible.

En cada objeto ofrecer tres pestañas grandes: «La promesa», «Las pruebas» y «Lo que falta». Revelar una capa mediante toque, no un gesto de pelar/arrastrar preciso. Tras consultar al menos una evidencia, permitir clasificar mediante tres opciones de igual estilo: «Respaldada en su alcance», «Faltan pruebas» o «Contradice las pruebas». Seleccionar y confirmar; después explicar el alcance exacto. No enseñar la clasificación correcta mediante color antes de confirmar. Datos y marcas ficticios, claramente rotulados. Los casos son ejercicios de razonamiento a partir de evidencia ficticia, no certificaciones de productos reales.

### C1. La zapatilla y el envoltorio
Promesa ficticia: «Caja hecha íntegramente de cartón reciclado». Evidencia del ejercicio: ficha de materiales y comprobación independiente ficticia coinciden sobre la caja; no se aporta evaluación del calzado. Mostrar «Evidencia simulada del ejercicio» en la ficha; no imitar sellos de certificadores reales.
Respuesta esperada: «Respaldada en su alcance». Explicar: «Las pruebas respaldan lo dicho sobre la caja. No demuestran que toda la zapatilla tenga bajo impacto. Comprueba siempre a qué parte se refiere la promesa». Incluir apoyo específico si se elige falta de pruebas o contradicción: aquí sí hay evidencias coherentes del alcance limitado; no confundir prudencia con rechazar todas las afirmaciones.
Pregunta de inspiración: «¿Hace falta sustituir lo que ya utilizas?». No juzgar ni pedir contestación escrita. Referencias: primera 9–15; segunda 22 y 30–39.

### C2. El teléfono eterno
Promesa ficticia: «Durará toda la vida: un móvil sin residuos». Evidencia: solo aparece una frase promocional; faltan datos de reparabilidad, recambios, soporte y fin de vida.
Respuesta esperada: «Faltan pruebas». Explicar: «Una promesa de duración ilimitada necesita pruebas que aquí no aparecen. Pregunta por años de soporte, repuestos y reparación; no concluyas que un teléfono concreto es inútil sin comprobarlo». Revelar visualmente batería, reparación y soporte como preguntas, no como prestaciones verificadas.
Aprendizaje: alargar la vida útil necesita decisiones de diseño, servicios y derechos de reparación, además del cuidado individual. Referencias: primera 4 y 14–15; segunda 22 y 36–40.

### C3. El reparto sin envases
Promesa ficticia: «Todos nuestros pedidos llegan sin envases de un solo uso». Evidencia: documentación ficticia del mismo servicio, mismo periodo y ámbito muestra que utiliza bolsas desechables en parte de esos pedidos. Hacer explícita la coincidencia de alcance; no basarse en una foto aislada o de fecha desconocida.
Respuesta esperada: «Contradice las pruebas». Explicar: «La afirmación dice todos, pero los registros del mismo servicio y periodo muestran excepciones. Las promesas absolutas deben coincidir con los hechos». No inferir otros impactos del reparto que no estén documentados.
Aprendizaje: los sistemas reutilizables requieren recogida, mantenimiento y organización. Referencias: primera 3 y 14–15; segunda 22 y 30–39.

### Cierre C
Mostrar tres etiquetas abiertas y el criterio aprendido, con hasta tres sellos «Examiné la promesa» por explorar y hasta tres «Ajusté la conclusión» por clasificar, sin rankings. No evaluar toda la sostenibilidad de un producto por esos sellos. Cierre: «No todo lo verde es un engaño. Busca promesas concretas y pruebas del mismo alcance». Añadir una acción accesible: «Antes de comprar, pregunta si puedes reparar, compartir o seguir usando lo que tienes». No imponer una compra ni compromiso personal.

## 6D. Juego D — Misión: romper la cadena

Crear un escape room breve, sin tiempo límite, teclado ni códigos de memoria. Mostrar una red de mensajes ficticios a punto de difundirse, sin marcas de redes reales y sin propagación acelerada alarmista. Tres pruebas desbloquean piezas visuales: «Fuente», «Contexto» y «Acción». Usar cooperación simbólica y curiosidad, no miedo ni competición. Cada prueba es distinta: emparejar por toques, comparar una imagen/contexto y construir una respuesta. Todo tiene alternativa de botones grandes.

No bloquear por error: mostrar una pista de ayuda y permitir reintentar o pulsar «Ver explicación y seguir». Desbloquear la pieza al revisar la explicación, sea cual sea el acierto; registrar internamente el primer intento para evitar puntos por ensayo repetido. No puntuar velocidad. El juego no enseña a rechazar expertos por opiniones: revisar competencia relevante, fuentes y pruebas.

### D1. ¿Quién respalda esta afirmación?
Afirmación ficticia: «Reciclar permite consumir materiales sin límite». Ofrecer tres fichas ficticias: persona conocida sin fuentes, especialista del área con método/datos consultables y cuenta anónima con muchos seguidores. Preguntar «¿Qué ficha ofrece mejores elementos para empezar a comprobarlo?».
Interacción: tocar una ficha y luego la casilla grande «Fuente que revisaría»; alternativa lista de opciones con confirmación. Correcta: especialista relevante con método y datos. Explicar: «La especialidad y las fuentes ayudan a verificar; ni la popularidad ni el título por sí solos garantizan una afirmación. También debemos revisar las pruebas». Desbloquear «Fuente». Referencias: primera 4 y 14–15; segunda 22 y 24.

### D2. La foto con otra historia
Mostrar una ilustración ficticia de ropa acumulada con titular «Esta imagen demuestra que nunca se recicla ninguna prenda». Tres paneles de contexto tocables: «Fecha y lugar», «Qué representa» y «Qué permite concluir». Explicar que la escena es una ilustración, no una prueba de un caso real; el ejercicio trata de los límites de una imagen aislada.
Pedir elegir la conclusión mejor sustentada: «La imagen basta para afirmar nunca y ninguna» / «Necesitamos procedencia y datos representativos para esa conclusión general» / «No debemos investigar residuos textiles». Correcta: segunda. Al revelar, añadir un marco contextual a la imagen. Explicar que el problema de residuos requiere investigar y actuar, pero una imagen aislada no justifica esa generalización. Desbloquear «Contexto». Referencias: primera 14–15; segunda 22, 25, 27 y 30–34.

### D3. Cambia el mensaje, abre una posibilidad
Mostrar mensaje ficticio: «Si no podemos eliminar todo el impacto mañana, no merece la pena hacer nada». Pedir construir una respuesta eligiendo una de tres tarjetas completas: «Esperemos a una solución perfecta» / «Comprobemos las medidas y organicemos mejoras que podamos evaluar» / «Cada persona debe resolverlo sola». Correcta: segunda.
Mostrar una reunión vecinal que propone reparación y reutilización con evaluación de necesidades, acceso y mantenimiento. Explicar: «Podemos actuar con pruebas, reconocer límites y revisar resultados. Las instituciones, empresas y comunidad también tienen responsabilidad». Desbloquear «Acción». Referencias: primera 3, 19–27; segunda 26 y 36–42.

### Cierre D
Detener la cadena ilustrada y recomponerla como red de colaboración. Titular «Cadena detenida. Ahora, una idea que sí ayuda». Mostrar las tres herramientas con un consejo cada una. Añadir «Comparte información comprobada y busca cómo actuar en común». No afirmar que se ha frenado desinformación real. Ofrecer los CTA comunes, sin obligar a repetir pruebas falladas.

## 7. Dirección de arte, interfaz y accesibilidad

### 7.1. Concepto visual y jerarquía

Diseñar una exposición editorial ilustrada: un mundo cercano que invita a explorar, con un tono esperanzador y curioso. Combinar naturaleza, vida de barrio y herramientas de investigación. Evitar apariencia de formulario, dashboard empresarial, plantilla de diapositivas o juego infantil. Usar composición amplia, ilustración protagonista, profundidad moderada y detalles narrativos. No llenar de hojas decorativas todos los fondos ni asociar el color verde con veracidad.

Mantener un sistema visual común y cuatro identidades reconocibles: barrio con acentos verdes y escenas urbanas cálidas; detectives con acentos azules, lupa y pistas ámbar; escaparate con terracota, etiquetas y capas; misión con azul tinta, conexiones ámbar y piezas desbloqueables. Distinguir con nombre, icono y composición además del color. Los colores no indican por sí solos veracidad ni acierto. Conservar tamaños, tipografía, posición de navegación y comportamiento de botones entre experiencias. No oscurecer ni desaturar todo el barrio por una elección menos conveniente; mostrar consecuencias específicas sin castigo visual moralizante.

Definir primero tokens CSS de color, tipografía, espacio, radio, sombra y movimiento. Usarlos en todos los componentes. Mantener superficies de lectura sólidas; reservar gradientes suaves para fondos decorativos, nunca para texto ni botones esenciales.

### 7.2. Paleta operativa

| Token | Hex | Uso y combinación permitida |
| --- | --- | --- |
| Fondo cálido | #F7F5EE | Fondo general; texto azul tinta |
| Superficie | #FFFFFF | Tarjetas, pistas y explicaciones; texto azul tinta |
| Azul tinta | #17324D | Títulos, cuerpo y contornos esenciales |
| Texto secundario | #4B5F6B | Información secundaria sobre blanco o fondo cálido; nunca demasiado tenue |
| Verde barrio | #176B52 | Botón principal del barrio con texto blanco; acentos |
| Verde suave | #E7F2E9 | Fondo de oportunidad/aprendizaje con texto azul tinta o verde oscuro |
| Azul detectives | #2457A7 | Botón principal detectives con texto blanco; acentos |
| Azul suave | #EAF0FA | Panel de fuentes/contexto con texto azul tinta |
| Ámbar pista | #F2C14E | Marcadores y avisos con texto azul tinta; no usar texto blanco |
| Terracota | #A74332 | Aviso importante o cierre de sesión; si es botón sólido usar blanco |
| Borde funcional | #6B7C85 | Contornos de opciones y controles sobre blanco/fondo cálido |

No usar el ámbar ni los tonos suaves como color de texto sobre blanco. Medir contraste de las combinaciones y estados reales, incluidos foco, selección y texto secundario. Objetivo de aceptación: al menos 4,5:1 para textos; 3:1 para contornos e indicadores funcionales respecto al fondo contiguo. Para foco usar un anillo doble claro/oscuro de 4 px visible sobre cualquier superficie. No afirmar cumplimiento integral de accesibilidad solo por pasar contraste.

### 7.3. Tipografía y textos

Usar una familia sans legible, preferentemente Atkinson Hyperlegible o equivalente si se dispone de archivos locales licenciados. Si no, usar system-ui con fallback sans-serif; no bloquear la implementación ni llamar a Google Fonts. Pesos 400/600/700; evitar fuentes condensadas, cuerpo fino, texto justificado y párrafos enteros en mayúsculas.

Referencia provisional 1920×1080: título de portada 64–80 CSS px; título de reto 44–56; cuerpo 28–34; etiquetas de botones 28–32; metadatos visibles 22–24. Interlineado de cuerpo 1,35–1,5; limitar líneas de lectura a 40–55 caracteres. Mantener escala mediante clamp y breakpoints, nunca mediante simple reducción global del lienzo. Ajustar tras prueba real: el tamaño CSS no garantiza por sí solo legibilidad física.

Presupuesto visible por paso: título de hasta 10 palabras; introducción hasta 25; etiqueta principal de opción 3–7 palabras, con una línea de apoyo de hasta 14; explicación principal hasta 45 palabras; pista hasta 35. Adaptar el contenido largo de las secciones 5, 6, 6C y 6D sin alterar su sentido; conservar la versión completa en los datos y ofrecer «Ver por qué» para ampliar en un panel con navegación explícita. No truncar con puntos suspensivos ni reducir letra para hacer caber texto.

Redactar en segunda persona, con verbos concretos: «Elige», «Toca», «Descubre», «Comprueba». Explicar greenwashing como «apariencia de sostenibilidad sin pruebas suficientes» al primer uso y mantener el matiz de cada caso. Cambiar un simple «Incorrecto» por «Hay una pista que cambia la conclusión». Para aciertos usar «Bien visto» seguido de la razón, sin alabanzas repetitivas. No usar puntuación humillante ni etiquetas de persona buena/mala.

### 7.4. Composición por pantalla

Portada: colocar título y una frase breve arriba y cuatro accesos equivalentes en cuadrícula 2×2 para pantalla grande horizontal. Mostrar las cuatro opciones a la vez, sin scroll, carrusel ni pestañas ocultas en el perfil objetivo. No dar por hecho que una cuadrícula de pantalla completa es físicamente alcanzable: configurar una banda de interacción central/inferior y márgenes según tamaño/altura reales. Si no caben textos y botones grandes, reducir decoración antes que tipografía. En vertical mantener 2×2 si es legible y alcanzable; en móvil usar una columna con scroll natural. No encoger todo proporcionalmente.

Cada acceso incluye ilustración propia (aproximadamente un tercio del alto disponible), nombre, invitación breve, duración real por juego y CTA específico. Usar una sola tarjeta-botón semántica por acceso sin anidar botones. CTA: «Transformar el barrio», «Investigar mensajes», «Examinar promesas» y «Iniciar la misión». Mostrar «Toca una experiencia para empezar». No marcar unas como bloqueadas ni imponer un orden. La cuadrícula de portada es un selector; los juegos deben tener escenas y mecánicas distintas, no repetir cuatro cuestionarios con otra decoración.

Reto de barrio: reservar aproximadamente 55–60 % del área útil a la escena y el resto a pregunta y opciones en horizontal; en vertical, escena arriba y opciones debajo. Diferenciar por forma y contexto las tres zonas del barrio. Tras elegir, mantener visible la escena y destacar exactamente el cambio producido, con una etiqueta de oportunidad y otra de condición. Integrar cada micro-reto como segundo paso corto de la misma ronda: «Mira este mensaje». No mostrar simultáneamente decisión, micro-reto y explicación. Mantener «Reto 1 de 3» y distinguir «Decide» / «Comprueba» sin aparentar seis rondas independientes.

Reto de detectives: mostrar una publicación editorial grande con texto e imagen reconstruidos, nunca una captura diminuta. Situar debajo tres herramientas claras «Fuente», «Pruebas» y «Contexto», con icono y nombre; indicar cuáles se han abierto con marca y texto «Vista». Abrir una pista a la vez en panel amplio sin ocultar controles esenciales. Mantener la respuesta separada de las herramientas: «Ya puedo decidir». La publicación no debe parecer una notificación real del sistema.

Reto del escaparate: tres objetos grandes para elegir orden, etiqueta frontal y capas de prueba. Animar una apertura al toque sin exigir arrastre. Tras abrir una pista ofrecer «Clasificar promesa» y tres opciones; mostrar información limitada sin anticipar el veredicto. Mantener un regreso claro al escaparate; una revisita no suma sellos nuevos.

Reto de misión: red de mensajes protagonista y tres espacios de piezas con nombre. Mostrar progreso de pruebas sin tiempo restante, elección reversible y ayuda accesible «Necesito una pista». No usar instrucciones que dependan de sonido ni pequeños elementos arrastrables. Mostrar cada desbloqueo con una animación corta, reemplazable por estado estático con reducción de movimiento.

Explicación: jerarquía «Qué descubriste» → explicación corta → un elemento visual resaltado → «Continuar». Resultado: una escena o composición visual protagonista, resumen de elecciones/sellos, aprendizaje principal y dos CTA. No comprimir todas las explicaciones en un único muro de texto final.

### 7.5. Botones, opciones y estados

Usar una jerarquía inequívoca:
- Primario: relleno verde, azul, terracota o azul tinta según juego, texto blanco y verbo visible. Solo una acción principal por paso, salvo los cuatro accesos equivalentes de portada.
- Secundario: superficie blanca, borde funcional de 2 px, texto azul tinta. Usar para pistas, lectura ampliada y alternativa de navegación.
- Salida: «Volver al inicio», secundario y separado de la acción de progreso; pedir confirmación solo si se pierde una partida en curso.
- Opciones: tarjetas seleccionables con borde de 2 px, icono opcional y texto completo; al seleccionar, añadir marca y rótulo «Tu elección». La posición no debe revelar la opción correcta. Mantener el orden estable dentro de la partida; si se varía entre partidas, puntuar por id, nunca por índice.

Etiquetas obligatorias: portada «Transformar el barrio», «Investigar mensajes», «Examinar promesas» e «Iniciar la misión»; antes de confirmar «Confirmar elección»; tras responder «Continuar» o «Ver resultado» en la última ronda; resultado «Elegir otra experiencia» y «Volver al inicio». En el selector secundario mostrar las cuatro opciones; salir a él implica descartar la sesión anterior. Evitar «Aceptar», «OK» y flechas sin texto.

Seleccionar una opción no la confirma: permitir cambiarla y después tocar «Confirmar elección». Hasta entonces el CTA permanece deshabilitado con ayuda «Elige una opción para continuar». Definir estados normal, pulsado, seleccionado, foco, deshabilitado y transición. El estado deshabilitado debe ser claramente no accionable y su texto legible. Durante transición bloquear envíos duplicados; no dejar que el dedo que confirmó active también el botón de la pantalla siguiente.

En referencia 1080p usar botones principales de 88–104 CSS px de alto, opciones de al menos 104 px y separación de 20–24 px. El alto debe crecer si hay dos líneas. Mantener margen interior de al menos 24 px; área de toque y superficie visible deben coincidir. En móvil permitir al menos 48 px y etiquetas legibles sin cortes. No usar iconos diminutos para cerrar paneles: botón explícito «Cerrar pista» o «Volver al reto».

### 7.6. Ilustración y movimiento con propósito

Crear SVG propios por capas: barrio con edificios, personas, vegetación y movilidad; detectives con tarjeta, lupa, sello y gráfica; escaparate con objetos y etiquetas desplegables; misión con red de mensajes y piezas. Mantener todos los recursos locales y una complejidad visual equivalente entre los cuatro juegos. Compartir grosor de trazo, sombras y radios de 20–28 px. Usar ilustraciones como información: la lupa revela contexto, el taller abre sus puertas y el gráfico amplía el tramo oculto. En el gráfico ficticio conservar valores, escala, etiquetas y proporciones matemáticas correctas; la animación no debe distorsionarlos.

Respuesta visual al toque en aproximadamente 100 ms; transiciones de pantalla 180–280 ms y transformaciones de escena 400–700 ms. No exigir esperar a una animación para poder leer; habilitar la acción cuando el estado esté listo. Animaciones de portada lentas y discretas, sin destellos ni zoom continuo. Evitar confeti a pantalla completa, sonidos automáticos y movimientos que compitan con el contenido. Respetar prefers-reduced-motion y ofrecer «Menos movimiento», con resultados equivalentes sin animación.

### 7.7. Adaptación física y accesibilidad

Tomar 1920×1080 como maqueta, no como hardware confirmado. Probar también 1366×768, 3840×2160, 1080×1920 y 390×844. Comprobar escalado del escritorio y devicePixelRatio. No escalar todo automáticamente en 4K: considerar dimensiones físicas y distancia real de lectura. Mantener navegación y acciones en una banda central/inferior alcanzable; altura ajustable por configuración. No depender de tocar la parte superior de un videowall. Reservar márgenes y zonas de exclusión configurables para biseles; aplicar la geometría real cuando se conozca.

Usar botones HTML semánticos, foco visible, orden de tabulación lógico y etiquetas accesibles. En diálogos mover foco, contenerlo y devolverlo al disparador. Anunciar resultado y cambio de reto con aria-live sin leer toda la pantalla repetidamente. Ofrecer texto ampliado sin recortes y no bloquear el zoom del navegador. No depender del color, audio, hover, gestos multitáctiles o arrastre preciso. Evitar scroll en el perfil grande: dividir explicaciones largas en pasos; en móvil permitir scroll natural sin ocultar CTA ni contenido.

Usar una estrategia de eventos que no duplique click y pointerup. Bloquear dobles confirmaciones y segundo puntero durante la transición. Usar touch-action apropiado por control, sin anular el zoom global. Las preferencias de accesibilidad deben estar a un toque de distancia mediante control visible «Lectura y movimiento», sin menús técnicos.

### 7.8. Revisión visual y consistencia

Antes de cerrar la implementación producir una hoja de estilo con paleta, tipografía, botones y estados, y capturas de portada, una ronda y un resultado de cada experiencia. Revisarlas y corregir, sin detener el desarrollo para pedir aprobación de cada paso. Comparar con los tokens y presupuestos de texto. Comprobar que en menos de cinco segundos se entiende dónde tocar y qué se obtiene. No prometer que ese criterio está validado con público si solo lo evalúa el desarrollador.

Usar el siguiente checklist para aceptar el acabado: una acción principal clara; contraste medido; títulos completos; sin textos diminutos; ninguna respuesta distinguible como correcta antes de jugar; imágenes nítidas; iconos con etiqueta; foco y pulsación visibles; feedback amable y concreto; controles físicamente alcanzables; sin pantallas vacías o transiciones bruscas; apariencia coherente entre menú y juegos. Realizar prueba física con una persona nueva cuando sea posible y registrar si se hizo o está pendiente.

## 8. Estado, reinicio y robustez

Definir una máquina de estados explícita: portada/selector → introducción → reto → explicación → siguiente reto → resultado. Para C añadir escaparate y visita de caso por id; para D añadir ayuda/reintento y piezas desbloqueadas; no modelar la revisita como un nuevo acierto. Usar ids estables para experiencias y retos. Añadir confirmación de salida y aviso de inactividad como estados o capas controladas. El reinicio y las preferencias por sesión deben comportarse igual en las cuatro experiencias. Mantener una sola fuente de verdad del estado.

Implementar una única función resetSession() que borre juego elegido, elecciones, puntuaciones, pistas abiertas, objetos visitados, veredictos, ayudas, piezas desbloqueadas, reintentos, diálogos, foco, scroll, animaciones y temporizadores de partida. Cancelar callbacks pendientes y listeners duplicados. Usar un identificador de sesión para que callbacks antiguos no modifiquen una nueva. Llamarla al salir, reiniciar, iniciar cualquiera de las experiencias y recuperarse de un error. Recargar la URL debe abrir la portada, sin recuperar una partida antigua.

No persistir respuestas ni datos personales. No usar cuentas, formularios, cookies de seguimiento, analytics ni backend en la primera versión. Guardar solo preferencias de accesibilidad si se justifica; definir cómo restablecerlas para el siguiente visitante.

Inactividad configurable: tras 60 s de ausencia de acciones significativas, mostrar «¿Sigues ahí?» con «Continuar» y «Terminar». Dar 15 s adicionales antes de resetear. No contar movimiento incidental del ratón como actividad. En paneles largos permitir extender el tiempo de lectura. En resultado volver a portada a los 45 s, con aviso y botón «Seguir leyendo». Usar tiempos absolutos, no solo decrementos de setInterval: al volver de suspensión o pestaña oculta, comprobar el tiempo y resetear sesiones vencidas.

Incluir límite de errores: mostrar pantalla amable con «Volver al inicio» si falla el juego, sin consola técnica visible. Mantener la interfaz operable si falta una imagen, con sustitución local. No recargar en bucle ante errores persistentes.

## 9. Arquitectura y entrega técnica

Usar TypeScript y una solución frontend ligera, preferentemente Vite con React si se empieza desde cero; respetar un proyecto existente si lo hubiera. Generar una web estática, sin secretos ni llamadas a IA en ejecución. Implementar contenido tipado y separado, reducer/máquina de estados, componentes reutilizables y configuración central de tiempos, tamaños y márgenes.

Generar los SVG e ilustraciones en el proyecto y usar tipografías de sistema o archivos locales con licencia adecuada. No depender de CDNs, fuentes remotas, iframes, vídeos ni servicios externos durante la partida. No introducir motores pesados para estas cuatro experiencias de tres retos cada una. Centralizar un registro de experiencias con id, título, CTA, duración, color, componente y estado inicial; todos los accesos deben usarlo. No duplicar la lógica de sesión e inactividad por juego.

Entregar build de producción en dist listo para Netlify. Usar navegación interna sin rutas que fallen al refrescar; si se usa router, configurar el fallback necesario. Incluir instrucciones de build, previsualización y subida de dist. No subir el código fuente sin compilar mediante un despliegue manual que espera archivos construidos. No publicar ni contratar servicios automáticamente.

Preparar funcionamiento offline después de una primera carga completa en HTTPS: service worker y caché versionada de HTML, JS, CSS y assets esenciales. Mostrar diagnóstico de preparación offline solo al operador. Comprobar offline mediante recarga y varias partidas; no afirmar que funciona sin conexión solo porque una pestaña abierta sigue funcionando. La primera carga necesita red o una instalación local previamente preparada. Aplicar actualizaciones de versión en portada, nunca interrumpir una partida. Evitar caches incompatibles al actualizar.

Documentar para el operador, fuera de la interfaz pública: abrir URL, modo quiosco del navegador/OS, evitar suspensión, arranque diario y recuperación tras corte eléctrico, diferencia entre imagen por HDMI y datos táctiles por USB/USB-C según modelo, prueba de conectividad y procedimiento de actualización. La web no puede por sí sola bloquear el sistema operativo ni garantizar encendido automático. Ajustar esas instrucciones al hardware confirmado; no inventar compatibilidad.

Si se solicita más adelante un contador global o resultados colectivos, tratarlo como ampliación: definir backend, privacidad y conservación. Un contador local de navegador no representa visitas únicas ni estadísticas de toda la exposición.

## 10. Pruebas de aceptación obligatorias

Automatizar con Playwright o equivalente y complementar con inspección visual. Usar temporizadores controlados para comprobar inactividad sin esperar minutos reales. Entregar evidencia de lo ejecutado y señalar lo no probado.

1. Completar los cuatro juegos con distintas opciones; comprobar selección reversible antes de confirmar, explicaciones, progreso, sellos y cierre.
2. Volver al menú desde cada etapa; cancelar y confirmar la salida. No conservar datos previos.
3. Comprobar los 12 cambios dirigidos entre experiencias distintas a través del selector, más las cuatro repeticiones del mismo juego: estado, foco, puntuación y temporizadores nuevos. Comprobar que los cuatro accesos de portada abren el juego correcto.
4. Simular abandono en reto, pista, explicación, diálogo y resultado; comprobar aviso, continuación y reinicio.
5. Probar toque doble, toques rápidos y dos punteros. No saltar retos, duplicar puntuación ni elegir dos opciones.
6. Recargar a mitad, volver de pestaña oculta/suspensión y desconectar red tras instalar caché. Recuperar el comportamiento definido.
7. Ejecutar al menos 100 ciclos distribuidos entre las cuatro experiencias, incluyendo orden libre de objetos en C, ayudas/reintentos en D, cambios de experiencia y reinicios. Comprobar listeners/timers estables y ausencia de crecimiento sostenido de memoria con un método documentado. No afirmar una semana de estabilidad por pasar esa prueba.
8. Aplicar el checklist visual de la sección 7.8 y medir contraste de todos los estados de controles. Probar perfiles de pantalla indicados con screenshots de portada, reto, feedback y resultado. Comprobar texto legible, ausencia de solapamientos, controles visibles y fuentes internas.
9. Comprobar teclado, foco de diálogos, contraste y reducción de movimiento. Conservar acceso al contenido con texto ampliado.
10. Simular asset ausente y un error controlado; ofrecer salida recuperable.
11. Ejecutar typecheck, build y tests sin errores. Verificar dist servido por HTTP/HTTPS, no solo el servidor de desarrollo.
12. Probar los seis órdenes posibles de visita a los tres objetos de C, revisitar sin sumar sellos y terminar con los tres clasificados. En D probar acierto, fallo, ayuda, reintento y «Ver explicación y seguir» en cada prueba: no duplicar piezas ni bloquear el cierre.
13. Hacer prueba física posterior en CIVICAN: mapeo de toque, alcance, escala, juntas, modo quiosco y encendido. Marcarla PENDIENTE hasta realizarla.

## 11. Orden de ejecución y definición de terminado

1. Revisar primero encargo, fuentes, dirección visual (sección 7), sesiones y criterios de aceptación; después los doce retos y las mecánicas diferenciadas. Revisar los documentos disponibles y resumir confirmaciones y supuestos en una nota técnica corta.
2. Crear estructura de contenido y configuración, portada y sistema de sesiones; después desarrollar los cuatro juegos completos, no solo accesos o pantallas de próximamente.
3. Aplicar tokens, presupuestos de texto y estados de botones. Pulir ilustraciones, transiciones suaves y feedback. No entregar una colección de tarjetas genéricas como versión final.
4. Añadir caché, recuperación y accesibilidad; ejecutar pruebas y corregir fallos.
5. Entregar código, dist, instrucciones de despliegue/operación, matriz de validación editorial y resultados de pruebas con capturas. Incluir exactamente qué falta confirmar del equipo real.

Priorizar en este orden: cuatro recorridos completos y comprensibles; reinicio y tacto fiables; aprendizaje y tono inspirador; acabado visual y rendimiento. No sacrificar la estabilidad por efectos. No detenerse después de generar un plan. Avanzar con los supuestos indicados. Pedir aclaración solo si una limitación real impide implementar; distinguir prototipo funcional, aprobación de contenido y aceptación en hardware. No declarar la instalación lista para apertura mientras falten las dos últimas.
