async function conexionLista() {
  try {
    const respuesta = await fetch("https://picsum.photos/v2/list?limit=500");
    if (!respuesta.ok) throw new Error("Error al obtener las fotos");
    const datos = await respuesta.json();
    return datos;
  } catch (error) {
    console.error("Error en la conexión:", error);
    return [];
  }
}
