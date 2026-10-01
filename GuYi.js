// GuYi.js
/**
 * GuYi.js
 * 自动注入所有样式表 (菜单UI已完美移植，包含控制中心与滑动修复，升级为网格排版系统)
 */
(function() {
    const cssContent = `
/* ===============================================
   基础样式重置
   =============================================== */
* { padding: 0; margin: 0; box-sizing: border-box; }
body { width: 100%; min-height: 100vh; padding: 1rem; font-family: "微软雅黑", "eras demi itc", sans-serif; }
img { display: block; }
ul, li, ol { list-style: none; }

/* ===============================================
   页面布局和通用组件
   =============================================== */
.box { display: flex; align-items: center; justify-content: space-between; font-size: 0.8rem; margin-bottom: 1rem; }
.box > div { flex: 1; display: flex; align-items: center; justify-content: space-between; }
.id-badge { flex: 0 0 auto !important; justify-content: center !important; }
.list { margin-right: 1rem; width: 1.2rem; height: 1.2rem; }
.box .right { margin-left: 0rem; width: 1.2rem; height: 1.2rem; }

/* ===============================================
   头部导航区域
   =============================================== */
.box1 { display: flex; align-items: center; justify-content: space-between; padding-top: 1rem; }
.box1 .box1_left { background-color: #c9c9c9; border-radius: 50%; display: flex; align-items: center; justify-content: center; }
.box1 .box1_right { display: flex; align-items: center; justify-content: space-between; }
.box1 .box1_right .box1_right_div { background-color: #c9c9c9; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 10px; }
.box1_right_div3 { background-color: #c9c9c9; border-radius: 50%; display: flex; align-items: center; justify-content: center; }
.box1 img { width: 1.8rem; }
#img1 { width: 1.7rem; }

/* ===============================================
   个人信息头部
   =============================================== */
.box2 { display: flex; align-items: center; padding-top: 6rem; padding-left: 0.5rem; padding-bottom: 2rem; position: relative; }
.box2 .avatar { width: 5rem; height: 5rem; border-radius: 50%; margin-right: 1rem; }
.box2 h2 { color: #c98e34; font-weight: 500; font-size: 1rem; margin-right: 0.8rem; transition: color 0.3s ease; }
.box2 button { border: none; display: flex; align-items: center; justify-content: center; border-radius: 1rem; font-size: 0.6rem; padding: 0.2rem; height: 1.2rem; width: 3rem; background-color: #fff; border: 1px solid #e9e8ea; color: #3e4040; }
.box2 button img { width: 0.8rem; height: 0.8rem; margin-right: 0.1rem; margin-top: 0.1rem; }
.box2 .good { position: absolute; background-color: #696669; color: #ffffff; display: flex; align-items: center; right: 1rem; bottom: 2rem; min-width: 3.2rem; border-radius: 1rem; padding: 0.2rem 0.4rem; }
.box2 .good img { width: 1rem; height: 1rem; margin-right: 0.3rem; }
.box2 .good p { font-size: 0.8rem; }
.profile-main { display: flex; align-items: center; }
.user-info { display: flex; flex-direction: column; align-items: flex-start; }
.name-status-row { display: flex; align-items: center; margin-bottom: 0.25rem; flex-wrap: nowrap; width: 100%; margin-left: -5px; }
.name-status-row h2 { margin: 0 !important; line-height: 1.2; white-space: nowrap !important; flex-shrink: 0; margin-right: 2px !important; }
.name-status-row button { margin-left: 12px !important; display: flex; align-items: center; flex-shrink: 0; }
#memberMedalIcon { height: 1.6rem !important; margin-left: 6px !important; margin-right: 0 !important; margin-top: 2px; object-fit: contain; }
.personal-details { display: flex; align-items: center; font-size: 0.7rem; color: #888; }
.personal-details span { padding: 0; margin-right: 0.5rem; }

/* 名字颜色动效 */
.box2 h2.rainbow { background: linear-gradient(90deg, #ff0000, #ff8000, #ffff00, #80ff00, #00ff80, #00ffff, #0080ff, #8000ff, #ff0080, #ff0000); -webkit-background-clip: text; background-clip: text; color: transparent; background-size: 200% 100%; animation: flowingRainbow 3s linear infinite; }
@keyframes flowingRainbow { 0% { background-position: 0% 50%; } 100% { background-position: 200% 50%; } }
.box2 h2.static-rainbow { background: linear-gradient(to right, #DA9DFC, #C86EF9, #FF73B3, #FFA673, #FFE673, #87E8DE, #73C2FF, #4A90E2); -webkit-background-clip: text; background-clip: text; color: transparent; }
.box2 h2.flowing-gold { background: linear-gradient(90deg, #FFD700, #FFA500, #FFD700, #FFA500, #FFD700); background-size: 200% 100%; -webkit-background-clip: text; background-clip: text; color: transparent !important; animation: flowingRainbow 3s linear infinite; }

/* 头像框 */
.avatar-wrapper { position: relative; width: 5rem; height: 5rem; margin-right: 1rem; overflow: visible; }
.box2 .avatar { width: 100%; height: 100%; border-radius: 50%; object-fit: cover; position: relative; z-index: 1; transform: scale(1.04); }
.avatar-frame-overlay { position: absolute; top: -37.5%; left: -37.5%; width: 175%; height: 175%; pointer-events: none; transform-origin: center; z-index: 2; }

/* ===============================================
   QQ号码普通靓号区域
   =============================================== */
.box3 section { position: relative; display: flex; align-items: center; border-radius: 1rem; }
.box3 section .i1 { width: 1rem; height: 1rem; position: absolute; left: -0.3rem; top: -0.3rem; transform: rotate(315deg); }
.box3 span { display: block; color: #c2a77d; font-weight: 600; background-color: #EDC386; height: 15px; font-style: italic; border-bottom-left-radius: 1rem; border-top-left-radius: 1rem; }
.box.box3 > div { display: flex !important; justify-content: flex-start !important; gap: 2px !important; align-items: center; }
.box.box3 .id-badge { margin-left: 0 !important; }
.box3 .i3 { width: auto; height: 13px; margin-left: .3rem; }
.box3 .i2 { margin-top: -3.875px; margin-left: -3px; width: auto; height: 22.5px; }
.box3 p { height: 15px; line-height: 15px; background: linear-gradient(to right, #EDC386, #DAA45F); border: 0; color: #000000; font-weight: 400; padding: 0.01rem 0.3rem 0.3rem 0.1rem; border-top-right-radius: 1rem; border-bottom-right-radius: 1rem; }

/* 炫彩 / 白金 / 新黑金 靓号三段拼接样式 */
.lh-wrapper-xc { height: 23.46px; display: inline-flex; align-items: center; position: relative; flex-shrink: 0; margin-right: 5px; }
.lh-wrapper-xc .item { position: absolute; top: 50%; left: 0; transform: translateY(-50%) scale(0.34); transform-origin: left center; display: flex; height: 69px; align-items: center; width: fit-content; z-index: 2; }
.lh-wrapper-xc .bg-left { width: 110px; height: 69px; flex-shrink: 0; position: relative; }
.lh-wrapper-xc .bg-middle { height: 69px; flex-shrink: 0; }
.lh-wrapper-xc .bg-right { width: 110px; height: 69px; flex-shrink: 0; position: relative; }
.lh-wrapper-xc .left-icon { display: block !important; position: absolute; width: 75px; height: 75px; left: 5px; top: 50%; transform: translateY(-50%); background-size: contain !important; background-position: center !important; background-repeat: no-repeat !important; z-index: 10; }
.lh-wrapper-xc .num-text { position: absolute; left: 94px; top: 47.5%; transform: translateY(-50%); font-size: 40px; color: #FFFFFF; font-weight: normal; font-family: -apple-system, BlinkMacSystemFont, "Helvetica Neue", "PingFang SC", "Hiragino Sans GB", sans-serif !important; white-space: nowrap; z-index: 5; letter-spacing: 0.5px; text-align: center; width: max-content; }
.lh-wrapper-xc .num-text.rainbow { background: linear-gradient(90deg, #A8C8FF, #B874FF, #FF86D1, #FDBCB9, #F7E4BB, #A8C8FF); background-size: 200% 100%; color: transparent !important; -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent !important; animation: rainbowSlow 3s linear infinite; }
@keyframes rainbowSlow { 0% { background-position: 0% 50%; } 100% { background-position: -200% 50%; } }

/* ===============================================
   个性签名和详情区域
   =============================================== */
.box4 { display: flex; align-items: center; }
.box5 { color: #252525; }

/* ===============================================
   会员图标和等级区域
   =============================================== */
.box7_right { display: flex; align-items: center; justify-content: flex-start !important; gap: 0; }
.box7_right img { height: 1rem; margin-right: 0.5rem; vertical-align: middle; }
.box8 .box7_right { gap: 0.25rem; flex-wrap: nowrap !important; overflow-x: hidden; white-space: nowrap; }
.box8 .box7_right img { width: auto !important; height: 2.2rem !important; margin-right: 0.25rem !important; object-fit: contain; flex-shrink: 0 !important; }
.box8 .box7_right img[src*="/box7_right/"] { height: 1.5rem !important; }
.box8 .box7_right img[src*="/new/"] { height: 1.3rem !important; }
.box8 .box7_right img:last-child { height: 1rem !important; }
.box7 .box7_right>*:not(.level-container):not(img) { margin-right: 0.5rem !important; }

.box-rank { display: flex; align-items: center; justify-content: space-between; font-size: 0.8rem; margin-bottom: 8px; margin-top: 0px; }
.box-rank .box7_right { display: flex; align-items: center; justify-content: flex-start !important; gap: 5px; flex: 1; }
.rank-title-img { height: 1.15rem !important; width: auto; object-fit: contain; vertical-align: text-bottom; margin-left: 5px !important; }

#dynamicIcon { margin-right: 3px !important; margin-left: 0 !important; }
#newBadgeIcon { height: 1.1rem !important; width: auto; vertical-align: middle; margin-right: 8px !important; margin-left: 0 !important; }
#jikaIcon { height: 1.3rem !important; width: auto; vertical-align: text-bottom; margin-right: 8px !important; margin-left: 0 !important; }
#vipBadgeIcon { height: 1.2rem !important; width: auto; vertical-align: middle; margin-right: 6px !important; margin-left: 0 !important; }

/* 等级图标容器 */
.qq-level-icons { display: inline-flex !important; align-items: center !important; height: 16px !important; padding: 0 !important; margin: 0 !important; font-size: 0 !important; white-space: nowrap !important; }
.qq-level-icons img { height: 16px !important; width: 16px !important; display: inline-block !important; padding: 0 !important; border: none !important; vertical-align: middle !important; }
.qq-level-icons span { margin-right: 3px !important; display: inline-block !important; font-size: 0 !important; }
.level-container { display: inline-flex; align-items: center; vertical-align: middle; height: 1rem; letter-spacing: -2px; font-size: 0; white-space: nowrap; margin-left: 4px; }
.level-container img { height: 1rem; width: auto; margin: 0; padding: 0; display: inline-block; vertical-align: middle; font-size: 0; line-height: 0; margin-right: -1px; }
.box7_right .level-container { margin-right: 0.2rem !important; }
.box7_right .level-container img { margin-right: 0 !important; }

/* ===============================================
   故事故事容器样式
   =============================================== */
.story-container { display: flex; overflow-x: auto; padding: 0.2rem 0 0.2rem 2.2rem; margin-bottom: 1.5rem; margin-top: -1rem; width: 336.5px; -ms-overflow-style: none; scrollbar-width: none; display: none; }
.story-container.has-stories { display: flex; }
.story-container::-webkit-scrollbar { display: none; }
.story-item { flex: 0 0 auto; width: 4.6rem; height: 4.6rem; margin-right: 0.12rem; border-radius: 0px; overflow: hidden; position: relative; background-color: #f1f1f7; border: 0px solid #ddd; }
.story-item:not(.add-story) { display: none; }
.story-item.has-image { display: block; background-color: transparent; border: none; }
.story-item img { width: 100%; height: 100%; object-fit: cover; }
.add-story { border: none; display: flex; flex-direction: column; justify-content: center; align-items: center; cursor: pointer; background-color: #f2f1f7; }
.add-story-icon { font-size: 3rem; color: #2da6ec; line-height: 1; }
.add-story p { margin-top: 0.5rem; font-size: 0.75rem; color: #1296e5; }
.box10 div p:last-child { color: #252525; }
#p1 { color: #8c8c8c; font-size: 0.8rem; margin-right: 5px; }

/* ===============================================
   底部按钮区域
   =============================================== */
.last { position: fixed; bottom: 20px; left: 0; width: 100%; display: grid; align-items: center; justify-content: space-between; grid-template-columns: repeat(3, 1fr); gap: 2vw; padding: 1rem; z-index: 1000; }
.last button { width: 100%; border: none; border: 1.5px solid #d7d7d7; height: 35%; padding-bottom: 35%; position: relative; border-radius: 13px; background-color: #fff; }
.last span { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); display: flex; align-items: center; justify-content: center; width: 100%; height: 100%; font-weight: 500; color: #000; font-size: 1rem; }
.last button:last-child { background-color: #0099ff; border-color: #0099ff; }
.last button:last-child span { color: #fff !important; }

/* =================================================================
   ID图标与文字胶囊样式
   ================================================================= */
.id-badge { display: inline-flex; align-items: center; vertical-align: middle; gap: 0; margin-left: 0.2rem; white-space: nowrap; position: relative; background-color: transparent; border: none; border-radius: 999px; height: auto; }
.id-badge .id-icon { height: 18px; width: auto; vertical-align: middle; display: block; flex-shrink: 0; margin: 0; border: none; position: relative; z-index: 1; }
.id-number { font-size: 0.65rem; color: #000; background-color: #fff; padding: 0 0.4rem; border-radius: 999px; line-height: 18px; height: 18px; display: inline-flex; align-items: center; position: relative; z-index: 0; }

.id-badge:has(img[src*="20.1.png"]) { background: transparent !important; border: none !important; box-shadow: none !important; padding: 0 !important; height: auto !important; width: fit-content !important; overflow: visible !important; }
.id-badge .id-icon[src*="20.1.png"] { height: 22px !important; width: 22px !important; object-fit: contain; border-radius: 50%; position: relative; z-index: 10; background: transparent !important; margin: 0 !important; }
.id-badge:has(img[src*="20.1.png"]) .id-number { background-color: #381e11 !important; color: #f0c675 !important; font-weight: 500 !important; font-size: 0.6rem !important; height: 16px !important; line-height: 16px !important; border-radius: 20px !important; margin-left: -11px !important; padding-left: 13px !important; padding-right: 8px !important; position: relative; z-index: 1; box-shadow: inset 0 0 0 1px rgba(255, 215, 0, 0.15) !important; }

.id-badge:has(img[src*="UID2.png"]) { background: transparent !important; border: none !important; box-shadow: none !important; padding: 0 !important; height: auto !important; width: fit-content !important; overflow: visible !important; }
.id-badge .id-icon[src*="UID2.png"] { height: 22px !important; width: 22px !important; object-fit: contain; border-radius: 50%; position: relative; z-index: 10; background: transparent !important; margin: 0 !important; }
.id-badge:has(img[src*="UID2.png"]) .id-number { background: linear-gradient(to right, #241d3b, #0f0f13) !important; color: #a88aff !important; font-weight: 500 !important; font-size: 0.6rem !important; height: 16px !important; line-height: 16px !important; border-radius: 20px !important; margin-left: -11px !important; padding-left: 13px !important; padding-right: 8px !important; position: relative; z-index: 1; border: 1px solid transparent !important; background-clip: padding-box, border-box !important; background-origin: padding-box, border-box !important; background-image: linear-gradient(to right, #241d3b, #0f0f13), linear-gradient(90deg, #5e28e6, #ff00ea, #ffd700) !important; box-shadow: 0 0 5px rgba(123, 47, 233, 0.3) !important; }

.id-badge:has(img[src*="UID3.png"]) { background: transparent !important; border: none !important; box-shadow: none !important; padding: 0 !important; height: auto !important; width: fit-content !important; overflow: visible !important; }
.id-badge .id-icon[src*="UID3.png"] { height: 22px !important; width: 22px !important; object-fit: contain; border-radius: 50%; position: relative; z-index: 10; background: transparent !important; margin: 0 !important; }
.id-badge:has(img[src*="UID3.png"]) .id-number { background: #000000 !important; color: #FDD177 !important; font-weight: 500 !important; font-size: 0.6rem !important; height: 16px !important; line-height: 16px !important; border-radius: 20px !important; margin-left: -11px !important; padding-left: 13px !important; padding-right: 8px !important; position: relative; z-index: 1; border: 1.5px solid #FDD177 !important; box-shadow: 0 0 4px rgba(253, 209, 119, 0.3) !important; }

.id-badge:has(img[src*="UID4.png"]) { background: transparent !important; border: none !important; box-shadow: none !important; padding: 0 !important; height: auto !important; width: fit-content !important; overflow: visible !important; }
.id-badge .id-icon[src*="UID4.png"] { height: 22px !important; width: 22px !important; object-fit: contain; border-radius: 50%; position: relative; z-index: 10; background: transparent !important; margin: 0 !important; }
.id-badge:has(img[src*="UID4.png"]) .id-number { background: linear-gradient(180deg, #182848 0%, #000000 100%) !important; color: #fff !important; font-weight: 500 !important; font-size: 0.6rem !important; height: 16px !important; line-height: 16px !important; border-radius: 20px !important; margin-left: -11px !important; padding-left: 13px !important; padding-right: 8px !important; position: relative; z-index: 1; border: 1.5px solid transparent !important; background-clip: padding-box, border-box !important; background-origin: padding-box, border-box !important; background-image: linear-gradient(180deg, #182848, #000000), linear-gradient(to right, #ffd700, #ffa500, #ffd700) !important; box-shadow: 0 0 4px rgba(255, 215, 0, 0.4) !important; }

.id-badge:has(img[src*="UID5.png"]) { background: transparent !important; border: none !important; box-shadow: none !important; padding: 0 !important; height: auto !important; width: fit-content !important; overflow: visible !important; }
.id-badge .id-icon[src*="UID5.png"] { height: 22px !important; width: 22px !important; object-fit: contain; border-radius: 50%; position: relative; z-index: 10; background: transparent !important; margin: 0 !important; }
.id-badge:has(img[src*="UID5.png"]) .id-number { background: linear-gradient(180deg, #661818 0%, #290808 100%) !important; color: #FFD98D !important; font-weight: 500 !important; font-size: 0.6rem !important; height: 16px !important; line-height: 16px !important; border-radius: 20px !important; margin-left: -11px !important; padding-left: 13px !important; padding-right: 8px !important; position: relative; z-index: 1; border: 1px solid #FFC868 !important; box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.5), 0 0 4px rgba(200, 50, 50, 0.3) !important; }

.id-badge:has(img[src*="20.png"]) .id-number { display: none !important; }

.id-badge .id-icon[src*="20.png"] { height: 14px !important; width: auto !important; object-fit: contain !important; display: block !important; margin-left: 2px !important; }
@media screen and (max-width: 768px) { .id-badge .id-icon[src*="20.1.png"] { height: 20px !important; width: 20px !important; } .id-badge:has(img[src*="20.1.png"]) .id-number { height: 15px !important; line-height: 15px !important; font-size: 0.55rem !important; margin-left: -10px !important; padding-left: 12px !important; padding-right: 7px !important; } }

/* ========================================================
   [核心优化区] 菜单 UI 核心组件与防错排版
   ======================================================== */
.modal { display: none; position: fixed; z-index: 10001; left: 0; top: 0; width: 100%; height: 100%; overflow: hidden !important; background-color: rgba(0, 0, 0, 0.45); backdrop-filter: blur(8px); }

#editModal .modal-content { position: absolute !important; top: 50% !important; left: 50% !important; transform: translate(-50%, -50%) !important; margin: 0 !important; background: rgba(10, 10, 15, 0.15) !important; backdrop-filter: blur(28px) saturate(130%) !important; -webkit-backdrop-filter: blur(28px) saturate(130%) !important; border: 1px solid rgba(255, 255, 255, 0.15) !important; box-shadow: 0 24px 60px rgba(0, 0, 0, 0.35) !important; border-radius: 28px !important; color: #fff !important; text-shadow: 0 1px 3px rgba(0,0,0,0.5) !important; z-index: 1; padding: 16px; width: 92vw !important; max-width: 480px !important; height: 82vh !important; max-height: 800px !important; display: flex !important; flex-direction: column !important; transition: all 0.25s ease-in-out !important; overflow-y: hidden !important; }
.menu-video-bg { position: fixed !important; top: 0 !important; left: 0 !important; width: 100vw !important; height: 100vh !important; object-fit: cover !important; opacity: 0.85; z-index: -2 !important; pointer-events: none !important; }

.modal-header-ios { display: flex; align-items: center; justify-content: space-between; padding: 10px 4px 15px 4px; border-bottom: 1px solid rgba(255, 255, 255, 0.05); margin-bottom: 10px; }
.modal-title-ios { font-size: 1.15rem; font-weight: 700; color: #ffffff; letter-spacing: -0.3px; text-shadow: 0 2px 4px rgba(0,0,0,0.4) !important; }
.modal-header-ios .close { position: static !important; font-size: 0.9rem !important; font-weight: 600 !important; cursor: pointer; transition: all 0.2s ease; z-index: 10010; text-shadow: none !important; display: flex; align-items: center; justify-content: center; color: #007AFF !important; background: rgba(255, 255, 255, 0.05) !important; border: 1px solid rgba(255, 255, 255, 0.08) !important; padding: 6px 16px !important; border-radius: 14px !important; }
.close:hover { background: rgba(255, 255, 255, 0.25) !important; color: #ffffff !important; }

#editForm { flex-grow: 1; overflow-y: auto; padding-right: 4px; scrollbar-width: thin; -webkit-overflow-scrolling: touch; }
#editForm::-webkit-scrollbar { display: block; width: 4px; }
#editForm::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.2); border-radius: 4px; }

#editForm label { display: block; margin-bottom: 8px; font-weight: 500; color: #fff !important; font-size: 0.9rem; text-shadow: 0 1px 3px rgba(0,0,0,0.6) !important; }
#editForm input[type="text"], #editForm input[type="file"], #editForm input[type="number"], #editForm select, #vipIconDisplayMode { width: 100%; padding: 10px; margin-bottom: 15px; box-sizing: border-box; background: rgba(255, 255, 255, 0.05) !important; border: 1px solid rgba(255, 255, 255, 0.08) !important; color: #fff !important; border-radius: 12px !important; backdrop-filter: none !important; -webkit-backdrop-filter: none !important; text-shadow: 0 1px 2px rgba(0,0,0,0.6) !important; transition: all 0.3s ease !important; font-size: 0.9rem; }
#editForm input:focus, #editForm select:focus { background: rgba(255, 255, 255, 0.1) !important; outline: none !important; border-color: rgba(255, 255, 255, 0.25) !important; }
#editForm select option { background: rgba(20, 20, 25, 0.95) !important; color: #fff !important; text-shadow: none !important; }

.tab-navigation { display: flex; justify-content: flex-start; gap: 12px; margin-bottom: 15px; padding-bottom: 5px; border-bottom: 1px solid rgba(255,255,255,0.08) !important; overflow-x: auto; -webkit-overflow-scrolling: touch; white-space: nowrap; flex-shrink: 0; }
.tab-navigation::-webkit-scrollbar { display: block; height: 3px; }
.tab-navigation::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.15); border-radius: 3px; }
.tab-navigation button { flex-shrink: 0; background-color: transparent; border: none; padding: 8px 12px; font-size: 0.85rem; cursor: pointer; color: rgba(255,255,255,0.4) !important; border-bottom: 2px solid transparent; transition: all 0.3s ease; white-space: nowrap; text-shadow: 0 1px 2px rgba(0,0,0,0.6); }
.tab-navigation button.active { color: #fff !important; border-bottom-color: #fff !important; font-weight: bold; text-shadow: 0 0 5px rgba(255,255,255,0.6); }
.tab-content { display: none; }
.tab-content.active { display: block; }

/* ========================================================
   [排版核心] 全局高级网格布局系统
   ======================================================== */
.avatar-frame-selector, .dynamic-icon-selector, .new-badge-selector, .jika-selector, .medal-icon-selector, .energy-icon-selector, .icon-style-selector, .group-owner-selector, .member-medal-selector, .vip-badges-selector, .rank-title-selector { display: grid !important; grid-template-columns: repeat(3, 1fr) !important; gap: 8px !important; width: 100% !important; margin-bottom: 15px !important; }
.id-icon-selector, .lh-icon-selector { display: flex !important; flex-wrap: wrap !important; gap: 8px !important; margin-bottom: 15px !important; }

.icon-option { width: 100% !important; margin: 0 !important; display: flex; flex-direction: column; background: rgba(255, 255, 255, 0.02) !important; border: 1px solid rgba(255, 255, 255, 0.06) !important; border-radius: 12px !important; color: #fff !important; text-shadow: 0 1px 2px rgba(0,0,0,0.6) !important; cursor: pointer; transition: all 0.2s; box-sizing: border-box; }
.icon-option label { width: 100% !important; height: 100% !important; min-height: 50px; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 8px; cursor: pointer; }
.icon-option:has(input:checked) { background: rgba(255, 255, 255, 0.1) !important; border-color: rgba(255, 255, 255, 0.18) !important; box-shadow: 0 0 12px rgba(255, 255, 255, 0.05) !important; }

.lh-icon-selector .lh-icon-option label, .id-icon-label { background: rgba(255, 255, 255, 0.02) !important; border: 1px solid rgba(255, 255, 255, 0.06) !important; border-radius: 12px !important; color: #fff !important; cursor: pointer; transition: all 0.2s; padding: 5px 10px; }
input[type="radio"]:checked + .id-icon-label, .lh-icon-selector .lh-icon-option input:checked + label { background: rgba(255, 255, 255, 0.1) !important; border-color: rgba(255, 255, 255, 0.18) !important; }
.modal-content input[type="radio"] { display: none !important; }

.icon-option img { max-width: 100% !important; height: auto !important; max-height: 40px !important; object-fit: contain; }
.icon-option span { color: #fff !important; text-shadow: 0 1px 2px rgba(0,0,0,0.5); font-size: 11px !important; margin-top: 4px; text-align: center; }
.id-icon-label img { width: 32px !important; height: 32px !important; object-fit: contain; }
.lh-icon-selector .lh-icon-option img { height: 18px !important; width: auto !important; object-fit: contain; vertical-align: middle; margin-right: 5px; }

details.dynamic-group { width: 100%; margin-bottom: 12px; border-radius: 16px; overflow: hidden; position: relative; background: rgba(255, 255, 255, 0.02) !important; border: 1px solid rgba(255, 255, 255, 0.06) !important; box-shadow: 0 8px 24px rgba(0, 0, 0, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.05); }
details.dynamic-group summary { position: relative; z-index: 1; padding: 14px 16px !important; cursor: pointer; font-size: 0.92rem; font-weight: 700; display: flex; justify-content: space-between; align-items: center; list-style: none; background: transparent !important; transition: all 0.25s ease; color: #fff !important; text-shadow: 0 1px 2px rgba(0,0,0,0.5); outline: none !important; }
details.dynamic-group summary::-webkit-details-marker { display: none; }
details.dynamic-group summary::after { content: ''; width: 10px; height: 10px; border-right: 2px solid rgba(255,255,255,0.9); border-bottom: 2px solid rgba(255,255,255,0.9); transform: rotate(45deg); transition: transform 0.28s ease; margin-top: -4px; margin-right: 2px; }
details.dynamic-group[open] summary::after { transform: rotate(225deg); margin-top: 4px; }
details.dynamic-group[open] summary { border-bottom: 1px solid rgba(255, 255, 255, 0.1) !important; border-bottom-left-radius: 0 !important; border-bottom-right-radius: 0 !important; }
details.dynamic-group .group-content { padding: 12px; background: rgba(255, 255, 255, 0.01) !important; animation: liquidFadeIn 0.2s linear; }
@keyframes liquidFadeIn { from { opacity: 0; } to { opacity: 1; } }

/* ========================================================
   VIP 新版图标选择器与副页面样式
   ======================================================== */
.vip-selector-list { display: flex; flex-direction: column; gap: 8px; }
.vip-selector-item { display: flex; align-items: center; justify-content: space-between; background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 16px; padding: 12px 14px; cursor: pointer; transition: all 0.2s; }
.vip-selector-item:active { transform: scale(0.98); background: rgba(255, 255, 255, 0.08); }
.vsi-title { font-size: 0.95rem; color: #fff; font-weight: bold; text-shadow: 0 1px 2px rgba(0,0,0,0.5); }
.vsi-right { display: flex; align-items: center; gap: 6px; }
.vsi-preview { display: flex; align-items: center; gap: 4px; overflow: hidden; max-width: 140px; justify-content: flex-end; }
.vsi-preview img { height: 22px; width: auto; object-fit: contain; }
.vsi-preview .no-icon { font-size: 12px; color: rgba(255,255,255,0.4); font-weight: 500; }
.vsi-arrow { color: rgba(255, 255, 255, 0.4); font-size: 1rem; font-weight: bold; margin-left: 4px; }

/* -- ↓ 修改此处的 z-index 使得子面板层级能够盖住完成按钮 -- */
.vip-subpage { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: rgba(20, 20, 25, 0.95); backdrop-filter: blur(25px); -webkit-backdrop-filter: blur(25px); z-index: 10020; display: flex; flex-direction: column; border-radius: 28px; transform: translateX(100%); transition: transform 0.35s cubic-bezier(0.25, 0.8, 0.25, 1); pointer-events: none; }
.vip-subpage.show { transform: translateX(0); pointer-events: auto; }
.vip-subpage-header { display: flex; align-items: center; justify-content: space-between; padding: 16px; border-bottom: 1px solid rgba(255,255,255,0.08); }
.vip-subpage-back { background: transparent; border: none; color: #007AFF; font-size: 1.05rem; font-weight: 600; cursor: pointer; }
.vip-subpage-title { color: #fff; font-weight: bold; font-size: 1.15rem; }
.vip-subpage-clear { background: rgba(255,255,255,0.1); border: none; color: #fff; padding: 6px 12px; border-radius: 14px; font-size: 0.85rem; cursor: pointer; }
.vip-subpage-content { flex: 1; overflow-y: auto; padding: 15px; -webkit-overflow-scrolling: touch; }
.vip-subpage-content::-webkit-scrollbar { display: block; width: 4px; }
.vip-subpage-content::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.2); border-radius: 4px; }

.vip-icon-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; padding-bottom: 20px; }
.vip-icon-grid-item { background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.06); border-radius: 12px; padding: 10px 5px; display: flex; flex-direction: column; align-items: center; cursor: pointer; position: relative; transition: all 0.2s; }
.vip-icon-grid-item.selected { background: rgba(255,255,255,0.1); border-color: rgba(255,255,255,0.25); box-shadow: 0 0 12px rgba(255,255,255,0.05); }
.vip-icon-grid-item img { height: 32px; width: auto; max-width: 100%; object-fit: contain; margin-bottom: 6px; }
.vip-icon-grid-item span { font-size: 11px; color: #fff; text-align: center; word-break: break-all; text-shadow: 0 1px 2px rgba(0,0,0,0.5); line-height: 1.2; }
.vip-icon-grid-item .ver-badge { position: absolute; top: 4px; right: 4px; background: #007AFF; color: #fff; border-radius: 8px; padding: 2px 6px; font-size: 9px; font-weight: bold; }

#vip-icon-order-list { display: flex; flex-wrap: wrap; gap: 5px; padding: 8px !important; min-height: 80px !important; max-height: 300px !important; overflow-y: auto; scrollbar-width: thin; -webkit-overflow-scrolling: touch; background: rgba(255, 255, 255, 0.02) !important; border: 1px solid rgba(255, 255, 255, 0.06) !important; border-radius: 12px !important; }
#vip-icon-order-list::-webkit-scrollbar { width: 4px; display: block; }
#vip-icon-order-list::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.15); border-radius: 4px; }
.draggable-icon { width: calc(33.333% - 4px); padding: 6px; margin-bottom: 5px !important; justify-content: center; user-select: none; display: flex; flex-direction: column; align-items: center; background: rgba(255, 255, 255, 0.02) !important; border: 1px solid rgba(255, 255, 255, 0.06) !important; border-radius: 12px !important; cursor: pointer; transition: all 0.2s; }
.draggable-icon.selected { background: rgba(255, 255, 255, 0.1) !important; border-color: rgba(255, 255, 255, 0.18) !important; }
.draggable-icon img { width: 24px; height: 24px; object-fit: contain; pointer-events: none; }
.draggable-icon span { font-size: 11px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; text-align: center; color: #fff !important; margin-top: 4px; }

.modal-submit-sticky, #editForm > input[type="submit"] { position: sticky !important; bottom: 0 !important; background: transparent !important; backdrop-filter: none !important; -webkit-backdrop-filter: none !important; padding: 10px 0 5px 0 !important; z-index: 10 !important; margin-top: auto !important; }
.modal-submit-sticky input[type="submit"], #editForm > input[type="submit"] { width: 100% !important; margin: 0 !important; font-size: 1.05rem !important; padding: 12px !important; background: rgba(0, 122, 255, 0.35) !important; border: 1px solid rgba(255, 255, 255, 0.2) !important; backdrop-filter: blur(12px) !important; -webkit-backdrop-filter: blur(12px) !important; box-shadow: 0 8px 32px rgba(0, 122, 255, 0.15) !important; color: #fff !important; border-radius: 16px !important; font-weight: bold !important; cursor: pointer !important; transition: all 0.25s ease !important; }
.modal-submit-sticky input[type="submit"]:active, #editForm > input[type="submit"]:active { transform: scale(0.98) !important; background: rgba(0, 122, 255, 0.5) !important; }

#minimalistBtn { background: linear-gradient(145deg, #6a11cb 0%, #2575fc 100%); color: white; border: none; padding: 12px 25px; border-radius: 12px; cursor: pointer; font-weight: 600; font-size: 0.95rem; width: 100%; margin-bottom: 15px; box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15), inset 0 0 0 1px rgba(255, 255, 255, 0.1); text-transform: uppercase; transition: all 0.3s ease-in-out; }
#minimalistBtn:hover { transform: translateY(-2px); box-shadow: 0 8px 20px rgba(0,0,0,0.25); }

.no-icon-placeholder { width: 28px; height: 28px; border: 1px dashed rgba(255, 255, 255, 0.4) !important; display: flex; align-items: center; justify-content: center; font-size: 11px; color: rgba(255,255,255,0.7) !important; background: transparent !important; border-radius: 4px; }
.icon-option:has(input:checked) .no-icon-placeholder { border-color: #fff !important; color: #fff !important; background: rgba(255, 255, 255, 0.2) !important; font-weight: bold; }

/* ========================================================
   iOS 17 控制中心 Dashboard 样式
   ======================================================== */
.ios-widget-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; width: 100%; margin-top: 10px; margin-bottom: 15px; }
.widget-span-2 { grid-column: span 2; }
.ios-widget { background: rgba(255, 255, 255, 0.04) !important; border: 1px solid rgba(255, 255, 255, 0.08) !important; border-radius: 20px !important; padding: 14px; box-shadow: 0 8px 32px rgba(0, 0, 0, 0.05) !important; display: flex; flex-direction: column; position: relative; overflow: hidden; transition: transform 0.2s; backdrop-filter: none !important; -webkit-backdrop-filter: none !important; }
.ios-widget:active { transform: scale(0.97); }
.widget-header { display: flex; align-items: center; gap: 8px; margin-bottom: 10px; }
.widget-header h3 { font-size: 0.9rem; font-weight: 700; color: #ffffff !important; margin: 0; text-shadow: 0 1px 3px rgba(0,0,0,0.5) !important; }
.widget-body { flex-grow: 1; font-size: 0.8rem; line-height: 1.5; color: rgba(255, 255, 255, 0.85); text-align: left; }
#home-announcement-content { min-height: 140px; max-height: 220px; overflow-y: auto; padding-right: 6px; scrollbar-width: thin; scrollbar-color: rgba(255, 255, 255, 0.1) transparent; font-size: 0.85rem; line-height: 1.6; -webkit-overflow-scrolling: touch; }
#home-announcement-content::-webkit-scrollbar { width: 4px; display: block; }
#home-announcement-content::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.15); border-radius: 99px; }
#home-announcement-content::-webkit-scrollbar-track { background: transparent; }
.author-card { display: flex; flex-direction: column; align-items: center; text-align: center; padding-top: 5px; }
.author-avatar { width: 50px; height: 50px; border-radius: 50%; border: 2px solid rgba(255,255,255,0.2); box-shadow: 0 4px 10px rgba(0,0,0,0.25); margin-bottom: 8px; }
.author-info h4 { font-size: 0.85rem; font-weight: 700; color: #ffffff; }
.author-desc { font-size: 0.65rem; color: rgba(255,255,255,0.4); margin-bottom: 12px; }
.ios-btn-link { display: block; width: 100%; background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.06); color: #fff !important; text-decoration: none; font-size: 0.75rem; font-weight: 600; padding: 6px 0; border-radius: 10px; transition: background 0.2s; text-align: center; }
.ios-btn-link:hover { background: rgba(255, 255, 255, 0.1); }
.controls-card { display: flex; flex-direction: column; gap: 8px; justify-content: center; height: 100%; }
.ios-control-button { display: flex; align-items: center; justify-content: center; width: 100%; background: rgba(255, 255, 255, 0.02) !important; border: 1px solid rgba(255, 255, 255, 0.05) !important; padding: 8px 12px !important; border-radius: 12px !important; color: #fff !important; cursor: pointer; transition: all 0.2s ease; }
.ios-control-button:hover { background: rgba(255, 255, 255, 0.08) !important; border-color: rgba(255,255,255,0.15) !important; }
.ios-control-button .btn-text { font-size: 0.75rem; font-weight: 600; text-shadow: none !important; }
    `;

    const style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = cssContent;
    document.head.appendChild(style);
})();
