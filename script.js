const loaderEl = document.getElementById("loader");
const imageContainerEl = document.getElementById("image-container");

let photosArray = [];

const accessKey = "YILDy9SO8bXBp_dwX7aFO3R_UAs1-8v0gTrK2o2wllE";
const random = "random";
const count = 30;
const apiUrl = `https://api.unsplash.com/photos/${random}/?client_id=${accessKey}&count=${count}`;

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;

function imageLoaded() {
    imagesLoaded++;

    if (imagesLoaded === totalImages) {
        ready = true;
        loaderEl.hidden = true;
    }
}

function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

function displayPhotos() {
    totalImages += photosArray.length;

    photosArray.forEach((photo) => {
        const imageItemEl = document.createElement("div");
        setAttributes(imageItemEl, {
            class: "image-item"
        });

        const item = document.createElement("a");
        setAttributes(item, {
            href: photo.links.html,
            target: "_blank"
        });

        const img = document.createElement("img");
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        });

        const reactionsEl = document.createElement("div");
        setAttributes(reactionsEl, {
            class: "reactions"
        });

        reactionsEl.innerHTML = "";

        const likes = photo.likes;
        const views = photo.views;
        const downloads = photo.downloads;
        const download = photo.urls.raw;

        reactionsEl.innerHTML += `<div>
                                    <i class="bi bi-heart"></i>
                                    <span class="react"> &nbsp;${likes}<span>
                                </div>
                                <div>
                                    <i class="bi bi-eye"></i>
                                    <span class="react"> &nbsp;${views}</span>
                                </div>
                                <div>
                                    <a href="${download}" target="_blank">
                                        <i class="bi bi-download"></i>
                                    </a>
                                    <span class="react"> &nbsp;${downloads}</span>
                                </div>`

        img.addEventListener("load", imageLoaded);

        item.appendChild(img);
        imageItemEl.appendChild(item);
        imageItemEl.appendChild(reactionsEl);
        imageContainerEl.appendChild(imageItemEl);
    });
}

async function getImages() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        console.log(photosArray);
        displayPhotos();
    } catch (error) {
        console.log("Oops! No images found. Try again later :)\nError -", error);
    }
}

window.addEventListener("scroll", () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight -  1000 && ready) {
        ready = false;
        getImages();
    }
});

getImages();