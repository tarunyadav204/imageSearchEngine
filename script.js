const accessKey = "G1eSiqzrlHT4bCpALRVAeAeJidfbX6NFVQAdaiEKtYM";
const searchForm = document.getElementById('search-form');
const searchBox = document.getElementById('search-box');
const searchResult = document.getElementById('search-result');
const searchMore = document.getElementById('show-more-btn');
 
let keyword = "";
let page = 1;
async function searchEngine(){
   try{
    keyword = searchBox.value;
    const response =await fetch(`https://api.unsplash.com/search/photos?page=${page}&query=${keyword}%3E&client_id=${accessKey}&per_page=12`);
    const data = await response.json();
    const result = await data.results;

    if(page===1)
    {
        searchResult.innerHTML="";
    }
    result.map((item , index)=>{
      const image = document.createElement('img');
      image.src = item.urls.small;
      const imageLink = document.createElement('a');
      imageLink.href = item.links.html;
      imageLink.target="_blank";
      imageLink.appendChild(image);
      searchResult.appendChild(imageLink);
    })
 
    searchBox.value="";
    searchMore.style.display="block";
   }
   catch(err){
     console.log("Error : " , err);
   }
}


searchForm.addEventListener("submit" , (e)=>{
    e.preventDefault();
    page = 1;

    searchEngine();
})

searchMore.addEventListener("click" , ()=>{
    page++;
    searchEngine();
})