/* CONFIG */
const API_KEY = '837f23f0';
const contentContainer = document.getElementById('content-container');
const paginationContainer = document.getElementById('pagination-container');
const trendingEl = document.getElementById('trending');
const navbar = document.getElementById('navbar');
const heroTitle = document.getElementById('hero-title');
const heroDesc = document.getElementById('hero-desc');
const toastEl = document.getElementById('toast');

let currentSearchTerm = '';
let currentPage = 1;

/* THEME */
const themeToggle = document.getElementById('theme-toggle');
const savedTheme = localStorage.getItem('mf_theme');
if (savedTheme === 'dark') document.body.classList.add('dark'), themeToggle.textContent='☀️';
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  const dark = document.body.classList.contains('dark');
  themeToggle.textContent = dark ? '☀️' : '🌙';
  localStorage.setItem('mf_theme', dark ? 'dark' : 'light');
});

/* NAV SCROLL */
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) navbar.classList.add('scrolled', 'bg-black/90', 'shadow-md');
  else navbar.classList.remove('scrolled', 'bg-black/90', 'shadow-md');
});

/* FETCH UTILS */
async function fetchApi(url) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error('Network error');
    return await res.json();
  } catch (e) {
    console.error('API error', e);
    showToast('Network error — try again', 'error');
    return null;
  }
}
async function fetchMovies(searchTerm, page=1) {
  if (!searchTerm) return null;
  return await fetchApi(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(searchTerm)}&page=${page}`);
}
async function fetchMovieById(imdbID) {
  return await fetchApi(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${imdbID}&plot=full`);
}

/* SKELETON */
function renderSkeleton(count=8, asGrid=true) {
  contentContainer.innerHTML = '';
  const wrapper = document.createElement('div');
  wrapper.className = asGrid ? 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4' : 'flex gap-3';
  for (let i=0;i<count;i++){
    const s = document.createElement('div');
    s.className = 'skeleton rounded overflow-hidden';
    s.style.height = '320px';
    wrapper.appendChild(s);
  }
  contentContainer.appendChild(wrapper);
}

/* ESCAPE HTML */
function escapeHtml(s='') {
  return String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;');
}

/* FAVORITES */
function getFavorites() {
  return JSON.parse(localStorage.getItem('mf_favs') || '[]');
}
function saveFavorites(favs) {
  localStorage.setItem('mf_favs', JSON.stringify(favs));
}
function checkFavorite(id) {
  return getFavorites().some(m => m.imdbID === id);
}

/* TOAST */
function showToast(message, type='info', duration=1800) {
  toastEl.innerHTML = `<div class="px-4 py-2 rounded ${type==='error' ? 'bg-red-600' : 'bg-gray-800'} text-white shadow">${escapeHtml(message)}</div>`;
  toastEl.classList.remove('hidden');
  clearTimeout(toastEl._t);
  toastEl._t = setTimeout(()=>{ toastEl.classList.add('hidden'); }, duration);
}

/* CREATE CARD (consistent for category & search & favorites) */
function createMovieCard(movie) {
  const id = movie.imdbID;
  const card = document.createElement('div');
  card.className = 'bg-white/5 rounded-lg card-hover transition-transform duration-200 flex flex-col';
  card.style.cursor = 'pointer';
  const poster = movie.Poster && movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450?text=No+Image';
  card.innerHTML = `
    <img src="${poster}" alt="${escapeHtml(movie.Title)}" class="card-img w-full rounded-t" loading="lazy">
    <div class="p-3 flex-1 flex flex-col">
      <div class="font-semibold text-sm truncate">${escapeHtml(movie.Title)}</div>
      <div class="text-xs text-white/70 mt-1">${movie.Year || ''}</div>
      <div class="mt-3 flex items-center justify-between">
        <button data-id="${id}" class="fav-btn px-3 py-1 bg-brand rounded text-sm font-semibold">${checkFavorite(id) ? 'Remove' : 'Add'}</button>
        <button data-id="${id}" class="details-btn text-sm text-white/80 hover:text-white">Details</button>
      </div>
    </div>
  `;
  // click handlers:
  card.querySelector('.fav-btn').addEventListener('click', async (e) => {
    e.stopPropagation();
    const btn = e.currentTarget;
    await toggleFavorite(id);
    updateAllButtonsForId(id);
  });
  card.querySelector('.details-btn').addEventListener('click', (e) => {
    e.stopPropagation();
    openDetails(id);
  });
  // clicking card opens details as well:
  card.addEventListener('click', () => openDetails(id));
  return card;
}

