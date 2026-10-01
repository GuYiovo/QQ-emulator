// render.js
// 存放所有 UI 控件生成、视图刷新、DOM 节点更新等表现层逻辑

function createRadioOption(name, value, imgSrc, labelText, isNone, wrapClass) {
    const fragment = document.createDocumentFragment();
    const safeValue = String(value ?? "");
    const id = `${name}_${safeValue.replace(/\W/g, "")}`;

    const input = document.createElement("input");
    Object.assign(input, {
        type: "radio",
        id,
        name,
        value: safeValue
    });

    const labelEl = document.createElement("label");
    labelEl.htmlFor = id;

    if (name === "lhIconSelect") {
        labelEl.style.cssText = "display:flex;cursor:pointer;";
    }

    if (name === "idIconSelect") {
        labelEl.className = "id-icon-label";
    }

    if (isNone) {
        labelEl.innerHTML = `
            <div class="no-icon-placeholder">${labelText || "无"}</div>
        `;
    } else if (name === "levelIconStyle") {
        const previewContainer = document.createElement("div");
        previewContainer.style.cssText = `
            display:flex;
            justify-content:center;
            align-items:center;
            gap:4px;
            margin-bottom:4px;
        `;

        ["crown", "sun", "moon", "star"].forEach(type => {
            const img = document.createElement("img");
            img.src = `https://tianquan.gtimg.cn/qqVipLevel/item/${safeValue}/${type}.png`;
            img.style.cssText = `
                width:18px;
                height:18px;
                object-fit:contain;
                display:block;
            `;
            previewContainer.appendChild(img);
        });

        labelEl.appendChild(previewContainer);

        if (labelText) {
            const span = document.createElement("span");
            span.style.fontSize = "12px";
            span.style.color = "#fff";
            span.textContent = labelText;
            labelEl.appendChild(span);
        }
    } else if (imgSrc) {
        const img = document.createElement("img");
        img.src = imgSrc;
        img.loading = "lazy";

        if (name === "lhIconSelect") {
            img.style.cssText = `
                height:20px;
                width:auto;
                vertical-align:middle;
            `;

            labelEl.appendChild(img);

            if (labelText) {
                const span = document.createElement("span");
                span.style.fontSize = "12px";
                span.textContent = labelText;
                labelEl.appendChild(span);
            }
        } else {
            labelEl.appendChild(img);

            if (name === "rankTitleSelect" && labelText) {
                labelEl.style.flexDirection = "column";
                labelEl.style.gap = "2px";

                const span = document.createElement("span");
                span.style.fontSize = "12px";
                span.style.marginTop = "2px";
                span.textContent = labelText;
                labelEl.appendChild(span);
            }
        }
    }

    if (wrapClass) {
        const wrapper = document.createElement("div");
        wrapper.className = wrapClass;
        wrapper.append(input, labelEl);
        fragment.appendChild(wrapper);
    } else {
        fragment.append(input, labelEl);
    }

    return fragment;
}

function renderOptions(containerId, data, name, wrapClass) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = "";

    data.forEach(item => {
        const finalWrapClass = name === "lhIconSelect"
            ? "lh-icon-option"
            : wrapClass;

        container.appendChild(
            createRadioOption(
                name,
                item.value,
                item.img,
                item.label,
                item.isNone,
                finalWrapClass
            )
        );
    });
}

function renderOptionsIntoElement(element, data, name) {
    if (!element) return;

    element.innerHTML = "";

    data.forEach(item => {
        element.appendChild(
            createRadioOption(
                name,
                item.value,
                item.img,
                item.label,
                item.isNone,
                "icon-option"
            )
        );
    });
}

// ========================================================
// 通用图标选择器配置
// ========================================================

let currentSpecialIconSelector = null;

const SPECIAL_ICON_SELECTOR_CONFIG = {
    avatarFrame: {
        section: "special-id",
        title: "头像框选择",
        mainTitle: "头像框",
        description: "选择显示在头像外侧的装饰头像框",
        stateKey: "avatarFrame",
        radioName: "avatarFrameSelect",
        oldContainerId: "avatar-frame-selector",
        data: () => CONFIG.avatarFrames,
        previewType: "avatarFrame"
    },

    levelStyle: {
        section: "special-id",
        title: "等级图标样式选择",
        mainTitle: "等级图标样式",
        description: "选择QQ等级皇冠、太阳、月亮和星星样式",
        stateKey: "levelStyle",
        radioName: "levelIconStyle",
        oldContainerId: "level-style-selector",
        data: () => CONFIG.levelStyles,
        previewType: "level",
        wide: true
    },

    rankTitle: {
        section: "special-icons",
        title: "等级称号图标选择",
        mainTitle: "等级称号图标",
        description: "选择大会员等级称号",
        stateKey: "rankTitle",
        radioName: "rankTitleSelect",
        oldContainerId: "rank-title-selector",
        data: () => CONFIG.rankTitles,
        wide: true
    },

    energyIcon: {
        section: "special-icons",
        title: "能量值图标选择",
        mainTitle: "能量值图标",
        description: "选择资料卡能量值图标",
        stateKey: "energyIcon",
        radioName: "energyIconSelect",
        oldContainerId: "energy-icon-selector",
        data: () => CONFIG.energyIcons
    },

    groupOwnerIcon: {
        section: "special-icons",
        title: "群主图标选择",
        mainTitle: "群主图标",
        description: "选择群主身份图标",
        stateKey: "groupOwnerIcon",
        radioName: "groupOwnerSelect",
        oldContainerId: "group-owner-selector",
        data: () => CONFIG.groupOwnerIcons
    },

    dynamicIcon: {
        section: "special-icons",
        title: "动态图标（铭牌）选择",
        mainTitle: "动态图标（铭牌）",
        description: "选择昵称铭牌图标",
        stateKey: "dynamicIcon",
        radioName: "dynamicIconSelect",
        oldContainerId: "dynamic-icon-selector",
        data: () => CONFIG.dynamicIcons,
        wide: true
    },

    newBadge: {
        section: "special-icons",
        title: "徽章图标选择",
        mainTitle: "徽章图标",
        description: "选择资料卡徽章",
        stateKey: "newBadge",
        radioName: "newBadgeSelect",
        oldContainerId: "new-badge-selector",
        data: () => CONFIG.newBadges
    },

    jikaIcon: {
        section: "special-icons",
        title: "集卡称号选择",
        mainTitle: "集卡称号",
        description: "选择集卡活动称号",
        stateKey: "jikaIcon",
        radioName: "jikaSelect",
        oldContainerId: "jika-selector",
        data: () => CONFIG.jikaIcons,
        wide: true
    },

    vipBadge: {
        section: "special-icons",
        title: "荣耀称号选择",
        mainTitle: "荣耀称号",
        description: "选择荣耀或会员称号",
        stateKey: "vipBadge",
        radioName: "vipBadges",
        oldContainerId: "vip-badge-selector",
        data: () => CONFIG.vipBadges,
        wide: true
    },

    memberMedal: {
        section: "special-icons",
        title: "会员勋章选择",
        mainTitle: "会员勋章",
        description: "显示在名字右侧",
        stateKey: "memberMedal",
        radioName: "memberMedalSelect",
        oldContainerId: "member-medal-selector",
        data: () => CONFIG.memberMedals,
        wide: true
    },

    medalIcon: {
        section: "special-icons",
        title: "勋章图标选择",
        mainTitle: "勋章图标",
        description: "选择等级区域勋章",
        stateKey: "medalIcon",
        radioName: "medalIconSelect",
        oldContainerId: "medal-icon-selector",
        data: () => CONFIG.medalIcons
    }
};

