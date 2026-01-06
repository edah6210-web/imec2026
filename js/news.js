/* =========================
   News Timeline Loader
========================= */

fetch("data/news.json")
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById("news-list");

    data.forEach(item => {
      const el = document.createElement("div");
      el.className = "news-item";

      el.innerHTML = `
        <div class="news-header">
          <div class="news-meta">
            <span class="news-date">${item.date}</span>
            <span class="news-tag ${item.tag.toLowerCase()}">${item.tag}</span>
          </div>

          <div class="news-title">
            ${item.title}
          </div>

          <div class="news-toggle">
            <i class="fa-solid fa-plus"></i>
          </div>
        </div>

        <div class="news-body">
          ${item.content}
        </div>
      `;

      el.querySelector(".news-header").addEventListener("click", () => {
        el.classList.toggle("open");
      });

      container.appendChild(el);
    });
  });
