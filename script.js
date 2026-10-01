// script.js
// 控制程序的完整生命周期、注册全局状态变量(appState)以及事件监听体系和本地存储(localStorage)

let appState = {
    avatarFrame: "https://tianquan.gtimg.cn/faceAddon/item/134257/newPreview1.png",
    idIcon: "./img/UID/UID2.png",
    idNumber: "GuYiovo",
    idIconIndex: 0,
    nameColor: "flowing-gold",
    vip: {
        displayMode: "color",
        selectedIcons: [],
        selectedIconVersions: {},
        isCustom: false
    },
    currentVipCategory: "all",
    rankTitle: "https://gxh.material.qq.com/zip/bigVipLevelBadge/8/a8b72e00-02c1-4eb0-8009-2e6a96730e47/260.png",
    rankTitleLevel: 260,
    newBadge: "none",
    jikaIcon: "img/jika/Kuromi.png",
    groupOwnerIcon: "./img/qumzhu/qunzhu.png",
    memberMedal: "https://tianquan.gtimg.cn/vipMedal/item/3/previewImage.png",
    levelStyle: "133",
    dynamicIcon: "https://tianquan.gtimg.cn/namePlate/item/20354/258/10.png?nowebp&nosharpp",
    lhIcon: "./img/lianghao/4.png",
    energyIcon: "./img/value/33.png",
    showBox7: true,
    vipBadge: "https://tianquan.gtimg.cn/shoal/bvip/08da0705-9eb9-433b-8dc1-bb52ab4b781d.png",
    medalIcon: "none",
    minimalistMode: {
        enabled: false,
        previousState: null
    },
    userInfo: {
        name: "可可爱爱",
        good: "124557",
        qqNumber: "5205222",
        gender: "",
        age: "",
        province: "美国",
        city: "",
        company: "我们纪念过往却不该困于过往",
        qqLevel: "155",
        sign: "",
        avatar: "http://q.qlogo.cn/headimg_dl?dst_uin=156440000&spec=640&img_type=jpg",
        storyImages: []
    }
};

function saveToLocalStorage() {
    try {
        localStorage.setItem(
            "qqCardData_v1",
            JSON.stringify(appState)
        );
    } catch (e) {
        console.warn(
            "保存到 localStorage 失败，可能是上传的图片导致体积超限:",
            e
        );
    }
}

function mergeDeep(target, source) {
    if (
        typeof source !== "object" ||
        source === null
    ) {
        return source;
    }

    for (const key in source) {
        if (
            source[key] instanceof Object &&
            !Array.isArray(source[key])
        ) {
            if (!target[key]) {
                Object.assign(target, {
                    [key]: {}
                });
            }

            mergeDeep(target[key], source[key]);
        } else {
            Object.assign(target, {
                [key]: source[key]
            });
        }
    }

    return target;
}

function loadFromLocalStorage() {
    try {
        const localData = localStorage.getItem(
            "qqCardData_v1"
        );

        if (localData) {
            appState = mergeDeep(
                appState,
                JSON.parse(localData)
            );
        }
    } catch (e) {
        console.warn(
            "从 localStorage 读取配置失败:",
            e
        );
    }
}

function cloneStateValue(value) {
    return JSON.parse(JSON.stringify(value));
}

function initAnnouncement() {
    const homeAnnouncement = document.getElementById(
        "home-announcement-content"
    );

    if (!homeAnnouncement) return;

    fetch(
        "https://cloudupdate.xn--tlq395o.top/Nativebusinesscard.txt"
    )
        .then(response => {
            if (!response.ok) {
                throw new Error(
                    "网络请求未成功，状态码: " +
                    response.status
                );
            }

            return response.text();
        })
        .then(text => {
            const formattedText = text
                .replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;")
                .replace(/\n/g, "<br>");

            if (homeAnnouncement) {
                homeAnnouncement.innerHTML =
                    formattedText;
            }
        })
        .catch(() => {
            if (homeAnnouncement) {
                homeAnnouncement.innerHTML =
                    '<p style="color: #ff5252;">加载公告失败，请检查网络</p>';
            }
        });
}

