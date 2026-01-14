/* =====================================================
   News Timeline Loader
   用法：在 HTML 調用 loadNews('zh') 或 loadNews('en')
===================================================== */

async function loadNews(langType) {
  const container = document.getElementById("news-list");
  if (!container) return;

  // 1. 設定對應的 JSON 路徑
  const jsonFile = langType === 'en' ? "data/news_en.json" : "data/news_zh.json";

  try {
    // 2. 獲取資料
    const res = await fetch(jsonFile);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    
    const data = await res.json();
    
    // 3. 使用 Fragment 提升渲染效能
    const fragment = document.createDocumentFragment();

    data.forEach(item => {
      const el = document.createElement("div");
      el.className = "news-item";

      // 組合內文 HTML
      el.innerHTML = `
        <div class="news-header">
          <div class="news-meta">
            <span class="news-date">${item.date}</span>
            ${item.tag ? `<span class="news-tag ${item.tag.toLowerCase()}">${item.tag}</span>` : ''}
          </div>
          <div class="news-title">${item.title}</div>
          <div class="news-toggle">
            <i class="fa-solid fa-plus"></i>
          </div>
        </div>
        <div class="news-body">
          <div class="content-wrapper">${item.content}</div>
        </div>
      `;

      // 4. 綁定點擊展開事件
      el.querySelector(".news-header").addEventListener("click", () => {
        const isOpen = el.classList.toggle("open");
        
        // 切換圖示 (Plus / Minus)
        const icon = el.querySelector(".news-toggle i");
        if (icon) {
          icon.className = isOpen ? "fa-solid fa-minus" : "fa-solid fa-plus";
        }
      });

      fragment.appendChild(el);
    });

    // 5. 一次性渲染
    container.innerHTML = ""; 
    container.appendChild(fragment);

  } catch (error) {
    console.error("News Loader Error:", error);
    container.innerHTML = `<p style="padding:20px; color:#c62828;">Data could not be loaded. / 資料載入失敗。</p>`;
  }
}
