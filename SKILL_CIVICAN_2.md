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

Leer las dos presentaciones que acompañan a estas instrucciones y aplicar el contrato de fidelidad de la sección 5. No suponer que las rutas de este entorno existen en el equipo del usuario. Identificar los documentos por nombre:

1. «CIVICAN.pptx.pdf» (27 páginas): responsabilidad comunitaria (3), límites materiales y recursos finitos (4), sostenibilidad y generaciones futuras (6–9), mirada más amplia que emisiones (10–13), reciclaje y base material (14–15), crecimiento/PIB/decrecimiento (16–18), futuros y acción (19–24), disposición a actuar y percepción de los demás (25–27).
2. «Presentación CIVICAN.pdf» (43 páginas), Desfake/Verificat: siete casos y su revisión (2–17); preguntas de verificación (20–22); estrategias EFECT (23–28); publicidad y caso H&M (30–34); retardismo, tecnooptimismo, greenwashing, responsabilidad individual y catastrofismo (35–42).

Si no están adjuntas en Antigravity, desarrollar la estructura y usar únicamente las transcripciones y referencias de este documento para el prototipo; marcar cotejo, recursos visuales y aprobación como pendientes. No generar ejemplos ficticios como sustitución. No afirmar haber leído archivos ausentes. No copiar capturas ilegibles como interfaz ni reproducir marcas o casos reales sin verificar contexto y autorización de uso.

Integrar en los cuatro juegos las dos perspectivas: recursos/bienestar/acción colectiva y verificación/desinformación. Evitar culpabilizar a personas por su renta, movilidad o posibilidades de compra. Hablar de responsabilidad compartida, infraestructura, empresas, instituciones y comunidad. No convertir el juego en «comprar el producto verde correcto». No presentar crecimiento del PIB como sinónimo automático de bienestar ni toda tecnología como solución falsa.

Cada caso debe tener id, texto, opciones, explicación por opción, objetivo, referencia a documento/página, tipo de contenido (caso original, concepto o adaptación de interacción), fuentes externas verificadas si las hubiera y estado editorial (draft/approved). No inventar URLs, estudios, citas, cifras ambientales ni conclusiones científicas. No presentar los ejemplos ficticios como noticias reales ni como afirmaciones validadas por los ponentes.

En desarrollo mostrar una banda discreta «Prototipo: contenido pendiente de validación». Para release exigir aprobación explícita en los datos de contenido. Si falta, generar el build de revisión pero no etiquetarlo como listo para exposición. Los contenidos deben revisarlos el equipo de Algorithmics y Andreu / Carla y Laura según corresponda; no enviarles comunicaciones automáticamente.

## 4. Menú y navegación

Diseñar una portada de exposición con ilustración protagonista y cuatro tarjetas grandes, con títulos, invitación, duración y CTA específico según la sección 7:
- «Transforma tu barrio»: «Explora recursos, bienestar y lo que podemos hacer en común».
- «Detectives del clima»: «Pon a prueba dos casos y descubre cómo verificar» (3–4 min).
- «¿Verde de verdad?»: «Explora una campaña y descubre cómo comprobar su promesa» (2–3 min).
- «Misión: romper la cadena»: «Descubre las estrategias que frenan la acción climática» (3–4 min).

Ofrecer una demo visual suave y no interactiva del barrio y las pistas en reposo. No avanzar al juego sin toque. Sin vídeo ni audio obligatorio. Incluir «Cómo jugar» en un panel breve y créditos/fuentes en un panel interno legible. No abrir sitios externos ni nuevas pestañas durante el recorrido público.

En juego mostrar progreso «Reto 1 de 3» y un botón «Inicio» accesible, con confirmación «¿Quieres terminar esta partida?» y botones «Seguir jugando» / «Volver al inicio». Mantener el botón Inicio en una zona alcanzable; no colocar controles esenciales solo arriba en una pared gigante.

Tras confirmar la elección mostrar explicación y un botón explícito «Continuar»: nunca ocultar la explicación por avance automático. Al terminar ofrecer «Elegir otra experiencia» como CTA principal y «Volver al inicio» como secundario. Ambos borran por completo la partida. El primero abre el selector con las cuatro opciones, sin iniciar ninguna automáticamente; el segundo vuelve a la portada. En el selector no conservar puntuaciones ni historial personal. Mostrar todas disponibles, incluida repetir la misma, con duración y nombre. No usar un carrusel ni imponer recorrerlas todas.

## 5. Contrato de fidelidad y contenidos de las cuatro experiencias

Aplicar esta prioridad: contenido fiel y comprensible → sesión táctil fiable → claridad visual → efectos. Las mecánicas, ilustraciones y opciones de respuesta pueden adaptarse; no atribuirlas a los ponentes como si estuvieran en sus diapositivas. Retirar los escenarios ficticios anteriores de barrio, móvil eterno, reparto, cajas y series numéricas inventadas: quedan sustituidos por los doce retos siguientes.

