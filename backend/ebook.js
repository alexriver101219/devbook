const chapters = [
    {
        title: '1. Resolver el problema correcto',
        intro: 'El desarrollo de software empieza antes del editor. Un producto valioso reduce una dificultad real para personas concretas, dentro de restricciones reales.',
        sections: [
            {
                title: 'Descubrimiento y contexto',
                paragraphs: [
                    'Antes de proponer pantallas o tecnología, escribe qué ocurre hoy, a quién afecta y qué consecuencia produce. Separa los hechos observados de las hipótesis. “El equipo tarda dos días en consolidar pedidos” es verificable; “necesitamos inteligencia artificial” es una solución prematura.',
                    'Habla con usuarios, observa el proceso y revisa los datos disponibles. Pregunta qué intentaban lograr, qué pasos siguieron, dónde se detuvieron y qué hicieron después. Las entrevistas sirven para descubrir necesidades; no son una votación sobre características.'
                ],
                bullets: [
                    'Usuario: ¿quién experimenta el problema y con qué frecuencia?',
                    'Contexto: ¿qué herramientas, reglas y restricciones existen?',
                    'Impacto: ¿qué tiempo, dinero, calidad o riesgo se pierde?',
                    'Evidencia: ¿qué observación permitiría confirmar la hipótesis?'
                ]
            },
            {
                title: 'Definir resultados y límites',
                paragraphs: [
                    'Formula el resultado como un cambio observable: “reducir el tiempo de conciliación de 90 a 30 minutos en cuatro semanas”. Define una métrica principal y señales de protección, como errores, abandonos o carga de soporte. Una métrica aislada puede incentivar comportamientos no deseados.',
                    'Escribe también qué no se resolverá en esta versión. Los límites explícitos protegen el enfoque y permiten negociar cambios con claridad.'
                ]
            },
            {
                title: 'Mapa de actores y riesgos',
                paragraphs: [
                    'Enumera a quienes usan, operan, financian o regulan la solución. Sus necesidades pueden entrar en conflicto: quien compra el sistema no siempre lo utiliza; quien administra datos no siempre controla el proceso.',
                    'Registra riesgos tempranos: dependencia de un proveedor, datos incompletos, baja conectividad, cambios normativos o poca capacidad operativa. Asigna a cada riesgo una persona responsable y una forma de reducir la incertidumbre.'
                ]
            }
        ],
        exercise: 'Redacta una hipótesis con usuario, necesidad y resultado medible. Valídala con tres conversaciones antes de convertirla en funcionalidades.'
    },
    {
        title: '2. Requisitos que se pueden verificar',
        intro: 'Los requisitos traducen necesidades a comportamientos y restricciones que el equipo puede diseñar, construir y comprobar.',
        sections: [
            {
                title: 'Historias, escenarios y criterios',
                paragraphs: [
                    'Una historia breve expresa valor, no prescribe una pantalla: “Como coordinadora, quiero consultar las solicitudes pendientes para priorizar el trabajo del día”. Acompáñala con criterios observables y ejemplos de entrada y salida.',
                    'Los criterios de aceptación describen condiciones comprobables. Evita términos vagos como rápido, sencillo o seguro sin umbrales. Especifica el comportamiento normal, los errores, los permisos y los límites.'
                ],
                example: 'Dado que una coordinadora tiene solicitudes asignadas, cuando filtra por estado pendiente, entonces ve únicamente las solicitudes que puede consultar y el total coincide con los resultados.'
            },
            {
                title: 'Requisitos funcionales y de calidad',
                paragraphs: [
                    'Los requisitos funcionales describen capacidades: crear una solicitud, aprobarla, buscarla o exportarla. Los atributos de calidad describen qué tan bien funciona el sistema bajo condiciones concretas: latencia, disponibilidad, privacidad, accesibilidad y facilidad de cambio.',
                    'Escribe escenarios medibles. Por ejemplo: “con 500 usuarios concurrentes, el percentil 95 de lectura permanece por debajo de 800 ms en la región de operación”. Define cómo se medirá y qué entorno representa la carga.'
                ],
                bullets: [
                    'Rendimiento: volumen, concurrencia y percentiles.',
                    'Disponibilidad: ventana, impacto y recuperación esperada.',
                    'Seguridad: actores, datos protegidos y controles requeridos.',
                    'Accesibilidad: teclado, contraste, etiquetas y lectores de pantalla.'
                ]
            },
            {
                title: 'Priorizar y controlar cambios',
                paragraphs: [
                    'Prioriza según valor, urgencia, riesgo y esfuerzo, no solo por quién solicita. Una clasificación simple es útil si el equipo define cada nivel y aplica el mismo criterio a todo el backlog.',
                    'Cuando cambia un requisito, identifica qué decisiones, pruebas, datos, documentación y compromisos afecta. Mantén una trazabilidad ligera entre necesidad, historia, implementación y prueba.'
                ]
            }
        ],
        exercise: 'Toma una historia de tu proyecto. Añade tres ejemplos de aceptación: camino correcto, dato inválido y usuario sin permiso.'
    },
    {
        title: '3. Modelar procesos, datos y comportamiento',
        intro: 'Los modelos reducen ambigüedad al hacer visibles las reglas y relaciones antes de que queden ocultas en código.',
        sections: [
            {
                title: 'El modelo adecuado para la pregunta',
                paragraphs: [
                    'Un diagrama de contexto muestra actores y límites. Un flujo de actividad revela decisiones y excepciones. Un diagrama de secuencia aclara el orden de mensajes. Un modelo entidad-relación organiza datos y restricciones. No existe un diagrama obligatorio para todo proyecto.',
                    'Empieza con el modelo más sencillo que ayude a tomar una decisión. Nombra cada elemento con el vocabulario del dominio y revisa el dibujo con las personas que conocen el proceso.'
                ]
            },
            {
                title: 'Procesos y estados',
                paragraphs: [
                    'Representa el ciclo de vida como estados y transiciones permitidas. Si una solicitud puede estar borrador, enviada, aprobada o rechazada, define quién puede moverla, qué datos requiere cada transición y qué sucede ante un reintento.',
                    'Modelar excepciones evita que el código dependa de suposiciones implícitas. Incluye duplicados, cancelaciones, tiempos de espera, operaciones parciales y correcciones auditables.'
                ]
            },
            {
                title: 'Datos consistentes',
                paragraphs: [
                    'Identifica entidades, atributos, relaciones, identificadores y reglas de integridad. Distingue los datos maestros de los eventos históricos. Normaliza para reducir duplicación y agrega índices según consultas reales, después de medir.',
                    'Decide qué significa eliminar: borrado físico, anonimización o marca de inactividad. Los datos personales pueden necesitar retención limitada, acceso restringido y registro de cambios. La política depende de la jurisdicción y del propósito.'
                ],
                example: 'Pedido (id, cliente_id, estado, creado_en) y LineaPedido (pedido_id, producto_id, cantidad, precio_unitario). Guardar el precio acordado en la línea conserva el historial aunque cambie el precio del catálogo.'
            }
        ],
        exercise: 'Dibuja el flujo de una operación importante. Marca los estados inválidos y la información necesaria para recuperarse de un fallo.'
    },
    {
        title: '4. Arquitectura y decisiones de diseño',
        intro: 'La arquitectura organiza las decisiones que condicionan el cambio, el despliegue y la operación de un sistema.',
        sections: [
            {
                title: 'Elegir límites y responsabilidades',
                paragraphs: [
                    'Agrupa el código por capacidades del negocio y define qué responsabilidad tiene cada módulo. Una interfaz puede recibir una petición, un caso de uso coordinar reglas y un adaptador hablar con una base de datos o proveedor externo.',
                    'La separación es útil cuando reduce acoplamiento y facilita pruebas; demasiadas capas también agregan coste. Mantén la complejidad proporcional al tamaño, riesgo y ritmo de cambio del producto.'
                ]
            },
            {
                title: 'Atributos de calidad y compromisos',
                paragraphs: [
                    'No se puede maximizar todo al mismo tiempo. Una caché puede bajar latencia y complicar consistencia; una arquitectura distribuida puede aumentar disponibilidad y elevar el coste operativo. Explicita los compromisos con escenarios y métricas.',
                    'Evalúa el sistema de extremo a extremo: cliente, API, almacenamiento, red, identidad, despliegue y recuperación. La capacidad de escalar depende de cuellos de botella medidos, no del número de servicios.'
                ]
            },
            {
                title: 'Registrar decisiones',
                paragraphs: [
                    'Un registro de decisión arquitectónica conserva contexto, alternativas, consecuencias y fecha. Ayuda a entender por qué se eligió una solución y cuándo conviene revisarla.',
                    'Una decisión debe poder cambiarse si cambian sus supuestos. Identifica el coste de salida y evita depender de funciones propietarias sin una estrategia de migración razonable.'
                ],
                example: 'Decisión: mantener una API modular en un único servicio para el primer lanzamiento. Contexto: un equipo pequeño y un dominio aún cambiante. Consecuencia: despliegue sencillo; si un módulo necesita escalar por separado, se medirá antes de extraerlo.'
            }
        ],
        exercise: 'Escribe una decisión pendiente con dos alternativas, una métrica para comparar y el coste de revertirla.'
    },
    {
        title: '5. Construir software mantenible',
        intro: 'El código debe expresar las reglas con claridad, proteger invariantes y permitir cambios seguros.',
        sections: [
            {
                title: 'Nombres, funciones y módulos',
                paragraphs: [
                    'Elige nombres que describan el propósito del dominio. Divide una función cuando tenga varias responsabilidades o haga difícil entender los casos límite, no solo para alcanzar un número arbitrario de líneas.',
                    'Mantén juntas las decisiones que cambian por la misma razón. Evita que una modificación en una regla de negocio obligue a editar componentes que no tienen relación con ella.'
                ]
            },
            {
                title: 'Errores y límites de confianza',
                paragraphs: [
                    'Valida los datos en el borde de la aplicación y vuelve a comprobar las reglas críticas en el servidor. Un formulario puede ayudar a la experiencia, pero no sustituye validación, autorización ni restricciones de base de datos.',
                    'Representa los errores esperados de forma explícita: dato inválido, recurso inexistente, conflicto y servicio temporalmente no disponible. Registra contexto suficiente para diagnosticar sin guardar contraseñas, tokens o información sensible.'
                ]
            },
            {
                title: 'APIs predecibles',
                paragraphs: [
                    'Diseña contratos con nombres claros, tipos estables, respuestas coherentes y códigos HTTP apropiados. Documenta paginación, filtros, límites, errores y versión. Acepta reintentos seguros mediante operaciones idempotentes cuando una red puede repetir solicitudes.',
                    'Usa consultas parametrizadas para SQL y valida límites de longitud, tipo y formato. Las respuestas deben revelar únicamente los datos que el cliente necesita.'
                ]
            }
        ],
        exercise: 'Revisa una operación de escritura. Enumera su entrada no confiable, sus invariantes y qué ocurriría si el cliente repite la petición.'
    },
    {
        title: '6. Trabajo ágil, Git y colaboración',
        intro: 'La agilidad consiste en aprender y entregar valor de forma iterativa, no en omitir análisis o documentación útil.',
        sections: [
            {
                title: 'Ciclos de entrega pequeños',
                paragraphs: [
                    'Divide el trabajo en incrementos que se puedan revisar y demostrar. Una iteración útil termina con software integrado, criterios cumplidos y una conversación sobre lo aprendido.',
                    'Refina el backlog con el equipo que implementará la solución. Aclara dependencias, riesgos y criterios de aceptación antes de comprometer trabajo.'
                ]
            },
            {
                title: 'Git y revisión de cambios',
                paragraphs: [
                    'Crea ramas breves y commits que expresen una intención. Un pull request pequeño facilita comprobar lógica, pruebas, riesgos y compatibilidad. Automatiza verificaciones repetibles y usa la revisión humana para razonamiento, mantenibilidad y requisitos.',
                    'Los comentarios deben referirse al cambio y explicar el impacto. Distingue un bloqueo de una preferencia; cuando una sugerencia no es obligatoria, indícalo.'
                ]
            },
            {
                title: 'Definición de terminado',
                paragraphs: [
                    'Acuerda una lista común: implementación revisada, pruebas relevantes aprobadas, errores manejados, accesibilidad comprobada, documentación actualizada y despliegue verificable. Ajusta la lista según el riesgo y el tipo de producto.',
                    'Una tarea no está terminada si solo funciona en el equipo de quien la escribió. Debe integrarse con el resto del sistema y tener una forma repetible de validarse.'
                ]
            }
        ],
        exercise: 'Reduce una tarea grande a tres incrementos demostrables y define para cada uno una prueba de aceptación.'
    },
    {
        title: '7. Pruebas que aportan confianza',
        intro: 'Las pruebas comprueban comportamiento y permiten cambiar el sistema con menos riesgo. Su valor depende de la calidad de los casos, no solo de la cobertura.',
        sections: [
            {
                title: 'Pirámide y estrategia',
                paragraphs: [
                    'Las pruebas unitarias comprueban reglas aisladas con rapidez. Las pruebas de integración verifican límites como SQL, colas o APIs. Las pruebas de extremo a extremo cubren recorridos críticos, pero suelen ser más lentas y sensibles al entorno.',
                    'Elige la capa más económica que detecte el fallo. Mantén unas pocas pruebas de extremo a extremo para operaciones de alto valor y cubre muchos casos de regla en capas rápidas.'
                ]
            },
            {
                title: 'Casos límite y propiedades',
                paragraphs: [
                    'Para cada requisito identifica valores normales, mínimos, máximos, ausentes, repetidos y malformados. Comprueba permisos y estados, no solo respuestas exitosas.',
                    'Las pruebas basadas en propiedades validan invariantes para muchas entradas: una cantidad nunca es negativa; una operación repetida no duplica un cobro; una búsqueda no devuelve datos de otro usuario.'
                ]
            },
            {
                title: 'Pruebas mantenibles',
                paragraphs: [
                    'Nombra pruebas por el comportamiento esperado, prepara datos aislados y evita dependencias del orden de ejecución. No pruebes detalles internos que pueden cambiar sin modificar el resultado del usuario.',
                    'Una prueba que falla de manera intermitente erosiona la confianza. Registra el entorno, controla el tiempo y las dependencias externas, y corrige la causa raíz en lugar de aumentar reintentos indefinidamente.'
                ]
            }
        ],
        exercise: 'Escribe una prueba para el camino feliz, otra para una entrada inválida y otra para la falta de autorización de un caso de uso.'
    },
    {
        title: '8. Seguridad, privacidad y datos',
        intro: 'La seguridad es una propiedad del sistema completo: código, identidad, infraestructura, procesos y personas.',
        sections: [
            {
                title: 'Modelar amenazas',
                paragraphs: [
                    'Identifica activos, actores, límites de confianza y posibles abusos. Pregunta quién podría falsificar una identidad, cambiar una petición, elevar permisos, exponer datos o degradar el servicio.',
                    'Prioriza por impacto y probabilidad. Aplica controles concretos: autenticación, autorización por recurso, validación, límites de frecuencia, registros de auditoría y copias recuperables.'
                ]
            },
            {
                title: 'Secretos y autenticación',
                paragraphs: [
                    'Guarda secretos en variables de entorno protegidas o en un gestor de secretos; nunca los incluyas en el repositorio, HTML, logs o respuestas. Rota cualquier credencial que se haya expuesto.',
                    'Almacena contraseñas con funciones diseñadas para contraseñas y parámetros adecuados. Usa cookies HttpOnly, SameSite y Secure en HTTPS cuando la arquitectura lo permita. Expira sesiones y protege las acciones sensibles.'
                ]
            },
            {
                title: 'Autorización y privacidad',
                paragraphs: [
                    'Autenticar responde quién es la persona; autorizar responde qué puede hacer con este recurso. Verifica la propiedad en el servidor en cada operación. Ocultar un botón no protege una ruta.',
                    'Recopila solo los datos necesarios, limita acceso, define retención y ofrece procedimientos de corrección o eliminación cuando corresponda. Enmascara información identificable en ambientes de prueba.'
                ]
            }
        ],
        exercise: 'Dibuja el flujo de una petición sensible y señala cada punto donde se valida identidad, permiso, entrada y registro.'
    },
    {
        title: '9. Integración y despliegues repetibles',
        intro: 'La automatización reduce diferencias entre entornos y hace visibles los errores antes de que afecten a usuarios.',
        sections: [
            {
                title: 'Pipeline de integración continua',
                paragraphs: [
                    'Un pipeline básico instala versiones reproducibles, valida formato, ejecuta análisis y pruebas, construye el artefacto y conserva sus resultados. Cada etapa debe fallar de manera visible y dar información accionable.',
                    'No publiques artefactos distintos entre pruebas y producción. Promueve la misma versión validada entre entornos, y registra el commit y configuración utilizados.'
                ]
            },
            {
                title: 'Configuración y migraciones',
                paragraphs: [
                    'Separa configuración de código. Valida las variables obligatorias al iniciar y evita valores por defecto que conecten accidentalmente a una base distinta.',
                    'Las migraciones de esquema deben ser revisables, repetibles cuando sea posible y compatibles durante despliegues graduales. Prueba restauración desde copias; una copia no verificada no es una estrategia de recuperación.'
                ]
            },
            {
                title: 'Despliegue y reversión',
                paragraphs: [
                    'Usa comprobaciones de salud y despliegues graduales cuando el impacto lo amerite. Mantén una estrategia de reversión para aplicación y datos: algunas migraciones no se revierten simplemente instalando la versión anterior.',
                    'Define quién puede publicar, qué verificaciones necesita y cómo comunicar una incidencia. Automatiza tareas repetibles y conserva una intervención humana para cambios de alto riesgo.'
                ]
            }
        ],
        exercise: 'Describe una publicación desde commit hasta producción. Identifica dónde se validan pruebas, secretos, migraciones y reversión.'
    },
    {
        title: '10. Observabilidad y operación',
        intro: 'Operar un producto exige saber qué está ocurriendo, cuánto afecta y cómo recuperarse.',
        sections: [
            {
                title: 'Métricas, logs y trazas',
                paragraphs: [
                    'Las métricas revelan tendencias y saturación; los logs describen eventos; las trazas muestran el recorrido entre servicios. Correlaciona solicitudes con identificadores no sensibles y evita registrar datos privados.',
                    'Elige indicadores que reflejen experiencia real: tasa de errores, latencia por percentil, disponibilidad, saturación y operaciones completadas. Una métrica sin umbral ni acción asociada rara vez ayuda.'
                ]
            },
            {
                title: 'Alertas útiles',
                paragraphs: [
                    'Alerta por síntomas que requieren una respuesta, no por cada variación. Cada alerta debe tener propietario, impacto, contexto y pasos iniciales. Reduce ruido y revisa las falsas alarmas.',
                    'Prueba las alertas y los procedimientos en ejercicios. Una guía de operación debe ayudar a una persona que no diseñó el sistema a investigar sin improvisar.'
                ]
            },
            {
                title: 'Incidentes y aprendizaje',
                paragraphs: [
                    'Durante un incidente, prioriza seguridad, comunicación y restauración del servicio. Registra una cronología y separa hechos de hipótesis.',
                    'Después, identifica condiciones que permitieron el fallo y mejoras que reduzcan repetición o impacto. Un análisis sin culpables busca fortalecer controles, pruebas, señales y procedimientos.'
                ]
            }
        ],
        exercise: 'Define dos indicadores de servicio y un umbral de alerta. Para cada uno escribe la acción que tomaría el equipo.'
    },
    {
        title: '11. Mantenimiento y evolución',
        intro: 'El lanzamiento inicia el ciclo de vida del producto. La calidad sostenida se construye con medición, soporte y cambios disciplinados.',
        sections: [
            {
                title: 'Deuda técnica con contexto',
                paragraphs: [
                    'La deuda técnica es una decisión cuyo coste futuro se acepta para obtener un beneficio presente. Registra el motivo, el riesgo, el impacto y la condición para revisarla.',
                    'No toda imperfección requiere reescritura. Compara el coste de mantener, refactorizar y sustituir mediante datos: frecuencia de cambios, errores, tiempo de entrega y complejidad operativa.'
                ]
            },
            {
                title: 'Compatibilidad y versiones',
                paragraphs: [
                    'Define cómo evolucionan contratos, formatos y APIs. Durante transiciones, puede ser necesario aceptar más de una versión temporalmente y medir su uso antes de retirar la anterior.',
                    'Comunica cambios incompatibles y ofrece plazos razonables. Las migraciones de datos requieren validaciones, respaldos y una estrategia de recuperación.'
                ]
            },
            {
                title: 'Medir resultados',
                paragraphs: [
                    'Compara las métricas posteriores al lanzamiento con la línea base. Comprueba si el cambio produjo el resultado esperado y si aparecieron efectos no deseados.',
                    'Combina datos cuantitativos con soporte y observación. Si el producto no resuelve el problema, ajusta la hipótesis antes de agregar complejidad.'
                ]
            }
        ],
        exercise: 'Elige una mejora reciente y define una métrica de éxito, una señal de daño y una fecha para revisar el resultado.'
    },
    {
        title: '12. Proyecto integrador: solicitudes de servicio',
        intro: 'Este caso recorre una solución pequeña desde el problema hasta la operación, mostrando cómo conectar las prácticas anteriores.',
        sections: [
            {
                title: 'Problema y primer alcance',
                paragraphs: [
                    'Una organización recibe solicitudes por correo y hojas de cálculo. Algunas se duplican y nadie puede ver su estado. El objetivo inicial es registrar, asignar y consultar solicitudes; no se incluirán automatizaciones complejas ni analítica avanzada.',
                    'Los actores son solicitante, agente y administrador. La métrica principal es el porcentaje de solicitudes con responsable y estado visibles durante el primer día. Las señales de protección son duplicados, accesos indebidos y tiempo de respuesta.'
                ]
            },
            {
                title: 'Modelo y reglas',
                paragraphs: [
                    'Solicitud: identificador, creador, categoría, descripción, prioridad, estado, responsable y fechas. Los estados iniciales son recibida, asignada, resuelta y cerrada. Una solicitud resuelta puede reabrirse con motivo.',
                    'Reglas: el solicitante consulta sus solicitudes; un agente consulta las asignadas; un administrador asigna responsables. Toda transición registra actor, fecha y estado anterior. Los archivos adjuntos se dejan fuera del primer incremento.'
                ]
            },
            {
                title: 'Arquitectura y pruebas',
                paragraphs: [
                    'Una aplicación web puede usar una API modular y una base relacional. La autenticación identifica al actor y la autorización valida la relación con cada solicitud. Las consultas filtran por usuario en el servidor.',
                    'Pruebas unitarias cubren transiciones; integración verifica restricciones SQL; una prueba de extremo a extremo crea y resuelve una solicitud. Las pruebas de autorización confirman que un usuario no puede leer solicitudes ajenas.'
                ]
            },
            {
                title: 'Entrega y operación',
                paragraphs: [
                    'El primer incremento permite crear y consultar solicitudes. El segundo añade asignación y permisos. El tercero incorpora historial, alertas y métricas. Cada incremento se valida con usuarios y puede desplegarse de forma controlada.',
                    'Se registran errores sin datos sensibles, se mide latencia y tasa de fallo, y se conserva una copia recuperable. Tras el piloto se revisa si bajaron duplicados y si el flujo realmente se entiende.'
                ]
            }
        ],
        exercise: 'Adapta el caso a un problema real. Escribe una historia, criterios de aceptación, una regla de autorización y una prueba de recuperación.'
    },
    {
        title: '13. Planificación, estimación y entregas',
        intro: 'Planificar no es prometer fechas exactas para trabajo desconocido: es organizar aprendizaje, capacidad y decisiones para entregar valor con riesgos visibles.',
        sections: [
            {
                title: 'Descomponer sin perder el resultado',
                paragraphs: [
                    'Empieza por el resultado del usuario y corta el trabajo en incrementos verticales: cada uno recorre interfaz, reglas, datos y validación para dejar una capacidad utilizable. Evita dividir solo por capas —primero toda la base, después toda la interfaz— porque retrasa la retroalimentación y deja integración para el final.',
                    'Una tarea pequeña debe tener un propósito verificable, una persona responsable y criterios claros. Si una actividad no puede terminarse ni evaluarse en unos días, busca una entrega intermedia, una prueba de concepto acotada o una decisión que reduzca la incertidumbre.'
                ],
                example: 'Para agregar asignación de solicitudes, un primer incremento guarda responsable y estado con una regla de autorización; el siguiente permite filtrar por responsable; un tercero notifica cambios. Cada paso se puede demostrar sin esperar al siguiente.'
            },
            {
                title: 'Estimar con incertidumbre explícita',
                paragraphs: [
                    'Una estimación es una hipótesis condicionada por supuestos, no un compromiso de certeza. Aclara qué incluye, qué dependencias existen, quién lo realizará y qué preguntas no se han resuelto. Separa el esfuerzo de construcción de la espera por revisiones, aprobaciones o proveedores.',
                    'La estimación relativa compara tareas con ejemplos conocidos. Si una opción es mucho mayor que las anteriores, descompónla o realiza un experimento para validar el riesgo. No conviertas puntos de historia en horas ni uses velocidad histórica como cuota individual: son instrumentos locales para conversar sobre capacidad y flujo.'
                ],
                bullets: [
                    'Escenario optimista, probable y adverso: explica de qué depende cada uno.',
                    'Reserva espacio para interrupciones, revisión, pruebas y mantenimiento.',
                    'Actualiza el plan cuando llega evidencia; no ocultes cambios acumulados.',
                    'Si una fecha no se mueve, negocia alcance y riesgo, no la calidad esencial.'
                ]
            },
            {
                title: 'Ordenar un lanzamiento por riesgo',
                paragraphs: [
                    'Prioriza dependencias y preguntas de alto impacto antes de invertir en trabajo detallado. Valida temprano integraciones difíciles, permisos, importaciones de datos, rendimiento esperado y condiciones de despliegue. Una prueba pequeña de viabilidad puede evitar semanas de construir sobre una premisa falsa.',
                    'Planifica en horizontes: el próximo incremento necesita detalle; las siguientes etapas pueden expresarse como objetivos y opciones. Al cerrar cada ciclo, compara el resultado con la meta, revisa señales de daño y decide si continuar, ajustar o detener.'
                ]
            }
        ],
        exercise: 'Elige una capacidad pendiente, divídela en tres incrementos demostrables y anota supuestos, dependencias, riesgo principal y evidencia de aceptación de cada uno.'
    },
    {
        title: '14. Experiencia de usuario y accesibilidad',
        intro: 'Una solución útil permite que las personas comprendan qué pueden hacer, completen su tarea y se recuperen de errores sin depender de conocimientos técnicos.',
        sections: [
            {
                title: 'Diseñar el recorrido antes de decorar la pantalla',
                paragraphs: [
                    'Describe el objetivo del usuario, el contexto de uso y los pasos desde el inicio hasta la confirmación. Incluye estados vacíos, espera, éxito, error, falta de permisos y recuperación. Un recorrido claro suele resolver más problemas que añadir controles o animaciones.',
                    'Organiza la información según las decisiones reales. Usa etiquetas familiares, orden predecible y acciones principales visibles. Mantén la consistencia entre pantallas, pero no impongas una convención que contradiga el lenguaje y trabajo de las personas usuarias.'
                ],
                bullets: [
                    '¿Qué intenta completar la persona y qué información necesita primero?',
                    '¿Qué error es reversible y cómo se puede corregir?',
                    '¿Puede reconocer el estado actual y el resultado de una acción?',
                    '¿La interfaz sigue siendo comprensible en móvil y con zoom?'
                ]
            },
            {
                title: 'Prototipar y comprobar con tareas reales',
                paragraphs: [
                    'Un prototipo permite evaluar estructura y lenguaje antes de construir la integración completa. Pide a participantes que resuelvan una tarea concreta y observa dónde dudan. Evita enseñar el camino o preguntar solo si “les gusta”: el comportamiento observado revela problemas distintos a una opinión general.',
                    'Registra la tasa de finalización, errores, tiempo aproximado y puntos de confusión, sin tratar una muestra pequeña como evidencia estadística definitiva. Corrige los obstáculos recurrentes, vuelve a probar y documenta las limitaciones todavía conocidas.'
                ],
                example: 'Tarea de prueba: “Encuentra una solicitud recibida hoy y explica qué harías para asignarla”. Si la persona necesita que le indiquen dónde está el filtro, el problema puede estar en la jerarquía y no en la velocidad de quien participa.'
            },
            {
                title: 'Accesibilidad como criterio de calidad',
                paragraphs: [
                    'Construye con controles semánticos, foco de teclado visible y orden lógico. Los campos necesitan etiquetas asociadas; los errores deben explicar cómo corregirlos y estar relacionados con el campo. No comuniques estado únicamente con color: agrega texto, icono o patrón comprensible.',
                    'Comprueba contraste, ampliación, idioma declarado, títulos y nombres accesibles. Prueba recorridos esenciales con teclado y un lector de pantalla cuando sea posible. Las herramientas automáticas ayudan a detectar problemas, pero no reemplazan pruebas de comprensión con personas.'
                ],
                bullets: [
                    'Teclado: recorrer, activar, cerrar y recuperar el foco.',
                    'Lectura: etiquetas, encabezados, nombres y mensajes de estado.',
                    'Visual: contraste, zoom, reflujo y estados que no dependan solo del color.',
                    'Movimiento: permitir reducir animaciones que puedan distraer o causar malestar.'
                ]
            }
        ],
        exercise: 'Dibuja el recorrido de una tarea principal e incluye estados de espera, error y éxito. Luego ejecuta una revisión por teclado y anota tres mejoras verificables.'
    },
    {
        title: '15. Bases de datos y consistencia de la información',
        intro: 'El almacenamiento no es un detalle intercambiable: sus reglas determinan qué estados son posibles y cómo recuperarse de concurrencia, fallos y cambios.',
        sections: [
            {
                title: 'Entidades, claves y restricciones',
                paragraphs: [
                    'Modela hechos del negocio en tablas con nombres y tipos claros. Usa claves primarias estables y claves foráneas para expresar relaciones; agrega restricciones de unicidad, obligatoriedad y dominio cuando puedan proteger el dato. La validación de la interfaz mejora la experiencia, pero la base también debe impedir estados inválidos.',
                    'Evita guardar una lista repetida de valores en una columna cuando cada elemento tenga identidad, relaciones o reglas propias. Normalizar reduce inconsistencias; desnormalizar puede ser válido para lecturas medidas si se documenta cómo conservar la sincronización.'
                ],
                example: 'Un pedido contiene varias líneas. La cantidad y el precio aplicado deben validarse por línea; almacenar solo el total dificulta comprobar de dónde viene el importe y conservar el precio acordado cuando el catálogo cambia.'
            },
            {
                title: 'Transacciones y concurrencia',
                paragraphs: [
                    'Una transacción agrupa cambios que deben considerarse juntos: se confirman todos o ninguno. Mantén su alcance breve, verifica filas afectadas y define qué respuesta corresponde a conflictos. Las restricciones de base de datos son la última defensa frente a dos solicitudes simultáneas que intentan ocupar el mismo recurso.',
                    'Comprende el nivel de aislamiento y los bloqueos del motor elegido. Una lectura seguida de escritura puede quedar obsoleta mientras otra transacción actúa; el control optimista con versión, una actualización condicional o un bloqueo explícito resuelven problemas distintos. Reintentar un conflicto solo es seguro cuando la operación completa puede repetirse sin efectos duplicados.'
                ]
            },
            {
                title: 'Consultas, índices y cambios de esquema',
                paragraphs: [
                    'Empieza por las consultas que necesita cada pantalla: filtros, orden, paginación y volumen esperado. Un índice acelera lecturas seleccionadas a cambio de espacio y coste en escritura; verifica el plan de ejecución y mide con datos representativos. Evita traer columnas que el consumidor no usa.',
                    'Cambia esquemas con despliegues compatibles: agrega primero lo nuevo, publica código que soporte ambos formatos, migra datos y retira lo anterior cuando ya no se use. Antes de una migración, calcula duración, bloqueos, volumen, respaldo y forma de recuperación. Probar una restauración aporta más evidencia que confirmar únicamente que se creó una copia.'
                ]
            }
        ],
        exercise: 'Diseña tres tablas para una entidad de tu proyecto. Indica claves, relaciones, restricciones, consulta de lectura principal y una estrategia segura de migración.'
    },
    {
        title: '16. APIs e integraciones confiables',
        intro: 'Una API es un contrato entre equipos y sistemas que pueden evolucionar, fallar o recibir solicitudes repetidas de manera independiente.',
        sections: [
            {
                title: 'Contratos claros y predecibles',
                paragraphs: [
                    'Organiza operaciones alrededor de recursos y acciones comprensibles. Define campos obligatorios, tipos, límites, permisos, formato de fecha y orden de resultados. Mantén respuestas coherentes: quien consume la API debe poder distinguir validación fallida, recurso inexistente, conflicto y fallo temporal.',
                    'Usa los métodos y códigos HTTP según su semántica y documenta ejemplos reales de éxito y error. La paginación debe tener límites máximos; los filtros deben validarse y no convertirse en fragmentos de consulta sin parametrizar. No devuelvas propiedades sensibles por conveniencia.'
                ],
                example: 'Una solicitud de creación puede responder 201 e incluir identificador y estado inicial. Si el identificador ya existe, un 409 explica el conflicto. Una lista paginada informa los elementos y, si corresponde, un cursor opaco para continuar.'
            },
            {
                title: 'Reintentos, tiempos límite e idempotencia',
                paragraphs: [
                    'Toda llamada externa tiene latencia y puede fallar. Configura tiempos límite para conexión y respuesta; un cliente sin límite puede acumular solicitudes y consumir recursos indefinidamente. Reintenta solo errores transitorios, con espera creciente y variación aleatoria, límite de intentos y respeto por indicaciones del servicio.',
                    'Un timeout no confirma que la operación falló: el servidor quizá la completó y se perdió la respuesta. Para operaciones críticas, utiliza una clave de idempotencia y conserva el resultado asociado dentro de una ventana definida. No reintentes pagos, reservas o envíos como si cada petición fuese nueva.'
                ]
            },
            {
                title: 'Eventos, webhooks y evolución',
                paragraphs: [
                    'Un webhook avisa que ocurrió un evento, pero puede llegar duplicado, retrasado o fuera de orden. Verifica su autenticidad, limita tamaño, registra un identificador de evento y procesa de forma idempotente. Responde con rapidez después de aceptar el evento y delega trabajo largo a una cola duradera.',
                    'Agrega campos opcionales con compatibilidad; cambiar el significado de un campo existente puede romper consumidores incluso si el formato sigue siendo válido. Versiona solo cuando la evolución compatible no alcance, mide el uso de la versión antigua y comunica una fecha y camino de migración.'
                ]
            }
        ],
        exercise: 'Escribe el contrato de una operación de escritura: entrada, permisos, respuesta de éxito, errores, límite de tiempo, política de reintento y comportamiento ante duplicados.'
    },
    {
        title: '17. Estrategia de pruebas más allá del camino feliz',
        intro: 'Una estrategia de calidad combina pruebas rápidas de reglas, verificación de límites y observación de recorridos importantes; no existe una única cifra que garantice confianza.',
        sections: [
            {
                title: 'Partir de riesgos y ejemplos concretos',
                paragraphs: [
                    'Convierte cada requisito en ejemplos verificables: entradas válidas, valores límite, permisos, duplicados, conflictos y fallos de dependencias. Una tabla de decisión ayuda cuando varias condiciones cambian el resultado. Para cálculos, define propiedades que siempre deban cumplirse además de ejemplos particulares.',
                    'Elige pruebas según el daño potencial y la probabilidad de fallo. Una regla financiera requiere verificar redondeo y transacciones; una preferencia cosmética puede cubrirse con pruebas más ligeras. Documenta brevemente qué riesgo cubre cada caso para reconocer qué protección se pierde si se elimina.'
                ]
            },
            {
                title: 'Pruebas en los límites y con servicios reales',
                paragraphs: [
                    'Los dobles de prueba son útiles para simular un fallo difícil, tiempo o una respuesta excepcional; no comprueban el comportamiento real del proveedor. Para bases de datos, ejecuta pruebas de integración contra el mismo motor o uno compatible y valida restricciones, transacciones y consultas relevantes.',
                    'Las pruebas de contrato comprueban que productor y consumidor entienden los mismos campos y errores. Mantén unas pocas pruebas de extremo a extremo para recorridos de alto valor; aísla los datos y evita depender de cuentas compartidas o del orden de ejecución.'
                ]
            },
            {
                title: 'Ambientes, datos y resultados confiables',
                paragraphs: [
                    'Una prueba estable controla reloj, aleatoriedad, red y configuración. Genera datos sintéticos sin información real; cada prueba debe preparar y limpiar sus propios registros. No uses servicios de producción para validar un cambio y evita secretos reales en el pipeline.',
                    'Una falla intermitente también es un defecto del proceso: vuelve a ejecutarla en aislamiento, captura logs y busca carreras, esperas rígidas o dependencias externas. Reporta la causa y el impacto. Los reintentos automáticos pueden ocultar síntomas y dar una falsa señal de calidad.'
                ],
                bullets: [
                    'Defecto escapado: requisito o capa de prueba que no lo detectó.',
                    'Tiempo de feedback: cuánto tarda la persona en saber si su cambio funciona.',
                    'Tasa de intermitencia: frecuencia de fallas sin cambio relevante.',
                    'Cobertura: dato para encontrar áreas sin prueba, no medida de corrección.'
                ]
            }
        ],
        exercise: 'Para una regla de negocio, construye una tabla con seis escenarios, incluidos límite, duplicado y permiso denegado. Indica la capa de prueba que ofrece la verificación más sencilla.'
    },
    {
        title: '18. Rendimiento y capacidad con evidencia',
        intro: 'Optimizar consiste en mejorar un indicador de experiencia bajo una carga conocida sin deteriorar consistencia, seguridad, coste o mantenibilidad.',
        sections: [
            {
                title: 'Definir un presupuesto y medir la línea base',
                paragraphs: [
                    'Fija objetivos para operaciones observables, por ejemplo el percentil 95 de lectura bajo cierta concurrencia. Mide por separado cliente, red, aplicación, consultas y dependencias. El promedio puede ocultar una cola de solicitudes lentas que afecta a las personas con peor experiencia.',
                    'Prueba con datos y patrones realistas: tamaño de respuesta, filtros, distribución de solicitudes y mezcla de lecturas y escrituras. Registra CPU, memoria, latencia, errores y saturación. Una carga sintética sin perfil representativo puede optimizar un caso que no ocurre en producción.'
                ]
            },
            {
                title: 'Localizar y corregir el cuello de botella',
                paragraphs: [
                    'Perfila antes de reescribir. Una consulta que devuelve demasiadas filas, un bucle con llamadas de red y una serialización costosa requieren soluciones distintas. Cambia una variable por vez, repite la medición y compara contra la misma línea base.',
                    'Las cachés reducen trabajo repetido, pero introducen caducidad, invalidación y riesgo de servir datos desactualizados. Define propietario del dato, tiempo de vida y comportamiento si la caché falla. Paginación, índices y límites de tamaño suelen aportar más que escalar indiscriminadamente.'
                ]
            },
            {
                title: 'Concurrencia y costo de capacidad',
                paragraphs: [
                    'Estima capacidad como un modelo que debe verificarse: tasa esperada, costo medio por operación, dependencias y margen para picos. Revisa pools de conexiones, límites del proveedor, colas y uso de memoria. Subir concurrencia sin controles puede saturar la base o multiplicar solicitudes a una dependencia lenta.',
                    'Las colas ayudan cuando un trabajo puede terminar después de responder al usuario. Diseña consumidores con límite de concurrencia, idempotencia, cola de fallos y visibilidad del retraso acumulado. La asincronía cambia el contrato del producto: comunica que la operación está pendiente y ofrece una forma de consultar su estado.'
                ],
                bullets: [
                    'Latencia: tiempo observado en percentiles, no solo promedio.',
                    'Saturación: recurso próximo al límite y su cola asociada.',
                    'Costo por operación: gasto aproximado dividido por trabajo útil.',
                    'Margen: capacidad restante para variación y crecimiento.'
                ]
            }
        ],
        exercise: 'Elige una ruta lenta, define su presupuesto de latencia y una carga de prueba realista. Anota la métrica actual, el cuello de botella hipotético y cómo demostrarías que la mejora es segura.'
    },
    {
        title: '19. Fiabilidad, degradación y recuperación',
        intro: 'Un sistema fiable no evita todos los fallos: limita su alcance, se recupera de manera probada y comunica claramente qué capacidad continúa disponible.',
        sections: [
            {
                title: 'Metas de servicio y prioridades',
                paragraphs: [
                    'Un indicador de nivel de servicio mide una experiencia importante, como solicitudes exitosas o lecturas dentro de un umbral. Su objetivo debe surgir de una necesidad de negocio y una capacidad operativa real, no de escoger el número más alto posible.',
                    'La tolerancia al fallo ayuda a decidir dónde invertir. Si una meta se incumple, primero se reduce el riesgo a usuarios; después se analiza la causa y se priorizan mejoras. Un periodo con pocos errores no elimina la necesidad de probar restauración, failover y procedimientos.'
                ]
            },
            {
                title: 'Aislar fallos y degradar con seguridad',
                paragraphs: [
                    'Coloca tiempos límite en dependencias y limita llamadas en vuelo para que una falla no ocupe todos los recursos. Un cortacircuitos puede dejar de llamar temporalmente a un proveedor que falla; un aislamiento por particiones evita que un cliente o tarea consuma toda la capacidad compartida.',
                    'Reintentar no siempre ayuda. Si todas las instancias repiten a la vez, se forma una tormenta. Usa esperas con variación, topes y condiciones explícitas. Cuando un servicio opcional no esté disponible, degrada solo la función afectada y comunica qué sigue siendo posible.'
                ]
            },
            {
                title: 'Continuidad y procedimientos ensayados',
                paragraphs: [
                    'Define el tiempo máximo tolerable de recuperación (RTO) y la pérdida de datos aceptable (RPO) para cada capacidad crítica. Esos objetivos orientan frecuencia de respaldos, replicación y estrategia de recuperación; no se cumplen por el simple hecho de tener una copia.',
                    'Escribe un procedimiento breve con síntomas, señales de diagnóstico, acciones seguras, condición de escalamiento y criterio de cierre. Ensaya restaurar datos y operar durante una dependencia caída en un entorno controlado. Registra el tiempo real y las sorpresas para mejorar el plan.'
                ],
                example: 'Si el proveedor de notificaciones falla, la solicitud puede guardarse y la notificación quedar pendiente en una cola. Si falla la verificación de permisos, en cambio, el sistema debe negar la operación y registrar el problema.'
            }
        ],
        exercise: 'Selecciona una dependencia crítica. Define su modo de fallo, tiempo límite, conducta de degradación segura, señal de alerta y paso de recuperación que ensayarías.'
    },
    {
        title: '20. Documentación técnica y transferencia de conocimiento',
        intro: 'La documentación útil permite que una persona distinta de quien escribió el código pueda comprender una decisión, ejecutar una tarea y recuperar un servicio.',
        sections: [
            {
                title: 'Escribir desde la pregunta del lector',
                paragraphs: [
                    'La guía de inicio debe permitir preparar el entorno, instalar dependencias, configurar variables y ejecutar pruebas desde una máquina limpia. Incluye requisitos, comandos esperados y errores frecuentes. Si un paso solo funciona después de una configuración personal no escrita, la guía no es reproducible.',
                    'Documenta los contratos cerca de su implementación y las decisiones duraderas en registros breves: contexto, alternativas, decisión, consecuencias y fecha. Evita duplicar explicaciones en muchos lugares; vincula la fuente principal para que un cambio no deje instrucciones contradictorias.'
                ]
            },
            {
                title: 'Operar sin depender de una sola persona',
                paragraphs: [
                    'Un runbook ayuda a detectar una alerta, confirmar su alcance, aplicar acciones seguras, escalar y validar la recuperación. Define comandos de lectura antes de comandos de cambio y aclara las condiciones para detenerse. No incluyas contraseñas, tokens ni datos personales en ejemplos.',
                    'Realiza una transferencia práctica: alguien que no diseñó el componente debe intentar desplegarlo o recuperarlo siguiendo la guía. Los puntos de confusión son señales concretas para mejorarla. Revisa procedimientos cuando cambian rutas, permisos, proveedores o responsables.'
                ]
            },
            {
                title: 'Conocimiento distribuido en el equipo',
                paragraphs: [
                    'La revisión por pares, el trabajo compartido y las demostraciones reducen dependencias individuales. Para decisiones de alto riesgo, identifica a más de una persona capaz de explicar y mantener el procedimiento; esto es continuidad, no burocracia.',
                    'Conserva lo que habilita una acción futura: instrucciones, contratos, diagramas con límites, riesgos aceptados y contexto de una decisión. Archiva lo que quedó obsoleto y señala explícitamente qué documentación ya no está vigente.'
                ],
                bullets: [
                    '¿Puede un integrante nuevo iniciar el proyecto sin instrucciones privadas?',
                    '¿La guía muestra cómo comprobar que cada paso tuvo éxito?',
                    '¿El runbook indica límites, escalamiento y validación final?',
                    '¿Los ejemplos usan datos ficticios y no revelan secretos?'
                ]
            }
        ],
        exercise: 'Escribe el inicio rápido de un proyecto y un procedimiento para responder a una alerta. Pide a otra persona seguirlos y modifica los pasos que no se entiendan.'
    }
];

