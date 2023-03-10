const API_URL = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1`;
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query='

// Tự động tải trang đầu tiên

getMoviesAPI(API_URL);

async function getMoviesAPI(url) {
  const response = await axios.get(url);
  const data = await response.data.results;
  showMovie(data);
}

function showMovie(data) {
  let htmlCode = ``;
  data?.map((val) => {
    htmlCode += `
      <div class="col-12 col-sm-6 col-md-3">
        <div class="item">
          <div class="box-image">
            <img src=${IMG_PATH + val.poster_path} alt="${val.title}"/>
          </div>
          <div class="box-content">
            <h3 class="title-film">${val.title}</h3>
            <p class="rating ${getClassByRate(val.vote_average)}">${val.vote_average}</p>
          </div>
          <div class="box-description">
            <h4>Overview</h4>
            <p>${val.overview}</p>
          </div>
        </div>
      </div>`;
  });

  const content = document.querySelector('.listing-product .row');
  content.innerHTML += htmlCode;
}

function getClassByRate(vote) {
  if (vote >= 8) {
    return 'green';
  } else if (vote >= 5) {
    return 'orange';
  } else {
    return 'red';
  }
}

const form = document.querySelector('#form');
const search = document.querySelector('#search');

form.addEventListener('submit', function (e) {
  e.preventDefault();
  const searchTerm = search.value;
  console.log(searchTerm, 'searchTerm');
  if (searchTerm && searchTerm !== '') {
    getMoviesAPI(SEARCH_API + searchTerm);
    search.value = '';
  } else {
    window.location.reload();
  }
});

// Thêm nút Load More
const loadMoreButton = document.querySelector('#load-more');
let currentPage = 1;

loadMoreButton.addEventListener('click', function () {
  currentPage++;
  const apiUrl = `${API_URL}&page=${currentPage}`;
  getMoviesAPI(apiUrl);
});
