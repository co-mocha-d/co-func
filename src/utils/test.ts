/**
 * 验证电子邮箱格式
 */
export function email(value: string) {
    return /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(value)
}

/**
 * 验证手机格式
 */
export function mobile(value: string) {
    return /^1[23456789]\d{9}$/.test(value)
}



export default {
    email,
    mobile,
}
