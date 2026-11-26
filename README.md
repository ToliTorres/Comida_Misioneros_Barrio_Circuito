# Calendario · Comida Misioneros

Página web gratuita (GitHub Pages) que muestra el calendario mensual de comidas,
leyendo los datos de una hoja de Google. Pensada primero para celular.

## Archivos

| Archivo | Para qué |
|---|---|
| `index.html` | La página |
| `estilos.css` | Colores y diseño |
| `app.js` | Lee la hoja de Google y arma el calendario |
| `temas.js` | Diseños de temporada (navidad, general…) |
| `config.js` | **Aquí pegas el ID de tu hoja de Google** |

## 1. Preparar la hoja de Google (una sola vez)

1. Sube `Calendario_Misioneros_Barrio_Circuito.xlsx` a Google Drive.
2. Ábrelo y ve a **Archivo › Guardar como Hojas de cálculo de Google**
   (la página no puede leer un .xlsx directamente; usa la copia nueva).
3. **Compartir › Acceso general › Cualquier persona con el enlace › Lector**.
4. Copia el ID del enlace: `https://docs.google.com/spreadsheets/d/`**`ESTE_ES_EL_ID`**`/edit`

No cambies los nombres de las pestañas (`Calendario` y `Config`) ni de las columnas.

## 2. Publicar en GitHub Pages

1. En GitHub: **New repository** (público), por ejemplo `calendario-misioneros`.
2. **Add file › Upload files** y sube los 5 archivos de esta carpeta.
3. Abre `config.js` en GitHub (ícono del lápiz), pega el ID en `SHEET_ID: "..."` y guarda (*Commit changes*).
4. **Settings › Pages › Branch: main / (root) › Save**.
5. En 1–2 minutos tu página estará en `https://TU_USUARIO.github.io/calendario-misioneros/`.

## 3. Cada mes

Solo editas la hoja de Google:

- Pestaña **Calendario**: una fila por persona/familia y día
  (`Dia`, `Nombre`, `Comen con`, `Misioneros`, `Telefono`). Si un día tiene dos familias, pon dos filas con el mismo día.
- Pestaña **Config**: `mes`, `anio`, `frase`, `tema`.

La página se actualiza sola al recargar. Si quieres un diseño nuevo de temporada
(ej. enero, primavera), se agrega un tema en `temas.js` y se escribe su nombre en `tema`.

## Consejos

- Si algún dato no aparece, selecciona la columna en Google Sheets y elige
  **Formato › Número › Texto sin formato** (Google a veces ignora celdas con mezcla de números y texto).
- Los teléfonos no se muestran hasta tocar **Ver teléfono**, y la página es solo de lectura.
  Aun así, ten presente que cualquiera con el enlace de la página o de la hoja podría ver los números;
  compártelo solo con el grupo.
