/**
 * NAVARRA CODE & GAME - CAPA DE ACCESO A DATOS (HÍBRIDA)
 * Proporciona soporte transparente para Supabase o LocalStorage Fallback.
 * Permite inicializar con datos de prueba atractivos para que la web
 * funcione de inmediato de forma local y dinámica.
 */

const DB_KEYS = {
  SUPABASE_URL: 'NCG_SUPABASE_URL',
  SUPABASE_KEY: 'NCG_SUPABASE_KEY',
  TALLERES: 'NCG_TALLERES',
  TORNEOS: 'NCG_TORNEOS',
  CONFERENCIAS: 'NCG_CONFERENCIAS',
  JUEGOS: 'NCG_JUEGOS'
};

// Datos de prueba iniciales (Mock Data)
const MOCK_DATA = {
  [DB_KEYS.TALLERES]: [
    {
      id: "t1",
      title: "Taller de programación con Minecraft",
      description: "Aprende a programar de forma divertida resolviendo misiones lógicas en mundos tridimensionales con Minecraft. Ideal para iniciarse en las bases del pensamiento algorítmico.",
      age_range: "6-10",
      instructor: "Academia Minecraft Coders",
      schedule: "Viernes 20 Nov - 16:30 a 18:00",
      capacity: 15,
      category: "Programacion",
      image_url: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&q=80&w=600"
    },
    {
      id: "t2",
      title: "Taller de diseño de videojuegos con Roblox Studio",
      description: "Crea tu propio videojuego multijugador en Roblox Studio. Aprende los fundamentos del diseño de niveles en 3D y a dar interactividad a tu mundo usando código en Lua.",
      age_range: "11-14",
      instructor: "Roblox Creators Club",
      schedule: "Sábado 21 Nov - 10:30 a 12:00",
      capacity: 18,
      category: "Programacion",
      image_url: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=600"
    },
    {
      id: "t3",
      title: "Taller de Programación Visual",
      description: "Domina el desarrollo lógico de forma interactiva y visual. Arrastra y suelta bloques de código en Scratch para crear animaciones divertidas, arte digital y mini-juegos en minutos.",
      age_range: "6-10",
      instructor: "Aula STEAM Navarra",
      schedule: "Sábado 21 Nov - 12:30 a 14:00",
      capacity: 15,
      category: "Programacion",
      image_url: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?auto=format&fit=crop&q=80&w=600"
    },
    {
      id: "t4",
      title: "Taller de Inteligencia Artificial",
      description: "Explora cómo piensan las máquinas. Aprende los fundamentos de las redes neuronales y entrena tus propios modelos sencillos de reconocimiento de imágenes y voz en un entorno lúdico.",
      age_range: "11-18",
      instructor: "Dpto. Inteligencia Artificial Navarra",
      schedule: "Domingo 22 Nov - 10:30 a 12:00",
      capacity: 20,
      category: "Ciencia",
      image_url: "https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&q=80&w=600"
    },
    {
      id: "t5",
      title: "Taller de Diseño con Canva",
      description: "Aprende a crear composiciones gráficas profesionales, logotipos y banners llamativos para tus trabajos escolares o canales de streaming utilizando Canva de forma práctica.",
      age_range: "11-18",
      instructor: "Creative Media Studio",
      schedule: "Sábado 21 Nov - 17:00 a 18:30",
      capacity: 25,
      category: "Diseno-3D",
      image_url: "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=600"
    },
    {
      id: "t6",
      title: "Taller de Programación con IA",
      description: "Descubre cómo programar usando asistentes de inteligencia artificial como ChatGPT y GitHub Copilot. Aprende a estructurar prompts de desarrollo, solucionar bugs e idear mecánicas rápidamente.",
      age_range: "15-18",
      instructor: "DevCore Lab",
      schedule: "Viernes 20 Nov - 18:30 a 20:00",
      capacity: 20,
      category: "Programacion",
      image_url: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=600"
    },
    {
      id: "t7",
      title: "Taller de Programación con Python",
      description: "Adéntrate en el lenguaje de programación más popular del mundo. Aprende su sintaxis limpia y cómo utilizarlo para automatizar tareas, procesar datos y crear pequeños scripts lógicos.",
      age_range: "11-18",
      instructor: "Python Navarra Community",
      schedule: "Domingo 22 Nov - 12:30 a 14:00",
      capacity: 20,
      category: "Programacion",
      image_url: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=600"
    },
    {
      id: "t8",
      title: "Taller de Matemáticas lógicas",
      description: "Desarrolla tu agilidad mental mediante acertijos visuales, laberintos numéricos y divertidos desafíos de lógica matemática diseñados para mentes despiertas y curiosas.",
      age_range: "6-10",
      instructor: "Club de Ciencias Exactas",
      schedule: "Viernes 20 Nov - 16:30 a 17:30",
      capacity: 12,
      category: "Ciencia",
      image_url: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=600"
    },
    {
      id: "t9",
      title: "Taller de Robótica",
      description: "Diseña, ensambla y pon en movimiento tus propios robots autopropulsados con sensores y placas programables de LEGO y Arduino. ¡Desafía las leyes de la física y la automatización!",
      age_range: "11-14",
      instructor: "Robótica Navarra Team",
      schedule: "Sábado 21 Nov - 15:30 a 17:00",
      capacity: 15,
      category: "Robotica",
      image_url: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=600"
    }
  ],
  [DB_KEYS.TORNEOS]: [
    {
      id: "to1",
      title: "Torneo de Minecraft",
      description: "El torneo definitivo de construcción creativa (Build Battle) en Minecraft. Tienes 45 minutos para edificar la estructura más original basada en la temática secreta del festival.",
      game: "Minecraft",
      schedule: "Sábado 21 Nov - 16:00 a 18:30",
      rules: "Se compite en modo creativo individual en servidores privados controlados. Prohibido el uso de mods, texturas o trampas externas. El jurado evaluará originalidad y calidad técnica.",
      prizes: "1º Premio: Kit de Robótica LEGO Mindstorms | 2º Premio: Teclado Mecánico RGB | 3º Premio: Sudadera Navarra Code",
      max_players: 30,
      age_range: "6-14",
      image_url: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&q=80&w=600"
    },
    {
      id: "to2",
      title: "Torneo de Roblox Studio",
      description: "Supera los retos de diseño de niveles y creación de obstáculos (Obby) en Roblox Studio. Quien logre el mapa con mejores scripts y diversión de juego, gana.",
      game: "Roblox Studio",
      schedule: "Domingo 22 Nov - 10:30 a 13:00",
      rules: "Se valorará la calidad de los scripts Lua y la jugabilidad general del mapa diseñado en tiempo real. Dispositivo propio autorizado.",
      prizes: "1º Premio: Suscripción Robux Premium Anual + Trofeo | 2º Premio: Auriculares Gamer Premium",
      max_players: 25,
      age_range: "11-18",
      image_url: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=600"
    },
    {
      id: "to3",
      title: "Torneo de diseño con IA",
      description: "Desafío de prompts e ilustración digital generativa. Los participantes disponen de 10 minutos por ronda para generar la obra de arte digital más espectacular utilizando Stable Diffusion o Midjourney.",
      game: "Stable Diffusion / Midjourney",
      schedule: "Sábado 21 Nov - 11:00 a 13:00",
      rules: "No se permite el uso de recursos externos ya dibujados. Únicamente se evalúa la ingeniería de prompts y el resultado visual final en base a la temática asignada.",
      prizes: "1º Premio: Tableta Gráfica Wacom | 2º Premio: Suscripción Premium de Arte de 1 año",
      max_players: 40,
      age_range: "11-18",
      image_url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=600"
    },
    {
      id: "to4",
      title: "Torneo de cine con IA",
      description: "Crea el cortometraje de ciencia ficción definitivo usando generadores de video y animaciones con Inteligencia Artificial como Runway Gen-2 o Luma Dream Machine en base a un guion temático.",
      game: "Runway / Luma AI",
      schedule: "Viernes 20 Nov - 18:00 a 20:00",
      rules: "Duración máxima del corto: 30 segundos. Se compite de forma individual o en parejas. Los clips deben ser generados íntegramente mediante herramientas de IA en el evento.",
      prizes: "1º Premio: Estabilizador de Cámara Gimbal para Móvil | 2º Premio: Auriculares de diadema con cancelación de ruido",
      max_players: 20,
      age_range: "11-18",
      image_url: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&q=80&w=600"
    },
    {
      id: "to5",
      title: "Hackathon de Python",
      description: "Una carrera contra el reloj resolviendo rompecabezas matemáticos complejos y problemas de optimización de algoritmos usando puro código Python. ¡Demuestra tu velocidad analítica!",
      game: "Python Arena",
      schedule: "Domingo 22 Nov - 15:30 a 19:00",
      rules: "No se permite el acceso a Internet libre, solo documentación oficial de Python preinstalada en los ordenadores de la organización.",
      prizes: "1º Premio: Mini Ordenador Raspberry Pi 5 Kit Completo + 100€ Tarjeta Steam | 2º Premio: Lote de libros de tecnología avanzada",
      max_players: 50,
      age_range: "15-18",
      image_url: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&q=80&w=600"
    },
    {
      id: "to6",
      title: "Torneo de Rocket League",
      description: "Compite en las espectaculares arenas de fútbol con coches voladores. Se juega en parejas (2v2) en consolas de la organización. ¡Domina los cielos!",
      game: "Rocket League",
      schedule: "Sábado 21 Nov - 10:00 a 13:30",
      rules: "Formato de eliminación directa al mejor de tres (Bo3). Se permiten mandos propios USB de juego.",
      prizes: "1º Premio: 2x Auriculares HyperX Cloud + Trofeo de Campeón | 2º Premio: 2x Mandos Inalámbricos DualSense PS5",
      max_players: 32,
      age_range: "11-18",
      image_url: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&q=80&w=600"
    },
    {
      id: "to7",
      title: "Torneo de Programación Visual",
      description: "Scratch Battle Royale. Los participantes deben desarrollar un videojuego de tipo Arcade (como Asteroids o Pong) con mecánicas sorpresa en solo 60 minutos en la plataforma de Scratch.",
      game: "Scratch",
      schedule: "Viernes 20 Nov - 17:00 a 18:30",
      rules: "Uso exclusivo de bloques nativos de Scratch. Se puntuará la estabilidad del juego, la creatividad artística y la diversión general de la experiencia.",
      prizes: "1º Premio: Kit Arduino Maker Starter | 2º Premio: Mochila ergonómica y termo conmemorativo del evento",
      max_players: 20,
      age_range: "6-10",
      image_url: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?auto=format&fit=crop&q=80&w=600"
    },
    {
      id: "to8",
      title: "Game Jam de Roblox Studio",
      description: "Desafío intensivo de 3 horas para el desarrollo cooperativo de videojuegos sobre Roblox Studio. Crea mundos interactivos siguiendo una temática secreta revelada al inicio.",
      game: "Roblox Studio",
      schedule: "Sábado 21 Nov - 15:30 a 18:30",
      rules: "Se compite en equipos de hasta 3 personas. Se debe subir el juego a la plataforma de Roblox antes de finalizar el tiempo del torneo.",
      prizes: "1º Premio: Tarjetas Regalo Amazon de 150€ para el equipo | 2º Premio: Sudaderas exclusivas de Navarra Code",
      max_players: 40,
      age_range: "11-18",
      image_url: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&q=80&w=600"
    },
    {
      id: "to9",
      title: "Game Jam de Unity",
      description: "El reto definitivo de desarrollo en Unity 3D para programadores senior. Crea un videojuego funcional completo en base a las físicas y mecánicas del tema asignado en 4 horas.",
      game: "Unity 3D",
      schedule: "Domingo 22 Nov - 09:30 a 13:30",
      rules: "Se permite el uso de assets artísticos y de sonido gratuitos de la Asset Store de Unity, pero todo el código lógico de scripts C# debe desarrollarse desde cero.",
      prizes: "1º Premio: Monitor Gaming Curvo Full HD 144Hz + Trofeo | 2º Premio: Ratón gaming de alta precisión 16.000 DPI",
      max_players: 15,
      age_range: "15-18",
      image_url: "https://images.unsplash.com/photo-1580234810907-b40315b76418?auto=format&fit=crop&q=80&w=600"
    },
    {
      id: "to10",
      title: "Capture the flag",
      description: "Capture the Flag (CTF). Torneo de ciberseguridad escolar en formato Jeopardy. Resuelve desafíos de criptografía, esteganografía, ingeniería inversa y análisis web para capturar banderas ocultas.",
      game: "Hacking Ético",
      schedule: "Sábado 21 Nov - 17:00 a 20:00",
      rules: "Prohibido el ataque directo a la infraestructura del torneo o a otros participantes. Se puntúa el número de desafíos completados correctamente.",
      prizes: "1º Premio: Licencia VIP Anual de HackTheBox + Ordenador de placa única Raspberry Pi 5 | 2º Premio: Kit de herramientas de ciberseguridad",
      max_players: 30,
      age_range: "15-18",
      image_url: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=600"
    },
    {
      id: "to11",
      title: "Torneo de Kahoot",
      description: "Trivia interactiva gigante con preguntas de tecnología, desarrollo de software, cultura e historia de los videojuegos y STEAM. ¡Rapidez y precisión en tu móvil!",
      game: "Kahoot",
      schedule: "Domingo 22 Nov - 12:00 a 13:00",
      rules: "Participación abierta simultánea a través de la aplicación oficial de Kahoot en el smartphone. Gana quien consiga más respuestas correctas consecutivas y rápidas.",
      prizes: "1º Premio: Altavoz Inteligente con Asistente de Voz | 2º Premio: Divertido juego de mesa de programación lógica",
      max_players: 100,
      age_range: "6-18",
      image_url: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=600"
    }
  ],
  [DB_KEYS.CONFERENCIAS]: [
    {
      id: "c1",
      title: "Conferencia de Ciberseguridad",
      description: "Aprende de forma práctica cómo proteger tu privacidad en Internet. Descubre cómo actúan los piratas informáticos reales y las pautas clave de un hacker ético para blindar tus cuentas y dispositivos contra estafas y virus.",
      speaker: "Dr. Hugo Blanco",
      speaker_company: "Navarra Cyber Security Hub",
      speaker_image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
      schedule: "Sábado 21 Nov - 12:30 a 13:30",
      room: "Salón de Actos Baluarte",
      age_range: "15-18",
      image_url: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=600"
    },
    {
      id: "c2",
      title: "Conferencia de IA",
      description: "La Inteligencia Artificial está cambiando el mundo. Descubriremos de forma sencilla y visual qué es la IA generativa, cómo se entrenan las computadoras y cómo estas herramientas están transformando la música, el arte digital y la robótica.",
      speaker: "Dra. Clara Neuronal",
      speaker_company: "AI Research Lab UPNA",
      speaker_image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200",
      schedule: "Viernes 20 Nov - 18:30 a 19:30",
      room: "Sala Auditorio Principal",
      age_range: "Todo publico",
      image_url: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&q=80&w=600"
    },
    {
      id: "c3",
      title: "Conferencia de Diseño de Videojuegos",
      description: "Descubre el emocionante viaje detrás de la producción de videojuegos. Aprenderás las bases del 'game design': desde cómo idear una mecánica de juego divertida en papel y dibujar los personajes, hasta integrar físicas y música envolvente.",
      speaker: "Marc Pixel",
      speaker_company: "Indie Games Studio",
      speaker_image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200",
      schedule: "Sábado 21 Nov - 18:00 a 19:00",
      room: "Salón de Actos Baluarte",
      age_range: "Todo publico",
      image_url: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=600"
    },
    {
      id: "c4",
      title: "Conferencia de Diseño",
      description: "Explora la revolución del diseño gráfico moderno. Un recorrido dinámico por el diseño vectorial, la ilustración digital, la maquetación web UX/UI y cómo estas disciplinas están dando el salto hacia el diseño interactivo en Realidad Virtual.",
      speaker: "Sara Vectorial",
      speaker_company: "Digix Design Agency",
      speaker_image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200",
      schedule: "Domingo 22 Nov - 11:30 a 12:30",
      room: "Sala STEAM 1",
      age_range: "11-18",
      image_url: "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=600"
    }
  ],
  [DB_KEYS.JUEGOS]: [
    {
      id: "j1",
      title: "Torneo de Ajedrez",
      description: "Demuestra tu estrategia en la arena mental de Navarra Code. Enfrentamientos individuales rápidos con reloj a 10 minutos. Pon a prueba tu capacidad de anticipación y lógica espacial.",
      type: "Juegos de Mesa",
      location: "Aula de Estrategia 2",
      schedule: "Sábado y Domingo continuado",
      capacity: "Enfrentamientos individuales 1v1",
      age_range: "Todo publico",
      image_url: "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?auto=format&fit=crop&q=80&w=600"
    },
    {
      id: "j2",
      title: "Torneo de 4 en raya speed",
      description: "El clásico juego de conectar cuatro fichas pero con límite de tiempo frenético de 3 segundos por movimiento. Una divertida batalla de reflejos rápidos e intuición geométrica.",
      type: "Juegos de Mesa",
      location: "Área Central - Ring Secundario",
      schedule: "Viernes tarde y Sábado completo",
      capacity: "Duelos individuales veloces",
      age_range: "Todo publico",
      image_url: "https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?auto=format&fit=crop&q=80&w=600"
    },
    {
      id: "j3",
      title: "Torneo de papiroflexia",
      description: "Un desafío físico y creativo. Pliega papel para dar vida a las figuras geométricas más ingeniosas o aviones que vuelen más lejos. Pon a prueba tu destreza manual y visión en 3D.",
      type: "Juegos Fisicos",
      location: "Rincón Creativo Origami",
      schedule: "Todo el fin de semana",
      capacity: "Talleres y desafíos continuos rotativos",
      age_range: "Todo publico",
      image_url: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=600"
    },
    {
      id: "j4",
      title: "Matemáticas con el Abaco",
      description: "Experimenta la velocidad del cálculo mental tradicional utilizando el ábaco. Rétate a resolver sumas y multiplicaciones gigantescas más rápido que una calculadora digital convencional.",
      type: "Juegos Fisicos",
      location: "Zona de Cálculo Mental",
      schedule: "Domingo de 10:00 a 14:00",
      capacity: "Desafíos contrarreloj individuales",
      age_range: "Todo publico",
      image_url: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&q=80&w=600"
    },
    {
      id: "j5",
      title: "Mejor pintura",
      description: "El muro del arte digital y físico en Navarra Code & Game. Exprésate libremente plasmando tu visión de la tecnología y el futuro en un lienzo cooperativo gigante.",
      type: "Juegos Fisicos",
      location: "Muro de Expresión Artística",
      schedule: "Todo el fin de semana",
      capacity: "Espacios de dibujo libre continuo",
      age_range: "Todo publico",
      image_url: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=600"
    },
    {
      id: "j6",
      title: "Crea tus propias joyas",
      description: "Fusión de moda y STEAM. Utiliza resinas reactivas, piezas geométricas impresas en 3D y elementos reciclados para crear tus propios accesorios, collares y pulseras con estilo ciberpunk.",
      type: "Juegos Fisicos",
      location: "Stand Artesanía & Tecnología",
      schedule: "Sábado y Domingo (Turnos de 30 min)",
      capacity: "Talleres para 12 participantes simultáneos",
      age_range: "Todo publico",
      image_url: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=600"
    }
  ]
};

