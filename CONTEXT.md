# CONTEXT — 工作交接

> 本文件记录**当前工作状态、本轮决策、未完成事项、以及下次继续要知道的关键细节**。
> 架构层面的长期决策见 [DECISIONS.md](./DECISIONS.md);本文件偏「现在进行时」。
> 最后更新:2026-06-11

---

## 1. 目前专案状态

**专案:** Sherry's Food Tour 落地页(marketing landing page)
**位置:** `/Volumes/Backup/Projects/Sherry/sherry-foodtour`(⚠️ 外置硬盘)

**技术栈(已确认实际版本):**
| 项目 | 版本 / 说明 |
|---|---|
| Next.js | **16.2.6** App Router(`app/`) |
| React | 19 |
| Tailwind CSS | **v4.3.0**,CSS-first,设计 token 写在 `app/globals.css` 的 `@theme {}` 里 |
| 语言 | 入口文件 `app/layout.js` / `app/page.js` 是 JS;组件用 `.tsx` |
| 包管理 | package.json **没有** `packageManager` 字段;handoff 写 pnpm,但实际有用 `npm run dev` 跑过。**建议统一成一个,别混用** |
| 字体 | Open Sans / Instrument Sans / Work Sans(Google)+ Gveret Levin(本地 ttf),在 `app/layout.js` 接好 |

**当前可运行状态:** dev server 正常,页面能渲染。`app/page.js` 组合多个 section 组件,设计 token 集中在 `app/globals.css`。

**本轮主要在处理的事:** Navbar「Book Now」黄色按钮在用户浏览器里不显示黄色。**已查明根因(见下)。**

---

## 2. 本轮做了哪些决策 / 关键发现

### ✅ 决策:`globals.css` 用 `@theme {}`(不是 `@theme inline {}`)
- 现状:`app/globals.css` 第 3 行是 `@theme {`,六个品牌色 + 字体变量都定义在内。**保留此写法**。
- ⚠️ **重要更正:旧 handoff 把「按钮无黄色」归因于 `@theme inline` 是错的。**
  Tailwind v4 里 `@theme` 和 `@theme inline` **都会**生成 `bg-gold` 这类工具类,差别只是 inline 会把值内联进工具类、不内联则用 `var(--color-gold)` 引用。所以这个改动**无害但并非真正修复**。下次别再往 `@theme` 语法上找原因。

