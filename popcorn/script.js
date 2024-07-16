const discoverMovieUrl = "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=it-IT&sort_by=popularity.desc"
const discoverTvUrl = "https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=it-IT&page=1&sort_by=popularity.desc"
const tileTemplate = document.getElementById("tile-template")
const gallery = document.getElementById("gallery")
const tvShowLink = document.getElementById("tv-shows")
const moviesLink = document.getElementById("movies") 
const detailsContainer = document.getElementById("details-container")
const menu = document.getElementById("menu-container")
const dropdown = document.getElementById("dropdown")
const selectListFromSelect = document.getElementById("list-selection")
let currentListTitle = document.getElementById("current-list-title")
let currentListStatus = ""
let currentFetchUrl = ""

let poster = []
let resultList = []
let genreList = []
let detailList = {}
let currentList = discoverMovieUrl
let isFirstTime = true
currentListTitle.innerHTML = ""



selectListFromSelect.addEventListener("change", () => {
    if(selectListFromSelect.value === "tv-shows"){
    isFirstTime = true
    poster = []
    resultList = []
    genreList = []
    getCurrentList(discoverTvUrl,1)
    currentListTitle.innerHTML = "Serie Tv"
    }
    if (selectListFromSelect.value === "movies") {
        isFirstTime = true
        poster = []
        resultList = []
        genreList = []
        getCurrentList(discoverMovieUrl, 1)
    }

})
tvShowLink.addEventListener("click", () => {
    isFirstTime = true
    poster = []
    resultList = []
    genreList = []
    getCurrentList(discoverTvUrl,1)
})

moviesLink.addEventListener("click", () => {
    isFirstTime = true
    poster = []
    resultList = []
    genreList = []
    getCurrentList(discoverMovieUrl,1)
})

const loadMoreListBtn = document.getElementById("more-btn")
let pageList = 1
loadMoreListBtn.addEventListener("click", () => {
    isFirstTime = false
    resultList = []
    genreList = []
    pageList += 1
    getCurrentList(currentList,pageList)
})




const getCurrentList = async (url, page) =>{
    /* AUTENTICATION */
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZDQzMGJkMjVmMDk1MWQ1ZmE1MTczYjI0NzA3MGVlYSIsIm5iZiI6MTcyMDQyNjMwMi4zNzkzOTUsInN1YiI6IjY2OGI5ZDZjNTk4N2EwNzVmZmJhNWFlZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.x4USAb_h04iFJQ7s7VOwRvK50jqf2rQwGI_g9cLxoUE'
        }
      };
      /* POPULAR MOVIES LIST */
    try{
    const resp = await fetch(`${url}&page=${page}`, options)
    const data = await resp.json()
    for( let i = 0; i< data.results.length; i++){
        resultList.push(data.results[i])
    }
    console.log(data)
    getGenreList()
    }catch (err){
        console.log(err)
    }
    switch (url) {
        case discoverMovieUrl:
            currentListStatus = "movies"
            currentListTitle.innerHTML = "Film"
            console.log("movie")
            break;
    
        case discoverTvUrl:
            currentListStatus = "tv-series"
            currentListTitle.innerHTML = "Serie Tv"
            console.log("series")
            break;
    }
    
}
getCurrentList(currentList,pageList)

const getGenreList = async () =>{

/* GENRES LIST */
const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZDQzMGJkMjVmMDk1MWQ1ZmE1MTczYjI0NzA3MGVlYSIsIm5iZiI6MTcyMDQyNjMwMi4zNzkzOTUsInN1YiI6IjY2OGI5ZDZjNTk4N2EwNzVmZmJhNWFlZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.x4USAb_h04iFJQ7s7VOwRvK50jqf2rQwGI_g9cLxoUE'
    }
  };
try{
    const resp = await fetch('https://api.themoviedb.org/3/genre/movie/list?language=it', options)
    const data = await resp.json()
    /* console.log(data) */
    for( let i = 0; i< data.genres.length; i++){
        genreList.push(data.genres[i])
    }
    
    }catch (err){
        console.log(err)
    }
    createMovieGallery(resultList,isFirstTime)

}