const appendices = [
    {
        title: 'Apéndice A. Plantilla de historia y aceptación',
        body: [
            'Título: [resultado o capacidad]',
            'Como [tipo de usuario], quiero [capacidad], para [beneficio verificable].',
            'Contexto y restricciones: [datos, permisos, integraciones, límites].',
            'Criterios: dado [contexto], cuando [acción], entonces [resultado observable].',
            'Casos límite: [dato ausente, inválido, duplicado, permiso denegado, reintento].',
            'Métrica de éxito: [indicador, línea base y objetivo].',
            'Fuera de alcance: [lo que esta historia no resolverá].'
        ]
    },
    {
        title: 'Apéndice B. Registro de riesgos',
        body: [
            'Riesgo | Probabilidad | Impacto | Señal temprana | Mitigación | Responsable',
            'Dependencia externa | Baja/Media/Alta | Bajo/Medio/Alto | [señal] | [acción] | [persona]',
            'Datos incompletos | Baja/Media/Alta | Bajo/Medio/Alto | [señal] | [acción] | [persona]',
            'Acceso indebido | Baja/Media/Alta | Bajo/Medio/Alto | [señal] | [acción] | [persona]',
            'Capacidad operativa | Baja/Media/Alta | Bajo/Medio/Alto | [señal] | [acción] | [persona]'
        ]
    },
    {
        title: 'Apéndice C. Registro de decisión',
        body: [
            'Estado: propuesta, aceptada, sustituida o descartada.',
            'Contexto: ¿qué necesidad, restricción y evidencia motivan la decisión?',
            'Decisión: ¿qué alternativa se elige y qué límites tiene?',
            'Alternativas: ¿qué otras opciones se analizaron y por qué no se eligieron?',
            'Consecuencias: ¿qué beneficios, riesgos, costes y dependencias introduce?',
            'Revisión: ¿qué evidencia o fecha hará reconsiderar la decisión?'
        ]
    },
    {
        title: 'Apéndice D. Lista de revisión de lanzamiento',
        body: [
            'Necesidad, alcance y criterios de aceptación aprobados.',
            'Permisos comprobados en el servidor para cada recurso sensible.',
            'Secretos fuera del código y rotación documentada.',
            'Pruebas unitarias, de integración y recorridos críticos ejecutados.',
            'Migraciones revisadas, respaldos y recuperación probados.',
            'Métricas, logs, alertas y persona responsable definidos.',
            'Accesibilidad básica, errores y estados vacíos revisados.',
            'Plan de despliegue, comunicación y reversión disponible.'
        ]
    },
    {
        title: 'Apéndice E. Glosario esencial',
        body: [
            'API: contrato que permite a sistemas intercambiar operaciones y datos.',
            'Atributo de calidad: propiedad medible como seguridad, rendimiento o disponibilidad.',
            'Backlog: lista priorizada de necesidades y trabajo pendiente.',
            'CI/CD: prácticas para integrar, verificar y entregar cambios de forma automatizada.',
            'Idempotencia: propiedad por la que repetir una operación produce el mismo efecto final.',
            'MVP: versión mínima para probar una hipótesis de valor con riesgo controlado.',
            'Observabilidad: capacidad de inferir el estado interno a partir de métricas, logs y trazas.',
            'Requisito: necesidad o restricción que puede verificarse con evidencia.'
        ]
    },
    {
        title: 'Apéndice F. Diccionario de datos',
        body: [
            'Propósito: [qué proceso y pregunta de negocio cubre este conjunto de datos].',
            'Entidad: [nombre singular, descripción del hecho representado y propietario funcional].',
            'Campo | Tipo | Obligatorio | Regla | Sensibilidad | Retención.',
            'id | identificador estable | Sí | Único, no reutilizable | Interno | Vida del registro.',
            'estado | enumeración | Sí | Solo transiciones permitidas | Interno | Vida del registro.',
            'creado_en | instante UTC | Sí | Inmutable después de crear | Metadato | Según política.',
            'Relaciones: [clave primaria, claves foráneas, cardinalidad y política al borrar].',
            'Restricciones: [unicidad, rangos, valores admitidos y consistencia entre campos].',
            'Acceso: [roles que leen, crean, actualizan o eliminan y condiciones por recurso].',
            'Calidad: [validaciones, origen, reglas de conciliación y tratamiento de faltantes].',
            'Cambios: [responsable, migración requerida, compatibilidad y comprobación posterior].',
            'Antes de aprobar un modelo, revisa ejemplos válidos, inválidos, volumen esperado y consultas que deberán responderse.'
        ]
    },
    {
        title: 'Apéndice G. Plantilla de contrato API',
        body: [
            'Operación y propósito: [recurso, acción y resultado que espera el consumidor].',
            'Método y ruta: [GET/POST/PATCH/DELETE y patrón de ruta].',
            'Identidad y permiso: [autenticación, autorización por recurso y datos visibles].',
            'Entrada: [campos, tipos, obligatoriedad, longitud, enumeraciones y límites].',
            'Validación: [reglas, campos incompatibles y ejemplo de entrada rechazada].',
            'Éxito: [código HTTP, esquema de respuesta y ejemplo sin datos reales].',
            'Errores: [400/401/403/404/409/429/5xx, significado y acción del consumidor].',
            'Concurrencia: [control de versión, conflicto y forma de resolverlo].',
            'Repetición: [idempotencia, clave requerida, ventana y resultado duplicado].',
            'Límites: [paginación, tamaño máximo, tiempo límite y cuota por cliente].',
            'Evolución: [campos opcionales, compatibilidad, versión y política de retirada].',
            'Seguridad: validar cada campo en el servidor; no incluir secretos o atributos internos en la respuesta.'
        ]
    },
    {
        title: 'Apéndice H. Matriz de pruebas y criterios de salida',
        body: [
            'Historia o requisito: [referencia] | Riesgo cubierto: [impacto y probabilidad].',
            'Escenario | Datos iniciales | Acción | Resultado esperado | Capa | Evidencia.',
            'Camino válido | [estado inicial] | [operación permitida] | [cambio confirmado] | Unidad/Integración/E2E.',
            'Límite | [mínimo, máximo o valor vacío] | [entrada] | [regla aplicada sin truncamiento].',
            'Sin permiso | [actor distinto] | [consulta o cambio] | Acceso denegado sin filtrar datos.',
            'Duplicado o reintento | [misma clave] | [segunda solicitud] | Un solo efecto final.',
            'Fallo externo | [dependencia no disponible] | [operación] | Tiempo límite y error recuperable.',
            'Datos de prueba: sintéticos, aislados, reproducibles y sin credenciales de producción.',
            'Criterios de salida: pruebas relevantes aprobadas; defectos bloqueantes resueltos; riesgos restantes documentados.',
            'Falla intermitente: guardar resultado, fecha, entorno, logs y reproducción antes de cambiar la prueba.',
            'Excepción aceptada: [responsable, impacto, mitigación temporal y fecha de revisión].'
        ]
    },
    {
        title: 'Apéndice I. Guía de lanzamiento y operación',
        body: [
            'Versión y alcance: [artefacto, commit, funcionalidad y entornos].',
            'Responsables: [publicación, verificación, comunicación y escalamiento].',
            'Antes: comprobar pruebas, configuración, permisos, respaldo recuperable y compatibilidad de migración.',
            'Publicación: ejecutar el procedimiento aprobado y registrar la hora, versión y resultado de cada etapa.',
            'Verificación: consultar salud, errores, latencia y operación principal con datos de prueba permitidos.',
            'Éxito: [umbrales, observación mínima y responsable de decidir continuidad].',
            'Detención: [síntoma que bloquea el avance y persona autorizada para actuar].',
            'Reversión: [pasos de aplicación], [estrategia de datos] y comprobación de integridad posterior.',
            'Incidente: proteger usuarios y datos; comunicar impacto; registrar cronología y acciones ejecutadas.',
            'Cierre: confirmar servicio estable, pendientes asignados y participantes informados.',
            'No almacenes en este documento tokens, contraseñas, datos personales ni capturas con información sensible.'
        ]
    },
    {
        title: 'Apéndice J. Análisis posterior a un incidente',
        body: [
            'Resumen: [impacto en usuarios, capacidades afectadas y duración confirmada].',
            'Detección: [primera señal, hora, alerta y demora hasta reconocer el incidente].',
            'Cronología: [hora UTC] | [hecho observado] | [acción] | [resultado].',
            'Causa técnica: [condiciones que contribuyeron y evidencia disponible, sin atribuir culpa personal].',
            'Factores de detección: [qué señal faltó, sobró o llegó tarde].',
            'Recuperación: [qué restauró el servicio, qué datos se verificaron y qué quedó pendiente].',
            'Acción | Riesgo que reduce | Responsable | Fecha | Evidencia de cierre.',
            'Prioriza pocas acciones que eviten repetición o limiten impacto; evita convertir el análisis en una lista inasignable.',
            'Comparte el aprendizaje con los equipos afectados y revisa si el procedimiento de respuesta debe cambiar.'
        ]
    },
    {
        title: 'Apéndice K. Hoja de estimación y planificación',
        body: [
            'Resultado esperado: [cambio observable para usuario o negocio y forma de medirlo].',
            'Alcance: [incluido], [explícitamente excluido] y [criterios de aceptación].',
            'Supuestos: [condiciones que deben ser ciertas para realizar la estimación].',
            'Dependencias: [equipo, proveedor, datos, permiso, aprobación y fecha necesaria].',
            'Incertidumbres principales: [pregunta abierta], [impacto si es falsa] y [experimento].',
            'Incremento | Demostración utilizable | Esfuerzo relativo | Riesgo | Próxima decisión.',
            'Capacidad: restar soporte, interrupciones, vacaciones, revisión, pruebas y coordinación.',
            'Rango: indicar escenario favorable, probable y adverso; explicar qué información cambiaría el rango.',
            'Punto de revisión: [fecha o evidencia que obliga a volver a planificar].',
            'No presentar una estimación como garantía, precisión estadística o medida del rendimiento individual.'
        ]
    }
];