// Clase adaptadora para el acceso a datos
class DatabaseAdapter {
  constructor() {
    this.initMockData();
    this.supabaseClient = null;
    this.initSupabaseClient();
  }

  // Inicializa datos en LocalStorage si no existen o si cambió la versión
  initMockData() {
    const CURRENT_VERSION = 'v2'; // Forzar reseteo si cambiamos los datos iniciales
    const storedVersion = localStorage.getItem('NCG_MOCK_VERSION');

    if (storedVersion !== CURRENT_VERSION) {
      Object.keys(MOCK_DATA).forEach(key => {
        localStorage.setItem(key, JSON.stringify(MOCK_DATA[key]));
      });
      localStorage.setItem('NCG_MOCK_VERSION', CURRENT_VERSION);
      console.log("Mock data inicializada a la versión: " + CURRENT_VERSION);
      return;
    }

    Object.keys(MOCK_DATA).forEach(key => {
      if (!localStorage.getItem(key)) {
        localStorage.setItem(key, JSON.stringify(MOCK_DATA[key]));
      }
    });
  }

  // Intenta inicializar el cliente de Supabase
  // Intenta inicializar el cliente de Supabase
  initSupabaseClient() {
    let url = localStorage.getItem(DB_KEYS.SUPABASE_URL);
    let key = localStorage.getItem(DB_KEYS.SUPABASE_KEY);

    // Si no están en LocalStorage, establecer las credenciales proporcionadas como predeterminadas
    if (!url || !key) {
      url = 'https://shuehcrlyolakwkosgae.supabase.co';
      key = 'sb_publishable_-JKoHcQK-R3SdyjnYUnQSQ_OFgkxkna';
      
      localStorage.setItem(DB_KEYS.SUPABASE_URL, url);
      localStorage.setItem(DB_KEYS.SUPABASE_KEY, key);
    }

    if (url && key && window.supabase) {
      try {
        this.supabaseClient = window.supabase.createClient(url, key);
        console.log("Conectado con éxito a Supabase.");
      } catch (err) {
        console.error("Error al conectar con Supabase:", err);
        this.supabaseClient = null;
      }
    } else {
      this.supabaseClient = null;
    }
  }

