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
}