### 5.1. Identificar las fuentes

Usar claves P1 = «CIVICAN.pptx.pdf», 27 páginas; P2 = «Presentación CIVICAN.pdf», 43 páginas. Los números son páginas del PDF, no numeración interna. Incluir ambos PDF como material de referencia del proyecto de desarrollo; no es necesario publicarlos íntegramente en la web. Reconstruir textos legibles a partir de las fuentes y usar recortes de imágenes solo si su uso está autorizado. Preservar créditos, fechas y contexto de las capturas.

Cada reto debe tener en datos: id; sourceDocument; sourcePages; sourceExcerpt; prompt; promptOrigin (literal/adapted); responseMode (reflection/estimate/verified-case/concept-check); options y su origen; feedback; feedbackOrigin (slide/adaptation/pending); answerKey nullable; evidence; editorialStatus; assetRightsStatus. Una referencia de páginas indica procedencia, no certifica cualquier afirmación añadida. Mantener un manifiesto editable que relacione cada texto factual y clave de respuesta con su evidencia exacta.

Distinguir tres cosas en el trabajo editorial: pregunta literal de diapositiva, pregunta adaptada de un contenido y recurso de juego creado para esta web. Mostrar en el panel «Sobre este reto» documento y página; registrar la distinción completa en el manifiesto, sin llenar la interfaz de notas técnicas. Usar español natural; corregir erratas sin cambiar el significado.

No convertir preguntas de opinión en test de conocimientos. Nunca puntuar estar a favor o en contra del decrecimiento, donar dinero, una emoción o una preferencia política. En reflexión ofrecer botones equivalentes, sin verde/rojo de correcto. Reconocer «No lo sé» y «Prefiero no responder» cuando corresponda. En conceptos con evidencia sí explicar qué respuesta encaja y por qué.

### 5.2. Límites de lo que prueban los PDF

La P2 contiene veredictos verdadero/falso en las páginas 11–17, pero no desarrolla en esas páginas la investigación de cada caso. Conservar el veredicto como «La presentación lo clasifica como…». No deducir del sello una explicación causal ni una validación nueva de toda la noticia. Para exponer un caso como verificado, pedir la referencia original y explicación a los ponentes, o verificar con fuentes primarias y registrar el resultado. Si hay una contradicción, documentarla y marcar pendiente; nunca ajustar los hechos solo para reproducir un sello.

La P1 p.14 contiene un gráfico/infografía con una proporción del 7,2 % en 2023 y comparación con 2018. No confundir proporción de materiales secundarios en el consumo con tasa de recogida o reciclaje de residuos. No llamarlo dato actual. El indicador, año y fuente bibliográfica completa deben validarse antes de publicación; si falta la fuente, mostrar la pregunta como exploración sin cifra calificada como definitiva.

La P1 p.26 contiene un estudio global y gráfico sobre disposición a aportar el 1 % de ingresos. No extraer un porcentaje exacto de España a ojo ni usar la cifra global como española. Es suficiente explicar cualitativamente la subestimación de la disposición de los demás, atribuyéndola al estudio mostrado.

El caso de H&M es una investigación recogida en P2 p.33. Atribuir las conclusiones a esa investigación y su momento; no extenderlas a toda prenda, tienda, país o fecha actual. Antigravity debe extraer los enlaces reales del PDF si existen, no fabricar enlaces a partir de la captura.

No dejar pruebas imposibles de completar por falta de validación: generar un prototipo navegable con panel interno de evidencia pendiente y explicación prudente. El build de revisión puede funcionar; la publicación final requiere resolver las evidencias y aprobar los textos. No introducir ejemplos de relleno ni respuestas inventadas para eliminar los pendientes.

## 6A. Transforma tu barrio — Comprender qué significa avanzar

Mantener el nombre elegido, pero usar el barrio como metáfora visual que representa aprendizajes, no como simulador de políticas ni como calculadora ambiental. Presentar tres escenas basadas directamente en P1: recursos, bienestar y comunidad. No afirmar que una respuesta personal modifica impactos medidos. Después de cada reflexión aparece una capa visual que amplía la perspectiva: objetos/materiales, bienestar/vida cotidiana y personas conectadas. El barrio final representa ideas descubiertas, no una nota moral.

