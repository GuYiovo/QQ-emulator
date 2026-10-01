// template.js
// 专门存放 HTML 模板结构与渲染到页面的初始方法

const HTML_TEMPLATE = `
    <div class="box1">
        <div class="box1_left"><img src="./img/top/18.png" alt="返回"></div>
        <div class="box1_right">
            <div class="box1_right_div"><img src="./img/top/形象.jpg" alt="形象"></div>
            <div class="box1_right_div"><img src="./img/top/二维码.jpg" alt="二维码"></div>
            <div class="box1_right_div"><img src="./img/top/17.2.png" id="img1" alt="闹铃"></div>
            <div class="box1_right_div3"><img src="./img/top/17.png" alt="菜单"></div>
        </div>
    </div>

    <div class="box2">
        <div class="profile-main">
            <div class="avatar-wrapper">
                <img src="http://q.qlogo.cn/headimg_dl?dst_uin=156440000&spec=640&img_type=jpg" id="avatar" class="avatar" alt="头像">
                <img id="avatarFrameOverlay" class="avatar-frame-overlay" alt="头像框" style="display: none;">
            </div>
            <div class="user-info">
                <div class="name-status-row">
                    <h2 id="name"></h2>
                    <button id="statusButton"><img src="./img/top/14.png" alt="状态图标"><p>状态</p></button><img id="memberMedalIcon" src="" alt="会员勋章" style="display: none; height: 1.6rem; margin-left: 0.2rem; vertical-align: middle;">
                </div>
                <div class="personal-details">
                    <span id="gender"></span><span id="age"></span><span id="province"></span><span id="city"></span>
                </div>
            </div>
        </div><div class="good"><img src="./img/top/good.png" alt="点赞"><p id="good"></p></div>
    </div>

    <div class="box box3">
        <img src="./img/top/6.png" class="list" alt="QQ图标">
        <div>
            <div id="lhWrapperXc" class="lh-wrapper-xc" style="display: none;">
                <div class="item" id="qqNumberItem">
                    <div class="bg-left" id="bgLeft"></div>
                    <div class="bg-middle" id="bgMiddle"></div>
                    <div class="bg-right" id="bgRight"></div>
                    <div class="left-icon" id="leftIcon"></div>
                    <div class="num-text" id="qqNumberText"></div>
                </div>
            </div>

            <section id="normalLhSection">
                <span><img src="./img/lianghao/35.2.png" class="i2" id="img19" alt=""></span>
                <p id="qq_number"></p>
            </section>

            <div class="id-badge">
                <img src="./img/UID/20.1.png" id="idIcon" class="id-icon" alt="ID图标" style="height: 12px; cursor: pointer;">
                <span id="idNumberDisplay" class="id-number"></span>
            </div>
            <input type="file" id="idIconUploadInput" accept="image/*" style="display: none;">
        </div>
    </div>

    <div class="box box4">
        <img src="./img/top/7.png" class="list" alt="公司">
        <div><p id="company"></p></div>
    </div>

    <div class="box box5">
        <img src="./img/top/7.png" style="opacity: 0" class="list" alt="">
        <div><p>详细资料</p></div>
        <img src="./img/top/15.png" class="right" alt="箭头">
    </div>

    <div class="box box6">
        <img src="./img/top/5.png" class="list" alt="编辑图标">
        <div><p>编辑个签，展示我的独特态度</p></div>
        <img src="./img/top/15.png" class="right" alt="箭头">
    </div>

    <div class="box box7">
        <img src="./img/top/4.png" class="list" id="levelHeaderIcon" alt="等级图标">
        <div class="box7_right">
            <img id="energyIcon" src="./img/value/33.png" alt="能量值图标">
            <img id="groupOwnerIcon" src="./img/qumzhu/qunzhu.png" alt="群主图标" style="height: 0.8rem; vertical-align: middle;">
            <img src="./img/vip/886.png" id="dynamicIcon" alt="动态图标">
            <img id="newBadgeIcon" src="" alt="徽章" style="display: none; height: 1rem; margin-left: 0.2rem;">
            <img id="jikaIcon" src="" alt="集卡称号" style="display: none; height: 1rem; margin-left: 0.2rem;">
            <img id="vipBadgeIcon" src="" alt="荣耀称号" style="display: none; height: 1.2rem; margin-left: 0.2rem;">
            <span id="levelIconContainer" class="level-container qq-level-icons"></span>
            <img id="medalIcon" src="./img/xunzhang/IMG_9007.png" alt="勋章" style="display: none; height: 1rem; margin-left: 0.2rem;">
        </div>
        <img src="./img/top/15.png" class="right" alt="箭头">
    </div>

    <div class="box box-rank" style="display: none;">
        <img src="./img/top/4.png" class="list" style="opacity: 0;" alt="占位">
        <div class="box7_right">
            <img src="" alt="等级称号" class="rank-title-img" id="rankTitleImg" style="height: 1.5rem; width: auto; vertical-align: middle;">
        </div>
        <img src="./img/top/15.png" class="right" alt="箭头">
    </div>

    <div class="box box8">
        <img src="./img/top/3.png" class="list" id="vipHeaderIcon" alt="会员图标">
        <div class="box7_right" id="vip-icons-container"></div>
        <img src="./img/top/15.png" class="right" alt="箭头">
    </div>

    <div class="box box9">
        <img src="./img/top/2.png" class="list" alt="空间图标">
        <div><p>我的QQ空间</p></div>
        <img src="./img/top/15.png" class="right" alt="箭头">
    </div>

    <div class="story-container">
        <div class="story-item add-story"><img src="./img/top/story_bg.jpg" alt="发表新鲜事"></div>
        <div class="story-item"><img id="storyImage1" alt="Story Image 1"></div>
        <div class="story-item"><img id="storyImage2" alt="Story Image 2"></div>
        <div class="story-item"><img id="storyImage3" alt="Story Image 3"></div>
        <div class="story-item"><img id="storyImage4" alt="Story Image 4"></div>
    </div>

    <div class="box box10">
        <img src="./img/top/1.png" class="list" alt="资料图标">
        <div><p>完善资料，让好友更了解你</p><p id="p1">去完善</p></div>
        <img src="./img/top/15.png" class="right" alt="箭头">
    </div>

    <div class="last">
        <button><span>个性名片</span></button>
        <button><span>编辑资料</span></button>
        <button id="editButton"><span>发消息</span></button>
    </div>

    <div id="editModal" class="modal" style="display: none;">
        <div class="modal-content">
            <video class="menu-video-bg" autoplay muted loop playsinline>
                <source src="https://videocloud.xn--tlq395o.top/wallpapermodCloud_4.mp4" type="video/mp4">
            </video>
            <div class="modal-header-ios">
                <span class="modal-title-ios">菜单设置</span>
                <span class="close">完成</span>
            </div>
            
            <div class="tab-navigation">
                <button class="tab-button active" data-tab="home">控制中心</button>
                <button class="tab-button" data-tab="basic-info">基本信息</button>
                <button class="tab-button" data-tab="special-id">特色标识</button>
                <button class="tab-button" data-tab="special-icons">特殊图标</button>
                <button class="tab-button" data-tab="vip-privileges">会员特权</button>
                <button class="tab-button" data-tab="extra-content">额外内容</button>
            </div>
            
            <form id="editForm">
                <div class="top-action-btns" style="display: none;">
                    <button type="button" id="minimalistBtn">一键简洁名片</button>
                </div>
                
                <div class="tab-content active" data-tab-content="home">
                    <div class="ios-widget-grid">
                        <div class="ios-widget widget-span-2">
                            <div class="widget-header">
                                <h3>系统公告</h3>
                            </div>
                            <div class="widget-body" id="home-announcement-content">
                                <p style="color: rgba(255,255,255,0.65);">正在同步云端公告...</p>
                            </div>
                        </div>

                        <div class="ios-widget">
                            <div class="widget-header">
                                <h3>关于作者</h3>
                            </div>
                            <div class="widget-body author-card">
                                <img src="http://q.qlogo.cn/headimg_dl?dst_uin=156440000&spec=640&img_type=jpg" alt="Author" class="author-avatar">
                                <div class="author-info">
                                    <h4 class="author-name">GuYi</h4>
                                    <p class="author-desc">开发者</p>
                                </div>
                                <a href="https://可爱.top" target="_blank" class="ios-btn-link">访问官网</a>
                            </div>
                        </div>

                        <div class="ios-widget">
                            <div class="widget-header">
                                <h3>快捷控制</h3>
                            </div>
                            <div class="widget-body controls-card">
                                <button type="button" id="iosMinimalistBtn" class="ios-control-button">
                                    <span class="btn-text">极简模式</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="tab-content" data-tab-content="basic-info">
                    <label for="avatarInput">头像:</label><input type="file" id="avatarInput" accept="image/*">
                    <label>头像框选择:</label>
                    <details class="dynamic-group">
                        <summary>展开头像框列表</summary>
                        <div class="group-content">
                            <div class="avatar-frame-selector" id="avatar-frame-selector"></div>
                        </div>
                    </details>
                    
                    <label for="nameColorSelect">名字颜色选择:</label>
                    <select id="nameColorSelect" name="nameColorSelect"></select>

                    <label for="nameInput">名字:</label><input type="text" id="nameInput">
                    <label for="goodInput">点赞:</label><input type="text" id="goodInput">
                    <label for="qqNumberInput">QQ号:</label><input type="text" id="qqNumberInput">
                    <label for="companyInput">公司:</label><input type="text" id="companyInput">
                    <label for="genderInput">性别:</label><input type="text" id="genderInput">
                    <label for="ageInput">年龄:</label><input type="text" id="ageInput">
                    <label for="provinceInput">省份:</label><input type="text" id="provinceInput">
                    <label for="cityInput">城市:</label><input type="text" id="cityInput">
                    <label for="personalSignInput">个性签名:</label><input type="text" id="personalSignInput">
                </div>

                <div class="tab-content" data-tab-content="special-id">
                    <label for="lhIconSelect">靓号样式选择:</label>
                    <select id="lhIconSelect" name="lhIconSelect"></select>

                    <label>ID图标:</label><div class="id-icon-selector" id="id-icon-selector"></div>
                    <label for="idNumberInput">ID号码:</label><input type="text" id="idNumberInput" placeholder="输入ID号码">
                    <label for="levelInput">QQ等级:</label><input type="number" id="levelInput" min="1" max="256" placeholder="输入等级(1-256)">
                    
                    <label>选择等级图标样式:</label>
                    <details class="dynamic-group">
                        <summary>展开等级图标样式列表</summary>
                        <div class="group-content">
                            <div class="icon-style-selector" id="level-style-selector"></div>
                        </div>
                    </details>
                </div>

                <div class="tab-content" data-tab-content="special-icons">
                    <label>等级称号选择:</label>
                    <div style="background: rgba(255,255,255,0.03); border-radius: 12px; margin-bottom: 10px; border: 1px solid rgba(255,255,255,0.15); padding: 10px;">
                        <label for="rankTitleLevelInput" style="font-weight: bold; font-size: 13px; margin-bottom: 5px; display: block;">设置称号等级 (Max260):</label>
                        <input type="number" id="rankTitleLevelInput" min="1" max="260" value="260" style="width:100%; padding: 8px;">
                    </div>
                    <details class="dynamic-group"><summary>选择等级称号</summary><div class="group-content"><div class="rank-title-selector" id="rank-title-selector"></div></div></details>
                    <label>能量值图标:</label><details class="dynamic-group"><summary>展开选择</summary><div class="group-content"><div class="energy-icon-selector" id="energy-icon-selector"></div></div></details>
                    <label>群主图标:</label><details class="dynamic-group"><summary>展开选择</summary><div class="group-content"><div class="group-owner-selector" id="group-owner-selector"></div></div></details>
                    <label>动态图标(铭牌):</label><details class="dynamic-group"><summary>选择动态图标</summary><div class="group-content"><div class="dynamic-icon-selector" id="dynamic-icon-selector"></div></div></details>
                    <label>徽章图标:</label><details class="dynamic-group"><summary>选择徽章</summary><div class="group-content"><div class="new-badge-selector" id="new-badge-selector"></div></div></details>
                    <label>集卡称号:</label><details class="dynamic-group"><summary>选择集卡称号</summary><div class="group-content"><div class="jika-selector" id="jika-selector"></div></div></details>
                    <label>荣耀称号:</label><details class="dynamic-group"><summary>选择荣耀称号</summary><div class="group-content"><div class="vip-badges-selector" id="vip-badge-selector"></div></div></details>
                    <label>会员勋章 (名字右侧):</label><details class="dynamic-group"><summary>选择会员勋章</summary><div class="group-content"><div class="member-medal-selector" id="member-medal-selector"></div></div></details>
                    <label>勋章图标:</label><details class="dynamic-group"><summary>展开选择</summary><div class="group-content"><div class="medal-icon-selector" id="medal-icon-selector"></div></div></details>
                </div>

                <div class="tab-content" data-tab-content="vip-privileges">
                    <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
                        <label style="margin:0;">图标显示模式:</label>
                        <select id="vipIconDisplayMode" style="width: auto; margin:0; padding: 6px 12px; flex: 1; margin-left: 10px;">
                            <option value="color">仅彩色</option>
                            <option value="gray">仅灰色</option>
                            <option value="mixed">混合模式</option>
                        </select>
                    </div>

                    <div class="vip-selector-list">
                        <div class="vip-selector-item" data-category="big_member">
                            <div class="vsi-left"><span class="vsi-title">大会员图标</span></div>
                            <div class="vsi-right"><div class="vsi-preview" id="preview-big_member"></div><span class="vsi-arrow">〉</span></div>
                        </div>
                        <div class="vip-selector-item" data-category="svip">
                            <div class="vsi-left"><span class="vsi-title">超会图标</span></div>
                            <div class="vsi-right"><div class="vsi-preview" id="preview-svip"></div><span class="vsi-arrow">〉</span></div>
                        </div>
                        <div class="vip-selector-item" data-category="yellow">
                            <div class="vsi-left"><span class="vsi-title">黄钻图标</span></div>
                            <div class="vsi-right"><div class="vsi-preview" id="preview-yellow"></div><span class="vsi-arrow">〉</span></div>
                        </div>
                        <div class="vip-selector-item" data-category="couple">
                            <div class="vsi-left"><span class="vsi-title">情侣图标</span></div>
                            <div class="vsi-right"><div class="vsi-preview" id="preview-couple"></div><span class="vsi-arrow">〉</span></div>
                        </div>
                        <div class="vip-selector-item" data-category="card">
                            <div class="vsi-left"><span class="vsi-title">集卡图标</span></div>
                            <div class="vsi-right"><div class="vsi-preview" id="preview-card"></div><span class="vsi-arrow">〉</span></div>
                        </div>
                        <div class="vip-selector-item" data-category="general">
                            <div class="vsi-left"><span class="vsi-title">综合业务图标</span></div>
                            <div class="vsi-right"><div class="vsi-preview" id="preview-general"></div><span class="vsi-arrow">〉</span></div>
                        </div>
                        <div class="vip-selector-item" data-category="gray">
                            <div class="vsi-left"><span class="vsi-title">灰色图标</span></div>
                            <div class="vsi-right"><div class="vsi-preview" id="preview-gray"></div><span class="vsi-arrow">〉</span></div>
                        </div>
                    </div>

                    <div id="vip-icon-customizer" style="margin-top: 20px; margin-bottom: 10px;">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                            <label style="font-weight: bold; margin: 0;">已选图标展示 (支持拖拽排序):</label>
                            <div style="display: flex; gap: 5px;">
                                <button type="button" id="vipIconDeselectAll" style="padding:4px 8px; font-size:11px;">清空全部</button>
                                <button type="button" id="resetToDefault" style="padding:4px 8px; font-size:11px;">恢复默认</button>
                            </div>
                        </div>
                        <div id="vip-icon-order-list"></div>
                    </div>
                </div>
                
                <div class="tab-content" data-tab-content="extra-content">
                    <label>故事图片:</label>
                    <label for="storyImageInput1" style="font-weight: normal;">图片 1:</label><input type="file" id="storyImageInput1" accept="image/*">
                    <label for="storyImageInput2" style="font-weight: normal;">图片 2:</label><input type="file" id="storyImageInput2" accept="image/*">
                    <label for="storyImageInput3" style="font-weight: normal;">图片 3:</label><input type="file" id="storyImageInput3" accept="image/*">
                    <label for="storyImageInput4" style="font-weight: normal;">图片 4:</label><input type="file" id="storyImageInput4" accept="image/*"><label>区域显示控制:</label>
                    <div style="margin-bottom: 15px;"><label><input type="checkbox" id="showBox7" checked> 显示等级区域</label></div>
                </div>

                <input type="submit" value="保存配置">
                <div class="menu-bottom-info"></div>
            </form>

            <!-- 副页面：VIP图标选择器 -->
            <div id="vipSubPage" class="vip-subpage">
                <div class="vip-subpage-header">
                    <button type="button" class="vip-subpage-back">〈 返回</button>
                    <span class="vip-subpage-title" id="vipSubPageTitle">选择图标</span>
                    <button type="button" class="vip-subpage-clear" id="vipSubPageClear">清除该类</button>
                </div>
                <div class="vip-subpage-content">
                    <div class="vip-icon-grid" id="vip-subpage-grid"></div>
                </div>
            </div>

        </div>
    </div>
`;

function renderStaticStructure() {
    document.body.insertAdjacentHTML('afterbegin', HTML_TEMPLATE);
}