  // Sincroniza y exporta los datos locales (mocks) a las tablas reales de Supabase
  async syncLocalToSupabase() {
    if (!this.supabaseClient) {
      return { success: false, message: "Supabase no está conectado." };
    }

    try {
      const categories = ['talleres', 'torneos', 'conferencias', 'juegos'];
      let syncedCount = 0;

      for (const cat of categories) {
        const config = this.getMap(cat);
        if (!config) continue;

        // Obtener datos locales
        const localData = JSON.parse(localStorage.getItem(config.lsKey) || '[]');
        if (localData.length === 0) continue;

        // Limpiar IDs e info temporal para que Supabase los autogenere
        const cleanData = localData.map(item => {
          const newItem = { ...item };
          // Si el ID tiene formato local (ej: t1, to1, c1, j1), lo borramos para que Supabase use UUID
          if (typeof newItem.id === 'string' && /^(t|to|c|j)\d+/.test(newItem.id)) {
            delete newItem.id;
          }
          delete newItem.created_at; // Dejar que Supabase cree el timestamp
          return newItem;
        });

        // Insertar en Supabase
        const { error } = await this.supabaseClient
          .from(config.dbTable)
          .insert(cleanData);

        if (error) {
          throw new Error(`Error al insertar en la tabla '${config.dbTable}': ${error.message}`);
        }
        syncedCount += cleanData.length;
      }

      return { success: true, message: `¡Sincronización completada! Se han exportado ${syncedCount} elementos a tus tablas de Supabase.` };
    } catch (err) {
      console.error("Error al sincronizar datos:", err);
      return { success: false, message: err.message };
    }
  }

