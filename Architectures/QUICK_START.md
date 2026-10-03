# Quick Start Guide - Testing Data Structures Features

## 🎬 How to Use Your Enhanced Netflix App

### Setup:

1. **Sign Up/Sign In** to access the dashboard
   - Use any email and the default password: `password123`

### Feature 1: 🔍 Search Bar (Linear Search)

**Location:** Top navigation bar of dashboard

**How to Test:**

1. Start typing a movie title in the search box
2. See suggestions appear in a dropdown menu
3. Click any suggestion or search by partial title (e.g., "breaking", "stranger", "naruto")
4. Full search results display below with both "Watch Now" and "Add to Favorites" buttons

**Example Searches:**

- Search "Breaking" → finds "Breaking Bad"
- Search "Money" → finds "Money Heist"
- Search "Anime" → finds all anime movies
- Case-insensitive (try "BREAKING" or "breaking")

**Data Structure Concept:** Linear Search Algorithm (O(n) time complexity)

---

### Feature 2: ⏱️ Recently Watched (Queue - FIFO)

**Location:** "⏱️ Recently Watched (FIFO Queue)" section in dashboard

**How to Test:**

1. Click **"Watch Now"** on any movie
2. Video player opens (you can close it immediately)
3. Movie automatically appears in "Recently Watched" section
4. Watch 6+ different movies - notice only the last 5 remain
5. Watch a movie you already watched - it moves to the end (no duplicates)

**Expected Behavior:**

- **First 5 watches:** Movies appear in order
- **6th watch:** Oldest movie disappears, new movie added
- **Duplicate watch:** Movie moves to end of queue, stays at count of 5

**FIFO Demonstration:**

- Add Movie A → Queue: [A]
- Add Movie B → Queue: [A, B]
- Add Movie C → Queue: [A, B, C]
- Add Movie D → Queue: [A, B, C, D]
- Add Movie E → Queue: [A, B, C, D, E]
- Add Movie F → Queue: [B, C, D, E, F] ← A removed (first in)

**Data Structure Concept:** Queue - First In First Out (FIFO)

---

### Feature 3: ❤️ My Favorites (Stack - LIFO)

**Location:** "❤️ My Favorites (LIFO Stack)" section in dashboard

**How to Test:**

1. Hover over any movie card
2. Click **"🤍 Favorite"** button to add
3. Movie appears in "My Favorites" section at the TOP
4. Most recently added movie is always first
5. Click **"Remove Last Favorite"** button to remove the most recent addition
6. Button shows current count: "N favorites"

**Expected Behavior:**

- **Add Movie A:** Stack: [A]
- **Add Movie B:** Stack: [A, B] - B is first (top)
- **Add Movie C:** Stack: [A, B, C] - C is first (top)
- **Remove Last:** Stack: [A, B] - C removed (last in)
- **Add Movie B again:** Stack: [A, B] - B still at top (moved, no duplicate)

**LIFO Demonstration:**

- Movies display with most recent first
- "Remove Last Favorite" always removes the most recently added
- "Remove Last Favorite" button disables when no favorites exist

**Data Structure Concept:** Stack - Last In First Out (LIFO)

---

## 🧪 Complete Test Scenario

### Test Case 1: Search Functionality

1. Search for "stranger" (partial match, case-insensitive)
2. See "Stranger Things" in dropdown and results
3. Verify title, genres, and rating display
4. Click "Watch Now" - verify it adds to Recently Watched

### Test Case 2: Recently Watched Queue

1. Watch these 7 movies in order:
   - "Stranger Things"
   - "Money Heist"
   - "Breaking Bad"
   - "Naruto"
   - "The Crown"
   - "The Witcher"
   - "Squid Game"
2. Check Recently Watched section
3. Verify ONLY last 5 movies appear (Naruto → Squid Game)
4. Verify first two (Stranger Things, Money Heist) disappeared
5. Watch "Stranger Things" again
6. Verify it moved to the end, queue still shows 5

### Test Case 3: Favorites Stack

1. Add these movies to favorites in order:
   - "Breaking Bad" (#1 added)
   - "Inception" (#2 added)
   - "Naruto" (#3 added)
   - "Squid Game" (#4 added)
2. Check "My Favorites" section
3. Verify "Squid Game" appears FIRST (most recent)
4. Verify order: Squid Game → Naruto → Inception → Breaking Bad
5. Click "Remove Last Favorite"
6. Verify "Squid Game" removed (last/top item removed)
7. Verify "Naruto" now appears first

### Test Case 4: Integration Test

1. Search for "money"
2. Click "Watch Now" on Money Heist
3. Verify it appears in Recently Watched
4. Click "Add to Favorites" on same card
5. Verify it appears in My Favorites at TOP
6. Go back and add another movie to favorites
7. Verify new movie is now at TOP
8. Remove favorites and verify they're gone from Recently Watched queue

---

## 📊 Data Structures Summary

| Feature          | Data Structure | Key Method      | Behavior              |
| ---------------- | -------------- | --------------- | --------------------- |
| Search           | Linear Search  | Loop + Match    | O(n) time             |
| Recently Watched | Queue          | Enqueue/Dequeue | FIFO - oldest removed |
| Favorites        | Stack          | Push/Pop        | LIFO - newest removed |

---

## 🐛 Troubleshooting

**Search not working:**

- Ensure you're typed in the search box in the dashboard (top navigation)
- Try searching for part of a movie title

**Recently Watched not updating:**

- Make sure you clicked "Watch Now" button (not just hovering)
- Check that the section is not empty message zone

**Favorites not updating:**

- Ensure you clicked the "🤍 Favorite" button during hover
- Heart button should turn ❤️ when added

**Remove Last Favorite button disabled:**

- You have no favorites yet - add at least one movie

---

## 🎯 Understanding the Code

Each feature uses specific code patterns:

**Linear Search** (script.js ~def 280):

```javascript
for (let i = 0; i < movies.length; i++) {
  if (movies[i].title.toLowerCase().includes(query)) {
    results.push(movies[i]);
  }
}
```

**Queue Enqueue** (script.js ~def 340):

```javascript
this.items.push(movie); // Add to back
if (this.items.length > 5) {
  this.items.shift(); // Remove from front
}
```

**Stack Pop** (script.js ~def 400):

```javascript
const removed = this.items.pop(); // Remove from top
```

---

## 📚 Full Documentation

For complete technical documentation, see `DATA_STRUCTURES_GUIDE.md`

This includes:

- Detailed algorithm explanations
- Time/space complexity analysis
- Code examples
- When to use each structure
- Extension possibilities
- Persistent storage options
