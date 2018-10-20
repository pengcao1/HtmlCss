
function testFunction () {
    console.log("This is the testFunction..");
    const preStr = document.getElementById("inputStr").value;
    const preWith = document.getElementById("inputNum").value;
    const strReturn =  main(preStr,Number(preWith));
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
    const strTEMP="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    // 全部为字符
    // 全部为空格
    if ( isNaN(preWith)) {
        return "ERROR: not a Number, please input number between [10,80]";
    } else if (!(preWith < 81 && preWith > 10)) {
        return "ERROR: with out of range";
    } else if (!isValidStr(PreStr)) {
        return "ERROR: Invalid character detected!"
    }
    return formatString(PreStr);
}

function formatString(preStr) {
    return preStr;
}

