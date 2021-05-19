
// airforce 1 events
const airfore = document.querySelector("#airForce");
airfore.addEventListener("click", () => {
    window.open("http://localhost:6578/butik/airforce", "_self");
});

// jordan 1 events

const jordan1 = document.querySelector("#airJordan1");
jordan1.addEventListener("click", () => {
    window.open("http://localhost:6578/butik/jordan1", "_self");
});

// jordan 4 events

const jordan4 = document.querySelector("#jordan4");
jordan4.addEventListener("click", () => {
    window.open("http://localhost:6578/butik/jordan4", "_self");
});

// jordan 6 events

const jordan6 = document.querySelector("#jordan6");
jordan6.addEventListener("click", () => {
    window.open("http://localhost:6578/butik/jordan6", "_self");
});

// jordan 6 events

const timberland = document.querySelector("#timberland");
timberland.addEventListener("click", () => {
    window.open("http://localhost:6578/butik/timberland", "_self");
});

// about us 
const aboutUs = document.querySelector("#aboutUs");
aboutUs.addEventListener("click", () => {
    window.open("http://localhost:6578/butik/about","_self");
});

// command page 
const command = document.querySelectorAll("#commandShoes");
const form = document.querySelector(".form");
const imgshoes = document.getElementById("Shoes");


command.forEach(i => {
    i.addEventListener("click", () => {
        const uri = "http://localhost:6578/butik/command/render";
        const data = {
            'imglink': `${i.getAttribute("src")}`
        }
        fetch(uri, {
            method: "POST",
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ data })
        })
            .then(res => {
                return res.text()
            })
            .then(data => {
                console.log(data);
            });
            window.open("http://localhost:6578/butik/command/render");
    });
});

