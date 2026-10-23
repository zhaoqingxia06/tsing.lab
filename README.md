# 个人网站 · 框架版

仿 [oiloil.org](https://www.oiloil.org/) 骨架的个人网站：干净的留白排版 + 少量彩色点缀（Google / Apple 官网感），
卡片用阴影浮起、不用描边；点缀色与头像设计稿保持一致。纯静态页面（HTML + CSS + JS），
没有构建步骤，改完文件刷新浏览器就能看到效果。

## 本地预览

任选一种：

- 直接双击 `index.html` 用浏览器打开；
- 或在终端运行 `python3 -m http.server 8000`，然后访问 <http://localhost:8000>。

## 怎么补充内容

所有需要你填写的地方，都在 `index.html` 里用 `【改】` 注释标出来了。
用编辑器搜索 `【改】`，逐个替换即可。

常见操作：

| 想做什么 | 怎么做 |
| --- | --- |
| 改名字、标语、自我介绍 | 搜索 `【改】`，逐项替换 |
| 加一个新工具 | 复制一整个 `<article class="work">…</article>` 区块，改序号、名称、描述和链接 |
| 加一段工作经历 | 复制一个 `<div class="exp-item">…</div>` 区块 |
| 把演示窗口换成产品截图 | 删掉 `.window` 里的示意内容，放一张 `<img src="assets/xxx.png">` |
| 启用「文章」区块 | `index.html` 末尾有一段注释掉的模板，去掉注释即可 |
| 作品 / 关于我切换 | Hero 正下方的分段按钮，逻辑在 `js/main.js` 的 `activateTab`，不用改 |
| 首页人物 | `assets/hero-centered-source.png`：已确认的捧球人物，由 CSS 取景；居中紧凑排版在 `.hero-grid` / `.hero-visual`，设计说明见 `DESIGN.md` |
| 换主色 | 改 `css/style.css` 顶部 `:root` 里的 `--blue`（按钮、链接） |
| 换四色点缀 | 改 `:root` 里的 `--dot-1` ~ `--dot-4`（工具序号、地图图钉；与头像设计稿一致） |

## 经历项目介绍页

- `projects/vivo.html`：语音转文字、环境音识别、手语翻译三个 Tab；每个面板有独立标题与正文区域。
- `projects/ninebot.html`：城市通勤 eBike 项目页。
- 补充介绍时，替换对应页面的 `.case-empty` 占位区域即可；内容与图片均可直接写入该面板。现阶段只标注待补充，不包含虚构介绍。
- vivo 支持直达产品：`#speech-to-text`、`#sound-recognition`、`#sign-language`。Tab 交互在 `js/project-tabs.js`，页面样式在 `css/projects.css`。
- 入口位于首页“关于我”的两段经历下方；所有站内链接均为相对路径，可用于本地文件或 GitHub Pages。

## 目录结构

```
├── index.html          # 页面内容都在这里（重点改这个文件）
├── css/style.css       # 样式（主题色在文件顶部 :root 里）
├── js/main.js          # 首页交互
├── js/project-tabs.js  # 产品介绍页 Tab 切换
├── projects/           # 工作经历项目介绍页
├── assets/             # 图片素材（favicon、og 分享图、人物底图）
├── work/               # 设计过程资产与预览页，不上线
├── output/             # 动图等独立交付物，不上线
└── task-archive/       # 「任务档案」子项目，独立部署在 AllTaskforAI 仓库
```

## 已上线

网站部署在 GitHub Pages：<https://zhaoqingxia06.github.io/>（仓库 `zhaoqingxia06/zhaoqingxia06.github.io`）。
改完文件后：`git add -A && git commit -m "说明" && git push`，一到两分钟后线上生效。
