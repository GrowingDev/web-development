        // ============================================
        // DATA - Sample search database
        // ============================================
        const database = [
            {
                id: 1,
                title: "Introduction to CSS Grid Layout",
                category: "tutorials",
                description: "Learn the fundamentals of CSS Grid and how to create powerful two-dimensional layouts for modern web applications.",
                icon: "📐",
                date: "2024-12-20",
                views: 15420,
                author: "Sarah Chen"
            },
            {
                id: 2,
                title: "JavaScript ES6+ Features Guide",
                category: "articles",
                description: "Comprehensive guide covering arrow functions, destructuring, spread operators, and other modern JavaScript features.",
                icon: "📝",
                date: "2024-12-18",
                views: 23150,
                author: "Mike Johnson"
            },
            {
                id: 3,
                title: "React Hooks Complete Documentation",
                category: "documentation",
                description: "Official documentation for React Hooks including useState, useEffect, useContext, and custom hooks implementation.",
                icon: "📚",
                date: "2024-12-15",
                views: 45200,
                author: "React Team"
            },
            {
                id: 4,
                title: "Building Responsive Websites Tutorial",
                category: "tutorials",
                description: "Step-by-step tutorial on creating fully responsive websites using CSS media queries and flexible layouts.",
                icon: "📱",
                date: "2024-12-22",
                views: 12800,
                author: "Emma Wilson"
            },
            {
                id: 5,
                title: "Advanced TypeScript Patterns",
                category: "articles",
                description: "Explore advanced TypeScript patterns including generics, decorators, and type inference for scalable applications.",
                icon: "⚡",
                date: "2024-12-10",
                views: 18900,
                author: "David Lee"
            },
            {
                id: 6,
                title: "Node.js API Development Video Course",
                category: "videos",
                description: "Complete video series on building RESTful APIs with Node.js, Express, and MongoDB.",
                icon: "🎥",
                date: "2024-12-05",
                views: 34500,
                author: "Tech Academy"
            },
            {
                id: 7,
                title: "CSS Flexbox Master Class",
                category: "tutorials",
                description: "Master CSS Flexbox with practical examples and learn how to create flexible, responsive layouts effortlessly.",
                icon: "🎨",
                date: "2024-12-12",
                views: 21300,
                author: "Alex Kim"
            },
            {
                id: 8,
                title: "Vue.js 3 Composition API Guide",
                category: "documentation",
                description: "Complete guide to Vue.js 3 Composition API with examples of reactivity, lifecycle hooks, and component composition.",
                icon: "💚",
                date: "2024-12-08",
                views: 16700,
                author: "Vue Core Team"
            },
            {
                id: 9,
                title: "Web Performance Optimization",
                category: "articles",
                description: "Best practices for optimizing web performance including lazy loading, code splitting, and caching strategies.",
                icon: "🚀",
                date: "2024-12-14",
                views: 19500,
                author: "Performance Team"
            },
            {
                id: 10,
                title: "Docker for Developers Video Series",
                category: "videos",
                description: "Learn Docker from scratch including containers, images, volumes, and orchestration with practical examples.",
                icon: "🐳",
                date: "2024-12-01",
                views: 28900,
                author: "DevOps Masters"
            },
            {
                id: 11,
                title: "GraphQL API Design Tutorial",
                category: "tutorials",
                description: "Design and implement GraphQL APIs with best practices for schema design, resolvers, and query optimization.",
                icon: "🔷",
                date: "2024-12-16",
                views: 14200,
                author: "API Guild"
            },
            {
                id: 12,
                title: "Modern CSS Animations Guide",
                category: "articles",
                description: "Create stunning CSS animations and transitions using keyframes, transforms, and animation properties.",
                icon: "✨",
                date: "2024-12-19",
                views: 22400,
                author: "Animation Pro"
            }
        ];

        // ============================================
        // STATE MANAGEMENT
        // ============================================
        let currentFilter = 'all';
        let currentSort = 'relevance';
        let searchQuery = '';
        let filteredResults = [...database];

        // ============================================
        // DOM ELEMENTS
        // ============================================
        const searchInput = document.getElementById('searchInput');
        const clearBtn = document.getElementById('clearBtn');
        const resultsList = document.getElementById('resultsList');
        const resultsCount = document.getElementById('resultsCount');
        const sortSelect = document.getElementById('sortSelect');
        const filterBtns = document.querySelectorAll('.filter-btn');
        const suggestionsDropdown = document.getElementById('suggestionsDropdown');

        // ============================================
        // SEARCH FUNCTIONALITY
        // ============================================
        function performSearch(query) {
            searchQuery = query.toLowerCase().trim();
            
            // Filter by search query
            let results = database.filter(item => {
                return item.title.toLowerCase().includes(searchQuery) ||
                       item.description.toLowerCase().includes(searchQuery) ||
                       item.category.toLowerCase().includes(searchQuery) ||
                       item.author.toLowerCase().includes(searchQuery);
            });

            // Filter by category
            if (currentFilter !== 'all') {
                results = results.filter(item => item.category === currentFilter);
            }

            // Sort results
            results = sortResults(results, currentSort);

            filteredResults = results;
            displayResults(results);
            updateResultsCount(results.length);
        }

        function sortResults(results, sortBy) {
            const sorted = [...results];
            
            switch(sortBy) {
                case 'date':
                    return sorted.sort((a, b) => new Date(b.date) - new Date(a.date));
                case 'title':
                    return sorted.sort((a, b) => a.title.localeCompare(b.title));
                case 'popularity':
                    return sorted.sort((a, b) => b.views - a.views);
                case 'relevance':
                default:
                    return sorted;
            }
        }

        function highlightText(text, query) {
            if (!query) return text;
            const regex = new RegExp(`(${query})`, 'gi');
            return text.replace(regex, '<span class="highlight">$1</span>');
        }

        function displayResults(results) {
            if (results.length === 0) {
                resultsList.innerHTML = `
                    <div class="no-results">
                        <div class="no-results-icon">🔍</div>
                        <h3>No results found</h3>
                        <p>Try adjusting your search or filters</p>
                    </div>
                `;
                return;
            }

            resultsList.innerHTML = results.map(item => `
                <div class="result-item" onclick="handleResultClick(${item.id})">
                    <div class="result-header">
                        <div class="result-icon">${item.icon}</div>
                        <div class="result-content">
                            <span class="result-category">${item.category}</span>
                            <h3 class="result-title">${highlightText(item.title, searchQuery)}</h3>
                            <p class="result-description">${item.description}</p>
                            <div class="result-meta">
                                <span class="result-meta-item">
                                    👤 ${item.author}
                                </span>
                                <span class="result-meta-item">
                                    📅 ${formatDate(item.date)}
                                </span>
                                <span class="result-meta-item">
                                    👁️ ${formatViews(item.views)}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            `).join('');
        }

        function updateResultsCount(count) {
            resultsCount.innerHTML = `Showing <span class="highlight">${count}</span> result${count !== 1 ? 's' : ''}`;
        }

        // ============================================
        // SUGGESTIONS
        // ============================================
        function showSuggestions(query) {
            if (!query || query.length < 2) {
                suggestionsDropdown.classList.remove('visible');
                return;
            }

            const suggestions = database
                .filter(item => 
                    item.title.toLowerCase().includes(query.toLowerCase())
                )
                .slice(0, 5);

            if (suggestions.length === 0) {
                suggestionsDropdown.classList.remove('visible');
                return;
            }

            suggestionsDropdown.innerHTML = suggestions.map(item => `
                <div class="suggestion-item" onclick="selectSuggestion('${item.title}')">
                    <span class="suggestion-icon">${item.icon}</span>
                    <span class="suggestion-text">${item.title}</span>
                    <span class="suggestion-category">${item.category}</span>
                </div>
            `).join('');

            suggestionsDropdown.classList.add('visible');
        }

        function selectSuggestion(title) {
            searchInput.value = title;
            suggestionsDropdown.classList.remove('visible');
            performSearch(title);
            clearBtn.classList.add('visible');
        }

        // ============================================
        // EVENT HANDLERS
        // ============================================
        searchInput.addEventListener('input', (e) => {
            const value = e.target.value;
            
            if (value.length > 0) {
                clearBtn.classList.add('visible');
                showSuggestions(value);
            } else {
                clearBtn.classList.remove('visible');
                suggestionsDropdown.classList.remove('visible');
            }
            
            performSearch(value);
        });

        clearBtn.addEventListener('click', () => {
            searchInput.value = '';
            clearBtn.classList.remove('visible');
            suggestionsDropdown.classList.remove('visible');
            searchQuery = '';
            performSearch('');
            searchInput.focus();
        });

        sortSelect.addEventListener('change', (e) => {
            currentSort = e.target.value;
            performSearch(searchQuery);
        });

        filterBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                filterBtns.forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                currentFilter = e.target.dataset.filter;
                performSearch(searchQuery);
            });
        });

        // Close suggestions when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.search-wrapper')) {
                suggestionsDropdown.classList.remove('visible');
            }
        });

        function handleResultClick(id) {
            const item = database.find(i => i.id === id);
            console.log('Clicked result:', item);
            alert(`You clicked: ${item.title}`);
        }

        // ============================================
        // UTILITY FUNCTIONS
        // ============================================
        function formatDate(dateString) {
            const date = new Date(dateString);
            return date.toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric', 
                year: 'numeric' 
            });
        }

        function formatViews(views) {
            if (views >= 1000) {
                return (views / 1000).toFixed(1) + 'K';
            }
            return views.toString();
        }

        // ============================================
        // INITIALIZATION
        // ============================================
        document.addEventListener('DOMContentLoaded', () => {
            performSearch('');
        });