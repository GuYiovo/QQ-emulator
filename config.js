// config.js
// 全局配置文件：用于存储所有素材链接、列表和配置项

const avatarFrameIds = [
    134257, 159582, 157023, 13663, 161670, 168786, 130737, 160124, 157309, 157272, 164025, 163656, 167873, 158569, 162936, 159295, 162802, 157254, 160355, 167769, 164313, 167602, 165755, 162233, 165855,
    174347, 172661, 159003, 175937, 162676, 110718, 163191, 175070, 112893, 167560, 171850, 165853, 125720, 173646, 170898, 172514, 158025, 166523, 168087, 170676, 158696, 174149, 169508, 105468, 168885, 163514, 161952, 164332, 161196, 175652, 172558, 141983, 141515, 150002, 161681, 169812, 176087, 168905, 165075, 165449, 157012, 157847, 140088, 165327, 170538, 175711, 122605, 109403, 164365, 175021, 163188, 175247, 140234, 168167, 163670, 123772, 157397, 157350, 156576, 172990, 160933, 167928, 158791, 170087, 171301
];

const vipBadgeLinks = [
    "https://tianquan.gtimg.cn/gamenameplate/item/121/88e4b96e68742013833e5ca1f6a15819.png", "https://tianquan.gtimg.cn/shoal/qqgxh/0ffd5652-9db9-4e54-a2db-bcb813ecf7bd.png", "https://tianquan.gtimg.cn/shoal/bvip/81445e99-61c2-4d8d-8eca-105dfed1fd06.png", "https://tianquan.gtimg.cn/shoal/bvip/e33ca855-0b64-4ca3-bf84-92fd6ab79862.png", "https://tianquan.gtimg.cn/shoal/bvip/45bcfc67-5065-4f11-bd6c-391822608963.png", "https://tianquan.gtimg.cn/shoal/bvip/08da0705-9eb9-433b-8dc1-bb52ab4b781d.png", "https://tianquan.gtimg.cn/shoal/bvip/2b5ad3fd-d955-4ddd-8af5-f2aa160df728.png", "https://tianquan.gtimg.cn/shoal/bvip/f5e3c9f0-01e1-438d-9db8-a88c667df0f4.png", "https://tianquan.gtimg.cn/shoal/bvip/2193b44c-e058-4e96-87d5-29203303b228.png", "https://tianquan.gtimg.cn/shoal/bvip/6afec44f-42b1-412a-945c-3dcfe8669071.png", "https://tianquan.gtimg.cn/shoal/qqgxh/104bc5e4-9909-4260-a8d4-2093a80516c1.png", "https://tianquan.gtimg.cn/shoal/qqgxh/bd99b6d5-f432-42d2-836e-e9e4a631ec4b.png", "https://tianquan.gtimg.cn/shoal/qqgxh/9fbafd15-a254-4c14-a6db-5587b8b28002.png", "https://tianquan.gtimg.cn/shoal/qqgxh/ca9376f3-915f-4c5b-8183-7598232ae496.png", "https://tianquan.gtimg.cn/shoal/qqgxh/e835e12b-67f4-435a-b6be-c18d0b05d2fe.png", "https://tianquan.gtimg.cn/shoal/qqgxh/4cfa7aa2-186d-43e4-add3-b80750914082.png", "https://tianquan.gtimg.cn/shoal/qqgxh/d59aabce-8025-4c0c-a6e5-a690ca36e319.png", "https://tianquan.gtimg.cn/shoal/qqgxh/696b77f1-de8b-4c5a-b9ca-088e603b1b1b.png", "https://tianquan.gtimg.cn/shoal/qqgxh/0597d09c-0b2e-4c50-a243-dfc0ab0b85b8.png", "https://tianquan.gtimg.cn/shoal/qqgxh/6d0d37c6-da35-4ab6-9409-e71bebd5523f.png", "https://tianquan.gtimg.cn/shoal/qqgxh/7762ece8-8f9a-4693-8926-af303e936210.png", "https://tianquan.gtimg.cn/shoal/qqgxh/39748109-fd37-4721-9c80-7b66e3b07978.png", "https://tianquan.gtimg.cn/shoal/qqgxh/207c2295-3943-4540-8826-a36de6db3936.png", "https://tianquan.gtimg.cn/shoal/qqgxh/84f911bf-36f8-420d-a244-3df1dae7e5db.png", "https://tianquan.gtimg.cn/shoal/qqgxh/908ee194-1b8b-4370-9b35-80ab88d73351.png", "https://tianquan.gtimg.cn/shoal/qqgxh/e450297c-4cd7-4038-9598-2c2a423e45e6.png", "https://tianquan.gtimg.cn/shoal/qqgxh/5af28db1-ebf9-4b0d-bcf9-ffa27502123d.png", "https://tianquan.gtimg.cn/shoal/qqgxh/a7239aff-eca8-4739-b114-0909015e881f.png", "https://tianquan.gtimg.cn/shoal/qqgxh/8f708110-e8ab-4f0e-a8d7-c487df3b3e69.png", "https://tianquan.gtimg.cn/shoal/qqgxh/f27bfa3d-1c04-4edf-bfac-99673339d461.png", "https://tianquan.gtimg.cn/shoal/qqgxh/f59fd760-ff26-4db0-95b5-a62196453e59.png", "https://tianquan.gtimg.cn/shoal/qqgxh/c735224e-eb56-469c-abde-b8e70d831be7.png", "https://tianquan.gtimg.cn/shoal/qqgxh/df8a7b84-ed03-448c-8f7e-c4dca2d7b155.png", "https://tianquan.gtimg.cn/shoal/qqgxh/b5567f4c-a6f6-4e90-a09b-f6e543551e32.png", "https://tianquan.gtimg.cn/shoal/qqgxh/5272f779-8256-4a23-b701-e7a8bc3b06dc.png", "https://tianquan.gtimg.cn/shoal/qqgxh/daf42265-d2c2-4d92-83ff-bcc73e819792.png", "https://tianquan.gtimg.cn/shoal/vaclient/0307da8f-f51b-4e7c-9eea-8ad78e7e404b.png", "https://tianquan.gtimg.cn/gamenameplate/item/16/0b1f3571f4afce470c2589e4835a0bb6.png", "https://tianquan.gtimg.cn/gamenameplate/item/18/af135e29cc01952cfeae5f8604aba2d2.png", "https://tianquan.gtimg.cn/shoal/qqgxh/4000e081-3451-4642-8d7b-866d683cef19.png", "https://tianquan.gtimg.cn/shoal/qqgxh/c00303c1-7b32-4182-a19c-081acbe655b4.png"
];