function setRadioValue(name, value) {
    const radios = document.querySelectorAll(
        `input[name="${name}"]`
    );

    let matched = false;

    radios.forEach(radio => {
        const checked =
            String(radio.value) ===
            String(value ?? "");

        radio.checked = checked;

        if (checked) {
            matched = true;
        }
    });

    if (!matched) {
        const noneRadio = document.querySelector(
            `input[name="${name}"][value="none"]`
        );

        if (noneRadio) {
            noneRadio.checked = true;
        }
    }
}

function updateMinimalistModeButton() {
    const enabled = Boolean(
        appState.minimalistMode?.enabled
    );

    const iosButton = document.getElementById(
        "iosMinimalistBtn"
    );

    const hiddenButton = document.getElementById(
        "minimalistBtn"
    );

    if (iosButton) {
        const text = iosButton.querySelector(
            ".btn-text"
        );

        if (text) {
            text.textContent = enabled
                ? "关闭极简模式"
                : "开启极简模式";
        }

        iosButton.classList.toggle(
            "active",
            enabled
        );

        iosButton.setAttribute(
            "aria-pressed",
            String(enabled)
        );
    }

    if (hiddenButton) {
        hiddenButton.textContent = enabled
            ? "关闭极简模式"
            : "一键简洁名片";

        hiddenButton.setAttribute(
            "aria-pressed",
            String(enabled)
        );
    }
}

function captureMinimalistPreviousState() {
    return {
        levelStyle: appState.levelStyle,
        dynamicIcon: appState.dynamicIcon,
        energyIcon: appState.energyIcon,
        medalIcon: appState.medalIcon,
        vipBadge: appState.vipBadge,
        rankTitle: appState.rankTitle,
        rankTitleLevel: appState.rankTitleLevel,
        newBadge: appState.newBadge,
        jikaIcon: appState.jikaIcon,
        groupOwnerIcon: appState.groupOwnerIcon,
        memberMedal: appState.memberMedal,
        showBox7: appState.showBox7,
        nameColor: appState.nameColor,
        vip: cloneStateValue(appState.vip)
    };
}

function refreshMinimalistRelatedUI() {
    renderIconOrderList();
    updateVipIconsDisplay();

    if (
        typeof updateVipCategoryPreviews ===
        "function"
    ) {
        updateVipCategoryPreviews();
    }

    if (
        typeof updateSpecialIconPreviews ===
        "function"
    ) {
        updateSpecialIconPreviews();
    }

    if (
        typeof renderSpecialIconGrid ===
        "function" &&
        document.getElementById(
            "specialIconSubPage"
        )?.classList.contains("show")
    ) {
        renderSpecialIconGrid();
    }
}

function applyMinimalistMode() {
    if (!appState.minimalistMode) {
        appState.minimalistMode = {
            enabled: false,
            previousState: null
        };
    }

    if (appState.minimalistMode.enabled) {
        return;
    }

    appState.minimalistMode.previousState =
        captureMinimalistPreviousState();

    appState.minimalistMode.enabled = true;

    const level = parseInt(
        appState.userInfo.qqLevel
    ) || 1;

    updateLevelIcons(level, "none");
    updateDynamicIconDisplay("none");
    updateEnergyIconDisplay("none");
    updateMedalIconDisplay("none");
    updateVipBadgesDisplay("none");

    updateRankTitleDisplay(
        "none",
        appState.rankTitleLevel || 260
    );

    updateNewBadgeDisplay("none");
    updateJikaDisplay("none");
    updateGroupOwnerIconDisplay("none");
    updateMemberMedalDisplay("none");

    appState.vip.isCustom = true;
    appState.vip.selectedIcons = [];
    appState.vip.selectedIconVersions = {};

    updateBox7Visibility(false);
    updateNameColor("flowing-gold");

    setRadioValue("levelIconStyle", "none");
    setRadioValue("dynamicIconSelect", "none");
    setRadioValue("energyIconSelect", "none");
    setRadioValue("medalIconSelect", "none");
    setRadioValue("vipBadges", "none");
    setRadioValue("rankTitleSelect", "none");
    setRadioValue("newBadgeSelect", "none");
    setRadioValue("jikaSelect", "none");
    setRadioValue("groupOwnerSelect", "none");
    setRadioValue("memberMedalSelect", "none");

    const showBox7 = document.getElementById(
        "showBox7"
    );

    if (showBox7) {
        showBox7.checked = false;
    }

    const nameColorSelect = document.getElementById(
        "nameColorSelect"
    );

    if (nameColorSelect) {
        nameColorSelect.value = "flowing-gold";
    }

    refreshMinimalistRelatedUI();
    updateMinimalistModeButton();
    saveToLocalStorage();
}