function isSpecialNoneValue(value) {
    return value === undefined ||
        value === null ||
        value === "" ||
        value === "none";
}

function getSpecialCurrentValue(type) {
    const config = SPECIAL_ICON_SELECTOR_CONFIG[type];
    if (!config) return "none";

    const value = appState[config.stateKey];
    return value === undefined || value === null ? "none" : value;
}

function normalizeRankTitleSource(src) {
    return String(src || "").replace(/\/\d+\.png(?:\?.*)?$/, "/");
}

function isSpecialValueSelected(type, value) {
    const currentValue = getSpecialCurrentValue(type);

    if (
        isSpecialNoneValue(value) &&
        isSpecialNoneValue(currentValue)
    ) {
        return true;
    }

    if (String(value) === String(currentValue)) {
        return true;
    }

    if (
        type === "rankTitle" &&
        !isSpecialNoneValue(value) &&
        !isSpecialNoneValue(currentValue)
    ) {
        return normalizeRankTitleSource(value) ===
            normalizeRankTitleSource(currentValue);
    }

    return false;
}

function findSpecialLegacyRadio(type, value) {
    const config = SPECIAL_ICON_SELECTOR_CONFIG[type];
    if (!config) return null;

    return Array.from(
        document.querySelectorAll(`input[name="${config.radioName}"]`)
    ).find(radio => {
        if (
            isSpecialNoneValue(value) &&
            isSpecialNoneValue(radio.value)
        ) {
            return true;
        }

        if (type === "rankTitle") {
            return normalizeRankTitleSource(radio.value) ===
                normalizeRankTitleSource(value);
        }

        return radio.value === String(value ?? "");
    }) || null;
}

function applySpecialIconValue(type, item) {
    const config = SPECIAL_ICON_SELECTOR_CONFIG[type];
    if (!config || !item) return;

    const value = item.value ?? "none";
    const legacyRadio = findSpecialLegacyRadio(type, value);

    if (legacyRadio) {
        legacyRadio.checked = true;
        legacyRadio.dispatchEvent(
            new Event("change", {
                bubbles: true
            })
        );
    } else {
        const handlers = {
            avatarFrame: () => {
                updateAvatarFrame(
                    isSpecialNoneValue(value) ? "" : value
                );
            },

            levelStyle: () => {
                const levelInput = document.getElementById("levelInput");
                const level = Math.max(
                    1,
                    Math.min(
                        256,
                        parseInt(levelInput?.value) || 1
                    )
                );

                updateLevelIcons(level, value);
            },

            rankTitle: () => {
                const levelInput = document.getElementById(
                    "rankTitleLevelInput"
                );

                updateRankTitleDisplay(
                    value,
                    parseInt(levelInput?.value) || 260
                );
            },

            energyIcon: () => updateEnergyIconDisplay(value),
            groupOwnerIcon: () => updateGroupOwnerIconDisplay(value),
            dynamicIcon: () => updateDynamicIconDisplay(value),
            newBadge: () => updateNewBadgeDisplay(value),
            jikaIcon: () => updateJikaDisplay(value),
            vipBadge: () => updateVipBadgesDisplay(value),
            memberMedal: () => updateMemberMedalDisplay(value),
            medalIcon: () => updateMedalIconDisplay(value)
        };

        handlers[type]?.();

        if (typeof saveToLocalStorage === "function") {
            saveToLocalStorage();
        }
    }

    renderSpecialIconGrid();
    updateSpecialIconPreviews();
}

function createSpecialSelectorItem(type, config) {
    const item = document.createElement("div");
    item.className = "special-selector-item";
    item.dataset.specialSelector = type;

    const left = document.createElement("div");
    left.className = "ssi-left";

    const title = document.createElement("span");
    title.className = "ssi-title";
    title.textContent = config.mainTitle;

    const description = document.createElement("span");
    description.className = "ssi-desc";
    description.textContent = config.description;

    left.append(title, description);

    const right = document.createElement("div");
    right.className = "ssi-right";

    const preview = document.createElement("div");
    preview.id = `special-preview-${type}`;
    preview.className = `ssi-preview${config.wide ? " wide" : ""}`;

    if (config.previewType === "level") {
        preview.classList.add("level-style-preview");
    }

    if (config.previewType === "avatarFrame") {
        preview.classList.add("avatar-frame-preview");
    }

    const arrow = document.createElement("span");
    arrow.className = "ssi-arrow";
    arrow.textContent = "〉";

    right.append(preview, arrow);
    item.append(left, right);

    item.addEventListener("click", () => {
        openSpecialIconSubPage(type);
    });

    return item;
}

function getSpecialItemLabel(type, item, index) {
    if (item.label) return item.label;

    if (
        item.isNone ||
        isSpecialNoneValue(item.value)
    ) {
        return "无";
    }

    const labelPrefixes = {
        avatarFrame: "头像框",
        levelStyle: "等级样式",
        rankTitle: "称号",
        energyIcon: "能量值",
        groupOwnerIcon: "群主图标",
        dynamicIcon: "铭牌",
        newBadge: "徽章",
        jikaIcon: "集卡称号",
        vipBadge: "荣耀称号",
        memberMedal: "会员勋章",
        medalIcon: "勋章"
    };

    return `${labelPrefixes[type] || "图标"} ${index + 1}`;
}

function createLevelStyleImages(styleValue, container, size = 18) {
    if (
        !container ||
        isSpecialNoneValue(styleValue)
    ) {
        return;
    }

    ["crown", "sun", "moon", "star"].forEach(type => {
        const img = document.createElement("img");

        img.src = `https://tianquan.gtimg.cn/qqVipLevel/item/${styleValue}/${type}.png`;
        img.alt = `${type}图标`;
        img.loading = "lazy";
        img.style.width = `${size}px`;
        img.style.height = `${size}px`;
        img.style.objectFit = "contain";

        container.appendChild(img);
    });
}

