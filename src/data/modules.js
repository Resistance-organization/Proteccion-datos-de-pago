// ───────────────────────────────────────────────────────────────────────────
// ESTRUCTURA DE MÓDULOS
// Cada módulo tiene un array de "blocks" que se renderizan en secuencia.
//
// TIPOS DE BLOQUES DISPONIBLES:
//   hero        → Portada del módulo (title, subtitle, image?, accent?)
//   text        → Texto enriquecido con HTML (title?, content)
//   reading     → Lectura larga con tabla de contenido (title, sections[])
//   flipcard    → Tarjetas con frente y reverso (title, instruction?, cards[])
//   carousel    → Carrusel de imágenes/tarjetas (title, items[])
//   imageslides → PPT exportada como imágenes (title, images[])
//   glossary    → Glosario interactivo acordeón (title, intro?, terms[])
//   slides      → Presentación estilo PPT (title, slides[])
//   infographic → Imagen/HTML embebido (title?, image|src, aspectRatio?, fullBleed?, caption?)
//   video       → Video HTML5 o YouTube (title?, src, type: 'html5'|'youtube')
//   quiz        → Cuestionario calificado — afecta el desbloqueo de módulos (title, questions[])
//   scenario    → Quiz diagnóstico sin calificar, feedback por opción (title, situations[], results{})
//   reflection  → Campo de texto libre que se guarda y se puede recuperar más adelante
//   flyer       → Tarjeta visual destacada (title, body, image?, color?)
// ─────────────────────────────────────

export const courseInfo = {
  title: 'Ciberseguridad Cotidiana',
  subtitle: 'Hábitos digitales seguros para tu vida diaria',
  version: '1.0',
  passingScore: 80,
}