/* Toggle favorite and keep UI in sync */
async function toggleFavorite(id) {
  let favs = getFavorites();
  const exists = favs.some(m => m.imdbID === id);
  if (exists) {
    favs = favs.filter(m => m.imdbID !== id);
    saveFavorites(favs);
    showToast('Removed from My List');
  } else {
    const data = await fetchMovieById(id);
    if (data && data.Response === 'True') {
      const minimal = { Title: data.Title, Year: data.Year, imdbID: data.imdbID, Poster: data.Poster };
      favs.push(minimal);
      saveFavorites(favs);
      showToast('Added to My List');
    } else {
      showToast('Could not add — API error', 'error');
    }
  }
}

/* Update all card buttons & modal to reflect favorite state for an id */
function updateAllButtonsForId(id) {
  // update card buttons
  document.querySelectorAll(`[data-id="${id}"].fav-btn`).forEach(btn => {
    btn.textContent = checkFavorite(id) ? 'Remove' : 'Add';
  });
  // update modal button
  updateModalFavText(id);
}

/* Save modal button text */
function updateModalFavText(id) {
  modalFavBtn.textContent = checkFavorite(id) ? 'Remove from My List' : 'Add to My List';
}

/* MODAL logic */
const modal = document.getElementById('details-modal');
const modalPoster = document.getElementById('modal-poster');
const modalTitle = document.getElementById('modal-title');
const modalPlot = document.getElementById('modal-plot');
const modalYear = document.getElementById('modal-year');
const modalRuntime = document.getElementById('modal-runtime');
const modalGenre = document.getElementById('modal-genre');
const modalDirector = document.getElementById('modal-director');
const modalActors = document.getElementById('modal-actors');
const modalRating = document.getElementById('modal-rating');
const modalFavBtn = document.getElementById('modal-fav-btn');

async function openDetails(imdbID) {
  modal.classList.remove('hidden');
  modal.style.display = 'flex';
  modalPoster.src = '';
  modalTitle.textContent = 'Loading...';
  modalPlot.textContent = '';
  const data = await fetchMovieById(imdbID);
  if (!data || data.Response === 'False') {
    modalTitle.textContent = 'Not available';
    return;
  }
  modalPoster.src = (data.Poster && data.Poster !== 'N/A') ? data.Poster : 'https://via.placeholder.com/300x450?text=No+Image';
  modalTitle.textContent = data.Title;
  modalPlot.textContent = data.Plot;
  modalYear.textContent = data.Year;
  modalRuntime.textContent = data.Runtime;
  modalGenre.textContent = data.Genre;
  modalDirector.textContent = data.Director;
  modalActors.textContent = data.Actors;
  modalRating.textContent = data.imdbRating;
  // set modal fav button
  modalFavBtn.onclick = async () => {
    await toggleFavorite(imdbID);
    updateAllButtonsForId(imdbID);
  };
  updateModalFavText(imdbID);
}
function closeModal(){
  modal.classList.add('hidden');
  modal.style.display = 'none';
}

/* PAGINATION / SEARCH */
async function handleSearch(term, page=1) {
  if (!term) return;
  currentSearchTerm = term;
  currentPage = page;
  paginationContainer.innerHTML = '';
  renderSkeleton(8);
  const data = await fetchMovies(term, page);
  contentContainer.innerHTML = '';
  if (data && data.Response === 'True') {
    const grid = document.createElement('div');
    grid.className = 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4';
    data.Search.forEach(m => grid.appendChild(createMovieCard(m)));
    contentContainer.appendChild(grid);
    renderPagination(page, parseInt(data.totalResults || '0'), term);
    heroTitle.textContent = `Results for "${term}"`;
    heroDesc.textContent = `${data.totalResults} results`;
  } else {
    contentContainer.innerHTML = `<div class="py-12 text-center text-white/70">No results found for "${escapeHtml(term)}"</div>`;
  }
}
function renderPagination(current, totalResults, term) {
  paginationContainer.innerHTML = '';
  const totalPages = Math.ceil(totalResults / 10);
  if (totalPages <= 1) return;
  const prev = document.createElement('button');
  prev.className = 'px-3 py-1 rounded bg-white/10';
  prev.textContent = 'Previous';
  prev.disabled = current === 1;
  prev.onclick = () => handleSearch(term, current-1);
  const info = document.createElement('span');
  info.className = 'px-3 text-white/70';
  info.textContent = `Page ${current} of ${totalPages}`;
  const next = document.createElement('button');
  next.className = 'px-3 py-1 rounded bg-white/10';
  next.textContent = 'Next';
  next.disabled = current === totalPages;
  next.onclick = () => handleSearch(term, current+1);
  paginationContainer.appendChild(prev);
  paginationContainer.appendChild(info);
  paginationContainer.appendChild(next);
}