function addParagraph(doc, text) {
    doc.font('Helvetica').fontSize(10.5).fillColor('#263244')
        .text(text, { align: 'left', paragraphGap: 7, lineGap: 3 });
    doc.moveDown(0.35);
}

function drawArrow(doc, x1, y, x2, color) {
    doc.moveTo(x1, y).lineTo(x2 - 4, y).lineWidth(1.5).strokeColor(color).stroke();
    doc.moveTo(x2 - 8, y - 4).lineTo(x2 - 3, y).lineTo(x2 - 8, y + 4)
        .lineWidth(1.5).strokeColor(color).stroke();
}

function drawFlowDiagram(doc, x, y, width, steps, colors) {
    const gap = 19;
    const cardWidth = (width - gap * (steps.length - 1)) / steps.length;
    const cardY = y + 35;
    const cardHeight = 52;

    steps.forEach((step, index) => {
        const cardX = x + index * (cardWidth + gap);
        const color = colors[index % colors.length];
        doc.roundedRect(cardX, cardY, cardWidth, cardHeight, 7)
            .fillAndStroke('#ffffff', '#dce5f0');
        doc.roundedRect(cardX, cardY, 4, cardHeight, 2).fill(color);
        doc.fillColor(color).font('Helvetica-Bold').fontSize(8.5)
            .text(step.title, cardX + 10, cardY + 11, {
                width: cardWidth - 18,
                align: 'center',
                lineGap: 1
            });
        doc.fillColor('#64748b').font('Helvetica').fontSize(6.5)
            .text(step.detail, cardX + 8, cardY + 30, {
                width: cardWidth - 14,
                align: 'center',
                lineGap: 1
            });
        if (index < steps.length - 1) {
            const centerY = cardY + cardHeight / 2;
            drawArrow(doc, cardX + cardWidth + 2, centerY, cardX + cardWidth + gap - 2, '#93a4b8');
        }
    });
}

