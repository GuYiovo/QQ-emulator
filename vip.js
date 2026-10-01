// vip.js
// 专门处理 VIP特权图标的拖拽排序、弹窗副页面渲染与类别预览显示

const VIP_CATEGORY_NAMES = {
    all: '全部', svip: '超级会员', big_member: '大会员', couple: '情侣',
    yellow: '黄钻', card: '集卡', general: '综合业务', gray: '灰色'
};

function resetToDefaultDisplay() {
    appState.vip.isCustom = false;
    const cfg = defaultDisplayConfig[appState.vip.displayMode] || defaultDisplayConfig['color'];
    appState.vip.selectedIcons = [...cfg.icons];
    appState.vip.selectedIconVersions = {...cfg.versions};

    const targetUrls = [
        "https://qqvip-web.cdn-go.cn/imgcache_privilege/latest/filmv7/gray_0.png",
        "https://qqvip-web.cdn-go.cn/imgcache_privilege/latest/svipmuv3/gray_0.png",
        "https://qqvip-web.cdn-go.cn/imgcache_privilege/latest/redv2/gray_0.png"
    ];

    if (typeof vipIconsConfig !== 'undefined') {
        vipIconsConfig.forEach(icon => {
            if (targetUrls.includes(icon.colorSrc) || targetUrls.includes(icon.graySrc)) {
                if (!appState.vip.selectedIcons.includes(icon.id)) {
                    appState.vip.selectedIcons.push(icon.id);
                }
                if (targetUrls.includes(icon.graySrc) && !targetUrls.includes(icon.colorSrc)) {
                    if (appState.vip.displayMode === 'mixed') {
                        let vers = appState.vip.selectedIconVersions[icon.id] || [];
                        if (!vers.includes('gray')) vers.push('gray');
                        appState.vip.selectedIconVersions[icon.id] = vers;
                    } else {
                        appState.vip.selectedIconVersions[icon.id] = 'gray';
                    }
                } else if (icon.category === 'gray') {
                    if (appState.vip.displayMode === 'mixed') {
                        let vers = appState.vip.selectedIconVersions[icon.id] || [];
                        if (!vers.includes('color')) vers.push('color');
                        appState.vip.selectedIconVersions[icon.id] = vers;
                    } else {
                        appState.vip.selectedIconVersions[icon.id] = 'gray';
                    }
                }
            }
        });
    }
}

// 渲染每个选项器右侧的预览图标
function updateVipCategoryPreviews() {
    const categories = ['big_member', 'svip', 'yellow', 'couple', 'card', 'general', 'gray'];
    const mode = appState.vip.displayMode;
    
    categories.forEach(cat => {
        const previewEl = document.getElementById(`preview-${cat}`);
        if (!previewEl) return;
        previewEl.innerHTML = '';
        
        const selectedInCat = appState.vip.selectedIcons.filter(id => {
            const icon = vipIconsConfig.find(i => i.id === id);
            return icon && icon.category === cat;
        });

        if (selectedInCat.length === 0) {
            previewEl.innerHTML = '<span class="no-icon">未选择</span>';
        } else {
            // 最多预览3个，超出显示 +N
            selectedInCat.slice(0, 3).forEach(id => {
                const icon = vipIconsConfig.find(i => i.id === id);
                let vers = [].concat(appState.vip.selectedIconVersions[id] || mode);
                let v = vers[0];
                let src = icon.colorSrc;
                if (v === 'gray' && icon.graySrc) src = icon.graySrc;
                else if (v === 'gray' && icon.category === 'gray') src = icon.colorSrc;
                
                const img = document.createElement('img');
                img.src = src;
                previewEl.appendChild(img);
            });
            if (selectedInCat.length > 3) {
                const more = document.createElement('span');
                more.className = 'no-icon';
                more.textContent = `+${selectedInCat.length - 3}`;
                previewEl.appendChild(more);
            }
        }
    });
}

function openVipSubPage(category) {
    appState.currentVipCategory = category;
    const title = document.getElementById('vipSubPageTitle');
    if (title) title.textContent = `${VIP_CATEGORY_NAMES[category]}图标选择`;
    
    renderSubPageIcons();
    const subPage = document.getElementById('vipSubPage');
    if (subPage) subPage.classList.add('show');
}

