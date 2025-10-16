async function Home() {
  const root = document.getElementById("root");
  root.innerHTML = "<p>Cargando imágenes...</p>";

  const res = await fetch("https://picsum.photos/v2/list?limit=50");
  const data = await res.json();

  root.innerHTML = `
    <div class="galeria">
      ${data.map(foto => `
        <div class="foto-card" onclick="Detalle('${foto.id}')">
          <img src="${foto.download_url}" alt="${foto.author}">
          <p>${foto.author}</p>
        </div>
      `).join("")}
    </div>
  `;
}