function drawArchitectureDiagram(doc, x, y, width) {
    const layers = [
        { title: 'EXPERIENCIA', detail: 'Interfaz y accesibilidad', color: '#2563eb' },
        { title: 'APLICACION', detail: 'Casos de uso y contratos', color: '#0f766e' },
        { title: 'DOMINIO', detail: 'Reglas e invariantes', color: '#7c3aed' },
        { title: 'ADAPTADORES', detail: 'API, SQL y servicios', color: '#d97706' }
    ];
    const gap = 7;
    const cardWidth = (width - gap * (layers.length - 1)) / layers.length;

    layers.forEach((layer, index) => {
        const cardX = x + index * (cardWidth + gap);
        const cardY = y + 37;
        doc.roundedRect(cardX, cardY, cardWidth, 48, 6).fill('#ffffff');
        doc.roundedRect(cardX, cardY, cardWidth, 4, 2).fill(layer.color);
        doc.fillColor(layer.color).font('Helvetica-Bold').fontSize(7.2)
            .text(layer.title, cardX + 4, cardY + 12, { width: cardWidth - 8, align: 'center' });
        doc.fillColor('#64748b').font('Helvetica').fontSize(6.2)
            .text(layer.detail, cardX + 5, cardY + 27, {
                width: cardWidth - 10,
                align: 'center',
                lineGap: 1
            });
        if (index < layers.length - 1) {
            drawArrow(doc, cardX + cardWidth + 1, cardY + 24, cardX + cardWidth + gap - 1, '#93a4b8');
        }
    });
}

