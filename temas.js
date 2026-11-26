/*
 * TEMAS DE TEMPORADA
 * En la hoja "Config" escribe el nombre del tema en la clave "tema" (ej. navidad).
 * Cada tema define: colores pastel, frase por defecto, escena del encabezado,
 * adornos colgantes y partículas animadas (nieve, burbujas...).
 */
window.TEMAS = {

  /* ───────────────────────── NAVIDAD ───────────────────────── */
  navidad: {
    colores: {
      "--bg": "#fbf5ef",
      "--bg-2": "#f3eef8",
      "--ink": "#4b3f52",
      "--muted": "#8c8091",
      "--card": "#fffdfb",
      "--line": "#efe3dc",
      "--accent": "#e48e9c",
      "--accent-soft": "#fbe3e7",
      "--accent-2": "#8fcbb4",
      "--gold": "#f0c96e",
      "--wd-0": "#eef1e8", /* lunes */
      "--wd-1": "#e1f3ea", /* martes */
      "--wd-2": "#fce4e8", /* miércoles */
      "--wd-3": "#ece5f7", /* jueves */
      "--wd-4": "#fdf2d3", /* viernes */
      "--wd-5": "#e0edfa", /* sábado */
      "--wd-6": "#fde6d8"  /* domingo */
    },
    frase: "Servir con amor es la luz más bonita de la Navidad ✨",
    particulas: "nieve",
    escena: function () {
      return `
<svg class="escena" viewBox="0 0 360 215" role="img" aria-label="Nacimiento de Jesús: María, José y el niño en el pesebre bajo la estrella de Belén">
  <defs>
    <radialGradient id="glow" cx="50%" cy="55%" r="50%">
      <stop offset="0%" stop-color="#fff3c4" stop-opacity=".95"/>
      <stop offset="60%" stop-color="#fde7b0" stop-opacity=".35"/>
      <stop offset="100%" stop-color="#fde7b0" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="beam" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#ffe9a8" stop-opacity=".85"/>
      <stop offset="100%" stop-color="#ffe9a8" stop-opacity="0"/>
    </linearGradient>
  </defs>

  <circle cx="180" cy="130" r="120" fill="url(#glow)" class="anim-glow"/>

  <!-- estrellitas -->
  <g fill="#f0c96e">
    <circle class="tw d1" cx="40"  cy="40" r="2"/>
    <circle class="tw d2" cx="80"  cy="18" r="1.6"/>
    <circle class="tw d3" cx="300" cy="30" r="2"/>
    <circle class="tw d4" cx="330" cy="70" r="1.5"/>
    <circle class="tw d2" cx="250" cy="14" r="1.4"/>
    <circle class="tw d1" cx="115" cy="50" r="1.4"/>
    <circle class="tw d3" cx="22"  cy="92" r="1.4"/>
  </g>

  <!-- colina -->
  <path d="M0 196 Q70 170 150 180 T360 186 V215 H0Z" fill="#cfe8dc"/>
  <path d="M0 206 Q120 188 220 198 T360 202 V215 H0Z" fill="#bfe0d0"/>

  <!-- rayo de la estrella -->
  <polygon class="anim-beam" points="176,42 184,42 206,168 154,168" fill="url(#beam)"/>

  <!-- establo -->
  <rect x="112" y="104" width="136" height="80" rx="4" fill="#f7e6d3"/>
  <rect x="112" y="104" width="136" height="80" rx="4" fill="url(#glow)" opacity=".6"/>
  <rect x="113" y="104" width="8" height="82" rx="3" fill="#c49779"/>
  <rect x="239" y="104" width="8" height="82" rx="3" fill="#c49779"/>
  <path d="M96 112 L180 64 L264 112 L256 119 L180 76 L104 119 Z" fill="#c9957a"/>
  <path d="M104 119 L180 76 L256 119" fill="none" stroke="#e8c3a5" stroke-width="2" stroke-linecap="round"/>

  <!-- estrella de Belén -->
  <g class="anim-star" transform="translate(180 34)">
    <g class="rays" stroke="#f6d98c" stroke-width="2" stroke-linecap="round" opacity=".8">
      <line x1="0" y1="-24" x2="0" y2="-16"/><line x1="0" y1="16" x2="0" y2="26"/>
      <line x1="-24" y1="0" x2="-16" y2="0"/><line x1="16" y1="0" x2="24" y2="0"/>
      <line x1="-15" y1="-15" x2="-11" y2="-11"/><line x1="15" y1="15" x2="11" y2="11"/>
      <line x1="15" y1="-15" x2="11" y2="-11"/><line x1="-15" y1="15" x2="-11" y2="11"/>
    </g>
    <path d="M0 -13 L3.6 -4.2 L13 -4 L5.6 2 L8 11 L0 5.8 L-8 11 L-5.6 2 L-13 -4 L-3.6 -4.2 Z" fill="#f0c96e" stroke="#e7b84f" stroke-width="1" stroke-linejoin="round"/>
  </g>

  <!-- María -->
  <g class="anim-breathe" style="transform-origin:141px 176px">
    <path d="M124 178 Q122 146 141 124 Q160 146 158 178 Z" fill="#a9c9ee"/>
    <path d="M128 132 Q128 104 141 104 Q154 104 154 132 Q148 128 141 128 Q134 128 128 132Z" fill="#88b0e0"/>
    <circle cx="141" cy="117" r="7" fill="#f5d4bd"/>
    <path d="M136 147 Q141 141 147 147" fill="none" stroke="#f5d4bd" stroke-width="4" stroke-linecap="round"/>
  </g>

  <!-- José -->
  <g class="anim-breathe d2" style="transform-origin:220px 180px">
    <line x1="238" y1="92" x2="238" y2="180" stroke="#a87c5e" stroke-width="3" stroke-linecap="round"/>
    <path d="M238 92 Q238 84 232 85" fill="none" stroke="#a87c5e" stroke-width="3" stroke-linecap="round"/>
    <path d="M204 180 Q204 132 220 112 Q236 132 236 180 Z" fill="#dcbc9d"/>
    <path d="M210 180 Q212 140 220 126 Q228 140 230 180 Z" fill="#c9a483"/>
    <path d="M209 112 Q209 92 220 92 Q231 92 231 112 Q226 106 220 106 Q214 106 209 112Z" fill="#b8d9c9"/>
    <circle cx="220" cy="104" r="7" fill="#f5d4bd"/>
    <path d="M213.5 106 Q220 119 226.5 106 Q226 113 220 114 Q214 113 213.5 106Z" fill="#8f705c"/>
  </g>

  <!-- pesebre y niño Jesús -->
  <g>
    <line x1="166" y1="168" x2="160" y2="184" stroke="#b9876a" stroke-width="3" stroke-linecap="round"/>
    <line x1="194" y1="168" x2="200" y2="184" stroke="#b9876a" stroke-width="3" stroke-linecap="round"/>
    <circle class="anim-halo" cx="170" cy="151" r="11" fill="#fff2bf" opacity=".9"/>
    <path d="M156 156 l5 -6 l4 5 l4 -6 l4 6 l4 -6 l4 6 l4 -6 l4 5 l5 -2 l-2 8 h-36 Z" fill="#f2d68a"/>
    <ellipse cx="183" cy="153" rx="13" ry="5.5" fill="#fffaf2" stroke="#eadccb"/>
    <circle cx="170" cy="152" r="5" fill="#f5d4bd"/>
    <path d="M158 157 H202 L196 172 H164 Z" fill="#d9a983"/>
    <path d="M161 164 H199" stroke="#c8936d" stroke-width="1.5"/>
  </g>

  <!-- ovejitas -->
  <g class="anim-bob" style="transform-origin:62px 190px">
    <g fill="#fffdf9" stroke="#e9e0d6">
      <circle cx="54" cy="184" r="8"/><circle cx="64" cy="181" r="9"/><circle cx="74" cy="185" r="8"/><circle cx="64" cy="189" r="8"/>
    </g>
    <ellipse cx="82" cy="182" rx="5" ry="4.5" fill="#857179"/>
    <line x1="58" y1="195" x2="58" y2="201" stroke="#857179" stroke-width="2.4" stroke-linecap="round"/>
    <line x1="70" y1="195" x2="70" y2="201" stroke="#857179" stroke-width="2.4" stroke-linecap="round"/>
  </g>
  <g class="anim-bob d3" style="transform-origin:300px 192px">
    <g fill="#fffdf9" stroke="#e9e0d6">
      <circle cx="294" cy="188" r="6.5"/><circle cx="302" cy="185" r="7.5"/><circle cx="310" cy="189" r="6.5"/><circle cx="302" cy="192" r="6.5"/>
    </g>
    <ellipse cx="288" cy="186" rx="4" ry="3.6" fill="#857179"/>
    <line x1="297" y1="197" x2="297" y2="202" stroke="#857179" stroke-width="2" stroke-linecap="round"/>
    <line x1="307" y1="197" x2="307" y2="202" stroke="#857179" stroke-width="2" stroke-linecap="round"/>
  </g>
</svg>`;
    },
    // Adornos que cuelgan en las esquinas del encabezado
    adornos: function () {
      const bola = (x, largo, color, d, r) => `
        <g class="swing ${d}" style="transform-origin:${x}px 0px">
          <line x1="${x}" y1="0" x2="${x}" y2="${largo}" stroke="#d9c7bd" stroke-width="1.2"/>
          <rect x="${x - 3.5}" y="${largo}" width="7" height="5" rx="1.5" fill="#e6c77c"/>
          <circle cx="${x}" cy="${largo + 5 + r}" r="${r}" fill="${color}"/>
          <circle cx="${x - r / 3}" cy="${largo + 5 + r / 1.6}" r="${r / 3.5}" fill="#fff" opacity=".7"/>
        </g>`;
      const estrella = (x, largo, d) => `
        <g class="swing ${d}" style="transform-origin:${x}px 0px">
          <line x1="${x}" y1="0" x2="${x}" y2="${largo}" stroke="#d9c7bd" stroke-width="1.2"/>
          <path transform="translate(${x} ${largo + 9})" d="M0 -9 L2.5 -3 L9 -2.8 L3.9 1.4 L5.6 7.8 L0 4 L-5.6 7.8 L-3.9 1.4 L-9 -2.8 L-2.5 -3 Z" fill="#f0c96e"/>
        </g>`;
      return `
<svg class="adorno izq" viewBox="0 0 90 120" aria-hidden="true">
  ${bola(16, 34, "#f4b6c0", "d1", 10)}
  ${estrella(42, 18, "d3")}
  ${bola(66, 54, "#a8d8c4", "d2", 9)}
</svg>
<svg class="adorno der" viewBox="0 0 90 120" aria-hidden="true">
  ${bola(24, 50, "#c8bbea", "d2", 9)}
  ${estrella(48, 26, "d1")}
  ${bola(74, 30, "#f7d58c", "d3", 10)}
</svg>`;
    },
    // Serie de luces que cruza la parte superior
    luces: true
  },

  /* ─────────────── GENERAL (por si el tema no existe) ─────────────── */
  general: {
    colores: {
      "--bg": "#f8f6fb",
      "--bg-2": "#eef7f3",
      "--ink": "#45405a",
      "--muted": "#8a86a0",
      "--card": "#ffffff",
      "--line": "#e7e3f0",
      "--accent": "#a99be0",
      "--accent-soft": "#efebfb",
      "--accent-2": "#8fcbb4",
      "--gold": "#f2cf7e",
      "--wd-0": "#eef1e8", "--wd-1": "#e1f3ea", "--wd-2": "#fce4e8",
      "--wd-3": "#ece5f7", "--wd-4": "#fdf2d3", "--wd-5": "#e0edfa", "--wd-6": "#fde6d8"
    },
    frase: "Compartir la mesa es compartir el corazón 💛",
    particulas: "burbujas",
    escena: function () {
      return `
<svg class="escena" viewBox="0 0 360 150" aria-hidden="true">
  <path d="M0 132 Q90 108 180 118 T360 124 V150 H0Z" fill="#d6ecdf"/>
  <g class="anim-bob"><circle cx="90" cy="60" r="22" fill="#fbd3db"/><line x1="90" y1="82" x2="94" y2="128" stroke="#d9c7bd"/></g>
  <g class="anim-bob d2"><circle cx="180" cy="44" r="26" fill="#d8cff3"/><line x1="180" y1="70" x2="178" y2="124" stroke="#d9c7bd"/></g>
  <g class="anim-bob d3"><circle cx="270" cy="62" r="20" fill="#cdebdd"/><line x1="270" y1="82" x2="266" y2="126" stroke="#d9c7bd"/></g>
</svg>`;
    },
    adornos: function () { return ""; },
    luces: false
  }
};
