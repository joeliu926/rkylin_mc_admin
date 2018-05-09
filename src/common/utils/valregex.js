/**
 * Created by admin on 2017-12-25.
 */


function fRegexValidation(regex,text) {
    if(regex.test(text)){
        return true;
    }
    return false;
}


module.exports={
    isEmail:function (text) {//验证邮箱
       let regex=/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
       if(regex.test(text)){
           return true;
       }
       return false;
    },
    isMobile:function (text) {//手机号码验证
        let regex=/^1(3|4|5|7|8|9)\d{9}$/;
        if(regex.test(text)){
            return true;
        }
        return false;
    },
    isTel:function (text) { //固定号码
      let regex=/^(((0\d{2,3})|(\(0\d{2,3}\)))(\-|)\d{8})|(\d{3,4}\-\d{3,4}\-\d{3,4})$/;
        if(regex.test(text)){
            return true;
        }
        return false;
    },
    isNum:function (text) {
        let regex=/^\d+$/;
        if(regex.test(text)){
            return true;
        }
        return false;
    },
    isIntNumber:function (text) {
        let regex=/^[-\+]?\d+$/;
        if(regex.test(text)){
            return true;
        }
        return false;
    },
    isEnglish:function (text) { //匹配英文字母
      let regex=/^[A-Za-z]+$/;
        if(regex.test(text)){
            return true;
        }
        return false;
    },
    isDouble:function (text) { //是否double类型
        let regex=/^[-\+]?\d+(\.\d+)?$/;
        if(regex.test(text)){
            return true;
        }
        return false;
    },
    isUrl:function (text) {//是否是url
        let regex=/^(http|https):\/\/[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\’:+!]*([^<>\"])*$/;
        if(regex.test(text)){
            return true;
        }
        return false;
    },
    isRightfulString:function (text) {//字母数字下划线合法字符
        let regex=/^[A-Za-z0-9_-]+$/;
        if(regex.test(text)){
            return true;
        }
        return false;
    },
    isZipCode:function (text) { //邮政编码
        let regex=/^[0-9]{6}$/;
        if(regex.test(text)){
            return true;
        }
        return false;
    },
    isChinese:function (text) { //匹配汉字
        let regex=/^[\u4e00-\u9fa5]+$/;
        if(regex.test(text)){
            return true;
        }
        return false;
    }
};
