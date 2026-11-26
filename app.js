(function () {
  "use strict";

  const CFG = window.CALENDARIO_CONFIG || {};
  const MESES = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio",
    "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
  const DIAS = ["lunes", "martes", "miércoles", "jueves", "viernes", "sábado", "domingo"];
  const DIAS_CORTOS = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"]; // la semana empieza en domingo
  const CACHE_KEY = "calendario-misioneros-cache";

  const $ = (id) => document.getElementById(id);
  const telefonos = new Map(); // los números viven solo aquí, no en la página

  /* ───────────── Utilidades ───────────── */
  function escapar(s) {
    return String(s ?? "").replace(/[&<>"']/g, (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  }
  function norm(s) {
    return String(s || "").trim().toLowerCase().normalize("NFD")
      .replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "");
  }
  function parseCSV(texto) {
    const filas = []; let fila = []; let campo = ""; let comillas = false;
    for (let i = 0; i < texto.length; i++) {
      const c = texto[i];
      if (comillas) {
        if (c === '"' && texto[i + 1] === '"') { campo += '"'; i++; }
        else if (c === '"') comillas = false;
        else campo += c;
      } else if (c === '"') comillas = true;
      else if (c === ",") { fila.push(campo); campo = ""; }
      else if (c === "\n" || c === "\r") {
        if (c === "\r" && texto[i + 1] === "\n") i++;
        fila.push(campo); filas.push(fila); fila = []; campo = "";
      } else campo += c;
    }
    if (campo !== "" || fila.length) { fila.push(campo); filas.push(fila); }
    return filas;
  }
  function aObjetos(filas) {
    if (!filas.length) return [];
    const enc = filas[0].map(norm);
    return filas.slice(1)
      .filter((f) => f.some((c) => String(c).trim()))
      .map((f) => { const o = {}; enc.forEach((h, i) => (o[h] = String(f[i] ?? "").trim())); return o; });
  }
  function soloDigitos(t) { return String(t || "").replace(/\D/g, ""); }
  function formatoTel(d) {
    return d.length === 10 ? `${d.slice(0, 2)} ${d.slice(2, 6)} ${d.slice(6)}` : d;
  }

  /* ───────────── Carga de datos ───────────── */
  function urlHoja(nombre) {
    return `https://docs.google.com/spreadsheets/d/${encodeURIComponent(CFG.SHEET_ID)}/gviz/tq?tqx=out:csv&headers=1&sheet=${encodeURIComponent(nombre)}`;
  }
  async function traer(url) {
    const r = await fetch(url, { cache: "no-store" });
    if (!r.ok) throw new Error("HTTP " + r.status);
    const t = await r.text();
    if (/^\s*</.test(t)) throw new Error("La hoja no es pública");
    return t;
  }
  async function cargar() {
    const urlCal = CFG.URL_CALENDARIO_CSV || (CFG.SHEET_ID && urlHoja(CFG.HOJA_CALENDARIO || "Calendario"));
    const urlConf = CFG.URL_CONFIG_CSV || (CFG.SHEET_ID && urlHoja(CFG.HOJA_CONFIG || "Config"));
    if (!urlCal) throw new Error("SIN_CONFIG");
    const [tCal, tConf] = await Promise.all([traer(urlCal), urlConf ? traer(urlConf).catch(() => "") : ""]);
    return { cal: tCal, conf: tConf };
  }

  /* ───────────── Interpretar ───────────── */
  function interpretar(crudo) {
    const conf = {};
    aObjetos(parseCSV(crudo.conf || "")).forEach((o) => {
      const k = norm(o.clave || Object.values(o)[0]);
      const v = o.valor ?? Object.values(o)[1];
      if (k) conf[k] = v;
    });
    const hoy = new Date();
    const mes = parseInt(conf.mes, 10) || hoy.getMonth() + 1;
    const anio = parseInt(conf.anio || conf.ano || conf.year, 10) || hoy.getFullYear();

    const porDia = {};
    aObjetos(parseCSV(crudo.cal)).forEach((o) => {
      const dia = parseInt(o.dia, 10);
      if (!dia || !o.nombre) return;
      (porDia[dia] = porDia[dia] || []).push({
        nombre: o.nombre,
        con: o.comen_con || o.con || "",
        misioneros: o.misioneros || "",
        tel: soloDigitos(o.telefono || o.tel || "")
      });
    });
    return { conf, mes, anio, porDia };
  }

  /* ───────────── Tema ───────────── */
  function aplicarTema(nombre) {
    const temas = window.TEMAS || {};
    const tema = temas[norm(nombre)] || temas.general;
    if (!tema) return {};
    const root = document.documentElement.style;
    Object.entries(tema.colores || {}).forEach(([k, v]) => root.setProperty(k, v));
    document.querySelector('meta[name="theme-color"]').setAttribute("content", tema.colores["--bg"]);
    $("escena").innerHTML = tema.escena ? tema.escena() : "";
    $("adornos").innerHTML = tema.adornos ? tema.adornos() : "";
    $("luces").innerHTML = tema.luces ? lucesSVG() : "";
    iniciarParticulas(tema.particulas);
    return tema;
  }
  function lucesSVG() {
    const colores = ["#f4b6c0", "#a8d8c4", "#f7d58c", "#c8bbea", "#b9d4f0"];
    const n = 22; let focos = ""; let cuerda = "M0 6";
    for (let i = 0; i <= n; i++) {
      const x = (i / n) * 1000, y = i % 2 ? 16 : 8;
      cuerda += ` Q${x - 22} ${y + 8} ${x} ${y}`;
      if (i > 0 && i < n) focos += `<ellipse class="foco" cx="${x}" cy="${y + 8}" rx="6" ry="8" fill="${colores[i % colores.length]}"/>`;
    }
    return `<svg viewBox="0 0 1000 34" preserveAspectRatio="none"><path d="${cuerda}" fill="none" stroke="#cdb8ad" stroke-width="1.5"/>${focos}</svg>`;
  }

  /* ───────────── Partículas (nieve / burbujas) ───────────── */
  let rafId = null;
  function iniciarParticulas(tipo) {
    const cv = $("particulas");
    const ctx = cv.getContext("2d");
    cancelAnimationFrame(rafId);
    ctx.clearRect(0, 0, cv.width, cv.height);
    if (!tipo || matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let W, H;
    const ajustar = () => { W = innerWidth; H = innerHeight; cv.width = W * dpr; cv.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); };
    ajustar(); addEventListener("resize", ajustar);

    const total = Math.round(Math.min(70, (innerWidth * innerHeight) / 14000));
    const colores = tipo === "nieve" ? ["#ffffff"] : ["#f4b6c0", "#a8d8c4", "#c8bbea", "#f7d58c"];
    const p = Array.from({ length: total }, () => ({
      x: Math.random() * innerWidth, y: Math.random() * innerHeight,
      r: tipo === "nieve" ? 1.5 + Math.random() * 3 : 3 + Math.random() * 7,
      v: 0.3 + Math.random() * 0.8, f: Math.random() * Math.PI * 2,
      c: colores[Math.floor(Math.random() * colores.length)]
    }));
    const paso = () => {
      ctx.clearRect(0, 0, W, H);
      for (const q of p) {
        q.f += 0.01;
        if (tipo === "nieve") { q.y += q.v; q.x += Math.sin(q.f) * 0.4; }
        else { q.y -= q.v * 0.6; q.x += Math.sin(q.f) * 0.3; }
        if (q.y > H + 10) { q.y = -10; q.x = Math.random() * W; }
        if (q.y < -10) { q.y = H + 10; q.x = Math.random() * W; }
        ctx.beginPath(); ctx.arc(q.x, q.y, q.r, 0, Math.PI * 2);
        ctx.fillStyle = q.c; ctx.globalAlpha = tipo === "nieve" ? 0.9 : 0.35;
        if (tipo === "nieve") { ctx.shadowColor = "rgba(180,170,200,.6)"; ctx.shadowBlur = 4; }
        ctx.fill();
      }
      ctx.globalAlpha = 1; ctx.shadowBlur = 0;
      rafId = requestAnimationFrame(paso);
    };
    paso();
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) cancelAnimationFrame(rafId); else { cancelAnimationFrame(rafId); paso(); }
    });
  }

  /* ───────────── Pintar ───────────── */
  let DATOS = null;

  function bloquePersona(e, id) {
    let html = `<div class="persona"><p class="nombre">${escapar(e.nombre)}</p>`;
    if (e.con) html += `<p class="con">Comen con ${escapar(e.con.replace(/^comen con\s*/i, ""))}</p>`;
    html += `<div class="fila">`;
    if (e.misioneros) html += `<span class="chip">🍽️ ${escapar(e.misioneros)}</span>`;
    if (e.tel) { telefonos.set(id, e.tel); html += `<button class="tel-btn" data-tel="${id}">📞 Ver teléfono</button>`; }
    return html + `</div></div>`;
  }

  function contenidoDia(dia, prefijo) {
    const { porDia, conf, mes, anio } = DATOS;
    const lista = porDia[dia] || [];
    const wd = (new Date(anio, mes - 1, dia).getDay() + 6) % 7;
    if (wd === 0) return `<p class="prep-nota"><img class="ico-prep" src="imagenes/escrituras.png" alt="" aria-hidden="true"> ${escapar(conf.texto_lunes || "Día de Preparación")}</p>`;
    if (lista.length) return lista.map((e, i) => bloquePersona(e, `${prefijo}-${dia}-${i}`)).join("");
    return `<p class="nota">Sin asignar</p>`;
  }

  function pintar() {
    const { conf, mes, anio, porDia } = DATOS;
    const tema = aplicarTema(conf.tema || "general");
    const nombreMes = MESES[mes - 1];
    const titulo = conf.titulo || "Comida Misioneros";

    document.title = `${titulo} · ${nombreMes[0].toUpperCase() + nombreMes.slice(1)} ${anio}`;
    $("subtitulo").textContent = titulo;
    $("titulo").innerHTML = `Calendario de <em>${escapar(nombreMes)}</em>`;
    $("frase").textContent = conf.frase || tema.frase || "";
    $("frase").hidden = !$("frase").textContent;

    $("semana").innerHTML = DIAS_CORTOS.map((d) => `<span>${d}</span>`).join("");

    const inicio = new Date(anio, mes - 1, 1).getDay(); // 0 = domingo
    const totalDias = new Date(anio, mes, 0).getDate();
    const hoy = new Date();
    const esEsteMes = hoy.getFullYear() === anio && hoy.getMonth() + 1 === mes;
    const textoLunes = conf.texto_lunes || "Día de Preparación";

    let celdas = "";
    for (let i = 0; i < inicio; i++) celdas += `<div class="dia vacio" aria-hidden="true"></div>`;
    for (let d = 1; d <= totalDias; d++) {
      const wd = ((inicio + d - 1) % 7 + 6) % 7; // 0 = lunes (colores y preparación)
      const lista = wd === 0 ? [] : (porDia[d] || []);
      const cls = ["dia", `wd-${wd}`];
      if (wd === 0) cls.push("prep");
      else if (!lista.length) cls.push("libre");
      if (esEsteMes && hoy.getDate() === d) cls.push("hoy");
      let extra = "";
      if (wd === 0) {
        extra = `<span class="etiqueta"><img class="ico-prep" src="imagenes/escrituras.png" alt="" aria-hidden="true"><b class="solo-pc">${escapar(textoLunes)}</b></span>`;
      } else if (lista.length) {
        extra = `<span class="puntos">${lista.slice(0, 2).map(() => "<i></i>").join("")}</span>
          <span class="nombres">${lista.slice(0, 2).map((e) => `<span>${escapar(e.nombre)}</span>`).join("")}
          ${lista.length > 2 ? `<span>+${lista.length - 2} más</span>` : ""}</span>`;
      }
      const etiquetaAria = `${DIAS[wd]} ${d}: ${lista.length ? lista.map((e) => e.nombre).join(" y ") : (wd === 0 ? textoLunes : "sin asignar")}`;
      celdas += `<button class="${cls.join(" ")}" data-dia="${d}" aria-label="${escapar(etiquetaAria)}"><span class="num">${d}</span>${extra}</button>`;
    }
    $("rejilla").innerHTML = celdas;

    let agenda = `<h3 class="mes-lista">Día por día</h3>`;
    for (let d = 1; d <= totalDias; d++) {
      const wd = ((inicio + d - 1) % 7 + 6) % 7; // 0 = lunes (colores y preparación)
      const libre = !(porDia[d] || []).length && wd !== 0;
      agenda += `<article class="dia-card wd-${wd}${libre ? " es-libre" : ""}${wd === 0 ? " prep" : ""}" id="dia-${d}">
        <header><span class="fecha-num">${d}</span><span class="fecha-txt">${DIAS[wd]}</span></header>
        ${contenidoDia(d, "a")}
      </article>`;
    }
    $("agenda").innerHTML = agenda;
  }

  /* ───────────── Interacción ───────────── */
  function abrirHoja(dia) {
    const { mes, anio } = DATOS;
    const wd = (new Date(anio, mes - 1, dia).getDay() + 6) % 7;
    const nd = DIAS[wd]; $("hoja-titulo").textContent = `${nd[0].toUpperCase() + nd.slice(1)} ${dia} de ${MESES[mes - 1]}`;
    $("hoja-cuerpo").innerHTML = contenidoDia(dia, "h");
    $("hoja").classList.toggle("prep", wd === 0);
    $("velo").hidden = false; $("hoja").hidden = false;
    document.body.style.overflow = "hidden";
    $("cerrar").focus();
  }
  function cerrarHoja() {
    $("velo").hidden = true; $("hoja").hidden = true;
    document.body.style.overflow = "";
  }

  document.addEventListener("click", (ev) => {
    const btnTel = ev.target.closest(".tel-btn");
    if (btnTel) {
      const num = telefonos.get(btnTel.dataset.tel);
      if (!num) return;
      const a = document.createElement("a");
      a.className = "tel-link";
      a.href = "tel:" + num;
      a.textContent = "📞 Llamar · " + formatoTel(num);
      btnTel.replaceWith(a);
      return;
    }
    const celda = ev.target.closest(".dia[data-dia]");
    if (celda) { abrirHoja(parseInt(celda.dataset.dia, 10)); return; }
    if (ev.target.id === "velo" || ev.target.closest("#cerrar")) cerrarHoja();
  });
  document.addEventListener("keydown", (ev) => { if (ev.key === "Escape") cerrarHoja(); });

  /* ───────────── Arranque ───────────── */
  function mostrarError(msg) {
    $("rejilla").innerHTML = `<p class="error">${msg}</p>`;
    aplicarTema("navidad");
  }

  (async function iniciar() {
    try {
      const crudo = await cargar();
      try { localStorage.setItem(CACHE_KEY, JSON.stringify(crudo)); } catch (e) { /* sin almacenamiento */ }
      DATOS = interpretar(crudo);
      pintar();
    } catch (err) {
      let guardado = null;
      try { guardado = JSON.parse(localStorage.getItem(CACHE_KEY) || "null"); } catch (e) { /* nada */ }
      if (guardado && err.message !== "SIN_CONFIG") {
        DATOS = interpretar(guardado);
        pintar();
        $("aviso").textContent = "Sin conexión: mostrando la última versión guardada.";
      } else if (err.message === "SIN_CONFIG") {
        mostrarError("Falta conectar la hoja de Google. Abre <b>config.js</b> y pega el ID de tu hoja en <b>SHEET_ID</b>.");
      } else {
        mostrarError("No se pudo leer la hoja de Google. Revisa que esté compartida como <b>“Cualquier persona con el enlace · Lector”</b> y que las pestañas se llamen <b>Calendario</b> y <b>Config</b>.");
      }
    }
  })();
})();
