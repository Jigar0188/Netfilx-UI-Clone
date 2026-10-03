# 🏗️ Architecture & Data Structure Visualization

## System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────────┐
│                           NETFLIX AI APP                                │
└─────────────────────────────────────────────────────────────────────────┘
                                   │
                    ┌──────────────┼──────────────┐
                    ▼              ▼              ▼
         ┌─────────────────┐  ┌──────────────┐  ┌──────────────────┐
         │   SEARCH BAR    │  │  NAV BAR     │  │  OPTIONS         │
         │  (Linear Search │  │ & Welcome    │  │  (Logout, etc)   │
         │   O(n) time)    │  │              │  │                  │
         └─────────────────┘  └──────────────┘  └──────────────────┘


┌─────────────────────────────────────────────────────────────────────────┐
│                         THREE DATA STRUCTURES                            │
└─────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────┐  ┌──────────────────────────┐  ┌──────────────────────────┐
│    LINEAR SEARCH (O(n))     │  │   QUEUE - FIFO           │  │   STACK - LIFO           │
│                             │  │   (Recently Watched)     │  │   (My Favorites)         │
│  ┌───┐┌───┐┌───┐┌───┐┌───┐ │  │                          │  │                          │
│  │ 1 ││ 2 ││ 3 ││ 4 ││ 5 │ │  │   Front              Back│  │   Top (Last Added)  Last │
│  └───┘└───┘└───┘└───┘└───┘ │  │    ↓                  ↓ │  │       ↓              ↓   │
│   [Linear Traverse]        │  │  ┌───────────────────────┐ │  │  ┌───────────────────┐  │
│   Result: Matching Movies  │  │  │Squid Game│Inception  │ │  │  │  Squid Game      │  │
│                             │  │  │Breaking  │Money Heist │ │  │  │  (Most Recent)   │  │
│   Search Query: "breaking" │  │  │Bad       │K Stranger │ │  │  │  Inception       │  │
│   Result: [Breaking Bad]   │  │  │Crown     │Things     │ │  │  │  Money Heist     │  │
│                             │  │  │          │           │ │  │  │  Breaking Bad    │  │
│   Time Complexity: O(n)    │  │  └───────────────────────┘ │  │  └───────────────────┘  │
│   Space Complexity: O(1)   │  │                             │  │                         │
│                             │  │   Max Size: 5              │  │  Unlimited Size        │
│                             │  │   Oldest Removed: FIFO     │  │  Top Removed: LIFO     │
│                             │  │                             │  │  "Remove Last"         │
└─────────────────────────────┘  └──────────────────────────┘  └──────────────────────────┘


┌─────────────────────────────────────────────────────────────────────────┐
│                          MOVIE DATABASE                                  │
│                     Array of Movie Objects                               │
│  ┌─────────────────────────────────────────────────────────────────────┐ │
│  │ [                                                                   │ │
│  │   {id: 1, title: "Stranger Things", rating: 9, ...},              │ │
│  │   {id: 2, title: "Money Heist", rating: 8.5, ...},                │ │
│  │   {id: 3, title: "Breaking Bad", rating: 9.5, ...},               │ │
│  │   ... (8 total movies)                                            │ │
│  │ ]                                                                   │ │
│  └─────────────────────────────────────────────────────────────────────┘ │
│                                                                            │
│  Used By:                                                                 │
│  ├─ Linear Search: Iterate through all movies                           │
│  ├─ displayTrendingMovies(): Filter by category                         │
│  ├─ displayTopRatedMovies(): Sort by rating                             │
│  └─ displayAllMovies(): Show all                                        │
└─────────────────────────────────────────────────────────────────────────┘


┌─────────────────────────────────────────────────────────────────────────┐
│                      USER INTERACTION FLOW                               │
└─────────────────────────────────────────────────────────────────────────┘

EVENT FLOW CHART:
═══════════════════════════════════════════════════════════════════════════

1️⃣  SEARCH EVENT:
    ┌─── User Types in Search ───┐
    │                             │
    ▼                             │
    handleSearch() [UI Handler]   │
    │                             │
    ▼                             │
    linearSearchByTitle() ◄────────┘
    │      ↓
    │   Loop through movies
    │   Check titles
    │   Find matches
    │
    ▼
    displaySearchResults()
    │
    ▼
    Dropdown shows (or full section if clicked)


