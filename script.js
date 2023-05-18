// hEB9wQM6IFynOtJSgVYx7PiqFISKgiCW6xNLZ314P65BfTLoQgYEUlC4

const imageWrapper = document.querySelector(".images")

const loadMoreBtn = document.querySelector(".load-more")

const searchInput =  document.querySelector(".search-box input")


const lightpox =  document.querySelector(".lightbox")


let searchTerm =null;


const apiKey="hEB9wQM6IFynOtJSgVYx7PiqFISKgiCW6xNLZ314P65BfTLoQgYEUlC4";

const perpage =15
let currentPage = 1



const downloading = (imgURL) => {



    fetch(imgURL)
    .then(res => res.blob())
    .then(file => {
       

        const a = document.createElement("a");
        a.href = URL.createObjectURL(file)
        a.download = new Date().getTime();
        a.click();
    })
    .catch(() => alert("Failed to  download image !"))

}


  const showLightbox = (name, img) => {

    
     lightpox.querySelector("img").src = img;
     lightpox.querySelector("span").innerText = name;
     lightpox.classList.add("show")

  }




const generateHTML = (images) => {

     imageWrapper.innerHTML +=  images.map(img => 
        
        `
        <li class="card" onclick="showLightbox('${img.phototgrapher}', ${img.src.large2x})">
        <img src=${img.src.large2x} alt="" srcset="">

        <div class="details">

            <div class="photographer">

        <i class="uil uil-camera"></i>
        <span>${img.phototgrapher}</span>
            </div>

            <button onClick="downloading('${img.src.large2x}')">
            <i class="uil uil-import"></i>
            </button>

        </div>
        </li> `
        ).join("")
}


const getImages = (apiURL) => {

    /* setting disable button  */

    loadMoreBtn.innerText = 'Loading...'
    loadMoreBtn.classList.add("disabled");


    fetch(apiURL, {
        headers : { Authorization : apiKey}
    })
    .then(res => res.json())
    .then(data => {
        generateHTML(data.photos)

    /* after loading data button back to normal  */

        loadMoreBtn.innerText = 'Load More.'
        loadMoreBtn.classList.remove("disabled");
    })
    .catch(() => alert("Failed To load Images!"))
}

loadMoreImages = () =>  {

    currentPage++;

    let apiURL = `https://api.pexels.com/v1/curated?page=${currentPage}per_page=${perpage}`

/* if searcItem has some value call api with search term else call default api */

    apiURL = searchTerm ? `https://api.pexels.com/v1/search?query=${searchTerm}&page=${currentPage}&per_page=${perpage}` :  apiURL;

    getImages(apiURL)
}


 const  loadSearchImages = (e) => {


    if(e.target.value === '') return searchTerm = null;

 
    if(e.key === 'Enter') {

       currentPage =1;
       searchTerm = e.target.value;
       imageWrapper.innerHTML = " ";
       getImages(`https://api.pexels.com/v1/search?query=${searchTerm}&page=${currentPage}&per_page=${perpage}`);


    }

 }



getImages(`https://api.pexels.com/v1/curated?page=${currentPage}per_page=${perpage}`)
loadMoreBtn.addEventListener("click", loadMoreImages)

searchInput.addEventListener("keyup", loadSearchImages)