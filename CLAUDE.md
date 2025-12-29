# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A static web development reference repository containing standalone examples of HTML, CSS, and JavaScript techniques. No build system, framework, or package manager - just pure web fundamentals.

## Development

**Viewing Examples:**
Open HTML files directly in a browser. No server required.

```bash
# View main index
open index.html

# View specific examples
open pages/components/searchbar/index.html
open pages/layout/flexbox/index.html
```

## Architecture

### Organization Pattern

The repository uses a **self-contained component** architecture. Each example is fully independent with its own HTML, CSS, and JavaScript files. No shared libraries or cross-dependencies (except external CDNs for animation libraries).

**Directory structure:**
- `index.html` - Main landing page with categorized navigation
- `pages/layout/` - CSS layout systems (basic, flexbox, grid)
- `pages/components/` - Interactive UI components
- `pages/fonts/` - Typography systems
- `pages/design-system/` - Design tokens and CSS custom properties

**Component structure:**
```
component-name/
├── index.html       # Self-contained demo
├── css/main.css     # Component styles
└── js/[name].js     # Component logic (if needed)
```

### Key Design Decisions

**Vanilla JavaScript Only**: All interactive components use plain JS with no frameworks. Common patterns:
- State stored in module-level variables
- Rendering via `innerHTML` string templates
- Event delegation for dynamic content

**Example (searchbar/js/searchbar.js):**
```javascript
let currentFilter = 'all';
let filteredResults = [...database];

function performSearch(query) {
    let results = database.filter(item => /* ... */);
    results = sortResults(results, currentSort);
    displayResults(results);
}
```

**Example (comments/js/comments.js):**
```javascript
let commentsData = [/* array of comment objects */];

function renderComments() {
    commentsList.innerHTML = visibleComments
        .map(comment => createCommentHTML(comment))
        .join('');
}
```

**CSS Custom Properties for Design Systems**: The design-system examples demonstrate token-based theming:
```css
--color-primary: #3b82f6;
--font-size-base: 1rem;
--space-4: 1rem;
```

**External Dependencies**: Only used for advanced animation examples:
- GSAP (via CDN) in `pages/components/gsap/`, circle animations, animated-text
- Anime.js (via CDN) in `pages/components/anime-js/`

### Main Index Navigation

The root `index.html` implements a single-page navigation system:
- **Fixed sidebar** (lines 373-410): Category navigation with smooth scrolling
- **Category sections** (lines 418-571): Cards organized by type (Fundamentals, Layout, Typography, Components, JavaScript)
- **Responsive design**: Sidebar toggles to overlay on mobile (<768px)

**Adding a new example:**
1. Create component directory under appropriate category in `pages/`
2. Follow the self-contained structure (index.html + css/main.css + js/*.js)
3. Add a card in the main `index.html` within the relevant category section
4. Update sidebar nav counts if needed

### Interactive Components

**Advanced search** (`pages/components/searchbar/`):
- Live filtering across multiple fields
- Category filters and sorting
- Autocomplete suggestions dropdown
- State: `currentFilter`, `currentSort`, `searchQuery`, `filteredResults`

**Nested comments** (`pages/components/comments/`):
- Threaded replies with like/unlike
- Dynamic rendering of comment trees
- State: `commentsData` array with nested `replies`

**Tree view** (`pages/components/tree-view/`):
- Expandable/collapsible navigation
- Recursive rendering for nested items

All components handle their own state independently - no shared state management.