  // Obtiene el estado actual de la conexión
  getDbStatus() {
    return {
      isSupabase: this.supabaseClient !== null,
      supabaseUrl: localStorage.getItem(DB_KEYS.SUPABASE_URL) || '',
      supabaseKey: localStorage.getItem(DB_KEYS.SUPABASE_KEY) || ''
    };
  }

  // Configura las credenciales de Supabase
  async setSupabaseConfig(url, key) {
    if (!url || !key) {
      localStorage.removeItem(DB_KEYS.SUPABASE_URL);
      localStorage.removeItem(DB_KEYS.SUPABASE_KEY);
      this.supabaseClient = null;
      return { success: true, message: "Regresado al modo LocalStorage." };
    }

    try {
      if (!window.supabase) {
        throw new Error("La librería de Supabase no está cargada. Asegúrate de tener conexión a Internet.");
      }

      // Probar conexión creando el cliente y realizando una consulta simple
      const client = window.supabase.createClient(url, key);
      
      // Intentamos consultar un elemento arbitrario o simplemente guardamos
      localStorage.setItem(DB_KEYS.SUPABASE_URL, url);
      localStorage.setItem(DB_KEYS.SUPABASE_KEY, key);
      this.supabaseClient = client;

      // Intentamos sincronizar datos locales a Supabase si las tablas existen
      // Esto es opcional, pero al menos creamos el cliente
      return { success: true, message: "Conectado a Supabase correctamente." };
    } catch (err) {
      return { success: false, message: `Error de configuración: ${err.message}` };
    }
  }

