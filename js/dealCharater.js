const main = () => {
    var g_OutPut = [];
    var g_OutStr = "";
    const str_test = "The main theme of education in engineering school is learning to teach yourself";
    //const str_test = "So   many whitespaces";
    const str_WIDTH = 30;
    // const str_test = document.getElementById("inputStr").value;
    // const str_WIDTH = document.getElementById("inputNum").value;

    if (!(result = isValidInput(str_test, str_WIDTH)).result){
        console.log(result.msg);
        document.getElementById("outputResult").value = result.msg;
        return;
    }

    splitStringToItem(g_OutPut,str_test);
    g_OutStr = formatOutput(g_OutPut, str_WIDTH);
    console.log(g_OutStr);
    document.getElementById("outputResult").value = g_OutStr;
}

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

formatOutput = (g_OutPut, str_WIDTH) => {
  var bufferCurrentLine = 0;
  var bufferInLine = 1;
  for (let i = 0; i < g_OutPut.length; i++) {
    bufferCurrentLine += g_OutPut[i].str.length;
    if (bufferCurrentLine < str_WIDTH) {
      g_OutPut[i].split.push(bufferInLine);
    } else if (bufferCurrentLine === str_WIDTH) {
      bufferCurrentLine = 0;
      g_OutPut[i].split.push(bufferInLine);
      bufferInLine += 1;
    } else {
      var numberOfMultiLine = Math.trunc(bufferCurrentLine / str_WIDTH);
      var nextLineOffset = bufferCurrentLine % str_WIDTH;
      for (let j = 0; j <= numberOfMultiLine; j++) {
        g_OutPut[i].split.push(bufferInLine + j);
      }
        bufferCurrentLine = nextLineOffset;
        bufferInLine += numberOfMultiLine;
    }
  }

  // console.log(g_OutPut);
  var g_str = "";
  for (let i = 0; i < g_OutPut.length; i++) {
    g_str += g_OutPut[i].outPut();
  }
  return g_str;
};

splitStringToItem = (g_OutPut,str_test) => {
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
          g_OutPut.push(new FormatString(g_OutPut.length, str_item, []));
          str_item = element;
          isStartOrEndWithSpace = pattern.test(element);
        }
      }
    }
    g_OutPut.push(new FormatString(g_OutPut.length, str_item, []));
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