function renderSpecialIconGrid() {
    const grid = document.getElementById("special-subpage-grid");
    const type = currentSpecialIconSelector;
    const config = SPECIAL_ICON_SELECTOR_CONFIG[type];

    if (!grid || !config) return;

    const data = config.data();

    grid.innerHTML = "";
    grid.classList.toggle(
        "is-level-style-grid",
        type === "levelStyle"
    );

    grid.classList.toggle(
        "is-avatar-frame-grid",
        type === "avatarFrame"
    );

    data.forEach((item, index) => {
        const value = item.value ?? "none";
        const selected = isSpecialValueSelected(type, value);

        const card = document.createElement("button");
        card.type = "button";
        card.className = `special-grid-item${selected ? " selected" : ""}`;
        card.dataset.value = String(value);

        if (selected) {
            const check = document.createElement("span");
            check.className = "special-selected-check";
            check.textContent = "✓";
            card.appendChild(check);
        }

        const imageBox = document.createElement("div");
        imageBox.className = "special-grid-image";

        if (
            item.isNone ||
            isSpecialNoneValue(value)
        ) {
            const none = document.createElement("div");
            none.className = "special-grid-none";
            none.textContent = "无";
            imageBox.appendChild(none);
        } else if (type === "levelStyle") {
            imageBox.classList.add("special-grid-level-images");
            createLevelStyleImages(value, imageBox, 18);
        } else if (type === "avatarFrame") {
            imageBox.classList.add("special-grid-avatar-frame");

            const avatar = document.createElement("img");
            avatar.className = "special-grid-avatar-base";
            avatar.src = appState.userInfo?.avatar ||
                "http://q.qlogo.cn/headimg_dl?dst_uin=156440000&spec=640&img_type=jpg";
            avatar.alt = "头像";
            avatar.loading = "lazy";

            const frame = document.createElement("img");
            frame.className = "special-grid-avatar-overlay";
            frame.src = item.img || value;
            frame.alt = getSpecialItemLabel(type, item, index);
            frame.loading = "lazy";

            imageBox.append(avatar, frame);
        } else if (type === "rankTitle") {
            const level = Math.max(
                1,
                Math.min(
                    260,
                    parseInt(appState.rankTitleLevel) || 260
                )
            );

            const img = document.createElement("img");
            img.src = String(item.img || value).replace(
                /\/\d+\.png(?:\?.*)?$/,
                `/${level}.png`
            );

            img.alt = getSpecialItemLabel(type, item, index);
            img.loading = "lazy";
            imageBox.appendChild(img);
        } else if (item.img) {
            const img = document.createElement("img");
            img.src = item.img;
            img.alt = getSpecialItemLabel(type, item, index);
            img.loading = "lazy";
            imageBox.appendChild(img);
        } else {
            const none = document.createElement("div");
            none.className = "special-grid-none";
            none.textContent = "无";
            imageBox.appendChild(none);
        }

        const label = document.createElement("span");
        label.className = "special-grid-label";
        label.textContent = getSpecialItemLabel(type, item, index);

        card.append(imageBox, label);

        card.addEventListener("click", () => {
            applySpecialIconValue(type, item);
        });

        grid.appendChild(card);
    });
}

function openSpecialIconSubPage(type) {
    const config = SPECIAL_ICON_SELECTOR_CONFIG[type];
    const subPage = document.getElementById("specialIconSubPage");
    const title = document.getElementById("specialSubPageTitle");
    const clearButton = document.getElementById("specialSubPageClear");

    if (!config || !subPage) return;

    currentSpecialIconSelector = type;

    if (title) {
        title.textContent = config.title;
    }

    if (clearButton) {
        const hasNone = config.data().some(item => {
            return item.isNone ||
                isSpecialNoneValue(item.value);
        });

        clearButton.style.visibility = hasNone
            ? "visible"
            : "hidden";
    }

    document.getElementById("vipSubPage")
        ?.classList.remove("show");

    renderSpecialIconGrid();
    subPage.classList.add("show");
}

function closeSpecialIconSubPage() {
    document.getElementById("specialIconSubPage")
        ?.classList.remove("show");

    updateSpecialIconPreviews();

    if (typeof saveToLocalStorage === "function") {
        saveToLocalStorage();
    }
}

function clearCurrentSpecialIconSelector() {
    const type = currentSpecialIconSelector;
    const config = SPECIAL_ICON_SELECTOR_CONFIG[type];

    if (!config) return;

    const noneItem = config.data().find(item => {
        return item.isNone ||
            isSpecialNoneValue(item.value);
    });

    if (!noneItem) return;

    applySpecialIconValue(type, noneItem);
}

function setSpecialPreview(type, src) {
    const preview = document.getElementById(
        `special-preview-${type}`
    );

    if (!preview) return;

    preview.innerHTML = "";

    if (isSpecialNoneValue(src)) {
        const empty = document.createElement("span");
        empty.className = "ssi-empty";
        empty.textContent = "未选择";
        preview.appendChild(empty);
        return;
    }

    const img = document.createElement("img");
    img.src = src;
    img.alt = "当前选择";
    img.loading = "lazy";

    img.addEventListener("error", () => {
        preview.innerHTML = "";

        const empty = document.createElement("span");
        empty.className = "ssi-empty";
        empty.textContent = "加载失败";
        preview.appendChild(empty);
    });

    preview.appendChild(img);
}

function setAvatarFramePreview(src) {
    const preview = document.getElementById(
        "special-preview-avatarFrame"
    );

    if (!preview) return;

    preview.innerHTML = "";

    if (isSpecialNoneValue(src)) {
        const empty = document.createElement("span");
        empty.className = "ssi-empty";
        empty.textContent = "未选择";
        preview.appendChild(empty);
        return;
    }

    const wrapper = document.createElement("div");
    wrapper.className = "ssi-avatar-frame-wrapper";

    const avatar = document.createElement("img");
    avatar.className = "ssi-avatar-base";
    avatar.src = appState.userInfo?.avatar ||
        "http://q.qlogo.cn/headimg_dl?dst_uin=156440000&spec=640&img_type=jpg";
    avatar.alt = "头像";

    const frame = document.createElement("img");
    frame.className = "ssi-avatar-overlay";
    frame.src = src;
    frame.alt = "当前头像框";

    wrapper.append(avatar, frame);
    preview.appendChild(wrapper);
}

function setLevelStylePreview(styleValue) {
    const preview = document.getElementById(
        "special-preview-levelStyle"
    );

    if (!preview) return;

    preview.innerHTML = "";

    if (isSpecialNoneValue(styleValue)) {
        const empty = document.createElement("span");
        empty.className = "ssi-empty";
        empty.textContent = "未选择";
        preview.appendChild(empty);
        return;
    }

    createLevelStyleImages(styleValue, preview, 17);
}

function updateSpecialIconPreviews() {
    setAvatarFramePreview(appState.avatarFrame);
    setLevelStylePreview(appState.levelStyle);

    let rankTitleSrc = appState.rankTitle;

    if (!isSpecialNoneValue(rankTitleSrc)) {
        const level = Math.max(
            1,
            Math.min(
                260,
                parseInt(appState.rankTitleLevel) || 260
            )
        );

        rankTitleSrc = String(rankTitleSrc).replace(
            /\/\d+\.png(?:\?.*)?$/,
            `/${level}.png`
        );
    }

    setSpecialPreview("rankTitle", rankTitleSrc);
    setSpecialPreview("energyIcon", appState.energyIcon);
    setSpecialPreview("groupOwnerIcon", appState.groupOwnerIcon);
    setSpecialPreview("dynamicIcon", appState.dynamicIcon);
    setSpecialPreview("newBadge", appState.newBadge);
    setSpecialPreview("jikaIcon", appState.jikaIcon);
    setSpecialPreview("vipBadge", appState.vipBadge);
    setSpecialPreview("memberMedal", appState.memberMedal);
    setSpecialPreview("medalIcon", appState.medalIcon);
}

