// PART 1: The Single-Post Rendering Logic
document.addEventListener("DOMContentLoaded", () => {
  initFieldGuide();
  setupSidebar();
  setupBackToTop();
});

// Cache manifest in memory so we only fetch it once per visit
let cachedManifest = null;

async function getManifest() {
  if (cachedManifest) return cachedManifest;
  const response = await fetch("posts/manifest.json");
  if (!response.ok) throw new Error("Failed to load manifest");
  cachedManifest = await response.json();
  return cachedManifest;
}

async function initFieldGuide() {
  const container = document.getElementById("blog-list");
  if (!container) return;

  try {
    const manifest = await getManifest();
    const urlParams = new URLSearchParams(window.location.search);
    const requestedLogId = urlParams.get("log");

    let activeLog = manifest.find((post) => post.id === requestedLogId);
    if (!activeLog) {
      activeLog =
        manifest.find((post) => post.featured) || manifest[manifest.length - 1];
    }

    await loadAndRenderPost(activeLog, container);
  } catch (error) {
    console.error("Field Guide Error:", error);
    container.innerHTML = `<p style="color: red; padding: 20px;">Error loading expedition log. Check console.</p>`;
  }
}

// Fetch markdown and update DOM
async function loadAndRenderPost(metaData, container) {
  const markdownResponse = await fetch(`log_entries/${metaData.file}`);
  if (!markdownResponse.ok)
    throw new Error(`Failed to load markdown: ${metaData.file}`);
  const markdownText = await markdownResponse.text();

  const parsedHTML = marked.parse(markdownText);

  // --- NEW: Calculate Prev/Next Navigation ---
  const manifest = await getManifest();
  const currentIndex = manifest.findIndex((post) => post.id === metaData.id);

  const prevPost = currentIndex > 0 ? manifest[currentIndex - 1] : null;
  const nextPost =
    currentIndex < manifest.length - 1 ? manifest[currentIndex + 1] : null;

  const navHTML = `
        <div class="post-navigation">
            <div class="nav-wrapper prev-wrapper">
                ${
                  prevPost
                    ? `
                <a href="?log=${prevPost.id}" class="nav-link" data-log-id="${prevPost.id}">
                    <div class="nav-arrow-circle">←</div>
                    <div class="nav-text-container">
                        <span class="nav-label">Previous Log Entry</span>
                        <span class="nav-title">${prevPost.title}</span>
                    </div>
                </a>`
                    : ""
                }
            </div>
            <div class="nav-wrapper next-wrapper">
                ${
                  nextPost
                    ? `
                <a href="?log=${nextPost.id}" class="nav-link next-link" data-log-id="${nextPost.id}">
                    <div class="nav-text-container right-align">
                        <span class="nav-label">Next Log Entry</span>
                        <span class="nav-title">${nextPost.title}</span>
                    </div>
                    <div class="nav-arrow-circle">→</div>
                </a>`
                    : ""
                }
            </div>
        </div>
    `;
  // -------------------------------------------

  container.innerHTML = `
        <article class="blog-post" id="${metaData.id}">
            <div class="post-header">
                <span class="post-date">LOG ENTRY #${metaData.number} • ${metaData.date}</span>
                <h2>${metaData.title}</h2>
            </div>
            <div class="post-content">
                ${parsedHTML}
            </div>
            <div class="post-footer">
                ${metaData.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}
            </div>
            ${navHTML}
        </article>
    `;

  // Attach event listeners so the new buttons use our fast SPA routing
  container.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const logId = link.getAttribute("data-log-id");
      navigateToLog(logId);
    });
  });

  // Smooth scroll back to top of the article
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// Switch post without reloading the entire page
async function navigateToLog(logId) {
  const container = document.getElementById("blog-list");
  if (!container) return;

  const manifest = await getManifest();
  const targetLog = manifest.find((post) => post.id === logId);
  if (!targetLog) return;

  // Update browser URL without triggering a full page reload
  window.history.pushState({ logId }, "", `?log=${logId}`);
  await loadAndRenderPost(targetLog, container);
}

// Handle browser Back / Forward buttons
window.addEventListener("popstate", (event) => {
  const urlParams = new URLSearchParams(window.location.search);
  const requestedLogId = urlParams.get("log");
  if (requestedLogId) {
    navigateToLog(requestedLogId);
  }
});

// PART 2: Sidebar Navigation Logic
function setupSidebar() {
  const toggleBtn = document.getElementById("toc-toggle");
  const closeBtn = document.getElementById("toc-close");
  const sidebar = document.getElementById("toc-sidebar");
  const content = document.getElementById("toc-content");

  if (!toggleBtn || !sidebar) return;

  toggleBtn.addEventListener("click", () => {
    sidebar.classList.add("open");
    loadSidebarLinks();
  });

  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      sidebar.classList.remove("open");
    });
  }

  async function loadSidebarLinks() {
    if (content.innerHTML.trim() !== "") return;
    try {
      const manifest = await getManifest();

      // Render links with an intercept click handler
      content.innerHTML = manifest
        .map(
          (post) => `
                <a href="?log=${post.id}" class="toc-item" data-log-id="${post.id}">
                    <span class="toc-item-snippet">LOG ENTRY #${post.number} • ${post.date}</span></br>
                    <span class="toc-item-title"><strong>${post.title}</strong></span>
                </a>
            `,
        )
        .join("");

      // Attach dynamic click listeners
      content.querySelectorAll(".toc-item").forEach((link) => {
        link.addEventListener("click", (e) => {
          e.preventDefault();
          const logId = link.getAttribute("data-log-id");
          navigateToLog(logId);
          closeSidebar();
        });
      });
    } catch (error) {
      console.error("Error loading sidebar links:", error);
      content.innerHTML = '<p style="padding:1rem;">Error loading entries.</p>';
    }
  }
}

function closeSidebar() {
  const sidebar = document.getElementById("toc-sidebar");
  if (sidebar) sidebar.classList.remove("open");
}

// PART 3: Back to Top Button Logic
function setupBackToTop() {
  const backToTopBtn = document.getElementById("back-to-top");
  if (!backToTopBtn) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add("visible");
    } else {
      backToTopBtn.classList.remove("visible");
    }
  });

  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}