function drawTestingPyramid(doc, x, y, width) {
    const center = x + width / 2;
    const top = y + 32;
    const bands = [
        { topWidth: 85, bottomWidth: 132, label: 'EXTREMO A EXTREMO', detail: 'Pocos recorridos clave', color: '#7c3aed' },
        { topWidth: 132, bottomWidth: 180, label: 'INTEGRACION', detail: 'Límites y dependencias', color: '#2563eb' },
        { topWidth: 180, bottomWidth: 228, label: 'UNITARIAS', detail: 'Muchas reglas rápidas', color: '#0f766e' }
    ];

    bands.forEach((band, index) => {
        const bandY = top + index * 25;
        const leftTop = center - band.topWidth / 2;
        const rightTop = center + band.topWidth / 2;
        const leftBottom = center - band.bottomWidth / 2;
        const rightBottom = center + band.bottomWidth / 2;
        doc.moveTo(leftTop, bandY)
            .lineTo(rightTop, bandY)
            .lineTo(rightBottom, bandY + 23)
            .lineTo(leftBottom, bandY + 23)
            .closePath()
            .fillAndStroke(band.color, '#ffffff');
        doc.fillColor('#ffffff').font('Helvetica-Bold').fontSize(7.3)
            .text(band.label, center - band.bottomWidth / 2, bandY + 3, {
                width: band.bottomWidth,
                align: 'center'
            });
        doc.fillColor('#eaf1ff').font('Helvetica').fontSize(6.2)
            .text(band.detail, center - band.bottomWidth / 2, bandY + 13, {
                width: band.bottomWidth,
                align: 'center'
            });
    });
}

