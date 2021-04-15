
// diaporama 
var img = [];

img[0] = './image/backgroundImg3.jpeg';
img[1] = './image/backgroundImg4.jpeg';

var imageContainer = document.getElementsByTagName('img');
var i = 0;
var timmer = 3000;
function imageChange() {
    document.image.src = img[i];
if (i < img.length-1) {
    i++
}
else {
    i = 0;
}
    setTimeout("imageChange()", timmer);
}
window.onload = imageChange();
// faceboock link not available 

var facebookAction = document.getElementById('faceboock');
facebookAction.addEventListener('click', winOpen);
function winOpen(){
    window.alert(`not available now`);
}