### A1. Recursos: ¿cuánto vuelve al ciclo?
Fuente: P1 p.14–15 y p.4. Pregunta literal: «¿Cuántos materiales reciclados se consumen en el mundo?».
Adaptación necesaria para precisión: «Según el dato de 2023 mostrado en la presentación, ¿qué proporción de los materiales consumidos era secundaria?».
Interacción: elegir entre rangos aproximados creados para la web (menos del 10 %; del 10 % a menos del 30 %; del 30 % al 50 %; más del 50 %; no lo sé), confirmar y descubrir el indicador del gráfico original. Clave condicionada a validar fuente/indicador: menos del 10 %, por el 7,2 % de la diapositiva. No usar esta estimación para ranking.
Feedback: el material de la diapositiva muestra que hablar más de circularidad no equivale a cerrar el ciclo material. Vincular con P1 p.15: también los servicios dependen de materiales. No concluir «reciclar no sirve» ni introducir porcentajes nuevos.
Visual: un circuito de materiales que se abre para mostrar entradas de recursos; si se usan proporciones, representar únicamente datos verificados del gráfico y rotular año/indicador. Sin datos aprobados, ilustración cualitativa.

### A2. Bienestar: ¿crecer siempre es mejorar?
Fuente: P1 p.16–18. Pregunta literal: «¿El crecimiento del PIB es siempre positivo?».
Respuesta de reflexión: «Creo que sí», «Depende de qué crezca», «Creo que no», «No lo tengo claro». No answerKey ni puntuación. Después preguntar, como en P1 p.17, «¿Qué piensas cuando se habla de decrecimiento?».
Permitir una reacción con tarjetas textuales neutrales: curiosidad, preocupación, rechazo, esperanza, dudas u otra reacción/no responder. Estas opciones son adaptación, no una encuesta de los ponentes. No recoger texto libre ni fingir resultados de otros visitantes.
Feedback: invitar a distinguir aumento de actividad económica de bienestar y preguntar qué mejora, para quién y con qué recursos. Presentarlo como síntesis pedagógica del bloque, pendiente de aprobación; no atribuir ejemplos nuevos al PDF. Si se usa la noticia de la DANA de p.16, conservar contexto y no convertir el daño en espectáculo.
Visual: alternar «Actividad económica» y «Bienestar» mediante dos lentes sobre la misma escena, sin medidores inventados.

### A3. Comunidad: ¿estamos más dispuestos de lo que creemos?
Fuente: P1 p.25–26 y p.3. Conservar la primera pregunta de p.25 sobre aportar el 1 % del sueldo anual para políticas eficaces contra el cambio climático. Ofrecer «Sí», «No», «No lo sé» y «Prefiero no responder»; indicar «Es una reflexión, no una donación». No pedir ingresos ni datos personales.
Segunda pregunta literal: «¿Qué porcentaje de personas en todo el Estado dirías que responden afirmativamente a la pregunta anterior?». Recoger una estimación por intervalos, sin calificarla de correcta/incorrecta ni revelar una cifra española no comprobada.
Feedback: «El estudio mostrado en la presentación observa que tendemos a subestimar la disposición de otras personas a actuar». Atribuir a P1 p.26; explicar que no son resultados de esta pantalla ni observaciones de este visitante. Conectar con p.3: los problemas sociales requieren redes comunitarias.
Visual: descubrir una red de personas que colaboran, sin representar un porcentaje nacional mediante cantidad de figuras. Cierre: «Mirar los recursos, distinguir bienestar y actuar en común». Ofrecer una pregunta inspiradora de adaptación: «¿Qué conversación te gustaría iniciar en tu entorno?», sin respuesta obligatoria.

## 6B. Detectives del clima — ¿Te lo crees?

Mantener el formato de casos original de P2 p.2–17. Usar imágenes/contextos de los casos reales seleccionados, no gráficos ni marcas ficticias. Tres rondas diferenciadas: dos casos y una construcción del método. Pistas: «Qué veo», «Qué puedo comprobar» y «Qué falta saber». Una pista no puede inventar una investigación ausente. No identificar acierto por fuente famosa o apariencia profesional.

### B1. Clima y alimentación — Caso 2 original
Fuente: P2 p.4 y p.12. Presentar el caso 2, sobre la amenaza del cambio climático para el futuro de la alimentación, con una paráfrasis breve y fiel del titular; conservar medio, fecha si legible y alcance de lo que se muestra.
Pregunta original de la dinámica: «¿Te lo crees?». Opciones adaptadas: «Me lo creo», «No me lo creo», «Necesito comprobarlo». La P2 p.12 lo etiqueta verdadero; no marcar prudencia como error.
Feedback de prototipo: «La presentación clasifica este caso como verdadero. Para comprender por qué, revisa las pruebas y el contexto del contenido». La explicación factual completa debe proceder de la verificación enlazada o ser validada por Verificat; no inventar cifras ni consecuencias específicas.
Visual: fuente y elementos del contenido aparecen al tocar, con texto accesible reconstruido; no reproducir la captura como única forma de lectura.

