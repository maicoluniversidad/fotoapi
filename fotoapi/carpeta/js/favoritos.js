function Favoritos() {
  const contenedor = document.getElementById("contenedor-fotos");
  contenedor.innerHTML = "<h2>⭐ Mis Fotos Favoritas</h2>";

  const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

  if (favoritos.length === 0) {
    contenedor.innerHTML += "<p>No tienes fotos favoritas aún.</p>";
    return;
  }

  const galeria = document.createElement("div");
  galeria.classList.add("galeria");

  favoritos.forEach(foto => {
    const div = document.createElement("div");
    div.classList.add("foto");

    div.innerHTML = `
      <img src="${foto.url}" alt="${foto.author}" loading="lazy">
      <p>${foto.author}</p>
      <button class="eliminar-favorito" data-id="${foto.id}">❌ Quitar</button>
    `;

    galeria.appendChild(div);
  });

  contenedor.appendChild(galeria);

  // Evento para eliminar favorito
  document.querySelectorAll(".eliminar-favorito").forEach(btn => {
    btn.addEventListener("click", e => {
      const id = e.target.dataset.id;
      eliminarFavorito(id);
      Favoritos(); // recargar vista
    });
  });
}

function eliminarFavorito(id) {
  let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
  favoritos = favoritos.filter(f => f.id !== id);
  localStorage.setItem("favoritos", JSON.stringify(favoritos));
}
