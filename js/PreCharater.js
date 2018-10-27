
function testFunction () {
    //console.log("This is the testFunction..");
    const preStr = document.getElementById("inputStr").value;
    const preWith = document.getElementById("inputNum").value;
    const testStr = "The main theme of education in    engineering school is learning to teach yourself";
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
    return formatStringMap(PreStr, preWith);
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
        // console.log("itemStr = >" + itemStr + "<");
        /* The(1); (1);main(1); (1);theme(1); (1);of(1); (1);education(1); (1);in(1);
           (2);engineering(2); (2);school(2); (2); is(2); (2);
         learning(2, 3); (3); to(3); (3); teach(3); (3); yourself(3);
        */
       /**
        * The(1); (1);main(1); (1);theme(1); (1);of(1); (1);education(1); (1);in(1);
        *  (1);(2); (2);engineering(2); (2);school(2); (2);is(2); (2);learnin(2); (2);g(3); (3);to(3); (3);teach(3); (3);yourself(3); (3);
        */
        var aa = itemStr.split(' ');
        var aamap = aa.map( function(word,index)  {
            console.log("map: " + word +"<>index="+index);
        });
        console.log("aa = >" + aa + "<");
        var aaa = aa.toString().replace(eval("/" + "," + "/g"), '(' + (i + 1) + ');'/* + ' (' + (i + 1) + ');'*/);
        console.log("aaa = >" + aaa + "<");
        aaa = aaa + '(' + (i + 1) + ');';
        //cutSubStr += preStr.substring(i*preWith,(i+1)*preWith);
        cutSubStr += aaa;
    }
    return cutSubStr + "(" + Math.ceil((preStr.length / preWith))+")";
}

function formatStringMap(preStr, preWith) {
    //var cutSubStr = "";
    var cutArray = [];
    for (i = 0; i < Math.ceil((preStr.length / preWith)); i++) {
        var isEndOfAlphabet =  isAlphabet(preStr.charAt((i + 1) * preWith));
        var itemStr = preStr.substring(i * preWith, (i + 1) * preWith);
        var itemArr = itemStr.split(' ');
        var itemMap = itemArr.map( (word,index) => {
            return word + getSplitFormatStringItem(i,
                itemArr.length === index + 1 || (word.trim().length === 0),
                isEndOfAlphabet && itemArr.length === index + 1,
                word.trim().length === 0);
        })
        cutArray = [...cutArray,itemMap];
    }

    console.log(cutArray);
    for (i = 0; i < cutArray.length; i++) {
        var currentArrayItem = cutArray[i];
        var currentStrLast = cutArray[i][cutArray[i].length - 1];
        if ( currentStrLast.endsWith(',')) {
            var nextStrStart = cutArray[i + 1][0];
            var newCurrentStrItem = currentStrLast.substring(0,currentStrLast.indexOf("("))
                + nextStrStart.substring(0, nextStrStart.indexOf('(')) ;
            console.log(">>" + newCurrentStrItem + "<<");
            cutArray[i][cutArray[i].length - 1] = newCurrentStrItem + '(' + (i+1)+'-'+(i+2)+');';
            cutArray[i + 1].shift();
        } else {
            var start = 0;
            for (j = 0; j < currentArrayItem.length; j++) {
                if (currentArrayItem[j].trim().length === 0) {
                    // record space start
                    start = j;
                    continue;
                }
            }
        }
    }
    console.log(">>" + cutArray.toString().replace(eval("/" + "," + "/g"),""));
    return cutArray
      .toString()
      .replace(eval("/" + "," + "/g"), "")
      .replace(eval("/" + "-" + "/g"), ",");
}
function getSplitFormatStringItem(index, isEnd, isEndOfAlphabet, isFullSpace )  {
    if (!isEndOfAlphabet && !isFullSpace) {
        return isEnd ? getSplitFormatString(index) :
        getSplitFormatString(index) + ' ' + getSplitFormatString(index);
    } else if ( isFullSpace ){
        return " ";
    } else {
        return '(' + (index + 1) +',';
    }
}
function getSplitFormatString(index) {
    return '(' + (index + 1) + ');';
}
function isAlphabet(item) {
    return (item >= 'a' && item <= 'z') || (item >= 'A' && item <= 'Z') ;
}
function isSpace(item) {
    return item === ' ';
}