### B2. Los mapas del tiempo — Caso 6 original
Fuente: P2 p.8 y p.16. Presentar la comparación de mapas rotulados 1986 y 2022 que sugiere que el uso del rojo exagera el calor. Parafrasear el mensaje y mostrar el material original autorizado, sin fabricar mapas sustitutos que parezcan evidencia.
Pregunta: «¿Te lo crees?», con las mismas tres opciones. P2 p.16 lo clasifica falso.
Pregunta adaptada de método: «¿Qué necesitarías comprobar antes de comparar estas imágenes?». Elegir una o más pistas: fecha/procedencia, variable representada y escala/leyenda. Todas son comprobaciones, no afirmaciones de haber encontrado una manipulación concreta.
Feedback: mostrar el veredicto de la presentación y las preguntas a verificar. No inventar fechas reales de emisión, valores, atribuciones a cadenas o edición de mapas sin evidencia original. Dejar esas explicaciones pendientes si no están en fuentes aportadas.

### B3. Construye tu método
Fuente: pregunta literal de P2 p.20, «¿Qué preguntas os haríais para verificar una información?», y las cuatro preguntas de p.22.
Interacción: abrir cuatro piezas grandes, en cualquier orden, con las preguntas originales: «¿Cómo me quiere hacer reaccionar?», «¿Quién hay tras la información?», «¿Qué dicen otras fuentes fiables al respecto?» y «¿Qué pruebas aporta?». Mostrar un ejemplo de qué se revisaría en B1/B2, sin presentar comprobaciones pendientes como hechas.
No inventar una nube de palabras de otros visitantes. Completar el método al explorar las cuatro piezas; cierre con cuatro herramientas, sin nota de credulidad. Si se muestran sellos de casos, separar «Exploré pistas» de «Coincidí con el veredicto del material» y no penalizar «Necesito comprobarlo».

## 6C. ¿Verde de verdad? — Abrir una promesa publicitaria

Sustituir los tres productos ficticios por tres capas del mismo caso de H&M que utiliza P2. Mantener escaparate/etiquetas como lenguaje visual, pero la navegación es «Promesa», «Investigación» y «Conclusión». Se puede explorar las dos primeras en cualquier orden; la conclusión queda disponible tras ambas o mediante «Ver contexto y continuar». No sumar puntos por repetir capas. Usar material autorizado de la campaña o una representación editorial que no invente un anuncio alternativo de la empresa.

### C1. ¿Qué busca el anuncio?
Fuente: P2 p.30–31, campaña «Let’s Close The Loop». Pregunta literal: «¿Qué puede buscar esta marca haciendo este tipo de publicidad?».
Respuesta de reflexión con varias selecciones posibles: comunicar una iniciativa, mejorar su imagen, fidelizar, promover compras, no lo sé. Son hipótesis creadas para adaptar la pregunta abierta: no afirmar que se han probado intenciones internas ni dar una respuesta única.
Interacción: tocar zonas amplias de un panel que distinguen «Lo que promete», «Qué sensación produce» y «Qué habría que comprobar». No añadir promesas que no aparecen en el anuncio aportado. Si el vídeo no está disponible, trabajar solo con el material visible y declarar el límite al operador.

### C2. Sigue la investigación
Fuente: P2 p.33–34. Pregunta adaptada: «¿Cómo comprobaron adónde iba la ropa entregada?».
Opciones: «Siguieron prendas con rastreadores», «Se basaron solo en el anuncio», «Preguntaron por opiniones en redes». La diapositiva describe diez rastreadores en diez prendas; clave: rastreadores. Reconstruir el recorrido con tarjetas de pasos, no con rutas geográficas inventadas.
Feedback: «Según la investigación de Aftonbladet recogida en la presentación, algunas prendas terminaron en destinos que cuestionaban la promesa de reciclaje». Añadir detalles solo dentro del alcance documentado en p.33 y del artículo original revisado. Distinguir seguimiento de algunas prendas de una medición estadística de toda la ropa.

### C3. Reconoce el mensaje y su consecuencia
Fuente: P2 p.36 y p.38–39 sobre greenwashing; P1 p.14–15 sobre materiales/reciclaje. Pregunta adaptada: «¿Qué debemos comprobar antes de aceptar una promesa de reciclaje?».
Opciones: «Qué ocurre realmente con los materiales», «Solo si el anuncio parece verde», «Solo si la marca es conocida». Clave: primera; las opciones son adaptación didáctica.
Definir greenwashing mediante una síntesis aprobada del bloque, distinguiendo comunicación ambiental engañosa de una mejora concreta demostrada. Cierre con la pregunta de reflexión «¿Qué información necesitarías antes de comprar?», sin compra obligatoria ni culpa. Conectar con P1: reciclar no sustituye examinar el uso total de materiales. Mantener el matiz: este caso no demuestra que todo reciclaje o toda publicidad ambiental sea engañosa.

## 6D. Misión: romper la cadena — Reconocer los argumentos

