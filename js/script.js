const global = {
  currentPage: window.location.pathname,
  search: {
    term: '',
    type: '',
    page: 1,
    totalPages: 1,
  },

  api: {
    apiKey: '40cf6020b3a10db6c58b932a3f59c3c3',
    apiUrl: 'https://api.themoviedb.org/3/',
    apiToken:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MGNmNjAyMGIzYTEwZGI2YzU4YjkzMmEzZjU5YzNjMyIsInN1YiI6IjY0ZGI1MzEzYjc3ZDRiMTEzZTA0Zjk3NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gTUMfMIjX2280MOuH42mcYE6Z7vKM6WgwqabRoIURG8',
  },
};

// Display popular movies
async function displayPopularMovies() {
  const { results } = await fetchAPIData('movie/popular');
  console.log(results);
  results.forEach((movie) => {
    const popularList = document.getElementById('popular-movies');

    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
      <a href='movie-details.html?id=${movie.id}'>
        ${
          movie.poster_path
            ? `<img src='https://image.tmdb.org/t/p/w500${movie.poster_path}' class='card-img-top' alt='Movie Title' />`
            : `<img src='images/no-image.jpg' class='card-img-top' alt='Movie Title' />`
        }
      </a>
      <div class='card-body'>
        <h5 class='card-title'>${movie.title}</h5>
        <p class='card-text'>
          <small class='text-muted'>Release: ${movie.release_date}</small>
        </p>
      </div>
  `;

    popularList.appendChild(div);
  });
}

// Display popular TV shows
async function displayPopularTVShows() {
  const { results } = await fetchAPIData('tv/popular');
  console.log(results);
  results.forEach((show) => {
    const popularList = document.getElementById('popular-shows');

    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
      <a href='tv-details.html?id=${show.id}'>
        ${
          show.poster_path
            ? `<img src='https://image.tmdb.org/t/p/w500${show.poster_path}' class='card-img-top' alt='Movie Title' />`
            : `<img src='images/no-image.jpg' class='card-img-top' alt='Movie Title' />`
        }
      </a>
      <div class='card-body'>
        <h5 class='card-title'>${show.name}</h5>
        <p class='card-text'>
          <small class='text-muted'>Air Date: ${show.first_air_date}</small>
        </p>
      </div>
  `;

    popularList.appendChild(div);
  });
}

// Display movie details
async function displayMovieDetails() {
  // Get id
  const id = window.location.search.split('=')[1];

  const movieDetails = await fetchAPIData(`movie/${id}`);
  // console.log(movieDetails);

  // Display background Image
  displayBackgroudImage('movie', movieDetails.backdrop_path);

  const movieDetailsDiv = document.getElementById('movie-details');

  const divTop = document.createElement('div');
  divTop.classList.add('details-top');
  divTop.innerHTML = `
      <div>
      ${
        movieDetails.poster_path
          ? `<img src='https://image.tmdb.org/t/p/w500${movieDetails.poster_path}' class='card-img-top' alt='Movie Title' />`
          : `<img src='images/no-image.jpg' class='card-img-top' alt='Movie Title' />`
      }
          </div>
          <div>
            <h2>${movieDetails.title}</h2>
            <p>
              <i class="fas fa-star text-primary"></i>
              ${movieDetails.vote_average.toFixed(1)} / 10
            </p>
            <p class="text-muted">Release Date: ${movieDetails.release_date}</p>
            <p>${movieDetails.overview}</p>
            <h5>Genres</h5>
            <ul class="list-group">
            ${movieDetails.genres
              .map((genre) => `<li>${genre.name}</li>`)
              .join('')}
            </ul>
            <a href="#" target="_blank" class="btn">Visit Movie Homepage</a>
          </div>
  `;

  const divBottom = document.createElement('div');
  divBottom.classList.add('details-bottom');

  divBottom.innerHTML = `
        <h2>Movie Info</h2>
          <ul>
            <li><span class="text-secondary">Budget:</span> $${addCommasToNumber(
              movieDetails.budget
            )}</li>
            <li><span class="text-secondary">Revenue:</span> $${addCommasToNumber(
              movieDetails.revenue
            )}</li>
            <li><span class="text-secondary">Runtime:</span> ${
              movieDetails.runtime
            } minutes</li>
            <li><span class="text-secondary">Status:</span> ${
              movieDetails.status
            }</li>
          </ul>
          <h4>Production Companies</h4>
        <div class="list-group">
        ${movieDetails.production_companies
          .map((com) => `<span>${com.name}</span>`)
          .join(', ')}</div>
        `;

  movieDetailsDiv.appendChild(divTop);
  movieDetailsDiv.appendChild(divBottom);
}

