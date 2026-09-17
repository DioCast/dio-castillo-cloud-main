// PART 1: The Index Page "Featured" Logic
async function loadFeaturedPost() {
  const container = document.getElementById("dynamic-featured-post");
  if (!container) return; // Stop if we aren't on the landing page

  try {
    // Fetch the new manifest instead of the deprecated posts.json
    const response = await fetch("posts/manifest.json");
    const posts = await response.json();

    // Find the featured post, fallback to the latest if none are marked
    const featured =
      posts.find((post) => post.featured) || posts[posts.length - 1];

    if (featured) {
      const html = `
                <div class="featured-card">
                    <span class="featured-date">LOG ENTRY #${featured.number} • ${featured.date}</span>
                    <h2 class="featured-title">${featured.title}</h2>
                    <p class="featured-snippet">"${featured.snippet}"</p>
                    <a href="https://blog.dio-castillo.cloud/?log_entry=${featured.id}" class="featured-link">Continue Reading →</a>
                    <div class="view-all-container">
                        <a href="https://blog.dio-castillo.cloud/" class="cta-secondary" style="padding: 8px 15px; font-size: 0.9rem;">View All Entries</a>
                    </div>
                </div>
            `;
      container.innerHTML = html;
    }
  } catch (error) {
    console.error("Error loading featured post:", error);
  }
}

// Ensure it runs on the landing page when the DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  loadFeaturedPost();
});