const getMovieDetails = async (movie_id) => {
    /* FIND MOVIE DETAILS */
    if (currentListStatus === "movies"){
        currentFetchUrl = `https://api.themoviedb.org/3/movie/${movie_id}?language=it-IT`
    }
    if (currentListStatus === "tv-series"){
        currentFetchUrl = `https://api.themoviedb.org/3/tv/${movie_id}?language=it-IT`
    }
    
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZDQzMGJkMjVmMDk1MWQ1ZmE1MTczYjI0NzA3MGVlYSIsIm5iZiI6MTcyMDQyNjMwMi4zNzkzOTUsInN1YiI6IjY2OGI5ZDZjNTk4N2EwNzVmZmJhNWFlZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.x4USAb_h04iFJQ7s7VOwRvK50jqf2rQwGI_g9cLxoUE'
        }
      };
      
    try{
    const resp = await fetch(currentFetchUrl, options)
    const data = await resp.json()
    console.log(data)
    detailList = data
    console.log(detailList)
    showDetails(detailList)
    }catch (err){
        console.log(err)
    }
}
const getTvDetails = async (movie_id) => {
    /* FIND TV DETAILS */
    
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZDQzMGJkMjVmMDk1MWQ1ZmE1MTczYjI0NzA3MGVlYSIsIm5iZiI6MTcyMDQyNjMwMi4zNzkzOTUsInN1YiI6IjY2OGI5ZDZjNTk4N2EwNzVmZmJhNWFlZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.x4USAb_h04iFJQ7s7VOwRvK50jqf2rQwGI_g9cLxoUE'
        }
      };
      
    try{
    const resp = await fetch(`https://api.themoviedb.org/3/movie/${movie_id}?language=it-IT`, options)
    const data = await resp.json()
    console.log(data)
    detailList = data
    console.log(detailList)
    showDetails(detailList)
    }catch (err){
        console.log(err)
    }
}


const createMovieGallery = async (arr,initialize) => {
    
if(initialize === true){
    tileTemplate.innerHTML = ""
}

    for( let i = 0; i< arr.length; i++){ 
        let {id,title,overview,backdrop_path,poster_path,vote_average,genre_ids} = arr[i]
        let strGenr = ""
        genre_ids.forEach((movieGenre, ind) => {
            genreList.map((el) => {
                if (el["id"] === movieGenre) { 
                    if( ind === genre_ids.length - 1){
                        strGenr += `${el["name"]}`
                    }else{
                    strGenr += `${el["name"]} - `
                     }
                }

            }, 0)
        })
    const strPoster = `https://image.tmdb.org/t/p/w500${poster_path}`
    
    
    strHtml = `
    <div class="tile-container" id="${id}" onClick="getMovieDetails(this.id)">
                <div class="glowing-background"></div>
                <div class="info-background">
                    <div class="genre-labels">${strGenr}</div>
                </div>
                <img class="tile-poster-movie" src="${strPoster}" alt="">
                
    </div>
    `
    
    tileTemplate.innerHTML += strHtml
    
    }

  poster = document.querySelectorAll(".tile-poster-movie")
}   

const tileContainer = document.getElementById("")

const showDetails = async (obj) => {
    detailsContainer.innerHTML = ""
            let strDetails = ""
            let title = obj.title
            let relase = obj.relase_date
            let poster = `https://image.tmdb.org/t/p/w500${obj.poster_path}`
            let overview = obj.overview
            let genres = []
            obj.genres.map( (el) => { genres.push(el.name) },0)
            let runtime = obj.runtime 
            console.log(genres)
            const hours = Math.floor(runtime/60)
            let min = runtime%60
            min < 10? min = "0" + min : min = min
        
        strDetails = `
         
        <div id="img-container" class="a">
            <img id="selected-poster" src="${poster}">
        </div>
        <div id="title-container" class="b">
            <div id="selected-title">${title} - ${relase}</div>
            <div id="runtime">${hours}h ${min}m</div>
            <div id="selected-description">${overview}</div>
        </div>
        <div id="close-icon" class="c" onClick="closeDetails"><img src="icon/close.svg" alt=""></div>
        `
     detailsContainer.innerHTML += strDetails
     detailsContainer.style.display = "grid"
     const closeIcon = document.getElementById("close-icon")
     closeIcon.addEventListener("click", closeDetails)
} 

const closeDetails =  () => {
    console.log("close")
     detailsContainer.style.display = "none"
     detailsContainer.innerHTML = ""
}