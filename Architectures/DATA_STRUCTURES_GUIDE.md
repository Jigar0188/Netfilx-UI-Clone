# Netflix AI - Data Structures Implementation Guide

## Overview

This document explains the three data structure features integrated into your Netflix-style application.

---

## 1. 🔍 SEARCH BAR (Linear Search)

### Feature: Linear Search Algorithm

The search bar implements a **linear search** algorithm to filter movies based on user input.

### How It Works:

```
User Types Query → Linear Search Function → Traverse All Movies → Match Titles → Display Results
```

### Implementation Details:

**Function:** `linearSearchByTitle(searchQuery)`

- **Algorithm Type:** Linear Search (Sequential Search)
- **Time Complexity:** O(n) - must check each movie
- **Space Complexity:** O(k) - where k is number of results
- **Location in Code:** `script.js` lines ~280-300

**Algorithm Steps:**

1. Convert search query to lowercase for case-insensitive matching
2. Iterate through entire `movies` array (Linear)
3. Check if each movie's title contains the search query
4. Return array of matching movies

### User Interaction:

1. User types in the search bar in the dashboard navigation
2. `handleSearch()` is triggered (oninput event)
3. Linear search finds all matching movies
4. Dropdown shows results with movie posters, titles, genres, and ratings
5. Clicking a result displays full movie list with that title filter
6. NEW: Displays both "Add to Favorites" and "Watch Now" buttons

### Code Example:

```javascript
// Linear Search Implementation
function linearSearchByTitle(searchQuery) {
  const query = searchQuery.toLowerCase().trim();
  const results = [];

  // O(n) - Iterate through entire array
  for (let i = 0; i < movies.length; i++) {
    if (movies[i].title.toLowerCase().includes(query)) {
      results.push(movies[i]);
    }
  }
  return results;
}
```

### When to Use Linear Search:

- ✅ Small to medium datasets (< 10,000 items)
- ✅ Unsorted arrays
- ✅ Simple real-time search
- ❌ Large datasets (use Binary Search or Indexed Search instead)

---

## 2. ⏱️ RECENTLY WATCHED (Queue - FIFO)

### Feature: Queue Data Structure

The "Recently Watched" section uses a **Queue** (First In, First Out) to maintain watch history.

### How It Works:

```
Watch Movie → Enqueue to Back → Display Queue → If Size > 5, Dequeue from Front
```

### Queue Characteristics (FIFO):

- **First item added** is the **first item removed**
- **Like a real queue:** First person in line is first served
- **Use Case:** Chronological history, LRU (Least Recently Used) caching

### Implementation Details:

**Class:** `Queue` (Custom Implementation)

- **Max Size:** 5 movies
- **Methods:**
  - `enqueue(movie)` - Add to back
  - `dequeue()` - Remove from front
  - `getAll()` - Retrieve all items
  - `isEmpty()` - Check if empty
  - `size()` - Get current size

**Key Features:**

1. **Auto-Remove Oldest:** When queue reaches 5 movies, oldest is automatically removed
2. **No Duplicates:** If you watch the same movie twice, it moves to the end (duplicate removed)
3. **Visual Order:** Displayed from oldest (left) to newest (right)

### User Interaction:

1. User clicks "Watch Now" on any movie
2. Video player opens AND movie is added to Recently Watched queue
3. If queue has 5 movies already, the oldest one is removed
4. The "Recently Watched" section updates automatically
5. Shows your last 5 watched movies in order

### Code Example:

```javascript
class Queue {
  constructor(maxSize = 5) {
    this.items = [];
    this.maxSize = maxSize;
  }

  enqueue(movie) {
    // Remove duplicate if exists
    const index = this.items.findIndex((m) => m.id === movie.id);
    if (index !== -1) this.items.splice(index, 1);

    this.items.push(movie); // Add to back

    // Remove from front if exceeds max (FIFO)
    if (this.items.length > this.maxSize) {
      this.items.shift();
    }
  }
}

// Usage:
const recentlyWatchedQueue = new Queue(5);
recentlyWatchedQueue.enqueue(movieObject); // Movie added to end
```

### Visual Example (FIFO Behavior):

```
Step 1: Watch Movie A
Queue: [A]

Step 2: Watch Movie B
Queue: [A, B]

Step 3: Watch Movie C, D, E, F
Queue: [B, C, D, E, F]  ← A was removed (oldest, FIFO)

Step 4: Watch Movie B again
Queue: [C, D, E, F, B]  ← B moved to end (duplicate removed)
```

### When to Use Queues:

- ✅ Task scheduling (First task processed first)
- ✅ Print queues (First document printed first)
- ✅ Breadth-first search (BFS) algorithm
- ✅ Browser history (oldest page removed first)

---

## 3. ❤️ FAVORITES (Stack - LIFO)

### Feature: Stack Data Structure

The "Favorites" section uses a **Stack** (Last In, First Out) to manage favorite movies.

### How It Works:

```
Add to Favorites → Push to Top → Most Recent on Top → Remove Last Added (Pop)
```

### Stack Characteristics (LIFO):

- **Last item added** is the **first item removed**
- **Like a stack of plates:** Last plate placed is first plate taken
- **Use Case:** Undo/Redo functionality, Last-Used items

### Implementation Details:

**Class:** `Stack` (Custom Implementation)

- **No Max Size:** Unlimited favorites (but practical limit)
- **Methods:**
  - `push(movie)` - Add to top
  - `pop()` - Remove from top
  - `peek()` - View top without removing
  - `getAll()` - Retrieve all items
  - `isEmpty()` - Check if empty
  - `size()` - Get current size

**Key Features:**