function disableMinimalistMode() {
    const minimalistMode =
        appState.minimalistMode;

    if (!minimalistMode?.enabled) {
        return;
    }

    const previous =
        minimalistMode.previousState;

    minimalistMode.enabled = false;

    if (!previous) {
        minimalistMode.previousState = null;
        updateMinimalistModeButton();
        saveToLocalStorage();
        return;
    }

    const level = parseInt(
        appState.userInfo.qqLevel
    ) || 1;

    updateLevelIcons(
        level,
        previous.levelStyle || "none"
    );

    updateDynamicIconDisplay(
        previous.dynamicIcon
    );

    updateEnergyIconDisplay(
        previous.energyIcon
    );

    updateMedalIconDisplay(
        previous.medalIcon
    );

    updateVipBadgesDisplay(
        previous.vipBadge
    );

    updateRankTitleDisplay(
        previous.rankTitle,
        previous.rankTitleLevel || 260
    );

    updateNewBadgeDisplay(
        previous.newBadge
    );

    updateJikaDisplay(
        previous.jikaIcon
    );

    updateGroupOwnerIconDisplay(
        previous.groupOwnerIcon
    );

    updateMemberMedalDisplay(
        previous.memberMedal
    );

    updateBox7Visibility(
        previous.showBox7 !== false
    );

    updateNameColor(
        previous.nameColor || "flowing-gold"
    );

    if (previous.vip) {
        appState.vip = cloneStateValue(
            previous.vip
        );
    }

    setRadioValue(
        "levelIconStyle",
        previous.levelStyle
    );

    setRadioValue(
        "dynamicIconSelect",
        previous.dynamicIcon
    );

    setRadioValue(
        "energyIconSelect",
        previous.energyIcon
    );

    setRadioValue(
        "medalIconSelect",
        previous.medalIcon
    );

    setRadioValue(
        "vipBadges",
        previous.vipBadge
    );

    setRadioValue(
        "rankTitleSelect",
        previous.rankTitle
    );

    setRadioValue(
        "newBadgeSelect",
        previous.newBadge
    );

    setRadioValue(
        "jikaSelect",
        previous.jikaIcon
    );

    setRadioValue(
        "groupOwnerSelect",
        previous.groupOwnerIcon
    );

    setRadioValue(
        "memberMedalSelect",
        previous.memberMedal
    );

    const showBox7 = document.getElementById(
        "showBox7"
    );

    if (showBox7) {
        showBox7.checked =
            previous.showBox7 !== false;
    }

    const nameColorSelect = document.getElementById(
        "nameColorSelect"
    );

    if (nameColorSelect) {
        nameColorSelect.value =
            previous.nameColor ||
            "flowing-gold";
    }

    const vipModeSelect = document.getElementById(
        "vipIconDisplayMode"
    );

    if (vipModeSelect) {
        vipModeSelect.value =
            appState.vip.displayMode;
    }

    minimalistMode.previousState = null;

    refreshMinimalistRelatedUI();
    updateMinimalistModeButton();
    saveToLocalStorage();
}

function toggleMinimalistMode() {
    if (appState.minimalistMode?.enabled) {
        disableMinimalistMode();
        return false;
    }

    applyMinimalistMode();
    return true;
}