// Display show details
async function displayShowDetails() {
  // Get id
  const id = window.location.search.split('=')[1];

  const showDetails = await fetchAPIData(`tv/${id}`);
  console.log(showDetails);

  // Display background Image
  displayBackgroudImage('tv', showDetails.backdrop_path);

  const showDetailsDiv = document.querySelector('#show-details');

  const div = document.createElement('div');
  div.innerHTML = `
        <div class="details-top">
          <div>
            ${
              showDetails.poster_path
                ? `<img src='https://image.tmdb.org/t/p/w500${showDetails.poster_path}' class='card-img-top' alt='Show Title' />`
                : `<img src='images/no-image.jpg' class='card-img-top' alt='Show Title' />`
            }
          </div>
          <div>
            <h2>${showDetails.name}</h2>
            <p>
              <i class="fas fa-star text-primary"></i>
              ${showDetails.vote_average.toFixed(1)} / 10
            </p>
            <p class="text-muted">Release Date: ${
              showDetails.first_air_date
            }</p>
            <p>
              ${showDetails.overview}
            </p>
            <h5>Genres</h5>
            <ul class="list-group">
              ${showDetails.genres
                .map((genre) => `<li>${genre.name}</li>`)
                .join('')}
            </ul>
            <a href="#" target="_blank" class="btn">Visit Show Homepage</a>
          </div>
        </div>
        <div class="details-bottom">
          <h2>Show Info</h2>
          <ul>
            <li><span class="text-secondary">Number Of Episodes:</span> ${addCommasToNumber(
              showDetails.number_of_episodes
            )}</li>
            <li>
              <span class="text-secondary">Last Episode To Air:</span> ${
                showDetails.last_episode_to_air.name
              }
            </li>
            <li><span class="text-secondary">Status:</span> ${
              showDetails.status
            }</li>
          </ul>
          <h4>Production Companies</h4>
          <div class="list-group">${showDetails.production_companies
            .map((com) => `${com.name}`)
            .join(', ')}</div>
        </div>
      `;

  showDetailsDiv.appendChild(div);
}