function drawObservabilityDiagram(doc, x, y, width) {
    const sources = [
        { title: 'MÉTRICAS', detail: 'Tendencias y límites', color: '#2563eb', value: '99.9%' },
        { title: 'LOGS', detail: 'Eventos con contexto', color: '#0f766e', value: 'evento' },
        { title: 'TRAZAS', detail: 'Recorrido de petición', color: '#7c3aed', value: 'A > B > C' }
    ];
    const gap = 10;
    const cardWidth = (width - gap * (sources.length - 1) - 28) / sources.length;
    const startX = x + 14;

    sources.forEach((source, index) => {
        const cardX = startX + index * (cardWidth + gap);
        const cardY = y + 34;
        doc.roundedRect(cardX, cardY, cardWidth, 54, 7).fill('#ffffff');
        doc.fillColor(source.color).font('Helvetica-Bold').fontSize(7.5)
            .text(source.title, cardX + 8, cardY + 8, { width: cardWidth - 16, align: 'center' });
        doc.fillColor(source.color).font('Helvetica-Bold').fontSize(11)
            .text(source.value, cardX + 6, cardY + 21, { width: cardWidth - 12, align: 'center' });
        doc.fillColor('#64748b').font('Helvetica').fontSize(6.2)
            .text(source.detail, cardX + 5, cardY + 40, {
                width: cardWidth - 10,
                align: 'center'
            });
    });
    doc.fillColor('#52627a').font('Helvetica-Bold').fontSize(7.3)
        .text('SENALES + UMBRALES + RESPUESTA', x, y + 96, { width, align: 'center' });
}

