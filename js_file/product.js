
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

const uri = "http://localhost:6578/butik/command/render";

function eventsFunction() {
    command.forEach(i => {
        i.addEventListener("click", () => {

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
                    return res.json();
                })
                .then(data => {
                    const Window = window.open("http://localhost:6578/butik/command", "_self").document.write(`
                    <!DOCTYPE html>
                    <html lang="en">
                    <head>
                    <meta charset="UTF-8">
                    <meta http-equiv="X-UA-Compatible" content="IE=edge">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Butik | Pass your command</title>
                    </head>
                    <body>
                    <header>
                    <h1 id="passYourCommand">Pass your command on Butik</h1>
                    <p class="blackColor">-<span>BLACK COLOR</span> Entertainment-</p>
                    </header>
                    <section class="commandSection">
                    <div class="commandImage">
                    <div id="imgClient">
                    <img src="/public/${data[0].image}" id="Shoes" alt="image">
                    </div>
                    <div id="details">
                    <p shoesDetails>model : ${data[0].model}<br>size : ${data[0].size}<br>price : ${data[0].price}</p>
                    </div>
                    </div>
                    <div class="commandForm">
                    <form action="/command" method="post" enctype="multipart/form-data">
                        <label for="name">Name</label>
                        <input type="text" name="name" id="clientName">
                        <label for="postName">Post-Name</label>
                        <input type="text" name="postName" id="clientPostName">
                        <label for="email">Email</label>
                        <input type="email" name="email" id="clientEmail"><br>
                        <p>contry</p>
                        <label for="congo">Congo DRC</label>
                        <input type="radio" name="ClientContry" id="clientContry" value="congo">
                        <label for="burundi">Burundi</label>
                        <input type="radio" name="ClientContry" id="clientContry" value="burundi">
                        <label for="rwanda">Rwanda</label>
                        <input type="radio" name="ClientContry" id="clientContry" value="rwanda"><br>
                        <label for="Phone">Phone Number</label>
                        <input type="tel" name="Phone" id="clientPhone">
                        <button type="submit" id="ClientSubmitButton">Send my Command</button>
                        </form> 
                    </div>
                    <footer class="footer">
                    <div class="copyright_container">
                    <p>&copy;Jonathan Zihindula 2021</p>
                    </div>
                    <div class="contact_container">
                    <h5>Contact us:</h5>
                    <ul>
                    <li><a href="#">Instagram</a></li>
                    <li><a id="faceboock">Facebook</a></li>
                    <li><a href="mailto:blackcolorent@gmail.com">Email</a></li>
                    <li><a href="tel:+2507810980810">WhatsApp</a></li>
                    <li><a id="aboutUs">About us</a></li>
                    </ul>
                    </div>
                    </footer>
                    </body>
                    </html>`);
                    document.close();
                    console.log(data);
                });
        });
    });
}
eventsFunction();
const button = document.getElementsByTagName("button");
button[0].addEventListener("click", (e) => {
    e.preventDefault();
    alert("command sent succesfully !!");
});