Conservar el escape room sin reloj ni códigos; tres piezas: «Pruebas», «Estrategias» y «Acción». Usar conceptos y ejemplos del bloque EFECT/retardismo de P2, no nuevas noticias ficticias. Permitir ayuda y explicación para avanzar siempre. Recompensar explorar y aprender, sin puntuar opiniones. La red que se detiene es metáfora del juego, no una medición de desinformación real.

### D1. Las cuatro llaves de verificación
Fuente: P2 p.22. Adaptación interactiva: elegir qué pregunta ayuda a examinar emoción, autoría, contraste y evidencia. Usar literalmente las cuatro preguntas de B3 y emparejarlas con esos cuatro objetivos, mediante dos toques consecutivos o botones equivalentes; no arrastre obligatorio. Mantener una ficha/objetivo seleccionado claramente y confirmación reversible.
Explicación: revisar la emoción provocada es parte del método, pero sentir preocupación no demuestra que una noticia sea falsa. Consultar otras fuentes exige comprobar su calidad e independencia, no buscar solo coincidencias. Las frases explicativas son adaptación editorial a validar. Desbloquear «Pruebas» tras revisar el método.

### D2. Identifica la estrategia EFECT
Fuente: P2 p.23–28. Mostrar los cinco nombres y definiciones del material: expertos falsos, falacias lógicas, expectativas imposibles, cherry picking y teorías de la conspiración. Conservar que hay dos E en el acrónimo; no usar la letra como id único.
Elegir dos emparejamientos por partida de un banco de cinco, variando por ids y manteniendo el orden estable durante el reto. Definiciones adaptadas fielmente: presentar como experto a quien no tiene conocimiento relevante; argumento con fallo de razonamiento; exigir certeza/precisión imposible antes de actuar; seleccionar solo datos favorables ignorando el conjunto; atribuir los hechos a planes secretos malignos sin pruebas suficientes. No afirmar que toda investigación de intereses o conspiración histórica es falsa por definición.
Pedir «¿Qué estrategia describe este mecanismo?». Feedback basado en la página correspondiente. Ofrecer «Ver ejemplo de la presentación» solo si ese ejemplo ha sido transcrito y validado; no inventarlo. Ayuda permite leer las definiciones sin perder ni bloquear la pieza. Desbloquear «Estrategias» al completar y revisar las dos explicaciones.

### D3. ¿Qué efecto tienen estos mensajes?
Fuente: definición de retardismo P2 p.36, narrativas p.37–41 y pregunta literal p.42: «¿Qué consecuencias pueden producir este tipo de narrativas?».
Explorar las cuatro narrativas nombradas en las diapositivas: tecnooptimismo, greenwashing, responsabilizar a los individuos y catastrofismo climático. Usar solo los ejemplos visuales/textuales efectivamente presentes y legibles o las definiciones, sin añadir citas inventadas entre comillas. Los nombres son temas para analizar, no afirmar que toda innovación o toda advertencia de riesgo sea retardismo.
Ofrecer consecuencias como hipótesis de reflexión: retrasar medidas, trasladar toda responsabilidad a individuos, desanimar o dificultar decisiones informadas. No imponer una correspondencia universal de una consecuencia por narrativa. Revelar la definición del material: aceptar el problema mientras se retrasa u obstaculiza una respuesta efectiva. Conectar con las redes comunitarias de P1 p.3 y el bloque de futuros/acción p.19–26.
Desbloquear «Acción» y convertir la cadena en una red de colaboración. Cierre de adaptación: «Comprobar, comprender y actuar en común». Invitar a identificar una pregunta que se lleva para futuras conversaciones, sin pedir texto libre ni compromisos públicos.

### 6E. Cobertura mínima y control antes de entregar

| Bloque del material | Retos que lo desarrollan |
| --- | --- |
| Límites materiales, reciclaje y base material (P1 4, 14–15) | A1, C2–C3 |
| PIB, bienestar y decrecimiento (P1 16–18) | A2 |
| Comunidad, futuros y disposición percibida (P1 3, 19–26) | A3, D3 |
| Casos de «¿Te lo crees?» (P2 2–17) | B1–B2 |
| Cuatro preguntas de verificación (P2 20–22) | B3, D1 |
| Estrategias EFECT (P2 23–28) | D2 |
| Publicidad H&M e investigación (P2 30–34) | C1–C2 |
| Retardismo y sus consecuencias (P2 35–42) | C3, D3 |

No prometer reproducir toda diapositiva en doce retos: el origen histórico de citas y otros ejemplos visuales quedan como contenidos no incluidos. Mantener cobertura de objetivos, no confundir fidelidad con copia literal de todo. Incluir una pregunta original reconocible por experiencia y la referencia junto al texto adaptado en el manifiesto.

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