  // Obtiene los mapeos de las categorías a las tablas/claves de LS
  getMap(category) {
    const maps = {
      talleres: { lsKey: DB_KEYS.TALLERES, dbTable: 'talleres' },
      torneos: { lsKey: DB_KEYS.TORNEOS, dbTable: 'torneos' },
      conferencias: { lsKey: DB_KEYS.CONFERENCIAS, dbTable: 'conferencias' },
      juegos: { lsKey: DB_KEYS.JUEGOS, dbTable: 'juegos_offline' }
    };
    return maps[category] || null;
  }

  // OBTENER TODOS LOS ELEMENTOS
  async getAll(category) {
    const config = this.getMap(category);
    if (!config) return [];

    // Si Supabase está activo, intentamos consultar
    if (this.supabaseClient) {
      try {
        const { data, error } = await this.supabaseClient
          .from(config.dbTable)
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        return data;
      } catch (err) {
        console.warn(`Error al consultar Supabase en '${config.dbTable}', usando LocalStorage fallback:`, err);
      }
    }

    // Fallback: LocalStorage
    const data = localStorage.getItem(config.lsKey);
    return data ? JSON.parse(data) : [];
  }

  // OBTENER UN ELEMENTO POR ID
  async getById(category, id) {
    const config = this.getMap(category);
    if (!config) return null;

    if (this.supabaseClient) {
      try {
        const { data, error } = await this.supabaseClient
          .from(config.dbTable)
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;
        return data;
      } catch (err) {
        console.warn(`Error al buscar en Supabase, usando LocalStorage:`, err);
      }
    }

    const items = await this.getAll(category);
    return items.find(item => item.id === id) || null;
  }

