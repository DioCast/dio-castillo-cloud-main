// PART 1: The Index Page "Featured" Logic
async function loadFeaturedPost() {
    const container = document.getElementById('dynamic-featured-post');
    if (!container) return; // Stop if we aren't on the landing page

    try {
        const response = await fetch('posts/posts.json');
        const posts = await response.json();
        
        // Find the first post marked "featured: true"
        const featured = posts.find(post => post.featured);

        if (featured) {
            const html = `
                <div class="featured-card">
                    <span class="featured-date">LOG ENTRY #${featured.number} • ${featured.date}</span>
                    <h2 class="featured-title">${featured.title}</h2>
                    <p class="featured-snippet">"${featured.snippet}"</p>
                    <a href="blog.html#${featured.id}" class="featured-link">Continue Reading →</a>
                    <div class="view-all-container">
                        <a href="blog.html" class="cta-secondary" style="padding: 8px 15px; font-size: 0.9rem;">View All Entries</a>
                    </div>
                </div>
            `;
            container.innerHTML = html;
        }
    } catch (error) {
        console.error('Error loading featured post:', error);
    }
}

// PART 2: The Blog Page "Journal" Logic
async function loadBlogPage() {
    const container = document.getElementById('blog-list');
    if (!container) return; // Stop if we aren't on the blog page

    try {
        const response = await fetch('posts/posts.json');
        let posts = await response.json();

        // REVERSE ORDER: The JSON is Oldest->Newest (bottom append).
        // We reverse it here so the website displays Newest at the TOP.
        posts = posts.reverse();

        const html = posts.map(post => `
            <article class="blog-post" id="${post.id}">
                <div class="post-header">
                    <span class="post-date">LOG ENTRY #${post.number} • ${post.date}</span>
                    <h2>${post.title}</h2>
                </div>
                
                <div class="post-content">
                    ${post.body} 
                </div>

                <div class="post-footer">
                    ${post.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
                <hr class="post-divider">
            </article>
        `).join('');

        container.innerHTML = html;

        // --- NEW: SCROLL FIX ---
        // 1. Check if the URL has a specific hash (e.g., #veloci-error13-raptor)
        if (window.location.hash) {
            // 2. Remove the '#' symbol to get the ID string
            const id = window.location.hash.substring(1);
            
            // 3. Find that element in the newly rendered HTML
            const element = document.getElementById(id);
            
            // 4. If it exists, scroll to it smoothly
            if (element) {
                // We use a slight timeout to ensure the browser has painted the DOM
                setTimeout(() => {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 100);
            }
        }
        // -----------------------

    } catch (error) {
        console.error('Error loading blog list:', error);
    }
}// PART 3: Sidebar Navigation Logic
function setupSidebar() {
    const toggleBtn = document.getElementById('toc-toggle');
    const closeBtn = document.getElementById('toc-close');
    const sidebar = document.getElementById('toc-sidebar');
    const content = document.getElementById('toc-content');

    // Safety check: If these don't exist (like on index.html), stop.
    if (!toggleBtn || !sidebar) return;

    // 1. Open Sidebar
    toggleBtn.addEventListener('click', () => {
        sidebar.classList.add('open');
        loadSidebarLinks(); // Load links only when requested
    });

    // 2. Close Sidebar
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            sidebar.classList.remove('open');
        });
    }

    // 3. Populate Sidebar Links (dynamically from posts.json)
    async function loadSidebarLinks() {
        // If already loaded, don't fetch again
        if (content.innerHTML.trim() !== "") return;

        try {
            const response = await fetch('posts/posts.json');
            let posts = await response.json();

            const html = posts.map(post => `
                <a href="blog.html#${post.id}" class="toc-item" onclick="closeSidebar()">
                    <span class="toc-item-snippet">LOG ENTRY #${post.number} • ${post.date}</span></br>
                    <span class="toc-item-title"><strong>${post.title}</strong></span>
                </a>
            `).join('');
            
            content.innerHTML = html;
        } catch (error) {
            console.error('Error loading sidebar links:', error);
            content.innerHTML = '<p style="padding:1rem;">Error loading entries.</p>';
        }
    }
}

// Helper to close sidebar when a link is clicked
function closeSidebar() {
    const sidebar = document.getElementById('toc-sidebar');
    if (sidebar) sidebar.classList.remove('open');
}

// PART 4: Back to Top Button Logic
function setupBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top');

    if (!backToTopBtn) return; // Safety check

    // 1. Show/Hide on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) { // Show after scrolling down 300px
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    // 2. Smooth Scroll to Top on click
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Initialize
setupBackToTop();

// Initialize Sidebar
setupSidebar();

// Run the functions
loadFeaturedPost();
loadBlogPage();