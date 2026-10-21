// ───────────────────────────────────────────────────────────────────────────
// ESTRUCTURA DE MÓDULOS
// Cada módulo tiene un array de "blocks" que se renderizan en secuencia.
//
// TIPOS DE BLOQUES DISPONIBLES:
//   hero        → Portada del módulo (title, subtitle, image?, accent?)
//   text        → Texto enriquecido con HTML (title?, content)
//   box         → Caja destacada (variant: accent|info|warning|success|purple, title?, text?, iconItems[]?, items[]?, footer?)
//   datatable   → Selector + panel de detalle (title, columns[], rows[] con {icon, highlight, cells[]})
//   reading     → Lectura larga con tabla de contenido (title, sections[])
//   flipcard    → Tarjetas con frente y reverso (title, instruction?, cards[])
//   carousel    → Carrusel de imágenes/tarjetas (title, items[])
//   imageslides → PPT exportada como imágenes (title, images[])
//   glossary    → Glosario interactivo acordeón (title, intro?, terms[])
//   slides      → Presentación estilo PPT (title, slides[])
//   infographic → Imagen/HTML embebido (title?, image|src, aspectRatio?, fullBleed?, caption?, maxWidth?)
//   video       → Video HTML5 o YouTube (title?, src, type: 'html5'|'youtube')
//   quiz        → Cuestionario calificado — afecta el desbloqueo de módulos (title, subtitle?, passingScore?, questions[])
//   scenario    → Quiz diagnóstico sin calificar, feedback por opción (title, situations[], results{})
//   selfcheck   → Preguntas de autoevaluación sin calificación (title, subtitle?, questions[], resultTitle?, resultText?)
//   reflection  → Campo de texto libre que se guarda y se puede recuperar más adelante
//   pyramid     → Pirámide interactiva de niveles (title, hint?, levels[], footer?)
//   flyer       → Tarjeta visual destacada (title?, body, color?, icon?, badge?)
//   closing     → Cierre de módulo (moduleLabel, title, summary, takeaways[], nextHint?)
// ─────────────────────────────────────

export const courseInfo = {
  title: 'Protección de Datos de Pago',
  subtitle: 'Curso de concientización en PCI DSS 4.0.1',
  version: '1.0',
  passingScore: 80,
}