function injectSpecialIconSelectorStyles() {
    if (
        document.getElementById(
            "special-icon-selector-style"
        )
    ) {
        return;
    }

    const style = document.createElement("style");
    style.id = "special-icon-selector-style";

    style.textContent = `
        .special-rank-level-card {
            width:100%;
            padding:12px;
            margin-bottom:12px;
            border-radius:16px;
            background:rgba(255,255,255,0.03);
            border:1px solid rgba(255,255,255,0.08);
        }

        .special-rank-level-card label {
            display:block;
            margin-bottom:7px !important;
            color:#fff !important;
            font-size:0.85rem !important;
            font-weight:700 !important;
        }

        .special-rank-level-card #rankTitleLevelInput {
            width:100% !important;
            margin:0 !important;
        }

        .special-selector-list {
            display:flex;
            flex-direction:column;
            gap:8px;
            width:100%;
            padding-bottom:15px;
        }

        .feature-id-selector-list {
            margin-top:12px;
            margin-bottom:12px;
            padding-bottom:0;
        }

        .special-selector-item {
            display:flex;
            align-items:center;
            justify-content:space-between;
            min-height:66px;
            padding:11px 14px;
            border-radius:16px;
            background:rgba(255,255,255,0.03);
            border:1px solid rgba(255,255,255,0.08);
            cursor:pointer;
            user-select:none;
            transition:
                transform 0.18s ease,
                background 0.18s ease,
                border-color 0.18s ease;
        }

        .special-selector-item:hover {
            background:rgba(255,255,255,0.07);
            border-color:rgba(255,255,255,0.15);
        }

        .special-selector-item:active {
            transform:scale(0.98);
            background:rgba(255,255,255,0.1);
        }

        .ssi-left {
            display:flex;
            flex-direction:column;
            align-items:flex-start;
            min-width:0;
            padding-right:10px;
        }

        .ssi-title {
            color:#fff;
            font-size:0.93rem;
            line-height:1.3;
            font-weight:700;
            text-shadow:0 1px 2px rgba(0,0,0,0.5);
        }

        .ssi-desc {
            display:block;
            margin-top:4px;
            color:rgba(255,255,255,0.45);
            font-size:0.7rem;
            line-height:1.25;
        }

        .ssi-right {
            display:flex;
            align-items:center;
            justify-content:flex-end;
            flex-shrink:0;
            gap:7px;
        }

        .ssi-preview {
            display:flex;
            align-items:center;
            justify-content:flex-end;
            width:76px;
            height:40px;
            overflow:hidden;
        }

        .ssi-preview.wide {
            width:105px;
        }

        .ssi-preview > img {
            display:block;
            width:auto;
            height:auto;
            max-width:100%;
            max-height:30px;
            object-fit:contain;
        }

        .ssi-preview.level-style-preview {
            gap:2px;
            overflow:visible;
        }

        .ssi-preview.level-style-preview img {
            width:17px !important;
            height:17px !important;
            max-width:17px !important;
            max-height:17px !important;
            flex-shrink:0;
            object-fit:contain;
        }

        .ssi-preview.avatar-frame-preview {
            width:48px;
            height:48px;
            overflow:visible;
            justify-content:center;
        }

        .ssi-avatar-frame-wrapper {
            position:relative;
            width:38px;
            height:38px;
            flex-shrink:0;
        }

        .ssi-avatar-base {
            position:absolute;
            inset:0;
            width:100% !important;
            height:100% !important;
            max-width:none !important;
            max-height:none !important;
            border-radius:50%;
            object-fit:cover;
            z-index:1;
        }

        .ssi-avatar-overlay {
            position:absolute;
            top:-37.5%;
            left:-37.5%;
            width:175% !important;
            height:175% !important;
            max-width:none !important;
            max-height:none !important;
            object-fit:contain;
            z-index:2;
            pointer-events:none;
        }

        .ssi-empty {
            color:rgba(255,255,255,0.4);
            font-size:0.72rem;
            white-space:nowrap;
        }

        .ssi-arrow {
            color:rgba(255,255,255,0.38);
            font-size:1.1rem;
            font-weight:700;
        }

        .special-icon-subpage {
            position:absolute;
            inset:0;
            z-index:10040;
            display:flex;
            flex-direction:column;
            width:100%;
            height:100%;
            overflow:hidden;
            border-radius:28px;
            background:rgba(20,20,25,0.97);
            backdrop-filter:blur(25px) saturate(120%);
            -webkit-backdrop-filter:blur(25px) saturate(120%);
            transform:translateX(100%);
            opacity:0.98;
            pointer-events:none;
            transition:
                transform 0.35s cubic-bezier(0.25,0.8,0.25,1),
                opacity 0.25s ease;
        }

        .special-icon-subpage.show {
            transform:translateX(0);
            opacity:1;
            pointer-events:auto;
        }

        .special-subpage-header {
            position:relative;
            z-index:5;
            display:grid;
            grid-template-columns:minmax(75px,1fr) auto minmax(75px,1fr);
            align-items:center;
            min-height:65px;
            padding:12px 14px;
            border-bottom:1px solid rgba(255,255,255,0.08);
            background:rgba(15,15,20,0.5);
        }

        .special-subpage-back,
        .special-subpage-clear {
            border:none;
            outline:none;
            cursor:pointer;
            font-family:inherit;
        }

        .special-subpage-back {
            justify-self:start;
            padding:7px 0;
            color:#0a84ff;
            background:transparent;
            font-size:1rem;
            font-weight:600;
        }

        .special-subpage-title {
            justify-self:center;
            max-width:190px;
            overflow:hidden;
            color:#fff;
            font-size:1.08rem;
            font-weight:700;
            text-align:center;
            text-overflow:ellipsis;
            white-space:nowrap;
        }

        .special-subpage-clear {
            justify-self:end;
            padding:7px 12px;
            color:#fff;
            border:1px solid rgba(255,255,255,0.08);
            border-radius:14px;
            background:rgba(255,255,255,0.09);
            font-size:0.8rem;
            font-weight:600;
        }

        .special-subpage-clear:active {
            background:rgba(255,255,255,0.17);
            transform:scale(0.96);
        }

        .special-subpage-content {
            flex:1;
            min-height:0;
            padding:15px;
            overflow-x:hidden;
            overflow-y:auto;
            overscroll-behavior:contain;
            -webkit-overflow-scrolling:touch;
        }

        .special-subpage-content::-webkit-scrollbar {
            display:block;
            width:4px;
        }

        .special-subpage-content::-webkit-scrollbar-thumb {
            border-radius:99px;
            background:rgba(255,255,255,0.2);
        }

        .special-subpage-grid {
            display:grid !important;
            grid-template-columns:repeat(3,minmax(0,1fr)) !important;
            gap:10px !important;
            width:100% !important;
            padding-bottom:25px;
        }

        .special-grid-item {
            position:relative;
            display:flex;
            flex-direction:column;
            align-items:center;
            justify-content:center;
            min-width:0;
            min-height:82px;
            padding:9px 6px;
            overflow:hidden;
            color:#fff;
            border:1px solid rgba(255,255,255,0.07);
            border-radius:13px;
            background:rgba(255,255,255,0.025);
            cursor:pointer;
            transition:
                transform 0.18s ease,
                background 0.18s ease,
                border-color 0.18s ease;
        }

        .special-grid-item:active {
            transform:scale(0.97);
        }

        .special-grid-item.selected {
            border-color:rgba(255,255,255,0.3);
            background:rgba(255,255,255,0.12);
            box-shadow:
                inset 0 0 0 1px rgba(255,255,255,0.04),
                0 4px 15px rgba(0,0,0,0.08);
        }

        .special-selected-check {
            position:absolute;
            top:5px;
            right:5px;
            z-index:5;
            display:flex;
            align-items:center;
            justify-content:center;
            width:17px;
            height:17px;
            border-radius:50%;
            color:#fff;
            background:#0a84ff;
            font-size:10px;
            font-weight:800;
            text-shadow:none;
        }

        .special-grid-image {
            display:flex;
            align-items:center;
            justify-content:center;
            width:100%;
            height:42px;
            overflow:hidden;
        }

        .special-grid-image > img {
            display:block;
            width:auto;
            height:auto;
            max-width:100%;
            max-height:38px;
            object-fit:contain;
        }

        .special-grid-level-images {
            gap:3px;
            overflow:visible;
        }

        .special-grid-level-images img {
            width:18px !important;
            height:18px !important;
            max-width:18px !important;
            max-height:18px !important;
            flex-shrink:0;
            object-fit:contain;
        }

        .special-subpage-grid.is-level-style-grid .special-grid-item {
            min-height:86px;
        }

        .special-subpage-grid.is-avatar-frame-grid .special-grid-item {
            min-height:112px;
        }

        .special-subpage-grid.is-avatar-frame-grid .special-grid-image {
            height:70px;
            overflow:visible;
        }

        .special-grid-avatar-frame {
            position:relative;
            width:58px;
            height:58px !important;
            margin-top:4px;
            overflow:visible;
            flex-shrink:0;
        }

        .special-grid-avatar-base {
            position:absolute;
            inset:0;
            width:100% !important;
            height:100% !important;
            max-width:none !important;
            max-height:none !important;
            border-radius:50%;
            object-fit:cover;
            z-index:1;
        }

        .special-grid-avatar-overlay {
            position:absolute;
            top:-37.5%;
            left:-37.5%;
            width:175% !important;
            height:175% !important;
            max-width:none !important;
            max-height:none !important;
            object-fit:contain;
            z-index:2;
            pointer-events:none;
        }

        .special-grid-none {
            display:flex;
            align-items:center;
            justify-content:center;
            width:34px;
            height:34px;
            border:1px dashed rgba(255,255,255,0.4);
            border-radius:9px;
            color:rgba(255,255,255,0.7);
            background:rgba(255,255,255,0.025);
            font-size:11px;
        }

        .special-grid-label {
            display:block;
            width:100%;
            margin-top:6px;
            overflow:hidden;
            color:rgba(255,255,255,0.92);
            font-size:10px;
            line-height:1.2;
            text-align:center;
            text-overflow:ellipsis;
            white-space:nowrap;
        }

        @media screen and (max-width:390px) {
            .special-subpage-grid {
                gap:8px !important;
            }

            .special-subpage-content {
                padding:12px;
            }

            .special-grid-item {
                min-height:76px;
            }

            .special-grid-level-images {
                gap:1px;
            }

            .special-grid-level-images img {
                width:16px !important;
                height:16px !important;
                max-width:16px !important;
                max-height:16px !important;
            }

            .special-grid-avatar-frame {
                width:52px;
                height:52px !important;
            }

            .special-subpage-title {
                max-width:150px;
                font-size:1rem;
            }

            .special-subpage-clear {
                padding:6px 9px;
                font-size:0.75rem;
            }
        }
    `;

    document.head.appendChild(style);
}