### ✅ 发现:黄色按钮的真正根因 = **用户浏览器缓存 / Service Worker,不是代码**
经过逐层验证,**代码、构建、服务器全部正确**:
- `app/components/Navbar.tsx` 桌面 + 移动 CTA 都用了 `bg-gold`(class 确实在渲染出的 HTML 里)。
- 从 `:3001` **通过 HTTP 抓取实际下发的 CSS**:`:root` 定义了 `--color-gold: gold`(= #FFD700),且 `.bg-gold { background-color: var(--color-gold) }` 存在 —— 与能正常工作的 `.bg-ink` 结构完全一致。
- **决定性证据:用系统 Chrome 无头模式截图 `localhost:3001`,黄色按钮完美渲染。** 截图存于 `/tmp/headless-shot.png`(临时文件,可能已清)。

➡️ **结论:问题 100% 出在用户那个 Chrome 标签页/profile 的状态(Service Worker / 磁盘缓存 / 扩展),与代码无关。** 全量 `rm -rf .next` 重建后用户那边仍无变化,也佐证了这点(因为问题不在构建产物)。

### ✅ 发现:同时跑了多个 dev server(端口混乱源)
排查时一度有两个 `next dev` 并存:`:3000`(`next dev -p 3000`)和 `:3001`(默认端口被占用顺延)。**这是这台机器上「改了没反应」的常见噪音来源。** → 现已清理,只保留 **:3000** 一个。

### ✅ 修复(2026-06-11):Hero 等背景图破图 = Next 图片优化器在外置硬盘上输出损坏
- **症状:** Hero 区只显示灰底 + 左上角破图标,白字几乎看不见。
- **根因:** `<Image>` 走 `/_next/image` 优化端点;优化器在外置硬盘上**间歇写出截断响应**(实测 `hero.png` 的 `w=1920` 稳定返回 `application/octet-stream` 4096B 损坏数据,其他尺寸正常)。与 HMR 不可靠同源,都是 `/Volumes/Backup` 文件系统问题。
- **修复:** [next.config.mjs](./next.config.mjs) 加 `images.unoptimized = process.env.NODE_ENV === "development"`。**dev 绕过优化器直接服务原图**(`src` 变成 `/images/hero.png`,不再有 `/_next/image`);**生产环境(Vercel,文件系统可靠)仍保留完整优化**。
- **已用无头 Chrome 验证**:Hero 夜市照片 + 暗色遮罩 + 黄色按钮全部正常渲染。
- ⚠️ 附带发现:`public/images/` 下 **5 张 `.png` 其实是 JPEG**(`hero/sherry/dadaocheng/ningxia/ximen`),只是扩展名错。浏览器靠内容嗅探能正常显示,暂不影响;但属技术债,见待办。

---

## 3. 未完成的事项 / 待办

- [ ] **用户侧确认黄色按钮 + Hero 图**:代码侧已证明都正常(无头 Chrome 渲染无误)。**现在 dev 在 `:3000`**,用户需在自己浏览器清旧状态后确认:
      - 无痕窗口 `Cmd+Shift+N` 开 `localhost:3000` 验证。
      - 普通窗口 DevTools → Application → **Service Workers → Unregister**、**Storage → Clear site data**。
- [x] ~~清理多余 dev server~~ — 已完成,只保留 `:3000` 一个。
- [x] ~~Hero/背景图破图~~ — 已修复(`images.unoptimized` for dev,见上)。
- [ ] **统一包管理器**:决定用 pnpm 还是 npm,避免 lockfile / 行为不一致。
- [ ] **(技术债)修正图片扩展名**:5 张 `.png` 实为 JPEG,建议改名 `.jpg` 并同步更新引用(`Hero.tsx` / `HotTours.tsx` / `MeetFoodie.tsx` 等),让扩展名与内容、Content-Type 一致。
- [ ] **落地页其余 section**:9 个 section 组件已全部接入 `app/page.js`(Navbar/Hero/WhyUs/HotTours/TheDeets/MeetFoodie/Testimonials/BookingForm/Footer);骨架完整,后续做细节打磨 / 与 Figma 对齐。

---

## 4. 下次继续必须知道的关键细节(踩坑清单)

1. **⚠️ 外置硬盘文件系统不可靠(HMR + 图片优化器都中招)**:项目在 `/Volumes/Backup`。
   - 文件监听 / 热更新经常不生效 → CSS/样式改了没反应,先 `rm -rf .next` 全量重建,别怀疑语法。
   - Next 图片优化器(`/_next/image`)会间歇写出损坏文件 → 已用 `images.unoptimized`(dev)规避,见第 2 节。**以后看到「破图/背景图不显示」,先想到这个,别怀疑 `<Image>` 写法。**
   - next.config 改动**不热更新**,必须重启 dev server 才生效。

2. **⚠️ 「样式没生效」先怀疑缓存,而不是代码**。本轮血泪教训:代码和服务器都对,问题在浏览器 Service Worker / 缓存。**诊断顺序:**
   - ① 无头 Chrome 截图(绕开用户浏览器):
     ```bash
     "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
       --headless --disable-gpu --window-size=1440,300 \
       --screenshot=/tmp/shot.png --virtual-time-budget=4000 \
       "http://localhost:3001/"
     ```
     渲染正确 → 是用户浏览器的问题;渲染也错 → 才是代码/构建问题。
   - ② 直接 `curl` 实际下发的 CSS,grep `.bg-xxx` 规则与 `--color-xxx` 变量是否都在。

3. **同时只跑一个 dev server**。多个 `next dev` 会端口顺延(3000→3001…),很容易「在看 A、改的是 B」。开工前先:
   ```bash
   lsof -nP -iTCP:3000-3003 -sTCP:LISTEN
   ```

4. **Tailwind v4 语法澄清**:`@theme` vs `@theme inline` 都会产出工具类;不要再把颜色问题归到这上面。当前用 `@theme` 是对的默认选择。

5. **VS Code 报 `Unknown at rule @theme` 是假警告**,VS Code 的 CSS linter 不认识 Tailwind v4 语法,忽略即可。

6. **AGENTS.md 提醒**:此 Next.js 版本有 breaking changes,用不熟的 API 前先查 `node_modules/next/dist/docs/`。

---

### 关键文件速查
- `app/globals.css` — 设计 token(`@theme`)、品牌色、字体变量
- `app/components/Navbar.tsx` — 导航 + 黄色「Book Now」CTA(桌面 `lg:flex` / 移动版)
- `app/layout.js` — 字体接入、`<html>`/`<body>` 根结构、metadata
- `app/page.js` — 组合各 section
- `DECISIONS.md` — 架构与长期技术决策的完整记录