// 已合并并去重了你上传的所有新铭牌
const nameplateUrls = [
    "https://tianquan.gtimg.cn/namePlate/item/20748/258/10.png?nowebp&nosharpp", "https://tianquan.gtimg.cn/namePlate/item/20745/258/10.png?nowebp&nosharpp", "https://tianquan.gtimg.cn/namePlate/item/983d16fd-f77b-41da-9085-4eee47b2f7aa/259/9.png?nowebp&nosharpp",
    "https://tianquan.gtimg.cn/namePlate/item/20592/259/9.png?nowebp&nosharpp", "https://tianquan.gtimg.cn/namePlate/item/20652/259/9.png?nowebp&nosharpp", "https://tianquan.gtimg.cn/namePlate/item/3716f402-9dd4-4ac1-af78-8abc21fbf4f7/259/9.png?nowebp&nosharpp",
    "https://tianquan.gtimg.cn/namePlate/item/20728/259/9.png?nowebp&nosharpp", "https://tianquan.gtimg.cn/namePlate/item/20230/259/9.png?nowebp&nosharpp", "https://tianquan.gtimg.cn/namePlate/item/20229/259/9.png?nowebp&nosharpp",
    "https://tianquan.gtimg.cn/namePlate/item/20509/258/10.png?nowebp&nosharpp", "https://tianquan.gtimg.cn/namePlate/item/20550/258/10.png?nowebp&nosharpp", "https://tianquan.gtimg.cn/namePlate/item/20695/258/10.png?nowebp&nosharpp",
    "https://tianquan.gtimg.cn/namePlate/item/c4b4217f-014c-4075-92c5-f3aa1a255fd7/258/10.png?nowebp&nosharpp", "https://tianquan.gtimg.cn/namePlate/item/b218e204-1637-457b-a218-b68b14257e74/259/9.png?nowebp&nosharpp", "https://tianquan.gtimg.cn/namePlate/item/33f47d5a-59b3-484b-8c0d-79033d329c0c/258/10.png?nowebp&nosharpp",
    "https://tianquan.gtimg.cn/namePlate/item/2f607d92-5caa-4e59-a561-26c1613f0294/258/10.png?nowebp&nosharpp", "https://tianquan.gtimg.cn/namePlate/item/65aa7c63-48fe-444b-b33f-dfd4bd78670a/258/10.png?nowebp&nosharpp", "https://tianquan.gtimg.cn/namePlate/item/20455/258/9.png?nowebp&nosharpp",
    "https://tianquan.gtimg.cn/namePlate/item/20544/259/9.png?nowebp&nosharpp", "https://tianquan.gtimg.cn/namePlate/item/20702/259/9.png?nowebp&nosharpp", "https://tianquan.gtimg.cn/namePlate/item/a01663ae-06e6-4e93-9ae1-2fa9e0fca421/258/10.png?nowebp&nosharpp",
    "https://tianquan.gtimg.cn/namePlate/item/09636dad-2fa0-4934-ab6f-87f0a40909fc/258/10.png?nowebp&nosharpp", "https://tianquan.gtimg.cn/namePlate/item/20705/259/9.png?nowebp&nosharpp", "https://tianquan.gtimg.cn/namePlate/item/20731/258/9.png?nowebp&nosharpp",
    "https://tianquan.gtimg.cn/namePlate/item/20744/259/9.png?nowebp&nosharpp", "https://tianquan.gtimg.cn/namePlate/item/20359/259/9.png?nowebp&nosharpp", "https://tianquan.gtimg.cn/namePlate/item/20696/259/9.png?nowebp&nosharpp",
    "https://tianquan.gtimg.cn/namePlate/item/20401/259/9.png?nowebp&nosharpp", "https://tianquan.gtimg.cn/namePlate/item/20757/259/9.png?nowebp&nosharpp", "https://tianquan.gtimg.cn/namePlate/item/20735/259/9.png?nowebp&nosharpp",
    "https://tianquan.gtimg.cn/namePlate/item/20703/259/9.png?nowebp&nosharpp", "https://tianquan.gtimg.cn/namePlate/item/20082/3/9.png?nowebp&nosharpp", "https://tianquan.gtimg.cn/namePlate/item/20152/3/9.png?nowebp&nosharpp",
    "https://tianquan.gtimg.cn/namePlate/item/20151/3/9.png?nowebp&nosharpp", "https://tianquan.gtimg.cn/namePlate/item/20150/3/9.png?nowebp&nosharpp", "https://tianquan.gtimg.cn/namePlate/item/20155/3/9.png?nowebp&nosharpp",
    "https://tianquan.gtimg.cn/namePlate/item/20164/3/9.png?nowebp&nosharpp", "https://tianquan.gtimg.cn/namePlate/item/20236/3/9.png?nowebp&nosharpp", "https://tianquan.gtimg.cn/namePlate/item/20293/3/9.png?nowebp&nosharpp",
    "https://tianquan.gtimg.cn/namePlate/item/4/259/8.png?nowebp&nosharpp", "https://tianquan.gtimg.cn/namePlate/item/20010/259/9.png?nowebp&nosharpp", "https://tianquan.gtimg.cn/namePlate/item/20185/258/10.png?nowebp&nosharpp",
    "https://tianquan.gtimg.cn/namePlate/item/20736/259/9.png?nowebp&nosharpp", "https://tianquan.gtimg.cn/namePlate/item/20427/259/9.png?nowebp&nosharpp", "https://tianquan.gtimg.cn/namePlate/item/20680/259/9.png?nowebp&nosharpp",
    "https://tianquan.gtimg.cn/namePlate/item/20018/259/9.png?nowebp&nosharpp", "https://tianquan.gtimg.cn/namePlate/item/20283/259/9.png?nowebp&nosharpp", "https://tianquan.gtimg.cn/namePlate/item/c2ede4e6-9c8e-4212-a3f0-90a4da2639f1/258/10.png?nowebp&nosharpp",
    "https://tianquan.gtimg.cn/namePlate/item/20366/3/9.png?nowebp&nosharpp", "https://tianquan.gtimg.cn/namePlate/item/20465/259/8.png?nowebp&nosharpp", "https://tianquan.gtimg.cn/namePlate/item/20191/258/10.png?nowebp&nosharpp",
    "https://tianquan.gtimg.cn/namePlate/item/20719/259/9.png?nowebp&nosharpp", "https://tianquan.gtimg.cn/namePlate/item/20188/258/10.png?nowebp&nosharpp", "https://tianquan.gtimg.cn/namePlate/item/20361/259/7.png?nowebp&nosharpp",
    "https://tianquan.gtimg.cn/namePlate/item/20553/259/9.png?nowebp&nosharpp", "https://tianquan.gtimg.cn/namePlate/item/20085/259/9.png?nowebp&nosharpp", "https://tianquan.gtimg.cn/namePlate/item/20467/259/9.png?nowebp&nosharpp",
    "https://tianquan.gtimg.cn/namePlate/item/20688/259/9.png?nowebp&nosharpp", "https://tianquan.gtimg.cn/namePlate/item/20715/258/10.png?nowebp&nosharpp", "https://tianquan.gtimg.cn/namePlate/item/20741/259/9.png?nowebp&nosharpp",
    "https://tianquan.gtimg.cn/namePlate/item/20559/259/9.png?nowebp&nosharpp", "https://tianquan.gtimg.cn/namePlate/item/20742/259/9.png?nowebp&nosharpp", "https://tianquan.gtimg.cn/namePlate/item/20354/258/10.png?nowebp&nosharpp",
    "https://tianquan.gtimg.cn/namePlate/item/20195/259/9.png?nowebp&nosharpp", "https://tianquan.gtimg.cn/namePlate/item/40d99f7f-4951-4447-b581-b82b4a7c271d/259/9.png?nowebp&nosharpp", "https://tianquan.gtimg.cn/namePlate/item/20631/3/9.png?nowebp&nosharpp",
    "https://tianquan.gtimg.cn/namePlate/item/20704/259/9.png?nowebp&nosharpp", "https://tianquan.gtimg.cn/namePlate/item/20560/259/9.png?nowebp&nosharpp", "https://tianquan.gtimg.cn/namePlate/item/20679/259/8.png?nowebp&nosharpp",
    "https://tianquan.gtimg.cn/namePlate/item/20399/259/9.png?nowebp&nosharpp", "https://tianquan.gtimg.cn/namePlate/item/20708/259/9.png?nowebp&nosharpp", "https://tianquan.gtimg.cn/namePlate/item/1/258/9.png?nowebp&nosharpp",
    "https://tianquan.gtimg.cn/namePlate/item/1/258/10.png?nowebp&nosharpp", "https://tianquan.gtimg.cn/namePlate/item/20067/259/9.png?nowebp&nosharpp", "https://tianquan.gtimg.cn/namePlate/item/20691/259/9.png?nowebp&nosharpp",
    "https://tianquan.gtimg.cn/namePlate/item/0880a78b-06cf-49a0-a2bd-d5038020f3a4/258/10.png?nowebp&nosharpp", "https://tianquan.gtimg.cn/namePlate/item/20196/258/9.png?nowebp&nosharpp"
];

