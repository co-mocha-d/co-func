// input输入框金额限制
function formatInputMoney(val: string) {
    // 去除前后空白字符
    val = val?.toString()?.trim();
    // 移除非数字和点字符
    val = val.replace(/[^\d.]/g, '');
    // 如果以点开头，移除开头的点
    if (val.startsWith('.')) {
        val = val.substring(1);
    }
    // 如果以00开头，移除开头一个0
    if (val.startsWith('00')) {
        val = val.substring(1);
    }
    // 保留第一个点，去掉其余点
    val = val.replace(/\.(?=.*\.)/g, '');
    // 限制小数位数
    val = val.replace(/^(-?\d+)(\.\d{0,2}).*$/, '$1$2');
    return val;
}

// input输入框整数限制
function formatInputInt(val: string) {
    // 去除前后空白字符
    val = val?.toString()?.trim();
    // 移除非数字和点字符
    val = val.replace(/[^\d.]/g, '');
    // 仅保留小数点前的整数部分
    val = val.split('.')[0];
    // 处理前导0的情况
    if (val.startsWith('0') && val.length > 1) {
        val = val.replace(/^0+/, ''); // 移除多余的前导0
    }
    return val;
}

// input输入框非中文限制
function formatInputNoCn(val: string) {
    // 去除前后空白字符
    val = val?.toString()?.trim();
    // 移除中文
    val = val.replace(/[\u4e00-\u9fa5]/g, '');
    return val;
}

// input输入框限制只能输入数字和字母
function formatInputCode(val: string) {
    // 去除前后空白字符
    val = val?.toString()?.trim();
    // 移除数字、非字母
    val = val.replace(/[^a-zA-Z0-9]/g, '');
    return val;
}

// 隐藏字符创中间n位字符
function hideMiddleText(str: string, n: number) {
    if (str.length <= n * 2) {
        return '*'.repeat(str.length); // 如果字符串太短，全部替换为 *
    }
    const start = Math.floor((str.length - n) / 2);
    const end = start + n;
    return str.slice(0, start) + '*'.repeat(n) + str.slice(end);
}

// 过滤表情
function removeEmojis(text: string) {
    // 匹配大多数常见表情符号的正则表达式
    const regex =
        /[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]|[\u{1F1E6}-\u{1F1FF}]|[\u{1F900}-\u{1F9FF}]|[\uD83C][\uDDE6-\uDDFF][\uD83C][\uDDE6-\uDDFF]/gu;

    return text.replace(regex, '');
}

export default {
    formatInputMoney,
    formatInputInt,
    formatInputNoCn,
    formatInputCode,
    hideMiddleText,
    removeEmojis,
};