function getLegacyGroupInfo(containerId) {
    const container = document.getElementById(containerId);
    const details = container?.closest("details.dynamic-group") || null;

    const label = details?.previousElementSibling?.tagName === "LABEL"
        ? details.previousElementSibling
        : null;

    return {
        container,
        details,
        label
    };
}

function setupFeatureIdentifierSelectors(legacyGroups) {
    const specialIdTab = document.querySelector(
        '[data-tab-content="special-id"]'
    );

    if (!specialIdTab) return;

    document.getElementById("feature-id-selector-list")?.remove();

    const selectorList = document.createElement("div");
    selectorList.id = "feature-id-selector-list";
    selectorList.className =
        "special-selector-list feature-id-selector-list";

    Object.entries(SPECIAL_ICON_SELECTOR_CONFIG)
        .filter(([, config]) => config.section === "special-id")
        .forEach(([type, config]) => {
            selectorList.appendChild(
                createSpecialSelectorItem(type, config)
            );
        });

    legacyGroups.avatarFrame?.details?.remove();
    legacyGroups.avatarFrame?.label?.remove();
    legacyGroups.levelStyle?.details?.remove();
    legacyGroups.levelStyle?.label?.remove();

    const levelInput = document.getElementById("levelInput");

    if (levelInput?.parentNode === specialIdTab) {
        levelInput.insertAdjacentElement(
            "afterend",
            selectorList
        );
    } else {
        specialIdTab.appendChild(selectorList);
    }
}