function loadUserData() {
    const data = {
        ...appState,
        ...appState.userInfo
    };

    if (data.avatar) {
        const avatarEl =
            document.getElementById("avatar");

        if (avatarEl) {
            avatarEl.src = data.avatar;
        }
    }

    if (
        data.storyImages &&
        data.storyImages.length
    ) {
        data.storyImages.forEach(
            (imgSrc, idx) => {
                if (!imgSrc) return;

                const img = document.getElementById(
                    `storyImage${idx + 1}`
                );

                if (img) {
                    img.src = imgSrc;
                    img.parentElement.classList.add(
                        "has-image"
                    );

                    const storyContainer =
                        document.querySelector(
                            ".story-container"
                        );

                    if (storyContainer) {
                        storyContainer.classList.add(
                            "has-stories"
                        );
                    }
                }
            }
        );
    }

    updateAvatarFrame(data.avatarFrame);

    [
        "name",
        "good",
        "gender",
        "age",
        "province",
        "city"
    ].forEach(key => {
        const element =
            document.getElementById(key);

        if (element) {
            element.textContent =
                data[key] || "";
        }
    });

    const qqNumberEl =
        document.getElementById("qq_number");

    if (qqNumberEl) {
        qqNumberEl.textContent =
            data.qqNumber;
    }

    const xcText =
        document.getElementById(
            "qqNumberText"
        );

    if (xcText) {
        xcText.textContent =
            data.qqNumber;
    }

    const companyEl =
        document.getElementById("company");

    if (companyEl) {
        companyEl.textContent =
            data.company || "";
    }

    const lhImg =
        document.getElementById("img19");

    if (lhImg) {
        lhImg.src = data.lhIcon;
        applyLhStyle(data.lhIcon);
    }

    updateLevelIcons(
        parseInt(data.qqLevel) || 1,
        data.levelStyle
    );

    const levelInput =
        document.getElementById(
            "levelInput"
        );

    if (levelInput) {
        levelInput.value =
            data.qqLevel;
    }

    const setCheck = (name, value) => {
        const element = document.querySelector(
            `input[name="${name}"][value="${value}"]`
        );

        if (element) {
            element.checked = true;
        }
    };

    setCheck(
        "levelIconStyle",
        data.levelStyle
    );

    setCheck(
        "vipBadges",
        data.vipBadge
    );

    setCheck(
        "dynamicIconSelect",
        data.dynamicIcon
    );

    setCheck(
        "energyIconSelect",
        data.energyIcon
    );

    setCheck(
        "medalIconSelect",
        data.medalIcon
    );

    setCheck(
        "rankTitleSelect",
        data.rankTitle
    );

    setCheck(
        "newBadgeSelect",
        data.newBadge
    );

    setCheck(
        "jikaSelect",
        data.jikaIcon
    );

    setCheck(
        "groupOwnerSelect",
        data.groupOwnerIcon
    );

    setCheck(
        "memberMedalSelect",
        data.memberMedal
    );

    const ncSelect =
        document.getElementById(
            "nameColorSelect"
        );

    if (ncSelect) {
        ncSelect.value =
            data.nameColor;
    }

    const vipModeSelect =
        document.getElementById(
            "vipIconDisplayMode"
        );

    if (vipModeSelect) {
        vipModeSelect.value =
            data.vip.displayMode;
    }

    updateVipBadgesDisplay(
        data.vipBadge
    );

    updateDynamicIconDisplay(
        data.dynamicIcon
    );

    updateEnergyIconDisplay(
        data.energyIcon
    );

    updateMedalIconDisplay(
        data.medalIcon
    );

    updateBox7Visibility(
        data.showBox7
    );

    updateIdIconDisplay(
        data.idIcon
    );

    updateIdNumberDisplay(
        data.idNumber
    );

    updateNameColor(
        data.nameColor
    );

    updateGroupOwnerIconDisplay(
        data.groupOwnerIcon
    );

    updateRankTitleDisplay(
        data.rankTitle,
        data.rankTitleLevel
    );

    updateNewBadgeDisplay(
        data.newBadge
    );

    updateJikaDisplay(
        data.jikaIcon
    );

    updateMemberMedalDisplay(
        data.memberMedal
    );

    updateQQNumberWidth(
        data.qqNumber
    );

    const signP = document.querySelector(
        ".box6 div p"
    );

    if (signP) {
        signP.textContent =
            data.sign ||
            "编辑个签，展示我的独特态度";
    }

    updateMinimalistModeButton();
}

