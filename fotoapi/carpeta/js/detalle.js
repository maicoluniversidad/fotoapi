// --- detalle.js ---
function toggleFavorito(id, author, url) {
  // Leer favoritos del localStorage
  let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

  // Verificar si ya existe
  const existe = favoritos.some(f => f.id === id);

  if (existe) {
    // Si ya está, lo quitamos
    favoritos = favoritos.filter(f => f.id !== id);
  } else {
    // Si no está, lo agregamos
    favoritos.push({ id, author, download_url: url });
  }

  // Guardar de nuevo
  localStorage.setItem("favoritos", JSON.stringify(favoritos));

  // Actualizar el ícono del botón
  const boton = document.querySelector(`#corazon-${id}`);
  if (boton) boton.textContent = existe ? "🤍" : "❤️";
}

async function Detalle(id) {
  const root = document.getElementById("root");
  root.innerHTML = "<p>Cargando...</p>";

  const res = await fetch(`https://picsum.photos/v2/list`);
  const data = await res.json();
  const foto = data.find(f => f.id == id);

  if (!foto) {
    root.innerHTML = "<p>Imagen no encontrada</p>";
    return;
  }

  // Revisar si está en favoritos
  const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
  const esFavorito = favoritos.some(f => f.id === foto.id);

  // Mostrar detalle
  root.innerHTML = `
    <div class="detalle-explora">
      <img src="${foto.download_url}" alt="${foto.author}">
      <div class="texto">
        <h2>${foto.author}</h2>
        <p><strong>ID:</strong> ${foto.id}</p>
        <p> Foto original: <a href="${foto.url}" target="_blank">Ver en Picsum</a></p>
        <button id="corazon-${foto.id}" onclick="toggleFavorito('${foto.id}', '${foto.author}', '${foto.download_url}')">
          ${esFavorito ? "❤️" : "🤍"} Favorito
        </button>
        <button class="volver" onclick="Home()">⬅ Volver</button>
      </div>
    </div>
  `;
  // --- Función para compartir una foto ---
function compartirFoto(foto) {
  if (navigator.share) {
    navigator.share({
      title: `Foto de ${foto.author}`,
      text: `Mira esta increíble foto de ${foto.author} 📸`,
      url: foto.download_url
    })
    .then(() => console.log('Compartido correctamente'))
    .catch((error) => console.log('Error al compartir:', error));
  } else {
    alert("Tu navegador no soporta la función de compartir 😔");
  }
}

}
