(function () {
  const EMAIL = "trabajo.osant@gmail.com";
  const $ = (s) => document.querySelector(s);

  $("#anio").textContent = new Date().getFullYear();

  // Menú: marca la sección visible
  const links = [...document.querySelectorAll(".side nav a")];
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        links.forEach((l) => l.classList.toggle("on", l.getAttribute("href") === "#" + e.target.id));
      }
    });
  }, { rootMargin: "-40% 0px -55% 0px" });
  links.forEach((l) => { const s = document.querySelector(l.getAttribute("href")); if (s) io.observe(s); });

  // Contacto: construye el correo según el motivo elegido
  const enlace = $("#mailto");
  function actualizar() {
    const motivo = document.querySelector('input[name="motivo"]:checked').value;
    const nombre = $("#nombre").value.trim();
    const detalle = $("#detalle").value.trim();
    const asunto = motivo + " - contacto desde tu portfolio";
    const cuerpo =
      "Hola Óscar,\n\n" +
      "Te escribo por: " + motivo.toLowerCase() + ".\n" +
      (detalle ? "\n" + detalle + "\n" : "") +
      "\nUn saludo,\n" + (nombre || "");
    enlace.href = "mailto:" + EMAIL + "?subject=" + encodeURIComponent(asunto) + "&body=" + encodeURIComponent(cuerpo);
  }
  document.querySelectorAll(".reason input, #nombre, #detalle").forEach((el) => el.addEventListener("input", actualizar));
  actualizar();

  // Copiar email
  const aviso = $("#aviso");
  $("#copiar").addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      aviso.textContent = "Email copiado: " + EMAIL;
    } catch (e) {
      aviso.textContent = "Cópialo a mano: " + EMAIL;
    }
  });
})();