function setupSpecialIconSelectorUI() {
    const specialIconsTab = document.querySelector(
        '[data-tab-content="special-icons"]'
    );

    const modalContent = document.querySelector(
        "#editModal .modal-content"
    );

    if (!specialIconsTab || !modalContent) return;

    injectSpecialIconSelectorStyles();

    const legacyGroups = {
        avatarFrame: getLegacyGroupInfo(
            "avatar-frame-selector"
        ),

        levelStyle: getLegacyGroupInfo(
            "level-style-selector"
        )
    };

    let legacyHolder = document.getElementById(
        "special-icon-legacy-holder"
    );

    if (!legacyHolder) {
        legacyHolder = document.createElement("div");
        legacyHolder.id = "special-icon-legacy-holder";
        legacyHolder.style.display = "none";

        Object.values(SPECIAL_ICON_SELECTOR_CONFIG).forEach(config => {
            let oldContainer = document.getElementById(
                config.oldContainerId
            );

            if (!oldContainer) {
                oldContainer = document.createElement("div");
                oldContainer.id = config.oldContainerId;

                renderOptionsIntoElement(
                    oldContainer,
                    config.data(),
                    config.radioName
                );
            }

            legacyHolder.appendChild(oldContainer);
        });

        document.getElementById("editForm")
            ?.appendChild(legacyHolder);
    }

    let rankInput = document.getElementById(
        "rankTitleLevelInput"
    );

    if (rankInput) {
        rankInput.remove();
    } else {
        rankInput = document.createElement("input");
        rankInput.type = "number";
        rankInput.id = "rankTitleLevelInput";
        rankInput.min = "1";
        rankInput.max = "260";
        rankInput.value = String(
            appState.rankTitleLevel || 260
        );
    }

    specialIconsTab.innerHTML = "";

    const levelCard = document.createElement("div");
    levelCard.className = "special-rank-level-card";

    const levelLabel = document.createElement("label");
    levelLabel.htmlFor = "rankTitleLevelInput";
    levelLabel.textContent = "称号等级（1-260）";

    levelCard.append(levelLabel, rankInput);

    const selectorList = document.createElement("div");
    selectorList.className = "special-selector-list";

    Object.entries(SPECIAL_ICON_SELECTOR_CONFIG)
        .filter(([, config]) => config.section === "special-icons")
        .forEach(([type, config]) => {
            selectorList.appendChild(
                createSpecialSelectorItem(type, config)
            );
        });

    specialIconsTab.append(levelCard, selectorList);

    setupFeatureIdentifierSelectors(legacyGroups);

    if (!document.getElementById("specialIconSubPage")) {
        const subPage = document.createElement("div");
        subPage.id = "specialIconSubPage";
        subPage.className = "special-icon-subpage";

        subPage.innerHTML = `
            <div class="special-subpage-header">
                <button
                    type="button"
                    id="specialSubPageBack"
                    class="special-subpage-back"
                >〈 返回</button>

                <span
                    id="specialSubPageTitle"
                    class="special-subpage-title"
                >图标选择</span>

                <button
                    type="button"
                    id="specialSubPageClear"
                    class="special-subpage-clear"
                >清除</button>
            </div>

            <div class="special-subpage-content">
                <div
                    id="special-subpage-grid"
                    class="special-subpage-grid"
                ></div>
            </div>
        `;

        modalContent.appendChild(subPage);

        document.getElementById("specialSubPageBack")
            ?.addEventListener(
                "click",
                closeSpecialIconSubPage
            );

        document.getElementById("specialSubPageClear")
            ?.addEventListener(
                "click",
                clearCurrentSpecialIconSelector
            );
    }

    rankInput.addEventListener("input", () => {
        window.requestAnimationFrame(() => {
            updateSpecialIconPreviews();

            if (
                currentSpecialIconSelector === "rankTitle" &&
                document.getElementById("specialIconSubPage")
                    ?.classList.contains("show")
            ) {
                renderSpecialIconGrid();
            }
        });
    });

    document.addEventListener("change", event => {
        const selectorNames = Object.values(
            SPECIAL_ICON_SELECTOR_CONFIG
        ).map(config => config.radioName);

        if (selectorNames.includes(event.target?.name)) {
            window.requestAnimationFrame(() => {
                updateSpecialIconPreviews();

                if (
                    document.getElementById("specialIconSubPage")
                        ?.classList.contains("show")
                ) {
                    renderSpecialIconGrid();
                }
            });
        }
    });

    updateSpecialIconPreviews();
}

// ========================================================
// HTML 表单初始化
// ========================================================

function initHtmlContent() {
    const menuInfo = document.querySelector(".menu-bottom-info");

    if (menuInfo) {
        menuInfo.innerHTML = "";
    }

    const lhSelect = document.getElementById("lhIconSelect");

    if (lhSelect) {
        lhSelect.innerHTML = "";

        CONFIG.lhIcons.forEach(icon => {
            const option = document.createElement("option");
            option.value = icon.value;
            option.textContent = icon.label;
            lhSelect.appendChild(option);
        });
    }

    const nameColorSelect = document.getElementById(
        "nameColorSelect"
    );

    if (nameColorSelect) {
        nameColorSelect.innerHTML = "";

        CONFIG.nameColors.forEach(item => {
            const option = document.createElement("option");
            option.value = item.value;
            option.textContent = item.label;
            nameColorSelect.appendChild(option);
        });
    }

    const renderConfigs = [
        [
            "avatar-frame-selector",
            CONFIG.avatarFrames,
            "avatarFrameSelect",
            "icon-option"
        ],
        [
            "id-icon-selector",
            CONFIG.idIcons,
            "idIconSelect",
            ""
        ],
        [
            "level-style-selector",
            CONFIG.levelStyles,
            "levelIconStyle",
            "icon-option"
        ],
        [
            "dynamic-icon-selector",
            CONFIG.dynamicIcons,
            "dynamicIconSelect",
            "icon-option"
        ],
        [
            "medal-icon-selector",
            CONFIG.medalIcons,
            "medalIconSelect",
            "icon-option"
        ],
        [
            "energy-icon-selector",
            CONFIG.energyIcons,
            "energyIconSelect",
            "icon-option"
        ],
        [
            "vip-badge-selector",
            CONFIG.vipBadges,
            "vipBadges",
            "icon-option"
        ],
        [
            "rank-title-selector",
            CONFIG.rankTitles,
            "rankTitleSelect",
            "icon-option"
        ],
        [
            "new-badge-selector",
            CONFIG.newBadges,
            "newBadgeSelect",
            "icon-option"
        ],
        [
            "jika-selector",
            CONFIG.jikaIcons,
            "jikaSelect",
            "icon-option"
        ],
        [
            "group-owner-selector",
            CONFIG.groupOwnerIcons,
            "groupOwnerSelect",
            "icon-option"
        ],
        [
            "member-medal-selector",
            CONFIG.memberMedals,
            "memberMedalSelect",
            "icon-option"
        ]
    ];

    renderConfigs.forEach(args => {
        renderOptions(...args);
    });

    setupSpecialIconSelectorUI();
}

// ========================================================
// 资料卡更新方法
// ========================================================

const updateAvatarFrame = src => {
    appState.avatarFrame = src || "";

    const element = document.getElementById(
        "avatarFrameOverlay"
    );

    if (element) {
        element.src = src || "";
        element.style.display = src ? "block" : "none";
    }

    setAvatarFramePreview(appState.avatarFrame);
};

const updateNameColor = type => {
    appState.nameColor = type;

    const element = document.getElementById("name");
    if (!element) return;

    element.classList.remove(
        "rainbow",
        "static-rainbow",
        "flowing-gold"
    );

    element.style.color = "";

    const handlers = {
        gold: () => {
            element.style.color = "#c98e34";
        },

        rainbow: () => {
            element.classList.add("rainbow");
        },

        "static-rainbow": () => {
            element.classList.add("static-rainbow");
        },

        "flowing-gold": () => {
            element.classList.add("flowing-gold");
        }
    };

    (handlers[type] || handlers["flowing-gold"])();
};

const updateDynamicIconDisplay = src => {
    appState.dynamicIcon = src;

    const element = document.getElementById("dynamicIcon");
    if (!element) return;

    if (!src || src === "none") {
        element.style.display = "none";
    } else {
        element.src = src;
        element.style.display = "inline-block";
    }
};

