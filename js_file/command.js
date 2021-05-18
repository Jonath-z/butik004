
fetch("http://localhost:3000/butik/command/render", {
    method: "POST",
})
    .then(res => { return res.json() })
    .then(data => {
        console.log(data);
    });