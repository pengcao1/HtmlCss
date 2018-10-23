
function testFunction () {
    console.log("This is the testFunction..");
    const preStr = document.getElementById("inputStr").value;
    const preWith = document.getElementById("inputNum").value;
    const testStr = "The main theme    of education in engineering school is learning to teach yourself";
    const testWith = 30;
    const strReturn = main(testStr, Number(testWith));
    console.log("result str = ", strReturn);
    document.getElementById("outputResult").value= strReturn;
}
function isValidStr(str) {
    if (str === undefined || str === null || str === "") return false;
    const strTEMP = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ ";
    for (i in str) {
        if (strTEMP.indexOf(str.charAt(i)) == -1) {
            console.log("ERROR");
            return false;
            break;
        }
    }
    return true;
}
function main (PreStr,preWith) {
    // 全部为字符
    // 全部为空格
    if ( isNaN(preWith)) {
        return "ERROR: not a Number, please input number between [10,80]";
    } else if (!(preWith < 81 && preWith > 10)) {
        return "ERROR: with out of range";
    } else if (!isValidStr(PreStr)) {
        return "ERROR: Invalid character detected!"
    }
    return formatString(PreStr, preWith);
}

function formatString(preStr, preWith) {
    // 以空格split 字符串(研究JavaScript 中 split的是实现方式)
    // 当有多个空格时如何处理？
    // 当处理的当前字符串，或者空格的index 在with之间？
    var cutSubStr = "";
    for (i = 0; i < Math.ceil((preStr.length / preWith )); i++ ) {
        var itemStr = preStr.substring(i * preWith, (i + 1) * preWith);
        // k = 0;
        // for (j =0 ; j<itemStr.length ; j++) {
        //     if (isAlphabet(itemStr.charAt(j))) {
        //         k = j;
        //     }
        // }
        var itemChar = itemStr.split(" ");
        console.log("itemStr = >" + itemStr + "<");
        var aa = itemStr.split(" ").toString().replace(eval("/" + "," + "/g"), '(' + (i + 1) + ');' + ' (' + (i + 1) + ');');
        console.log("aa = >" + aa + "<");
        //cutSubStr += preStr.substring(i*preWith,(i+1)*preWith);
        cutSubStr += aa;
    }
    return cutSubStr + "(" + Math.ceil((preStr.length / preWith))+")";
}

function isAlphabet(item) {
    return (item >= 'a' && item <= 'z') || (item >= 'A' && item <= 'Z') ;
}
function isSpace(item) {
    return item === ' ';
}

