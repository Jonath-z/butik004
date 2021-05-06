// command events
const imgClient = document.getElementById("details");
const cmd = document.querySelectorAll("img");

cmd.forEach(i => {
    const img = document.createElement("img");
    const src = i.src;
    img.alt = "image";
    img.src = src;
    imgClient.appendChild(img);
    console.log(img);
});