const newBadgeIds = ['10', '30', '31', '33', '34', '36', '37', '45', '46', '47', '56', '61', '77', '84', '86', '88', '90', '92', '93', '94', '95', '97', '98', '101', '102', '104', '105', '106', '107', '108', '109', '110', '111', '112', '113', '114', '115', '117', '122', '123', '125', '127', '130', '131', '132', '133', '134', '135', '136', '139'];

const CONFIG = {
    avatarFrames: [
        { value: '', img: '', label: '无', isNone: true },
        ...avatarFrameIds.map(id => ({
            value: `https://tianquan.gtimg.cn/faceAddon/item/${id}/newPreview1.png`,
            img: `https://tianquan.gtimg.cn/faceAddon/item/${id}/newPreview1.png`
        }))
    ],
    lhIcons: [
        { value: './img/lianghao/4.png', img: './img/lianghao/4.png', label: '炫彩靓号' },
        { value: './img/lianghao/5.png', img: './img/lianghao/5.png', label: '白金靓号' },
        { value: './img/lianghao/6.png', img: './img/lianghao/6.png', label: '新黑金靓号' },
        { value: './img/lianghao/35.png', img: './img/lianghao/35.png', label: '黄金靓' },
        { value: './img/lianghao/35.2.png', img: './img/lianghao/35.2.png', label: '黑金靓' },
        { value: './img/lianghao/35.3.png', img: './img/lianghao/35.3.png', label: '普号靓' },
        { value: './img/lianghao/puhao.png', img: './img/lianghao/puhao.png', label: '普号' }
    ],
    nameColors: [
        { value: 'flowing-gold', label: '流金溢彩' },
        { value: 'gold', label: '贵族金' },
        { value: 'rainbow', label: '动态彩虹' },
        { value: 'static-rainbow', label: '静态彩虹' }
    ],
    idIcons: [
        { value: './img/UID/20.png', img: './img/UID/20.png' },
        { value: './img/UID/20.1.png', img: './img/UID/20.1.png' },
        { value: './img/UID/UID2.png', img: './img/UID/UID2.png' },
        { value: './img/UID/UID3.png', img: './img/UID/UID3.png' },
        { value: './img/UID/UID4.png', img: './img/UID/UID4.png' },
        { value: './img/UID/UID5.png', img: './img/UID/UID5.png' }
    ],
    levelStyles: [
        ...Array.from({length: 175}, (_, i) => ({
            value: String(i + 1),
            img: `https://tianquan.gtimg.cn/qqVipLevel/item/${i + 1}/crown.png`,
            label: `样式${i + 1}`
        })),
        { value: 'none', label: '无', isNone: true }
    ],
    energyIcons: [
        { value: './img/value/33.png', img: './img/value/33.png' },
        { value: './img/value/IMG_1.png', img: './img/value/IMG_1.png' },
        { value: './img/value/IMG_2.png', img: './img/value/IMG_2.png' },
        { value: './img/value/IMG_3.png', img: './img/value/IMG_3.png' },
        { value: './img/value/IMG_4.png', img: './img/value/IMG_4.png' },
        { value: './img/value/IMG_5.png', img: './img/value/IMG_5.png' },
        { value: 'none', label: '无', isNone: true }
    ],
    groupOwnerIcons: [
        { value: './img/qumzhu/qunzhu.png', img: './img/qumzhu/qunzhu.png' },
        { value: 'none', label: '无', isNone: true }
    ],
    vipBadges: [
        ...vipBadgeLinks.map(url => ({ value: url, img: url, isLink: true })), 
        { value: 'none', label: '无图标', isNone: true }
    ],
    medalIcons: [
        { value: './img/xunzhang/IMG_9007.png', img: './img/xunzhang/IMG_9007.png' },
        { value: 'none', label: '无', isNone: true }
    ],
    rankTitles: [
        { value: 'https://gxh.material.qq.com/zip/bigVipLevelBadge/12/6c822b9a-1293-4f1f-b635-e986d12d2f17/260.png', img: 'https://gxh.material.qq.com/zip/bigVipLevelBadge/12/6c822b9a-1293-4f1f-b635-e986d12d2f17/260.png', label: '新增6' },
        { value: 'https://gxh.material.qq.com/zip/bigVipLevelBadge/17/0514e718-1501-4abf-af55-7203694e9a5a/260.png', img: 'https://gxh.material.qq.com/zip/bigVipLevelBadge/17/0514e718-1501-4abf-af55-7203694e9a5a/260.png', label: '新增4' },
        { value: 'https://gxh.material.qq.com/zip/bigVipLevelBadge/18/7b04b773-3da2-40fa-ac20-1e9e7dc0a897/260.png', img: 'https://gxh.material.qq.com/zip/bigVipLevelBadge/18/7b04b773-3da2-40fa-ac20-1e9e7dc0a897/260.png', label: '新增5' },
        { value: 'https://gxh.material.qq.com/zip/bigVipLevelBadge/16/1d8aec5f-37bf-4bd5-96ed-9b74ac9be312/260.png', img: 'https://gxh.material.qq.com/zip/bigVipLevelBadge/16/1d8aec5f-37bf-4bd5-96ed-9b74ac9be312/260.png', label: '新增1' },
        { value: 'https://gxh.material.qq.com/zip/bigVipLevelBadge/6/b07854f0-ef06-48bf-964a-e971681c023b/260.png', img: 'https://gxh.material.qq.com/zip/bigVipLevelBadge/6/b07854f0-ef06-48bf-964a-e971681c023b/260.png', label: '新增2' },
        { value: 'https://gxh.material.qq.com/zip/bigVipLevelBadge/14/3b7385fc-607c-44da-b743-816742ec9f1f/260.png', img: 'https://gxh.material.qq.com/zip/bigVipLevelBadge/14/3b7385fc-607c-44da-b743-816742ec9f1f/260.png', label: '新增3' },
        { value: 'https://gxh.material.qq.com/zip/bigVipLevelBadge/5/d2489ce5-0741-406f-a468-240dd521cb90/260.png', img: 'https://gxh.material.qq.com/zip/bigVipLevelBadge/5/d2489ce5-0741-406f-a468-240dd521cb90/260.png', label: '样式1' },
        { value: 'https://gxh.material.qq.com/zip/bigVipLevelBadge/2/ee7cad39-af01-4928-a9b9-0235cc52b6fb/260.png', img: 'https://gxh.material.qq.com/zip/bigVipLevelBadge/2/ee7cad39-af01-4928-a9b9-0235cc52b6fb/260.png', label: '样式2' },
        { value: 'https://gxh.material.qq.com/zip/bigVipLevelBadge/10/cf1779f1-26c8-4a35-b470-f31a91913427/260.png', img: 'https://gxh.material.qq.com/zip/bigVipLevelBadge/10/cf1779f1-26c8-4a35-b470-f31a91913427/260.png', label: '样式3' },
        { value: 'https://gxh.material.qq.com/zip/bigVipLevelBadge/1/0b4b8292-3976-472d-abaf-fa11ac3b46b2/260.png', img: 'https://gxh.material.qq.com/zip/bigVipLevelBadge/1/0b4b8292-3976-472d-abaf-fa11ac3b46b2/260.png', label: '样式4' },
        { value: 'https://gxh.material.qq.com/zip/bigVipLevelBadge/8/a8b72e00-02c1-4eb0-8009-2e6a96730e47/260.png', img: 'https://gxh.material.qq.com/zip/bigVipLevelBadge/8/a8b72e00-02c1-4eb0-8009-2e6a96730e47/260.png', label: '样式5 (默认)' },
        { value: 'none', label: '无', isNone: true }
    ],
    newBadges: [
        { value: 'none', label: '无', isNone: true }, 
        ...newBadgeIds.map(id => ({ value: `img/badge/${id}.png`, img: `img/badge/${id}.png` }))
    ],
    jikaIcons: [
        { value: 'https://image.superqqshow.qq.com/qq/nameplate_h5/melody/3.png', img: 'https://image.superqqshow.qq.com/qq/nameplate_h5/melody/3.png' },
        { value: 'https://image.superqqshow.qq.com/qq/nameplate_h5/1.png', img: 'https://image.superqqshow.qq.com/qq/nameplate_h5/1.png' },
        { value: 'https://image.superqqshow.qq.com/qq/nameplate_h5/cinnamoroll/1.png', img: 'https://image.superqqshow.qq.com/qq/nameplate_h5/cinnamoroll/1.png' },
        { value: 'img/jika/jika20260113_2.png', img: 'img/jika/jika20260113_2.png' },
        { value: 'img/jika/jikarongyu20260120_2.png', img: 'img/jika/jikarongyu20260120_2.png' },
        { value: 'img/jika/Kuromi.png', img: 'img/jika/Kuromi.png' },
        { value: 'none', label: '无', isNone: true }
    ],
    memberMedals: [
        { value: 'https://tianquan.gtimg.cn/vipMedal/item/2/previewImage.png', img: 'https://tianquan.gtimg.cn/vipMedal/item/2/previewImage.png' },
        { value: 'https://tianquan.gtimg.cn/vipMedal/item/3/previewImage.png', img: 'https://tianquan.gtimg.cn/vipMedal/item/3/previewImage.png' },
        { value: 'none', label: '无', isNone: true }
    ]
};