function drawSecurityDiagram(doc, x, y, width) {
    const centerX = x + width / 2;
    const cards = [
        { title: 'IDENTIDAD', color: '#2563eb' },
        { title: 'PERMISO', color: '#7c3aed' },
        { title: 'VALIDACIÓN', color: '#0f766e' },
        { title: 'AUDITORÍA', color: '#d97706' }
    ];
    const gap = 8;
    const cardWidth = (width - 16 - gap * (cards.length - 1)) / cards.length;
    const startX = x + 8;

    cards.forEach((card, index) => {
        const cardX = startX + index * (cardWidth + gap);
        const cardY = y + 37;
        doc.roundedRect(cardX, cardY, cardWidth, 32, 6).fillAndStroke('#ffffff', '#dce5f0');
        doc.circle(cardX + 12, cardY + 16, 3).fill(card.color);
        doc.fillColor(card.color).font('Helvetica-Bold').fontSize(7.5)
            .text(card.title, cardX + 20, cardY + 11, { width: cardWidth - 24 });
    });
    doc.moveTo(centerX, y + 70).lineTo(centerX, y + 82).lineWidth(1.5)
        .strokeColor('#93a4b8').stroke();
    doc.roundedRect(centerX - 83, y + 82, 166, 19, 6).fill('#14233b');
    doc.fillColor('#ffffff').font('Helvetica-Bold').fontSize(7.5)
        .text('RECURSO PROTEGIDO', centerX - 80, y + 88, { width: 160, align: 'center' });
}

function drawCoverIllustration(doc, left, width) {
    const center = left + width / 2;
    const cardY = 536;
    const cards = [
        { x: center - 154, y: cardY + 16, w: 82, color: '#0f766e', label: 'NECESIDAD' },
        { x: center - 41, y: cardY, w: 82, color: '#2563eb', label: 'SOLUCIÓN' },
        { x: center + 72, y: cardY + 16, w: 82, color: '#7c3aed', label: 'VALOR' }
    ];

    doc.save();
    doc.opacity(0.18).circle(center, cardY + 37, 126).fill('#5da8ff');
    doc.opacity(1);
    cards.forEach((card, index) => {
        const midY = card.y + 28;
        doc.roundedRect(card.x, card.y, card.w, 56, 9).fillAndStroke('#1c2c49', '#3d5275');
        doc.roundedRect(card.x, card.y, card.w, 4, 2).fill(card.color);
        doc.circle(card.x + card.w / 2, card.y + 22, 7).fill(card.color);
        doc.fillColor('#ffffff').font('Helvetica-Bold').fontSize(7)
            .text(card.label, card.x + 5, card.y + 39, { width: card.w - 10, align: 'center' });
        if (index < cards.length - 1) {
            const next = cards[index + 1];
            drawArrow(doc, card.x + card.w + 5, midY, next.x - 5, '#8ebfff');
        }
    });
    doc.restore();
}