1. **Most Recent First:** Newly added movies appear at top
2. **Remove Last Added:** "Remove Last Favorite" pops the top item
3. **No Duplicates:** Adding same movie moves it to top
4. **Count Display:** Shows total number of favorites

### User Interaction:

1. User hovers over a movie card
2. Clicks "🤍 Favorite" button (or "❤️ Added" if already favorited)
3. Movie is pushed to top of favorites stack
4. "My Favorites" section updates with most recent first
5. Click "Remove Last Favorite" button to pop the most recently added favorite
6. Favorite count automatically updates

### Code Example:

```javascript
class Stack {
  constructor() {
    this.items = [];
  }

  push(movie) {
    // Remove duplicate if exists
    const index = this.items.findIndex((m) => m.id === movie.id);
    if (index !== -1) this.items.splice(index, 1);

    this.items.push(movie); // Add to top
  }

  pop() {
    return this.items.pop(); // Remove and return top
  }
}

// Usage:
const favoritesStack = new Stack();
favoritesStack.push(movieObject); // Add favorite
const removed = favoritesStack.pop(); // Remove last added
```

### Visual Example (LIFO Behavior):

```
Step 1: Add Movie A to Favorites
Stack: [A]

Step 2: Add Movie B to Favorites
Stack: [A, B]  ← B is on top (most recent)

Step 3: Add Movie C to Favorites
Stack: [A, B, C]  ← C is on top (most recent)

Step 4: Click "Remove Last Favorite" (Pop)
Stack: [A, B]  ← C removed (last added)

Step 5: Add Movie B again (already exists)
Stack: [A, B]  ← B moved to top (duplicate removed)
             ↑ Most recent
```

### When to Use Stacks:

- ✅ Undo/Redo functionality (CTRL+Z)
- ✅ Browser back button (Previous pages)
- ✅ Function call stack (Programming)
- ✅ Expression evaluation (Parentheses matching)
- ✅ Most recently used items

---

## 4. 📊 Feature Integration

### File Structure:

```
index.html       → HTML markup for all sections
script.js        → Data structure classes + functions
style.css        → Styling for new components
```

### Key Functions Summary:

| Function                      | Purpose              | Data Structure  |
| ----------------------------- | -------------------- | --------------- |
| `linearSearchByTitle(query)`  | Search movies        | Linear Search   |
| `handleSearch()`              | UI search handler    | Linear Search   |
| `addToRecentlyWatched(movie)` | Add to queue         | Queue (FIFO)    |
| `displayRecentlyWatched()`    | Display queue        | Queue (FIFO)    |
| `addToFavorites(movie)`       | Add to stack         | Stack (LIFO)    |
| `removeLastFavorite()`        | Pop from stack       | Stack (LIFO)    |
| `displayFavorites()`          | Display stack        | Stack (LIFO)    |
| `displayMoviesWithActions()`  | Display with buttons | General Display |

### How They Work Together:

1. **User logs in** → `loadDashboard()` called
2. **Dashboard loads** → All sections display (empty initially)
3. **User searches** → Linear search suggests and displays results
4. **User watches** → Queue enqueues, video plays
5. **User adds to favorites** → Stack pushes, display updates
6. **User removes favorite** → Stack pops, display updates
7. **UI updates** → All instances show current state

---

## 5. 🎯 Learning Outcomes

### What You've Learned:

**Linear Search Algorithm:**

- ✅ How to traverse arrays sequentially
- ✅ Time complexity analysis (O(n))
- ✅ Real-world search implementation
- ✅ String matching and case-insensitivity

**Queue (FIFO) Data Structure:**

- ✅ Enqueue/Dequeue operations
- ✅ Fixed-size queue implementation
- ✅ Duplicate handling
- ✅ Real-world application (history tracking)

**Stack (LIFO) Data Structure:**

- ✅ Push/Pop/Peek operations
- ✅ Dynamic stack implementation
- ✅ Duplicate handling
- ✅ Real-world application (favorites management)

**Software Design:**

- ✅ Modular, reusable code
- ✅ Class-based data structures
- ✅ Event handling and DOM updates
- ✅ Separation of concerns

---

## 6. 🚀 Bonus: How to Extend

### Adding a Binary Search:

```javascript
// For sorted data, use binary search (O(log n))
function binarySearchByTitle(query) {
  const sortedMovies = [...movies].sort((a, b) =>
    a.title.localeCompare(b.title),
  );
  // Implement binary search here
}
```

### Adding a Wishlist (Set):

```javascript
// Track movies to watch later (no duplicates)
const wishlist = new Set();

function addToWishlist(movieId) {
  wishlist.add(movieId); // Automatically prevents duplicates
}
```

### Adding Persistent Storage:

```javascript
// Save to localStorage
localStorage.setItem("favorites", JSON.stringify(favoritesStack.getAll()));
localStorage.setItem(
  "recentlyWatched",
  JSON.stringify(recentlyWatchedQueue.getAll()),
);
```

---

## 7. 📝 Code Comments

The code includes detailed comments explaining:

- Each data structure class
- Each algorithm function
- Event handlers
- DOM manipulation
- Time and space complexity

Read the comments in `script.js` for comprehensive understanding!

---

## 8. ✨ Testing Checklist

- [ ] Search for "Breaking Bad" → Should find Breaking Bad
- [ ] Search for "stranger" → Should find Stranger Things (case-insensitive)
- [ ] Watch 6 different movies → Recently Watched should show only last 5
- [ ] Add different movies to favorites → Most recent should be on top
- [ ] Click "Remove Last Favorite" → Most recent should be removed
- [ ] Watch same movie twice → Should appear once in Recently Watched (moved to end)
- [ ] Add same movie to favorites twice → Should appear once (moved to top)

---

**Happy Coding! 🎬**