Presupuesto visible por paso: título de hasta 10 palabras; introducción hasta 25; etiqueta principal de opción 3–7 palabras, con una línea de apoyo de hasta 14; explicación principal hasta 45 palabras; pista hasta 35. Adaptar el contenido largo de las secciones 5 y 6A–6E sin alterar su sentido; conservar la versión completa en los datos y ofrecer «Ver por qué» para ampliar en un panel con navegación explícita. No truncar con puntos suspensivos ni reducir letra para hacer caber texto.

Redactar en segunda persona, con verbos concretos: «Elige», «Toca», «Descubre», «Comprueba». Explicar greenwashing como «apariencia de sostenibilidad sin pruebas suficientes» al primer uso y mantener el matiz de cada caso. Cambiar un simple «Incorrecto» por «Hay una pista que cambia la conclusión». Para aciertos usar «Bien visto» seguido de la razón, sin alabanzas repetitivas. No usar puntuación humillante ni etiquetas de persona buena/mala.

### 7.4. Composición por pantalla

Portada: colocar título y una frase breve arriba y cuatro accesos equivalentes en cuadrícula 2×2 para pantalla grande horizontal. Mostrar las cuatro opciones a la vez, sin scroll, carrusel ni pestañas ocultas en el perfil objetivo. No dar por hecho que una cuadrícula de pantalla completa es físicamente alcanzable: configurar una banda de interacción central/inferior y márgenes según tamaño/altura reales. Si no caben textos y botones grandes, reducir decoración antes que tipografía. En vertical mantener 2×2 si es legible y alcanzable; en móvil usar una columna con scroll natural. No encoger todo proporcionalmente.

Cada acceso incluye ilustración propia (aproximadamente un tercio del alto disponible), nombre, invitación breve, duración real por juego y CTA específico. Usar una sola tarjeta-botón semántica por acceso sin anidar botones. CTA: «Transformar el barrio», «Investigar mensajes», «Examinar promesas» y «Iniciar la misión». Mostrar «Toca una experiencia para empezar». No marcar unas como bloqueadas ni imponer un orden. La cuadrícula de portada es un selector; los juegos deben tener escenas y mecánicas distintas, no repetir cuatro cuestionarios con otra decoración.

Reto de barrio: usar tres escenas —recursos, bienestar, comunidad— como ventanas de aprendizaje de A1–A3. Mostrar preguntas originales y respuestas neutrales de reflexión cuando corresponda. La escena añade capas tras explorar, sin afirmar cambios físicos causados por opiniones ni mostrar una ciudad premiada/castigada. Evitar medidores de impacto inventados.

Reto de detectives: mostrar cada caso original con texto legible y evidencia visible. Las pistas separan qué aporta la presentación y qué queda por verificar. No mostrar el sello verdadero/falso antes de responder; después atribuir el veredicto al material y explicar con evidencia validada. En B3 montar cuatro herramientas tocables, sin contenido ficticio de otras personas.

Reto del escaparate: usar las tres capas «Promesa», «Investigación» y «Conclusión» del mismo caso H&M. Paneles grandes y recursos legibles; distinguir hipótesis sobre intención del anuncio de hechos del seguimiento documentado. No mantener tres productos inventados ni clasificación genérica de promesas desligada del caso.

Reto de misión: red de mensajes y tres piezas nombradas «Pruebas», «Estrategias» y «Acción». Usar tarjetas de método, definiciones EFECT y consecuencias de narrativas del material. Emparejar por toques con selección reversible y alternativa de lista, sin teclado ni códigos. No confundir dos E de EFECT.


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

Crear SVG propios por capas: barrio con edificios, personas, vegetación y movilidad; detectives con tarjeta, lupa, sello y gráfica; escaparate con campaña, etiquetas y recorrido documentado; misión con red de mensajes y piezas. Mantener todos los recursos locales y una complejidad visual equivalente entre los cuatro juegos. Compartir grosor de trazo, sombras y radios de 20–28 px. Usar ilustraciones como información: la lupa revela contexto, la escena de comunidad descubre conexiones y la gráfica de recursos revela su indicador y año. En gráficos reconstruidos conservar valores, escala, fechas, etiquetas y proporciones del material; la animación no debe distorsionarlos. Si falta evidencia, usar una ilustración cualitativa, no inventar datos.

Respuesta visual al toque en aproximadamente 100 ms; transiciones de pantalla 180–280 ms y transformaciones de escena 400–700 ms. No exigir esperar a una animación para poder leer; habilitar la acción cuando el estado esté listo. Animaciones de portada lentas y discretas, sin destellos ni zoom continuo. Evitar confeti a pantalla completa, sonidos automáticos y movimientos que compitan con el contenido. Respetar prefers-reduced-motion y ofrecer «Menos movimiento», con resultados equivalentes sin animación.

### 7.7. Adaptación física y accesibilidad

