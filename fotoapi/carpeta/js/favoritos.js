// --- favoritos.js ---
async function Favoritos() {
  const root = document.getElementById("root");
  root.innerHTML = "<p>❤️ Cargando tus favoritos...</p>";

  // Obtener favoritos del localStorage
  const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

  if (favoritos.length === 0) {
    root.innerHTML = `
      <div class="contenedor-favoritos">
        <p style="text-align:center; font-size:18px; color:#666;">
          💔 No tienes fotos favoritas aún.
        </p>
      </div>`;
    return;
  }

  // Crear cards
  const lista = favoritos.map(foto => `
    <div class="card-favorito">
      <img src="${foto.download_url}" alt="${foto.author}">
      <p><strong>${foto.author}</strong></p>
      <button class="btn-eliminar" onclick="eliminarFavorito('${foto.id}')">Eliminar</button>
    </div>
  `).join("");

  root.innerHTML = `
    <h2 style="text-align:center; color:#007bff;">❤️ Mis Fotos Favoritas</h2>
    <div class="contenedor-favoritos">
      ${lista}
    </div>
  `;
}

// --- Función para eliminar un favorito ---
function eliminarFavorito(id) {
  let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
  favoritos = favoritos.filter(f => f.id !== id);
  localStorage.setItem("favoritos", JSON.stringify(favoritos));
  Favoritos(); // recarga la vista
}
