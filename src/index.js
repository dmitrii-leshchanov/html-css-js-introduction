console.log("Launching script");
const anchors = document.querySelectorAll(".thumbnails-anchor");
const detailsImage = document.querySelector(".details-image");
const detailsTitle = document.querySelector(".details-title");
const mainClass = document.querySelector(".main-class");
const HIDDEN = "hidden";
const hideShowBtn = document.querySelector(".hide-show-block-button");
function setDetails(anchor) {
    detailsImage.setAttribute('src', anchor.getAttribute('data-details-image'));
    detailsTitle.innerHTML = anchor.getAttribute('data-details-title');
}

hideShowBtn.addEventListener("click", function() {
    if(mainClass.classList.contains(HIDDEN)) {
        showDetails();
        hideShowBtn.innerHTML = "Hide";
    } else {
        hideDetails();
        hideShowBtn.innerHTML = "Show";
    }
})

for(let i = 0; i < anchors.length; i++) {
    anchors[i].addEventListener("click", function() {
        console.log("event - click on ", anchors[i]);
        showDetails();
        setDetails(anchors[i]);
    })
}
function showDetails() {
    mainClass.classList.remove(HIDDEN);
}
function hideDetails() {
    mainClass.classList.add(HIDDEN);
}