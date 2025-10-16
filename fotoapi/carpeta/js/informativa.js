function Informativa() {
  const root = document.getElementById("root");

  root.innerHTML = `
    <section class="seccion-informativa">
      <h2>📸 Sobre nuestra API de Fotos</h2>
      <p>
        Esta aplicación obtiene sus imágenes desde la API pública 
        <a href="https://picsum.photos/" target="_blank">Lorem Picsum</a>.
        Cada fotografía proviene de diferentes autores de todo el mundo y se
        muestra con su respectivo crédito.
      </p>

      <p>
        Puedes explorar imágenes, buscarlas por autor, agregarlas a favoritos 
        y verlas agrupadas según su creador en la pestaña “Original”.
      </p>

      <ul class="info-lista">
        <li>🌍 Fuente: Lorem Picsum API (https://picsum.photos)</li>
        <li>🧑‍🎨 Autores internacionales</li>
        <li>💾 Soporte para favoritos (localStorage)</li>
        <li>🔍 Buscador de autores</li>
        <li>📱 Diseño adaptable (responsive)</li>
      </ul>

      <img src="https://picsum.photos/600/300" alt="Ejemplo API" class="img-info">

      <p class="creditos">Desarrollado por <strong>Tu Nombre</strong> — Proyecto API Individual</p>
    </section>
  `;
}
