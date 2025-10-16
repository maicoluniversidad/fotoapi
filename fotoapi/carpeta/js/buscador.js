// carpeta/js/buscador.js
// Muestra la UI del buscador y carga las fotos (usa las mismas clases .galeria y .foto-card que Home)
async function Buscador() {
  const root = document.getElementById("root");
  if (!root) return;

  root.innerHTML = `
    <div class="buscador-wrap">
      <input id="input-busqueda" class="c-buscador" type="text" placeholder="🔍 Buscar por autor...">
    </div>
    <div id="resultados" class="galeria"></div>
  `;

  // Cargamos fotos una sola vez (cache local en la sesión)
  if (!window._picsum_cache) {
    try {
      const res = await fetch("https://picsum.photos/v2/list?limit=500");
      window._picsum_cache = await res.json();
    } catch (e) {
      document.getElementById("resultados").innerHTML = "<p>Error al cargar fotos.</p>";
      console.error(e);
      return;
    }
  }

  // Mostrar inicialmente algunas (por ejemplo, primeras 48) para no saturar la UI
  const initial = window._picsum_cache.slice(0, 48);
  document.getElementById("resultados").innerHTML = generarListaFotos(initial);

  // Evento de búsqueda en tiempo real
  const input = document.getElementById("input-busqueda");
  input.addEventListener("input", (e) => {
    const texto = e.target.value.trim().toLowerCase();
    let filtradas;
    if (texto === "") {
      filtradas = initial; // vuelven las iniciales si no hay texto
    } else {
      // filtramos por autor (incluye coincidencias parciales)
      filtradas = window._picsum_cache.filter(f =>
        f.author.toLowerCase().includes(texto)
      ).slice(0, 200); // limitamos resultados para rendimiento
    }
    document.getElementById("resultados").innerHTML = generarListaFotos(filtradas);
  });
}

// Genera las tarjetas con las MISMAS clases que Home
function generarListaFotos(fotos) {
  if (!fotos || fotos.length === 0) return "<p>No se encontraron fotos.</p>";

  return fotos.map(f => `
    <div class="foto-card" onclick="Detalle('${f.id}')">
      <img src="${f.download_url}" alt="${escapeHtml(f.author)}" loading="lazy">
      <p>${escapeHtml(f.author)}</p>
    </div>
  `).join("");
}

// helper simple para evitar romper HTML con nombres raros
function escapeHtml(text) {
  if (!text) return "";
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
