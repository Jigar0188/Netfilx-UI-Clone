// ============================================================
// DATA STRUCTURE: USER AUTHENTICATION
// ============================================================
// Simple user database using an array of objects
// Each user has email, password, and name
// In real applications, passwords should be hashed and stored securely
const usersDatabase = [
  {
    id: 1,
    name: "Jigar",
    email: "jigar@netflix.com",
    password: "password123",
  },
  {
    id: 2,
    name: "kaushal",
    email: "kaushal@netflix.com",
    password: "password123",
  },
];

// Current logged-in user (null when not logged in)
let currentUser = null;

// ============================================================
// DATA STRUCTURE: MOVIE DATABASE
// ============================================================
// Array of movie objects with rich properties
// Each movie object contains:
//   - id: unique identifier
//   - title: name of the movie/show
//   - rating: IMDb-style rating out of 10
//   - genre: array of genres for categorization
//   - image: poster image URL
//   - description: brief plot summary
//   - year: release year
//   - category: trending, toprated, or new
const movies = [
  {
    id: 1,
    title: "Stranger Things",
    rating: 9,
    genre: ["Science Fiction", "Drama", "Horror"],
    image: "https://wallpapercave.com/wp/wp4056410.jpg",
    video: "vid%20folder/video1.mp4",
    description:
      "When a young boy vanishes, his friends uncover a mystery involving secret government experiments.",
    year: 2016,
    category: "trending",
  },
  {
    id: 2,
    title: "Money Heist",
    rating: 8.5,
    genre: ["Crime", "Drama", "Thriller"],
    image: "https://wallpapercave.com/fuwp-510/uwp3674265.jpeg",
    video: "vid%20folder/video2.mp4",
    description:
      "An intelligent thief leads a group in an ambitious heist against the Spanish Royal Mint.",
    year: 2017,
    category: "trending",
  },
  {
    id: 3,
    title: "Breaking Bad",
    rating: 9.5,
    genre: ["Crime", "Drama", "Thriller"],
    image: "https://wallpapercave.com/wp/wp1839578.jpg",
    video: "vid%20folder/video3.mp4",
    description:
      "A high school chemistry teacher transforms into a drug kingpin with a terminal cancer diagnosis.",
    year: 2008,
    category: "toprated",
  },
  {
    id: 4,
    title: "Naruto",
    rating: 9.2,
    genre: ["Anime", "Action", "Adventure"],
    image: "https://wallpapercave.com/wp/wp1812476.jpg",
    video: "vid%20folder/video4.mp4",
    description:
      "A young ninja with a sealed demon inside him seeks recognition and dreams of becoming the leader of his village.",
    year: 2002,
    category: "trending",
  },
  {
    id: 5,
    title: "The Crown",
    rating: 8.8,
    genre: ["Biography", "Drama", "History"],
    image:
      "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=500&h=750&fit=crop",
    video: "vid%20folder/video5.mp4",
    description:
      "The political rivalries and romance of Queen Elizabeth II's reign and the events that shaped the second half of the twentieth century.",
    year: 2016,
    category: "toprated",
  },
  {
    id: 6,
    title: "The Witcher",
    rating: 8.0,
    genre: ["Action", "Adventure", "Fantasy"],
    image:
      "https://images.unsplash.com/photo-1595768541624-cd2cc27c91cc?w=500&h=750&fit=crop",
    video: "vid%20folder/video6.mp4",
    description:
      "Geralt of Rivia, a solitary monster hunter, struggles to find his place in a world where people often prove more evil than beasts.",
    year: 2019,
    category: "new",
  },
  {
    id: 7,
    title: "Squid Game",
    rating: 8.0,
    genre: ["Action", "Drama", "Thriller"],
    image: "https://wallpapercave.com/fuwp-510/uwp4991777.jpeg",
    video: "vid%20folder/video4.mp4",
    description:
      "Hundreds of cash-strapped players accept an invitation to compete in children's games for a massive prize.",
    year: 2021,
    category: "trending",
  },
  {
    id: 8,
    title: "Inception",
    rating: 8.8,
    genre: ["Action", "Sci-Fi", "Thriller"],
    image: "https://wallpapercave.com/wp/wp13309217.jpg",
    video: "vid%20folder/video7.mp4",
    description:
      "A skilled thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea.",
    year: 2010,
    category: "toprated",
  },
];