2️⃣  WATCH NOW EVENT:
    ┌─── User Clicks "Watch Now" ───┐
    │                                │
    ├──────────────────────────────┤
    │     │                        │
    ▼     ▼                        │
    openVideoPlayer()   addToRecentlyWatched()
       (Video Player)        │
                             ▼
                     queue.enqueue(movie)
                             │
                             ▼
                      Check if > 5
                             │
                         YES │ NO
                        /    └─── Just Add
                       ▼
                   shift() remove oldest
                             │
                             ▼
                     displayRecentlyWatched()
                     (Update UI)


3️⃣  ADD TO FAVORITES EVENT:
    ┌─── User Clicks "Favorite" ───┐
    │                               │
    ▼                               │
    Check if already favorited ◄────┘
    │           │
    YES (Remove) NO (Add)
    │           │
    ▼           ▼
Remove from  stack.push(movie)
Stack Array      │
    │            │
    └────┬───────┘
         │
         ▼
    displayFavorites()
    │
    ├─ Update button color
    ├─ Update count
    └─ Reorder (reverse to show LIFO)


4️⃣  REMOVE LAST FAVORITE EVENT:
    ┌─── Click "Remove Last Favorite" ───┐
    │                                     │
    ▼                                     │
    stack.pop() ◄────────────────────────────┘
    │  (Remove top item)
    │
    └─ If empty, disable button

    ▼
    displayFavorites()
    (Update UI)


┌─────────────────────────────────────────────────────────────────────────┐
│                    DATA STRUCTURE OPERATIONS VISUAL                      │
└─────────────────────────────────────────────────────────────────────────┘

QUEUE OPERATIONS (FIFO - First In First Out):
═════════════════════════════════════════════════════════════════════════

Initial State:
┌─────────────────────────────────┐
│  Queue = []                     │
└─────────────────────────────────┘

After Watch 1 (Stranger Things):
┌─────────────────────────────────┐
│  enqueue() →  [ST]              │
└─────────────────────────────────┘
       Add to back

After Watch 2 (Money Heist):
┌─────────────────────────────────┐
│  enqueue() →  [ST, MH]          │
└─────────────────────────────────┘
           Add to back

After Watch 3,4,5,6 (Total 6 movies, but max = 5):
┌─────────────────────────────────┐
│  After 5: [ST, MH, BB, N, TC]   │
│  After 6: shift() removes ST    │
│           [MH, BB, N, TC, TW]   │
└─────────────────────────────────┘
Remove from front (oldest)

Display Order (as rendered):
Oldest ──────────────────── Newest
  MH    →    BB    →    N    →   TC   →   TW


STACK OPERATIONS (LIFO - Last In First Out):
═════════════════════════════════════════════════════════════════════════

Initial State:
┌─────────────────────────────────┐
│  Stack = []                     │
└─────────────────────────────────┘

After Add 1 (Breaking Bad):
┌─────────────────────────────────┐
│              ↑                  │
│          [BB]                   │  ← Top (Most Recent)
│  push() →                       │
└─────────────────────────────────┘
    Add to top

After Add 2 (Inception):
┌─────────────────────────────────┐
│              ↑                  │
│          [I]                    │  ← Top (Most Recent)
│          [BB]                   │
│  push() →                       │
└─────────────────────────────────┘
    Add to top

After Add 3 (Naruto):
┌─────────────────────────────────┐
│              ↑                  │
│          [N]                    │  ← Top (Most Recent)
│          [I]                    │
│          [BB]                   │
│  push() →                       │
└─────────────────────────────────┘
    Add to top

After pop() (Remove Last):
┌─────────────────────────────────┐
│    pop() ↔ removed: N            │
│              ↑                  │
│          [I]                    │  ← Top (Most Recent)
│          [BB]                   │
└─────────────────────────────────┘
    Remove top

Display Order (rendered as reversed):
─────────────────────────────────
Top (Most Recent First)
    ▼
   I
   BB
   ...
   ▲
Bottom


LINEAR SEARCH VISUALIZATION:
═════════════════════════════════════════════════════════════════════════

Movies Array:
┌─┬──┬──┬──┬──┬──┬──┬──┐
│1│2 │3 │4 │5 │6 │7 │8 │
└─┴──┴──┴──┴──┴──┴──┴──┘
 ST MH BB N TC TW SG INC

