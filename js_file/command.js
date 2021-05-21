
window.onload = function () {
    const url = "http://localhost:6578/butik/command/render";
    fetch(url, {
        method: "POST",
    })
        .then(res => res.json())
        .then(data => {
            console.log(data);
        });
}