/* TRENDING / CAROUSELS (category cards styled like search ones) */
const categories = ['Action','Comedy','Sci-Fi','Horror','Animation'];
async function initializePage(){
  contentContainer.innerHTML = '';
  paginationContainer.innerHTML = '';
  trendingEl.innerHTML = '';
  for (const cat of categories) {
    const row = document.createElement('div');
    row.className = 'movie-row';
    const heading = document.createElement('h3');
    heading.className = 'text-xl font-semibold mb-3';
    heading.textContent = cat + ' Picks';
    row.appendChild(heading);

    // container with cards (scrollable)
    const carousel = document.createElement('div');
    carousel.className = 'movie-carousel flex gap-4 overflow-x-auto pb-3 snap-x';
    row.appendChild(carousel);
    trendingEl.appendChild(row);

    // skeleton
    for (let i=0;i<6;i++){
      const sk = document.createElement('div');
      sk.className = 'skeleton rounded w-44 h-64 flex-shrink-0';
      carousel.appendChild(sk);
    }

    // fetch movies for category and render as same card style
    (async function(car, category) {
      const res = await fetchMovies(category, 1);
      car.innerHTML = '';
      if (res && res.Response === 'True') {
        res.Search.forEach(m => {
          const card = createMovieCard(m);
          // make card sized for carousel
          card.classList.add('w-44', 'flex-shrink-0');
          car.appendChild(card);
        });
      } else {
        car.innerHTML = `<div class="text-white/60 p-4">No items</div>`;
      }
    })(carousel, cat);
  }
  // auto-scroll
  setTimeout(() => startAutoScroll(), 700);
}
let autoScrollIntervals = [];
function startAutoScroll(){
  autoScrollIntervals.forEach(i => clearInterval(i));
  autoScrollIntervals = [];
  document.querySelectorAll('.movie-carousel').forEach((el, idx) => {
    const interval = setInterval(() => {
      if (el.scrollWidth - el.scrollLeft <= el.clientWidth + 10) {
        el.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        el.scrollBy({ left: 320, behavior: 'smooth' });
      }
    }, 3500 + idx*500);
    autoScrollIntervals.push(interval);
  });
}

/* MY LIST */
function showMyList() {
  paginationContainer.innerHTML = '';
  contentContainer.innerHTML = '';
  heroTitle.textContent = 'My List';
  heroDesc.textContent = 'Movies you saved (stored in localStorage)';
  const favs = getFavorites();
  if (!favs.length) {
    contentContainer.innerHTML = `<div class="py-12 text-center text-white/70">Your list is empty. Add some movies!</div>`;
    return;
  }
  const grid = document.createElement('div');
  grid.className = 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4';
  favs.forEach(m => {
    const card = createMovieCard(m);
    // ensure buttons show correct text
    card.querySelector('.fav-btn').textContent = 'Remove';
    grid.appendChild(card);
  });
  contentContainer.appendChild(grid);
}

/* EVENTS */
document.getElementById('searchBtn').addEventListener('click', () => {
  const t = document.getElementById('searchInput').value.trim();
  if (t) handleSearch(t,1);
});
document.getElementById('searchInput').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') { const t = e.target.value.trim(); if (t) handleSearch(t,1); }
});
document.getElementById('mobileSearchBtn').addEventListener('click', () => {
  const t = document.getElementById('mobileSearch').value.trim();
  if (t) handleSearch(t,1);
});
document.getElementById('mobile-menu-btn').addEventListener('click', ()=> {
  document.getElementById('mobile-menu').classList.toggle('hidden');
});

/* STARTUP */
initializePage();
showHome(); // default view

function showHome() {
  contentContainer.innerHTML = '';
  paginationContainer.innerHTML = '';
  heroTitle.textContent = 'Welcome to M-FLIX';
  heroDesc.textContent = 'Trending picks by category — auto-scrolling carousels. Click a poster for details.';
}

/* expose small helpers */
window.fetchMovieById = fetchMovieById;
window.openDetails = openDetails;
window.closeModal = closeModal;
window.showHome = showHome;
window.showMyList = showMyList;
