// --- original.js ---
async function Original() {
  const root = document.getElementById("root");
  root.innerHTML = "<p> Cargando autores y fotos...</p>";

  try {
    const res = await fetch("https://picsum.photos/v2/list?limit=100");
    const data = await res.json();

    // Agrupar fotos por autor
    const grupos = {};
    data.forEach(foto => {
      if (!grupos[foto.author]) {
        grupos[foto.author] = [];
      }
      grupos[foto.author].push(foto);
    });

    // Generar HTML por cada autor
    const seccionesHTML = Object.keys(grupos)
      .map(autor => {
        const fotosHTML = grupos[autor]
          .map(foto => `
            <div class="foto-card" onclick="Detalle('${foto.id}')">
              <img src="${foto.download_url}" alt="${foto.author}">
              <p>ID: ${foto.id}</p>
            </div>
          `)
          .join("");

        return `
          <section class="autor-section">
            <h3> ${autor}</h3>
            <div class="galeria-autor">
              ${fotosHTML}
            </div>
          </section>
        `;
      })
      .join("");

    // Insertar en el DOM
    root.innerHTML = `
      <h2 class="titulo-original"> Explora el mundo a través de sus autores</h2>
      <div class="contenedor-autores">
        ${seccionesHTML}
      </div>
    `;
  } catch (error) {
    console.error("Error al cargar las imágenes:", error);
    root.innerHTML = `<p> Error al cargar las imágenes. Intenta nuevamente.</p>`;
  }
}