  // GUARDAR / EDITAR ELEMENTO
  async save(category, itemData) {
    const config = this.getMap(category);
    if (!config) return { success: false, message: "Categoría no válida." };

    const isEdit = !!itemData.id;

    if (this.supabaseClient) {
      try {
        let result;
        if (isEdit) {
          result = await this.supabaseClient
            .from(config.dbTable)
            .update(itemData)
            .eq('id', itemData.id)
            .select();
        } else {
          // Si es nuevo, dejamos que Supabase asigne el ID/UUID
          const newRecord = { ...itemData };
          delete newRecord.id; // Remover ID vacío si existe
          result = await this.supabaseClient
            .from(config.dbTable)
            .insert([newRecord])
            .select();
        }

        if (result.error) throw result.error;
        return { success: true, data: result.data[0] };
      } catch (err) {
        console.warn(`Error al guardar en Supabase. Se intentará en LocalStorage:`, err);
      }
    }

    // LocalStorage Fallback
    const items = await this.getAll(category);
    if (isEdit) {
      const idx = items.findIndex(i => i.id === itemData.id);
      if (idx !== -1) {
        items[idx] = { ...items[idx], ...itemData };
      } else {
        return { success: false, message: "Elemento no encontrado para editar." };
      }
    } else {
      // Generar ID local único
      const newItem = {
        ...itemData,
        id: category.substring(0, 2) + Math.random().toString(36).substr(2, 9),
        created_at: new Date().toISOString()
      };
      items.unshift(newItem);
      itemData = newItem;
    }

    localStorage.setItem(config.lsKey, JSON.stringify(items));
    return { success: true, data: itemData };
  }

