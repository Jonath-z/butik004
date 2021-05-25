
const imgCommanded = document.getElementById("Shoes");
const src = imgCommanded.src;
const button = document.getElementById("ClientSubmitButton")

    const link = {
        src: src
    }
    const url = "http://localhost:6578/command"
    fetch(url, {
        method: "POST",
        headers: {
            'Accept': '*/*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ link })
    })
        .then(res => { return res.json() });
    console.log(src);