Tomar 1920×1080 como maqueta, no como hardware confirmado. Probar también 1366×768, 3840×2160, 1080×1920 y 390×844. Comprobar escalado del escritorio y devicePixelRatio. No escalar todo automáticamente en 4K: considerar dimensiones físicas y distancia real de lectura. Mantener navegación y acciones en una banda central/inferior alcanzable; altura ajustable por configuración. No depender de tocar la parte superior de un videowall. Reservar márgenes y zonas de exclusión configurables para biseles; aplicar la geometría real cuando se conozca.

Usar botones HTML semánticos, foco visible, orden de tabulación lógico y etiquetas accesibles. En diálogos mover foco, contenerlo y devolverlo al disparador. Anunciar resultado y cambio de reto con aria-live sin leer toda la pantalla repetidamente. Ofrecer texto ampliado sin recortes y no bloquear el zoom del navegador. No depender del color, audio, hover, gestos multitáctiles o arrastre preciso. Evitar scroll en el perfil grande: dividir explicaciones largas en pasos; en móvil permitir scroll natural sin ocultar CTA ni contenido.

Usar una estrategia de eventos que no duplique click y pointerup. Bloquear dobles confirmaciones y segundo puntero durante la transición. Usar touch-action apropiado por control, sin anular el zoom global. Las preferencias de accesibilidad deben estar a un toque de distancia mediante control visible «Lectura y movimiento», sin menús técnicos.

### 7.8. Revisión visual y consistencia

Antes de cerrar la implementación producir una hoja de estilo con paleta, tipografía, botones y estados, y capturas de portada, una ronda y un resultado de cada experiencia. Revisarlas y corregir, sin detener el desarrollo para pedir aprobación de cada paso. Comparar con los tokens y presupuestos de texto. Comprobar que en menos de cinco segundos se entiende dónde tocar y qué se obtiene. No prometer que ese criterio está validado con público si solo lo evalúa el desarrollador.

Usar el siguiente checklist para aceptar el acabado: una acción principal clara; contraste medido; títulos completos; sin textos diminutos; ninguna respuesta distinguible como correcta antes de jugar; imágenes nítidas; iconos con etiqueta; foco y pulsación visibles; feedback amable y concreto; controles físicamente alcanzables; sin pantallas vacías o transiciones bruscas; apariencia coherente entre menú y juegos. Realizar prueba física con una persona nueva cuando sea posible y registrar si se hizo o está pendiente.

## 8. Estado, reinicio y robustez

Definir una máquina de estados explícita: portada/selector → introducción → reto → explicación → siguiente reto → resultado. Para C añadir campaña y capas de exploración por id; para D añadir emparejamiento, ayuda/reintento y piezas desbloqueadas. Distinguir preguntas reflexivas (sin clave) de conceptos/casos (con evidencia). No modelar la revisita como nuevo acierto. Usar ids estables para experiencias y retos. Añadir confirmación de salida y aviso de inactividad como estados o capas controladas. El reinicio y las preferencias por sesión deben comportarse igual en las cuatro experiencias. Mantener una sola fuente de verdad del estado.

Implementar una única función resetSession() que borre juego elegido, elecciones, puntuaciones, pistas abiertas, objetos visitados, veredictos, ayudas, piezas desbloqueadas, reintentos, diálogos, foco, scroll, animaciones y temporizadores de partida. Cancelar callbacks pendientes y listeners duplicados. Usar un identificador de sesión para que callbacks antiguos no modifiquen una nueva. Llamarla al salir, reiniciar, iniciar cualquiera de las experiencias y recuperarse de un error. Recargar la URL debe abrir la portada, sin recuperar una partida antigua.

No persistir respuestas ni datos personales. No usar cuentas, formularios, cookies de seguimiento, analytics ni backend en la primera versión. Guardar solo preferencias de accesibilidad si se justifica; definir cómo restablecerlas para el siguiente visitante.

Inactividad configurable: tras 60 s de ausencia de acciones significativas, mostrar «¿Sigues ahí?» con «Continuar» y «Terminar». Dar 15 s adicionales antes de resetear. No contar movimiento incidental del ratón como actividad. En paneles largos permitir extender el tiempo de lectura. En resultado volver a portada a los 45 s, con aviso y botón «Seguir leyendo». Usar tiempos absolutos, no solo decrementos de setInterval: al volver de suspensión o pestaña oculta, comprobar el tiempo y resetear sesiones vencidas.

Incluir límite de errores: mostrar pantalla amable con «Volver al inicio» si falla el juego, sin consola técnica visible. Mantener la interfaz operable si falta una imagen, con sustitución local. No recargar en bucle ante errores persistentes.

## 9. Arquitectura y entrega técnica

Usar TypeScript y una solución frontend ligera, preferentemente Vite con React si se empieza desde cero; respetar un proyecto existente si lo hubiera. Generar una web estática, sin secretos ni llamadas a IA en ejecución. Implementar contenido tipado y separado, reducer/máquina de estados, componentes reutilizables y configuración central de tiempos, tamaños y márgenes.