// ============================================================
// AUTHENTICATION FUNCTIONS
// ============================================================

/**
 * Show the sign-in form modal
 */
function showSigninForm() {
  document.getElementById("signinModal").style.display = "flex";
}

/**
 * Close the sign-in form modal
 */
function closeSigninForm() {
  document.getElementById("signinModal").style.display = "none";
  document.getElementById("signinEmail").value = "";
  document.getElementById("signinPassword").value = "";
}

/**
 * Sign up a new user
 * Validates email and creates new account
 */
function signupUser() {
  const email = document.getElementById("signupEmail").value.trim();

  if (!email) {
    alert("Please enter an email address");
    return;
  }

  // Check if user already exists
  const userExists = usersDatabase.some(
    (user) => user.email.toLowerCase() === email.toLowerCase(),
  );
  if (userExists) {
    alert("This email is already registered. Please sign in instead.");
    return;
  }

  // Create new user account
  const newUser = {
    id: usersDatabase.length + 1,
    name: email.split("@")[0], // Extract name from email
    email: email,
    password: "password123", // Default password for demo
  };

  usersDatabase.push(newUser);
  alert("Account created! Use email: " + email + " and password: password123");
  document.getElementById("signupEmail").value = "";
}

/**
 * Sign in an existing user
 * Validates credentials and loads dashboard
 */
function signinUser() {
  const email = document.getElementById("signinEmail").value.trim();
  const password = document.getElementById("signinPassword").value;

  if (!email || !password) {
    alert("Please enter both email and password");
    return;
  }

  // Find user in database
  const user = usersDatabase.find(
    (u) =>
      u.email.toLowerCase() === email.toLowerCase() && u.password === password,
  );

  if (!user) {
    alert("Invalid email or password");
    return;
  }

  // User authenticated successfully
  currentUser = user;
  closeSigninForm();
  loadDashboard();
}

/**
 * Log out the current user
 * Returns to sign-up page
 */
function logoutUser() {
  currentUser = null;
  document.getElementById("dashboardSection").style.display = "none";
  document.getElementById("signupSection").style.display = "block";
  document.getElementById("signupEmail").value = "";
}

// ============================================================
// DASHBOARD FUNCTIONS
// ============================================================

/**
 * Load and display the dashboard for the logged-in user
 */
function loadDashboard() {
  if (!currentUser) return;

  // Hide signup section, show dashboard
  document.getElementById("signupSection").style.display = "none";
  document.getElementById("dashboardSection").style.display = "block";

  // Display welcome message
  document.getElementById("welcomeMessage").textContent =
    `Welcome, ${currentUser.name}!`;

  // Display movies in different categories
  displayTrendingMovies();
  displayTopRatedMovies();
  displayAllMovies();
}

/**
 * Display movies in the Trending section
 * Uses filter to get movies with 'trending' category
 */
function displayTrendingMovies() {
  const trendingMovies = movies.filter(
    (movie) => movie.category === "trending",
  );
  displayMovies(trendingMovies, document.getElementById("movieContainer"));
}

/**
 * Display movies in the Top Rated section
 * Uses sort to order movies by rating (highest first)
 */
function displayTopRatedMovies() {
  // Create a copy using spread operator [...] to avoid modifying original array
  const topRated = [...movies].sort((a, b) => b.rating - a.rating);
  displayMovies(topRated, document.getElementById("topRated"));
}

/**
 * Display all movies
 */
function displayAllMovies() {
  displayMovies(movies, document.getElementById("allMovies"));
}

/**
 * Generic function to display movies in a container
 * @param {Array} movieList - Array of movie objects to display
 * @param {HTMLElement} container - DOM element where movies will be rendered
 */
