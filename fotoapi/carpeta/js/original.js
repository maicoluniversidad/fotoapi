async function Original() {
  const contenedor = document.getElementById("contenedor-fotos");
  contenedor.innerHTML = "<h2>🌍 Explora el Mundo</h2><p>Viaja por paisajes únicos de fotógrafos de todo el mundo.</p>";
  
  try {
    const response = await fetch("https://picsum.photos/v2/list?limit=100");
    const fotos = await response.json();

    // Genera nombres de lugares imaginarios
    const lugares = [
      "Isla Aurora", "Ciudad del Alba", "Bosque de Cristal", "Cumbres Eternas",
      "Mar de Luz", "Valle de la Bruma", "Río Dorado", "Horizonte Azul",
      "Desierto de los Sueños", "Refugio del Viento", "Bahía Oculta", "Costa del Silencio",
      "Montañas Celestes", "Lago del Eco", "Jardín del Sol", "Santuario Nébula"
    ];

    // Barajar las fotos para variedad
    const fotosAleatorias = fotos.sort(() => Math.random() - 0.5).slice(0, 20);

    contenedor.className = "galeria-explora";
    contenedor.innerHTML += fotosAleatorias.map((foto, i) => {
      const lugar = lugares[i % lugares.length];
      return `
        <div class="card-explora" onclick="mostrarInfo('${foto.author}', '${lugar}', '${foto.download_url}')">
          <img src="${foto.download_url}" alt="Foto de ${foto.author}">
          <div class="info">
            <h3>${lugar}</h3>
            <p>📸 ${foto.author}</p>
          </div>
        </div>
      `;
    }).join("");
  } catch (error) {
    console.error("Error cargando las fotos:", error);
    contenedor.innerHTML = "<p>Error al cargar las fotos. Intenta nuevamente.</p>";
  }
}

// Mostrar información de la imagen
function mostrarInfo(autor, lugar, url) {
  const contenedor = document.getElementById("contenedor-fotos");
  contenedor.innerHTML = `
    <div class="detalle-explora">
      <button class="volver" onclick="Original()">⬅ Volver</button>
      <img src="${url}" alt="Imagen de ${autor}">
      <div class="texto">
        <h2>${lugar}</h2>
        <p>📸 Fotógrafo: <strong>${autor}</strong></p>
        <p>Una postal visual desde <em>${lugar}</em>. Déjate llevar por la imaginación y descubre nuevos mundos a través del lente.</p>
      </div>
    </div>
  `;
}