// Display backdrop in details page
function displayBackgroudImage(type, backgroundPath) {
  const overlayDiv = document.createElement('div');

  overlayDiv.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${backgroundPath})`;
  overlayDiv.style.backgroundSize = 'cover';
  overlayDiv.style.backgroundPosition = 'center';
  overlayDiv.style.backgroundRepeat = 'no-repeat';
  overlayDiv.style.height = '130vh';
  overlayDiv.style.width = '100vw';
  overlayDiv.style.position = 'absolute';
  overlayDiv.style.top = '0';
  overlayDiv.style.left = '0';
  overlayDiv.style.zIndex = '-1';
  overlayDiv.style.opacity = '0.1';

  if (type === 'movie') {
    document.querySelector('#movie-details').appendChild(overlayDiv);
  } else {
    document.querySelector('#show-details').appendChild(overlayDiv);
  }
}

// Add now playing
async function displayNowPlaying() {
  const { results } = await fetchAPIData(`movie/now_playing`);
  console.log(results);

  const swiperWrapper = document.querySelector('.swiper-wrapper');

  results.forEach((result) => {
    const div = document.createElement('div');
    div.classList.add('swiper-slide');
    div.innerHTML = `
    <a href="movie-details.html?id=${result.id}">
      <img src="https://image.tmdb.org/t/p/w500${
        result.poster_path
      }" alt="Movie Title" />
    </a>
    <h4 class="swiper-rating">
      <i class="fas fa-star text-secondary"></i> ${result.vote_average.toFixed(
        1
      )} / 10
    </h4>
  `;

    swiperWrapper.appendChild(div);
    initSwiper();
  });
}

// Swiper
function initSwiper() {
  const swiper = new Swiper('.swiper', {
    slidesPerView: 1,
    spaceBetween: 30,
    freeMode: true,
    loop: true,
    autoplay: {
      delay: 3000,
      disableonInteraction: false,
    },
    breakpoints: {
      500: {
        slidesPerView: 2,
      },
      700: {
        slidesPerView: 3,
      },
      1200: {
        slidesPerView: 4,
      },
    },
  });
}

// Fetch data from TMDB API
async function fetchAPIData(endpoint) {
  showSpinner();
  // const API_URL = 'https://api.themoviedb.org/3/';
  // const API_KEY = '40cf6020b3a10db6c58b932a3f59c3c3';

  const API_URL = global.api.apiUrl;
  const API_KEY = global.api.apiKey;
  const API_TOKEN = global.api.apiToken;

  const response = await fetch(
    //api_key=${API_KEY}&
    `${API_URL}${endpoint}?language=en-US`,
    {
      method: 'GET',
      headers: {
        Authorization: API_TOKEN,
      },
    }
  );

  const data = await response.json();
  hideSpinner();
  return data;
}

// Make request to Search
async function searchAPIData(endpoint) {
  showSpinner();
  const API_URL = global.api.apiUrl;
  const API_KEY = global.api.apiKey;
  const API_TOKEN = global.api.apiToken;

  const response = await fetch(
    //api_key=${API_KEY}&
    `${API_URL}search/${global.search.type}?language=en-US&query=${global.search.term}`,
    {
      method: 'GET',
      headers: {
        Authorization: API_TOKEN,
      },
    }
  );

  const data = await response.json();
  hideSpinner();
  return data;
}

// Search movies/shows
async function search() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  global.search.type = urlParams.get('type');
  global.search.term = urlParams.get('search-term');

  if (global.search.term !== '' && global.search.term !== null) {
    const results = await searchAPIData();
    console.log(results);
  } else {
    showAlert('please enter a search term');
  }
  console.log(global.search.type);
}

// Highlight Active link
function highlightActiveLink() {
  const links = document.querySelectorAll('.nav-link');
  links.forEach((link) => {
    if (link.getAttribute('href') === global.currentPage) {
      link.classList.add('active');
    }
  });
}

// show spinner
function showSpinner() {
  const spinner = document.querySelector('.spinner');
  spinner.classList.add('show');
}

// hide spinner
function hideSpinner() {
  const spinner = document.querySelector('.spinner');
  spinner.classList.remove('show');
}

// Show empty search alert
function showAlert(message, className) {
  const alertEl = document.createElement('div');
  alertEl.classList.add('alert', className);
  alertEl.appendChild(document.createTextNode(message));
  document.querySelector('#alert').appendChild(alertEl);

  setTimeout(() => {
    alertEl.remove();
  }, 3000);
}

// Add commas
function addCommasToNumber(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// Init App
function init() {
  //   console.log(global.currentPage);
  switch (global.currentPage) {
    case '/':
    case '/index.html':
      displayNowPlaying();
      displayPopularMovies();
      console.log('Home');
      break;
    case '/shows.html':
      displayPopularTVShows();
      console.log('Shows');
      break;
    case '/movie-details.html':
      displayMovieDetails();
      console.log('Movie details');
      break;
    case '/search.html':
      search();
      console.log('Search');
      break;
    case '/tv-details.html':
      displayShowDetails();
      console.log('TV details');
      break;
  }
  highlightActiveLink();
}

document.addEventListener('DOMContentLoaded', init);