const updateMedalIconDisplay = src => {
    appState.medalIcon = src;

    const element = document.getElementById("medalIcon");
    if (!element) return;

    if (!src || src === "none") {
        element.style.display = "none";
    } else {
        element.src = src;
        element.style.display = "inline-block";
    }
};

const updateNewBadgeDisplay = src => {
    appState.newBadge = src;

    const element = document.getElementById("newBadgeIcon");
    if (!element) return;

    if (!src || src === "none") {
        element.style.display = "none";
    } else {
        element.src = src;
        element.style.display = "inline-block";
    }
};

const updateJikaDisplay = src => {
    appState.jikaIcon = src;

    const element = document.getElementById("jikaIcon");
    if (!element) return;

    if (!src || src === "none") {
        element.style.display = "none";
    } else {
        element.src = src;
        element.style.display = "inline-block";
    }
};

const updateMemberMedalDisplay = src => {
    appState.memberMedal = src;

    const element = document.getElementById(
        "memberMedalIcon"
    );

    const statusButton = document.getElementById(
        "statusButton"
    );

    if (!element) return;

    if (!src || src === "none") {
        element.style.display = "none";

        if (statusButton) {
            statusButton.style.display = "";
        }
    } else {
        element.src = src;
        element.style.display = "inline-block";

        if (statusButton) {
            statusButton.style.display = "none";
        }
    }
};

const updateRankTitleDisplay = (src, level = 260) => {
    appState.rankTitle = src;
    appState.rankTitleLevel = level;

    const titleImage = document.getElementById("rankTitleImg");
    const levelContainer = document.getElementById(
        "levelIconContainer"
    );

    const boxRank = document.querySelector(".box-rank");

    const box7Right = document.querySelector(
        ".box7.box7_right"
    ) || document.querySelector(".box7 .box7_right");

    const boxRankRight = document.querySelector(
        ".box-rank .box7_right"
    );

    const medalIcon = document.getElementById("medalIcon");
    const box7Arrow = document.querySelector(".box7 .right");

    if (!titleImage) return;

    if (!src || src === "none") {
        titleImage.style.display = "none";

        if (boxRank) {
            boxRank.style.display = "none";
        }

        if (box7Arrow) {
            box7Arrow.style.display = "";
        }

        if (
            levelContainer &&
            box7Right &&
            levelContainer.parentElement !== box7Right
        ) {
            if (
                medalIcon &&
                medalIcon.parentNode === box7Right
            ) {
                box7Right.insertBefore(
                    levelContainer,
                    medalIcon
                );
            } else {
                box7Right.appendChild(levelContainer);
            }
        }

        return;
    }

    let safeLevel = parseInt(level) || 260;
    safeLevel = Math.max(1, Math.min(260, safeLevel));

    const finalSource = String(src).replace(
        /\/\d+\.png(?:\?.*)?$/,
        `/${safeLevel}.png`
    );

    titleImage.src = finalSource;
    titleImage.style.display = "block";

    if (boxRank) {
        boxRank.style.display = "flex";
    }

    if (box7Arrow) {
        box7Arrow.style.display = "none";
    }

    if (
        levelContainer &&
        boxRankRight &&
        levelContainer.parentElement !== boxRankRight
    ) {
        boxRankRight.appendChild(levelContainer);
    }
};

const updateEnergyIconDisplay = src => {
    appState.energyIcon = src;

    const element = document.getElementById("energyIcon");
    if (!element) return;

    if (!src || src === "none") {
        element.style.display = "none";
    } else {
        element.src = src;
        element.style.display = "inline-block";
    }
};

const updateVipBadgesDisplay = src => {
    appState.vipBadge = src;

    const badgeIcon = document.getElementById("vipBadgeIcon");
    if (!badgeIcon) return;

    if (!src || src === "none") {
        badgeIcon.style.display = "none";
        return;
    }

    const finalSource = String(src).includes("http")
        ? src
        : `https://tianquan.gtimg.cn/shoal/qqgxh/${src}.png`;

    badgeIcon.src = finalSource;
    badgeIcon.style.display = "inline-block";
};

const updateIdIconDisplay = src => {
    appState.idIcon = src;

    const element = document.getElementById("idIcon");

    if (element) {
        element.src = src;
    }
};

const updateIdNumberDisplay = text => {
    appState.idNumber = text;

    const element = document.getElementById(
        "idNumberDisplay"
    );

    if (!element) return;

    element.textContent = text;
    element.style.display = text
        ? "inline-flex"
        : "none";
};

const updateGroupOwnerIconDisplay = src => {
    appState.groupOwnerIcon = src;

    const element = document.getElementById(
        "groupOwnerIcon"
    );

    if (!element) return;

    if (!src || src === "none") {
        element.style.display = "none";
    } else {
        element.src = src;
        element.style.display = "inline-block";
    }
};

const updateBox7Visibility = show => {
    appState.showBox7 = show;

    const element = document.querySelector(".box.box7");

    if (element) {
        element.style.display = show
            ? "flex"
            : "none";
    }
};

const updateLevelIcons = (level, style = "1") => {
    appState.levelStyle = style;

    const container = document.getElementById(
        "levelIconContainer"
    );

    if (!container) return;

    container.innerHTML = "";
    container.dataset.level = level;

    if (!style || style === "none") {
        setLevelStylePreview(style);
        return;
    }

    let remainder = parseInt(level) || 1;

    const counts = [64, 16, 4, 1].map(divisor => {
        const count = Math.floor(remainder / divisor);
        remainder %= divisor;
        return count;
    });

    const icons = ["crown", "sun", "moon", "star"];
    const titles = [
        "皇冠(64)",
        "太阳(16)",
        "月亮(4)",
        "星星(1)"
    ];

    counts.forEach((count, index) => {
        for (let position = 0; position < count; position++) {
            const span = document.createElement("span");

            Object.assign(span.style, {
                marginRight: "0",
                display: "inline-block",
                fontSize: "0"
            });

            const img = document.createElement("img");

            img.src = `https://tianquan.gtimg.cn/qqVipLevel/item/${style}/${icons[index]}.png`;
            img.alt = titles[index];

            img.style.cssText = `
                height:16px;
                width:16px;
                padding:0;
                vertical-align:middle;
                display:inline-block;
                border:0;
                line-height:1;
                font-size:0;
            `;

            span.appendChild(img);
            container.appendChild(span);
        }
    });

    setLevelStylePreview(style);
};

const updateQQNumberWidth = value => {
    const bgMiddle = document.getElementById("bgMiddle");
    const wrapper = document.getElementById("lhWrapperXc");
    const qqItem = document.getElementById("qqNumberItem");

    if (!bgMiddle || !wrapper || !qqItem) return;

    const text = String(value || "");
    const length = text.length;

    let width = 11 + (length - 5) * 24;

    if (width < 11) {
        width = 11;
    }

    bgMiddle.style.width = `${width}px`;

    const totalContentWidth = 110 + width + 110;
    const scale = 0.34;

    qqItem.style.transform =
        `translateY(-50%) scale(${scale})`;

    qqItem.style.transformOrigin = "left center";
    wrapper.style.width = `${totalContentWidth * scale}px`;
    wrapper.style.height = `${69 * scale}px`;
};