function displayMovies(movieList, container) {
  container.innerHTML = ""; // Clear previous content

  // Loop through each movie and create a card element
  movieList.forEach((movie) => {
    const card = document.createElement("div");
    card.classList.add("movie-card");

    // Create HTML structure for each movie card
    card.innerHTML = `
  <div class="card-image">
    
    <video class="card-video" src="${movie.video}" muted></video>

    <img src="${movie.image}" alt="${movie.title}" class="poster">

    <div class="card-overlay">
      <div class="card-info">
        <h3>${movie.title}</h3>
        <p class="genres">${movie.genre.join(", ")}</p>
        <p class="rating">⭐ ${movie.rating}/10</p>
        <p class="description">${movie.description}</p>
        <p class="year">Year: ${movie.year}</p>
        <button class="btn btn-red card-btn">Watch Now</button>
      </div>
    </div>

  </div>
`;

    // Add hover event listeners for video playback
    const video = card.querySelector(".card-video");
    const poster = card.querySelector(".poster");

    card.addEventListener("mouseenter", () => {
      poster.style.opacity = "0";
      video.play();
    });

    card.addEventListener("mouseleave", () => {
      poster.style.opacity = "1";
      video.pause();
      video.currentTime = 0;
    });

    // Add click event listener to "Watch Now" button
    const watchBtn = card.querySelector(".card-btn");
    watchBtn.addEventListener("click", () => {
      openVideoPlayer(movie);
    });

    container.appendChild(card);
  });
}

// ============================================================
// VIDEO PLAYER MODAL FUNCTIONS
// ============================================================

/**
 * Open the full-screen video player modal with the selected movie
 * @param {Object} movie - Movie object containing video path and title
 */
function openVideoPlayer(movie) {
  const modal = document.getElementById("videoPlayerModal");
  const videoElement = document.getElementById("modalVideo");

  // Set the video source dynamically
  videoElement.src = movie.video;
  videoElement.title = movie.title;

  // Show the modal
  modal.classList.add("active");

  // Prevent body scroll when modal is open
  document.body.style.overflow = "hidden";

  // Play the video
  videoElement.play().catch((error) => {
    console.error("Error playing video:", error);
  });
}

/**
 * Close the video player modal and reset the video
 */
function closeVideoPlayer() {
  const modal = document.getElementById("videoPlayerModal");
  const videoElement = document.getElementById("modalVideo");

  // Hide the modal
  modal.classList.remove("active");

  // Stop and reset the video
  videoElement.pause();
  videoElement.currentTime = 0;
  videoElement.src = "";

  // Restore body scroll
  document.body.style.overflow = "auto";
}

/**
 * Close video player when clicking on the background overlay
 */
document.addEventListener("click", (event) => {
  const modal = document.getElementById("videoPlayerModal");
  if (event.target === modal) {
    closeVideoPlayer();
  }
});

/**
 * Close video player when pressing Escape key
 */
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    const modal = document.getElementById("videoPlayerModal");
    if (modal && modal.classList.contains("active")) {
      closeVideoPlayer();
    }
  }
});

// ============================================================
// DATA STRUCTURE #1: QUEUE (FIFO - First In First Out)
// ============================================================
// Used for "Recently Watched" feature
// When a movie is watched, it's added to the back of the queue
// When queue exceeds maxSize, the oldest (first) item is removed
// This maintains a list of the most recent movies watched

class Queue {
  constructor(maxSize = 5) {
    this.items = [];
    this.maxSize = maxSize;
  }

  /**
   * Add an item to the back of the queue (enqueue)
   * If queue exceeds maxSize, removes the first item
   * @param {Object} movie - Movie object to add
   */
  enqueue(movie) {
    // Check if movie is already in queue, if so, remove it first
    const existingIndex = this.items.findIndex((m) => m.id === movie.id);
    if (existingIndex !== -1) {
      this.items.splice(existingIndex, 1);
    }

    // Add movie to the back
    this.items.push(movie);

    // Remove from front if exceeds maxSize (FIFO - oldest removed first)
    if (this.items.length > this.maxSize) {
      this.items.shift();
    }
  }

  /**
   * Remove and return the first item (dequeue)
   * @returns {Object} First item in queue
   */
  dequeue() {
    return this.items.shift();
  }

  /**
   * Get all items in the queue
   * @returns {Array} All items currently in queue
   */
  getAll() {
    return this.items;
  }

