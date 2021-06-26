const button = document.getElementById("SpecialBtn")
button.addEventListener("click", () => {
    window.open("../special/command/customer", "_self");
});

    // firebase config
const firebaseConfig = {
    apiKey: "AIzaSyA48Gacn3rEuRN-at1zM6h2jPtbXjxQb5A",
    authDomain: "butik004.firebaseapp.com",
    projectId: "butik004",
    storageBucket: "butik004.appspot.com",
    messagingSenderId: "938999710447",
    appId: "1:938999710447:web:14229261ddc157fa89111a",
    measurementId: "G-CPMFFBG20H"
};
// firebase init
firebase.initializeApp(firebaseConfig);
const fireDb = firebase.storage();
const realTimeDb = firebase.database();



// getting file

const buttonSubmit = document.getElementById("submit");
const prog = document.querySelector("#progress");
const file = document.getElementById("File");

    // buttonSubmit.addEventListener('click',(e)=>{
    file.addEventListener('change', (event) => {
        const date = Date.now();
        const imageName = `image_${date}`;
        const myFile = event.target.files;
        console.log(myFile);
        const storageRef = fireDb.ref(`butik/` + imageName);
        const uploadTask = storageRef.put(myFile[0]);


        uploadTask.on("state_changed", function (snapshot) {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            prog.innerHTML = progress + "%";
        },
        
            function (err) {
                console.log(err)
            },
       
            function () {
                uploadTask.snapshot.ref.getDownloadURL().then(function (url) {

                    // get input length
                    const size = document.querySelector("#size");
                    const model = document.querySelector("#Model");
                    const price = document.querySelector("#price");
                    const sizeLength = size.value.length;
                    const modelLength = model.value.length;
                    const priceLength = price.value.length;
                    console.log(modelLength, priceLength, sizeLength);

                    if (modelLength && priceLength && sizeLength !== 0) {

                        fetch('../products/details', {
                            method: "POST",
                            headers: {
                                'Accept': '*/*',
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                image: url,
                                model: model.value,
                                price: price.value,
                                size:size.value
                            })
                        })
                    }
                })
            }
        
     
        );
    });

