import { isCardNo, isPhone, isEmail, isQQ } from "@/utils/regexp";

export const validCardNo = (rule, value, callback) => {
    if (value && !isCardNo(value)) {
        callback(new Error("身份证号码不正确"));
    }
    callback();
};
export const validMobile = (rule, value, callback) => {
    if (value && !isPhone(value)) {
        callback(new Error("手机号码不正确"));
    }
    callback();
};
export const validEmail = (rule, value, callback) => {
    if (value && !isEmail(value)) {
        callback(new Error("邮箱格式不正确"));
    }
    callback();
};
export const validQqEmail = (rule, value, callback) => {
    if (value && !isQQ(value)) {
        callback(new Error("不是QQ邮箱格式"));
    }
    callback();
};
export const validatePass = (rule, value, callback) => {
    if (!value) {
        callback(new Error("密码不能为空"));
    } else if (value.length < 6) {
        callback(new Error("密码必须至少6位"));
    } else if (!/^[0-9A-Za-z@._]{6,}$/.test(value)) {
        callback(new Error("密码为数字、字母或者英文符号@.、_"));
    } else {
        callback();
    }
};
export const validtype = (rule, value, callback) => {
    if (isNaN(value)) {
        callback(new Error("只能输入数字"));
    } else {
        callback();
    }
};
export const validPostCode = (rule, value, callback) => {
    if (!value) {
        callback();
    } else {
        var regExp = /^\d{6}$/;
        if (regExp.test(value)) {
            callback();
        } else {
            callback(new Error("邮编格式不正确"));
        }
    }
};
export const validTelephone = (rule, value, callback) => {
    if (!value) {
        callback();
    } else {
        var regExp = /^0\d{2,3}-\d{7,8}$/;
        if (regExp.test(value)) {
            callback();
        } else {
            callback(new Error("电话号码格式不正确"));
        }
    }
};
// 带两位小数最大长度15
export const validateTwoRadix15 = (rule, value, callback) => {
    if (!value) {
        callback();
    } else {
        var regExp1 = /^(\d{1,12}\.\d{1})$/;
        var regExp2 = /^(\d{1,12}\.\d{2})$/;
        if (regExp1.test(value) || regExp2.test(value)) {
            callback();
        } else {
            callback(new Error("格式为最多带两位小数且最大长度15"));
        }
    }
};
// 带两位小数最大长度30
export const validateTwoRadix30 = (rule, value, callback) => {
    if (!value) {
        callback();
    } else {
        var regExp1 = /^(\d{1,27}\.\d{1})$/;
        var regExp2 = /^(\d{1,27}\.\d{2})$/;
        if (regExp1.test(value) || regExp2.test(value)) {
            callback();
        } else {
            callback(new Error("格式为最多带两位小数且最大长度30"));
        }
    }
};
// 正整数最大长度15
export const validateInteger15 = (rule, value, callback) => {
    if (!value) {
        callback();
    } else {
        var regExp = /^([1-9]\d{0,15})$/;
        if (regExp.test(value)) {
            callback();
        } else {
            callback(new Error("格式为正整数且最大长度15"));
        }
    }
};
// 英文和数字最大长度15
export const validateEnAndNum15 = (rule, value, callback) => {
    if (!value) {
        callback(new Error("请输入编码"));
    } else {
        var regExp = /^([0-9A-Za-z-_]){0,15}$/;
        if (regExp.test(value)) {
            callback();
        } else if (value.length > 15) {
            callback(new Error("编码最长可输入15个字符"));
        } else {
            callback(new Error("编码仅支持字母、数字、-、_"));
        }
    }
};
// 英文和数字最大长度40
export const validateEnAndNum40 = (rule, value, callback) => {
    if (!value) {
        callback(new Error("请输入编码"));
    } else {
        var regExp = /^([0-9A-Za-z-_]){0,40}$/;
        if (regExp.test(value)) {
            callback();
        } else if (value.length > 40) {
            callback(new Error("编码最长可输入40个字符"));
        } else {
            callback(new Error("编码仅支持字母、数字、-、_"));
        }
    }
};
// 小数且不超过四位小数
export const validateLs1Len6 = (rule, value, callback) => {
    if (!value) {
        callback();
    } else {
        var regExp = /^[0-9]+(.[0-9]{1,4})?$/;
        if (value > 1 || !regExp.test(value)) {
            callback(new Error("最大可输入1且不超过四位小数的数值"));
        } else {
            callback();
        }
    }
};
// 正负数值但不超过四位小数
export const validateDecimalsLen4 = (rule, value, callback) => {
    if (!value) {
        callback();
    } else {
        var regExp = /^[+-]?\d+(?:\.\d{1,4})?$/;
        if (!regExp.test(value)) {
            callback(new Error("请输入数值且最多支持四位小数"));
        } else if (value > 999999.9999) {
            callback(new Error("最大值不超过999999.9999"));
        } else {
            callback();
        }
    }
};
// 正数但不超过四位小数
export const validatePlusDecimalsLen4 = (rule, value, callback) => {
    if (!value) {
        callback();
    } else {
        var regExp = /^[+]?\d+(?:\.\d{1,4})?$/;
        if (!regExp.test(value)) {
            callback(new Error("请输入大于0的数值且最多支持四位小数"));
        } else if (value > 999999.9999) {
            callback(new Error("最大值不超过999999.9999"));
        } else {
            callback();
        }
    }
};
// 大于等于0的整数最大长度8
export const validateInteger8 = (rule, value, callback) => {
    if (!value) {
        callback();
    } else {
        var regExp = /^([0-9].{0,7})$/;
        if (regExp.test(value)) {
            callback();
        } else {
            callback(new Error("不能输入小于0的数值，最长可输入8位"));
        }
    }
};
export const validateBig0 = (rule, value, callback) => {
    if (value !== 0) {
        callback();
    } else {
        callback(new Error("请输入大于0的数值"));
    }
};

export default {
    validCardNo,
    validMobile,
    validEmail,
    validQqEmail,
    validPostCode,
    validTelephone,
    validatePass,
    validtype,
    validateTwoRadix15,
    validateInteger15,
    validateEnAndNum15,
    validateEnAndNum40,
    validateLs1Len6,
    validateInteger8,
    validateBig0,
    validateDecimalsLen4,
    validatePlusDecimalsLen4
};