Generar los SVG e ilustraciones de interfaz en el proyecto; conservar los casos visuales originales autorizados como evidencia, diferenciándolos de ilustraciones decorativas. Para la interfaz y usar tipografías de sistema o archivos locales con licencia adecuada. No depender de CDNs, fuentes remotas, iframes, vídeos ni servicios externos durante la partida. No introducir motores pesados para estas cuatro experiencias de tres retos cada una. Centralizar un registro de experiencias con id, título, CTA, duración, color, componente y estado inicial; todos los accesos deben usarlo. No duplicar la lógica de sesión e inactividad por juego.

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
7. Ejecutar al menos 100 ciclos distribuidos entre las cuatro experiencias, incluyendo apertura y revisita de capas en C, ayudas/reintentos en D, cambios de experiencia y reinicios. Comprobar listeners/timers estables y ausencia de crecimiento sostenido de memoria con un método documentado. No afirmar una semana de estabilidad por pasar esa prueba.
8. Aplicar el checklist visual de la sección 7.8 y medir contraste de todos los estados de controles. Probar perfiles de pantalla indicados con screenshots de portada, reto, feedback y resultado. Comprobar texto legible, ausencia de solapamientos, controles visibles y fuentes internas.
9. Comprobar teclado, foco de diálogos, contraste y reducción de movimiento. Conservar acceso al contenido con texto ampliado.
10. Simular asset ausente y un error controlado; ofrecer salida recuperable.
11. Ejecutar typecheck, build y tests sin errores. Verificar dist servido por HTTP/HTTPS, no solo el servidor de desarrollo.
12. En C probar exploración libre de las dos primeras capas, revisitas sin doble conteo y acceso a conclusión según su regla. En D probar todos los conceptos del banco EFECT, emparejamiento por toque, fallo, ayuda y explicación sin bloqueo. Verificar que en A2, A3, C1 y D3 no se puntúan opiniones como correctas/incorrectas.
13. Auditar doce retos contra el manifiesto: cada pregunta original tiene página; cada paráfrasis está marcada; cifras con indicador y año; veredictos atribuidos; explicaciones con evidencia. Comprobar que no quedan los casos ficticios anteriores en código, textos, imágenes ni tests. No aprobar publicación si faltan evidencias esenciales.
14. Hacer prueba física posterior en CIVICAN: mapeo de toque, alcance, escala, juntas, modo quiosco y encendido. Marcarla PENDIENTE hasta realizarla.

## 11. Hitos de implementación y definición de terminado

Entregar progreso en cuatro hitos verificables, sin esperar una nueva autorización para cada paso:
- Hito 1: matriz fuente→reto→pregunta→respuesta, inventario de evidencias/assets y lista de pendientes; portada 2×2 y sistema de sesión funcionales.
- Hito 2: un recorrido completo por experiencia, con contenido trazable, selección reversible, explicación y regreso al selector. No dejar placeholders como si fueran contenido final.
- Hito 3: acabado visual de las cuatro experiencias, accesibilidad, caché y recuperación; revisión de cantidad de lectura y duración con una prueba cronometrada sin presionar al visitante. Si supera el objetivo, reducir texto/pasos accesorios antes que eliminar fuentes o matices.
- Hito 4: suite de pruebas, capturas, manifiesto editorial final, build y operación; distinguir revisión de contenido pendiente de defecto técnico. No afirmar pruebas físicas ni aprobaciones no realizadas.



1. Revisar primero encargo, fuentes, dirección visual (sección 7), sesiones y criterios de aceptación; después el contrato de fidelidad y los doce retos con sus mecánicas diferenciadas. Revisar los documentos disponibles y resumir confirmaciones y supuestos en una nota técnica corta.
2. Crear estructura de contenido y configuración, portada y sistema de sesiones; después desarrollar los cuatro juegos completos, no solo accesos o pantallas de próximamente.
3. Aplicar tokens, presupuestos de texto y estados de botones. Pulir ilustraciones, transiciones suaves y feedback. No entregar una colección de tarjetas genéricas como versión final.
4. Añadir caché, recuperación y accesibilidad; ejecutar pruebas y corregir fallos.
5. Entregar código, dist, instrucciones de despliegue/operación, matriz de validación editorial y resultados de pruebas con capturas. Incluir exactamente qué falta confirmar del equipo real.

Priorizar en este orden: cuatro recorridos completos y comprensibles; reinicio y tacto fiables; aprendizaje y tono inspirador; acabado visual y rendimiento. No sacrificar la estabilidad por efectos. No detenerse después de generar un plan. Avanzar con los supuestos indicados. Pedir aclaración solo si una limitación real impide implementar; distinguir prototipo funcional, aprobación de contenido y aceptación en hardware. No declarar la instalación lista para apertura mientras falten las dos últimas.