function closeVipSubPage() {
    const subPage = document.getElementById('vipSubPage');
    if (subPage) subPage.classList.remove('show');
    
    updateVipCategoryPreviews();
    renderIconOrderList();
    updateVipIconsDisplay();
    if (typeof saveToLocalStorage === 'function') saveToLocalStorage();
}

function renderSubPageIcons() {
    const container = document.getElementById('vip-subpage-grid');
    if (!container) return;
    
    const mode = appState.vip.displayMode;
    const icons = vipIconsConfig.filter(i => i.category === appState.currentVipCategory);
    
    const createGridItem = (icon, ver, isSelected) => {
        let src = ver === 'gray' ? icon.graySrc : icon.colorSrc;
        if (ver === 'gray' && !icon.graySrc && icon.category === 'gray') src = icon.colorSrc;
        
        const badge = (mode === 'mixed') ? `<div class="ver-badge" style="background:${ver==='color'?'#FF9500':'#8E8E93'}">${ver==='color'?'彩':'灰'}</div>` : '';
        return `
        <div class="vip-icon-grid-item ${isSelected ? 'selected' : ''}" onclick="toggleSubPageIcon('${icon.id}', '${ver}')">
            ${badge}
            <img src="${src}">
            <span>${icon.name}</span>
        </div>`;
    };

    if (mode === 'mixed') {
        const col = [], gry = [];
        icons.forEach(i => {
            const vers = [].concat(appState.vip.selectedIconVersions[i.id] || []);
            col.push(createGridItem(i, 'color', appState.vip.selectedIcons.includes(i.id) && vers.includes('color')));
            if (i.graySrc || i.category === 'gray') {
                gry.push(createGridItem(i, 'gray', appState.vip.selectedIcons.includes(i.id) && vers.includes('gray')));
            }
        });
        container.innerHTML = `
            <div style="grid-column: span 3; font-weight: bold; color: rgba(255,255,255,0.7); margin-top: 10px; font-size: 14px;">彩色图标</div>
            ${col.join('')}
            <div style="grid-column: span 3; font-weight: bold; color: rgba(255,255,255,0.7); margin-top: 20px; font-size: 14px;">灰色图标</div>
            ${gry.join('')}
        `;
    } else {
        container.innerHTML = icons.map(i => {
            if (mode === 'gray' && !i.graySrc && i.category !== 'gray') return '';
            return createGridItem(i, mode, appState.vip.selectedIcons.includes(i.id));
        }).join('');
    }
}

function toggleSubPageIcon(id, ver) {
    appState.vip.isCustom = true;
    const mode = appState.vip.displayMode;
    if (mode === 'mixed') {
        let vers = [].concat(appState.vip.selectedIconVersions[id] || []).filter(v => v);
        if (vers.includes(ver)) {
            vers = vers.filter(v => v !== ver);
            if (!vers.length) {
                const idx = appState.vip.selectedIcons.indexOf(id);
                if (idx > -1) appState.vip.selectedIcons.splice(idx, 1);
                delete appState.vip.selectedIconVersions[id];
            } else {
                appState.vip.selectedIconVersions[id] = vers;
            }
        } else {
            if (!appState.vip.selectedIcons.includes(id)) appState.vip.selectedIcons.push(id);
            appState.vip.selectedIconVersions[id] = [...vers, ver];
        }
    } else {
        const idx = appState.vip.selectedIcons.indexOf(id);
        if (idx > -1) {
            appState.vip.selectedIcons.splice(idx, 1);
            delete appState.vip.selectedIconVersions[id];
        } else {
            appState.vip.selectedIcons.push(id);
            appState.vip.selectedIconVersions[id] = mode;
        }
    }
    renderSubPageIcons();
}