export const modules = [
  // ─────────────────────────────────────
  // MÓDULO 0 — Pon a prueba tu intuición
  // (Sin calificación · módulo de apertura)
  // ─────────────────────────────────────
  {
    id: 0,
    title: 'Pon a prueba tu intuición',
    description: '¿Ya fui víctima sin saberlo?',
    icon: '🧭',
    estimatedTime: '5–8 min',
    blocks: [
      // 1. Portada
      {
        type: 'hero',
        title: 'Pon a prueba tu intuición',
        subtitle: '¿Ya fui víctima sin saberlo?',
        accent: 'primary',
      },

      // 2. Introducción
      {
        type: 'text',
        title: '¿Podrías reconocer una estafa antes de caer en ella?',
        content: `
          <p>La mayoría de las personas dice que sí. Y la mayoría de las personas que caen en una
          estafa también decía que sí.</p>
          <p>No es falta de atención. Es que las técnicas están diseñadas exactamente para engañar
          a quienes creen que no pueden ser engañados. Este módulo no tiene calificación: solo te
          muestra cuál es tu punto de partida antes de empezar.</p>
        `,
      },

      // 3. Pieza gráfica — Roadmap del curso
      {
        type: 'infographic',
        title: 'El recorrido que vas a hacer',
        src: './Infografías/M0-Recorrido.html',
        aspectRatio: '1760 / 850',
        fullBleed: true,
        maxWidth: 1600,
      },

      // 4. Quiz diagnóstico — 5 situaciones cotidianas
      {
        type: 'scenario',
        title: 'Quiz diagnóstico',
        subtitle: 'A continuación vas a ver 5 situaciones cotidianas. En cada una, elige lo que harías. Responde con lo que realmente harías, no con lo que crees que es correcto. Este quiz no tiene calificación ni afecta tu avance.',
        situations: [
          // Situación 1 — Smishing (SMS bancario)
          {
            id: 'situacion_1',
            mockup: 'sms',
            content: {
              sender: 'Bancolombia',
              message: 'Ú�️ Detectamos un acceso sospechoso a su cuenta. Su tarjeta será bloqueada en 30 minutos si no verifica sus datos. Ingrese ahora: bit.ly/bcol-verificar',
              time: '10:07 p. m. �S�S',
            },
            question: '¿Qué haces?',
            options: [
              {
                text: 'Entro al link para revisar si mi tarjeta está bien. No quiero que me la bloqueen.',
                correct: false,
                feedback: 'Este es exactamente el objetivo del mensaje. El enlace acortado (bit.ly) no pertenece al banco. Los bancos nunca piden verificar datos por SMS con un link. Esto se llama smishing. Si hubieras entrado, estarías entregando tus datos a un sitio falso.',
              },
              {
                text: 'No hago nada por ahora, pero lo dejo guardado por las dudas.',
                correct: false,
                feedback: 'Ignorarlo es mejor que hacer clic, pero no es suficiente. Estos mensajes suelen venir en serie y cada vez más urgentes. Lo correcto es verificar directamente con el banco.',
              },
              {
                text: 'Llamo directamente a la línea que aparece en el dorso de mi tarjeta para verificar si hay un problema real.',
                correct: true,
                feedback: 'Correcto. El número del dorso de la tarjeta es el único canal confiable para verificar. El banco nunca va a molestarse porque llamaste a preguntar.',
              },
              {
                text: 'Le mando el mensaje a un familiar para que me diga si es verdad.',
                correct: false,
                feedback: 'Un familiar tampoco puede saber si el mensaje es real. La verificación siempre tiene que ser directa con la institución.',
              },
            ],
          },

          // Situación 2 — Phishing (email corporativo)
          {
            id: 'situacion_2',
            mockup: 'email',
            content: {
              sender: 'soporte@microsoft-secure-login.com',
              subject: 'Su cuenta de Microsoft 365 será suspendida',
              message: 'Estimado usuario, hemos detectado actividad inusual en su cuenta. Para evitar la suspensión de su servicio, debe confirmar su identidad en las próximas 24 horas. Haga clic aquí para verificar su cuenta.',
              time: 'Recibido hoy 09:14 a. m.',
            },
            question: 'Lo primero que haces es...',
            options: [
              {
                text: 'Hago clic en "aquí" para verificar antes de que suspendan mi cuenta.',
                correct: false,
                feedback: 'El link lleva a un sitio falso diseñado para robar tus credenciales de Microsoft. Una vez que ingresas tu usuario y contraseña, el atacante tiene acceso a tu cuenta, tus correos y posiblemente otros sistemas de la organización.',
              },
              {
                text: 'Miro el remitente: dice "microsoft-secure-login.com", no "microsoft.com". Eso no cierra.',
                correct: true,
                feedback: 'Correcto. La primera señal de alarma siempre es el remitente. Microsoft usa @microsoft.com. Cualquier variación es una señal de fraude. Mirar el dominio antes de hacer cualquier otra cosa es uno de los hábitos más efectivos contra el phishing.',
              },
              {
                text: 'Reenvío el correo a mi jefe para que decida qué hacer.',
                correct: false,
                feedback: 'Reenviar sin señalar el problema puede hacer que tu jefe también caiga. Lo correcto es identificar la señal de alarma y reportarlo al área de tecnología o eliminarlo.',
              },
              {
                text: 'Lo borro sin leerlo porque parece spam.',
                correct: false,
                feedback: 'Borrarlo te protege, pero pierdes la oportunidad de reportarlo. En un entorno corporativo, reportar intentos de phishing protege a todos los demás.',
              },
            ],
          },

          // Situación 3 — WiFi público
          {
            id: 'situacion_3',
            mockup: 'wifi',
            content: {
              message: 'Estás en una cafetería y necesitas revisar el resumen de tu cuenta bancaria. Tu celular tiene datos móviles pero la señal es baja. El café tiene wifi gratuito abierto: "CafeNet_Libre". No pide contraseña.',
              network: 'CafeNet_Libre',
            },
            question: '¿Cómo accedes a tu banco?',
            options: [
              {
                text: 'Me conecto al wifi del café y entro al banco. Es más rápido y no gasto datos.',
                correct: false,
                feedback: "Una red wifi abierta sin contraseña puede ser controlada por un atacante que intercepta todo lo que transmites, incluyendo tu sesión bancaria. Esto se llama ataque 'man in the middle'. Nunca uses redes abiertas para operaciones sensibles.",
              },
              {
                text: 'Uso mis datos móviles aunque la señal sea baja. Para operaciones bancarias no vale la pena arriesgar.',
                correct: true,
                feedback: 'Correcto. Tus datos móviles son un canal cifrado entre tu dispositivo y la red de tu operador. Aunque la señal sea baja, es la opción más segura para acceder a tu banco desde un lugar público.',
              },
              {
                text: 'Me conecto al wifi y activo la VPN antes de entrar al banco.',
                correct: false,
                feedback: 'Es una opción aceptable, pero requiere tener una VPN confiable ya configurada y activa. Si no sabes con certeza que tu VPN es confiable y está funcionando bien, usar los datos móviles directamente es la elección más segura y simple. Más adelante en el curso vas a aprender cuándo y cómo usar una VPN.',
              },
              {
                text: 'Le pregunto al mesero si el wifi es seguro y, si dice que sí, lo uso.',
                correct: false,
                feedback: 'El mesero no puede saber si la red es segura técnicamente. Una red abierta sin contraseña no cifra el tráfico independientemente de quién la administre.',
              },
            ],
          },

          // Situación 4 — WhatsApp, suplantación familiar
          {
            id: 'situacion_4',
            mockup: 'whatsapp',
            content: {
              avatar: '?',
              sender: '+57 3XX XXX-XXXX',
              senderNote: 'Número desconocido',
              message: 'Hola, soy yo. Cambié de número. Estoy en un problema, necesito que me hagas una transferencia urgente de $500.000. Te explico después. ¿Puedes?',
              time: 'Hoy 2:32 p. m. �S�S',
            },
            question: '¿Qué haces?',
            options: [
              {
                text: 'Hago la transferencia. Si es mi hijo/a en un problema, no puedo perder tiempo.',
                correct: false,
                feedback: "Esta es una de las estafas más frecuentes en Colombia y Latinoamérica: el 'cuento del tío' versión WhatsApp. El atacante usa la urgencia y la emoción para que no pienses. Una vez transferido, el dinero no se recupera.",
              },
              {
                text: 'Le pido que me mande una foto para confirmar que es él/ella.',
                correct: false,
                feedback: 'Pedir una foto no es suficiente: las fotos se obtienen fácilmente de redes sociales. Cualquier "prueba" que el atacante pueda enviar por ese mismo chat no es verificable.',
              },
              {
                text: 'Llamo al número original de mi hijo/a que tengo guardado para confirmar.',
                correct: true,
                feedback: 'Correcto. Llamar al número original que ya tienes guardado es la única verificación confiable. Si contesta, sabes que el mensaje fue una estafa. Nunca uses el canal del supuesto familiar para verificar.',
              },
              {
                text: 'Le digo que no tengo plata y espero a ver qué pasa.',
                correct: false,
                feedback: 'Es mejor que transferir, pero el atacante va a insistir con mensajes cada vez más urgentes. Lo correcto es cortar ese canal y verificar directamente.',
              },
            ],
          },

          // Situación 5 — Instagram DM, cuenta comprometida
          {
            id: 'situacion_5',
            mockup: 'instagram',
            content: {
              avatar: '👀',
              sender: 'Un amigo (Instagram)',
              senderNote: 'Conocido hace años',
              message: 'Mirá esto, saliste vos → ver-video-privado-ig.net',
              time: 'Hoy',
            },
            question: '¿Qué haces?',
            options: [
              {
                text: 'Entro al link. Si es mi amigo quien me lo manda, debe ser algo real.',
                correct: false,
                feedback: 'La cuenta de tu amigo probablemente fue hackeada. Los atacantes usan cuentas comprometidas para enviar links maliciosos a todos los contactos, exactamente porque confías en quien te lo manda.',
              },
              {
                text: 'Le pregunto por mensaje qué es el video antes de entrar.',
                correct: false,
                feedback: 'Es mejor que entrar directamente, pero si la cuenta está comprometida, el atacante puede responder desde ella. La verificación más confiable es llamar a tu amigo por teléfono.',
              },
              {
                text: 'Miro el dominio del link: "ver-video-privado-ig.net" no tiene nada que ver con Instagram.',
                correct: true,
                feedback: 'Correcto. Instagram usa instagram.com. Cualquier otro dominio es una señal de alerta inmediata. Leer el link antes de hacer clic es uno de los hábitos más simples y más efectivos que vas a incorporar en este curso.',
              },
              {
                text: 'Lo ignoro. Si fuera importante, me lo diría en persona.',
                correct: false,
                feedback: 'Ignorarlo te protege a ti, pero no le avisa a tu amigo que su cuenta puede estar comprometida. Lo ideal es no entrar al link y contactar a tu amigo por otro canal para avisarle.',
              },
            ],
          },
        ],
        results: {
          band1: {
            min: 0,
            icon: 'compass',
            title: 'Bienvenido/a al lugar correcto.',
            text: 'Estas situaciones están diseñadas para engañar. Estar acá es el primer paso para no caer en ellas.',
          },
          band2: {
            min: 3,
            icon: 'search',
            title: 'Tienes buen instinto. Vamos a afilarlo.',
            text: 'Reconociste la mayoría de las señales. En el curso vas a aprender exactamente por qué funcionan y cómo nunca pasarlas por alto.',
          },
          band3: {
            min: 5,
            icon: 'star',
            title: 'Muy bien. Ahora vas a entender por qué.',
            text: 'Reconociste todas las situaciones. El curso te va a dar el lenguaje y las herramientas para explicarlas y ayudar a otros a reconocerlas.',
          },
          commonNote: 'Lo que aprendes en este curso, lo aplicas desde hoy. Y vale para ti, para tu familia y para tu entorno laboral.',
        },
      },

      // 5. Compromiso personal — campo de texto libre
      {
        type: 'reflection',
        mode: 'capture',
        storageKey: 'm0_compromiso',
        title: 'Tu compromiso personal',
        intro: 'Acabas de ver cinco situaciones reales. Tal vez reconociste algunas, tal vez no. De cualquier manera, ahora sabes con más claridad qué quieres proteger. Escribe una sola cosa. La primera que te venga a la mente: tu cuenta bancaria, las fotos de tus hijos, tu privacidad, tu reputación en línea. Lo que sea que quieras proteger.',
        promptPrefix: 'Con este curso quiero aprender a proteger',
        placeholder: 'Ej: las cuentas de mis padres',
        savedText: 'Guardamos tu respuesta. Al terminar el módulo 5, vas a poder leerla de nuevo y confirmar que lograste lo que te propusiste.',
      },
    ],
  },

  // ─────────────────────────────────────
  // MÓDULO 1 — ¿Qué está en riesgo?
  // ─────────────────────────────────────
  {
    id: 1,
    title: '¿Qué está en riesgo?',
    description: 'Tu identidad digital y lo que vale para quien quiere robártela.',
    icon: '🔓',
    estimatedTime: '20 min',
    blocks: [
      // 1. Portada
      {
        type: 'hero',
        title: '¿Qué está en riesgo?',
        subtitle: 'Tu identidad digital y lo que vale para quien quiere robártela',
        accent: 'secondary',
      },

      // 2. Tema 1 — gancho inicial
      {
        type: 'box',
        variant: 'accent',
        title: 'Si alguien buscara tu nombre en Google ahora mismo, ¿qué encontraría?',
        iconItems: [
          { icon: '📱', text: 'Tus redes sociales públicas' },
          { icon: '📧', text: 'Tu correo, registrado en decenas de apps' },
          { icon: '📸', text: 'Fotos y videos de hace años' },
          { icon: '💬', text: 'Comentarios en foros o publicaciones' },
          { icon: '📝', text: 'Datos en formularios que llenaste alguna vez' },
          { icon: '🔍', text: 'Resultados que ni recuerdas haber generado' },
        ],
        footer: 'Eso es tu identidad digital, y existe aunque no hayas pensado nunca en ella.',
      },

      // 3. Tema 1 — ¿Qué es exactamente?
      {
        type: 'text',
        title: 'Tema 1 — ¿Qué es tu identidad digital?',
        content: `
          <p>Tu identidad digital es el conjunto de información que existe sobre ti en el mundo digital. No es solo lo que publicas conscientemente: incluye todo lo que los sistemas registran sobre ti cada vez que usas un dispositivo conectado a internet.</p>
          <p>Se construye a lo largo del tiempo y en muchos lugares distintos. Cada vez que creas una cuenta, compras en línea, usas una aplicación o navegas por una página web, estás dejando información que forma parte de tu identidad digital.</p>
        `,
      },

      // 4. Algo que mucha gente no sabe
      {
        type: 'box',
        variant: 'info',
        title: 'Algo importante que mucha gente no sabe:',
        text: 'Incluso si nunca compartiste un dato públicamente, puede terminar expuesto por una filtración de una empresa donde tienes cuenta: compras, domicilios, streaming, aerolíneas. Proteger tu identidad digital no depende solo de lo que tú haces, también de con quién confías tus datos.',
      },

      // 5. El MFA como parte de tu identidad
      {
        type: 'text',
        title: 'Un segundo factor que también es parte de tu identidad: el MFA',
        content: `
          <p>Hoy en día, muchas cuentas se protegen con algo más que una contraseña. Cuando ingresas a tu banco, tu correo o WhatsApp, el sistema puede pedirte un código adicional por mensaje de texto o app. Eso se llama autenticación multifactor, o MFA.</p>
          <p>Ese código de seis dígitos también es parte de tu identidad digital: es una llave temporal. Si alguien te convence de compartirlo, tiene lo que necesita para entrar a tu cuenta aunque no sepa tu contraseña.</p>
        `,
      },

      // 6. Para tener presente
      {
        type: 'box',
        variant: 'info',
        title: 'Para tener presente:',
        text: 'Los códigos que llegan por SMS para confirmar accesos o transacciones son un segundo factor de autenticación. Ninguna empresa, banco o plataforma legítima te va a pedir que los compartas con otra persona. En el Módulo 3 vas a aprender a configurar el MFA en tus cuentas más importantes.',
      },

      // 3. Infografía — Los 6 componentes de la identidad digital
      {
        type: 'infographic',
        maxWidth: 1600,
        title: 'Los 6 componentes de tu identidad digital',
        src: './Infografías/M1-IdentidadDigital.html',
        aspectRatio: '1080 / 1274',
      },

      // 4. El espejo digital — reflexión no calificada
      {
        type: 'selfcheck',
        title: 'El espejo digital',
        subtitle: 'Responde estas 3 preguntas. Solo las ves tú — este ejercicio no es una amenaza, es una invitación a ser consciente de lo que ya existe sobre ti.',
        questions: [
          {
            id: 'espejo_1',
            question: '¿Tienes perfiles en redes sociales (Instagram, Facebook, LinkedIn, TikTok)?',
            options: ['Sí, completamente públicos', 'Sí, pero con privacidad configurada', 'No tengo redes sociales'],
          },
          {
            id: 'espejo_2',
            question: '¿En cuántas aplicaciones o sitios web tienes cuentas registradas, aproximadamente?',
            options: ['Menos de 5', 'Entre 5 y 20', 'Más de 20', 'No lo sé'],
          },
          {
            id: 'espejo_3',
            question: '¿Alguna vez ingresaste tu cédula, número de tarjeta o datos bancarios en un sitio web?',
            options: ['Sí, varias veces', 'Sí, alguna vez', 'No recuerdo', 'Nunca'],
          },
        ],
        resultTitle: 'Tu huella digital es más grande de lo que crees.',
        resultText: 'Cada cuenta, cada formulario, cada compra en línea deja información tuya en algún servidor. Eso no es malo por sí mismo: es la realidad del mundo digital. Lo importante es saber que existe, quién la tiene y cómo protegerla.',
      },

      // 5. Por qué importa saber esto
      {
        type: 'text',
        content: `
          <p>La identidad digital no es un concepto técnico. Es algo que afecta decisiones concretas de tu vida: si alguien tiene acceso a tus credenciales, puede entrar a tu cuenta bancaria. Si tiene tu número de cédula y tus datos personales, puede intentar suplantar tu identidad ante entidades financieras o gubernamentales. Si tiene acceso a tu correo, puede recuperar las contraseñas de todas tus otras cuentas.</p>
          <p>El primer paso para proteger algo es saber que existe y qué vale. En el próximo tema, vas a ver exactamente qué información tuya tiene mayor valor para quien quiere usarla de forma indebida.</p>
        `,
      },

      // 7. Tema 2 — gancho
      {
        type: 'box',
        variant: 'accent',
        title: 'Alguien que tiene tu información personal no necesita robarte el celular.',
        text: 'Puede pedir un crédito a tu nombre, entrar a tu cuenta de Bancolombia, hacerse pasar por ti ante la DIAN o vaciar tu Nequi. No porque sea un experto en tecnología, sino porque tiene los datos correctos.',
      },

      // 8. Tema 2 — texto
      {
        type: 'text',
        title: 'Tema 2 — ¿Qué información tuya tiene valor?',
        content: `
          <p>Cuando hablamos de información que tiene valor no nos referimos solo a datos que a ti te parecen importantes. Nos referimos a datos que son útiles para alguien que quiere hacerse pasar por ti, acceder a tus cuentas o cometer fraude en tu nombre.</p>
        `,
      },

      // 9. Tabla dinámica — tipos de dato
      {
        type: 'datatable',
        title: 'Qué dato, para qué lo usa un atacante',
        columns: ['Tipo de dato', 'Ejemplos', 'Para qué lo usa un atacante'],
        rows: [
          { icon: '🪪', highlight: 'red', cells: ['Datos de identidad', 'Cédula, nombre completo, fecha y lugar de nacimiento', 'Suplantar identidad ante bancos, notarías u operadores'] },
          { icon: '🔑', highlight: 'red', cells: ['Credenciales de acceso', 'Usuario y contraseña de correo, redes, apps bancarias', 'Entrar a tus cuentas, robar dinero o información'] },
          { icon: '📲', highlight: 'red', cells: ['Códigos MFA', 'Código de 6 dígitos por SMS o app', 'Saltarse el doble factor aunque no tenga tu contraseña'] },
          { icon: '💳', highlight: 'orange', cells: ['Datos financieros', 'Número de tarjeta, CVV, clave de Nequi/Daviplata', 'Transacciones no autorizadas, compras en línea'] },
          { icon: '📞', highlight: 'orange', cells: ['Datos de contacto', 'Celular, correo, dirección de residencia', 'Mensajes fraudulentos, verificaciones de dos pasos'] },
          { icon: '📊', highlight: 'blue', cells: ['Comportamiento', 'Horarios, apps instaladas, ubicación habitual', 'Personalizar ataques, saber cuándo no estás en casa'] },
          { icon: '👨‍👩‍👧', highlight: 'blue', cells: ['Familiar y social', 'Nombres de familiares, relaciones, lugares frecuentados', 'Construir mensajes de engaño convincentes'] },
        ],
      },

      // 7. Pirámide interactiva — valor de los datos
      {
        type: 'pyramid',
        title: '¿Cuánto vale tu información para un atacante?',
        hint: 'Pasa el mouse sobre cada nivel para ver por qué',
        levels: [
          {
            id: 'l1',
            color: 'red',
            sub: 'Nivel 1 · El más crítico',
            title: 'Acceso total',
            content: 'Contraseña + usuario de correo electrónico + códigos MFA',
            why: 'Quien tiene tu correo puede recuperar todas tus otras contraseñas. El MFA es la última barrera.',
          },
          {
            id: 'l2',
            color: 'orange',
            sub: 'Nivel 2 · Muy crítico',
            title: 'Identidad y dinero',
            content: 'Cédula de ciudadanía + datos de tarjetas + claves bancarias + número de celular',
            why: 'Permite suplantar tu identidad y acceder a recursos financieros directamente.',
          },
          {
            id: 'l3',
            color: 'yellow',
            sub: 'Nivel 3 · Crítico en combinación',
            title: 'Contexto para el engaño',
            content: 'Nombre de familiares, hábitos, ubicación, nombres de mascotas, ciudad de nacimiento',
            why: 'Solo no parece peligroso. Combinado con los niveles anteriores, hace los ataques mucho más convincentes.',
          },
        ],
        footer: 'En ciberseguridad, un dato aislado <b style="color:#BFED45;">rara vez</b> representa el mayor riesgo. El peligro crece cuando <b style="color:#BFED45;">varios datos se combinan</b>.',
      },

      // 10. Combinación de datos: el riesgo real
      {
        type: 'text',
        title: 'Combinación de datos: el riesgo real',
        content: `
          <p>Un dato aislado puede parecer inofensivo: tu nombre es público, tu celular aparece en tus redes, tu fecha de nacimiento está en Facebook. Pero cuando alguien combina tu nombre, tu celular, tu fecha de nacimiento y el nombre de tu banco, tiene suficiente para un engaño muy convincente.</p>
          <p>Esta combinación es lo que hace efectivos a los ataques modernos: no requieren vulnerar sistemas sofisticados, solo recolectar lo que ya está disponible sobre ti.</p>
        `,
      },

      // 11. Idea clave
      {
        type: 'box',
        variant: 'info',
        title: 'Una idea clave antes de continuar:',
        text: '<p>Muchos ataques no consisten en vulnerar sistemas tecnológicos. Consisten en convencer a una persona de entregar su información voluntariamente: una llamada que parece del banco, un mensaje que parece de un familiar, un correo que parece de una empresa conocida.</p><p><strong>En el Módulo 2 vas a aprender exactamente cómo funcionan estas técnicas y cómo reconocerlas antes de caer en ellas.</strong></p>',
      },

      // 9. Tema 3 — Casos reales
      {
        type: 'text',
        title: 'Tema 3 — Casos reales: cuando la identidad digital se convierte en una amenaza',
        content: `
          <p>Los números hablan de tendencias. Los casos hablan de personas reales. Este tema presenta dos situaciones basadas en incidentes documentados que ocurrieron en Colombia y en la región, para que puedas ver exactamente cómo funciona una vulneración de identidad digital en la vida cotidiana.</p>
        `,
      },

      // 10. Caso 1 — Suplantación para crédito fraudulento
      {
        type: 'infographic',
        title: 'Caso real — Le sacaron un crédito sin que él lo supiera',
        src: './Infografías/M1-CasoCredito.html',
        aspectRatio: '1080 / 1900',
        maxWidth: 980,
      },

      // 11. Caso 2 — Robo de WhatsApp
      {
        type: 'infographic',
        title: 'Caso real — Le robaron el WhatsApp y estafaron a sus contactos',
        src: './Infografías/M1-CasoWhatsApp.html',
        aspectRatio: '1080 / 1900',
        maxWidth: 980,
      },

      // 13. Quiz de clasificación (gating: 70% = 7/10)
      {
        type: 'quiz',
        title: 'Actividad de validación — ¿Este dato tiene valor para un atacante?',
        subtitle: 'Clasifica cada dato: crítico o de bajo riesgo por sí solo. Necesitas 7 de 10 correctas para avanzar.',
        passingScore: 70,
        questions: [
          {
            id: 'm1_dato_1',
            question: 'Tu número de cédula de ciudadanía',
            options: ['Dato crítico', 'Dato de bajo riesgo por sí solo'],
            correct: 0,
            explanation: 'Tu cédula es el dato más sensible de tu identidad en Colombia. Con ella, alguien puede intentar suplantar tu identidad ante bancos, notarías u operadores de telefonía.',
          },
          {
            id: 'm1_dato_2',
            question: 'El nombre de tu mascota',
            options: ['Dato crítico', 'Dato de bajo riesgo por sí solo'],
            correct: 1,
            explanation: 'Por sí solo no es crítico. Sin embargo, muchas personas lo usan como contraseña o respuesta a preguntas de seguridad, lo que lo convierte en parte del contexto que un atacante puede explotar.',
          },
          {
            id: 'm1_dato_3',
            question: 'La contraseña de tu correo electrónico',
            options: ['Dato crítico', 'Dato de bajo riesgo por sí solo'],
            correct: 0,
            explanation: "Tu correo es la llave maestra. Quien tiene tu contraseña puede recuperar el acceso a casi todas tus otras cuentas a través de la opción 'olvidé mi contraseña'.",
          },
          {
            id: 'm1_dato_4',
            question: 'Tu color favorito',
            options: ['Dato crítico', 'Dato de bajo riesgo por sí solo'],
            correct: 1,
            explanation: 'No tiene valor por sí mismo, aunque puede aparecer como respuesta a preguntas de seguridad en algunas plataformas.',
          },
          {
            id: 'm1_dato_5',
            question: 'El CVV de tu tarjeta de crédito (los 3 números del respaldo)',
            options: ['Dato crítico', 'Dato de bajo riesgo por sí solo'],
            correct: 0,
            explanation: 'El CVV, combinado con el número de tarjeta y la fecha de vencimiento, permite hacer compras en línea sin tener la tarjeta física.',
          },
          {
            id: 'm1_dato_6',
            question: 'Tu número de celular',
            options: ['Dato crítico', 'Dato de bajo riesgo por sí solo'],
            correct: 0,
            explanation: 'Tu celular es el canal de verificación de la mayoría de tus cuentas. Quien lo controla puede recibir los códigos MFA que te envían por SMS.',
          },
          {
            id: 'm1_dato_7',
            question: 'El restaurante donde almuerzas frecuentemente',
            options: ['Dato crítico', 'Dato de bajo riesgo por sí solo'],
            correct: 1,
            explanation: 'Solo, no es crítico. Combinado con otros datos, revela tus hábitos y ubicación habitual, lo que puede usarse para personalizar ataques.',
          },
          {
            id: 'm1_dato_8',
            question: 'El código de verificación de 6 dígitos que te llegó por SMS de WhatsApp',
            options: ['Dato crítico', 'Dato de bajo riesgo por sí solo'],
            correct: 0,
            explanation: 'Ese código es el segundo factor de autenticación (MFA) de tu cuenta. Compartirlo con cualquier persona, por cualquier razón, le entrega el acceso completo a tu WhatsApp.',
          },
          {
            id: 'm1_dato_9',
            question: 'Tu fecha de nacimiento',
            options: ['Dato crítico', 'Dato de bajo riesgo por sí solo'],
            correct: 0,
            explanation: 'Sola puede parecer inofensiva. Combinada con tu cédula y nombre, es parte del paquete de datos que se usa para suplantar identidad ante entidades financieras.',
          },
          {
            id: 'm1_dato_10',
            question: 'La ciudad donde naciste',
            options: ['Dato crítico', 'Dato de bajo riesgo por sí solo'],
            correct: 1,
            explanation: 'Por sí sola no es crítica, pero aparece con frecuencia como respuesta a preguntas de seguridad y forma parte del contexto que construye un perfil completo.',
          },
        ],
      },

      // 14. Frase de cierre del ejercicio (siempre visible, independiente del puntaje)
      {
        type: 'flyer',
        color: 'primary',
        icon: '💡',
        badge: 'Idea clave',
        body: 'En ciberseguridad, un dato aislado rara vez representa el mayor riesgo. El problema aparece cuando varios datos se combinan.',
      },

      // 13. Cierre del módulo
      {
        type: 'closing',
        moduleLabel: 'Módulo 1 completado',
        title: '¿Qué está en riesgo?',
        summary: 'Tu identidad digital existe aunque no hayas pensado en ella, hay información tuya con valor real, y muchos ataques no hackean sistemas: convencen a personas de entregar información voluntariamente.',
        takeaways: [
          'Tu correo electrónico es la llave maestra. Quien tiene acceso a él puede recuperar todas tus otras cuentas.',
          'Tu cédula + fecha de nacimiento + celular son suficientes para solicitar productos financieros a tu nombre.',
          'Los códigos que llegan por SMS para confirmar accesos son MFA. Ningún servicio legítimo te los va a pedir.',
          'Tus datos pueden quedar expuestos no por un error tuyo, sino por una filtración de una empresa donde tienes cuenta.',
        ],
        nextHint: 'En el Módulo 2 vas a aprender exactamente cómo intentan obtener esa información.',
      },
    ],
  },

  // ─────────────────────────────────────
  // MÓDULO 2 — ¿Cómo intentan engañarme?
  // ─────────────────────────────────────
  {
    id: 2,
    title: '¿Cómo intentan engañarme?',
    description: 'Los métodos que usan para que actúes rápido sin pensar.',
    icon: '🪝',
    estimatedTime: '25 min',
    blocks: [
      // 1. Portada
      {
        type: 'hero',
        title: '¿Cómo intentan engañarme?',
        subtitle: 'Los métodos que usan para que actúes rápido sin pensar',
        accent: 'accent',
      },

      // 2. Tema 1 — gancho
      {
        type: 'box',
        variant: 'accent',
        title: 'Antes de hablar de phishing, smishing o estafas en WhatsApp, necesitas entender algo.',
        text: 'Todos esos métodos tienen algo en común: no explotan fallas tecnológicas, explotan la forma en que los seres humanos tomamos decisiones cuando sentimos urgencia, miedo o confianza. Eso se llama ingeniería social, y es el fundamento de casi todos los ataques contra usuarios comunes.',
      },

      // 3. Tema 1 — texto
      {
        type: 'text',
        title: 'Tema 1 — ¿Qué es la ingeniería social?',
        content: `
          <p>Es la manipulación psicológica de una persona para que tome una acción que beneficia al atacante: entregar información, hacer una transferencia, dar acceso a un sistema o instalar un programa malicioso.</p>
          <p>No requiere conocimientos técnicos avanzados. Requiere entender cómo piensan las personas y cómo reaccionan cuando sienten presión, cuando confían en quien les habla o cuando creen que algo urgente está pasando.</p>
        `,
      },

      // 3. Infografía — 4 disparadores psicológicos
      {
        type: 'infographic',
        maxWidth: 1600,
        title: 'Los 4 disparadores psicológicos que usa la ingeniería social',
        src: './Infografías/M2-Disparadores.html',
        aspectRatio: '1600 / 1000',
        fullBleed: true,
      },

      // 5. El patrón, en 3 pasos
      {
        type: 'box',
        variant: 'info',
        title: 'El patrón de todos los ataques de ingeniería social',
        text: 'Todos los vectores que vas a ver en este módulo son aplicaciones concretas de ingeniería social. Cambia el canal — correo, SMS, llamada, código QR — pero el mecanismo es siempre el mismo.',
        items: [
          'Crean una situación que activa un disparador: urgencia, autoridad, confianza o recompensa.',
          'Te piden que hagas algo de inmediato: hacer clic, llamar, transferir, compartir un código.',
          'No te dan tiempo para verificar, preguntar o pensar.',
        ],
        footer: 'La defensa más efectiva contra cualquier ataque de ingeniería social es una sola: la pausa.',
      },


      // 6. Tema 2 — Phishing
      {
        type: 'text',
        title: 'Tema 2 — Phishing',
        content: `
          <p>El phishing es el vector de ataque más frecuente a nivel global y en Colombia. Consiste en correos electrónicos o mensajes digitales diseñados para parecer comunicaciones legítimas de entidades reales, con el objetivo de llevar a la víctima a un sitio falso donde entrega sus datos o descarga un archivo malicioso.</p>
          <p>El nombre viene del inglés "fishing" (pescar): el atacante lanza un anzuelo y espera a que alguien muerda. El anzuelo está diseñado con mucho cuidado para parecer exactamente lo que la víctima espera ver.</p>
          <h3 style="color:#3A3B74; font-family:'Oswald',sans-serif;">Cómo opera el phishing</h3>
          <p>El atacante envía un correo que imita la apariencia visual de una empresa o entidad conocida: logotipo, colores, firma. El mensaje crea urgencia o miedo y contiene un enlace o un archivo adjunto. El enlace lleva a un sitio web falso que replica visualmente el sitio original. Si el usuario ingresa sus datos en ese sitio, el atacante los captura en tiempo real.</p>
        `,
      },

      // 7. Infografía — correo de phishing anotado
      {
        type: 'infographic',
        maxWidth: 1600,
        title: 'Un correo de phishing, anotado señal por señal',
        src: './Infografías/M2-PhishingEjemplo.html',
        aspectRatio: '1000 / 1160',
      },

      // 8. Señales de alerta phishing
      {
        type: 'text',
        title: 'Señales de alerta del phishing',
        content: `
          <ul>
            <li>El remitente usa un dominio que no coincide exactamente con la empresa real.</li>
            <li>El correo crea urgencia extrema o amenaza con consecuencias inmediatas.</li>
            <li>El saludo es genérico en lugar de tu nombre.</li>
            <li>Contiene errores ortográficos o de redacción inusuales para una empresa profesional.</li>
            <li>El enlace, al pasar el cursor por encima sin hacer clic, muestra una dirección diferente al texto visible.</li>
            <li>Pide información que la empresa ya debería tener: contraseña, número de tarjeta, CVV.</li>
          </ul>
        `,
      },


      // 10. Tema 3 — Smishing
      {
        type: 'text',
        title: 'Tema 3 — Smishing',
        content: `
          <p>El smishing es phishing a través de mensajes de texto SMS o aplicaciones de mensajería. Es más efectivo que el correo electrónico en muchos casos porque los mensajes de texto generan mayor sensación de urgencia y son más difíciles de verificar en el momento.</p>
          <h3 style="color:#3A3B74; font-family:'Oswald',sans-serif;">Cómo opera el smishing</h3>
          <p>El atacante envía un SMS que parece venir de un banco, una empresa de domicilios, un operador de telefonía o una entidad oficial. El mensaje contiene un enlace acortado que lleva a un sitio falso o pide que llames a un número fraudulento.</p>
        `,
      },

      // 11. Infografía — 3 casos de smishing
      {
        type: 'infographic',
        maxWidth: 1600,
        title: 'Galería: 3 casos colombianos de smishing',
        src: './Infografías/M2-SmishingCasos.html',
        aspectRatio: '1200 / 1240',
      },

      // 12. Señales de alerta smishing
      {
        type: 'text',
        title: 'Señales de alerta del smishing',
        content: `
          <ul>
            <li>El enlace es acortado (bit.ly, tinyurl) o usa un dominio que no es el oficial de la entidad.</li>
            <li>El mensaje pide que actúes antes de una hora específica.</li>
            <li>Viene de un número desconocido aunque el nombre del remitente parezca conocido.</li>
            <li>Te pide pagar una suma pequeña para desbloquear algo mayor.</li>
            <li>Te pide llamar a un número que no figura en la página oficial de la empresa.</li>
          </ul>
        `,
      },


      // 14. Tema 4 — Vishing
      {
        type: 'text',
        title: 'Tema 4 — Vishing',
        content: `
          <p>El vishing es el fraude a través de llamadas de voz. Es uno de los métodos más efectivos porque la voz humana genera mayor confianza que un mensaje de texto y permite al atacante adaptar el guion en tiempo real según las respuestas de la víctima.</p>
          <h3 style="color:#3A3B74; font-family:'Oswald',sans-serif;">Cómo opera el vishing</h3>
          <p>El atacante llama haciéndose pasar por un empleado de banco, soporte técnico, operador de telefonía o entidad gubernamental. Usa información real sobre la víctima para generar credibilidad y luego pide datos sensibles, acceso remoto al dispositivo o una transferencia de dinero.</p>
        `,
      },

      // 15. Simulación de llamada de vishing
      {
        type: 'callsim',
        title: 'Simulación de llamada',
        subtitle: 'Escucha la llamada y decide qué harías en cada momento',
        transcript1: [
          { speaker: 'attacker', text: 'Buenos días, le habla Carlos Méndez del área de seguridad de Bancolombia. Detectamos un intento de fraude en su cuenta terminada en 4471. ¿Es usted el titular?' },
          { speaker: 'user', text: 'Sí, soy yo.' },
          { speaker: 'attacker', text: 'Para proteger su cuenta necesitamos verificar su identidad. ¿Me puede confirmar los últimos 4 dígitos de su cédula y la clave de su cuenta de Bancolombia App?' },
        ],
        decisionPoint1: {
          question: '¿Qué haces?',
          options: [
            { text: 'Le doy los datos para proteger mi cuenta.', correct: false, continuesToDecision2: true, feedback: 'Los bancos nunca piden claves por teléfono. Jamás.' },
            { text: 'Cuelgo y llamo yo directamente a Bancolombia al número oficial.', correct: true, continuesToDecision2: false, feedback: 'Correcto. Ningún banco te pedirá tu clave por teléfono. La única acción correcta es colgar y llamar tú directamente al número oficial que aparece en el dorso de tu tarjeta o en bancolombia.com.co.' },
            { text: 'Le pido su número de empleado para verificar.', correct: false, continuesToDecision2: true, feedback: 'El atacante puede inventar cualquier número de empleado. La verificación tiene que ser tuya, no de quien llama.' },
          ],
        },
        transcript2: [
          { speaker: 'attacker', text: 'Gracias. Le voy a enviar un código por SMS para confirmar la cancelación del intento de fraude. Cuando llegue, dígamelo por favor.' },
        ],
        decisionPoint2: {
          question: '¿Qué haces?',
          options: [
            { text: 'Le digo el código. Él me dijo que era para cancelar el fraude.', correct: false, feedback: 'Ese código es el segundo factor de autenticación (MFA) de tu cuenta. Dárselo es entregarle el control completo.' },
            { text: 'Cuelgo. Ese código es mi MFA y no lo comparto con nadie.', correct: true, feedback: 'Correcto. Ese código es el segundo factor de autenticación (MFA) de tu cuenta. Dárselo es entregarle el control completo.' },
          ],
        },
      },

      // 16. Deepfakes
      {
        type: 'text',
        title: 'Tendencia actual — Deepfakes: cuando la voz y el video también mienten',
        content: `
          <p>Desde 2024, una variante especialmente peligrosa del vishing usa inteligencia artificial para clonar voces y generar video falso en tiempo real. Estas son las tres formas en que se presenta:</p>
          <ol>
            <li><strong>Voz clonada por IA:</strong> con menos de 30 segundos de audio de una persona — obtenido de un video de redes sociales o un mensaje de voz — un atacante puede generar una llamada donde la voz suena exactamente igual a la de un familiar o conocido.</li>
            <li><strong>Video falso (deepfake):</strong> videos generados por IA que muestran a una persona real diciendo cosas que nunca dijo. Se usan para difundir desinformación, extorsión o fraude corporativo ("el gerente en un video pide hacer una transferencia urgente").</li>
            <li><strong>Videollamadas sintéticas:</strong> en 2024 comenzaron a documentarse casos donde el atacante realiza una videollamada usando una cara generada por IA en tiempo real, haciéndose pasar por un ejecutivo, un familiar o un funcionario.</li>
          </ol>

        `,
      },

      // 16b. Infografía — Deepfakes (formas, cómo reconocerlos y protocolo)
      {
        type: 'infographic',
        maxWidth: 1600,
        title: 'Deepfakes: cuando la voz y el video también mienten',
        src: './Infografías/M2-Deepfakes.html',
        aspectRatio: '1600 / 1080',
        fullBleed: true,
      },


      // 18. Tema 5 — QR maliciosos
      {
        type: 'text',
        title: 'Tema 5 — QR maliciosos',
        content: `
          <p>Los códigos QR son convenientes precisamente porque no muestran a dónde llevan antes de que los escanees. Los atacantes explotan eso para redirigir a sitios fraudulentos sin que puedas evaluar el destino con anticipación. Este ataque se conoce como "quishing" (QR + phishing).</p>
        `,
      },

      // 18b. Dato útil
      {
        type: 'box',
        variant: 'info',
        title: 'Dato útil antes de continuar:',
        text: 'La mayoría de los celulares modernos muestran una vista previa de la URL antes de abrirla cuando escaneas un QR. Antes de tocar "Abrir" o "Visitar", lee esa URL completa. Si el dominio no corresponde a la entidad del QR, no continúes.',
      },

      // 18c. Cómo operan
      {
        type: 'text',
        title: 'Cómo operan los QR maliciosos',
        content: `
          <p>El atacante pega un código QR falso sobre el original en lugares públicos: restaurantes, parqueaderos, oficinas de servicio, paraderos de transporte. También los distribuye por correo, WhatsApp o redes sociales. Al escanear, el dispositivo redirige a un sitio que pide datos personales, claves o información de pago.</p>
          <p><strong>Señales de alerta:</strong></p>
          <ul>
            <li>El QR está pegado sobre otro código o tiene una apariencia diferente al material visual del lugar.</li>
            <li>La URL de vista previa en tu celular no corresponde al dominio oficial del negocio o la entidad.</li>
            <li>El sitio al que lleva pide datos personales, claves o información de pago de forma inesperada.</li>
            <li>El QR llega por WhatsApp o correo de un contacto sin explicación del contexto.</li>
            <li>Después de escanear, el dispositivo intenta descargar un archivo automáticamente.</li>
          </ul>
        `,
      },

      // 19. Infografía — 4 lugares con QR falsos
      {
        type: 'infographic',
        maxWidth: 1600,
        title: '4 lugares donde los atacantes colocan QR falsos',
        src: './Infografías/M2-QRMaliciosos.html',
        aspectRatio: '1200 / 1300',
      },


      // 22. Tema 6 — Estafas en WhatsApp
      {
        type: 'text',
        title: 'Tema 6 — Estafas en WhatsApp',
        content: `
          <p>WhatsApp es la aplicación de mensajería más usada en Colombia y Latinoamérica. Esa ubicuidad la convierte en el canal preferido de los atacantes: el mismo espacio donde hablas con tu familia y tus amigos.</p>
        `,
      },

      // 22b. Tabla de modalidades WhatsApp
      {
        type: 'datatable',
        title: 'Modalidades de estafa en WhatsApp',
        columns: ['Modalidad', 'Cómo opera', 'Señal principal'],
        rows: [
          { icon: '👨‍👩‍👧', cells: ['El familiar en apuros', 'Número desconocido que dice ser un familiar que cambió de número y necesita dinero urgente.', 'Número nuevo, urgencia, pide no llamar al anterior.'] },
          { icon: '🔓', highlight: 'red', cells: ['El robo de cuenta', 'Pide el código de verificación de 6 dígitos por SMS para un "proceso oficial".', 'Ningún servicio legítimo pide ese código. Es el MFA.'] },
          { icon: '📈', highlight: 'orange', cells: ['El grupo de inversión', 'Agregan a la víctima a un grupo donde "expertos" muestran ganancias extraordinarias.', 'Rendimientos imposibles, presión para invertir rápido.'] },
          { icon: '🎭', cells: ['Fraude en identidad', 'Suplantan a una persona real usando su foto y nombre para contactar a sus conocidos.', 'Número diferente al guardado, tono distinto.'] },
          { icon: '🎁', highlight: 'orange', cells: ['El premio o sorteo', 'Anuncia que ganaste un premio y pide datos o un pago pequeño para recibirlo.', 'Nadie gana premios sin haber participado.'] },
          { icon: '🔗', cells: ['El enlace de un contacto', 'Un contacto comprometido envía un link con un mensaje vago ("mira esto").', 'Mensaje sin contexto, dominio extraño, tono diferente.'] },
        ],
      },

      // 23. Galería "¿Estafa o legítimo?" (ungraded, reutiliza ScenarioQuiz)
      {
        type: 'scenario',
        title: '¿Estafa o legítimo?',
        subtitle: 'Analiza cada mensaje de WhatsApp y decide si es una estafa o un mensaje legítimo.',
        situations: [
          {
            id: 'wa_1',
            mockup: 'whatsapp',
            content: { avatar: '?', sender: '+57 312 847-XXXX', senderNote: 'No guardado', message: 'Hola mamá, soy yo Sofía. Me robaron el celular y este es el número de una amiga. Necesito que me hagas una transferencia de $200.000 a Nequi. Te explico después. Es urgente.', time: 'Hoy 20:14 �S�S' },
            question: '¿Estafa o legítimo?',
            options: [
              { text: 'Estafa', correct: true, feedback: 'Correcto: número desconocido, urgencia, pide dinero. Protocolo: llama al número original de Sofía.' },
              { text: 'Legítimo', correct: false, feedback: 'Número desconocido, urgencia y solicitud de dinero son las tres señales clásicas de esta estafa. Verifica siempre llamando al número original.' },
            ],
          },
          {
            id: 'wa_2',
            mockup: 'whatsapp',
            content: { avatar: 'B', sender: 'Bancolombia', senderNote: 'Contacto verificado', message: 'Tu transferencia de $45.000 a Juan Carlos Mesa fue exitosa. Si no reconoces esta operación, comunícate al *700.', time: 'Hoy 11:32' },
            question: '¿Estafa o legítimo?',
            options: [
              { text: 'Estafa', correct: false, feedback: 'Es una notificación legítima con precaución: no tiene enlace ni pide datos. Si no reconoces la operación, llama al *700.' },
              { text: 'Legítimo (con precaución)', correct: true, feedback: 'Correcto. Notificación sin enlace ni solicitud de datos. Si no reconoces la operación, llama al *700.' },
            ],
          },
          {
            id: 'wa_3',
            mockup: 'whatsapp',
            content: { avatar: '$', sender: 'INVERSIÓN COLOMBIA VIP', senderNote: 'Grupo', message: 'María acabó de retirar $1.800.000 de su inversión de esta semana. Cupos limitados. Deposita mínimo $150.000 hoy. Nequi: 313 000 0000', time: 'Hoy 09:05' },
            question: '¿Estafa o legítimo?',
            options: [
              { text: 'Estafa', correct: true, feedback: 'Correcto: rendimientos imposibles, cuenta de Nequi personal, presión de tiempo. Es una estafa de inversión.' },
              { text: 'Legítimo', correct: false, feedback: 'Rendimientos imposibles, cuenta personal de Nequi y presión de tiempo son señales claras de una estafa de inversión.' },
            ],
          },
          {
            id: 'wa_4',
            mockup: 'whatsapp',
            content: { avatar: 'P', sender: 'Pedro Ramírez', senderNote: 'Contacto guardado', message: '¡Hola! Te comparto este link que encontré. Mira: ver-oferta-especial.net/tuinfo', time: 'Hoy 15:43 �S�S' },
            question: '¿Estafa o legítimo?',
            options: [
              { text: 'Estafa (cuenta comprometida)', correct: true, feedback: 'Correcto: mensaje vago, dominio extraño. No hagas clic y avísale a Pedro por otro canal — probablemente su cuenta está comprometida.' },
              { text: 'Legítimo', correct: false, feedback: 'Un mensaje vago con un dominio extraño de un contacto guardado suele indicar que su cuenta fue comprometida.' },
            ],
          },
          {
            id: 'wa_5',
            mockup: 'whatsapp',
            content: { avatar: 'R', sender: 'Tu empresa — RRHH', senderNote: 'Contacto verificado', message: 'Recordatorio: la liquidación de nómina del mes de junio se realizará el viernes 28. Novedades antes del jueves.', time: 'Hoy 08:00' },
            question: '¿Estafa o legítimo?',
            options: [
              { text: 'Estafa', correct: false, feedback: 'Es información general, sin solicitud de datos, sin enlace y sin urgencia anormal: es legítimo.' },
              { text: 'Legítimo', correct: true, feedback: 'Correcto. Información general sin solicitud de datos, sin enlace, sin urgencia anormal.' },
            ],
          },
        ],
        results: {
          band1: { min: 0, icon: 'compass', title: 'Sigue practicando.', text: 'Repasa las señales de alerta de este tema: dominio, urgencia y solicitud de datos son las claves.' },
          band2: { min: 3, icon: 'search', title: 'Buen ojo.', text: 'Reconociste la mayoría de los mensajes. Sigue prestando atención al remitente y al contexto.' },
          band3: { min: 5, icon: 'star', title: 'Excelente.', text: 'Identificaste las 5 situaciones correctamente. Ya tienes el criterio para detectar estafas por WhatsApp.' },
          commonNote: 'Las estafas por WhatsApp explotan la confianza del canal. Ante cualquier duda, verifica por otra vía.',
        },
      },


      // 25. Tema 7 — Fraude en redes sociales
      {
        type: 'text',
        title: 'Tema 7 — Fraude en redes sociales',
        content: `
          <p>Las redes sociales son el lugar donde las personas comparten voluntariamente información sobre su vida, gustos, relaciones y hábitos. Para un atacante, esa información es una herramienta para construir engaños personalizados y muy convincentes.</p>
        `,
      },

      // 25b. Tabla de modalidades en redes sociales
      {
        type: 'datatable',
        title: 'Modalidades de fraude en redes sociales',
        columns: ['Modalidad', 'Cómo opera y cómo reconocerla'],
        rows: [
          { icon: '👀', cells: ['Perfiles falsos de conocidos', 'Crean un perfil idéntico a alguien que conoces y envían solicitud. Verifica con la persona real antes de aceptar.'] },
          { icon: '🎉', highlight: 'orange', cells: ['Concursos y sorteos falsos', 'Anuncian premios de marcas conocidas y piden compartir o hacer clic. Los sorteos reales no piden datos ni pagos.'] },
          { icon: '🎣', highlight: 'red', cells: ['Phishing por mensajes directos', 'Un contacto comprometido envía un DM con enlace vago que pide usuario y contraseña.'] },
          { icon: '💼', cells: ['Ofertas de empleo falsas', 'Perfiles falsos ofrecen empleos sin requisitos y piden datos o un depósito de garantía.'] },
          { icon: '📢', highlight: 'orange', cells: ['Anuncios patrocinados fraudulentos', 'Anuncios de pago que imitan marcas reales; las plataformas no verifican a cada anunciante.'] },
          { icon: '📋', cells: ['Cuestionarios recolectores de datos', 'Publicaciones tipo "¿cuál es tu nombre de hacker?" piden datos usados en preguntas de seguridad.'] },
        ],
      },

      // 25c. Sobre los anuncios patrocinados
      {
        type: 'box',
        variant: 'warning',
        title: 'Sobre los anuncios patrocinados:',
        text: 'Que un anuncio aparezca como "Patrocinado" en Instagram, Facebook o TikTok no significa que la plataforma lo haya verificado. Antes de comprar desde un anuncio: busca la marca directamente en tu navegador y compra desde el sitio oficial.',
      },

      // 26. Infografía — lo que publicas puede usarse en tu contra
      {
        type: 'infographic',
        maxWidth: 1600,
        title: 'Lo que publicas en redes puede usarse en tu contra',
        src: './Infografías/M2-RedesSociales.html',
        aspectRatio: '1400 / 1130',
      },

      // 27. Señales de alerta redes sociales
      {
        type: 'text',
        title: 'Señales de alerta en redes sociales',
        content: `
          <ul>
            <li>Recibes solicitud de amistad de alguien que ya tienes agregado.</li>
            <li>Una publicación de premio pide datos personales, compartir o etiquetar para participar.</li>
            <li>Un mensaje directo tiene un tono inusual o pide que hagas clic en un enlace sin contexto.</li>
            <li>Una oferta de empleo llega sin que hayas aplicado y las condiciones son demasiado buenas.</li>
            <li>Un anuncio patrocinado ofrece precios o descuentos que ningún negocio real podría sostener.</li>
            <li>Un cuestionario "divertido" pide exactamente el tipo de información que se usa en preguntas de seguridad.</li>
          </ul>
        `,
      },


      // 29. Tema 8 — El patrón que une todo
      {
        type: 'box',
        variant: 'accent',
        title: 'Tema 8 — Recapitulando lo que viste en este módulo:',
        text: 'Phishing. Smishing. Vishing. Deepfakes. QR maliciosos. Estafas en WhatsApp. Fraude en redes sociales. Todos son diferentes en su canal y apariencia, pero comparten exactamente el mismo mecanismo: crean una situación que te hace actuar rápido, sin pensar.',
      },

      // 30. Infografía — ciclo del ataque
      {
        type: 'infographic',
        maxWidth: 1600,
        title: 'El ciclo del ataque',
        src: './Infografías/M2-CicloAtaque.html',
        aspectRatio: '1400 / 1250',
        fullBleed: true,
      },

      // 31. Cierre reflexivo del tema 8
      {
        type: 'text',
        content: `
          <p>La pausa no tiene costo cuando el mensaje es real. Un banco real espera que llames a verificar. Un familiar real puede esperar diez minutos mientras confirmas. Una empresa real no pierde nada si tardas en responder. Solo los atacantes necesitan que actúes ahora mismo.</p>
        `,
      },


      // 34. Quiz final (gating: 80% = 4/5, igual al passingScore del curso)
      {
        type: 'quiz',
        title: 'Actividad de validación — Clasifica la situación',
        subtitle: 'Es una estafa, parece legítimo o necesitas más información. Necesitas 4 de 5 correctas para avanzar.',
        questions: [
          {
            id: 'm2_sit_1',
            question: 'SMS de "DIAN COLOMBIA": "Su declaración de renta tiene inconsistencias. Debe regularizar su situación antes del 15 de este mes o enfrentará multas. Ingrese a: dian-regularizacion.net"',
            options: ['Es una estafa', 'Parece legítimo', 'Necesito más información'],
            correct: 0,
            explanation: 'Smishing: dominio falso, urgencia artificial. La DIAN no envía SMS con enlaces.',
          },
          {
            id: 'm2_sit_2',
            question: 'Recibes una llamada de Claro diciendo que tienes un saldo a favor de $80.000. Para recibirlo necesitas confirmar tu cédula y los últimos 4 dígitos de tu SIM.',
            options: ['Es una estafa', 'Parece legítimo', 'Necesito más información'],
            correct: 0,
            explanation: 'Vishing: los operadores no regalan dinero por llamada. La solicitud de cédula y datos de SIM es para suplantar tu línea.',
          },
          {
            id: 'm2_sit_3',
            question: 'Tu jefa te escribe por el chat de la empresa: "Estoy en una reunión. Necesito que hagas una transferencia urgente a este proveedor nuevo. Nequi: 311 000 0000."',
            options: ['Es una estafa', 'Parece legítimo', 'Necesito más información'],
            correct: 2,
            explanation: 'Puede ser legítimo o suplantación. Llama a tu jefa directamente antes de transferir.',
          },
          {
            id: 'm2_sit_4',
            question: 'Recibes una notificación push de la app oficial de Bancolombia: "Tu transferencia de $120.000 a María López fue aprobada." No reconoces esa transferencia.',
            options: ['Es una estafa', 'Parece legítimo', 'Necesito más información'],
            correct: 2,
            explanation: 'Si viene de la app oficial, es probablemente legítima pero no reconocida. Abre la app y verifica. Si es real y no la hiciste, llama al *700 de inmediato.',
          },
          {
            id: 'm2_sit_5',
            question: 'En Instagram te llega un mensaje de "@Exito_Premios_2024": "Felicitaciones, fuiste seleccionado en nuestro sorteo. Para reclamar tu premio de $1.000.000 en mercado, haz clic aquí e ingresa tus datos."',
            options: ['Es una estafa', 'Parece legítimo', 'Necesito más información'],
            correct: 0,
            explanation: 'Phishing en redes sociales: cuenta con nombre sospechoso, no participaste en ningún sorteo, pide clic e ingreso de datos.',
          },
        ],
      },


      // 36. Cierre del módulo
      {
        type: 'closing',
        moduleLabel: 'Módulo 2 completado',
        title: '¿Cómo intentan engañarme?',
        summary: 'Todos los ataques dirigidos a personas comunes tienen el mismo fundamento: la ingeniería social. No importa el canal — correo, SMS, teléfono, QR, WhatsApp, redes o videollamada — todos buscan activar urgencia, autoridad, confianza o recompensa.',
        takeaways: [
          'La ingeniería social no explota tecnología. Explota la forma en que los seres humanos tomamos decisiones bajo presión.',
          'Los deepfakes y la voz clonada ya son una amenaza real. Verifica por otro canal antes de actuar ante una solicitud urgente.',
          'Los anuncios patrocinados en redes sociales no son verificados por las plataformas. Busca siempre la marca directamente.',
          'La vista previa de la URL al escanear un QR es tu primera línea de defensa. Léela antes de tocar.',
        ],
        nextHint: 'En el Módulo 3 vas a aprender a proteger tus cuentas y dispositivos para que un ataque exitoso cause el menor daño posible.',
      },
    ],
  },

  // ─────────────────────────────────────
  // MÓDULO 3 — ¿Cómo protejo mis cuentas y dispositivos?
  // ─────────────────────────────────────
  {
    id: 3,
    title: '¿Cómo protejo mis cuentas y dispositivos?',
    description: 'Hábitos concretos que puedes aplicar hoy.',
    icon: '🛡️',
    estimatedTime: '20 min',
    blocks: [
      // 1. Portada
      {
        type: 'hero',
        title: '¿Cómo protejo mis cuentas y dispositivos?',
        subtitle: 'Hábitos concretos que puedes aplicar hoy',
        accent: 'primary',
      },

      // 2. Intro del módulo
      {
        type: 'text',
        content: `
          <p>En los módulos anteriores aprendiste que tu identidad digital existe y tiene valor, y que los atacantes usan técnicas sofisticadas para obtenerla. En este módulo vas a aprender qué hacer para que, incluso si un ataque ocurre, el daño sea el menor posible.</p>
          <p style="font-weight:600; color:#3A3B74;">Cada tema de este módulo es un hábito. No un concepto técnico: un hábito. Algo que puedes empezar a hacer hoy.</p>
        `,
      },

      // 3. Tema 1 — gancho
      {
        type: 'box',
        variant: 'accent',
        title: 'Una pregunta directa: ¿usas la misma contraseña en más de un servicio?',
        text: 'Si la respuesta es sí, tienes un riesgo real. No porque tu contraseña sea débil, sino porque si alguien la obtiene de un servicio, puede probarla en todos los demás. El problema no es la complejidad de la contraseña: es la reutilización.',
      },

      // 3b. Tema 1 — texto
      {
        type: 'text',
        title: 'Tema 1 — Por qué es tan peligroso reutilizar contraseñas',
        content: `
          <p>Cuando una empresa sufre una filtración de datos, las credenciales de sus usuarios quedan expuestas. Los atacantes toman esa lista de correos y contraseñas y la prueban automáticamente en cientos de servicios diferentes. Este ataque se llama <em>credential stuffing</em>.</p>
          <p>Si usas la misma contraseña en Rappi y en Bancolombia, y Rappi sufre una filtración, tu cuenta de Bancolombia queda en riesgo aunque Bancolombia nunca haya sido atacado.</p>
        `,
      },

      // 4. Infografía — cadena de reutilización
      {
        type: 'infographic',
        maxWidth: 1600,
        title: 'Por qué una contraseña reutilizada es una llave maestra',
        src: './Infografías/M3-CadenaReutilizacion.html',
        aspectRatio: '1600 / 1020',
      },

      // 5. Hábito 1
      {
        type: 'box',
        variant: 'success',
        title: 'Hábito 1 — Contraseña única por servicio:',
        text: 'Nunca uses la misma contraseña en dos servicios diferentes. Si ya lo haces, el Tema 2 te muestra cómo resolverlo de forma práctica.',
      },


      // 7. Tema 2 — Gestores de contraseñas
      {
        type: 'text',
        title: 'Tema 2 — Gestores de contraseñas: la solución práctica',
        content: `
          <p>Si cada servicio necesita una contraseña diferente, surge la pregunta obvia: ¿cómo voy a recordar todo eso? La respuesta honesta es: no puedes. Y no debes intentarlo.</p>
          <p>Cuando las personas intentan gestionar decenas de contraseñas por su cuenta, inevitablemente terminan tomando atajos: reutilizan la misma, usan variaciones predecibles, las anotan sin protección, o eligen contraseñas cortas. Todos esos atajos reducen la seguridad.</p>
          <p style="font-weight:600; color:#3A3B74;">La solución no es tener mejor memoria. Es dejar de intentar memorizar y usar una herramienta diseñada exactamente para ese problema: un gestor de contraseñas.</p>
        `,
      },

      // 8. Infografía — gestor 3 pasos
      {
        type: 'infographic',
        maxWidth: 1600,
        title: 'Gestor de contraseñas — cómo funciona en 3 pasos',
        src: './Infografías/M3-GestorPasos.html',
        aspectRatio: '1600 / 1780',
        fullBleed: true,
      },

      // 9. Tabla de gestores
      {
        type: 'datatable',
        title: 'Opciones disponibles',
        columns: ['Gestor', 'Características'],
        rows: [
          { icon: '🔑', highlight: 'blue', cells: ['Bitwarden', 'Gratuito, código abierto, Android/iOS/Windows/Mac. Bóveda en la nube o local.'] },
          { icon: '🔑', cells: ['1Password', 'De pago (individual y familiar). Muy usado en entornos corporativos.'] },
          { icon: '🔑', cells: ['KeePass / KeePassXC', 'Gratuito, código abierto, almacenamiento local (no en la nube).'] },
          { icon: '🔑', cells: ['Google Password Manager', 'Integrado en Chrome y Android. Gratuito.'] },
          { icon: '🔑', cells: ['iCloud Keychain', 'Integrado en dispositivos Apple. Gratuito y automático.'] },
        ],
      },

      // 9b. Guardar contraseñas + passkeys
      {
        type: 'box',
        variant: 'info',
        title: '¿Es seguro guardar todas las contraseñas en un solo lugar?',
        text: 'Sí. Los gestores cifran todas las contraseñas con algoritmos de alto nivel y solo tu contraseña maestra puede descifrarlas. El mejor gestor es el que realmente vas a usar: si ya tienes Google o Apple como plataforma principal, empieza por el que está integrado.',
      },

      {
        type: 'box',
        variant: 'purple',
        title: 'Mirando al futuro — Passkeys: el reemplazo de las contraseñas',
        text: 'Cada vez más servicios reemplazan las contraseñas tradicionales por passkeys: credenciales digitales que usan tu biometría (huella o cara). No hay contraseña que recordar, no hay contraseña que robar. Si un servicio que usas la ofrece, considera activarla.',
      },

      // 10. Hábito 2
      {
        type: 'box',
        variant: 'success',
        title: 'Hábito 2 — Usa un gestor de contraseñas:',
        text: 'Instala un gestor, crea una contraseña maestra larga y única, y empieza a migrar tus cuentas más importantes: correo, banco y redes sociales primero. Si un servicio ofrece passkeys, actívalas.',
      },


      // 12. Tema 3 — gancho
      {
        type: 'box',
        variant: 'accent',
        title: 'Una sola contraseña ya no es suficiente.',
        text: 'Incluso una contraseña fuerte y única puede ser robada: por un phishing exitoso, por una filtración, por un malware en tu dispositivo. El MFA agrega una segunda capa: aunque el atacante tenga tu contraseña, necesita algo más para entrar.',
      },

      // 12b. Tema 3 — texto
      {
        type: 'text',
        title: 'Tema 3 — Autenticación multifactor (MFA): la segunda cerradura',
        content: `
          <p>En el Módulo 1 mencionamos brevemente el MFA. Aquí lo vas a entender en profundidad y vas a aprender a configurarlo en tus cuentas más importantes.</p>
          <p>La autenticación multifactor es un mecanismo de seguridad que requiere dos o más formas de verificar tu identidad: algo que sabes (tu contraseña) con algo que tienes (tu celular) o algo que eres (tu huella dactilar).</p>
        `,
      },

      // 13. Infografía — 3 factores
      {
        type: 'infographic',
        maxWidth: 1600,
        title: 'Los 3 factores de autenticación',
        src: './Infografías/M3-3Factores.html',
        aspectRatio: '1600 / 1000',
        fullBleed: true,
      },

      // 14. Tabla MFA SMS vs app
      {
        type: 'datatable',
        title: 'MFA por SMS vs. app de autenticación: ¿cuál es mejor?',
        columns: ['', 'MFA por SMS', 'App de autenticación'],
        rows: [
          { cells: ['Cómo funciona', 'Código de 6 dígitos por SMS cada vez que inicias sesión.', 'La app genera un código nuevo cada 30 segundos, sin SMS.'] },
          { highlight: 'green', cells: ['Ventaja', 'Fácil de configurar, no requiere app adicional.', 'No depende de la red celular. No puede interceptarse en tránsito.'] },
          { highlight: 'red', cells: ['Riesgo', 'Puede interceptarse con SIM swapping o vishing.', 'Si pierdes el celular sin respaldo, es más difícil recuperar el acceso.'] },
          { highlight: 'blue', cells: ['Recomendación', 'Mejor que no tener nada. Actívalo donde esté disponible.', 'La opción más segura. Recomendada para correo, banco y redes sociales.'] },
        ],
      },

      // 15. Tarjetas de activación MFA por plataforma
      {
        type: 'infographic',
        maxWidth: 1600,
        title: 'Activa la verificación en dos pasos, plataforma por plataforma',
        src: './Infografías/M3-MFAPlataformas.html',
        aspectRatio: '1600 / 1780',
        fullBleed: true,
      },

      // 16. Hábito 3
      {
        type: 'box',
        variant: 'success',
        title: 'Hábito 3 — Activa el MFA en todas las cuentas donde esté disponible:',
        text: 'Empieza por las más críticas: correo, cuentas bancarias y WhatsApp. Si puedes elegir, prefiere la app sobre SMS. Ningún servicio legítimo te va a pedir compartir ese código.',
      },


      // 18. Tema 4 — Actualizaciones
      {
        type: 'text',
        title: 'Tema 4 — Actualizaciones: cerrar la puerta antes del ataque',
        content: `
          <p>Cada vez que ves una notificación de actualización y la pospones, puede haber una vulnerabilidad conocida en tu dispositivo que los atacantes ya saben cómo explotar.</p>
          <p>Las actualizaciones no son solo nuevas funciones: la mayoría de las veces incluyen parches de seguridad que corrigen fallas que un atacante podría explotar sin que te des cuenta.</p>
        `,
      },

      // 18b. Dato clave
      {
        type: 'box',
        variant: 'info',
        title: 'Dato clave:',
        text: 'Según la CISA, el 60% de los ataques exitosos explotan vulnerabilidades para las que ya existía un parche de seguridad disponible. Actualizar es gratis. Recuperarse de un ataque no lo es.',
      },

      // 18c. Tabla de actualizaciones
      {
        type: 'datatable',
        title: 'Qué actualizar y con qué frecuencia',
        columns: ['Qué actualizar', 'Por qué importa', 'Frecuencia'],
        rows: [
          { icon: '📱', cells: ['SO del celular', 'Contiene los parches más críticos para Android e iOS.', 'No posponer más de 24-48 horas.'] },
          { icon: '💻', cells: ['SO del computador', 'Windows, macOS y Linux corrigen vulnerabilidades activamente explotadas.', 'Automáticas + reiniciar cuando se solicite.'] },
          { icon: '📲', cells: ['Apps del celular', 'Las apps bancarias son especialmente críticas.', 'Activar actualización automática.'] },
          { icon: '🌐', cells: ['Navegador web', 'Parches frecuentes contra nuevas amenazas.', 'Automática + reiniciar cuando lo solicite.'] },
          { icon: '📶', cells: ['Router del hogar', 'Puerta de entrada de toda la red del hogar.', 'Revisar firmware cada 3-6 meses.'] },
        ],
      },

      // 19. Hábito 4
      {
        type: 'box',
        variant: 'success',
        title: 'Hábito 4 — Activa las actualizaciones automáticas:',
        text: 'Celular: Configuración → Sistema → Actualización de software → Automático. Computador: Windows Update / Software Update. Apps: Play Store / App Store → Actualizar automáticamente.',
      },


      // 21. Tema 5 — WiFi seguro
      {
        type: 'text',
        title: 'Tema 5 — WiFi seguro: no todas las redes son iguales',
        content: `
          <p>En el Módulo 0 viste un escenario en una cafetería con WiFi abierto. Ahora vas a entender por qué esa regla existe.</p>
          <p>Una red WiFi abierta sin contraseña no cifra el tráfico entre tu dispositivo y el router. Alguien conectado a la misma red puede interceptar credenciales y datos de sesión. Este ataque se llama <em>man in the middle</em> (MITM).</p>
        `,
      },

      // 21b. VPN
      {
        type: 'box',
        variant: 'info',
        title: '¿Qué es una VPN y cuándo la necesito?',
        text: 'Una VPN crea un túnel cifrado entre tu dispositivo e internet: como un sobre sellado, aunque el cartero lleve la carta no puede leer lo que hay adentro. La necesitas en redes WiFi públicas o abiertas para acceder a cuentas sensibles. No es indispensable en tu red de casa bien configurada.',
      },

      // 22. Infografía — WiFi seguro vs riesgo
      {
        type: 'infographic',
        maxWidth: 1600,
        title: 'WiFi seguro vs. WiFi de riesgo — cómo identificarlos',
        src: './Infografías/M3-WifiSeguro.html',
        aspectRatio: '1400 / 1150',
      },

      // 23. Red de casa + VPN
      {
        type: 'text',
        title: 'La red de tu casa: configuración básica',
        content: `
          <ul>
            <li>Cambia la contraseña que viene por defecto en tu router. Las de fábrica son conocidas y fáciles de encontrar.</li>
            <li>Usa cifrado WPA3 o WPA2 (nunca WEP, que es inseguro).</li>
            <li>Cambia el nombre de tu red (SSID) para que no identifique tu proveedor ni tu dirección.</li>
          </ul>

          <p style="margin-top:14px;">Evita VPNs gratuitas sin reputación: algunas recopilan y venden los datos de navegación de sus usuarios.</p>
          <p style="font-weight:600; color:#3A3B74;">VPNs con buena reputación: Mullvad, ProtonVPN (versión gratuita), ExpressVPN, NordVPN. ProtonVPN es la opción gratuita más recomendada para uso básico.</p>
        `,
      },

      // 24. Hábito 5
      {
        type: 'box',
        variant: 'success',
        title: 'Hábito 5 — Protege tu conexión:',
        text: 'Nunca uses redes WiFi abiertas para operaciones bancarias. Activa una VPN confiable si necesitas usar WiFi público. Cambia la contraseña por defecto de tu router. Desactiva la conexión automática a redes.',
      },


      // 26. Tema 6 — Descargas responsables
      {
        type: 'text',
        title: 'Tema 6 — Descargas responsables: lo que instalas importa',
        content: `
          <p>Cada aplicación que instalas tiene acceso a partes de tu dispositivo: tus fotos, tu micrófono, tu cámara, tu ubicación, tus contactos. Si la aplicación es maliciosa, esa información puede llegar a manos equivocadas.</p>
          <h3 style="color:#3A3B74; font-family:'Oswald',sans-serif;">Dónde descargar de forma segura</h3>
          <ul>
            <li><strong>Android:</strong> solo desde Google Play Store. Desactiva "fuentes desconocidas" si está activado.</li>
            <li><strong>iPhone/iPad:</strong> solo desde App Store.</li>
            <li><strong>Computadores:</strong> desde el sitio oficial del desarrollador o tiendas oficiales. Evita sitios de terceros con "descarga gratuita".</li>
          </ul>
        `,
      },

      // 27. Infografía — permisos
      {
        type: 'infographic',
        maxWidth: 1600,
        title: 'Permisos que deberían hacer sonar una alarma',
        src: './Infografías/M3-Permisos.html',
        aspectRatio: '1400 / 1390',
      },

      // 28. Señales de advertencia
      {
        type: 'text',
        title: 'Señales de advertencia en una descarga',
        content: `
          <ul>
            <li>La app tiene muy pocas reseñas o reseñas todas iguales (probablemente falsas).</li>
            <li>El desarrollador es desconocido o el nombre es casi idéntico al de una app famosa.</li>
            <li>La app pide muchos más permisos de los que necesitaría para funcionar.</li>
            <li>El sitio de descarga no es el oficial del desarrollador o la tienda de apps.</li>
            <li>El archivo tiene extensión .apk en un correo o mensaje (no vino de la Play Store).</li>
          </ul>
        `,
      },

      // 28b. Hábito 6
      {
        type: 'box',
        variant: 'success',
        title: 'Hábito 6 — Descarga responsable:',
        text: 'Solo instala apps desde tiendas oficiales. Revisa los permisos antes de aceptar. Elimina las apps que ya no usas: siguen teniendo permisos aunque no las abras.',
      },


      // 30. Tema 7 — Copias de seguridad
      {
        type: 'text',
        title: 'Tema 7 — Copias de seguridad: protección contra lo irreversible',
        content: `
          <p>Una copia de seguridad es la única protección real contra dos amenazas que ninguna otra medida resuelve por completo: el ransomware (malware que cifra tus archivos y pide pago) y la pérdida accidental de datos por daño, robo o falla de hardware.</p>
          <p style="font-weight:600; color:#3A3B74;">Sin una copia de seguridad, la pérdida de los archivos de un dispositivo puede ser definitiva.</p>
        `,
      },

      // 31. Infografía — regla 3-2-1
      {
        type: 'infographic',
        maxWidth: 1600,
        title: 'La regla 3-2-1: cómo hacer copias de seguridad que realmente protegen',
        src: './Infografías/M3-Regla321.html',
        aspectRatio: '1600 / 1780',
        fullBleed: true,
      },

      // 32. Qué incluir + hábito 7
      {
        type: 'text',
        title: 'Qué incluir en la copia de seguridad',
        content: `
          <ul>
            <li>Fotos y videos del celular — sincronización con Google Fotos o iCloud Fotos.</li>
            <li>Documentos importantes: cédula, contratos, extractos, declaraciones de renta.</li>
            <li>Contactos del celular — sincronizados con tu cuenta de Google o Apple.</li>
            <li>Archivos de trabajo — sincronizados con Google Drive, OneDrive o Dropbox.</li>
          </ul>

        `,
      },

      // 32b. Hábito 7
      {
        type: 'box',
        variant: 'success',
        title: 'Hábito 7 — Aplica la regla 3-2-1:',
        text: 'Activa la sincronización automática de fotos. Guarda una copia de tus documentos importantes en la nube. Si tienes trabajo crítico en un computador, considera un disco externo adicional.',
      },


      // 34. Tema 8 — DNS seguro
      {
        type: 'text',
        title: 'Tema 8 — DNS seguro: filtrar el tráfico antes de que llegue a ti',
        content: `
          <p>Cuando escribes una dirección en tu navegador, tu dispositivo primero consulta un servidor DNS para traducir ese nombre a una dirección de red. Es como un directorio telefónico de internet.</p>
          <p>Un servidor DNS seguro puede actuar como un filtro: si intentas conectarte a un sitio malicioso conocido, el servidor bloquea la solicitud antes de que llegues.</p>
        `,
      },

      // 35. Infografía — DNS seguro
      {
        type: 'infographic',
        maxWidth: 1600,
        title: 'Cómo funciona un DNS seguro',
        src: './Infografías/M3-DNSSeguro.html',
        aspectRatio: '1600 / 1560',
        fullBleed: true,
      },

      // 36. Hábito 8
      {
        type: 'box',
        variant: 'success',
        title: 'Hábito 8 — Configura un DNS seguro:',
        text: 'En tu celular: activa DNS privado con OpenDNS o Cloudflare (una sola vez). En tu router de casa: cambia los servidores DNS para proteger todos los dispositivos conectados.',
      },


      // 38. Tema 9 — Antivirus
      {
        type: 'text',
        title: 'Tema 9 — Antivirus: la vigilancia que trabaja en segundo plano',
        content: `
          <p>Un antivirus monitorea tu dispositivo en tiempo real buscando comportamientos o archivos que correspondan a software malicioso. No es una solución mágica, pero es una red de seguridad adicional.</p>
        `,
      },

      // 38b. Tabla de protección por dispositivo
      {
        type: 'datatable',
        title: 'Protección incluida por sistema operativo',
        columns: ['Dispositivo', 'Protección incluida', '¿Algo adicional?'],
        rows: [
          { icon: '🖥️', cells: ['Windows', 'Microsoft Defender, con protección en tiempo real.', 'Suficiente para uso general si está actualizado.'] },
          { icon: '💻', cells: ['macOS', 'XProtect y Gatekeeper de Apple.', 'Se puede complementar con Malwarebytes (gratuito).'] },
          { icon: '🤖', cells: ['Android', 'Google Play Protect.', 'Suficiente si solo instalas desde Play Store.'] },
          { icon: '📱', cells: ['iPhone/iPad', 'Modelo de seguridad restrictivo, apps aisladas.', 'No aplica antivirus tradicional en iOS.'] },
        ],
      },

      // 38c. Antivirus falsos
      {
        type: 'box',
        variant: 'warning',
        title: 'Cuidado con los "antivirus" falsos:',
        text: 'Una de las estafas más frecuentes es el mensaje emergente que dice "¡Tu computador está infectado! Descarga este antivirus ahora". Esos mensajes son ellos mismos el malware. Nunca descargues software de seguridad desde un anuncio o un enlace en un mensaje.',
      },

      // 38d. Error común
      {
        type: 'box',
        variant: 'warning',
        title: 'Error común: instalar más de un antivirus al mismo tiempo.',
        text: 'Tener dos antivirus activos simultáneamente no da el doble de protección: los programas compiten entre sí y pueden causar inestabilidad. Regla simple: un solo antivirus activo a la vez.',
      },

      // 39. Hábito 9
      {
        type: 'box',
        variant: 'success',
        title: 'Hábito 9 — Mantén activa la protección de tu dispositivo:',
        text: 'Verifica que Microsoft Defender o Google Play Protect estén activos y actualizados. No descargues antivirus desde anuncios o mensajes: solo desde el sitio oficial del fabricante.',
      },


      // 41. Tema 10 — Configuraciones de sistema
      {
        type: 'text',
        title: 'Tema 10 — Configuraciones de sistema operativo: ajustes que marcan la diferencia',
        content: `
          <p>Tu celular y tu computador vienen con configuraciones por defecto que no siempre son las más seguras. Algunos ajustes que parecen técnicos son en realidad muy simples de hacer y tienen un impacto real en tu seguridad cotidiana.</p>
        `,
      },

      // 42. Infografía — 10 configuraciones
      {
        type: 'infographic',
        maxWidth: 1600,
        title: '10 configuraciones de seguridad que puedes activar hoy',
        src: './Infografías/M3-10Configuraciones.html',
        aspectRatio: '1600 / 2600',
        fullBleed: true,
      },

      // 43. Checklist interactivo (ungraded)
      {
        type: 'checklist',
        title: '¿Cuántos de estos ajustes tienes activos hoy?',
        subtitle: 'Marca los que ya tienes configurados en tu celular o computador. No es calificado.',
        items: [
          'Bloqueo de pantalla automático activado',
          'PIN de 6 dígitos o biometría para desbloquear',
          'Notificaciones de transacciones bancarias activadas',
          'Actualizaciones automáticas activadas en el celular',
          'Conexión automática a WiFi desactivada',
          'Revisé los permisos de ubicación de mis apps en el último mes',
          'Tengo activado "Encontrar mi dispositivo"',
          'Sé cómo ver las sesiones activas de mi correo y redes sociales',
        ],
        results: {
          band1: { min: 0, text: 'Tómate 10 minutos hoy para activar los que faltan. Cada uno agrega una capa de protección real.' },
          band2: { min: 5, text: 'Bien. Los que te faltan son los más rápidos de activar.' },
          band3: { min: 8, text: 'Excelente. Tu dispositivo está muy bien configurado.' },
        },
      },

      // 44. Hábito 10
      {
        type: 'box',
        variant: 'success',
        title: 'Hábito 10 — Revisa las configuraciones de seguridad de tus dispositivos:',
        text: 'Activa el bloqueo de pantalla y el PIN o biometría. Activa las alertas de transacciones bancarias. Revisa permisos una vez al mes. Activa "Encontrar mi dispositivo".',
      },


      // 47. Quiz final (gating: 7/8 = 87.5%)
      {
        type: 'quiz',
        title: 'Actividad de validación — Correcto o incorrecto',
        subtitle: 'Elige la conducta correcta en cada situación. Necesitas 7 de 8 correctas para avanzar.',
        passingScore: 88,
        questions: [
          {
            id: 'm3_sit_1',
            question: 'Tienes la misma contraseña en Gmail y en Bancolombia porque es muy segura (16 caracteres, letras, números y símbolos).',
            options: [
              'Así está bien, una contraseña de 16 caracteres es suficientemente segura.',
              'Debo cambiarla. No importa qué tan compleja sea: si la reutilizo, compromete ambas cuentas si una sufre una filtración.',
            ],
            correct: 1,
            explanation: 'La complejidad no reemplaza la unicidad. Una contraseña diferente por servicio es la regla.',
          },
          {
            id: 'm3_sit_2',
            question: 'Recibes un SMS con un código de Bancolombia mientras estás en una llamada con alguien que dice ser del banco y te lo pide para "verificar tu identidad".',
            options: [
              'Le doy el código. El banco lo envió y la persona lo necesita para verificar.',
              'Cuelgo la llamada. Ningún banco me va a pedir un código MFA por teléfono.',
            ],
            correct: 1,
            explanation: 'Ese código es el MFA de tu cuenta. Compartirlo es entregar el acceso.',
          },
          {
            id: 'm3_sit_3',
            question: 'Tu celular lleva 3 semanas mostrando la notificación de actualización del sistema. La has pospuesto porque "no tienes tiempo ahora".',
            options: [
              'Sigo posponiendo. Las actualizaciones a veces causan problemas.',
              'La instalo hoy. Puede contener parches de seguridad críticos.',
            ],
            correct: 1,
            explanation: 'El 60% de los ataques exitosos explotan vulnerabilidades con parche disponible (CISA).',
          },
          {
            id: 'm3_sit_4',
            question: 'Estás en el aeropuerto El Dorado esperando tu vuelo. Necesitas revisar tu correo del trabajo. Hay una red WiFi abierta del aeropuerto disponible.',
            options: [
              'Me conecto al WiFi y reviso el correo. Es el aeropuerto oficial, debe ser seguro.',
              'Uso mis datos móviles o activo la VPN antes de conectarme al WiFi.',
            ],
            correct: 1,
            explanation: 'Una red abierta no cifra el tráfico. Para datos sensibles, usa datos móviles o VPN.',
          },
          {
            id: 'm3_sit_5',
            question: 'Quieres instalar una app de edición de fotos. Encuentras una en un sitio web que ofrece la versión premium gratis. La versión oficial cuesta $15.000 al mes.',
            options: [
              'La descargo. Si es la misma app, es lo mismo pero gratis.',
              'No la descargo de ese sitio. Busco la app en Play Store o el sitio oficial del desarrollador.',
            ],
            correct: 1,
            explanation: 'Las versiones "premium gratis" suelen contener malware. Solo descarga de fuentes oficiales.',
          },
          {
            id: 'm3_sit_6',
            question: 'Tienes todas las fotos de los últimos 5 años solo en tu celular. No tienes copia en ningún otro lugar.',
            options: [
              'Está bien. Mi celular está protegido con PIN y no lo pierdo.',
              'Activo la sincronización automática con Google Fotos o iCloud hoy mismo.',
            ],
            correct: 1,
            explanation: 'Un celular puede robarse, dañarse o fallar. Sin copia, las fotos se pierden para siempre.',
          },
          {
            id: 'm3_sit_7',
            question: 'Instalaste una app de linterna en tu celular Android. Al abrirla por primera vez, te pide permiso para acceder a tus contactos y a tu micrófono.',
            options: [
              'Acepto todos los permisos. Sin eso, la app no funciona.',
              'Rechazo esos permisos. Una linterna no necesita mis contactos ni mi micrófono.',
            ],
            correct: 1,
            explanation: 'Una linterna solo necesita acceso a la cámara (para el flash). Permisos adicionales son señales de alerta.',
          },
          {
            id: 'm3_sit_8',
            question: 'Mientras navegas, aparece un mensaje emergente: "Tu computador tiene 5 virus detectados. Descarga este antivirus ahora para limpiarlos."',
            options: [
              'Descargo el programa inmediatamente. Si hay virus, necesito actuar rápido.',
              'Cierro ese mensaje. Es el malware en sí. Si quiero verificar, abro Defender directamente desde el menú de inicio.',
            ],
            correct: 1,
            explanation: 'Los mensajes emergentes de "virus detectados" son una técnica clásica de engaño para instalar malware.',
          },
        ],
      },


      // 49. Cierre del módulo
      {
        type: 'closing',
        moduleLabel: 'Módulo 3 completado',
        title: '¿Cómo protejo mis cuentas y dispositivos?',
        summary: 'Aprendiste diez hábitos concretos de protección. Ninguno requiere ser experto en tecnología: todos pueden implementarse hoy, en menos tiempo del que crees.',
        takeaways: [
          'Una contraseña única por servicio. El gestor de contraseñas resuelve el problema de memorizarlas.',
          'MFA activo en correo, banco y WhatsApp. Prefiere app de autenticación sobre SMS.',
          'Actualizaciones automáticas en celular, computador y apps.',
          'Para operaciones bancarias: datos móviles o VPN confiable, nunca WiFi abierto.',
          'Copias de seguridad automáticas de fotos y documentos críticos en la nube.',
          'Antivirus activo y actualizado — uno solo a la vez. Bloqueo de pantalla y "Encontrar mi dispositivo" activos.',
        ],
        nextHint: 'En el Módulo 4 vas a aprender a evaluar la seguridad de los entornos donde compras y navegas.',
      },
    ],
  },

  // ─────────────────────────────────────
  // MÓDULO 4 — ¿Cómo compro y navego de forma segura?
  // ─────────────────────────────────────
  {
    id: 4,
    title: '¿Cómo compro y navego de forma segura?',
    description: 'Criterios para evaluar un entorno digital antes de interactuar con él.',
    icon: '🛒',
    estimatedTime: '20 min',
    blocks: [
      // 1. Portada
      {
        type: 'hero',
        title: '¿Cómo compro y navego de forma segura?',
        subtitle: 'Criterios para evaluar un entorno digital antes de interactuar con él',
        accent: 'secondary',
      },

      // 2. Intro del módulo
      {
        type: 'box',
        variant: 'accent',
        title: 'La diferencia entre M3 y M4:',
        text: 'En el Módulo 3 construiste una rutina de protección para tus cuentas y dispositivos. En el Módulo 2 aprendiste a reconocer cómo funcionan los ataques. En este módulo vas a aplicar ese conocimiento a situaciones concretas: comprar, pagar, navegar, usar apps.',
        footer: 'El criterio central es siempre el mismo: ¿puedo verificar que este entorno es lo que dice ser antes de actuar?',
      },

      // 2b. 2026 — La IA también trabaja para los atacantes
      {
        type: 'box',
        variant: 'purple',
        title: '2026 — La IA también trabaja para los atacantes',
        text: 'Los delincuentes hoy usan IA para crear sitios web fraudulentos que parecen profesionales, mensajes de engaño en español perfecto y correos personalizados con datos del destinatario. La apariencia visual ya no es suficiente para evaluar si algo es legítimo.',
        footer: 'Los criterios de este módulo son la respuesta: no evaluar por apariencia, sino por hechos verificables.',
      },

      // 3. Tema 1 — conexión
      {
        type: 'connectionnote',
        text: 'En el Módulo 2 aprendiste a reconocer phishing y sitios fraudulentos. Aquí vas a aplicar ese conocimiento a las compras en línea.',
      },

      // 3b. Tema 1 — texto
      {
        type: 'text',
        title: 'Tema 1 — Compras en línea: cómo evaluar un sitio antes de pagar',
        content: `
          <p style="font-weight:600; color:#3A3B74;">La verificación de cinco puntos antes de pagar:</p>
        `,
      },

      // 4. Infografía — 5 verificaciones
      {
        type: 'infographic',
        maxWidth: 1600,
        title: '5 verificaciones antes de comprar en línea',
        src: './Infografías/M4-5Verificaciones.html',
        aspectRatio: '1600 / 1050',
        fullBleed: true,
      },

      // 5a. Alerta anuncios
      {
        type: 'box',
        variant: 'warning',
        title: 'Alerta: compras desde anuncios en Instagram, Facebook y TikTok',
        text: 'Los anuncios patrocinados en redes sociales no son verificados por las plataformas. Abunda en Colombia: ropa, electrodomésticos, tecnología y calzado con descuentos extremos.',
        footer: 'Práctica recomendada: no compres desde el anuncio directamente. Busca la marca en Google y verifica si la oferta existe en el sitio oficial.',
      },

      // 5b. Medios de pago
      {
        type: 'box',
        variant: 'info',
        title: 'Sobre medios de pago: siempre elige el que tenga mayor protección',
        items: [
          'Con mayor protección: tarjeta de crédito (contracargo), PSE vía PayU o Wompi, MercadoPago.',
          'Con menor protección: transferencias directas a personas naturales, pagos por Nequi o Daviplata a desconocidos, efectivo.',
        ],
      },

      // 5c. Billeteras digitales
      {
        type: 'box',
        variant: 'success',
        title: 'Buenas prácticas para billeteras digitales',
        text: 'Google Wallet, Apple Wallet, Nequi y Daviplata son seguros cuando se usan bien: activa PIN o biometría para cada pago, activa notificaciones de transacción, nunca compartas tu QR de pago, y bloquea la billetera de inmediato si pierdes el celular.',
      },


      // 7. Tema 2 — Banca en línea
      {
        type: 'text',
        title: 'Tema 2 — Operaciones bancarias en línea: lo que tu banco nunca te va a pedir',
        content: `
          <p>Conocer las reglas de operación de los bancos es la mejor protección: si sabes lo que tu banco NUNCA te va a pedir, reconocerás inmediatamente cuando alguien lo intente.</p>
        `,
      },

      // 8. Infografía — banco nunca pide
      {
        type: 'infographic',
        maxWidth: 1600,
        title: 'Lo que tu banco NUNCA te va a pedir',
        src: './Infografías/M4-BancoNuncaPide.html',
        aspectRatio: '1600 / 1650',
        fullBleed: true,
      },

      // 9. Tabla — cómo acceder al banco
      {
        type: 'datatable',
        title: 'Cómo acceder a tu banco de forma segura',
        columns: ['Forma de acceso', '¿Es seguro?', 'Por qué'],
        rows: [
          { icon: '✅', highlight: 'green', cells: ['Escribir la URL directamente', 'Sí', 'Vas directamente al sitio sin intermediarios.'] },
          { icon: '✅', highlight: 'green', cells: ['App oficial (Play Store / App Store)', 'Sí', 'Verificada por la tienda oficial y el banco.'] },
          { icon: '⚠️', highlight: 'orange', cells: ['Enlace en correo o SMS del banco', 'No recomendado', 'No puedes verificar fácilmente si es legítimo.'] },
          { icon: '⚠️', highlight: 'orange', cells: ['Resultado orgánico en buscador', 'Con precaución', 'Verifica que la URL sea la oficial antes de entrar.'] },
          { icon: '❌', highlight: 'red', cells: ['Anuncio patrocinado', 'Evitar', 'Los atacantes pagan anuncios que imitan bancos.'] },
        ],
      },

      // 9b. Computadores públicos
      {
        type: 'box',
        variant: 'warning',
        title: 'Sobre computadores públicos:',
        text: 'Nunca accedas a tu cuenta bancaria desde un computador público. Si no tienes otra opción, usa el modo incógnito y cierra sesión completamente al terminar.',
      },

      // 9c. Criterio de banca segura
      {
        type: 'box',
        variant: 'success',
        title: 'Criterio de banca segura:',
        text: 'Accede siempre directamente: URL en el navegador o app oficial. Activa notificaciones push para cada transacción. Si recibes llamada o mensaje sobre tu cuenta, cuelga y llama tú al número oficial.',
      },


      // 11. Tema 3 — Marketplaces
      {
        type: 'text',
        title: 'Tema 3 — Marketplaces: comprar y vender entre particulares',
        content: `
          <p>Plataformas como MercadoLibre, OLX y Facebook Marketplace tienen riesgos específicos que no existen en tiendas online tradicionales: hay personas reales al otro lado y esa confianza puede ser explotada.</p>
        `,
      },

      // 11b. Tabla de modalidades de marketplace
      {
        type: 'datatable',
        title: 'Modalidades de fraude en marketplaces',
        columns: ['Modalidad', 'Cómo opera', 'Cómo protegerte'],
        rows: [
          { icon: '📦', highlight: 'red', cells: ['Producto que no llega', 'El vendedor recibe el pago y desaparece.', 'Usa el sistema de pago de la plataforma. Evita transferencias antes de recibir.'] },
          { icon: '🔄', cells: ['Producto diferente', 'Menor calidad o falsificación.', 'Pide fotos reales. Prefiere vendedores con historial.'] },
          { icon: '🧾', highlight: 'orange', cells: ['Comprobante de pago falso', 'El comprador envía una captura de un pago que nunca ocurrió.', 'Verifica el pago en tu cuenta, nunca en capturas.'] },
          { icon: '🚚', highlight: 'red', cells: ['El engaño del transportador', 'Un tercero pide datos bancarios para un "depósito de garantía".', 'Los transportadores reales no piden datos bancarios. Es siempre fraude.'] },
          { icon: '🔗', cells: ['Enlace externo', 'Piden continuar por WhatsApp o enlace externo.', 'Toda la operación dentro de la plataforma. Salir es señal de alerta.'] },
        ],
      },

      // 11c. Regla de oro
      {
        type: 'box',
        variant: 'info',
        title: 'Regla de oro:',
        text: 'Toda la negociación, el pago y la confirmación deben ocurrir dentro de la plataforma oficial. Cualquier solicitud de salir es una señal de alerta.',
      },


      // 13. Tema 4 — conexión
      {
        type: 'connectionnote',
        text: 'En el Módulo 2 aprendiste a reconocer dominios fraudulentos. Aquí el foco es cómo verificar un enlace antes de hacer clic en un entorno de transacción.',
      },

      // 13b. Tema 4 — título
      {
        type: 'text',
        title: 'Tema 4 — Verificación de enlaces: aplicar lo que aprendiste en M2',
        content: `<p>Vamos a aplicar ese mismo criterio a un contexto de acción: compras, pagos y navegación.</p>`,
      },

      // 14. Infografía — leer URL
      {
        type: 'infographic',
        maxWidth: 1600,
        title: 'Cómo leer una URL en 5 segundos antes de hacer clic',
        src: './Infografías/M4-LeerURL.html',
        aspectRatio: '1600 / 1400',
        fullBleed: true,
      },


      // 16. Tema 5 — gancho
      {
        type: 'box',
        variant: 'accent',
        title: 'Tema 5 — Permisos de aplicaciones',
        text: '¿Para qué necesita una app de linterna acceso a tus contactos, tu cámara y tu ubicación? No lo necesita. Cuando una app pide permisos que no tienen sentido para lo que hace, esos permisos son una señal de alerta.',
      },

      // 16b. Tema 5 — texto
      {
        type: 'text',
        content: `<p>En el Módulo 3 aprendiste a revisar permisos antes de instalar. Este tema va un paso más allá: cómo gestionar los permisos de las apps que ya tienes instaladas.</p>`,
      },

      // 16c. Infografía — Cómo revisar y gestionar permisos
      {
        type: 'infographic',
        maxWidth: 1600,
        title: 'Cómo revisar y gestionar los permisos de tus apps',
        src: './Infografías/M4-RevisarPermisos.html',
        aspectRatio: '1600 / 1300',
        fullBleed: true,
      },

      // 16d. Criterio de gestión de permisos
      {
        type: 'box',
        variant: 'success',
        title: 'Criterio de gestión de permisos:',
        text: 'Pregunta siempre: ¿para qué necesita este permiso esta app? Revisión mensual. Desinstala las apps que ya no usas.',
      },


      // 18. Tema 6 — conexión
      {
        type: 'connectionnote',
        text: 'En el Módulo 2 aprendiste que la información que publicas puede convertirse en el guion de una estafa. Aquí el objetivo es que configures la privacidad de tus perfiles.',
      },

      // 18b. Tema 6 — texto
      {
        type: 'text',
        title: 'Tema 6 — Privacidad en redes sociales: configurar lo que compartes y con quién',
        content: `
          <p>Cada red social tiene sus propios controles de privacidad. Estas son las configuraciones esenciales por plataforma.</p>
        `,
      },

      // 18c. Infografía — Privacidad por plataforma
      {
        type: 'infographic',
        maxWidth: 1600,
        title: 'Configuraciones de privacidad esenciales por plataforma',
        src: './Infografías/M4-PrivacidadRedes.html',
        aspectRatio: '1600 / 1500',
        fullBleed: true,
      },

      // 18c. Lo que publicas no desaparece
      {
        type: 'box',
        variant: 'warning',
        title: 'Lo que publicas no siempre desaparece:',
        text: 'Aunque borres una publicación, puede haber sido guardada antes. No publiques documentos de identidad, fotos de tarjetas, ubicación en tiempo real ni datos de menores.',
      },

      // 18d. Criterio de privacidad
      {
        type: 'box',
        variant: 'success',
        title: 'Criterio de privacidad en redes:',
        text: 'Configura tus perfiles como privados si no tienes razón específica para que sean públicos. Revisión cada 3 meses.',
      },

      // 20. Tema 7 — conexión
      {
        type: 'connectionnote',
        text: 'En el Módulo 2 viste las modalidades de estafa por WhatsApp. Aquí el foco es la prevención específica del robo de cuenta y el protocolo de recuperación si ya ocurrió.',
      },

      // 20b. Tema 7 — texto
      {
        type: 'text',
        title: 'Tema 7 — Cómo te roban la identidad en WhatsApp: prevención y recuperación',
        content: `
          <p>En la gran mayoría de los casos documentados en Colombia, el robo de cuenta de WhatsApp ocurre de la misma manera: el atacante convence a la víctima de compartir el código de verificación de 6 dígitos. Ese código es el MFA de WhatsApp. Compartirlo es entregarla.</p>
        `,
      },

      // 21. Infografía — robo de cuenta
      {
        type: 'infographic',
        maxWidth: 1600,
        title: 'El robo de cuenta de WhatsApp en 5 pasos',
        src: './Infografías/M4-RoboCuenta.html',
        aspectRatio: '1400 / 1900',
        fullBleed: true,
      },

      // 22. Activar 2FA en WhatsApp
      {
        type: 'box',
        variant: 'info',
        title: 'Activa la verificación en dos pasos en WhatsApp — 7 pasos, 2 minutos',
        items: [
          'Abre WhatsApp y ve a Configuración',
          'Selecciona "Cuenta" → "Verificación en dos pasos"',
          'Toca "Activar"',
          'Crea un PIN de 6 dígitos que solo tú conozcas',
          'Agrega un correo de recuperación (muy recomendado)',
        ],
        footer: 'Aunque un atacante obtenga tu código de verificación por SMS, necesitará también tu PIN personal para registrar tu cuenta en otro dispositivo.',
      },

      // 22b. Si tu cuenta ya fue comprometida
      {
        type: 'box',
        variant: 'warning',
        title: 'Si tu cuenta ya fue comprometida:',
        items: [
          'Avisa a tus contactos por otro medio que tu cuenta fue comprometida.',
          'Abre WhatsApp, ingresa tu número y solicita el código de verificación.',
          'Si el atacante activó verificación en dos pasos, usa "Olvidé mi PIN".',
          'Reporta al CAI Virtual de la Policía Nacional (caivirtual.policia.gov.co) y a WhatsApp.',
        ],
      },


      // 24. Tema 8 — conexión
      {
        type: 'connectionnote',
        text: 'En el Módulo 2 aprendiste que existen voz clonada, deepfakes y chatbots fraudulentos. Aquí el foco es distinto: qué hacer cuando recibes una solicitud de dinero o datos sensibles por cualquiera de esos canales.',
      },

      // 24b. Tema 8 — título
      {
        type: 'text',
        title: 'Tema 8 — Fraude por IA en transacciones: el protocolo de verificación',
        content: `<p>La IA hace que los ataques sean más convincentes, pero no cambia el mecanismo: siguen dependiendo de que actúes rápido sin verificar.</p>`,
      },

      // 24c. Tabla de fraude por IA
      {
        type: 'datatable',
        title: 'Las cuatro formas de fraude por IA',
        columns: ['Tipo', 'Cómo funciona', 'Señal de alerta'],
        rows: [
          { icon: '🎙️', highlight: 'red', cells: ['Voz clonada', 'Suena idéntica a un familiar y pide dinero urgente.', 'Urgencia, número desconocido, petición inusual.'] },
          { icon: '🎬', highlight: 'red', cells: ['Video deepfake', 'Un video muestra a un jefe pidiendo transferencia.', 'Fuera del canal habitual, urgencia.'] },
          { icon: '🤖', highlight: 'orange', cells: ['Chatbot falso', 'Imita soporte oficial de un banco.', 'Acceso desde enlace externo, pide datos que ya tendrían.'] },
          { icon: '✍️', cells: ['Mensaje perfecto', 'Español correcto, contexto específico.', 'Remitente no coincide con dominio oficial.'] },
        ],
      },

      // 24d. Protocolo de verificación
      {
        type: 'box',
        variant: 'accent',
        title: 'Antes de transferir o entregar datos, siempre:',
        items: [
          'PAUSA: no actúes durante la llamada, el video o el mensaje.',
          'CANAL ALTERNATIVO: contacta a la persona o entidad por un medio que ya conozcas.',
          'CONFIRMA: pregunta directamente si hizo esa solicitud, sin usar el mismo canal.',
          'Si no puedes verificar, no actúes. Un banco, un familiar, un jefe real puede esperar.',
        ],
        footer: 'Frase clave: "Voy a verificar por otro canal y te llamo." Un atacante no puede esperar que llames al número real.',
      },


      // 26. Tema 9 — gancho
      {
        type: 'box',
        variant: 'accent',
        title: 'Tema 9 — Aplicaciones: evaluar antes de instalar',
        text: 'Una app de linterna solo necesita acceso al flash de la cámara para funcionar. Si al instalarla pide acceso a tus contactos, tu micrófono y tu ubicación, hay algo que no cuadra.',
        footer: 'Aplica esta pregunta a cualquier app: ¿este permiso tiene sentido para lo que hace la app?',
      },

      // 27. Infografía — evaluar app
      {
        type: 'infographic',
        maxWidth: 1600,
        title: 'Cómo evaluar una app antes de instalarla — 5 criterios',
        src: './Infografías/M4-EvaluarApp.html',
        aspectRatio: '1600 / 1650',
        fullBleed: true,
      },

      // 28. Para apps bancarias
      {
        type: 'box',
        variant: 'info',
        title: 'Para apps bancarias específicamente:',
        text: 'Instala la app del banco desde el enlace que aparece en el sitio web oficial del banco. Verifica que el desarrollador sea la entidad bancaria real (ej: Bancolombia S.A.).',
      },


      // 31. Quiz final (gating: 4/5 = 80%, default passingScore)
      {
        type: 'quiz',
        title: 'Actividad de validación — Simulación de decisión',
        subtitle: 'Decide qué harías en cada escenario. Necesitas 4 de 5 correctas para avanzar.',
        questions: [
          {
            id: 'm4_esc_1',
            question: 'En Instagram ves un anuncio patrocinado de "adidascolombiaoficial.store" con 70% de descuento. El sitio tiene HTTPS y acepta tarjeta de crédito vía un formulario propio.',
            options: [
              'Compro. Tiene HTTPS y acepta tarjeta.',
              'No compro directamente. Busco la marca en Google, entro al sitio oficial y verifico si la oferta existe allí.',
            ],
            correct: 1,
            explanation: 'HTTPS no garantiza legitimidad. El dominio no es el oficial de Adidas. Los anuncios en redes no son verificados por las plataformas.',
          },
          {
            id: 'm4_esc_2',
            question: 'Buscas "Bancolombia" y el primer resultado es un anuncio con URL "bancolombia.com.co.login-seguro.net". El sitio se ve idéntico al real.',
            options: [
              'Ingreso mis datos. El sitio se ve idéntico.',
              'Cierro la página. El dominio real en esa URL es "login-seguro.net", no Bancolombia.',
            ],
            correct: 1,
            explanation: 'El dominio real es la parte antes del primer "/". Nunca accedas al banco desde anuncios.',
          },
          {
            id: 'm4_esc_3',
            question: 'En OLX encuentras una moto a buen precio. El vendedor pide salir de OLX para el pago vía transferencia y quiere el 50% antes de que veas la moto.',
            options: [
              'Acepto. La oferta es buena.',
              'No acepto. Salir de la plataforma para el pago es una señal de alerta clásica.',
            ],
            correct: 1,
            explanation: 'Cualquier vendedor que pida salir de la plataforma evita la protección que ella ofrece.',
          },
          {
            id: 'm4_esc_4',
            question: 'Un número desconocido: "Soy de soporte de WhatsApp. Tu cuenta tiene un problema. Te llegará un código para verificar tu identidad. Compártelo cuando llegue."',
            options: [
              'Espero el código y lo comparto.',
              'Bloqueo el número. WhatsApp no tiene soporte proactivo y nunca pide códigos.',
            ],
            correct: 1,
            explanation: 'El código que llegaría es el MFA de tu cuenta. Compartirlo entrega el acceso completo.',
          },
          {
            id: 'm4_esc_5',
            question: 'Buscas "Nequi" en Play Store. Aparecen: "Nequi" de Bancolombia S.A. con 10 millones de descargas; "Nequi Pro" de "Digital Apps LLC" con 500 descargas.',
            options: [
              'Instalo "Nequi Pro". Debe ser mejor.',
              'Instalo "Nequi" de Bancolombia S.A. Es la oficial: desarrollador correcto, millones de descargas.',
            ],
            correct: 1,
            explanation: 'El desarrollador debe ser la entidad bancaria real. Pocas descargas y desarrollador desconocido son señales críticas de alerta.',
          },
        ],
      },


      // 33. Cierre del módulo
      {
        type: 'closing',
        moduleLabel: 'Módulo 4 completado',
        title: '¿Cómo compro y navego de forma segura?',
        summary: 'La seguridad en entornos digitales no depende de desconfiar de todo, sino de aplicar criterios de verificación antes de actuar. Un sitio puede verse perfecto y ser falso, especialmente hoy que la IA permite crear contenido fraudulento de alta calidad.',
        takeaways: [
          'Antes de comprar: verifica dominio + reseñas externas + método de pago con protección.',
          'Compras desde anuncios en redes: busca primero en el sitio oficial de la marca.',
          'Para el banco: accede por URL directa o app oficial. Nunca desde anuncios o enlaces.',
          'En marketplaces: toda la operación dentro de la plataforma.',
          'Lee el dominio completo de cualquier enlace antes de hacer clic.',
          'Activa la verificación en dos pasos en WhatsApp con un PIN personal.',
          'Ante cualquier solicitud urgente de dinero o datos: pausa, verifica por canal alternativo, luego actúa.',
        ],
        nextHint: 'En el Módulo 5 vas a aprender qué hacer si, a pesar de todo, caes en una estafa.',
      },
    ],
  },

  // ─────────────────────────────────────
  // MÓDULO 5 — ¿Qué hago si ya fui víctima?
  // ─────────────────────────────────────
  {
    id: 5,
    title: '¿Qué hago si ya fui víctima?',
    description: 'El protocolo de respuesta que casi ningún curso de seguridad enseña.',
    icon: '🩹',
    estimatedTime: '20 min',
    blocks: [
      // 1. Portada
      {
        type: 'hero',
        title: '¿Qué hago si ya fui víctima?',
        subtitle: 'El protocolo de respuesta que casi ningún curso de seguridad enseña',
        accent: 'primary',
      },

      // 2. Gancho del módulo
      {
        type: 'box',
        variant: 'accent',
        title: 'Este módulo existe porque los demás no son suficientes.',
        text: 'No importa cuántos hábitos adoptes o cuánto sepas sobre ciberseguridad. En algún momento — por un descuido, un ataque sofisticado o un error de un familiar — algo puede salir mal.',
        footer: 'Lo que diferencia a una persona preparada de una que no lo está no es si fue víctima. Es lo que hizo en las primeras horas después.',
      },

      // 2b. Cómo está organizado
      {
        type: 'box',
        variant: 'info',
        title: 'Cómo está organizado este módulo:',
        text: 'Un protocolo de respuesta en tres velocidades: lo que haces en las primeras 24 horas, en la primera semana y en el primer mes después de un incidente. Al finalizar, vas a tener acceso a un kit de emergencia descargable.',
      },

      // 2c. El momento cero
      {
        type: 'text',
        title: 'Antes de empezar: el momento cero',
        content: `
          <p>Cuando una persona se da cuenta de que fue víctima de una estafa, la reacción más común es el pánico. Y el pánico lleva a dos errores igualmente dañinos: actuar de forma desorganizada o no actuar por no saber por dónde empezar.</p>
          <p style="font-weight:600; color:#3A3B74;">Este módulo elimina la segunda opción. Al terminar, vas a saber exactamente qué hacer y en qué orden, sin importar qué tipo de incidente enfrentes.</p>
        `,
      },

      // 2d. Lo que NO debes hacer
      {
        type: 'box',
        variant: 'warning',
        title: 'Lo que NO debes hacer al darte cuenta de que fuiste víctima:',
        items: [
          'No borres los mensajes, correos o conversaciones relacionadas con el incidente: son evidencia.',
          'No transfieras dinero adicional bajo ninguna circunstancia, aunque te presionen.',
          'No accedas a tus cuentas comprometidas desde el mismo dispositivo hasta haberlo asegurado.',
          'No esperes a ver si el problema se resuelve solo.',
        ],
      },

      // 3. Tema 1 — texto
      {
        type: 'text',
        title: 'Tema 1 — Primeras 24 horas: contención inmediata',
        content: `
          <p>El objetivo de las primeras 24 horas es uno solo: detener el sangrado. No es el momento de investigar qué pasó ni de buscar al responsable. Es el momento de cortar el acceso del atacante lo antes posible.</p>
        `,
      },

      // 3b. Velocidad 1
      {
        type: 'box',
        variant: 'warning',
        title: 'Velocidad 1 — Primeras 24 horas: contención',
        items: [
          'Cambia inmediatamente la contraseña del servicio afectado desde un dispositivo seguro.',
          'Cambia también la contraseña de tu correo electrónico: es la llave maestra.',
          'Cambia las contraseñas de todos los servicios donde usabas la misma clave.',
          'Activa el MFA en el servicio afectado si no estaba activo.',
          'Contacta a tu banco o plataforma de pago para bloquear transacciones.',
          'Si fue una red social: reporta el acceso no autorizado y cierra sesiones activas.',
          'Toma capturas de pantalla de todo: mensajes, transacciones, notificaciones.',
          'Avisa a tus contactos cercanos si tu cuenta fue comprometida.',
        ],
      },

      // 3c. Tabla de prioridad
      {
        type: 'datatable',
        title: 'Cambio de contraseñas: orden de prioridad',
        columns: ['#', 'Cuenta', 'Por qué es urgente'],
        rows: [
          { icon: '1️⃣', highlight: 'red', cells: ['Correo electrónico', 'Es la llave maestra. Con acceso al correo, el atacante puede recuperar la contraseña de cualquier otro servicio.'] },
          { icon: '2️⃣', highlight: 'red', cells: ['Banco y billeteras digitales', 'Cualquier demora puede resultar en transacciones fraudulentas adicionales.'] },
          { icon: '3️⃣', highlight: 'orange', cells: ['WhatsApp y redes sociales', 'Cuentas comprometidas se usan para estafar a los contactos de la víctima.'] },
          { icon: '4️⃣', cells: ['Plataformas de trabajo', 'Si hay información corporativa involucrada, puede tener consecuencias laborales.'] },
          { icon: '5️⃣', cells: ['Otros servicios con la misma clave', 'Credential stuffing: el atacante probará la misma clave en todos los servicios posibles.'] },
        ],
      },

      // 3d. Bloquear tarjeta
      {
        type: 'box',
        variant: 'info',
        title: 'Cómo bloquear tu tarjeta bancaria (Colombia):',
        text: 'Bancolombia: *700 desde celular · 604 604 6060 — Davivienda: 601 330 3030 — Banco de Bogotá: 601 744 6400 — BBVA Colombia: 601 312 3456 — Nequi: app → Configuración → Bloquear cuenta — Daviplata: app → Menú → Bloquear.',
        footer: 'El tiempo es crítico: mientras más rápido reportes una transacción no autorizada, mayores son las posibilidades de bloquearla o revertirla.',
      },


      // 5. Tema 2 — texto
      {
        type: 'text',
        title: 'Tema 2 — Primera semana: reporte y monitoreo',
        content: `
          <p>Una vez que contuviste el daño inmediato, el siguiente paso es formalizar el reporte ante las autoridades competentes y establecer un monitoreo activo.</p>
        `,
      },

      // 5b. Velocidad 2
      {
        type: 'box',
        variant: 'warning',
        title: 'Velocidad 2 — Primera semana: reporte y monitoreo',
        items: [
          'Reporta el incidente ante las autoridades competentes y la plataforma afectada.',
          'Notifica a todos tus contactos si tu cuenta fue comprometida.',
          'Monitorea diariamente tus cuentas bancarias y de crédito.',
          'Verifica si tus credenciales aparecen en HaveIBeenPwned (haveibeenpwned.com).',
          'Revisa el historial de sesiones activas y cierra las que no reconoces.',
          'Si hubo compromiso de datos personales, alerta a tu banco de forma preventiva.',
        ],
      },

      // 5c. Tabla de reporte
      {
        type: 'datatable',
        title: 'Dónde reportar en Colombia',
        columns: ['Entidad', 'Qué reportar', 'Cómo contactar'],
        rows: [
          { icon: '👮', cells: ['CAI Virtual — Policía Nacional', 'Estafas, suplantación, fraude electrónico, robo de WhatsApp.', 'caivirtual.policia.gov.co · Línea 767'] },
          { icon: '💻', cells: ['Centro Cibernético Policial', 'Ciberdelitos complejos, fraude a empresas.', 'cc.policia.gov.co'] },
          { icon: '🏦', cells: ['Superintendencia Financiera', 'Fraude financiero, transacciones no autorizadas.', 'superfinanciera.gov.co · 01 8000 120 100'] },
          { icon: '🛒', cells: ['SIC', 'Fraude en comercio electrónico, protección de datos.', 'sic.gov.co · 592 0400'] },
          { icon: '⚖️', cells: ['Fiscalía General', 'Denuncia formal por delitos informáticos.', 'fiscalia.gov.co · App Mi Fiscalía · 122'] },
        ],
      },

      // 5d. HaveIBeenPwned
      {
        type: 'box',
        variant: 'info',
        title: 'Cómo usar HaveIBeenPwned:',
        text: 'Ve a haveibeenpwned.com, ingresa tu correo electrónico, y el sitio te dirá si aparece en filtraciones conocidas. Si aparece, cambia la contraseña de ese correo y de todos los servicios donde usabas la misma clave. Es gratuito, seguro y no almacena las credenciales que ingresas.',
      },


      // 7. Tema 3 — texto
      {
        type: 'text',
        title: 'Tema 3 — Primer mes: recuperación y blindaje',
        content: `
          <p>Una vez que el incidente está contenido y reportado, el primer mes es el momento de consolidar la recuperación y reforzar las defensas. No es solo reparar lo que pasó: es salir más protegido de lo que estabas antes.</p>
        `,
      },

      // 7b. Velocidad 3
      {
        type: 'box',
        variant: 'success',
        title: 'Velocidad 3 — Primer mes: recuperación y blindaje',
        items: [
          'Auditoría completa de contraseñas con ayuda del gestor.',
          'Activar MFA en todas las cuentas críticas donde no estaba activo.',
          'Revisión de permisos de aplicaciones: desinstalar lo que no se usa.',
          'Verificar y actualizar preguntas de seguridad.',
          'Configurar alertas bancarias para cada transacción.',
          'Revisar el historial de crédito si hubo compromiso de identidad.',
          'Documentar el incidente: qué ocurrió, cómo se detectó, qué se hizo.',
        ],
      },

      // 7c. Compromiso de identidad
      {
        type: 'box',
        variant: 'warning',
        title: 'Si hubo compromiso de identidad: pasos adicionales',
        text: 'Consulta tu historial en TransUnion (transunion.com.co) y DataCrédito (datacredito.com.co) — tienes derecho a una consulta gratuita cada seis meses. Si detectas créditos que no solicitaste, reporta de inmediato a la entidad y a la Superintendencia Financiera. Comunícate con tu operador (Claro, Movistar, Tigo, WOM) para alertar sobre posible SIM swapping.',
      },


      // 9. Tema 4 — texto
      {
        type: 'text',
        title: 'Tema 4 — Tipos de incidente y qué hacer en cada caso',
        content: `
          <p>El protocolo de tres velocidades aplica a todos los incidentes, pero cada tipo tiene acciones específicas. Esta tabla resume las más frecuentes en Colombia.</p>
        `,
      },

      // 9b. Tabla de tipos de incidente
      {
        type: 'datatable',
        columns: ['Tipo de incidente', 'Acción inmediata'],
        rows: [
          { icon: '🎀', highlight: 'red', cells: ['Phishing exitoso — entregaste credenciales', 'Cambiar contraseña del servicio afectado de inmediato, luego correo, MFA y sesiones activas.'] },
          { icon: '🀀', highlight: 'red', cells: ['Fraude bancario — transacción no autorizada', 'Llamar al banco de inmediato (*700 Bancolombia u otras líneas oficiales) para bloquear y reportar.'] },
          { icon: '📀', highlight: 'orange', cells: ['Robo de cuenta de WhatsApp', 'Avisar a contactos por otro canal de inmediato, solicitar recuperación en WhatsApp.'] },
          { icon: '🀀', highlight: 'orange', cells: ['Suplantación de identidad — crédito fraudulento', 'Contactar a la entidad financiera y a la Fiscalía, consultar centrales de riesgo.'] },
          { icon: '🔒', highlight: 'red', cells: ['Ransomware — archivos cifrados', 'No pagar. Desconectar de la red y restaurar desde copia de seguridad.'] },
          { icon: '🗀️', cells: ['Filtración de datos de una empresa', 'Cambiar la contraseña del servicio afectado y de cualquier otro donde la reutilizabas.'] },
        ],
      },

      // 9c. Sobre el ransomware
      {
        type: 'box',
        variant: 'info',
        title: 'Sobre el ransomware:',
        text: 'NoMoreRansom.org es una iniciativa de Europol y la Policía de Holanda que ofrece herramientas gratuitas de descifrado. Antes de considerar cualquier pago, consulta este sitio. Pagar no garantiza recuperación y financia a los atacantes.',
      },

      // 10. Infografía — semáforo de urgencia
      {
        type: 'infographic',
        maxWidth: 1600,
        title: 'Semáforo de urgencia — ¿cuándo actuar?',
        src: './Infografías/M5-Semaforo.html',
        aspectRatio: '1600 / 1650',
        fullBleed: true,
      },


      // 12. Tema 5 — Monitoreo continuo
      {
        type: 'text',
        title: 'Tema 5 — Monitoreo continuo: hábitos después del incidente',
        content: `
          <p>Después de un incidente, el monitoreo activo durante los 30 días siguientes es fundamental. Las consecuencias de un robo de datos no siempre son inmediatas: un atacante puede esperar semanas antes de usar la información obtenida.</p>
        `,
      },

      // 13. Infografía — monitoreo 30 días
      {
        type: 'infographic',
        maxWidth: 1600,
        title: 'Tu rutina de monitoreo post-incidente — 30 días',
        src: './Infografías/M5-Monitoreo30dias.html',
        aspectRatio: '1600 / 1750',
        fullBleed: true,
      },


      // 15. Tema 6 — intro
      {
        type: 'text',
        title: 'Tema 6 — Tu plan de acción personal',
        content: `
          <p>Este es el último tema del curso. No termina con un concepto ni con una lista de señales de alerta. Termina con algo que puedes usar hoy: tu propio plan de acción, construido con lo que aprendiste en los cinco módulos anteriores.</p>
        `,
      },

      // 16. Actividad — Mi plan de acción personal
      {
        type: 'actionplan',
        title: 'Mi plan de acción personal en ciberseguridad',
      },

      // 17. Descargable — Kit de emergencia
      {
        type: 'downloadcard',
        variant: 'kit',
        title: 'Kit de emergencia',
        description: 'Una referencia de una página con el protocolo completo de respuesta. Guárdala en tu celular.',
      },

      // 18. Descargable — Plan personal
      {
        type: 'downloadcard',
        variant: 'plan',
        title: 'Mi plan personal de ciberseguridad',
        description: 'Un checklist de una página con los hábitos del curso para marcar e implementar a tu ritmo.',
      },


      // DVA final del módulo
      { type: 'dva' },

      // 20. Actividad de validación — tres escenarios integrados
      {
        type: 'scenariobuilder',
        title: 'Actividad de validación — Aplica lo que aprendiste',
        subtitle: 'Combina conocimientos de todos los módulos. Esta actividad no tiene puntaje mínimo: lo importante es completarla y leer la justificación de cada respuesta.',
        scenarios: [
          {
            id: 'esc_1',
            mode: 'order',
            situation: 'Son las 8 de la mañana. Recibes un correo que parece de la DIAN diciendo que tienes una devolución de impuestos pendiente. Sin pensar, haces clic en el enlace e ingresas tu usuario y contraseña de Gmail en el sitio que se abre. Dos minutos después te das cuenta de que el sitio no era de la DIAN.',
            question: '¿Cuáles son tus primeras tres acciones, en orden de prioridad?',
            options: [
              { key: 'A', text: 'Cambiar la contraseña del Gmail de inmediato' },
              { key: 'B', text: 'Reportar el correo como phishing' },
              { key: 'C', text: 'Revisar las sesiones activas de Gmail y cerrar las que no reconozco' },
              { key: 'D', text: 'Llamar a alguien para que me ayude' },
              { key: 'E', text: 'Cambiar las contraseñas de todos los servicios donde uso la misma clave que el Gmail' },
            ],
            correctOrder: ['A', 'C', 'E'],
            justification: 'A — el correo es la llave maestra, cambiarlo es la acción más urgente. C — verificar que nadie más accedió mientras tanto. E — el mismo usuario y clave probado en otros servicios. B y D son útiles pero no son las tres acciones más urgentes.',
          },
          {
            id: 'esc_2',
            mode: 'select',
            situation: 'Recibes una notificación de Bancolombia: se realizó una transferencia de $450.000 a una cuenta que no reconoces. Tú no hiciste esa transferencia. Son las 11 de la noche.',
            question: '¿Qué haces en los próximos 15 minutos? (puede haber más de una correcta)',
            options: [
              { key: 'A', text: 'Espero hasta mañana para llamar al banco en horario de atención' },
              { key: 'B', text: 'Llamo al *700 de Bancolombia ahora mismo y reporto la transacción' },
              { key: 'C', text: 'Bloqueo mi tarjeta desde la app de Bancolombia' },
              { key: 'D', text: 'Cambio la contraseña de la app del banco' },
              { key: 'E', text: 'Tomo captura de pantalla de la notificación como evidencia' },
            ],
            correctKeys: ['B', 'C', 'D', 'E'],
            justification: 'Los bancos tienen líneas de atención 24 horas para fraude. Cada hora que esperas puede resultar en transacciones adicionales. Todas las demás acciones son correctas y urgentes.',
          },
          {
            id: 'esc_3',
            mode: 'order',
            situation: 'Recibes una comunicación de una entidad financiera sobre una deuda de un crédito que no solicitaste. Al investigar, descubres que fue solicitado hace tres semanas con tus datos personales.',
            question: '¿Cuál es el orden correcto de acciones en los próximos días?',
            options: [
              { key: 'A', text: 'Radicación de denuncia formal en la Fiscalía' },
              { key: 'B', text: 'Reporte a la entidad financiera de que el crédito es fraudulento' },
              { key: 'C', text: 'Consulta del historial en centrales de riesgo (TransUnion / DataCrédito)' },
              { key: 'D', text: 'Alerta al banco de forma preventiva sobre posible suplantación' },
              { key: 'E', text: 'Recolección y organización de toda la documentación del incidente' },
            ],
            correctOrder: ['B', 'D', 'E', 'C', 'A'],
            justification: 'B — reportar a la entidad que emitió el crédito es lo primero para iniciar el proceso de reclamación. D — alertar al banco previene más productos fraudulentos. E — la documentación es esencial para todos los procesos siguientes. C — verificar el alcance del daño en el historial. A — la denuncia formal puede tomar tiempo y requiere la documentación previa.',
          },
        ],
      },

      // 21. Recuperación del compromiso personal de M0
      {
        type: 'reflection',
        mode: 'recall',
        storageKey: 'm0_compromiso',
        closingTemplate: 'Cuando empezaste este curso, escribiste: "Con este curso quiero aprender a proteger {{respuesta}}." Ahora tienes las herramientas para hacerlo.',
      },

      // 22. Cierre del módulo y del curso
      {
        type: 'closing',
        moduleLabel: 'Curso completado',
        title: '¿Qué hago si ya fui víctima?',
        summary: 'Este no fue un curso sobre tecnología. Fue un curso sobre decisiones: las que tomas cuando recibes un mensaje sospechoso, cuando entras a un sitio de compras, cuando algo sale mal. Cada módulo te dio criterios para tomar esas decisiones de manera diferente a como las tomabas antes.',
        takeaways: [
          'M0 — Conociste tu punto de partida real.',
          'M1 — Entendiste que tu identidad digital existe y tiene valor.',
          'M2 — Aprendiste a reconocer cómo intentan engañarte.',
          'M3 — Construiste una rutina de protección de 10 hábitos.',
          'M4 — Aprendiste a evaluar entornos digitales antes de interactuar con ellos.',
          'M5 — Sabes exactamente qué hacer si algo sale mal.',
        ],
        nextHint: 'La ciberseguridad no consiste en desconfiar de todo. Consiste en saber cuándo detenerse y verificar antes de actuar.',
      },

      // 22b. Tres cosas para hacer hoy
      {
        type: 'box',
        variant: 'warning',
        title: 'Tres cosas para hacer hoy antes de que pase una hora:',
        items: [
          'Descarga y guarda el kit de emergencia en tu celular.',
          'Descarga tu plan personal de ciberseguridad y marca lo que vas a implementar esta semana.',
          'Comparte al menos uno de estos dos recursos con alguien de tu familia.',
        ],
      },

      // 22c. Recursos adicionales
      {
        type: 'text',
        title: 'Recursos adicionales para seguir aprendiendo',
        content: `
          <ul>
            <li><strong>CAI Virtual Colombia</strong> — caivirtual.policia.gov.co</li>
            <li><strong>MinTIC</strong> — mintic.gov.co</li>
            <li><strong>CISA Secure Our World</strong> — cisa.gov/secure-our-world</li>
            <li><strong>Have I Been Pwned</strong> — haveibeenpwned.com</li>
            <li><strong>NoMoreRansom</strong> — nomoreransom.org</li>
            <li><strong>ESET Latinoamérica</strong> — eset.com/latam</li>
          </ul>
        `,
      },
    ],
  },
]
