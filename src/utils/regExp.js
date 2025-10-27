// 身份证正则
const isCardNo = function (str) {
    var regExp = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    if (regExp.test(str)) {
        return true;
    } else {
        return false;
    }
};

// 检测手机号码
const isPhone = function (str) {
    var reg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[0-9]|18[0-9]|14[57]|17[678])[0-9]{8}$/;
    if (reg.test(str)) {
        return true;
    } else {
        return false;
    }
};

// 检测邮箱
const isEmail = function (str) {
    var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
    if (reg.test(str)) {
        return true;
    } else {
        return false;
    }
};

// 检测邮箱
const isQQ = function (str) {
    var reg = /^[1-9][0-9]{4,9}$/;
    if (reg.test(str)) {
        return true;
    } else {
        return false;
    }
};

// 过滤html标签
const filterHTMLTag = function (msg) {
    // var src = msg.replace(/<\/?[^>]*>/g, '') // 去除HTML Tag
    // src = src.replace(/[|]*\n/, '') // 去除行尾空格
    // src = src.replace(/&npsp;/ig, '') // 去掉npsp
    // return src
    msg.replace(/[|]*\n/, ''); // 去除行尾空格
    msg.replace(/&npsp;/ig, ''); // 去掉npsp
    let reg = /<\/?[^>]*>/g;
    if (reg.test(msg)) {
        return false;
    } else {
        return true;
    }
};
export { isCardNo, isPhone, isEmail, isQQ, filterHTMLTag };
