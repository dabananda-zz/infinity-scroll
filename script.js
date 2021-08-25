const loaderEl = document.getElementById("loader");
const imageContainerEl = document.getElementById("image-container");

let photosArray = [];

const accessKey = "YILDy9SO8bXBp_dwX7aFO3R_UAs1-8v0gTrK2o2wllE";
const random = "random";
const count = 3;
const apiUrl = `https://api.unsplash.com/photos/${random}/?client_id=${accessKey}&count=${count}`;

function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

function displayPhotos() {
    photosArray.forEach((photo) => {
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

        item.appendChild(img);
        imageContainerEl.appendChild(item);
    });
}

async function getImages() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
        console.log(photosArray);
    } catch (error) {
        console.log("Oops! No images found. Try again later :)\nError -", error);
    }
}

getImages();