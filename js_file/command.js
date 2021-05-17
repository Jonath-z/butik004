const url = "http://localhost:3000/butik/command/render";
fetch(url, {
    method: "POST",
    headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json'
    }
})
    .then(res => { return res.json() })
    .then(data => {
        console.log(data);
    });