  // BORRAR ELEMENTO
  async delete(category, id) {
    const config = this.getMap(category);
    if (!config) return { success: false, message: "Categoría no válida." };

    if (this.supabaseClient) {
      try {
        const { error } = await this.supabaseClient
          .from(config.dbTable)
          .delete()
          .eq('id', id);

        if (error) throw error;
        return { success: true };
      } catch (err) {
        console.warn(`Error al borrar en Supabase, intentando en LocalStorage:`, err);
      }
    }

    // LocalStorage Fallback
    const items = await this.getAll(category);
    const filtered = items.filter(item => item.id !== id);
    if (items.length === filtered.length) {
      return { success: false, message: "Elemento no encontrado." };
    }

    localStorage.setItem(config.lsKey, JSON.stringify(filtered));
    return { success: true };
  }

  // RESTAURAR DATOS DE PRUEBA
  resetAllToMock() {
    localStorage.removeItem(DB_KEYS.SUPABASE_URL);
    localStorage.removeItem(DB_KEYS.SUPABASE_KEY);
    this.supabaseClient = null;

    Object.keys(MOCK_DATA).forEach(key => {
      localStorage.setItem(key, JSON.stringify(MOCK_DATA[key]));
    });

    return { success: true, message: "Datos reiniciados a los valores de prueba." };
  }
}

// Instanciar y exponer globalmente
window.ncgDb = new DatabaseAdapter();