function initEventListeners() {
    const rankLevelInput =
        document.getElementById(
            "rankTitleLevelInput"
        );

    if (rankLevelInput) {
        rankLevelInput.addEventListener(
            "input",
            event => {
                let value = parseInt(
                    event.target.value
                );

                if (value > 260) {
                    value = 260;
                    event.target.value = 260;
                }

                appState.rankTitleLevel =
                    value;

                updateRankTitleDisplay(
                    appState.rankTitle,
                    value
                );

                saveToLocalStorage();
            }
        );
    }

    const levelInputObj =
        document.getElementById(
            "levelInput"
        );

    if (levelInputObj) {
        levelInputObj.addEventListener(
            "input",
            event => {
                const value = parseInt(
                    event.target.value
                );

                appState.userInfo.qqLevel =
                    value || 1;

                updateLevelIcons(
                    value || 1,
                    appState.levelStyle
                );

                saveToLocalStorage();
            }
        );
    }

    const iosMinBtn =
        document.getElementById(
            "iosMinimalistBtn"
        );

    if (iosMinBtn) {
        iosMinBtn.addEventListener(
            "click",
            () => {
                const enabled =
                    toggleMinimalistMode();

                alert(
                    enabled
                        ? "已成功开启极简模式！"
                        : "已关闭极简模式，并恢复开启前的配置！"
                );
            }
        );
    }

    document.addEventListener(
        "change",
        event => {
            const target = event.target;
            const name = target.name;
            const value = target.value;

            const handlers = {
                avatarFrameSelect: () =>
                    updateAvatarFrame(value),

                nameColorSelect: () =>
                    updateNameColor(value),

                lhIconSelect: () => {
                    const element =
                        document.getElementById(
                            "img19"
                        );

                    if (element) {
                        element.src = value;
                        applyLhStyle(value);
                    }
                },

                idIconSelect: () =>
                    updateIdIconDisplay(value),

                levelIconStyle: () =>
                    updateLevelIcons(
                        parseInt(
                            document.getElementById(
                                "levelInput"
                            ).value || 1
                        ),
                        value
                    ),

                dynamicIconSelect: () =>
                    updateDynamicIconDisplay(
                        value
                    ),

                medalIconSelect: () =>
                    updateMedalIconDisplay(
                        value
                    ),

                energyIconSelect: () =>
                    updateEnergyIconDisplay(
                        value
                    ),

                vipBadges: () =>
                    updateVipBadgesDisplay(
                        value
                    ),

                rankTitleSelect: () => {
                    const level =
                        document.getElementById(
                            "rankTitleLevelInput"
                        ).value || 260;

                    updateRankTitleDisplay(
                        value,
                        level
                    );
                },

                newBadgeSelect: () =>
                    updateNewBadgeDisplay(
                        value
                    ),

                jikaSelect: () =>
                    updateJikaDisplay(value),

                groupOwnerSelect: () =>
                    updateGroupOwnerIconDisplay(
                        value
                    ),

                memberMedalSelect: () =>
                    updateMemberMedalDisplay(
                        value
                    ),

                vipIconDisplayMode: () => {
                    const wasCustom =
                        appState.vip.isCustom;

                    appState.vip.displayMode =
                        value;

                    if (!wasCustom) {
                        resetToDefaultDisplay();
                    }

                    renderIconOrderList();
                    updateVipIconsDisplay();

                    if (
                        typeof updateVipCategoryPreviews ===
                        "function"
                    ) {
                        updateVipCategoryPreviews();
                    }
                }
            };

            if (
                handlers[name] ||
                handlers[target.id]
            ) {
                (
                    handlers[name] ||
                    handlers[target.id]
                )();

                saveToLocalStorage();
            }

            if (
                target.id === "showBox7"
            ) {
                updateBox7Visibility(
                    target.checked
                );

                saveToLocalStorage();
            }

            if (
                target.id ===
                "idNumberInput"
            ) {
                updateIdNumberDisplay(
                    value
                );

                saveToLocalStorage();
            }
        }
    );

    const modal =
        document.getElementById(
            "editModal"
        );

    const form =
        document.getElementById(
            "editForm"
        );

    document.getElementById(
        "editButton"
    ).onclick = () => {
        modal.style.display = "block";
        populateEditForm();
        updateMinimalistModeButton();
    };

    document.querySelector(
        ".last button:nth-child(2)"
    ).onclick = () => {
        modal.style.display = "block";
        populateEditForm();
        updateMinimalistModeButton();
    };

    const closeBtn =
        document.querySelector(
            ".modal-header-ios .close"
        ) ||
        document.querySelector(".close");

    if (closeBtn) {
        closeBtn.onclick = () => {
            modal.style.display = "none";
        };
    }

    window.onclick = event => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    };

    form.onsubmit = event => {
        event.preventDefault();

        const getVal = id =>
            document.getElementById(id).value;

        [
            "name",
            "good",
            "gender",
            "age",
            "province",
            "city"
        ].forEach(key => {
            const value = getVal(
                key + "Input"
            );

            document.getElementById(
                key
            ).textContent = value;

            appState.userInfo[key] =
                value;
        });

        const qqValue =
            getVal("qqNumberInput");

        document.getElementById(
            "qq_number"
        ).textContent = qqValue;

        const xcText =
            document.getElementById(
                "qqNumberText"
            );

        if (xcText) {
            xcText.textContent =
                qqValue;
        }

        updateQQNumberWidth(
            qqValue
        );

        appState.userInfo.qqNumber =
            qqValue;

        const companyEl =
            document.getElementById(
                "company"
            );

        if (companyEl) {
            companyEl.textContent =
                getVal("companyInput");
        }

        appState.userInfo.company =
            getVal("companyInput");

        const sign =
            getVal("personalSignInput");

        document.querySelector(
            ".box6 div p"
        ).textContent =
            sign ||
            "编辑个签，展示我的独特态度";

        appState.userInfo.sign =
            sign;

        appState.userInfo.qqLevel =
            getVal("levelInput");

        const avatarInput =
            document.getElementById(
                "avatarInput"
            );

        if (avatarInput.files[0]) {
            const reader =
                new FileReader();

            reader.onload = readerEvent => {
                document.getElementById(
                    "avatar"
                ).src =
                    readerEvent.target.result;

                appState.userInfo.avatar =
                    readerEvent.target.result;

                saveToLocalStorage();
            };

            reader.readAsDataURL(
                avatarInput.files[0]
            );
        }

        ["1", "2", "3", "4"].forEach(
            (index, arrayIndex) => {
                const input =
                    document.getElementById(
                        `storyImageInput${index}`
                    );

                if (!input?.files[0]) {
                    return;
                }

                const reader =
                    new FileReader();

                reader.onload =
                    readerEvent => {
                        const image =
                            document.getElementById(
                                `storyImage${index}`
                            );

                        image.src =
                            readerEvent.target.result;

                        image.parentElement.classList.add(
                            "has-image"
                        );

                        document.querySelector(
                            ".story-container"
                        ).classList.add(
                            "has-stories"
                        );

                        appState.userInfo.storyImages[
                            arrayIndex
                        ] =
                            readerEvent.target.result;

                        saveToLocalStorage();
                    };

                reader.readAsDataURL(
                    input.files[0]
                );
            }
        );

        saveToLocalStorage();
        modal.style.display = "none";
    };

    const minimalistButton =
        document.getElementById(
            "minimalistBtn"
        );

    if (minimalistButton) {
        minimalistButton.onclick = () => {
            toggleMinimalistMode();
        };
    }

    const idIconImg =
        document.getElementById(
            "idIcon"
        );

    const idIconPresets =
        CONFIG.idIcons.map(
            item => item.value
        );

    if (idIconImg) {
        idIconImg.onclick = () => {
            appState.idIconIndex =
                (
                    appState.idIconIndex +
                    1
                ) %
                idIconPresets.length;

            const value =
                idIconPresets[
                    appState.idIconIndex
                ];

            updateIdIconDisplay(
                value
            );

            const radio =
                document.querySelector(
                    `input[name="idIconSelect"][value="${value}"]`
                );

            if (radio) {
                radio.checked = true;
            }

            saveToLocalStorage();
        };
    }

    document.querySelectorAll(
        ".vip-selector-item"
    ).forEach(item => {
        item.onclick = () =>
            openVipSubPage(
                item.dataset.category
            );
    });

    const subPageBack =
        document.querySelector(
            ".vip-subpage-back"
        );

    if (subPageBack) {
        subPageBack.onclick =
            closeVipSubPage;
    }

    const subPageClear =
        document.getElementById(
            "vipSubPageClear"
        );

    if (subPageClear) {
        subPageClear.onclick = () => {
            appState.vip.isCustom = true;

            const idsToRemove =
                vipIconsConfig
                    .filter(
                        item =>
                            item.category ===
                            appState.currentVipCategory
                    )
                    .map(item => item.id);

            appState.vip.selectedIcons =
                appState.vip.selectedIcons.filter(
                    id =>
                        !idsToRemove.includes(
                            id
                        )
                );

            renderSubPageIcons();
        };
    }

    const deselectAllBtn =
        document.getElementById(
            "vipIconDeselectAll"
        );

    if (deselectAllBtn) {
        deselectAllBtn.onclick = () => {
            appState.vip.isCustom = true;
            appState.vip.selectedIcons = [];
            appState.vip.selectedIconVersions =
                {};

            renderIconOrderList();
            updateVipIconsDisplay();

            if (
                typeof updateVipCategoryPreviews ===
                "function"
            ) {
                updateVipCategoryPreviews();
            }

            saveToLocalStorage();
        };
    }

    const resetDefaultBtn =
        document.getElementById(
            "resetToDefault"
        );

    if (resetDefaultBtn) {
        resetDefaultBtn.onclick = () => {
            resetToDefaultDisplay();
            renderIconOrderList();
            updateVipIconsDisplay();

            if (
                typeof updateVipCategoryPreviews ===
                "function"
            ) {
                updateVipCategoryPreviews();
            }

            saveToLocalStorage();
        };
    }

    updateMinimalistModeButton();
}

