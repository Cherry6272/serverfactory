document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('site-search');
    const searchResults = document.getElementById('search-results');

    if (!searchInput || !searchResults) return;

    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        searchResults.innerHTML = '';

        if (query.length < 2) {
            searchResults.style.display = 'none';
            return;
        }

        const matches = searchIndex.filter(item => 
            item.name.toLowerCase().includes(query) || 
            item.category.toLowerCase().includes(query)
        ).slice(0, 8); // Limit to 8 results

        if (matches.length > 0) {
            matches.forEach(item => {
                const div = document.createElement('a');
                div.href = item.url;
                div.className = 'search-result-item';
                div.innerHTML = `
                    <div class="search-result-info">
                        <span class="search-result-name">${item.name}</span>
                        <span class="search-result-category">${item.category}</span>
                    </div>
                `;
                searchResults.appendChild(div);
            });
            searchResults.style.display = 'block';
        } else {
            searchResults.innerHTML = '<div class="no-results">No products found</div>';
            searchResults.style.display = 'block';
        }
    });

    // Close results when clicking outside
    document.addEventListener('click', (e) => {
        if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
            searchResults.style.display = 'none';
        }
    });
});
