
window.onscroll = function() {stickyFunction()};
console.log('í am here');
// Getting the selector header id form index.html
var stickyHeader = document.getElementById("navigation");
console.log(stickyHeader);
var stickyHeader = stickyHeader.offsetTop;
console.log(stickyHeader);
function stickyFunction() {
  if (window.pageYOffset > stickyHeader) {
    navigation.classList.add("sticky");
  } else {
    navigation.classList.remove("sticky");
  }
}
