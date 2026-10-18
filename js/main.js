/* ============================================================
   轻量交互脚本：作品与关于我切换 / 年份
   （全站没有载入/滚动动画，内容永远直接可见）
   ============================================================ */

// 作品 / 关于我 面板切换
const tabWorks = document.getElementById("tabWorks");
const tabAbout = document.getElementById("tabAbout");
const panelWorks = document.getElementById("tools");
const panelAbout = document.getElementById("about");

function activateTab(which) {
  const showWorks = which === "works";
  tabWorks.classList.toggle("is-active", showWorks);
  tabAbout.classList.toggle("is-active", !showWorks);
  tabWorks.setAttribute("aria-selected", String(showWorks));
  tabAbout.setAttribute("aria-selected", String(!showWorks));
  panelWorks.hidden = !showWorks;
  panelAbout.hidden = showWorks;
}

tabWorks.addEventListener("click", () => activateTab("works"));
tabAbout.addEventListener("click", () => activateTab("about"));

// Hero 按钮指向这两个面板时，先切面板再滚动
document.querySelectorAll('a[href="#tools"]').forEach((a) =>
  a.addEventListener("click", () => activateTab("works"))
);
document.querySelectorAll('a[href="#about"]').forEach((a) =>
  a.addEventListener("click", () => activateTab("about"))
);

// 直接用 #about 链接打开页面时，默认显示关于面板
if (location.hash === "#about") activateTab("about");

// 页脚年份自动更新
document.getElementById('year').textContent = new Date().getFullYear();
