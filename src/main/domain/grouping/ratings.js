module.exports.average = (item1, item2) => {
    var result = new Array()
    for(let i = 0; i < 5; i++) {
        result.push(new Array())
        for(let j = 0; j < 16; j++) {
            result[i].push(new Array())
            let amount = 0;
            let opnions = 0
            for(let k = 0; k < item1[i][j].length; k++) {
                amount += item1[i][j][k].rating
                opnions++
            }
            for(let k = 0; k < item2[i][j].length; k++) {
                amount += item2[i][j][k].rating
                opnions++
            }
            if(opnions !== 0) {
                result[i][j].push({time: j + 7, day:i, rating: amount/opnions})
            }
        }
    }
    return result
}

module.exports.multiplicative = (item1, item2) => {
    var result = new Array()
    for(let i = 0; i < 5; i++) {
        result.push(new Array())
        for(let j = 0; j < 16; j++) {
            result[i].push(new Array())
            let amount = 1;
            let opnions = 0
            for(let k = 0; k < item1[i][j].length; k++) {
                amount *= item1[i][j][k].rating
                opnions++
            }
            for(let k = 0; k < item2[i][j].length; k++) {
                amount *= item2[i][j][k].rating
                opnions++
            }
            if(opnions !== 0) {
                result[i][j].push({time: j + 7, day:i, rating: Math.pow(amount, 1/opnions)})
            }
        }
    }
    return result
}