  /**
   * Check if queue is empty
   * @returns {Boolean} True if queue is empty
   */
  isEmpty() {
    return this.items.length === 0;
  }

  /**
   * Get queue size
   * @returns {Number} Number of items in queue
   */
  size() {
    return this.items.length;
  }
}

// ============================================================
// DATA STRUCTURE #2: STACK (LIFO - Last In First Out)
// ============================================================
// Used for "Favorites" feature
// When a movie is added to favorites, it's pushed to the top of the stack
// The last movie added is the first one that can be removed (pop)
// This maintains a list where the most recently added favorite is at the top

class Stack {
  constructor() {
    this.items = [];
  }

  /**
   * Add an item to the top of the stack (push)
   * @param {Object} movie - Movie object to add
   */
  push(movie) {
    // Prevent duplicates: if movie already exists, remove it first
    const existingIndex = this.items.findIndex((m) => m.id === movie.id);
    if (existingIndex !== -1) {
      this.items.splice(existingIndex, 1);
    }
    this.items.push(movie);
  }

  /**
   * Remove and return the top item (pop)
   * @returns {Object} Top item in stack
   */
  pop() {
    return this.items.pop();
  }

  /**
   * View the top item without removing it (peek)
   * @returns {Object} Top item in stack
   */
  peek() {
    return this.items[this.items.length - 1];
  }

  /**
   * Get all items in the stack
   * @returns {Array} All items currently in stack
   */
  getAll() {
    return this.items;
  }

  /**
   * Check if stack is empty
   * @returns {Boolean} True if stack is empty
   */
  isEmpty() {
    return this.items.length === 0;
  }

  /**
   * Get stack size
   * @returns {Number} Number of items in stack
   */
  size() {
    return this.items.length;
  }
}

// ============================================================
// INSTANTIATE DATA STRUCTURES
// ============================================================
// Create instances of Queue and Stack for the current user session
const recentlyWatchedQueue = new Queue(5); // Max 5 recently watched
const favoritesStack = new Stack(); // Favorites (unlimited, but typically reasonable)

// ============================================================
// DATA STRUCTURE #3: LINEAR SEARCH
// ============================================================
// Simple algorithm that traverses through the movies array
// Checks each movie's title against the search query
// Time Complexity: O(n) where n is number of movies
// Space Complexity: O(1) - only stores result array

/**
 * Perform LINEAR SEARCH on movies array by title
 * Traverse the entire array and match movie titles with search query
 * @param {String} searchQuery - Search term to find
 * @returns {Array} Array of matching movies
 */
function linearSearchByTitle(searchQuery) {
  if (!searchQuery || searchQuery.trim() === "") {
    return [];
  }

  const query = searchQuery.toLowerCase().trim();
  const results = [];

  // LINEAR SEARCH: Iterate through entire array
  for (let i = 0; i < movies.length; i++) {
    const movie = movies[i];
    // Check if movie title contains the search query
    if (movie.title.toLowerCase().includes(query)) {
      results.push(movie);
    }
  }

  return results;
}

// ============================================================
// SEARCH FUNCTIONALITY
// ============================================================

/**
 * Handle search input and display results
 * Called when user types in search bar (oninput event)
 */
function handleSearch() {
  const searchInput = document.getElementById("searchInput");
  const searchResults = document.getElementById("searchResults");
  const searchQuery = searchInput.value.trim();

  // If search is empty, hide results
  if (!searchQuery) {
    searchResults.classList.remove("active");
    document.getElementById("searchSection").style.display = "none";
    return;
  }

  // Perform linear search
  const results = linearSearchByTitle(searchQuery);

  if (results.length === 0) {
    searchResults.classList.remove("active");
    document.getElementById("searchSection").style.display = "none";
    return;
  }

  // Show dropdown results
  searchResults.innerHTML = "";
  results.forEach((movie) => {
    const resultItem = document.createElement("div");
    resultItem.classList.add("search-result-item");
    resultItem.innerHTML = `
      <div style="display: flex; align-items: center; gap: 10px;">
        <img src="${movie.image}" alt="${movie.title}" style="width: 30px; height: 45px; border-radius: 3px; object-fit: cover;">
        <div>
          <div style="font-weight: 500;">${movie.title}</div>
          <div style="font-size: 12px; color: #999;">${movie.genre.join(", ")} | ⭐ ${movie.rating}</div>
        </div>
      </div>
    `;
    resultItem.addEventListener("click", () => {
      searchInput.value = movie.title;
      searchResults.classList.remove("active");
      displaySearchResults(linearSearchByTitle(movie.title));
    });
    searchResults.appendChild(resultItem);
  });

  searchResults.classList.add("active");
}

