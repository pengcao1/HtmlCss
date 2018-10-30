const main = () => {
    var g_OutPut = [];
    var g_OutStr = "";
    //const str_test = "The main theme of education in engineering school is learning to teach yourself";
    //const str_test = "So   many whitespaces";
    //const str_WIDTH = 30;
    // step 1 get input
    const str_test = document.getElementById("inputStr").value;
    const str_WIDTH = parseInt(document.getElementById("inputNum").value);

    const inputDetailDel = document.getElementById("inputDetailDel").open;
    const inputDetailOut = document.getElementById("inputDetailOut").open;

    //step 2 format input string & judge input is correct
    console.log("inputDetailDel=" + inputDetailDel + ":inputDetailOut=" + inputDetailOut);
    if (!(result = isValidInput(str_test, str_WIDTH)).result) {
      console.log(result.msg);
      document.getElementById("outputResult").value = result.msg;
      return;
    }
    g_OutPut = splitStringToItem(g_OutPut, str_test);
    formatOutput(g_OutPut, str_WIDTH);

    // step 3 re-format output info
    if (inputDetailDel) {
      var del_Output = [];
      var formatDelStringObj = formatOutDelLine(g_OutPut, parseInt(document.getElementById("inputNumDel").value))
      if (formatDelStringObj.status) {
        g_OutStr = formatDelStringObj.message;
        del_Output = splitStringToItem(del_Output, g_OutStr);
        formatOutput(del_Output, str_WIDTH);
        g_OutStr = formatOutputAll(del_Output);
      } else {
        g_OutStr = formatDelStringObj.message;
      }
    } else if (inputDetailOut) {
      g_OutStr = formatOutSpecificLine(g_OutPut, parseInt(document.getElementById("inputNumOut").value)).message;
    } else {
      g_OutStr = formatOutputAll(g_OutPut);
    }

    // step 4 output the info the UI
    console.log(g_OutStr);
    document.getElementById("outputResult").value = g_OutStr;
}

formatOutSpecificLine = (g_OutPut, lineNumber) => {
  if (g_OutPut[g_OutPut.length - 1].index < lineNumber) {
     return { status: false, message: "ERROR: Line number out of range" };
  }
  var out="";
  console.log("formatOutSpecificLine, lineNumber = ", lineNumber);
  g_OutPut.map( (item,index) => {
    out += (item.index === lineNumber) ? item.str : "";
  })
  return { status: true, message: out };
};

formatOutDelLine = (l_OutPut, delLineNumber) => {
  if (l_OutPut[l_OutPut.length-1].index < delLineNumber) {
    return { status: false, message: "ERROR: Line number out of range" };
  }
  var out = [];
  console.log("formatOutDelLine, delLineNumber = ", delLineNumber);
  l_OutPut.map((item, index) => {
    out += item.index !== delLineNumber ? item.str : "";
  });
  return { status: true, message:out};
};

formatOutputAll = l_OutPut => {
  // console.log(l_OutPut);
  var g_str = "";
  for (let i = 0; i < l_OutPut.length; i++) {
    g_str += l_OutPut[i].outPut();
  }
  return g_str;
};

isValidInput = (STR, WIDTH) => {
  if (STR === undefined || STR === null || STR === "") return {result:false,msg:"Empty String"};
  const pattern = /[^a-zA-Z|\s]/;
  if (isNaN(WIDTH)) {
      return { result: false, msg: "ERROR: not a Number, please input number between [10,80]" };
  } else if (!(WIDTH < 81 && WIDTH >= 10)) {
      return { result: false, msg: "ERROR: Width out of range" };
  } else if (pattern.test(STR)) {
      return { result: false, msg: "ERROR: Invalid character detected!" };
  }
    return { result: true, msg: "" };
};

formatOutput = (l_OutPut, str_WIDTH) => {
  var bufferCurrentLine = 0;
  var bufferInLine = 1;
  for (let i = 0; i < l_OutPut.length; i++) {
    bufferCurrentLine += l_OutPut[i].str.length;
    if (bufferCurrentLine < str_WIDTH) {
      l_OutPut[i].split.push(bufferInLine);
      l_OutPut[i].index = bufferInLine; // the first line index
    } else if (bufferCurrentLine === str_WIDTH) {
      bufferCurrentLine = 0;
      l_OutPut[i].split.push(bufferInLine);
      l_OutPut[i].index = bufferInLine; // the first line index
      bufferInLine += 1;
    } else {
      var numberOfMultiLine = Math.trunc(bufferCurrentLine / str_WIDTH);
      var nextLineOffset = bufferCurrentLine % str_WIDTH;
      l_OutPut[i].index = bufferInLine; // the first line index
      for (let j = 0; j <= numberOfMultiLine; j++) {
        l_OutPut[i].split.push(bufferInLine + j);
      }
      bufferCurrentLine = nextLineOffset;
      bufferInLine += numberOfMultiLine;
    }
  }
};

splitStringToItem = (l_OutPut,str_test) => {
    var str_item = "";
    const pattern = /\s/;
    for (let i = 0; i < str_test.length; i++) {
      const element = str_test[i];
      if (i === 0) {
        str_item += element;
        var isStartOrEndWithSpace = (pattern.test(element));
      } else {
        if (pattern.test(element) === isStartOrEndWithSpace) {
          str_item += element;
        } else {
          l_OutPut.push(new FormatString(l_OutPut.length, str_item, []));
          str_item = element;
          isStartOrEndWithSpace = pattern.test(element);
        }
      }
    }
    l_OutPut.push(new FormatString(l_OutPut.length, str_item, []));
    return l_OutPut;
}

class FormatString {
    constructor(index, str, split) {
        this.index = index;
        this.str = str;
        this.split = split;
    }
    outPut() {
        return this.str + "(" + this.split + ");";
    }
    get toString() {
        return this.outPut();
    }
}