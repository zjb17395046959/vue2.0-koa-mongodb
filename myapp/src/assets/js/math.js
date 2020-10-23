// //乘法的精确值
export var  NumberMul = function(arg1, arg2) {
    var m = 0;
    var s1 = arg1.toString();
    var s2 = arg2.toString();
    try {
        m += s1.split(".")[1].length;
        console.log(m)
    } catch (e) {}
    try {
        m += s2.split(".")[1].length;
    } catch (e) {}
  
    return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
  }
 
  export var NumberAdd1 = function (arg1, arg2, d) {
    arg1 = arg1.toString(), arg2 = arg2.toString();
    var arg1Arr = arg1.split("."),
        arg2Arr = arg2.split("."),
        d1 = arg1Arr.length == 2 ? arg1Arr[1] : "",
        d2 = arg2Arr.length == 2 ? arg2Arr[1] : "";
    var maxLen = Math.max(d1.length, d2.length);
    var m = Math.pow(10, maxLen);
    var result = Number(((arg1 * m + arg2 * m) / m).toFixed(maxLen));
    var d = arguments[2];
    return typeof d === "number" ? Number((result).toFixed(d)) : result;
}