CONFIG.dynamicIcons = [
    ...[...new Set(nameplateUrls)].map(url => ({ value: url, img: url })),
    { value: 'none', label: '无', isNone: true }
];

const genVip = (id, name, colorSrc, graySrc, category, defaultOrder) => ({ id, name, colorSrc, graySrc, category, defaultOrder });

const vipIconsConfig = [
    genVip('new-vip-1', '大会员', 'https://tianquan.gtimg.cn/bigclubdiamond/item/45/bigLevel9.png', '','big_member', 0),
    genVip('new-vip-2', '超级会员', 'https://tianquan.gtimg.cn/clubdiamond/item/112/bigLevel10.png', '', 'svip', 0),
    genVip('new-vip-3', '黄钻', 'https://qzonestyle.gtimg.cn/qzone/space_item/material/QzoneIcon/org/2/215058/ZLK10/LV10.png', '', 'yellow', 0),
    genVip('new-vip-4', '集卡', 'https://tianquan.gtimg.cn/qqcardnameplate/item/10/nameplate.png', '', 'card', 0),
    genVip('new-vip-5', '情侣(左)', 'https://tianquan.gtimg.cn/loverSVIPIcon/item/19/level10.png', '', 'couple', 0),
    genVip('new-vip-6', '情侣(右)', 'https://qzonestyle.gtimg.cn/qzone/space_item/material/LoveStyles/org/1/214929/148x148.png', '', 'couple', 0),
    genVip('new-vip-7', '综合业务', 'https://qqvip-web.cdn-go.cn/imgcache_privilege/latest/musicsvip/big_light_9.png', '', 'general', 0),
];