function drawChapterIllustration(doc, chapter, index, left, width) {
    const top = doc.y + 2;
    const height = 122;
    const colors = ['#2563eb', '#0f766e', '#7c3aed', '#d97706'];
    const flowSteps = [
        [
            { title: 'OBSERVAR', detail: 'Personas y contexto' },
            { title: 'EVIDENCIA', detail: 'Hechos verificables' },
            { title: 'HIPÓTESIS', detail: 'Necesidad concreta' },
            { title: 'RESULTADO', detail: 'Impacto medible' }
        ],
        [
            { title: 'NECESIDAD', detail: 'Problema real' },
            { title: 'HISTORIA', detail: 'Valor esperado' },
            { title: 'CRITERIOS', detail: 'Reglas observables' },
            { title: 'PRUEBA', detail: 'Evidencia de éxito' }
        ],
        [
            { title: 'PLANEAR', detail: 'Elegir un objetivo' },
            { title: 'CONSTRUIR', detail: 'Entregar pequeño' },
            { title: 'REVISAR', detail: 'Obtener feedback' },
            { title: 'APRENDER', detail: 'Ajustar el plan' }
        ],
        [
            { title: 'ESCRIBIR', detail: 'Cambio pequeño' },
            { title: 'VALIDAR', detail: 'Pruebas y revision' },
            { title: 'PUBLICAR', detail: 'Version verificada' },
            { title: 'OBSERVAR', detail: 'Salud del servicio' }
        ],
        [
            { title: 'MEDIR', detail: 'Linea base' },
            { title: 'PRIORIZAR', detail: 'Riesgo y valor' },
            { title: 'MEJORAR', detail: 'Cambio gradual' },
            { title: 'REVISAR', detail: 'Resultado real' }
        ],
        [
            { title: 'SOLICITAR', detail: 'Actor identificado' },
            { title: 'VALIDAR', detail: 'Reglas y permisos' },
            { title: 'ASIGNAR', detail: 'Responsable visible' },
            { title: 'RESOLVER', detail: 'Estado y evidencia' }
        ],
        [
            { title: 'DESCOMPONER', detail: 'Entrega pequena' },
            { title: 'ESTIMAR', detail: 'Supuestos visibles' },
            { title: 'PRIORIZAR', detail: 'Riesgo y valor' },
            { title: 'REVISAR', detail: 'Plan con evidencia' }
        ],
        [
            { title: 'ENTENDER', detail: 'Tarea del usuario' },
            { title: 'PROTOTIPAR', detail: 'Probar opciones' },
            { title: 'OBSERVAR', detail: 'Detectar friccion' },
            { title: 'MEJORAR', detail: 'Validar acceso' }
        ],
        [
            { title: 'MODELAR', detail: 'Entidades y reglas' },
            { title: 'RESTRINGIR', detail: 'Claves e integridad' },
            { title: 'PROTEGER', detail: 'Transaccion segura' },
            { title: 'MIGRAR', detail: 'Cambio compatible' }
        ],
        [
            { title: 'DEFINIR', detail: 'Contrato y permisos' },
            { title: 'VALIDAR', detail: 'Entrada confiable' },
            { title: 'PROCESAR', detail: 'Efecto idempotente' },
            { title: 'RESPONDER', detail: 'Resultado claro' }
        ],
        [
            { title: 'ELEGIR', detail: 'Riesgos criticos' },
            { title: 'DISEÑAR', detail: 'Casos y limites' },
            { title: 'EJECUTAR', detail: 'Capas adecuadas' },
            { title: 'APRENDER', detail: 'Fallas observadas' }
        ],
        [
            { title: 'MEDIR', detail: 'Carga realista' },
            { title: 'PERFILAR', detail: 'Cuello de botella' },
            { title: 'MEJORAR', detail: 'Cambio focalizado' },
            { title: 'COMPROBAR', detail: 'Calidad y costo' }
        ],
        [
            { title: 'DEFINIR SLO', detail: 'Experiencia clave' },
            { title: 'AISLAR', detail: 'Limites y tiempos' },
            { title: 'RECUPERAR', detail: 'Plan ensayado' },
            { title: 'APRENDER', detail: 'Acciones concretas' }
        ],
        [
            { title: 'PREGUNTA', detail: 'Quien lo consulta' },
            { title: 'DOCUMENTAR', detail: 'Paso verificable' },
            { title: 'TRANSFERIR', detail: 'Persona distinta' },
            { title: 'MANTENER', detail: 'Revisar vigencia' }
        ]
    ];

    doc.roundedRect(left, top, width, height, 10).fillAndStroke('#f1f5fb', '#dce6f2');
    doc.fillColor('#2563eb').font('Helvetica-Bold').fontSize(7.2)
        .text(`MAPA VISUAL  /  ${String(index + 1).padStart(2, '0')}`, left + 14, top + 11, {
            characterSpacing: 0.5
        });
    doc.fillColor('#64748b').font('Helvetica').fontSize(7.2)
        .text(chapter.title.replace(/^\d+\.\s*/, ''), left + 14, top + 22, {
            width: width - 28
        });

    if (index === 3) {
        drawArchitectureDiagram(doc, left + 14, top, width - 28);
    } else if (index === 6) {
        drawTestingPyramid(doc, left + 14, top, width - 28);
    } else if (index === 7) {
        drawSecurityDiagram(doc, left + 14, top, width - 28);
    } else if (index === 9) {
        drawObservabilityDiagram(doc, left + 14, top, width - 28);
    } else {
        const steps = flowSteps[index] || [
            { title: 'ENTRADA', detail: 'Datos y contexto' },
            { title: 'PROCESO', detail: 'Reglas explicitas' },
            { title: 'CONTROL', detail: 'Validación' },
            { title: 'SALIDA', detail: 'Resultado confiable' }
        ];
        drawFlowDiagram(doc, left + 14, top, width - 28, steps, colors);
    }
    doc.x = left;
    doc.y = top + height + 9;
}

function renderEbook(doc) {
    const left = doc.page.margins.left;
    const width = doc.page.width - left - doc.page.margins.right;

    doc.rect(0, 0, doc.page.width, doc.page.height).fill('#101c33');
    doc.fillColor('#5da8ff').font('Helvetica-Bold').fontSize(12)
        .text('DEVBOOK  /  BIBLIOTECA PROFESIONAL', left, 112, { characterSpacing: 1.2 });
    doc.fillColor('#ffffff').font('Helvetica-Bold').fontSize(31)
        .text('Análisis y desarrollo de software', left, 190, { width, lineGap: 5 });
    doc.fillColor('#c5d4e8').font('Helvetica').fontSize(15)
        .text('Guía práctica para convertir problemas reales en productos confiables, seguros y mantenibles.', left, 300, { width, lineGap: 4 });
    doc.moveTo(left, 390).lineTo(left + 95, 390).lineWidth(3).stroke('#3b82f6');
    doc.fillColor('#dbeafe').font('Helvetica').fontSize(11)
        .text('Fundamentos, ejemplos, ejercicios y plantillas para principiantes e intermedios', left, 420, { width });
    doc.fillColor('#94a3b8').fontSize(10)
        .text('EDICIÓN 2026  |  DEVBOOK', left, doc.page.height - 110);
    drawCoverIllustration(doc, left, width);

    doc.addPage();
    doc.fillColor('#14233b').font('Helvetica-Bold').fontSize(23).text('Cómo usar esta guía');
    doc.moveDown(0.8);
    addParagraph(doc, 'Este libro presenta un recorrido práctico por el análisis, el diseño, la construcción, la validación y la operación de software. Está dirigido a personas que comienzan a trabajar en proyectos y a quienes desean ordenar sus prácticas.');
    addParagraph(doc, 'Cada capítulo combina conceptos, decisiones, ejemplos y un ejercicio. Puedes leerlo de principio a fin o consultar una sección al preparar una tarea. Los ejemplos son material educativo: adapta controles de seguridad, privacidad, regulación y operación al contexto de tu organización.');
    addParagraph(doc, 'La ingeniería de software es trabajo colaborativo. Valida las hipótesis con usuarios, revisa las decisiones con el equipo y utiliza evidencia para mejorar el producto. Ninguna tecnología compensa un problema mal entendido.');
    doc.moveDown();
    doc.fillColor('#14233b').font('Helvetica-Bold').fontSize(18).text('Contenido');
    doc.moveDown(0.4);
    chapters.forEach(chapter => {
        doc.font('Helvetica').fontSize(10.5).fillColor('#263244')
            .text(chapter.title, { indent: 6, paragraphGap: 5 });
    });
    appendices.forEach(appendix => {
        doc.font('Helvetica').fontSize(10.5).fillColor('#263244')
            .text(appendix.title, { indent: 6, paragraphGap: 5 });
    });

    chapters.forEach((chapter, index) => {
        const spaceForChapterStart = 230;
        const pageContentBottom = doc.page.height - doc.page.margins.bottom;
        if (index === 0 || doc.y > pageContentBottom - spaceForChapterStart) {
            doc.addPage();
        } else {
            doc.moveDown(1);
        }
        doc.fillColor('#2563eb').font('Helvetica-Bold').fontSize(10)
            .text('GUÍA DE ANÁLISIS Y DESARROLLO', { characterSpacing: 1 });
        doc.moveDown(0.7);
        doc.fillColor('#14233b').font('Helvetica-Bold').fontSize(23)
            .text(chapter.title, { width, lineGap: 4 });
        doc.moveDown(0.55);
        doc.fillColor('#52627a').font('Helvetica-Oblique').fontSize(11)
            .text(chapter.intro, { width, lineGap: 3 });
        doc.moveDown(0.8);
        drawChapterIllustration(doc, chapter, index, left, width);

        chapter.sections.forEach(section => {
            doc.fillColor('#1d4ed8').font('Helvetica-Bold').fontSize(14)
                .text(section.title, { width, lineGap: 2 });
            doc.moveDown(0.35);
            section.paragraphs.forEach(paragraph => addParagraph(doc, paragraph));
            if (section.bullets) {
                section.bullets.forEach(bullet => {
                    doc.font('Helvetica').fontSize(10.5).fillColor('#263244')
                        .text(`- ${bullet}`, { indent: 12, width, lineGap: 2 });
                    doc.moveDown(0.2);
                });
                doc.moveDown(0.3);
            }
            if (section.example) {
                doc.moveDown(0.15);
                doc.fillColor('#1e3a5f').font('Helvetica-Bold').fontSize(9.5)
                    .text('EJEMPLO APLICADO', { characterSpacing: 0.5 });
                doc.font('Helvetica').fontSize(10).fillColor('#334155')
                    .text(section.example, { width, lineGap: 3 });
                doc.moveDown(0.7);
            }
        });

        doc.moveDown(0.4);
        doc.fillColor('#0f766e').font('Helvetica-Bold').fontSize(11).text('EJERCICIO');
        doc.font('Helvetica').fontSize(10.5).fillColor('#263244')
            .text(chapter.exercise, { width, lineGap: 3 });
    });

    appendices.forEach(appendix => {
        doc.addPage();
        doc.fillColor('#14233b').font('Helvetica-Bold').fontSize(21)
            .text(appendix.title, { width, lineGap: 4 });
        doc.moveDown(0.8);
        appendix.body.forEach(item => {
            addParagraph(doc, item);
        });
    });

    const pages = doc.bufferedPageRange();
    for (let index = 1; index < pages.count; index += 1) {
        doc.switchToPage(index);
        const bottomMargin = doc.page.margins.bottom;
        doc.page.margins.bottom = 24;
        const y = doc.page.height - 43;
        doc.moveTo(left, y - 10).lineTo(left + width, y - 10).lineWidth(0.5).stroke('#d6deea');
        doc.fillColor('#64748b').font('Helvetica').fontSize(8)
            .text('DEVBOOK  |  MATERIAL EDUCATIVO', left, y, { width: width / 2, lineBreak: false });
        doc.text(String(index + 1), left + width / 2, y, {
            width: width / 2,
            align: 'right',
            lineBreak: false
        });
        doc.page.margins.bottom = bottomMargin;
    }
    doc.end();
}

module.exports = { renderEbook };
