# Modo oscuro y cómo está montado

Aquí te explico en lenguaje natural cómo implementé el modo oscuro en toda la web, qué ficheros toqué y cómo funciona.

## Archivos clave
- `style/theme.css`: hoja de estilos global para el modo claro/oscuro. Define las variables de color y los ajustes específicos para elementos que fallaban en oscuro (opiniones, FAQ, login, registro, inputs, botones, etc.).
- `script/theme.js`: lógica sencilla del toggle de tema. Añade/quita la clase `theme-dark` en `<body>` y guarda la preferencia en `localStorage`.
- Todos los HTML (`index.html`, `pagina_principal.html`, `resultados.html`, `perfil.html`, `compra.html`, `pagina_ayuda.html`, `formulario_sesion.html`, `formulario_registro.html`, `newlester.html`) enlazan `style/theme.css` y `script/theme.js`, y llevan un botón con `id="theme-toggle"` en el header.

## Cómo funciona el theming
1. **Variables de color**:  
   - Tema claro (`:root`): `--bg`, `--text`, `--card`, `--border`, `--muted`, `--header-bg`, `--link`.  
   - Tema oscuro (`.theme-dark`): las mismas variables, pero con valores oscuros/claros invertidos.
2. **Aplicación básica**:  
   - `body` usa `var(--bg)` y `var(--text)`.  
   - Headers usan `--header-bg` y `--text`.  
   - Enlaces usan `--link`.  
   - El botón del tema (`.btn-theme`) tiene un estilo neutro que funciona en ambos modos.
3. **Elementos que necesitaban fixes en oscuro**:  
   - Opiniones (`.opinion-card`): fondo y borde con `--card`/`--border`, texto con `--text`.  
   - FAQ (`.caja-preguntas .pregunta`, `.parrafo-pregunta`, botones): mismo ajuste de fondo/borde/texto.  
   - Login y registro (`body.sesion-body`, `body.registro-body`): fondo y texto del tema; inputs/selects/textarea y botones de subir usan `--card`, `--border`, `--text`; labels y texto legal usan `--text`. Así evito fondos blancos en oscuro.
4. **Toggle y persistencia** (`script/theme.js`):  
   - Clave `theme` en `localStorage` (valor `"dark"` o `"light"`).  
   - Al cargar, lee `localStorage`: si ve `"dark"`, añade `.theme-dark` a `<body>` y cambia el texto del botón a “Modo claro”; si no, deja el tema claro y el botón en “Modo oscuro”.  
   - Al pulsar el botón con `id="theme-toggle"`, alterna la clase en `<body>`, actualiza el texto y guarda la preferencia.
5. **Compatibilidad con el resto**:  
   - No se tocaron las estructuras de los headers; solo se añadió el toggle en la zona de opciones.  
   - El modo oscuro convive con el selector de moneda y con el CSS de moneda (`style/currency-ui.css`) sin conflictos.

## Qué verás en cada página
- **Resultados (opiniones)**: las tarjetas ya se leen en oscuro (fondo `--card`, texto claro).  
- **FAQ (ayuda)**: cada fila de pregunta tiene fondo/borde visibles en oscuro, texto legible.  
- **Login y Registro**: el fondo de la página cambia a `--bg`; inputs, selects y textarea usan `--card` y texto claro; labels y textos legales cambian a `--text`. No quedan zonas blancas.  
- **Resto de páginas**: heredan el fondo y texto por las variables; headers adoptan el fondo del tema.

## Cómo probar rápidamente
1) En cualquier página, pulsa “Modo oscuro” en el header: se activa `.theme-dark` en `<body>` y se cambia el texto del botón a “Modo claro”.  
2) Navega a `formulario_sesion.html` y `formulario_registro.html`: comprueba que el fondo ya no es blanco, inputs y textos se ven en oscuro.  
3) Abre `pagina_ayuda.html`: las filas de preguntas tienen contraste.  
4) Vuelve a `resultados.html`: las tarjetas de opiniones son legibles.  
5) Recarga la página: el modo elegido se mantiene (persistencia en `localStorage`).

## Si quieres ajustar algo
- Colores: toca los valores de `--bg`, `--text`, `--card`, `--border`, etc., en `style/theme.css`.  
- Texto del botón: cambia los literales en `script/theme.js` (`"Modo oscuro"` / `"Modo claro"`).  
- Si añades nuevas páginas, asegúrate de incluir el link a `style/theme.css`, el script `theme.js` y el botón `#theme-toggle` en el header.
