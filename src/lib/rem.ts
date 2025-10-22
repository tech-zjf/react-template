/**
 * rem 自适应方案
 * 设计稿基准: 360px
 * 转换比例: 100px = 1rem
 *
 * 在不同屏幕尺寸下动态设置 html 的 font-size
 * 使得 1rem = 屏幕宽度 / 3.6
 */

const setRemUnit = () => {
    const docEl = document.documentElement;
    const clientWidth = docEl.clientWidth || document.body.clientWidth;

    if (!clientWidth) return;

    // 基于 360px 设计稿，计算 rem 基准值
    // 360px / 3.6 = 100px，所以 1rem = 100px（在 360px 屏幕上）
    const fontSize = clientWidth / 3.6;

    // 限制最小和最大字体大小
    const minFontSize = 50; // 最小 50px
    const maxFontSize = 150; // 最大 150px

    const finalFontSize = Math.max(minFontSize, Math.min(maxFontSize, fontSize));

    docEl.style.fontSize = finalFontSize + 'px';
};

// 页面加载时设置
setRemUnit();

// 监听窗口大小变化
let resizeTimer: number | null = null;
window.addEventListener('resize', () => {
    if (resizeTimer) {
        clearTimeout(resizeTimer);
    }
    resizeTimer = window.setTimeout(() => {
        setRemUnit();
        resizeTimer = null;
    }, 100);
});

// 监听屏幕方向变化（移动端）
window.addEventListener('orientationchange', () => {
    setTimeout(() => {
        setRemUnit();
    }, 300);
});

export default setRemUnit;