const rawYellowUrls = [
    "https://qzonestyle.gtimg.cn/qzone/space_item/material/QzoneIcon/org/6/214934/ZLK10/LV10.png",
    "https://qzonestyle.gtimg.cn/qzone/space_item/material/QzoneIcon/org/15/213535/ZLK/LV10.png",
    "https://qzonestyle.gtimg.cn/qzone/space_item/material/QzoneIcon/org/6/214678/ZLK10/LV10.png",
    "https://qzonestyle.gtimg.cn/qzone/space_item/material/QzoneIcon/org/2/215058/ZLK10/LV10.png",
    "https://qzonestyle.gtimg.cn/qzone/space_item/material/QzoneIcon/org/1/211521/ZLK10/LV10.png",
    "https://qqvip-web.cdn-go.cn/imgcache_privilege/latest/redv2/light_8.png",
    "https://qzonestyle.gtimg.cn/qzone/space_item/material/QzoneIcon/org/7/216855/ZLK10/LV10.png",
    "https://qqvip-web.cdn-go.cn/imgcache_privilege/latest/yellowupbigv2/big_light_9.png",
    "https://qzonestyle.gtimg.cn/qzone/space_item/material/QzoneIcon/org/6/217014/ZLK10/LV10.png",
    "https://qzonestyle.gtimg.cn/qzone/space_item/material/QzoneIcon/org/6/214934/ZLK10/LV10.png",
    "https://qzonestyle.gtimg.cn/qzone/space_item/material/QzoneIcon/org/3/211523/ZLK10/LV10.png"
];

