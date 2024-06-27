const API_KEY = 'api_key=1cf50e6248dc270629e802686245c2c8';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const searchURL = BASE_URL + '/search/movie?' + API_KEY;

function getMovies(url) {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data.results);
            showMovies(data.results);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

function searchMovies() {
    const searchTerm = document.getElementById('search').value;
    if (searchTerm) {
        getMovies(searchURL + '&query=' + searchTerm);
    }
}

function showMovies(movies) {
    const movieContainer = document.getElementById('movie-container');
    movieContainer.innerHTML = '';

    movies.forEach(movie => {
        const { title, poster_path, vote_average, overview } = movie;
        const movieElement = document.createElement('div');
        movieElement.classList.add('movie');
        movieElement.innerHTML = `
            <img src="${IMG_URL + poster_path}" alt="${title}">
            <h3>${title}</h3>
            <p>Rating: ${vote_average}</p>
            <p>${overview}</p>
        `;
        movieContainer.appendChild(movieElement);
    });
}

// Load popular movies on page load
getMovies(API_URL);
