const main = () => {
    console.log("==");
    const strr = "The     main theme of education in engineering    \
school is learning to teach yourself who is your";
    var buff_str ="";
    var storage = [];
    for (let i = 0; i < strr.length; i++) {
        const element = strr[i];
        //if (flag) buff_str = "";
        if ( i === 0) {
            buff_str += element;
            var flag = (element === " ");
            console.log("-0-", i, "*", flag);
        } else {
            if ( (element === " ") === flag ) {
                buff_str += element;
                console.log("-1-", i, buff_str, flag);
            } else {
                // storage = [...storage, buff_str];
                storage.push(buff_str);
                buff_str = element;
                flag = (element === " ");
                console.log("-2-", i, strr[i], flag)
                //console.log("-3-", buff_str, storage);
            }
        }
    }
    // storage = [...storage, buff_str];
    storage.push(buff_str)
    console.log(">>>", storage);

    storage_new =[];
    for (let i=0; i< storage.length;i++) {
        storage_new[i] = [];
    }
    console.log(storage_new);

    var buff_count = 0;
    const line_length = 20;
    var cnt = 1;
    storage.map((words, index) => {
        buff_count +=words.length;
        if (buff_count < line_length) {
            storage_new[index].push(cnt);
        } else if(buff_count === line_length) {
            buff_count = 0;
            storage_new[index].push(cnt);
            cnt+=1;
        } else {
            var x = Math.trunc(buff_count/line_length);
            var y = buff_count % line_length;
            for(let i=0 ; i< (x+1) ; i++){
                storage_new[index].push(cnt + i);
            }
            buff_count = y;
            cnt += x;
        }
        //console.log(words +"<>"+index);
    })


    var out_str = "";
    // 输出
    storage.map((words, index) => {
        out_str += words + "(";
        for(let i=0; i< (storage_new[index].length-1); i++){
            out_str += storage_new[index][i]+",";
        }
        out_str += storage_new[index][storage_new[index].length - 1] + ");"
    });
    console.log(out_str);
}