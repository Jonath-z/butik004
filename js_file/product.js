

// airforce 1 events
const airfore = document.querySelector("#airForce");
airfore.addEventListener("click", () => {
    window.open("../butik/airforce", "_self");
});

// jordan 1 events

const jordan1 = document.querySelector("#airJordan1");
jordan1.addEventListener("click", () => {
    window.open("../butik/jordan1", "_self");
});

// jordan 4 events

const jordan4 = document.querySelector("#jordan4");
jordan4.addEventListener("click", () => {
    window.open("../butik/jordan4", "_self");
});

// jordan 6 events

const jordan6 = document.querySelector("#jordan6");
jordan6.addEventListener("click", () => {
    window.open("../butik/jordan6", "_self");
});

// jordan 6 events

const timberland = document.querySelector("#timberland");
timberland.addEventListener("click", () => {
    window.open("../butik/timberland", "_self");
});

// about us 
const aboutUs = document.querySelector("#aboutUs");
aboutUs.addEventListener("click", () => {
    window.open("../butik/about","_self");
});

// command page 
const command = document.querySelectorAll("#commandShoes");
const form = document.querySelector(".form");
const imgshoes = document.getElementById("Shoes");

const uri1 = "../butik/command/render";
const uri2 = "../command";
function eventsFunction() {
    command.forEach(i => {
        i.addEventListener("click", () => {

            const data = {
                'imglink': `${i.getAttribute("src")}`
            }
            fetch(uri1, {
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
                    const Window = window.open("../butik/command", "_self").document.write(`
                   <!DOCTYPE html>
                    <html lang="en">
                    <head>
                    <meta charset="UTF-8">
                    <meta http-equiv="X-UA-Compatible" content="IE=edge">
                    <script src="https://momowebaccess.mtn.co.ug:8018/v0.1.0/mobile-money-widget-mtn.js"></script>
                    <link rel="stylesheet" href="/static/command.css">
                    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-eOJMYsd53ii+scO/bJGFsiCZc+5NDVN2yr8+0RDqr0Ql0h+rP48ckxlpbzKgwra6" crossorigin="anonymous">
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
                    <img src="/public/${data[0].image}" id="Shoes" alt="image"><br>
                    <p class="shoesDetails">${data[0].model}<br>size : ${data[0].size}<br><p id="price">$${data[0].price}</p></p>
                    </div>
                    <form action="/command" method="POST">
                        <label for="name">Name</label>
                        <input type="text" name="name" id="clientName" placeholder="name: 2 characters minimum" required>
                        <label for="postName">Post-Name</label>
                        <input type="text" name="postName" id="clientPostName" placeholder="postname: 2 characters minimum" required>
                        <label for="email">Email</label>
                        <input type="email" name="email" id="clientEmail" placeholder="Email adress" required><br>
                        <label for="file">command checked</label>
                        <input type="password" name="file" id="fileCommanded" readonly>
                        <label for="ClientContry">Congo DRC</label>
                        <input type="radio" name="ClientContry" id="clientContry" value="Congo DRC">
                        <label for="ClientContry">Burundi</label>
                        <input type="radio" name="ClientContry" id="clientContry" value="Burundi">
                        <label for="ClientContry">Rwanda</label>
                        <input type="radio" name="ClientContry" id="clientContry" value="Rwanda"><br>
                        <label for="Phone">Phone Number</label>
                        <input type="tel" name="Phone" id="clientPhone" placeholder="+2439935647365" required>
                        <button type="submit" id="ClientSubmitButton">Send my Command</button>
                        </form> 
                    </div>
                    <script src="/statics/command.js"></script>
                    </body>
                    </html>`);
                    document.close();
                    // console.log(data);
                });
        });
    });
}
eventsFunction();

const specialCommand = document.getElementById("customerOpen");
specialCommand.addEventListener("click", () => {
    window.open("../special/command","_self");
});
