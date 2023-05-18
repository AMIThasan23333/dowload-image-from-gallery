// hEB9wQM6IFynOtJSgVYx7PiqFISKgiCW6xNLZ314P65BfTLoQgYEUlC4

const imageWrapper = document.querySelector(".images")

const loadMoreBtn = document.querySelector(".load-more")


const apiKey="hEB9wQM6IFynOtJSgVYx7PiqFISKgiCW6xNLZ314P65BfTLoQgYEUlC4";

const perpage =15
let currentPage = 1



const generateHTML = (images) => {

     imageWrapper.innerHTML +=  images.map(img => 
        
        `
        <li class="card">
        <img src=${img.src.large2x} alt="" srcset="">

        <div class="details">

            <div class="photographer">

        <i class="uil uil-camera"></i>
        <span>${img.phototgrapher}</span>
            </div>

            <button><i class="uil uil-import"></i></button>

        </div>
        </li> `
        ).join("")
}


const getImages = (apiURL) => {

    fetch(apiURL, {
        headers : { Authorization : apiKey}
    })
    .then(res => res.json())
    .then(data => {
        generateHTML(data.photos)
    })
}

loadMoreImages = () =>  {

    currentPage++;

    let apiURL = `https://api.pexels.com/v1/curated?page=${currentPage}per_page=${perpage}`

    getImages(apiURL)
}


getImages(`https://api.pexels.com/v1/curated?page=${currentPage}per_page=${perpage}`)
loadMoreBtn.addEventListener("click", loadMoreImages)