function loadHTML(selector, url, callback) {
    const container = document.querySelector(selector);
    if (!container) return;

    // Si ya tiene contenido, NO volver a cargar
    if (container.dataset.loaded === "true") {
        if (callback) callback();
        return;
    }

    fetch(url)
        .then(res => res.text())
        .then(html => {
            container.innerHTML = html;
            container.dataset.loaded = "true";
            if (callback) callback();
        })
        .catch(err => console.error("Error cargando", url, err));
}
