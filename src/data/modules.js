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
//   more        → Plegable "Para profundizar", cerrado por defecto (title?, blocks[]). No cuenta para el 90 % de scroll.
// ─────────────────────────────────────

export const courseInfo = {
  title: 'Protección de Datos de Pago',
  titleLines: ['Protección de Datos', 'de Pago'], // renglones del título en la bienvenida
  subtitle: 'Curso de concientización en PCI DSS 4.0.1',
  version: '1.0',
  passingScore: 80,
}

export const modules = [
  // ─────────────────────────────────────
  // MÓDULO 0 — Bienvenida
  // ─────────────────────────────────────
  {
    id: 0,
    title: 'Bienvenida',
    description: 'Por qué este curso importa en tu trabajo.',
    icon: 'compass',
    estimatedTime: '3 min',
    blocks: [
      // 1. Portada
      {
        type: 'hero',
        title: 'Bienvenida',
        subtitle: 'Por qué este curso importa en tu trabajo',
        accent: 'primary',
      },

      // 2. Video — Un dato, una decisión
      {
        type: 'video',
        title: 'Un dato, una decisión',
        description: 'Por qué este curso importa en tu trabajo, aunque toques datos de pago solo de vez en cuando.',
        src: './videos/m0-bienvenida.mp4',
      },

      // 3. Duración y certificado
      {
        type: 'text',
        content: `
          <p>Son cinco módulos de 10 a 15 minutos. Al final recibirás tu certificado.</p>
        `,
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
    estimatedTime: '10 min',
    blocks: [
      // 1. Portada
      {
        type: 'hero',
        title: '¿Qué estamos protegiendo y por qué importa?',
        subtitle: 'Qué datos de tarjeta pasan por tus manos y por qué valen tanto',
        requirements: 'PCI DSS 4.0.1 · Requisito 3 (Protección de datos de cuenta) y Requisito 12.6 (Programa de concientización)',
        accent: 'primary',
      },

      // 2. Tema 1 — Qué datos protegemos
      {
        type: 'text',
        title: 'Tema 1 — Qué datos protegemos',
        content: `
          <p>Una persona te dicta por teléfono: número 4532 8812 3344 5566, Carlos Andrés Mejía, vence 09/27, código 741.</p>
          <p>¿Todos esos datos son iguales? No.</p>
        `,
      },

      // 3. Infografía — Los datos que protegemos
      {
        type: 'infographic',
        title: 'Los datos que protegemos',
        src: './Infografías/M1-DatosQueProtegemos.html',
        aspectRatio: '1080 / 1300',
        maxWidth: 980,
      },

      // 4. Aplica a cualquier área
      {
        type: 'box',
        variant: 'info',
        title: 'Aplica a cualquier área',
        text: 'El problema nunca es quien comparte sus datos: es qué haces tú con ellos. Y no solo pasa en quien recibe pagos: si RRHH recibe un correo con la foto de una tarjeta para un reembolso, ese correo ya es un incumplimiento.',
      },

      // 5. Tema 2 — De un error pequeño a un incidente real
      {
        type: 'text',
        title: 'Tema 2 — De un error pequeño a un incidente real',
      },

      // 6. Infografía — el caso paso a paso
      {
        type: 'infographic',
        title: 'De un error pequeño a un incidente real',
        src: './Infografías/M1-DeErrorAIncidente.html',
        aspectRatio: '1080 / 1150',
        maxWidth: 980,
      },

      // 7. Para profundizar — el caso en texto y el contexto
      {
        type: 'more',
        blocks: [
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
          {
            type: 'box',
            variant: 'warning',
            title: 'Esto no es un escenario hipotético.',
            text: `
              <p>Esto aplica a cualquier organización que procese datos de pago: comercios, pasarelas de pago, empresas de servicios o proveedores que manejan datos de pago de terceros, sin importar su tamaño.</p>
            `,
            footer: 'La pregunta no es si esto le puede pasar a tu organización. La pregunta es qué tan preparado estás para que no te pase a ti.',
          },
        ],
      },

      // 8. Tema 3 — Qué es PCI DSS
      {
        type: 'text',
        title: 'Tema 3 — Qué es PCI DSS',
      },

      // 9. PCI DSS en una frase y a quién aplica
      {
        type: 'box',
        variant: 'accent',
        title: 'PCI DSS en una frase',
        text: 'El estándar internacional que define cómo proteger los datos de pago en cualquier organización que los procese, almacene o transmita. Lo crearon Visa, Mastercard y American Express. La versión vigente es la 4.0.1 (junio de 2024).',
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
            question: 'Nombre del titular: Carlos Andrés Mejía',
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
    estimatedTime: '14 min',
    blocks: [
      // 1. Portada
      {
        type: 'hero',
        title: '¿Cómo empiezan los incidentes?',
        subtitle: 'Los mensajes y las solicitudes con los que empieza casi todo',
        requirements: 'PCI DSS 4.0.1 · Requisito 5.4 (Protección contra phishing) y Requisito 12.6.3 (Concientización sobre amenazas de ingeniería social)',
        accent: 'secondary',
      },

      // 2. Tema 1 — Por dónde entran los incidentes
      {
        type: 'text',
        title: 'Tema 1 — Por dónde entran los incidentes',
        content: `
          <p>Casi ningún incidente empieza con un ataque sofisticado: empieza con un mensaje, una llamada o una solicitud que parecía normal.</p>
        `,
      },

      // 3. Infografía — vectores de entrada
      {
        type: 'infographic',
        title: '¿Por dónde entran los incidentes de seguridad?',
        src: './Infografías/M2-VectoresDeEntrada.html',
        aspectRatio: '1080 / 1000',
        maxWidth: 980,
      },

      // 4. Para profundizar — las cifras
      {
        type: 'more',
        blocks: [
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
        ],
      },

      // 5. Tema 2 — El mensaje que no es lo que parece
      {
        type: 'text',
        title: 'Tema 2 — El mensaje que no es lo que parece',
        content: `
          <p>Te escriben haciéndose pasar por alguien de confianza para que hagas clic, entregues datos o pagues.</p>
        `,
      },

      // 6. Video — Tres mensajes falsos
      {
        type: 'video',
        title: 'Tres mensajes falsos, señal por señal',
        description: 'WhatsApp, correo y SMS: las señales que los delatan.',
        src: './videos/m2-mensajes-falsos.mp4',
      },

      // 7. La regla
      {
        type: 'flyer',
        color: 'primary',
        icon: '💳',
        badge: 'La regla',
        body: 'Ningún proceso legítimo de pago te va a pedir el número completo de la tarjeta y el CVV juntos por mensaje de texto, correo o WhatsApp después de que la compra ya se hizo. Si te lo piden así, es phishing.',
      },

      // 8. Para profundizar — qué es el phishing y a quién suplantan
      {
        type: 'more',
        blocks: [
          {
            type: 'text',
            title: 'Qué es el phishing',
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
        ],
      },

      // 9. Tema 3 — La solicitud que tiene algo raro
      {
        type: 'text',
        title: 'Tema 3 — La solicitud que tiene algo raro',
        content: `
          <p>No siempre llega por mensaje: a veces es una llamada, una visita o un pedido de alguien conocido.</p>
        `,
      },

      // 10. Cuatro situaciones, cuatro áreas
      {
        type: 'datatable',
        title: 'Cuatro situaciones, cuatro áreas',
        columns: ['Área', 'Qué pasa', 'La señal de alerta'],
        rows: [
          { icon: 'shopping-cart', highlight: 'orange', cells: ['Ventas', 'Una persona que suele pagarte llama furiosa. Dice que Bancolombia le bloqueó la tarjeta y necesita que le proceses el pago directamente con los datos que te va a dictar por teléfono, "como excepción". Insiste en que es urgente y que ya habló con tu jefe.', 'Ningún proceso autorizado de tu organización debería requerir que tomes datos de tarjeta por teléfono fuera del canal oficial. La urgencia y la presión son una técnica de manipulación.'] },
          { icon: 'users', highlight: 'blue', cells: ['RRHH', 'Recibes un correo de alguien que dice ser el nuevo proveedor de nómina. Te pide que confirmes los datos bancarios de los empleados para "sincronizar el sistema antes del cierre de mes". El correo parece profesional y cita el nombre de tu jefe.', 'Los datos bancarios de los empleados son información sensible. Ningún proveedor legítimo necesita que se los confirmes por correo. Verifica siempre por un canal independiente antes de compartir cualquier dato.'] },
          { icon: 'clipboard', highlight: 'default', cells: ['Administración', 'Un hombre se presenta en recepción diciendo que viene a revisar los datáfonos. Trae chaleco con el logo de una empresa de tecnología. Pide que lo dejen a solas con los equipos "para no interrumpir el trabajo de nadie".', 'Cualquier visita de soporte técnico debe estar registrada y acompañada. Nadie debe tener acceso sin supervisión a equipos que procesan datos de pago. Solicita identificación y llama a confirmar la visita con el proveedor directamente.'] },
          { icon: 'briefcase', highlight: 'red', cells: ['Liderazgo', 'Recibes un mensaje de WhatsApp del número de tu gerente general. Te pide que hagas una transferencia urgente a una cuenta nueva de un proveedor. Dice que está en una reunión y no puede hablar, solo necesita la confirmación.', 'Este es el llamado "fraude del CEO". Los delincuentes clonan o suplantan el número del directivo. Ante cualquier solicitud financiera urgente por canal informal, llama al número de siempre para verificar antes de ejecutar.'] },
        ],
      },

      // 11. Lo que tienen en común — palancas y señales de alerta
      {
        type: 'box',
        variant: 'accent',
        title: 'Lo que tienen en común',
        iconItems: [
          { icon: '⏱️', text: 'Urgencia — "Necesito eso ahora, es para el cierre del mes." "Si no lo haces en los próximos 10 minutos perdemos la venta."' },
          { icon: '🧑‍💼', text: 'Autoridad — "Soy el gerente general y necesito que me pases esos datos." "Llamo de parte de auditoría interna."' },
          { icon: '🤝', text: 'Confianza — "Ya hablé con tu jefe y me dijo que estaba bien." "Somos el proveedor de siempre, solo necesitamos actualizar los datos."' },
        ],
        items: [
          'Urgencia extrema — te presionan para actuar de inmediato sin tiempo para verificar.',
          'Solicitud fuera del proceso habitual — algo que normalmente no se hace así.',
          'Remitente o número que no coincide exactamente con el oficial.',
          'Enlace o archivo adjunto que no esperabas recibir.',
          'Alguien pide datos que no necesitaría para hacer su trabajo legítimo.',
        ],
        footer: 'Ante la duda: pausa, verifica por otro canal y reporta.',
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
    estimatedTime: '15 min',
    blocks: [
      // 1. Portada
      {
        type: 'hero',
        title: '¿Cómo evitamos ser parte del problema?',
        subtitle: 'Tres reglas que puedes aplicar hoy',
        requirements: 'PCI DSS 4.0.1 · Requisito 4.2 (Transmisión segura de datos), Requisito 8 (Control de acceso y credenciales), Requisito 9.4 (Protección de medios físicos) y Requisito 12.6 (Concientización)',
        accent: 'primary',
      },

      // 2. Video — Las tres reglas
      {
        type: 'video',
        title: 'Tus tres reglas',
        description: 'Canales autorizados, credenciales personales y un entorno cuidado.',
        src: './videos/m3-tres-reglas.mp4',
      },

      // 3. Tema 1 — Solo los canales autorizados
      {
        type: 'text',
        title: 'Tema 1 — Solo los canales autorizados',
        content: `
          <p>Los datos de tarjeta solo se reciben y procesan por el canal oficial.</p>
          <p>La pregunta no es si la persona confía en ti, sino si el canal protege los datos. Para WhatsApp, correo, SMS o una llamada, la respuesta es no.</p>
        `,
      },

      // 4. Infografía — canales autorizados
      {
        type: 'infographic',
        title: '¿Por este canal sí se pueden enviar datos de pago?',
        src: './Infografías/M3-CanalesAutorizados.html',
        aspectRatio: '1080 / 900',
        maxWidth: 980,
      },

      // 5. Si ya te enviaron los datos
      {
        type: 'box',
        variant: 'success',
        title: 'Si ya te enviaron los datos',
        items: [
          'No los uses para procesar el pago.',
          'Responde con amabilidad: «Gracias por tu confianza. Por seguridad, los datos de tu tarjeta solo pueden procesarse por nuestro canal oficial. Te comparto el enlace seguro: [enlace]. Si tienes alguna dificultad, con gusto te ayudo.»',
          'Reporta al área correspondiente que recibiste datos por un canal no autorizado. No es delatar a nadie: es parte del control.',
        ],
      },

      // 6. Tema 2 — Tus credenciales son tu firma
      {
        type: 'text',
        title: 'Tema 2 — Tus credenciales son tu firma',
        content: `
          <p>Todo lo que se hace con tu usuario queda registrado a tu nombre.</p>
        `,
      },

      // 7. Las 5 reglas de las contraseñas
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

      // 8. Tema 3 — Tu entorno también es seguridad
      {
        type: 'text',
        title: 'Tema 3 — Tu entorno también es seguridad',
        content: `
          <p>Un papel en el escritorio o una pantalla a la vista también son riesgos.</p>
        `,
      },

      // 9. Infografía — trabajo remoto
      {
        type: 'infographic',
        title: 'Cuando trabajas desde casa, el riesgo también va contigo',
        src: './Infografías/M3-TrabajoRemoto.html',
        aspectRatio: '1080 / 620',
        maxWidth: 1100,
      },

      // 10. Checklist de autoevaluación (sin calificación)
      {
        type: 'checklist',
        title: 'Checklist de autoevaluación — ¿Cómo está mi entorno hoy?',
        subtitle: 'Estos hábitos aplican tanto en la oficina como cuando trabajas desde casa. Revisa dónde estás hoy: no hay respuestas correctas o incorrectas, es para que identifiques en qué puedes mejorar. Nadie ve tus respuestas.',
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

      // 11. Actividad de validación — quiz correcto/incorrecto
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

      // 12. Reflexión personal
      {
        type: 'reflection',
        title: 'Antes de continuar, una pregunta para ti',
        storageKey: 'm3_reflexion',
        promptPrefix: '¿Cuál de estas tres reglas es la que más te cuesta aplicar en tu trabajo diario?',
        placeholder: 'Escribe aquí...',
      },

      // 13. Cierre del módulo
      {
        type: 'closing',
        moduleLabel: 'Módulo 3 completado',
        title: '¿Cómo evitamos ser parte del problema?',
        summary: 'En el módulo 1 aprendiste qué protegemos. En el módulo 2 aprendiste cómo intentan obtenerlo. En este aprendiste qué puedes hacer tú para que no lo logren. Las reglas que viste no son complicadas: usa solo los canales autorizados, cuida tus credenciales como si fueran la llave de tu casa, y controla lo que hay en tu entorno de trabajo, tanto en la oficina como en casa.',
        takeaways: [
          'Regla 1 — Solo canales autorizados para recibir o transmitir datos de pago.',
          'Regla 2 — Las credenciales son personales. Nunca se comparten, nunca se escriben en un lugar visible.',
          'Regla 3 — El entorno importa, en la oficina y en casa: pantalla controlada, conexión segura indicada por tu organización, documentos guardados, nada impreso innecesariamente.',
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
    estimatedTime: '11 min',
    blocks: [
      // 1. Portada
      {
        type: 'hero',
        title: '¿Qué hacemos cuando ocurre un incidente?',
        subtitle: 'Qué hacer en los primeros minutos',
        requirements: 'PCI DSS 4.0.1 · Requisito 12.10 (Plan de respuesta a incidentes), Requisito 10.3 (Preservación de registros de auditoría) y Requisito 12.6.3 (Concientización sobre respuesta a incidentes)',
        accent: 'secondary',
      },

      // 2. Video — Si algo sale mal
      {
        type: 'video',
        title: 'Si algo sale mal',
        description: 'Qué es un incidente, los cuatro pasos y lo que nunca debes hacer.',
        src: './videos/m4-si-algo-sale-mal.mp4',
      },

      // 3. Tema 1 — Qué cuenta como un incidente
      {
        type: 'text',
        title: 'Tema 1 — Qué cuenta como un incidente',
      },

      // 4. Definición y la palabra clave
      {
        type: 'box',
        variant: 'accent',
        text: `
          <p>Cualquier situación en la que datos de tarjeta pudieron ser vistos, copiados, enviados o usados por alguien que no debía.</p>
          <p>La palabra clave es <strong>pudieron</strong>: no necesitas certeza, basta una duda razonable.</p>
        `,
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

      // 6. Tema 2 — Los primeros minutos
      {
        type: 'text',
        title: 'Tema 2 — Los primeros minutos',
        content: `
          <p>Cuando detectas o sospechas un incidente, hay cuatro cosas que debes hacer. En este orden.</p>
        `,
      },

      // 7. Infografía — cuatro pasos
      {
        type: 'infographic',
        title: 'Cuatro pasos. En este orden.',
        src: './Infografías/M4-CuatroPasos.html',
        aspectRatio: '1080 / 900',
        maxWidth: 980,
      },

      // 8. Lo que nunca debes hacer
      {
        type: 'box',
        variant: 'warning',
        title: 'Lo que nunca debes hacer',
        items: [
          'Arreglarlo tú mismo: puedes borrar evidencia.',
          'Ocultarlo por miedo: cada hora sin reportar es más exposición.',
          'Actuar sin avisar: puedes interferir con la investigación.',
          'Comentarlo antes de reportarlo: puede llegar a quien no debe.',
        ],
      },

      // 9. Reportar no es delatar
      {
        type: 'flyer',
        color: 'primary',
        icon: '📣',
        badge: 'Recuerda',
        body: 'Reportar no es delatar: es proteger. Un incidente reportado a tiempo suele ser controlable; uno oculto casi siempre crece.',
      },

      // 10. Actividad de validación — ordenar acciones
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

      // 11. Tarjeta descargable
      {
        type: 'downloadcard',
        variant: 'incidentCard',
        title: 'Tarjeta de referencia — Si detectas o sospechas un incidente',
        description: 'Guárdala en tu celular o imprímela. Incluye qué hacer, qué no hacer y un espacio para los contactos de reporte de tu organización.',
      },

      // 12. Reflexión personal
      {
        type: 'reflection',
        title: 'Antes de continuar, una pregunta para ti',
        storageKey: 'm4_reflexion',
        promptPrefix: 'Si mañana detectaras algo sospechoso en tu trabajo, ¿sabes exactamente qué hacer y a quién llamar?',
        placeholder: 'Escribe aquí...',
      },

      // 13. Cierre del módulo
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
    estimatedTime: '11 min',
    blocks: [
      // 1. Portada
      {
        type: 'hero',
        title: '¿Cómo lo aplico en mi trabajo?',
        subtitle: 'Llevar lo que aprendiste a tu trabajo',
        requirements: 'PCI DSS 4.0.1 · Requisito 12.6.3 (Verificación de comprensión y aplicación) y Requisito 12.6.3.2 (Evaluación de concientización)',
        accent: 'accent',
      },

      // 2. Tema 1 — Tres situaciones, tres decisiones
      {
        type: 'text',
        title: 'Tema 1 — Tres situaciones, tres decisiones',
        content: `
          <p>Tres situaciones reales de distintas áreas. Elige lo que harías. Necesitas acertar las tres para continuar; puedes reintentar sin penalización.</p>
        `,
      },

      // 3. Las tres situaciones integradoras (quiz gated, passingScore 100)
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

      // 4. Una pregunta para ti
      {
        type: 'reflection',
        title: 'Una pregunta para ti',
        storageKey: 'm5_reflexion_2',
        promptPrefix: '¿Qué vas a hacer diferente en tu trabajo a partir de mañana?',
        placeholder: 'Ej: Voy a usar el canal oficial para recibir pagos / Voy a bloquear mi equipo cuando me levante / Voy a reportar los correos sospechosos en lugar de ignorarlos.',
      },

      // 5. ¿Sabes a quién reportar? (opción múltiple, sin calificación)
      {
        type: 'selfcheck',
        title: '¿Sabes a quién reportar?',
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

      // 6. Cierre narrativo del curso
      {
        type: 'text',
        title: 'Cierre narrativo del curso',
        content: `
          <p><strong>Lo que aprendiste en este curso no es teoría.</strong></p>
          <p>Aprendiste a reconocer qué información tiene valor real y por qué protegerla importa. Aprendiste a identificar una situación de riesgo antes de que se convierta en un problema. Aprendiste las reglas concretas que puedes aplicar desde hoy en tu trabajo diario. Y aprendiste qué hacer si, a pesar de todo, algo sale mal.</p>
          <p>Nada de esto requiere ser experto en seguridad. Requiere criterio, hábito y disposición para actuar cuando algo no cuadra.</p>
          <p><strong>Cada dato de pago representa la confianza de una persona. Protegerlo también depende de las decisiones que tomas cada día.</strong></p>
        `,
      },

      // 7. Cierre del módulo
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
