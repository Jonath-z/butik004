
const file = document.getElementById("customersCommand");
const prog = document.querySelector("#progress");
const buttonSubmit = document.getElementById("customerButton");
buttonSubmit.addEventListener('click', () => {
    window.open("../", "_self");
})


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


file.addEventListener('change', (event) => {
    const date = Date.now();
    const imageName = `image_${date}`;
    const myFile = event.target.files;
    console.log(myFile);
    const storageRef = fireDb.ref(`command/` + imageName);
    const uploadTask = storageRef.put(myFile[0]);


    uploadTask.on("state_changed", function (snapshot) {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        prog.innerHTML = "Wait for uploading " + progress + "%";
    },
    
        function (err) {
            console.log(err)
        },

        function () {
            uploadTask.snapshot.ref.getDownloadURL().then(function (url) {

                // get input length
                const name = document.getElementById("clientName");
                const postName = document.getElementById("clientPostName");
                const email = document.getElementById("clientEmail");
                const contry = document.getElementById("clientContry");
                const phone = document.getElementById("clientPhone");
                const details = document.getElementById("customersDetails");

                // get input length
                const nameLength = name.value.length;
                const postNameLength = postName.value.length;
                const emailLength = email.value.length;
                const contryLength = contry.value.length
                const phoneLenght = phone.value.length
                const detailsLength = details.value.length

                // fetch data to a server
                if (nameLength && postNameLength && emailLength && contryLength && phoneLenght && detailsLength !== 0) {

                    fetch('../customers/command', {
                        method: "POST",
                        headers: {
                            'Accept': '*/*',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            image: url,
                            name: name.value,
                            postName: postName.value,
                            email: email.value,
                            contry: contry.value,
                            phone: phone.value,
                            details: details.value
                        })
                    });
                }
            });
        }
    
 
    );
});
