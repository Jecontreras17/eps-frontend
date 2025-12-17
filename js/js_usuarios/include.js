function loadPartial(id, file) {
    fetch(file)
        .then(response => {
            if (!response.ok) throw new Error("No se pudo cargar " + file);
            return response.text();
        })
        .then(html => {
            document.getElementById(id).innerHTML = html;
        })
        .catch(error => {
            console.error(error);
        });
}

// Cargar header y footer
loadPartial("header", "../partials/header.html");
loadPartial("footer", "../partials/footer.html");