const uniqueYellowUrls = [...new Set(rawYellowUrls)];
uniqueYellowUrls.forEach((url, index) => {
    let template = "";
    if (url.includes("LV10.png")) template = url.replace("LV10.png", "LV{L}.png");
    else if (url.includes("light_8.png")) template = url.replace("light_8.png", "light_{L}.png");
    else if (url.includes("big_light_9.png")) template = url.replace("big_light_9.png", "big_light_{L}.png");
    if (template) {
        for (let i = 1; i <= 10; i++) {
            const finalUrl = template.replace("{L}", i);
            vipIconsConfig.push(genVip(`vip-icon-custom-yellow-${index}-${i}`, `黄钻样式${index+1}-${i}级`, finalUrl, '', 'yellow', 0));
        }
    }
});

vipIconsConfig.push(
    genVip('vip-gen-new-1', '文档SVIP', 'https://qqvip-web.cdn-go.cn/imgcache_privilege/latest/docsvipv2/light_0.png', '', 'general', 0),
    genVip('vip-gen-new-2', '黄钻情侣', 'https://qqvip-web.cdn-go.cn/imgcache_privilege/latest/yellowlove/light_0.png', '', 'general', 0),
    genVip('vip-gen-new-3', 'CF', 'https://qqvip-web.cdn-go.cn/imgcache_privilege/latest/cf/light_100.png', '', 'general', 0),
    genVip('vip-gen-new-4', '情侣(粉)', 'https://qzonestyle.gtimg.cn/qzone/space_item/material/LoveStyles/org/9/214265/fen148x148.png', '', 'general', 0),
    genVip('vip-gen-new-7', '情侣(熊猫)', 'https://qzonestyle.gtimg.cn/qzone/space_item/material/LoveStyles/org/0/213520/xiongmao148.png', '', 'general', 0),
    genVip('vip-gen-new-8', '文档VIP', 'https://qqvip-web.cdn-go.cn/imgcache_privilege/latest/docvipv2/light_0.png', '', 'general', 0),
    ...Array.from({length: 8}, (_, i) => genVip(`vip-gen-film-${i+1}`, `视频VIP${i+1}级`, `https://qqvip-web.cdn-go.cn/imgcache_privilege/latest/filmv7/big_light_${i+1}.png`, '', 'general', 0)),
    ...Array.from({length: 8}, (_, i) => genVip(`vip-gen-scloud-${i+1}`, `微云${i+1}级`, `https://qqvip-web.cdn-go.cn/imgcache_privilege/latest/scloudv2/light_${i+1}.png`, '', 'general', 0))
);

