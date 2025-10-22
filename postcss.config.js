export default {
    plugins: {
        'postcss-pxtorem': {
            rootValue: 100, // 设计稿的 100px = 1rem
            unitPrecision: 5, // rem 的小数点位数
            propList: ['*', '!min-with', '!max-width'], // 所有属性都进行转换
            selectorBlackList: ['.no-rem'], // 忽略转换的类名
            replace: true, // 直接替换而不是追加
            mediaQuery: false, // 媒体查询中不转换
            minPixelValue: 0, // 小于2px的不转换
        },
    },
};