const applyLhStyle = src => {
    appState.lhIcon = src;

    if (!src) return;

    const normalSection = document.getElementById(
        "normalLhSection"
    );

    const specialWrapper = document.getElementById(
        "lhWrapperXc"
    );

    const numberElement = document.querySelector("#qq_number");
    const normalSpan = document.querySelector(
        "#normalLhSection span"
    );

    const normalImage = document.getElementById("img19");
    const bgLeft = document.getElementById("bgLeft");
    const bgMiddle = document.getElementById("bgMiddle");
    const bgRight = document.getElementById("bgRight");
    const leftIcon = document.getElementById("leftIcon");
    const qqNumberText = document.getElementById("qqNumberText");

    if (!numberElement || !normalImage) return;

    numberElement.style.cssText = "";
    numberElement.classList.remove("puhao-text");
    normalImage.style.cssText = "";

    if (normalSpan) {
        normalSpan.style.cssText = "";
    }

    normalImage.src = src;

    const isStyle4 = src.includes("4.png") ||
        src.includes("lianghao/4");

    const isStyle5 = src.includes("5.png") ||
        src.includes("lianghao/5");

    const isStyle6 = src.includes("6.png") ||
        src.includes("lianghao/6");

    if (isStyle4 || isStyle5 || isStyle6) {
        if (normalSection) {
            normalSection.style.display = "none";
        }

        if (specialWrapper) {
            specialWrapper.style.display = "inline-flex";
        }

        let backgroundFile = "";
        let iconFile = "";
        let textColor = "";
        let rainbow = false;

        if (isStyle5) {
            backgroundFile = "./img/lianghao/5b.png";
            iconFile = "./img/lianghao/5.png";
            textColor = "#C2965A";
        } else if (isStyle6) {
            backgroundFile = "./img/lianghao/6b.png";
            iconFile = "./img/lianghao/6.png";
            textColor = "#E1B484";
        } else {
            backgroundFile = "./img/lianghao/4b.png";
            iconFile = "./img/lianghao/4.png";
            textColor = "#FFFFFF";
            rainbow = true;
        }

        if (bgLeft) {
            bgLeft.style.backgroundImage =
                `url("${backgroundFile}")`;
            bgLeft.style.backgroundRepeat = "no-repeat";
            bgLeft.style.backgroundPosition = "left center";
            bgLeft.style.backgroundSize = "auto 69px";
        }

        if (bgMiddle) {
            bgMiddle.style.backgroundImage =
                `url("${backgroundFile}")`;
            bgMiddle.style.backgroundRepeat = "repeat-x";
            bgMiddle.style.backgroundPosition = "center";
            bgMiddle.style.backgroundSize = "auto 69px";
        }

        if (bgRight) {
            bgRight.style.backgroundImage =
                `url("${backgroundFile}")`;
            bgRight.style.backgroundRepeat = "no-repeat";
            bgRight.style.backgroundPosition = "right center";
            bgRight.style.backgroundSize = "auto 69px";
        }

        if (leftIcon) {
            leftIcon.style.backgroundImage =
                `url("${iconFile}")`;
        }

        if (qqNumberText) {
            if (rainbow) {
                qqNumberText.className = "num-text rainbow";
                qqNumberText.style.color = "";
                qqNumberText.style.background = "";
                qqNumberText.style.webkitBackgroundClip = "";
                qqNumberText.style.webkitTextFillColor = "";
            } else {
                qqNumberText.className = "num-text";
                qqNumberText.style.color = textColor;
                qqNumberText.style.background = "none";
                qqNumberText.style.webkitBackgroundClip = "initial";
                qqNumberText.style.webkitTextFillColor = "initial";
            }
        }

        updateQQNumberWidth(numberElement.textContent || "");
        return;
    }

    if (specialWrapper) {
        specialWrapper.style.display = "none";
    }

    if (normalSection) {
        normalSection.style.display = "flex";
    }

    if (src.includes("35.2.png")) {
        numberElement.style.cssText = `
            height:15px;
            line-height:15px;
            background:linear-gradient(to right,#454545,#303030);
            border:0;
            color:#F8D49C;
            font-weight:400;
            padding:0.01rem 0.3rem 0.3rem 0.1rem;
            border-top-right-radius:1rem;
            border-bottom-right-radius:1rem;
        `;

        if (normalSpan) {
            normalSpan.style.cssText = `
                display:block;
                color:#c2a77d;
                margin-left:-0.1px;
                font-weight:600;
                background-color:#454545;
                height:15px;
                font-style:italic;
                border-bottom-left-radius:1rem;
                border-top-left-radius:1rem;
            `;
        }
    } else if (src.includes("35.3.png")) {
        numberElement.style.cssText = `
            height:15px;
            line-height:15px;
            background:linear-gradient(
                90deg,
                #ffb347 0%,
                #ff7a18 0%,
                #ff3d00 100%
            );
            border:0;
            color:#ffffff;
            font-weight:400;
            padding:0.01rem 0.32rem 0.28rem 0.12rem;
            border-top-right-radius:1rem;
            border-bottom-right-radius:1rem;
            text-shadow:0 0 6px rgba(255,255,255,0.45);
        `;

        if (normalSpan) {
            normalSpan.style.cssText = `
                display:block;
                color:#ffffff;
                margin-left:-0.1px;
                font-weight:700;
                background:linear-gradient(
                    270deg,
                    #ff9a3d 0%,
                    #ff601a 50%,
                    #ff3d00 100%
                );
                height:15px;
                font-style:normal;
                border-bottom-left-radius:1rem;
                border-top-left-radius:1rem;
                text-shadow:0 0 4px rgba(255,255,255,0.35);
            `;
        }
    } else if (src.includes("puhao.png")) {
        numberElement.classList.add("puhao-text");

        numberElement.style.cssText = `
            background:none;
            border:none;
            color:#111111;
            padding:0;
            height:auto;
            line-height:normal;
            font-size:0.95rem;
            font-weight:500;
            border-radius:0;
            text-shadow:none;
        `;

        if (normalSpan) {
            normalSpan.style.display = "none";
        }

        normalImage.style.height = "16px";
        normalImage.style.width = "auto";
        normalImage.style.marginLeft = "6px";
        normalImage.style.marginTop = "1px";
        normalImage.style.verticalAlign = "middle";
    } else {
        numberElement.style.cssText = `
            height:15px;
            line-height:15px;
            background:linear-gradient(to right,#EDC386,#DAA45F);
            border:0;
            color:#000000;
            font-weight:400;
            padding:0.01rem 0.3rem 0.3rem 0.1rem;
            border-top-right-radius:1rem;
            border-bottom-right-radius:1rem;
        `;

        if (normalSpan) {
            normalSpan.style.cssText = `
                display:block;
                color:#c2a77d;
                margin-left:-0.1px;
                font-weight:600;
                background-color:#EDC386;
                height:15px;
                font-style:italic;
                border-bottom-left-radius:1rem;
                border-top-left-radius:1rem;
            `;
        }
    }
};