for (let i = 7; i <= 10; i++) {
    vipIconsConfig.push(genVip(`vip-icon-card-official-${i}`, `集卡铭牌${i}级`, `https://tianquan.gtimg.cn/qqcardnameplate/item/${i}/nameplate.png`, '', 'card', 0));
}

vipIconsConfig.push(
    ...Array.from({length: 277}, (_, i) => {
        const n = i + 3;
        return genVip(`vip-icon-svip-official-${n}`, `超会(官${n})`, `https://tianquan.gtimg.cn/clubdiamond/item/${n}/bigLevel10.png`, '', 'svip', 0);
    }),
    ...Array.from({length: 133}, (_, i) => {
        const n = i + 3;
        return genVip(`vip-icon-bm-official-${n}`, `大会员(官${n})`, `https://tianquan.gtimg.cn/bigclubdiamond/item/${n}/bigLevel9.png`, '', 'big_member', 0);
    }),
    ...Array.from({length: 39}, (_, i) => {
        const n = i + 1;
        return genVip(`vip-icon-cp-official-${n}`, `情侣(官${n})`, `https://tianquan.gtimg.cn/loverSVIPIcon/item/${n}/level10.png`, '', 'couple', 0);
    })
);

const newGrayIcons = [
    { name: '大会员(灰)', url: 'https://qqvip-web.cdn-go.cn/imgcache_privilege/latest/dhybigv2/gray_0.png' },
    { name: '超会(灰)', url: 'https://qqvip-web.cdn-go.cn/imgcache_privilege/latest/svipbig/gray_0.png' },
    { name: '黄钻(灰)', url: 'https://qqvip-web.cdn-go.cn/imgcache_privilege/latest/yellowbig/gray_0.png' },
    { name: '情侣(灰)', url: 'https://qqvip-web.cdn-go.cn/imgcache_privilege/latest/loversvip/gray.png' },
    { name: '铭牌(灰)', url: 'https://tianquan.gtimg.cn/shoal/qqgxh/6b32592d-8f6a-4c83-9cf4-da25291f66eb.png' },
    { name: '音乐VIP(灰)', url: 'https://qqvip-web.cdn-go.cn/imgcache_privilege/latest/svipmuv3/gray_0.png' },
    { name: '绿钻(灰)', url: 'https://qqvip-web.cdn-go.cn/imgcache_privilege/latest/greenupbigv2/gray_1.png' },
    { name: '体育VIP(灰)', url: 'https://qqvip-web.cdn-go.cn/imgcache_privilege/latest/svipspv3/gray_0.png' },
    { name: '视频VIP(灰)', url: 'https://qqvip-web.cdn-go.cn/imgcache_privilege/latest/filmv7/gray_0.png' },
    { name: '网卡(灰)', url: 'https://qqvip-web.cdn-go.cn/imgcache_privilege/latest/wkclub/gray_0.png' },
    { name: '红钻(灰)', url: 'https://qqvip-web.cdn-go.cn/imgcache_privilege/latest/redv2/gray_0.png' },
    { name: '微云(灰)', url: 'https://qqvip-web.cdn-go.cn/imgcache_privilege/latest/cloudv2/gray_0.png' },
    { name: 'CF(灰)', url: 'https://qqvip-web.cdn-go.cn/imgcache_privilege/latest/cf/gray_0.png' }
];

newGrayIcons.forEach((item, index) => {
    vipIconsConfig.push(genVip(`vip-icon-gray-${index}`, item.name, item.url, '', 'gray', 0));
});

const defaultDisplayConfig = {
    color: { icons: ['new-vip-1', 'new-vip-2', 'new-vip-3', 'new-vip-4', 'new-vip-5', 'new-vip-6'], versions: {} },
    gray: { icons: [], versions: {} },
    mixed: { icons: ['new-vip-1', 'new-vip-2', 'new-vip-3', 'new-vip-4', 'new-vip-5', 'new-vip-6'], versions: { 'new-vip-1': 'color', 'new-vip-2': 'color', 'new-vip-3': 'color', 'new-vip-4': 'color', 'new-vip-5': 'color', 'new-vip-6': 'color' } }
};
