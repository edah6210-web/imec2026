/* =========================
   News Timeline Loader
========================= */

fetch("data/news.json")
  .then(res => {
    if (!res.ok) {
      throw new Error("Failed to load news.json");
    }
    return res.json();
  })
  .then(data => {
    const container = document.getElementById("news-list");
    if (!container) return; // ⬅ GitHub Pages 關鍵保護

    /* 依日期新 → 舊排序 */
    data.sort((a, b) => {
      const d1 = new Date(a.date.replace(/\./g, "-"));
      const d2 = new Date(b.date.replace(/\./g, "-"));
      return d2 - d1;
    });

    data.forEach(item => {
      const el = document.createElement("div");
      el.className = "news-item";

      el.innerHTML = `
        <div class="news-header">
          <div class="news-date">${item.date}</div>
          <div>
            <span class="news-tag ${item.tag.toLowerCase()}">${item.tag}</span>
            <div class="news-title">${item.title}</div>
          </div>
          <div class="news-toggle">＋</div>
        </div>

        <div class="news-content">
          <p>${item.summary}</p>
          ${item.content ? `<p>${item.content}</p>` : ""}
        </div>
      `;

      el.querySelector(".news-header").addEventListener("click", () => {
        el.classList.toggle("active");
      });

      container.appendChild(el);
    });
  })
  .catch(err => {
    console.error("News load error:", err);
  });
