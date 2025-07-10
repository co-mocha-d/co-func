/**
 * 获取url后面参数
 * @param variable key
 * @returns {boolean|string} 没找到返回false 找到了返回value
 */
export const getQueryVariable = (variable: string) => {
    let query = window.location.search.substring(1);
    let vars = query.split('&');
    for (let i = 0; i < vars.length; i++) {
        let pair = vars[i].split('=');
        if (pair[0] == variable) {
            return pair[1];
        }
    }
    return false;
};

export default {
    getQueryVariable,
};
