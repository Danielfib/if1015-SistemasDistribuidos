function calculate(a, b, op){
    var result = 0;
    switch(op){
        case '/':
            result = a / b;
            break;
        case '+':
            result = a + b;
            break;
        case '-':
            result = a - b;
            break;
        case '*':
            result = a * b;
            break;
    }
    return result.toString();
}

module.exports = {
    processOperation: function(msg){
        var elems = msg.split(' ')
        var a = parseFloat(elems[0]);
        var b = parseFloat(elems[1]);
        var op = elems[2];
        return calculate(a, b, op);
    }
}