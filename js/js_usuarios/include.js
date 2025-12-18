console.log("include.js cargado");

function loadPartial(id, file, callback) {
    fetch(file)
        .then(res => {
            if (!res.ok) throw new Error("Error cargando " + file);
            return res.text();
        })
        .then(html => {
            document.getElementById(id).innerHTML = html;
            if (callback) callback();
        })
        .catch(err => console.error(err));
}
loadPartial("footer", "../partials/footer.html");