/**
 * Display search results in the search section
 * @param {Array} results - Array of movie objects to display
 */
function displaySearchResults(results) {
  const searchSection = document.getElementById("searchSection");
  const container = document.getElementById("searchMoviesContainer");

  if (results.length === 0) {
    searchSection.style.display = "none";
    return;
  }

  searchSection.style.display = "block";
  displayMoviesWithActions(results, container);
}

// ============================================================
// RECENTLY WATCHED QUEUE FUNCTIONS
// ============================================================

/**
 * Add a movie to Recently Watched queue
 * Called when user clicks "Watch Now"
 * @param {Object} movie - Movie object to add to queue
 */
function addToRecentlyWatched(movie) {
  recentlyWatchedQueue.enqueue(movie);
  displayRecentlyWatched();
  console.log(
    `Added to Recently Watched: ${movie.title}`,
    recentlyWatchedQueue.getAll(),
  );
}

/**
 * Display Recently Watched movies from the queue
 */
function displayRecentlyWatched() {
  const container = document.getElementById("recentlyWatchedContainer");
  const emptyMessage = document.getElementById("emptyRecentlyWatched");
  const items = recentlyWatchedQueue.getAll();

  if (items.length === 0) {
    container.innerHTML = "";
    emptyMessage.style.display = "block";
    return;
  }

  emptyMessage.style.display = "none";
  displayMoviesWithActions(items, container);
}

// ============================================================
// FAVORITES STACK FUNCTIONS
// ============================================================

/**
 * Add a movie to Favorites stack
 * Called when user clicks "Add to Favorites"
 * @param {Object} movie - Movie object to add to favorites
 */
function addToFavorites(movie) {
  favoritesStack.push(movie);
  displayFavorites();
  console.log(`Added to Favorites: ${movie.title}`, favoritesStack.getAll());
}

/**
 * Remove the last added favorite (pop from stack)
 * Called when user clicks "Remove Last Favorite"
 */
function removeLastFavorite() {
  if (!favoritesStack.isEmpty()) {
    const removed = favoritesStack.pop();
    console.log(`Removed from Favorites: ${removed.title}`);
    displayFavorites();
  }
}

/**
 * Check if a movie is in favorites
 * @param {Number} movieId - Movie ID to check
 * @returns {Boolean} True if movie is in favorites
 */
function isInFavorites(movieId) {
  return favoritesStack.getAll().some((movie) => movie.id === movieId);
}

/**
 * Display Favorites from the stack
 * Shows most recently added first (LIFO behavior)
 */
function displayFavorites() {
  const container = document.getElementById("favoritesContainer");
  const emptyMessage = document.getElementById("emptyFavorites");
  const removeBtn = document.getElementById("removeLastBtn");
  const favoriteCount = document.getElementById("favoriteCount");
  const items = favoritesStack.getAll();

  // Update favorite count
  favoriteCount.textContent =
    items.length + " favorite" + (items.length !== 1 ? "s" : "");

  // Disable remove button if no favorites
  removeBtn.disabled = items.length === 0;

  if (items.length === 0) {
    container.innerHTML = "";
    emptyMessage.style.display = "block";
    return;
  }

  emptyMessage.style.display = "none";
  // Display items with LIFO order (reverse array to show most recent first)
  displayMoviesWithActions(items.reverse(), container);
}

// ============================================================
// ENHANCED MOVIE DISPLAY WITH ACTION BUTTONS
// ============================================================

/**
 * Display movies with action buttons (Add to Favorites, Recently Watched, etc.)
 * Enhanced version of displayMovies with additional functionality
 * @param {Array} movieList - Array of movie objects to display
 * @param {HTMLElement} container - DOM element where movies will be rendered
 */