Search Query: "Breaking"
                  ↓
Step-by-step Linear Search:
┌─┐         Check ST  ─── No match
└─┘
  ┌─┐       Check MH  ─── No match
  └─┘
    ┌─┐     Check BB  ─── ✓ MATCH! (Breaking Bad contains "Breaking")
    └─┘
      ┌─┐   Check N   ─── No match
      └─┘
        ┌─┐ Check TC  ─── No match
        └─┘
          ... Continue through rest

Result Array: [BB]  ← Breaking Bad object

Time Analysis:
- Best case: O(1) - First movie matches
- Average case: O(n/2) - Match in middle
- Worst case: O(n) - Match at end or no match
- Overall: O(n) - Linear time


┌─────────────────────────────────────────────────────────────────────────┐
│                    COMPLEXITY ANALYSIS                                   │
└─────────────────────────────────────────────────────────────────────────┘

LINEAR SEARCH:
  Time: O(n)  ─ Must check each movie worst case
  Space: O(1) ─ Only uses input + output

QUEUE.ENQUEUE():
  Time: O(1)  ─ Just add to end (and possibly remove from front)
  Space: O(1) ─ No temporary arrays needed

QUEUE.DEQUEUE():
  Time: O(1)  ─ Just remove from front
  Space: O(1) ─ No temporary arrays needed

STACK.PUSH():
  Time: O(1)  ─ Just add to end
  Space: O(1) ─ No temporary arrays needed

STACK.POP():
  Time: O(1)  ─ Just remove from end
  Space: O(1) ─ No temporary arrays needed

For n movies and infinite time:
  Search all movies: O(n) = 8 movies ≈ 8 operations
  Queue limit 5: O(1) = 1 operation per action
  Stack unlimited: O(1) = 1 operation per action


┌─────────────────────────────────────────────────────────────────────────┐
│                  STATE DIAGRAM - APPLICATION FLOW                        │
└─────────────────────────────────────────────────────────────────────────┘

                         ┌──────────────┐
                         │ Not Logged In │
                         └──────────────┘
                                 ▲
                                 │
                          Sign Up / Sign In
                                 │
                                 ▼
                         ┌──────────────┐
                         │  Logged In   │
                         └──────────────┘
                                 │
                    ┌────────────┼────────────┐
                    │            │            │
                    ▼            ▼            ▼
            ┌──────────────┐ ┌───────┐ ┌─────────────┐
            │  Search     │ │ Browse│ │ Manage Lists│
            │ (Linear)    │ │Movies │ │(Queue/Stack)│
            └──────────────┘ └───────┘ └─────────────┘
                    │            │            │
            See Results    View Movies    Add/Remove Items
                    │            │            │
                    └────────────┼────────────┘
                                 │
                                 ▼
                        ┌──────────────┐
                        │ Watch Movie  │
                        │ + Enqueue    │
                        └──────────────┘
                                 │
                                 ▼
                        ┌──────────────┐
                        │ Logout       │
                        └──────────────┘
                                 │
                                 ▼
                         ┌──────────────┐
                         │ Not Logged In │
                         └──────────────┘

```

---

## 🎯 Key Takeaways

### Each Data Structure Solves Different Problems:

| Problem               | Solution      | Why                                          |
| --------------------- | ------------- | -------------------------------------------- |
| Find a movie by title | Linear Search | Simple, works on unsorted data               |
| Track last 5 watched  | Queue (FIFO)  | Oldest needs to go away first                |
| Manage favorites      | Stack (LIFO)  | Most recent added is most relevant to remove |

### Complexity Summary:

```
                OPERATION    TIME        SPACE
Linear Search        O(n)      Linear       O(1)
Queue.enqueue()      O(1)      Constant     O(1)
Queue.dequeue()      O(1)      Constant     O(1)
Stack.push()         O(1)      Constant     O(1)
Stack.pop()          O(1)      Constant     O(1)
```

All operations (except search) are **blazingly fast** O(1)! ⚡

---

## 📌 Remember

- **Queue**: Think of a bank line. First person in is first served.
- **Stack**: Think of stacking plates. Last plate placed is first plate taken.
- **Linear Search**: Check each item one by one.

That's it! These simple concepts power huge software systems. 🚀