export const modules = [
  // ─────────────────────────────────────
  // MÓDULO 0 — Bienvenida
  // (Redactado sin PDF fuente del negocio — pendiente de validación)
  // ─────────────────────────────────────
  {
    id: 0,
    title: 'Bienvenida',
    description: 'Por qué este curso es para ti y cómo vas a recorrerlo.',
    icon: 'compass',
    estimatedTime: '5 min',
    blocks: [
      // 1. Portada
      {
        type: 'hero',
        title: 'Bienvenida',
        subtitle: 'Por qué este curso es para ti y cómo vas a recorrerlo',
        accent: 'primary',
      },

      // 2. Apertura
      {
        type: 'text',
        content: `
          <p><strong>Cada día, en tu organización, alguien recibe un dato de tarjeta.</strong></p>
          <p>Alguien que dicta su número por teléfono para pagar una factura. Un correo con la foto de una tarjeta "para agilizar" un reembolso. Una captura de pantalla que alguien reenvía por WhatsApp sin pensarlo dos veces.</p>
          <p>En cada uno de esos momentos hay una decisión. Y esa decisión casi nunca la toma el área de tecnología: la toma la persona que tiene el dato enfrente.</p>
          <p>Este curso existe para que, cuando ese momento llegue, sepas exactamente qué hacer.</p>
        `,
      },

      // 3. Tema 1 — Por qué estás aquí
      {
        type: 'text',
        title: 'Tema 1 — Por qué este curso es para ti',
        content: `
          <p>No necesitas trabajar en sistemas ni atender pagos todo el día para que este curso aplique a ti. Basta con que, de vez en cuando, veas, escuches, recibas o reenvíes información de una tarjeta de pago.</p>
        `,
      },

      // 4. A quiénes aplica dentro de la organización
      {
        type: 'box',
        variant: 'accent',
        title: 'Los datos de pago pasan por más áreas de las que parece',
        iconItems: [
          { icon: 'phone', text: 'Atención al público y ventas — reciben pagos por teléfono, chat o en persona.' },
          { icon: 'receipt', text: 'Facturación, cartera y tesorería — gestionan cobros, reembolsos y conciliaciones.' },
          { icon: 'users', text: 'Recursos humanos y administración — reciben soportes de gastos, anticipos y reembolsos.' },
          { icon: 'laptop', text: 'Tecnología y soporte — administran los sistemas donde esos datos se procesan.' },
          { icon: 'briefcase', text: 'Liderazgo — aprueba procesos y excepciones que pueden exponer esos datos.' },
        ],
        footer: 'Si tu rol aparece aquí, o si alguna vez un dato de tarjeta llegó a tu correo o a tu celular, este curso es para ti.',
      },

      // 5. Por qué es obligatorio
      {
        type: 'box',
        variant: 'info',
        title: '¿Por qué tengo que hacer este curso?',
        text: `
          <p>El estándar <strong>PCI DSS 4.0.1</strong>, que define cómo deben protegerse los datos de pago, exige que toda organización que los maneje tenga un programa formal de concientización en seguridad (Requisito 12.6).</p>
          <p>Ese programa incluye formación al ingresar a la organización y, como mínimo, una vez cada 12 meses. También debe cubrir amenazas como el phishing y la ingeniería social, que vas a ver en el módulo 2.</p>
        `,
        footer: 'Por eso el certificado de este curso tiene una vigencia de 12 meses.',
      },

      // 6. Pregunta rápida
      {
        type: 'quickcheck',
        context: 'Antes de seguir, una pregunta para ubicarte.',
        question: '¿Quién es responsable de proteger los datos de pago en tu organización?',
        options: [
          'El área de tecnología y seguridad.',
          'El banco o la pasarela de pago que procesa la transacción.',
          'Cada persona que ve, escucha, recibe o reenvía un dato de pago.',
          'Solo quien atiende pagos directamente.',
        ],
        correct: 2,
        explanation: 'Los sistemas y los proveedores ponen controles, pero no pueden impedir que alguien anote un número en un papel o lo reenvíe por un canal no autorizado. La protección depende de las decisiones de cada persona que tiene el dato enfrente, aunque sea una sola vez.',
      },

      // 7. Tema 2 — Cómo funciona el curso
      {
        type: 'text',
        title: 'Tema 2 — Cómo vas a recorrer el curso',
        content: `
          <p>El curso tiene cinco módulos. Cada uno responde una pregunta concreta y se apoya en el anterior: primero entiendes qué proteges, después cómo intentan obtenerlo, qué hacer para evitarlo, qué hacer si algo sale mal y, al final, cómo se ve todo esto en tu trabajo.</p>
          <p>Los módulos se abren en orden. Para pasar al siguiente, recorre el contenido completo y aprueba la actividad de validación del módulo, si la tiene.</p>
        `,
      },

      // 8. Recorrido del curso
      {
        type: 'datatable',
        title: 'Tu recorrido',
        columns: ['Módulo', 'La pregunta', 'Qué vas a poder hacer'],
        rows: [
          { icon: '1', highlight: 'blue', cells: ['¿Qué estamos protegiendo y por qué importa?', 'Distinguir qué datos de tarjeta se pueden guardar con controles y cuáles nunca se pueden guardar.'] },
          { icon: '2', highlight: 'orange', cells: ['¿Cómo empiezan los incidentes?', 'Reconocer un mensaje o una solicitud sospechosa antes de que se convierta en un incidente.'] },
          { icon: '3', highlight: 'green', cells: ['¿Cómo evitamos ser parte del problema?', 'Aplicar tres reglas: solo canales autorizados, credenciales protegidas y un entorno de trabajo controlado.'] },
          { icon: '4', highlight: 'red', cells: ['¿Qué hacemos cuando ocurre un incidente?', 'Actuar en los primeros minutos: parar, reportar, documentar y esperar instrucciones.'] },
          { icon: '5', highlight: 'blue', cells: ['¿Cómo lo aplico en mi trabajo?', 'Resolver tres situaciones reales que integran todo lo que aprendiste y obtener tu certificado.'] },
        ],
      },

      // 9. Cómo se aprueba
      {
        type: 'box',
        variant: 'success',
        title: 'Cómo avanzas y cómo apruebas',
        items: [
          'Los módulos 1 y 3 tienen un quiz de validación: necesitas al menos 5 de 6 respuestas correctas.',
          'El módulo 5 cierra con tres situaciones integradoras: necesitas responder las tres correctamente.',
          'Puedes repetir los quizzes las veces que necesites.',
          'Las simulaciones, las actividades de ordenar, las autoevaluaciones y las reflexiones no tienen nota: son para que practiques y pienses en tu propio trabajo.',
          'Tu progreso se guarda automáticamente. Puedes salir y retomar donde quedaste.',
        ],
        footer: 'Al terminar el módulo 5 descargas tu certificado.',
      },

      // 10. Autoevaluación de punto de partida
      {
        type: 'selfcheck',
        title: '¿Desde dónde empiezas?',
        subtitle: 'Dos preguntas rápidas, sin nota. Responde con lo que realmente pasa en tu día a día.',
        questions: [
          {
            id: 'm0_contacto_datos',
            question: '¿Con qué frecuencia tienes contacto con datos de tarjeta en tu trabajo?',
            options: ['Todos los días.', 'De vez en cuando.', 'Casi nunca, o no estoy seguro.'],
          },
          {
            id: 'm0_que_hacer',
            question: 'Si hoy alguien te enviara la foto de su tarjeta por WhatsApp, ¿sabrías qué hacer?',
            options: ['Sí, tengo claro el procedimiento.', 'Tengo una idea, pero no estoy seguro.', 'No sabría qué hacer.'],
          },
        ],
        resultTitle: 'Cualquiera que sea tu respuesta, este es el lugar correcto.',
        resultText: 'Si tienes contacto frecuente con datos de pago, el curso te ayudará a confirmar que lo estás haciendo bien. Si es ocasional, te preparará para el día en que ocurra, que suele ser cuando nadie lo espera. Y la respuesta a la pregunta del WhatsApp la vas a encontrar en el módulo 3.',
      },

      // 11. Cierre del módulo
      {
        type: 'closing',
        moduleLabel: 'Bienvenida completada',
        title: 'Bienvenida',
        summary: 'Ya sabes por qué este curso aplica a ti, por qué es obligatorio y cómo vas a recorrerlo. La protección de los datos de pago no depende solo de los sistemas: depende de las decisiones de cada persona que tiene un dato enfrente.',
        takeaways: [
          'Los datos de pago pasan por muchas áreas, no solo por quien atiende pagos.',
          'PCI DSS 4.0.1 exige formación en concientización al ingresar y al menos una vez cada 12 meses.',
          'Los módulos se abren en orden; los quizzes de validación requieren 80% o más.',
        ],
        nextHint: 'En el módulo 1 vas a ver qué datos de tarjeta protegemos y por qué tienen tanto valor.',
      },
    ],
  },

  // ─────────────────────────────────────
  // MÓDULO 1 — ¿Qué estamos protegiendo y por qué importa?
  // ─────────────────────────────────────
  {
    id: 1,
    title: '¿Qué estamos protegiendo y por qué importa?',
    description: 'Qué son los datos de pago y qué consecuencias reales tiene exponerlos.',
    icon: '💳',
    estimatedTime: '12–15 min',
    blocks: [
      // 1. Portada
      {
        type: 'hero',
        title: '¿Qué estamos protegiendo y por qué importa?',
        subtitle: 'Qué datos de tarjeta pasan por tus manos y por qué valen tanto',
        requirements: 'PCI DSS 4.0.1 · Requisito 3 (Protección de datos de cuenta) y Requisito 12.6 (Programa de concientización)',
        accent: 'primary',
      },

      // 2. 1.1 Apertura del módulo
      {
        type: 'text',
        content: `
          <p><strong>Probablemente nadie te explicó esto cuando empezaste a trabajar aquí.</strong></p>
          <p>Nadie te dijo qué pasa exactamente cuando alguien te da su tarjeta para pagar, qué información queda registrada en los sistemas que usas, ni qué puede ocurrir si esa información llega a manos equivocadas.</p>
          <p>Este módulo no es sobre tecnología. Es sobre entender qué estás protegiendo y por qué eso tiene consecuencias reales, para que puedas tomar mejores decisiones en tu trabajo de todos los días.</p>
          <p>Este curso no es un curso de ciberseguridad general: es específicamente sobre datos de tarjeta y sobre el estándar que exige protegerlos, PCI DSS. Muchas de las conductas que vas a aprender aplican a la seguridad digital en general, pero acá siempre las vas a ver conectadas a un dato de pago concreto.</p>
          <p><em>Duración: aproximadamente 15 minutos.</em></p>
        `,
      },

      // 3. 1.2 Intro — ¿Qué son los datos de pago?
      {
        type: 'text',
        title: 'Tema 1 — ¿Qué son los datos de pago?',
        content: `
          <p>Imagina que una persona llama a tu empresa para pagar una factura y te dice:</p>
          <p><em>"Te doy mis datos: el número de mi tarjeta es 4532 8812 3344 5566, el nombre es Carlos Andres Mejía, vence en 09/27 y el código de seguridad es 741."</em></p>
          <p>¿Cuáles de esos datos son realmente sensibles? ¿Todos son iguales? ¿Algunos se pueden guardar y otros no?</p>
          <p>La respuesta no es obvia. Depende de qué dato es y de qué significa guardarlo. Aquí está la explicación.</p>
        `,
      },

      // 4. Infografía — Los datos que protegemos
      {
        type: 'infographic',
        title: 'Los datos que protegemos',
        src: './Infografías/M1-DatosQueProtegemos.html',
        aspectRatio: '1080 / 1300',
        maxWidth: 980,
      },

      // 5. Cierre de la sección 1.2
      {
        type: 'text',
        content: `
          <p>Volviendo a Carlos Andres: él compartió sus datos por teléfono con la mejor intención. El problema no es él. El problema es qué haces tú con esa información a partir de ese momento.</p>
          <p>En los próximos minutos vas a entender por qué ese dato tiene tanto valor, y qué tan fácil es que termine en el lugar equivocado.</p>
        `,
      },

      // 5b. No es solo quien recibe pagos por teléfono
      {
        type: 'box',
        variant: 'info',
        title: 'No es solo quien recibe pagos por teléfono.',
        text: 'El mismo criterio aplica en cualquier área que toque un dato de tarjeta, aunque sea de forma ocasional. Por ejemplo: RRHH recibe un correo de un excolaborador pidiendo el reembolso de un gasto y adjunta una foto de su tarjeta para "agilizar" la devolución. Nombre, número completo y fecha de vencimiento, visibles en la imagen.',
        footer: 'Las mismas dos categorías de este módulo aplican: el número y la fecha de vencimiento solo se pueden conservar con los controles adecuados, y ese correo con la foto adjunta ya es un incumplimiento por sí mismo, sin importar que el área no atienda pagos.',
      },

      // 6. 1.3 ¿Por qué importa? — narración
      {
        type: 'box',
        variant: 'accent',
        title: 'Esto mismo ha pasado en organizaciones como la tuya.',
        text: `
          <p>Una empresa de servicios recibe el pago de una persona por teléfono. El colaborador que toma la llamada no tiene un sistema habilitado para registrar la transacción en ese momento, así que anota los datos en un papel. Luego los pasa a un archivo en su computador para no perderlos.</p>
          <p>Ese archivo queda guardado en una carpeta compartida del equipo. Tres personas más tienen acceso a esa carpeta. Una de ellas trabaja desde su casa y descarga el archivo en su computador personal.</p>
          <p>Meses después, ese computador tiene un programa malicioso instalado sin que nadie lo sepa. Los datos de cientos de tarjetahabientes terminan publicados en un sitio ilegal en internet.</p>
        `,
        footer: 'Nadie tuvo intención de causar daño. El problema no fue malicia. Fue un proceso sin controles y una decisión que pareció razonable en el momento.',
      },

      // 7. Pieza gráfica — Diagrama de flujo
      {
        type: 'infographic',
        title: 'De un error pequeño a un incidente real',
        src: './Infografías/M1-DeErrorAIncidente.html',
        aspectRatio: '1080 / 1150',
        maxWidth: 980,
      },

      // 8. Contexto con datos de la industria
      {
        type: 'box',
        variant: 'warning',
        title: 'Esto no es un escenario hipotético.',
        text: `
          <p>Esto aplica a cualquier organización que procese datos de pago: comercios, pasarelas de pago, empresas de servicios o proveedores que manejan datos de pago de terceros, sin importar su tamaño.</p>
        `,
        footer: 'La pregunta no es si esto le puede pasar a tu organización. La pregunta es qué tan preparado estás para que no te pase a ti.',
      },

      // 9. 1.4 El estándar que organiza todo esto
      {
        type: 'box',
        variant: 'info',
        title: 'PCI DSS en una sola frase:',
        text: 'Es el estándar internacional que define cómo deben protegerse los datos de pago en cualquier organización que los procese, almacene o transmita.',
      },

      // 10. Explicación de PCI DSS
      {
        type: 'text',
        content: `
          <p>No lo creó ningún gobierno. Lo crearon las principales marcas de tarjetas —Visa, Mastercard, American Express— porque necesitaban que los datos de sus tarjetahabientes estuvieran protegidos en cualquier comercio del mundo: desde una gran cadena de retail hasta una pasarela de pago en línea.</p>
          <p>La versión vigente es <strong>PCI DSS 4.0.1</strong>, publicada en junio de 2024. Refuerza los controles de autenticación, monitoreo y gestión de riesgos.</p>
          <p><em>Para este curso no necesitas memorizar los 12 requisitos del estándar. Necesitas entender cómo se traducen en decisiones concretas en tu trabajo. Eso es exactamente lo que viene a continuación.</em></p>
        `,
      },

      // 11. A quiénes aplica PCI DSS
      {
        type: 'box',
        variant: 'accent',
        title: 'PCI DSS aplica a tu organización si…',
        iconItems: [
          { icon: '🏬', text: 'Comercios y puntos de venta — aceptan pagos con tarjeta de crédito o débito, en físico o en línea.' },
          { icon: '⚙️', text: 'Pasarelas de pago — procesan o transmiten datos de pago entre el comercio y el banco.' },
          { icon: '🔗', text: 'Proveedores de servicios — ofrecen servicios que impactan la seguridad de los datos de pago de otras organizaciones.' },
        ],
        footer: 'Si trabajas en alguna de estas organizaciones, este curso aplica a ti.',
      },

      // 12. Actividad de validación — quiz de clasificación
      {
        type: 'quiz',
        title: 'Actividad de validación — ¿Puedo guardar este dato?',
        subtitle: 'Una persona acaba de llamar para pagar y te dio varios datos. Clasifica cada uno: ¿se puede guardar o nunca se puede guardar? Necesitas 5 de 6 correctas para avanzar.',
        passingScore: 83,
        questions: [
          {
            id: 'm1_dato_1',
            question: 'Número de tarjeta (PAN): 4532 8812 3344 5566',
            options: ['Solo se puede guardar con controles específicos', 'Nunca se puede guardar — prohibición absoluta'],
            correct: 0,
            explanation: 'El número de tarjeta puede almacenarse, pero solo en sistemas con cifrado fuerte, control de acceso y auditoría activa. Guardarlo en un medio no autorizado —papel, Excel, correo, WhatsApp o cualquier otro— es un incumplimiento, aunque no lo veas a simple vista.',
          },
          {
            id: 'm1_dato_2',
            question: 'Nombre del titular: Carlos Andres Mejía',
            options: ['Solo se puede guardar con controles específicos', 'Nunca se puede guardar — prohibición absoluta'],
            correct: 0,
            explanation: 'El nombre puede almacenarse, pero siempre que vaya junto con el número de tarjeta activa los controles de PCI DSS. Solo el nombre, sin otros datos, no activa esos controles.',
          },
          {
            id: 'm1_dato_3',
            question: 'Fecha de vencimiento: 09/27',
            options: ['Solo se puede guardar con controles específicos', 'Nunca se puede guardar — prohibición absoluta'],
            correct: 0,
            explanation: 'La fecha puede almacenarse con los controles adecuados. Combinada con el número de tarjeta y el nombre, incrementa el riesgo de fraude significativamente.',
          },
          {
            id: 'm1_dato_4',
            question: 'Código CVV: 741',
            options: ['Solo se puede guardar con controles específicos', 'Nunca se puede guardar — prohibición absoluta'],
            correct: 1,
            explanation: 'El CVV nunca puede almacenarse, bajo ninguna circunstancia, en ningún formato: ni papel, ni Excel, ni sistema. Su único propósito es verificar que la tarjeta está física o virtualmente presente en el momento de la transacción.',
          },
          {
            id: 'm1_dato_5',
            question: 'Datos del chip de la tarjeta',
            options: ['Solo se puede guardar con controles específicos', 'Nunca se puede guardar — prohibición absoluta'],
            correct: 1,
            explanation: 'Los datos de banda magnética o chip nunca pueden almacenarse. Contienen información suficiente para clonar una tarjeta físicamente.',
          },
          {
            id: 'm1_dato_6',
            question: 'PIN del titular de la tarjeta',
            options: ['Solo se puede guardar con controles específicos', 'Nunca se puede guardar — prohibición absoluta'],
            correct: 1,
            explanation: 'El PIN es el secreto exclusivo del titular de la tarjeta. Ningún sistema, proceso ni colaborador debe tener acceso a él. Si alguien te pide el PIN de una persona por cualquier razón, es una señal de alerta inmediata.',
          },
        ],
      },

      // 13. Reflexión personal
      {
        type: 'reflection',
        title: 'Antes de continuar, una pregunta para ti',
        storageKey: 'm1_reflexion',
        promptPrefix: '¿Qué decisión de tu trabajo diario podría iniciar una cadena como la que acabas de ver?',
        placeholder: 'Escribe aquí...',
      },

      // 14. Cierre del módulo
      {
        type: 'closing',
        moduleLabel: 'Módulo 1 completado',
        title: '¿Qué estamos protegiendo y por qué importa?',
        summary: 'Ahora sabes qué información constituye un dato de pago, cuáles tienen prohibición absoluta de almacenamiento, y por qué esos datos tienen valor real en el mercado del fraude. También entendiste que la mayoría de los problemas no empiezan con un ataque sofisticado: empiezan con un proceso sin controles y una decisión que pareció razonable.',
        takeaways: [
          'El número de tarjeta, el nombre del titular y la fecha de vencimiento se pueden almacenar, pero solo con controles específicos.',
          'El CVV, los datos del chip/banda magnética y el PIN nunca se pueden almacenar, sin excepciones.',
          'Un error cotidiano —anotar un dato en un medio no autorizado— puede escalar hasta una filtración real con consecuencias legales y económicas.',
          'PCI DSS aplica a comercios, pasarelas de pago y proveedores de servicios que procesan, almacenan o transmiten datos de pago.',
        ],
        nextHint: 'En el módulo 2 vas a ver cómo empiezan realmente los incidentes.',
      },
    ],
  },

  // ─────────────────────────────────────
  // MÓDULO 2 — ¿Cómo empiezan los incidentes?
  // ─────────────────────────────────────
  {
    id: 2,
    title: '¿Cómo empiezan los incidentes?',
    description: 'Las señales que preceden a un incidente, antes de que escale.',
    icon: '🎣',
    estimatedTime: '12–14 min',
    blocks: [
      // 1. Portada
      {
        type: 'hero',
        title: '¿Cómo empiezan los incidentes?',
        subtitle: 'Los mensajes y las solicitudes con los que empieza casi todo',
        requirements: 'PCI DSS 4.0.1 · Requisito 5.4 (Protección contra phishing) y Requisito 12.6.3 (Concientización sobre amenazas de ingeniería social)',
        accent: 'secondary',
      },

      // 2. 2.1 Apertura del módulo
      {
        type: 'text',
        content: `
          <p>En el módulo anterior viste qué datos estás protegiendo y por qué tienen valor. Ahora viene la pregunta que más importa en el día a día:</p>
          <p><strong>¿Cómo empieza realmente un incidente?</strong></p>
          <p>La respuesta casi nunca es un ataque sofisticado. Casi siempre es una situación que parecía normal: un mensaje, una llamada, un archivo, una conexión. Algo que cualquier persona del equipo podría encontrar cualquier lunes. Este módulo te enseña a reconocer esas situaciones antes de que escalen.</p>
        `,
      },

      // 3. 2.2 — Contexto con datos
      {
        type: 'box',
        variant: 'warning',
        title: 'Cuando pensamos en un ataque informático, imaginamos a alguien frente a pantallas llenas de código intentando forzar la entrada a un sistema. La realidad es diferente.',
        text: `
          <p>Según el Verizon Data Breach Investigations Report 2024, el 68% de las brechas de seguridad a nivel global involucran un error humano o ingeniería social. El atacante no forzó ninguna puerta: alguien la abrió sin saberlo.</p>
          <p>En Colombia, el Centro Cibernético Policial de la DIJIN reportó más de 77.000 denuncias por delitos informáticos en 2024, un crecimiento del 23% frente al año anterior. Y según Kaspersky, los ataques de phishing en Colombia crecieron un 120% en 2024.</p>
        `,
        footer: 'No es un problema de sistemas. Es un problema de criterio. Y el criterio se puede desarrollar.',
      },

      // 4. Infografía — vectores de entrada
      {
        type: 'infographic',
        title: '¿Por dónde entran los incidentes de seguridad?',
        src: './Infografías/M2-VectoresDeEntrada.html',
        aspectRatio: '1080 / 1000',
        maxWidth: 980,
      },

      // 5. 2.3 Intro — dos vías
      {
        type: 'text',
        title: 'Tema 2 — Las dos formas más comunes en que empieza un incidente',
        content: `
          <p>Los incidentes relacionados con datos de pago casi siempre empiezan por una de estas dos vías:</p>
          <p><strong><em>Un mensaje que parece legítimo pero no lo es.</em></strong></p>
          <p><strong><em>Una solicitud que parece urgente y razonable pero tiene algo raro.</em></strong></p>
          <p>Cada una de estas vías tiene señales de alerta que puedes aprender a reconocer. Eso es exactamente lo que vamos a ver ahora.</p>
          <p><em>Los descuidos de trabajo remoto —WiFi doméstico, pantallas visibles, documentos impresos en casa— también generan incidentes, pero los vas a ver en el módulo 3 junto con las demás reglas del entorno de trabajo, para no repetir el mismo tema dos veces.</em></p>
        `,
      },

      // 6. Vía 1 — explicación del phishing
      {
        type: 'text',
        title: 'Vía 1 — El mensaje que no es lo que parece',
        content: `
          <p>El phishing es cuando alguien te envía un mensaje haciéndose pasar por una persona o entidad de confianza —tu banco, la DIAN, un proveedor, tu jefe— para conseguir que hagas algo: hacer clic en un enlace, ingresar tus datos, transferir dinero o abrir un archivo.</p>
          <p>El objetivo no siempre es robarte a ti directamente. A veces el objetivo es usar tu acceso para llegar a los datos de pago que están en los sistemas de tu organización.</p>
          <p>En Colombia, los mensajes de phishing más frecuentes en el entorno empresarial se hacen pasar por:</p>
          <ul>
            <li><strong>Bancolombia o Nequi:</strong> alertas de transacciones sospechosas o bloqueo de cuenta.</li>
            <li><strong>La DIAN:</strong> citaciones tributarias o notificaciones de inconsistencias.</li>
            <li><strong>Servicios de mensajería:</strong> paquetes retenidos que requieren pago de impuesto.</li>
            <li><strong>El área de TI interna:</strong> solicitudes de actualización de contraseña o acceso a sistema.</li>
            <li><strong>Proveedores conocidos:</strong> facturas urgentes para aprobar o datos bancarios a actualizar.</li>
          </ul>
        `,
      },

      // 7. Simulación — WhatsApp Bancolombia
      {
        type: 'box',
        variant: 'warning',
        title: 'Simulación de mensaje — WhatsApp · Mensaje recibido',
        text: `
          <div style="background:#F3F4F6; border-radius:12px; padding:14px 16px; margin-bottom:14px;">
            <p style="font-weight:700; margin:0 0 4px;">Bancolombia Seguridad &nbsp;+57 321 4567890</p>
            <p style="margin:0;">Estimado usuario, hemos detectado un intento de acceso no autorizado a su cuenta. Por su seguridad, debe verificar su identidad en las próximas 2 horas o su cuenta será bloqueada. Haga clic aquí para verificar: http://bancolombia-seguridad-co.verify-account.net/login — Equipo de Seguridad Bancolombia</p>
          </div>
          <p>⚠️ <strong>Señal 1:</strong> el número no es un número oficial de Bancolombia (los canales oficiales no envían WhatsApp desde números personales).</p>
          <p>⚠️ <strong>Señal 2:</strong> urgencia artificial — "2 horas o bloqueamos su cuenta".</p>
          <p>⚠️ <strong>Señal 3:</strong> el enlace no es bancolombia.com. Incluye palabras adicionales y un dominio diferente.</p>
          <p>⚠️ <strong>Señal 4:</strong> errores ortográficos: "proximas", "sera" sin tilde.</p>
        `,
      },

      // 8. Simulación — Email DIAN
      {
        type: 'box',
        variant: 'warning',
        title: 'Simulación de mensaje — Correo electrónico · Bandeja de entrada',
        text: `
          <div style="background:#F3F4F6; border-radius:12px; padding:14px 16px; margin-bottom:14px;">
            <p style="margin:0 0 6px;"><strong>De:</strong> notificaciones@dian-colombia-gov.tributario.co &nbsp;|&nbsp; <strong>Para:</strong> colaborador@empresa.com</p>
            <p style="font-weight:700; margin:0 0 4px;">Asunto: URGENTE — Citación tributaria Ref. 2024-8821</p>
            <p style="margin:0;">Estimado contribuyente, la Dirección de Impuestos y Aduanas Nacionales le notifica que su empresa presenta inconsistencias en la declaración de renta del período 2023. Debe descargar el documento adjunto y presentarse en las próximas 48 horas. [Descargar notificación oficial.pdf] — DIAN, Gobierno de Colombia</p>
          </div>
          <p>⚠️ <strong>Señal 1:</strong> la dirección del remitente no es dian.gov.co. Incluye palabras extra: "dian-colombia-gov.tributario.co".</p>
          <p>⚠️ <strong>Señal 2:</strong> urgencia extrema — "48 horas" sin dar tiempo para verificar.</p>
          <p>⚠️ <strong>Señal 3:</strong> el archivo adjunto podría contener malware. La DIAN nunca envía archivos ejecutables por correo.</p>
          <p>⚠️ <strong>Señal 4:</strong> faltas de tilde en el original: "Direccion", "declaracion", "proximas". Los comunicados oficiales no tienen errores.</p>
        `,
      },

      // 9. Nota sobre IA
      {
        type: 'box',
        variant: 'info',
        title: 'Una nota importante sobre inteligencia artificial',
        text: 'Antes, los errores ortográficos eran una señal de alerta confiable. Hoy muchos mensajes fraudulentos ya no los tienen: son redactados con inteligencia artificial, que escribe sin faltas y en un tono muy convincente. Las tildes siguen siendo útiles para detectar algunos intentos, pero ya no es suficiente que un mensaje esté bien escrito para confiar en él. Lo que importa es el canal, el remitente y si la solicitud tiene sentido dentro de un proceso real.',
      },

      // 10. Cuando el phishing pide el dato de la tarjeta
      {
        type: 'text',
        content: `
          <p>Los dos ejemplos anteriores buscan tu clave o que abras un archivo. Pero hay una variante más directa, específica de datos de pago: el mensaje te pide el número de tarjeta y el CVV con el pretexto de "confirmar" o "verificar" una compra.</p>
        `,
      },

      // 11. Simulación — SMS PSE
      {
        type: 'box',
        variant: 'warning',
        title: 'Simulación de mensaje — SMS · Mensaje de texto recibido',
        text: `
          <div style="background:#F3F4F6; border-radius:12px; padding:14px 16px; margin-bottom:14px;">
            <p style="font-weight:700; margin:0 0 4px;">PSE-Confirmaciones</p>
            <p style="margin:0;">Su compra por $850.000 en Falabella.com está pendiente de confirmar. Ingrese el numero de tarjeta y el codigo de seguridad (CVV) en el siguiente enlace para autorizar o su compra sera cancelada: http://pse-confirmaciones.pagoseguro-verificacion.net</p>
          </div>
          <p>⚠️ <strong>Señal 1:</strong> ninguna pasarela de pago legítima solicita el número completo de tarjeta y el CVV por SMS para "confirmar" una compra ya realizada. Ese dato solo se pide una vez, en el momento del pago, dentro de la pasarela oficial.</p>
          <p>⚠️ <strong>Señal 2:</strong> el remitente "PSE-Confirmaciones" imita el nombre de un servicio real (PSE) pero no es un canal oficial de PSE ni de la tienda.</p>
          <p>⚠️ <strong>Señal 3:</strong> el enlace no es el dominio de PSE ni de Falabella. Incluye palabras adicionales como "pagoseguro-verificacion".</p>
          <p>⚠️ <strong>Señal 4:</strong> la urgencia de "su compra será cancelada" busca que actúes sin verificar directamente en la app o el sitio oficial de la tienda.</p>
        `,
      },

      // 12. La regla
      {
        type: 'flyer',
        color: 'primary',
        icon: '💳',
        badge: 'La regla',
        body: 'Ningún proceso legítimo de pago te va a pedir el número completo de la tarjeta y el CVV juntos por mensaje de texto, correo o WhatsApp después de que la compra ya se hizo. Si te lo piden así, es phishing.',
      },

      // 13. Vía 2 — intro
      {
        type: 'text',
        title: 'Vía 2 — La solicitud que tiene algo raro',
        content: `
          <p>La ingeniería social no siempre llega por mensaje. A veces es una llamada, una visita, una conversación. Mira si reconoces alguna de estas cuatro situaciones en tu propio trabajo:</p>
        `,
      },

      // 14. Escenario — Ventas
      {
        type: 'box',
        variant: 'warning',
        title: 'Ventas',
        text: 'Una persona que suele pagarte llama furiosa. Dice que Bancolombia le bloqueó la tarjeta y necesita que le proceses el pago directamente con los datos que te va a dictar por teléfono, "como excepción". Insiste en que es urgente y que ya habló con tu jefe.',
        footer: 'Señal de alerta: ningún proceso autorizado de tu organización debería requerir que tomes datos de tarjeta por teléfono fuera del canal oficial. La urgencia y la presión son una técnica de manipulación.',
      },

      // 15. Escenario — RRHH
      {
        type: 'box',
        variant: 'info',
        title: 'RRHH',
        text: 'Recibes un correo de alguien que dice ser el nuevo proveedor de nómina. Te pide que confirmes los datos bancarios de los empleados para "sincronizar el sistema antes del cierre de mes". El correo parece profesional y cita el nombre de tu jefe.',
        footer: 'Señal de alerta: los datos bancarios de los empleados son información sensible. Ningún proveedor legítimo necesita que se los confirmes por correo. Verifica siempre por un canal independiente antes de compartir cualquier dato.',
      },

      // 16. Escenario — Administración
      {
        type: 'box',
        variant: 'purple',
        title: 'Administración',
        text: 'Un hombre se presenta en recepción diciendo que viene a revisar los datáfonos. Trae chaleco con el logo de una empresa de tecnología. Pide que lo dejen a solas con los equipos "para no interrumpir el trabajo de nadie".',
        footer: 'Señal de alerta: cualquier visita de soporte técnico debe estar registrada y acompañada. Nadie debe tener acceso sin supervisión a equipos que procesan datos de pago. Solicita identificación y llama a confirmar la visita con el proveedor directamente.',
      },

      // 17. Escenario — Liderazgo
      {
        type: 'box',
        variant: 'accent',
        title: 'Liderazgo',
        text: 'Recibes un mensaje de WhatsApp del número de tu gerente general. Te pide que hagas una transferencia urgente a una cuenta nueva de un proveedor. Dice que está en una reunión y no puede hablar, solo necesita la confirmación.',
        footer: 'Señal de alerta: este es el llamado "fraude del CEO". Los delincuentes clonan o suplantan el número del directivo. Ante cualquier solicitud financiera urgente por canal informal, llama al número de siempre para verificar antes de ejecutar.',
      },

      // 18. Las tres palancas psicológicas
      {
        type: 'box',
        variant: 'accent',
        title: 'Las cuatro situaciones que acabas de ver tienen algo en común: usan las mismas tres palancas psicológicas.',
        iconItems: [
          { icon: '⏱️', text: 'Urgencia — "Necesito eso ahora, es para el cierre del mes." "Si no lo haces en los próximos 10 minutos perdemos la venta."' },
          { icon: '🧑‍💼', text: 'Autoridad — "Soy el gerente general y necesito que me pases esos datos." "Llamo de parte de auditoría interna."' },
          { icon: '🤝', text: 'Confianza — "Ya hablé con tu jefe y me dijo que estaba bien." "Somos el proveedor de siempre, solo necesitamos actualizar los datos."' },
        ],
        footer: 'Ninguna de estas situaciones justifica saltarse un control o entregar información sin verificar. Si algo presiona demasiado o parece demasiado urgente, eso ya es una señal.',
      },

      // 19. Las cinco señales de alerta
      {
        type: 'box',
        variant: 'info',
        title: 'Las señales de alerta que siempre están ahí',
        text: 'Todas las situaciones que viste tienen algo en común: dejaron señales. El problema no es que las señales no existan. El problema es que no estamos entrenados para verlas cuando estamos ocupados, bajo presión o cuando el mensaje parece creíble. Estas son las cinco señales de alerta más comunes. Cuando aparezca alguna, detente antes de actuar:',
        items: [
          'Urgencia extrema — te presionan para actuar de inmediato sin tiempo para verificar.',
          'Solicitud fuera del proceso habitual — algo que normalmente no se hace así.',
          'Remitente o número que no coincide exactamente con el oficial.',
          'Enlace o archivo adjunto que no esperabas recibir.',
          'Alguien pide datos que no necesitaría para hacer su trabajo legítimo.',
        ],
        footer: 'Ante la duda, la respuesta siempre es la misma: pausa, verifica por otro canal y reporta si algo te parece raro. Nunca es exagerado preguntar antes de actuar.',
      },

      // 20. Actividad de validación — simulación diagnóstica (no gating)
      {
        type: 'scenario',
        title: 'Te llegó un mensaje — ¿qué haces?',
        subtitle: 'Este ejercicio no tiene calificación mínima: te muestra las consecuencias de cada decisión posible, incluida la incorrecta.',
        situations: [
          {
            id: 'm2_mensaje_1',
            mockup: 'whatsapp',
            content: {
              avatar: '💬',
              sender: 'Nequi Soporte',
              senderNote: '+57 310 9988776',
              message: '¡Hola! Detectamos un movimiento inusual en tu cuenta Nequi por $1.200.000. Si no reconoces esta transacción, debes cancelarla AHORA ingresando tu clave aquí: http://nequi-soporte-co.cancelartransaccion.net',
              time: 'Recibiste este mensaje en tu celular corporativo',
            },
            question: '¿Qué haces?',
            options: [
              {
                text: 'Abro el enlace para ver si la transacción es real y cancelarla antes de que sea tarde.',
                correct: false,
                feedback: 'Eso es exactamente lo que el atacante espera que hagas. El enlace no es de Nequi. Lleva a una página falsa que captura tu clave o instala malware en tu dispositivo. Una vez ingresas tus datos, el atacante tiene acceso a tu cuenta y potencialmente a los sistemas de tu organización. Señal que debiste notar: el dominio del enlace no es nequi.com.co. Tres días después de un caso así, el equipo de seguridad detecta accesos inusuales al sistema de facturación: alguien entró con las credenciales robadas desde una IP desconocida, y en los registros aparecen consultas masivas a la base de datos de tarjetahabientes. El incidente se originó en el momento en que se ingresó la clave en una página que no era Nequi. Esto no es para generar miedo: es para mostrar que una sola decisión, en un momento de distracción, puede ser el inicio de una cadena que afecta a toda la organización.',
              },
              {
                text: 'Ignoro el mensaje. Si fuera real, Nequi me lo notificaría por la aplicación oficial.',
                correct: false,
                feedback: 'Ignorar no es suficiente — y puede ser riesgoso si el mensaje llegó por error a más personas del equipo. La acción correcta no es solo no hacer clic. Es reportar el intento al equipo de seguridad o al responsable designado en tu organización. Esto permite bloquear el mensaje si llegó a otras personas y documentar el intento.',
              },
              {
                text: 'Abro la aplicación de Nequi directamente desde mi celular para verificar si hay algún movimiento.',
                correct: true,
                feedback: 'Muy bien. Eso es exactamente lo correcto. Verificar directamente desde la aplicación oficial —no desde el enlace del mensaje— es la forma segura de confirmar si hay un problema real. Si en la aplicación no aparece ningún movimiento sospechoso, el mensaje era falso. Acción final obligatoria: reporta el intento al canal definido por tu organización para este tipo de situaciones. Aunque no hayas caído, el reporte permite alertar al equipo, bloquear el número o dominio y proteger a otros compañeros que puedan recibir el mismo mensaje.',
              },
              {
                text: 'Le reenvío el mensaje a un compañero para preguntarle si parece legítimo.',
                correct: false,
                feedback: 'Es mejor que hacer clic, pero no es suficiente. Preguntar a un compañero no es el canal correcto para reportar un intento de phishing. Tu compañero puede no saberlo con certeza y podrías generar confusión. Repórtalo directamente al responsable de seguridad o al canal que tu organización tenga definido.',
              },
            ],
          },
        ],
        results: {
          band3: {
            min: 1,
            icon: 'shield',
            title: 'Reconociste la señal.',
            text: 'Verificar por el canal oficial —nunca por el enlace del mensaje— es la respuesta correcta ante cualquier intento de phishing. Recuerda: repórtalo siempre, aunque no hayas caído en la trampa.',
          },
          band2: {
            min: 1,
            icon: 'search',
            title: 'Reconociste la señal.',
            text: 'Verificar por el canal oficial —nunca por el enlace del mensaje— es la respuesta correcta ante cualquier intento de phishing. Recuerda: repórtalo siempre, aunque no hayas caído en la trampa.',
          },
          band1: {
            min: 0,
            icon: 'compass',
            title: 'Revisa las señales que viste.',
            text: 'El dominio del enlace no era el oficial y la urgencia extrema era la trampa. La próxima vez, verifica siempre desde la aplicación oficial y reporta cualquier mensaje sospechoso al canal que tu organización tenga definido.',
          },
          commonNote: 'Este ejercicio no bloquea tu avance: lo importante es que hayas visto las consecuencias de cada decisión posible.',
        },
      },

      // 21. Reflexión personal
      {
        type: 'reflection',
        title: 'Antes de continuar, una pregunta para ti',
        storageKey: 'm2_reflexion',
        promptPrefix: '¿Cuál de las situaciones que viste hoy se parece más a algo que podría pasarte en tu trabajo?',
        placeholder: 'Escribe aquí...',
      },

      // 22. Cierre del módulo
      {
        type: 'closing',
        moduleLabel: 'Módulo 2 completado',
        title: '¿Cómo empiezan los incidentes?',
        summary: 'En el módulo anterior aprendiste qué información protegemos. En este aprendiste cómo intentan obtenerla. Ahora ya sabes reconocer cómo empieza un incidente: casi nunca es un ataque técnico sofisticado. Es un mensaje con un enlace que parece legítimo, una solicitud que suena urgente, una visita de soporte que nadie verificó.',
        takeaways: [
          'Las dos vías más comunes por las que empiezan los incidentes: phishing y solicitudes de ingeniería social disfrazadas por área.',
          'El 68% de las brechas globales involucran un error humano. Reconocer las señales antes de actuar es la primera línea de defensa.',
          'Las tres palancas psicológicas —urgencia, autoridad y confianza— aparecen disfrazadas en casi todos los intentos de engaño.',
          'Ante cualquier señal de alerta: pausa, verifica por otro canal y reporta. Nunca es exagerado preguntar antes de actuar.',
        ],
        nextHint: 'En el módulo 3 vas a ver qué haces concretamente para no ser parte del problema, incluyendo las reglas de trabajo remoto y entorno físico.',
      },
    ],
  },

  // ─────────────────────────────────────
  // MÓDULO 3 — ¿Cómo evitamos ser parte del problema?
  // ─────────────────────────────────────
  {
    id: 3,
    title: '¿Cómo evitamos ser parte del problema?',
    description: 'Tres reglas concretas: canales, credenciales y entorno de trabajo.',
    icon: '🛡️',
    estimatedTime: '15–18 min',
    blocks: [
      // 1. Portada
      {
        type: 'hero',
        title: '¿Cómo evitamos ser parte del problema?',
        subtitle: 'Tres reglas que puedes aplicar hoy',
        requirements: 'PCI DSS 4.0.1 · Requisito 4.2 (Transmisión segura de datos), Requisito 8 (Control de acceso y credenciales), Requisito 9.4 (Protección de medios físicos) y Requisito 12.6 (Concientización)',
        accent: 'primary',
      },

      // 2. 3.1 Apertura del módulo
      {
        type: 'text',
        content: `
          <p>En el módulo 1 aprendiste qué información protegemos. En el módulo 2 aprendiste cómo intentan obtenerla. Ahora viene la parte que depende completamente de ti:</p>
          <p><strong>¿Qué haces —o dejas de hacer— para no ser parte del problema?</strong></p>
          <p>No se trata de convertirte en experto en seguridad. Se trata de tener claras unas reglas concretas que puedes aplicar hoy mismo, en cualquier momento de tu trabajo.</p>
        `,
      },

      // 3. 3.2 Regla 1 — intro
      {
        type: 'text',
        title: 'Regla 1 — Solo los canales autorizados',
        content: `
          <p>Esta es la regla que más incumplimientos genera, no por mala intención sino porque los canales no autorizados son los más cómodos y rápidos.</p>
          <p>Cuando una persona quiere pagar y no tiene acceso al canal oficial, lo más natural es usar WhatsApp, el correo o incluso llamar por teléfono. El problema no es la intención de quien paga. El problema es que esos canales no tienen los controles para proteger los datos que se transmiten por ahí.</p>
        `,
      },

      // 4. Callout — la pregunta correcta
      {
        type: 'box',
        variant: 'accent',
        text: '"¿La persona confía en mí?" no es la pregunta. La pregunta es: "¿el canal garantiza que esos datos no van a ser interceptados, guardados o usados de forma indebida?"',
        footer: 'La respuesta para WhatsApp, correo electrónico, mensajes de texto, llamadas telefónicas y cualquier otro canal informal es siempre la misma: no.',
      },

      // 5. Infografía — canales autorizados
      {
        type: 'infographic',
        title: '¿Por este canal sí se pueden enviar datos de pago?',
        src: './Infografías/M3-CanalesAutorizados.html',
        aspectRatio: '1080 / 900',
        maxWidth: 980,
      },

      // 6. Qué decirle a quien paga
      {
        type: 'text',
        title: '¿Qué hago cuando ya me enviaron los datos por WhatsApp?',
        content: `
          <p>Primero, no uses esos datos para procesar el pago. El hecho de que el titular de la tarjeta los haya enviado no los hace seguros ni los autoriza dentro de los procesos de tu organización.</p>
          <p>Segundo, respóndele con amabilidad y claridad.</p>
        `,
      },

      // 7. Ejemplo de respuesta
      {
        type: 'box',
        variant: 'success',
        title: 'Ejemplo de respuesta a quien paga:',
        text: '"Gracias por tu confianza. Por seguridad, los datos de tu tarjeta solo pueden procesarse a través de nuestro canal oficial. Te comparto el enlace seguro para que puedas hacer el pago: [enlace]. Si tienes alguna dificultad, con gusto te ayudo."',
      },

      // 8. Tercer paso — reportar
      {
        type: 'text',
        content: `
          <p>Tercero, reporta al área correspondiente que recibiste datos de tarjeta por un canal no autorizado. Eso no es delatar a quien paga: es parte del proceso de control que protege a todos.</p>
        `,
      },

      // 9. 3.3 Regla 2 — credenciales
      {
        type: 'box',
        variant: 'warning',
        title: 'Tu usuario y contraseña no son solo una llave para entrar a los sistemas. Son tu firma digital.',
        text: `
          <p>Todo lo que se hace con tus credenciales queda registrado a tu nombre: qué consultaste, qué modificaste, a qué hora accediste. Si alguien más usa tu usuario —aunque sea un compañero de confianza— esas acciones también quedan a tu nombre.</p>
          <p>Según el Verizon Data Breach Investigations Report 2024, el 74% de las brechas de seguridad involucran credenciales comprometidas. En la mayoría de los casos no hubo robo técnico: alguien compartió su contraseña, la escribió en un lugar visible o usó la misma para varios sistemas.</p>
        `,
        footer: 'Una credencial compartida o débil no es un problema menor. Es el punto de entrada más común para un ataque.',
      },

      // 10. Las 5 reglas de las contraseñas
      {
        type: 'datatable',
        title: 'Las 5 reglas de las contraseñas',
        columns: ['#', 'Regla', 'Qué significa en la práctica'],
        rows: [
          { icon: '1️⃣', highlight: 'red', cells: ['Nunca compartas tu contraseña con nadie', 'Ni con tu jefe, ni con TI, ni con un compañero de confianza. Nadie necesita tu contraseña para hacer su trabajo. Si alguien la pide, es una señal de alerta.'] },
          { icon: '2️⃣', highlight: 'orange', cells: ['No uses la misma contraseña en varios sistemas', 'Si un sistema es comprometido, el atacante prueba esa contraseña en todos los demás. Una contraseña única por sistema limita el daño.'] },
          { icon: '3️⃣', highlight: 'orange', cells: ['No escribas tu contraseña en papel ni en el escritorio', 'Un papel con tu contraseña es tan riesgoso como dejar la puerta abierta. Si tu organización tiene un gestor de contraseñas oficial, úsalo. Nunca uses un gestor personal para credenciales corporativas.'] },
          { icon: '4️⃣', highlight: 'blue', cells: ['Bloquea tu equipo cuando te alejes', 'Aunque sea por 2 minutos. Un equipo desbloqueado con tu sesión activa es acceso abierto a todo lo que puedes ver y hacer.'] },
          { icon: '5️⃣', highlight: 'blue', cells: ['Activa la doble autenticación si está disponible', 'Es una capa adicional que hace que tu contraseña sola no sea suficiente para entrar. Actívala siempre que el sistema lo permita.'] },
        ],
      },

      // 11. 3.4 Regla 3 — entorno de trabajo
      {
        type: 'text',
        title: 'Regla 3 — El entorno de trabajo también es seguridad',
        content: `
          <p>La seguridad de los datos de pago no ocurre solo en los sistemas. Ocurre también en el espacio físico donde trabajas.</p>
          <p>Un documento con datos de pago sobre el escritorio, una pantalla visible para quien pase, una impresión olvidada en la bandeja de la impresora: todos son riesgos reales que no requieren ningún sistema sofisticado para materializarse.</p>
          <p><strong>El trabajo remoto o híbrido amplió esta superficie de riesgo.</strong> Cuando trabajas desde casa, la red, el dispositivo y el entorno físico son diferentes, y eso crea vulnerabilidades que no existen en la oficina. Estas son las situaciones más frecuentes:</p>
        `,
      },

      // 12. Infografía — trabajo remoto
      {
        type: 'infographic',
        title: 'Cuando trabajas desde casa, el riesgo también va contigo',
        src: './Infografías/M3-TrabajoRemoto.html',
        aspectRatio: '1080 / 620',
        maxWidth: 1100,
      },

      // 13. Puente al checklist
      {
        type: 'text',
        content: `
          <p>Estos hábitos aplican tanto en la oficina como cuando trabajas desde casa. El siguiente checklist te ayuda a revisar dónde estás parado hoy mismo.</p>
        `,
      },

      // 14. Checklist de autoevaluación (sin calificación)
      {
        type: 'checklist',
        title: 'Checklist de autoevaluación — ¿Cómo está mi entorno hoy?',
        subtitle: 'No hay respuestas correctas o incorrectas: esto es para que identifiques en qué áreas puedes mejorar. Nadie ve tus respuestas.',
        items: [
          'Mi escritorio no tiene documentos con datos de pago o de terceros a la vista.',
          'Bloqueo mi equipo cada vez que me alejo, aunque sea por pocos minutos.',
          'No tengo mi contraseña escrita en papel, en una nota adhesiva ni guardada en el navegador de un equipo compartido.',
          'Cuando termino de usar un documento con datos sensibles, lo cierro y lo guardo en el lugar correcto.',
          'Si recibo datos de pago por un canal no autorizado, no los uso y los reporto.',
          'Me conecto a través de la VPN corporativa cuando accedo a sistemas de la organización desde fuera de la oficina, si mi organización la utiliza para ese propósito.',
          'Mi pantalla no es visible para otras personas en mi hogar o en espacios compartidos.',
          'No imprimo documentos con datos de pago en casa.',
          'Uso el dispositivo corporativo —no el personal— para acceder a sistemas con datos de pago.',
          'Si imprimo algo por necesidad, lo destruyo de forma segura cuando ya no lo necesito.',
        ],
        results: {
          band3: { min: 10, text: 'Excelente. Estás aplicando los hábitos básicos que protegen los datos de pago en tu entorno de trabajo.' },
          band2: { min: 6, text: 'Vas por buen camino. Revisa los puntos que dejaste sin marcar: no es un castigo, es información valiosa sobre dónde puedes mejorar.' },
          band1: { min: 0, text: 'Identifica los puntos que dejaste sin marcar y piensa qué necesitas cambiar en tu rutina. Esta lista no es calificada — nadie más la ve.' },
        },
      },

      // 15. 3.5 Actividad de validación — quiz correcto/incorrecto
      {
        type: 'quiz',
        title: '¿Esto está bien o está mal?',
        subtitle: 'Lee cada situación y decide si la acción descrita es correcta o incorrecta. Necesitas 5 de 6 correctas para avanzar.',
        passingScore: 83,
        questions: [
          {
            id: 'm3_sit_1',
            question: 'Situación: una persona llama para pagar. No tiene acceso al portal en ese momento y te pide que le recibas el número de tarjeta por teléfono "solo esta vez". Acción: anotas el número en un papel para procesarlo después y luego lo destruyes.',
            options: ['Correcto', 'Incorrecto'],
            correct: 1,
            explanation: 'Anotar el número —aunque sea en papel y aunque lo destruyas— es un incumplimiento. El dato existió fuera de un canal autorizado, aunque sea por pocos minutos. Si ese papel es visto por alguien más antes de destruirlo, el riesgo se materializó.',
          },
          {
            id: 'm3_sit_2',
            question: 'Situación: tu compañero sale a almorzar y te pide que uses su usuario para aprobar una factura urgente mientras regresa, porque tú ya tienes todo listo. Acción: accedes con el usuario de tu compañero y apruebas la factura.',
            options: ['Correcto', 'Incorrecto'],
            correct: 1,
            explanation: 'Aunque la intención sea buena, esa acción queda registrada a nombre de tu compañero. Si después hay alguna inconsistencia, será muy difícil determinar quién hizo qué. Compartir credenciales anula la trazabilidad y es una infracción directa a los controles PCI.',
          },
          {
            id: 'm3_sit_3',
            question: 'Situación: estás trabajando desde casa en un café. Tu pantalla muestra el sistema de facturación con datos de pago. Acción: sigues trabajando normalmente porque las personas alrededor no parecen estar mirando.',
            options: ['Correcto', 'Incorrecto'],
            correct: 1,
            explanation: 'No es necesario que alguien esté mirando activamente para que el riesgo exista. Una foto tomada de fondo, un vistazo casual o una cámara de seguridad mal administrada pueden exponer la información. En entornos públicos, los datos sensibles no deben ser visibles.',
          },
          {
            id: 'm3_sit_4',
            question: 'Situación: recibes un correo de una persona con el número de su tarjeta para procesar una devolución. Acción: procesas la devolución usando los datos del correo porque ya los envió y es más rápido que pedirle que use otro canal.',
            options: ['Correcto', 'Incorrecto'],
            correct: 1,
            explanation: 'El hecho de que el titular de la tarjeta los haya enviado no hace el canal seguro. El correo electrónico no es un canal autorizado para transmitir datos de tarjeta. Al usarlos, estás procesando datos obtenidos por una vía que incumple los controles de PCI DSS.',
          },
          {
            id: 'm3_sit_5',
            question: 'Situación: al terminar el turno, imprimes un reporte con datos de transacciones del día para revisarlo en casa. Lo guardas en tu bolso. Acción: te llevas el reporte impreso porque necesitas revisarlo con calma y en la oficina no tuviste tiempo.',
            options: ['Correcto', 'Incorrecto'],
            correct: 1,
            explanation: 'Un documento impreso con datos de pago fuera de la organización no tiene ningún control: puede ser visto, copiado, perdido o robado. Si el transporte público, tu casa o cualquier espacio intermedio no tiene controles de seguridad, los datos están desprotegidos.',
          },
          {
            id: 'm3_sit_6',
            question: 'Situación: tu contraseña del sistema de pagos es tu nombre y el año de nacimiento. La llevas usando 2 años y nunca ha pasado nada. Acción: sigues usándola porque es fácil de recordar y hasta ahora no ha habido ningún problema.',
            options: ['Correcto', 'Incorrecto'],
            correct: 1,
            explanation: 'Que no haya habido un incidente visible no significa que la contraseña sea segura. Las contraseñas débiles son las primeras en ser probadas en un ataque. Nombre más año de nacimiento es predecible y puede ser adivinado en segundos con herramientas automatizadas.',
          },
        ],
      },

      // 16. Reflexión personal
      {
        type: 'reflection',
        title: 'Antes de continuar, una pregunta para ti',
        storageKey: 'm3_reflexion',
        promptPrefix: '¿Cuál de estas tres reglas es la que más te cuesta aplicar en tu trabajo diario?',
        placeholder: 'Escribe aquí...',
      },

      // 17. Cierre del módulo
      {
        type: 'closing',
        moduleLabel: 'Módulo 3 completado',
        title: '¿Cómo evitamos ser parte del problema?',
        summary: 'En el módulo 1 aprendiste qué protegemos. En el módulo 2 aprendiste cómo intentan obtenerlo. En este aprendiste qué puedes hacer tú para que no lo logren. Las reglas que viste no son complicadas: usa solo los canales autorizados, cuida tus credenciales como si fueran la llave de tu casa, y controla lo que hay en tu entorno de trabajo, tanto en la oficina como en casa.',
        takeaways: [
          'Regla 1 — Solo canales autorizados para recibir o transmitir datos de pago.',
          'Regla 2 — Las credenciales son personales. Nunca se comparten, nunca se escriben en un lugar visible.',
          'Regla 3 — El entorno importa, en la oficina y en casa: pantalla controlada, WiFi seguro, documentos guardados, nada impreso innecesariamente.',
        ],
        nextHint: 'En el módulo 4 vas a ver qué hacer si, a pesar de todo, algo sale mal.',
      },
    ],
  },

  // ─────────────────────────────────────
  // MÓDULO 4 — ¿Qué hacemos cuando ocurre un incidente?
  // ─────────────────────────────────────
  {
    id: 4,
    title: '¿Qué hacemos cuando ocurre un incidente?',
    description: 'Los primeros pasos correctos cuando algo sale mal.',
    icon: '🚨',
    estimatedTime: '12–15 min',
    blocks: [
      // 1. Portada
      {
        type: 'hero',
        title: '¿Qué hacemos cuando ocurre un incidente?',
        subtitle: 'Qué hacer en los primeros minutos',
        requirements: 'PCI DSS 4.0.1 · Requisito 12.10 (Plan de respuesta a incidentes), Requisito 10.3 (Preservación de registros de auditoría) y Requisito 12.6.3 (Concientización sobre respuesta a incidentes)',
        accent: 'secondary',
      },

      // 2. 4.1 Apertura del módulo
      {
        type: 'text',
        content: `
          <p>En el módulo 1 aprendiste qué protegemos. En el módulo 2 aprendiste cómo intentan obtenerlo. En el módulo 3 aprendiste qué hacer para no ser parte del problema.</p>
          <p>Ahora viene la pregunta que nadie quiere hacerse, pero que todos deben saber responder:</p>
          <p><strong>¿Qué haces si, a pesar de todo, algo sale mal?</strong></p>
          <p>Los primeros minutos después de detectar un incidente son los más importantes. Lo que hagas —o dejes de hacer— en ese momento puede determinar si el daño se contiene o si se amplifica.</p>
        `,
      },

      // 3. 4.2 ¿Qué cuenta como un incidente?
      {
        type: 'text',
        title: '¿Qué cuenta como un incidente?',
        content: `
          <p>Un incidente de seguridad no es solo que alguien haya hackeado un sistema. En el contexto de los datos de pago, un incidente es cualquier situación en la que datos de tarjeta pudieron haber sido vistos, copiados, transmitidos o usados por alguien que no debía.</p>
        `,
      },

      // 4. Callout — la palabra clave
      {
        type: 'box',
        variant: 'accent',
        text: 'La palabra clave es <strong>pudieron</strong>. No necesitas tener certeza de que ocurrió algo. Basta con que haya una situación razonable de duda.',
        footer: 'Reportar algo que resultó no ser un incidente no tiene consecuencias negativas. No reportar algo que sí era un incidente sí las tiene.',
      },

      // 5. Infografía — ¿es un incidente?
      {
        type: 'infographic',
        title: '¿Esto es un incidente que debo reportar?',
        src: './Infografías/M4-EsIncidente.html',
        aspectRatio: '1080 / 900',
        maxWidth: 980,
      },

      // 6. 4.3 Los primeros pasos — intro
      {
        type: 'text',
        title: 'Los primeros pasos: qué hacer en los primeros minutos',
        content: `
          <p>Cuando detectas o sospechas un incidente, hay cuatro cosas que debes hacer. En este orden.</p>
        `,
      },

      // 7. Callout — no necesitas resolverlo
      {
        type: 'box',
        variant: 'info',
        text: 'No necesitas entender todo lo que pasó. No necesitas resolverlo tú. Solo necesitas dar los primeros pasos correctamente.',
      },

      // 8. Infografía — cuatro pasos
      {
        type: 'infographic',
        title: 'Cuatro pasos. En este orden.',
        src: './Infografías/M4-CuatroPasos.html',
        aspectRatio: '1080 / 900',
        maxWidth: 980,
      },

      // 9. 4.4 Lo que nunca debes hacer — intro
      {
        type: 'text',
        title: 'Lo que nunca debes hacer — y por qué',
        content: `
          <p>Cuando alguien detecta un posible incidente, su primera reacción suele ser una de estas:</p>
          <p><em>Intentar arreglarlo solo para que nadie se entere. Borrar el rastro por miedo a las consecuencias. Esperar a ver si pasa algo antes de reportar. Minimizarlo pensando que no fue para tanto.</em></p>
          <p><strong>Todas esas reacciones, aunque son comprensibles, hacen exactamente lo contrario de lo que se necesita.</strong></p>
        `,
      },

      // 10. Error 1
      {
        type: 'box',
        variant: 'warning',
        title: 'Error: intentar arreglarlo tú mismo para que nadie se entere.',
        text: 'Al intentar arreglarlo tú mismo puedes borrar evidencia clave que el equipo de seguridad necesita para determinar qué accedió y qué tomó.',
        footer: 'En su lugar: reporta de inmediato y deja que el equipo especializado actúe.',
      },

      // 11. Error 2
      {
        type: 'box',
        variant: 'warning',
        title: 'Error: no reportarlo para no meterte en problemas.',
        text: 'El tiempo es crítico en un incidente de seguridad. Cada hora sin contención es una hora más de exposición. Quien reporta un incidente cumple con su responsabilidad. Quien lo oculta, genera una responsabilidad mayor.',
        footer: 'En su lugar: reporta de inmediato al canal designado.',
      },

      // 12. Error 3
      {
        type: 'box',
        variant: 'warning',
        title: 'Error: intentar resolver el problema tú solo sin avisar a nadie.',
        text: 'Aunque tengas buena intención, actuar sin coordinación puede interferir con la investigación, alertar al atacante o tomar acciones que generen más daño.',
        footer: 'En su lugar: reporta y espera instrucciones del equipo de respuesta.',
      },

      // 13. Error 4
      {
        type: 'box',
        variant: 'warning',
        title: 'Error: comentarlo con compañeros antes de reportarlo al canal oficial.',
        text: 'Un comentario informal puede llegar a la persona equivocada, generar pánico innecesario o —en el peor de los casos— alertar a alguien que esté involucrado en el incidente.',
        footer: 'En su lugar: reporta primero al canal oficial, luego sigue las instrucciones sobre comunicación.',
      },

      // 14. 4.5 Reportar no es delatar — intro
      {
        type: 'text',
        title: 'Reportar no es delatar: es proteger',
        content: `
          <p>Hay una razón por la que las personas evitan reportar incidentes: miedo.</p>
          <p><em>Miedo a que piensen que fue su culpa. Miedo a las consecuencias. Miedo a parecer incompetentes. Miedo a meterse en problemas.</em></p>
          <p>Ese miedo es comprensible. Pero es importante entender lo que realmente significa reportar:</p>
        `,
      },

      // 15. Reportar significa
      {
        type: 'box',
        variant: 'success',
        title: 'Reportar significa...',
        items: [
          'Que actuaste correctamente cuando algo salió mal.',
          'Que le diste al equipo la oportunidad de contener el daño.',
          'Que protegiste a las personas cuyos datos pudieron estar en riesgo.',
          'Que cumpliste con tu responsabilidad dentro de la organización.',
        ],
      },

      // 16. No reportar significa
      {
        type: 'box',
        variant: 'warning',
        title: 'No reportar significa...',
        items: [
          'Que el incidente siguió activo más tiempo del necesario.',
          'Que el daño se amplió porque nadie pudo contenerlo a tiempo.',
          'Que se perdió evidencia valiosa para la investigación.',
          'Que la organización no pudo cumplir sus obligaciones de notificación.',
        ],
      },

      // 17. Estadística IBM
      {
        type: 'box',
        variant: 'accent',
        text: 'Según el IBM Cost of a Data Breach Report 2024, el tiempo promedio para identificar y contener una brecha es de 194 días cuando no hay detección temprana. Ese tiempo corresponde al promedio mundial y puede variar según la organización y el tipo de incidente, pero la tendencia es consistente: con detección y reporte inmediato, el tiempo de exposición se reduce drásticamente.',
        footer: 'Cada hora de diferencia importa. Un incidente reportado a tiempo suele ser un incidente controlable. Un incidente oculto casi siempre crece.',
      },

      // 18. 4.6 Actividad de validación — ordenar acciones
      {
        type: 'scenariobuilder',
        title: '¿En qué orden actuarías?',
        subtitle: 'Llegas a la oficina un lunes y notas que tu computador tiene la sesión iniciada con un usuario que no es el tuyo. El historial muestra accesos al sistema de facturación la noche del viernes: consultas a números de tarjeta completos de al menos 40 tarjetahabientes. Nadie más debería haber entrado.',
        scenarios: [
          {
            id: 'm4_orden_1',
            mode: 'order',
            situation: 'Elige, en orden, las tres acciones correctas entre las seis disponibles. El resto son acciones incorrectas que no deberías tomar.',
            question: '¿En qué orden actuarías?',
            options: [
              { key: 'A', text: 'Cierras la sesión del sistema de facturación y limpias el historial del navegador para que nadie vea qué se consultó.' },
              { key: 'B', text: 'Sin tocar el equipo, contactas de inmediato al responsable de seguridad o al canal oficial de tu organización para reportar lo que encontraste.' },
              { key: 'C', text: 'Llamas a un compañero de confianza para preguntarle si sabe qué pasó antes de reportarlo oficialmente.' },
              { key: 'D', text: 'Dejas el equipo encendido, sin tocar nada.' },
              { key: 'E', text: 'Anotas en otro dispositivo lo que viste y la hora, y esperas instrucciones del equipo de seguridad antes de volver a usar el equipo.' },
              { key: 'F', text: 'Apagas el equipo para que nadie más pueda acceder mientras llega el equipo de seguridad.' },
            ],
            correctOrder: ['D', 'B', 'E'],
            justification: 'Orden correcto: D → B → E, es decir: para, reporta, documenta y espera. Primero (D) paras: dejas el equipo encendido y no tocas nada, para no alterar la evidencia. Segundo (B) reportas de inmediato al canal oficial: no por WhatsApp personal ni por correo a un compañero. Tercero (E) documentas en otro dispositivo —no en el equipo involucrado— lo que viste y la hora, y esperas instrucciones: tu rol terminó cuando reportaste, así que no tomas decisiones técnicas por tu cuenta. Las otras tres son incorrectas: (A) cerrar la sesión y limpiar el historial destruye evidencia que el equipo de seguridad necesita; (C) consultar a un compañero antes de reportar retrasa la respuesta y puede contaminar la investigación; (F) apagar el equipo destruye evidencia en memoria (RAM) de forma permanente. Reporta primero y recibe instrucciones antes de actuar.',
          },
        ],
      },

      // 19. 4.7 Recurso de referencia
      {
        type: 'text',
        title: 'Recurso de referencia',
        content: `
          <p>Descarga esta tarjeta de referencia rápida y guárdala en tu celular o imprímela para tu puesto de trabajo. Incluye qué hacer, qué no hacer, y un espacio para que tu organización complete los contactos de reporte antes de distribuirla.</p>
        `,
      },

      // 20. Tarjeta descargable
      {
        type: 'downloadcard',
        variant: 'incidentCard',
        title: 'Tarjeta de referencia — Si detectas o sospechas un incidente',
        description: 'PDF descargable con los 4 pasos, lo que nunca debes hacer, y un espacio editable para los contactos de tu organización.',
      },

      // 21. Reflexión personal
      {
        type: 'reflection',
        title: 'Antes de continuar, una pregunta para ti',
        storageKey: 'm4_reflexion',
        promptPrefix: 'Si mañana detectaras algo sospechoso en tu trabajo, ¿sabes exactamente qué hacer y a quién llamar?',
        placeholder: 'Escribe aquí...',
      },

      // 22. Cierre del módulo
      {
        type: 'box',
        variant: 'accent',
        title: 'En los cuatro módulos anteriores completaste el recorrido esencial. Ya sabes lo que necesitas saber.',
        iconItems: [
          { icon: '1️⃣', text: 'M1 — Qué información protegemos y por qué tiene valor.' },
          { icon: '2️⃣', text: 'M2 — Cómo intentan obtener esa información.' },
          { icon: '3️⃣', text: 'M3 — Qué puedes hacer para no ser parte del problema.' },
          { icon: '4️⃣', text: 'M4 — Qué hacer si algo sale mal.' },
        ],
        footer: 'El módulo 5 cierra el recorrido con una sola pregunta: ¿cómo lo aplicas tú, desde tu trabajo, desde mañana?',
      },

      // 23. Cierre del módulo
      {
        type: 'closing',
        moduleLabel: 'Módulo 4 completado',
        title: '¿Qué hacemos cuando ocurre un incidente?',
        summary: 'Un incidente es cualquier situación en la que datos de tarjeta pudieron haber sido vistos, copiados, transmitidos o usados por alguien que no debía. Ante la duda, siempre reporta. Y cuando ocurra: para, reporta, documenta y espera instrucciones, en ese orden.',
        takeaways: [
          'La palabra clave es "pudieron": no necesitas certeza, basta una situación razonable de duda para reportar.',
          'Los cuatro pasos en orden: para, reporta al canal oficial, documenta sin manipular el equipo, y espera instrucciones.',
          'Nunca intentes resolverlo solo, ocultarlo, comentarlo informalmente o actuar sin coordinación: cada uno de esos errores destruye evidencia o retrasa la contención.',
          'Reportar no es delatar: es la acción que protege a los tarjetahabientes y a la organización. Un incidente reportado a tiempo suele ser controlable; uno oculto casi siempre crece.',
        ],
        nextHint: 'En el módulo 5 vas a cerrar el recorrido con una sola pregunta: ¿cómo lo aplicas tú, desde tu trabajo, desde mañana?',
      },
    ],
  },

  // ─────────────────────────────────────
  // MÓDULO 5 — ¿Cómo lo aplico en mi trabajo?
  // ─────────────────────────────────────
  {
    id: 5,
    title: '¿Cómo lo aplico en mi trabajo?',
    description: 'Tres situaciones reales para cerrar el recorrido.',
    icon: '🎓',
    estimatedTime: '10–12 min',
    blocks: [
      // 1. Portada
      {
        type: 'hero',
        title: '¿Cómo lo aplico en mi trabajo?',
        subtitle: 'Llevar lo que aprendiste a tu trabajo',
        requirements: 'PCI DSS 4.0.1 · Requisito 12.6.3 (Verificación de comprensión y aplicación) y Requisito 12.6.3.2 (Evaluación de concientización)',
        accent: 'accent',
      },

      // 2. 5.1 Apertura del módulo
      {
        type: 'text',
        content: `
          <p><strong>Llegaste al último módulo.</strong></p>
          <p>En los cuatro módulos anteriores cubriste lo esencial: qué protegemos, cómo intentan obtenerlo, qué puedes hacer para evitarlo y qué hacer si algo sale mal.</p>
          <p>Este módulo no es un examen. Es el momento de conectar todo lo que aprendiste con tu realidad concreta.</p>
          <p>Vas a enfrentar tres situaciones reales, de distintas áreas. En cada una tendrás que tomar una decisión. Y al final, una pregunta sencilla: ¿qué vas a hacer diferente desde mañana?</p>
        `,
      },

      // 3. 5.2 intro
      {
        type: 'text',
        title: 'Actividad integradora — Tres situaciones, tres decisiones',
        content: `
          <p>Vas a ver tres situaciones, cada una desde una área distinta —pero cualquiera podría tocarte a ti, sin importar dónde trabajes—. Lee cada una y elige la respuesta que mejor describe lo que deberías hacer. Necesitas responder correctamente las tres para continuar; puedes reintentar sin penalización.</p>
        `,
      },

      // 4. Las tres situaciones integradoras (quiz gated, passingScore 100)
      {
        type: 'quiz',
        title: 'Tres situaciones, tres decisiones',
        subtitle: 'Necesitas acertar las tres situaciones para continuar.',
        passingScore: 100,
        questions: [
          {
            id: 'm5_situacion_1',
            question: 'Administración / Compras: un proveedor de servicios te contacta por correo y te adjunta un archivo de Excel con datos de tarjeta de varios terceros "para que puedas verificar las transacciones". El archivo incluye números de tarjeta completos, nombres y fechas de vencimiento. Dice que es urgente porque necesita confirmación antes del cierre del día. ¿Qué haces?',
            options: [
              'Abres el archivo, verificas la información que necesitas y luego la eliminas.',
              'Reenvías el archivo al área de TI para que ellos lo gestionen.',
              'No abres el archivo. Le informas al proveedor que ese canal no es autorizado para compartir datos de pago, y reportas el correo internamente.',
              'Le respondes al proveedor pidiéndole que te envíe solo los últimos cuatro dígitos para reducir el riesgo.',
            ],
            correct: 2,
            explanation: 'Correcto: no abrir el archivo y reportar el correo protege a la organización y activa el proceso para comunicarle al proveedor el canal correcto. El canal no autorizado es el problema, no el contenido del archivo. Abrirlo y luego eliminarlo no deshace que los datos existieron fuera de un entorno controlado; reenviarlo a TI por correo sigue siendo una transmisión por canal no autorizado; y pedir solo los últimos cuatro dígitos no resuelve el problema de fondo, porque el canal sigue siendo incorrecto.',
          },
          {
            id: 'm5_situacion_2',
            question: 'RRHH: tu compañera te pide que uses sus credenciales para consultar el número de tarjeta de una persona en el sistema y procesar una devolución, mientras ella atiende una llamada urgente. "Es solo un momento", dice. "Nadie va a saber." ¿Qué haces?',
            options: [
              'Accedes con sus credenciales porque es una tarea rutinaria y de bajo riesgo.',
              'Le explicas que no puedes usar sus credenciales y le propones buscar una alternativa: que ella haga la consulta al salir de la llamada o que use un canal de aprobación diferente si existe.',
              'Accedes, haces la consulta y procesas la devolución, y luego cambias la contraseña de tu compañera para que quede solo a tu nombre.',
              'Le dices que sí y le pides que te cambie la contraseña para que quede como si hubieras entrado con la tuya.',
            ],
            correct: 1,
            explanation: 'Correcto: las credenciales son personales e intransferibles, y consultar el número de tarjeta de un tercero con el usuario de otra persona rompe la trazabilidad exigida por PCI DSS. Proponer una alternativa resuelve la necesidad sin comprometer la seguridad. No hay tareas de "bajo riesgo" cuando se comparten credenciales; cambiar la contraseña de otro usuario sin autorización es un incidente en sí mismo y no borra el historial de accesos previos; y pedir que te cambie la contraseña para "entrar con la tuya" es el mismo problema en dirección contraria, porque el sistema registra accesos por usuario, no por contraseña.',
          },
          {
            id: 'm5_situacion_3',
            question: 'Ventas: una persona que va a pagar insiste en enviarte los datos de su tarjeta por WhatsApp. Ya te los mandó: número, nombre y vencimiento. Dice que es la forma más rápida y que lo ha hecho antes con otras empresas sin problema. ¿Qué haces?',
            options: [
              'Usas los datos que te envió porque ya están en tu celular y sería más difícil pedirle que los ingrese de nuevo.',
              'Los usas esta vez, pero le pides que la próxima vez use el canal oficial.',
              'No usas los datos del mensaje. Le explicas que, por su seguridad, no puedes procesar datos de tarjeta recibidos por WhatsApp, y le ofreces el canal oficial. Luego reportas internamente que recibiste datos por ese canal.',
              'Eliminas los mensajes de WhatsApp para que no quede rastro y le pides que ingrese los datos por el canal oficial.',
            ],
            correct: 2,
            explanation: 'Correcto: la protección del titular de la tarjeta empieza por no procesar datos recibidos por canales que no garantizan su seguridad. Explicárselo con claridad genera confianza, no fricción, y el reporte interno permite registrar el caso. Usarlos porque "ya llegaron" no los hace válidos; una excepción "esta vez" sigue siendo un incumplimiento —el proceso se valida por el canal, no por la frecuencia—; y eliminar los mensajes no elimina el riesgo (los datos ya pudieron quedar en servidores o copias de seguridad) y además va en contra del protocolo de respuesta al no reportar el incidente.',
          },
        ],
      },

      // 5. 5.3 intro
      {
        type: 'text',
        title: 'Reflexión final — antes del certificado',
        content: `
          <p>Esta no es una evaluación. No hay respuestas correctas o incorrectas. Es un momento para que pienses en lo que aprendiste y lo conectes con tu trabajo real.</p>
        `,
      },

      // 6. Pregunta 1 — obligatoria (aproximada, no gating técnico)
      {
        type: 'reflection',
        title: 'Pregunta 1',
        storageKey: 'm5_reflexion_1',
        promptPrefix: '¿Cuál de las situaciones que viste en este curso se parece más a algo que podría pasarte en tu trabajo?',
        placeholder: 'Escribe aquí...',
      },

      // 7. Pregunta 2 — obligatoria
      {
        type: 'reflection',
        title: 'Pregunta 2',
        storageKey: 'm5_reflexion_2',
        promptPrefix: '¿Qué vas a hacer diferente en tu trabajo a partir de mañana?',
        placeholder: 'Ej: Voy a usar el canal oficial para recibir pagos / Voy a bloquear mi equipo cuando me levante / Voy a reportar los correos sospechosos en lugar de ignorarlos.',
      },

      // 8. Pregunta 3 — obligatoria (opción múltiple, sin calificación)
      {
        type: 'selfcheck',
        title: 'Pregunta 3',
        subtitle: 'Si detectaras un posible incidente mañana, ¿sabes a quién reportarlo?',
        questions: [
          {
            id: 'm5_canal_reporte',
            question: 'Si detectaras un posible incidente mañana, ¿sabes a quién reportarlo?',
            options: ['Sí, conozco el canal y el contacto.', 'Sí, pero necesitaría verificar el contacto exacto.', 'No estoy seguro de a quién contactar.'],
          },
        ],
        resultTitle: 'Antes de cerrar el curso, confírmalo.',
        resultText: 'Si no tienes 100% claro el canal de reporte, consulta con tu líder o con el área de TI cuál es exactamente. Esa información también está en la tarjeta de referencia descargable del Módulo 4 — guárdala donde puedas encontrarla.',
      },

      // 9. Pregunta 4 — opcional
      {
        type: 'reflection',
        title: 'Pregunta 4 (opcional)',
        storageKey: 'm5_reflexion_4',
        promptPrefix: '¿Qué tema del curso te resultó más útil y por qué?',
        placeholder: 'Escribe aquí (opcional)...',
      },

      // 10. 5.4 Cierre narrativo del curso
      {
        type: 'text',
        title: 'Cierre narrativo del curso',
        content: `
          <p><strong>Lo que aprendiste en este curso no es teoría.</strong></p>
          <p>Aprendiste a reconocer qué información tiene valor real y por qué protegerla importa. Aprendiste a identificar una situación de riesgo antes de que se convierta en un problema. Aprendiste las reglas concretas que puedes aplicar desde hoy en tu trabajo diario. Y aprendiste qué hacer si, a pesar de todo, algo sale mal.</p>
          <p>Nada de esto requiere ser experto en seguridad. Requiere criterio, hábito y disposición para actuar cuando algo no cuadra.</p>
        `,
      },

      // 11. Recapitulación M1-M4
      {
        type: 'box',
        variant: 'accent',
        iconItems: [
          { icon: '1️⃣', text: 'M1 — Sabes qué protegemos y por qué tiene valor.' },
          { icon: '2️⃣', text: 'M2 — Sabes reconocer cómo intentan obtenerlo.' },
          { icon: '3️⃣', text: 'M3 — Sabes qué hacer para no ser parte del problema.' },
          { icon: '4️⃣', text: 'M4 — Sabes qué hacer si algo sale mal.' },
        ],
        footer: 'La seguridad de los datos de pago no depende solo de los sistemas. Depende de las decisiones que toma cada persona del equipo, todos los días.',
      },

      // 12. Frase de cierre
      {
        type: 'flyer',
        color: 'primary',
        icon: '🔒',
        badge: 'Para recordar',
        body: 'Cada dato de pago representa la confianza de una persona. Protegerlo también depende de las decisiones que tomas cada día.',
      },

      // 13. Cierre del módulo
      {
        type: 'closing',
        moduleLabel: 'Módulo 5 completado — curso finalizado',
        title: '¿Cómo lo aplico en mi trabajo?',
        summary: 'Completaste el recorrido completo del curso de Protección de Datos de Pago. Ya sabes qué protegemos, cómo intentan obtenerlo, qué hacer para no ser parte del problema, qué hacer si algo sale mal, y cómo se ve todo esto en situaciones reales de tu trabajo.',
        takeaways: [
          'La seguridad de los datos de pago depende de decisiones cotidianas, no solo de los sistemas.',
          'Ante cualquier duda sobre un canal, una credencial o un posible incidente: pausa, verifica y reporta.',
          'Guarda la tarjeta de referencia del Módulo 4 — tiene el canal de reporte de tu organización.',
          'Este certificado tiene vigencia de 12 meses. Recibirás un recordatorio antes de que venza.',
        ],
        nextHint: 'Tu certificado está disponible a continuación.',
      },
    ],
  },
]