function renderIconOrderList() {
    const container = document.getElementById('vip-icon-order-list');
    if (!container) return;
    const mode = appState.vip.displayMode;
    
    // 只展示已选的内容进行拖拽排序
    const selectedList = appState.vip.selectedIcons.map(id => vipIconsConfig.find(i => i.id === id)).filter(i => i);
    
    if (selectedList.length === 0) {
        container.innerHTML = '<div style="color: rgba(255,255,255,0.4); font-size: 12px; padding: 15px; width: 100%; text-align: center;">您还未从上方任何类别中选择图标</div>';
        return;
    }

    const createItem = (icon, ver) => {
        let src = icon.colorSrc;
        if (ver === 'gray' && icon.graySrc) src = icon.graySrc;
        else if (ver === 'gray' && icon.category === 'gray') src = icon.colorSrc;
        return `
        <div class="draggable-icon selected" data-icon-id="${icon.id}" data-version="${ver}" draggable="true">
            <img src="${src}" style="width: 32px; height: 32px; object-fit: contain;">
            <span>${icon.name}${mode === 'mixed' ? (ver === 'color' ? '(彩)' : '(灰)') : ''}</span>
        </div>`;
    };

    if (mode === 'mixed') {
        const items = [];
        selectedList.forEach(i => {
            const vers = [].concat(appState.vip.selectedIconVersions[i.id] || []);
            if (vers.includes('color')) items.push(createItem(i, 'color'));
            if (vers.includes('gray')) items.push(createItem(i, 'gray'));
        });
        container.innerHTML = items.join('');
    } else {
        container.innerHTML = selectedList.map(i => createItem(i, mode)).join('');
    }
    
    let dragged = null;
    container.querySelectorAll('.draggable-icon').forEach(item => {
        item.ondragstart = (e) => { dragged = item; e.dataTransfer.effectAllowed = 'move'; item.style.opacity = '0.5'; };
        item.ondragend = () => { item.style.opacity = '1'; dragged = null; };
        item.ondragover = (e) => { e.preventDefault(); e.dataTransfer.dropEffect = 'move'; };
        item.ondrop = (e) => {
            e.preventDefault();
            if (dragged && dragged !== item) {
                appState.vip.isCustom = true;
                const srcIdx = appState.vip.selectedIcons.indexOf(dragged.dataset.iconId);
                const tgtIdx = appState.vip.selectedIcons.indexOf(item.dataset.iconId);
                if (srcIdx > -1 && tgtIdx > -1) {
                    [appState.vip.selectedIcons[srcIdx], appState.vip.selectedIcons[tgtIdx]] = [appState.vip.selectedIcons[tgtIdx], appState.vip.selectedIcons[srcIdx]];
                    renderIconOrderList(); 
                    updateVipIconsDisplay();
                    updateVipCategoryPreviews(); 
                    if (typeof saveToLocalStorage === 'function') saveToLocalStorage();
                }
            }
        };
    });
}

function updateVipIconsDisplay() {
    const container = document.querySelector('.box8 .box7_right');
    const box8 = document.querySelector('.box.box8');
    if (box8) box8.style.display = appState.vip.selectedIcons.length ? 'flex' : 'none';
    if (!container) return;
    
    container.innerHTML = '';
    appState.vip.selectedIcons.forEach(id => {
        const icon = vipIconsConfig.find(c => c.id === id);
        if (!icon) return;
        const vers = [].concat(appState.vip.selectedIconVersions[id] || appState.vip.displayMode);
        vers.forEach(v => {
            if (v === 'gray' && !icon.graySrc && icon.category !== 'gray') return;

            let src = icon.colorSrc;
            if (v === 'gray' && icon.graySrc) src = icon.graySrc;
            else if (v === 'gray' && icon.category === 'gray') src = icon.colorSrc;
            
            const img = document.createElement('img');
            img.src = src;
            img.alt = icon.name; 
            img.style.display = 'inline-block';
            img.style.setProperty('width', 'auto', 'important');
            
            if (v === 'gray' || icon.category === 'gray') {
                img.style.setProperty('height', '1.35rem', 'important');
                img.style.setProperty('transform', 'translateY(3px)', 'important');
            } else {
                img.style.setProperty('height', '2.2rem', 'important');
            }

            container.appendChild(img);
        });
    });
}