function populateEditForm() {
    const getText = id =>
        document.getElementById(id).textContent;

    const setVal = (id, value) => {
        const element =
            document.getElementById(id);

        if (element) {
            element.value = value;
        }
    };

    setVal(
        "nameInput",
        getText("name") || "用户昵称"
    );

    setVal(
        "goodInput",
        getText("good") || "88"
    );

    setVal(
        "qqNumberInput",
        getText("qq_number") || "1234567"
    );

    setVal(
        "companyInput",
        getText("company") || ""
    );

    [
        "gender",
        "age",
        "province",
        "city"
    ].forEach(key => {
        setVal(
            key + "Input",
            getText(key) || ""
        );
    });

    const sign = document.querySelector(
        ".box6 div p"
    ).textContent;

    setVal(
        "personalSignInput",
        sign ===
            "编辑个签，展示我的独特态度"
            ? ""
            : sign
    );

    setVal(
        "idNumberInput",
        appState.idNumber
    );

    setVal(
        "levelInput",
        appState.userInfo.qqLevel || 1
    );

    setVal(
        "rankTitleLevelInput",
        appState.rankTitleLevel || 260
    );

    const showBox7 =
        document.getElementById(
            "showBox7"
        );

    if (showBox7) {
        showBox7.checked =
            document.querySelector(
                ".box.box7"
            ).style.display !== "none";
    }

    const checkRadio = (
        name,
        value,
        matchSource
    ) => {
        let element = document.querySelector(
            `input[name="${name}"][value="${value}"]`
        );

        if (
            !element &&
            matchSource
        ) {
            document.querySelectorAll(
                `input[name="${name}"]`
            ).forEach(radio => {
                if (
                    matchSource.includes(
                        radio.value.replace(
                            "./",
                            ""
                        )
                    )
                ) {
                    element = radio;
                }
            });
        }

        if (element) {
            element.checked = true;
        } else {
            const none =
                document.querySelector(
                    `input[name="${name}"][value="none"]`
                );

            if (none) {
                none.checked = true;
            }
        }
    };

    checkRadio(
        "avatarFrameSelect",
        appState.avatarFrame
    );

    const nameColorSelect =
        document.getElementById(
            "nameColorSelect"
        );

    if (nameColorSelect) {
        nameColorSelect.value =
            appState.nameColor;
    }

    const getSrc = id =>
        document.getElementById(id)?.src ||
        "";

    const lhSelect =
        document.getElementById(
            "lhIconSelect"
        );

    const lhWrapper =
        document.getElementById(
            "lhWrapperXc"
        );

    const currentLh =
        getSrc("img19") ||
        (
            lhWrapper?.style.display !==
            "none"
                ? "4.png"
                : ""
        );

    if (
        lhSelect &&
        currentLh
    ) {
        for (
            const option of
            lhSelect.options
        ) {
            if (
                currentLh.includes(
                    option.value.replace(
                        /^\.\//,
                        ""
                    )
                )
            ) {
                lhSelect.value =
                    option.value;

                break;
            }
        }
    }

    checkRadio(
        "idIconSelect",
        null,
        appState.idIcon
    );

    checkRadio(
        "dynamicIconSelect",
        null,
        getSrc("dynamicIcon")
    );

    checkRadio(
        "medalIconSelect",
        null,
        getSrc("medalIcon")
    );

    checkRadio(
        "energyIconSelect",
        null,
        getSrc("energyIcon")
    );

    const rankSrc =
        appState.rankTitle || "none";

    let rankMatched = false;

    document.querySelectorAll(
        'input[name="rankTitleSelect"]'
    ).forEach(radio => {
        if (
            radio.value === "none" ||
            rankSrc === "none"
        ) {
            return;
        }

        const baseSrc =
            radio.value.replace(
                /\/\d+\.png$/,
                "/"
            );

        const currentBase =
            rankSrc.replace(
                /\/\d+\.png$/,
                "/"
            );

        if (
            currentBase === baseSrc
        ) {
            radio.checked = true;
            rankMatched = true;
        }
    });

    if (!rankMatched) {
        const noneRank =
            document.querySelector(
                'input[name="rankTitleSelect"][value="none"]'
            );

        if (noneRank) {
            noneRank.checked = true;
        }
    }

    checkRadio(
        "newBadgeSelect",
        null,
        getSrc("newBadgeIcon")
    );

    checkRadio(
        "jikaSelect",
        null,
        getSrc("jikaIcon")
    );

    checkRadio(
        "groupOwnerSelect",
        null,
        getSrc("groupOwnerIcon")
    );

    checkRadio(
        "memberMedalSelect",
        null,
        getSrc("memberMedalIcon")
    );

    const levelSource =
        document.querySelector(
            "#levelIconContainer img"
        )?.src || "";

    let levelMatched = false;

    document.querySelectorAll(
        'input[name="levelIconStyle"]'
    ).forEach(radio => {
        if (
            radio.value !== "none" &&
            levelSource.includes(
                `/item/${radio.value}/`
            )
        ) {
            radio.checked = true;
            levelMatched = true;
        }
    });

    if (!levelMatched) {
        const noneLevel =
            document.querySelector(
                'input[name="levelIconStyle"][value="none"]'
            );

        if (noneLevel) {
            noneLevel.checked = true;
        }
    }

    const badge =
        document.getElementById(
            "vipBadgeIcon"
        );

    if (
        badge &&
        badge.style.display !== "none"
    ) {
        checkRadio(
            "vipBadges",
            badge.src,
            badge.src
        );
    } else {
        const noneBadge =
            document.querySelector(
                'input[name="vipBadges"][value="none"]'
            );

        if (noneBadge) {
            noneBadge.checked = true;
        }
    }

    updateMinimalistModeButton();
}

document.addEventListener(
    "DOMContentLoaded",
    () => {
        renderStaticStructure();
        loadFromLocalStorage();
        initHtmlContent();
        loadUserData();
        initEventListeners();

        if (
            !appState.vip.isCustom &&
            appState.vip.selectedIcons.length ===
                0
        ) {
            resetToDefaultDisplay();
        }

        renderIconOrderList();
        updateVipIconsDisplay();

        if (
            typeof updateVipCategoryPreviews ===
            "function"
        ) {
            updateVipCategoryPreviews();
        }

        updateMinimalistModeButton();
        initAnnouncement();

        const tabs =
            document.querySelectorAll(
                ".tab-button"
            );

        const contents =
            document.querySelectorAll(
                ".tab-content"
            );

        tabs.forEach(button => {
            button.onclick = event => {
                event.preventDefault();

                tabs.forEach(tab => {
                    tab.classList.remove(
                        "active"
                    );
                });

                contents.forEach(content => {
                    content.classList.remove(
                        "active"
                    );
                });

                button.classList.add(
                    "active"
                );

                document.querySelector(
                    `[data-tab-content="${button.dataset.tab}"]`
                )?.classList.add("active");
            };
        });

        if (tabs.length) {
            tabs[0].click();
        }
    }
);
