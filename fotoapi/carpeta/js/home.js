async function Home() {
  const contenedor = document.getElementById("contenedor-fotos");
  contenedor.innerHTML = "<h2>🏠 Galería Principal</h2>";

  const fotos = await conexionLista();
  const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

  const galeria = document.createElement("div");
  galeria.classList.add("galeria");

  fotos.forEach(foto => {
    const div = document.createElement("div");
    div.classList.add("foto");

    const esFavorito = favoritos.some(f => f.id === foto.id);

    div.innerHTML = `
      <img src="${foto.download_url}" alt="${foto.author}" data-id="${foto.id}">
      <p>${foto.author}</p>
      <button 
        class="btn-favorito ${esFavorito ? 'activo' : ''}" 
        data-id="${foto.id}" 
        data-url="${foto.download_url}" 
        data-author="${foto.author}"
        data-width="${foto.width}" 
        data-height="${foto.height}">
        ${esFavorito ? "💖" : "🤍"}
      </button>
    `;

    galeria.appendChild(div);
  });

  contenedor.appendChild(galeria);

  // Click en botón de favorito
  document.querySelectorAll(".btn-favorito").forEach(btn => {
    btn.addEventListener("click", e => {
      e.stopPropagation(); // evitar que abra modal
      const foto = {
        id: e.target.dataset.id,
        url: e.target.dataset.url,
        author: e.target.dataset.author,
        width: e.target.dataset.width,
        height: e.target.dataset.height
      };
      guardarFavorito(foto);

      e.target.classList.toggle("activo");
      e.target.textContent = e.target.classList.contains("activo") ? "💖" : "🤍";
    });
  });

  // Click en imagen → mostrar información
  document.querySelectorAll(".foto img").forEach(img => {
    img.addEventListener("click", e => {
      const id = e.target.dataset.id;
      const foto = fotos.find(f => f.id === id);
      mostrarInfoFoto(foto);
    });
  });
}

function guardarFavorito(foto) {
  let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
  const existe = favoritos.some(f => f.id === foto.id);

  if (existe) {
    favoritos = favoritos.filter(f => f.id !== foto.id);
  } else {
    favoritos.push(foto);
  }

  localStorage.setItem("favoritos", JSON.stringify(favoritos));
}

// Muestra modal con información
function mostrarInfoFoto(foto) {
  const modal = document.createElement("div");
  modal.classList.add("foto-info");

  modal.innerHTML = `
    <div class="foto-info-content">
      <button class="cerrar-info">✖</button>
      <img src="${foto.download_url}" alt="${foto.author}">
      <h3>${foto.author}</h3>
      <p><b>ID:</b> ${foto.id}</p>
      <p><b>Tamaño:</b> ${foto.width} x ${foto.height}</p>
      <a href="${foto.download_url}" target="_blank">🔗 Ver imagen completa</a>
      <button class="btn-favorito-modal" data-id="${foto.id}" data-url="${foto.download_url}" data-author="${foto.author}">❤️ Agregar a favoritos</button>
    </div>
  `;

  document.body.appendChild(modal);

  // Cerrar modal
  modal.querySelector(".cerrar-info").addEventListener("click", () => modal.remove());

  // Agregar a favoritos desde modal
  modal.querySelector(".btn-favorito-modal").addEventListener("click", (e) => {
    const fotoFav = {
      id: e.target.dataset.id,
      url: e.target.dataset.url,
      author: e.target.dataset.author
    };
    guardarFavorito(fotoFav);
    e.target.textContent = "💖 Guardada";
    e.target.disabled = true;
  });
}