function displayMoviesWithActions(movieList, container) {
  container.innerHTML = ""; // Clear previous content

  movieList.forEach((movie) => {
    const card = document.createElement("div");
    card.classList.add("movie-card");

    const isFavorite = isInFavorites(movie.id);

    card.innerHTML = `
      <div class="card-image">
        <video class="card-video" src="${movie.video}" muted></video>
        <img src="${movie.image}" alt="${movie.title}" class="poster">
        <div class="card-overlay">
          <div class="card-info">
            <h3>${movie.title}</h3>
            <p class="genres">${movie.genre.join(", ")}</p>
            <p class="rating">⭐ ${movie.rating}/10</p>
            <p class="description">${movie.description}</p>
            <p class="year">Year: ${movie.year}</p>
            <div style="display: flex; gap: 10px; margin-top: 10px;">
              <button class="btn btn-red card-btn watch-btn" style="flex: 1;">
                Watch Now
              </button>
              <button class="btn card-btn favorite-btn" style="flex: 1; background-color: ${isFavorite ? "#e50914" : "#444"}; border-color: #e50914;">
                ${isFavorite ? "❤️ Added" : "🤍 Favorite"}
              </button>
            </div>
          </div>
        </div>
      </div>
    `;

    // Video preview on hover
    const video = card.querySelector(".card-video");
    const poster = card.querySelector(".poster");

    card.addEventListener("mouseenter", () => {
      poster.style.opacity = "0";
      video.play();
    });

    card.addEventListener("mouseleave", () => {
      poster.style.opacity = "1";
      video.pause();
      video.currentTime = 0;
    });

    // Watch Now button - opens video player and adds to Recently Watched
    const watchBtn = card.querySelector(".watch-btn");
    watchBtn.addEventListener("click", () => {
      openVideoPlayer(movie);
      addToRecentlyWatched(movie);
    });

    // Add to Favorites button
    const favoriteBtn = card.querySelector(".favorite-btn");
    favoriteBtn.addEventListener("click", () => {
      if (isInFavorites(movie.id)) {
        // Remove from favorites
        const allFavorites = favoritesStack.getAll();
        const index = allFavorites.findIndex((m) => m.id === movie.id);
        if (index !== -1) {
          allFavorites.splice(index, 1);
        }
      } else {
        // Add to favorites
        addToFavorites(movie);
      }
      displayFavorites();
      // Update all displayed movie cards
      displayTrendingMovies();
      displayTopRatedMovies();
      displayAllMovies();
    });

    container.appendChild(card);
  });
}

// ============================================================
// UPDATED LOAD DASHBOARD TO INCLUDE NEW SECTIONS
// ============================================================

/**
 * Updated loadDashboard to also display Recently Watched and Favorites
 */
const originalLoadDashboard = loadDashboard;
loadDashboard = function () {
  originalLoadDashboard();

  // Display Recently Watched and Favorites sections
  displayRecentlyWatched();
  displayFavorites();
};

// ============================================================
// UPDATED DISPLAY FUNCTIONS TO USE NEW DISPLAY WITH ACTIONS
// ============================================================

/**
 * Updated displayTrendingMovies to use enhanced display
 */
const originalDisplayTrendingMovies = displayTrendingMovies;
displayTrendingMovies = function () {
  const trendingMovies = movies.filter(
    (movie) => movie.category === "trending",
  );
  displayMoviesWithActions(
    trendingMovies,
    document.getElementById("movieContainer"),
  );
};

/**
 * Updated displayTopRatedMovies to use enhanced display
 */
const originalDisplayTopRatedMovies = displayTopRatedMovies;
displayTopRatedMovies = function () {
  const topRated = [...movies].sort((a, b) => b.rating - a.rating);
  displayMoviesWithActions(topRated, document.getElementById("topRated"));
};

/**
 * Updated displayAllMovies to use enhanced display
 */
const originalDisplayAllMovies = displayAllMovies;
displayAllMovies = function () {
  displayMoviesWithActions(movies, document.getElementById("allMovies"));
};
