// airforce 1 events
const airfore = document.querySelector("#airForce");
airfore.addEventListener("click", () => {
    window.open("http://localhost:3000/butik/airforce", "_blank");
});

// jordan 1 events

const jordan1 = document.querySelector("#airJordan1");
jordan1.addEventListener("click", () => {
    window.open("http://localhost:3000/butik/jordan1", "_blank");
});

// jordan 4 events

const jordan4 = document.querySelector("#jordan4");
jordan4.addEventListener("click", () => {
    window.open("http://localhost:3000/butik/jordan4", "_blank");
});

// jordan 6 events

const jordan6 = document.querySelector("#jordan6");
jordan6.addEventListener("click", () => {
    window.open("http://localhost:3000/butik/jordan6", "_blank");
});

// jordan 6 events

const timberland = document.querySelector("#timberland");
timberland.addEventListener("click", () => {
    window.open("http://localhost:3000/butik/timberland", "_blank");
});

// about us 
const aboutUs = document.querySelector("#aboutUs");
aboutUs.addEventListener("click", () => {
    window.open("http://localhost:3000/butik/about");
});

const command = document.querySelectorAll("img");
command.forEach(i => {
   i.addEventListener("click", () => {
        window.open("http://localhost:3000/butik/command", "_blank");
    });
});

const imgClient = document.getElementById("imgClient");

command.forEach(i => {
    const img = document.createElement("img");
    const src = i.src;
    img.alt = "image";
    img.src = src;
    imgClient.appendChild(img);
    console.log(img);
});


