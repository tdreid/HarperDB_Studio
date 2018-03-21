var works = [{
        work: 1,
        result: 50,
        time: 2
    },
    {
        work: 2,
        result: 10,
        time: 1
    },
    {
        work: 3,
        result: 15,
        time: 2
    },
    {
        work: 4,
        result: 30,
        time: 1
    },
    {
        work: 5,
        result: 70,
        time: 3
    }
];

var findMaxObject = (array, prop) => {
    var maxObj = array[0]
    array.forEach(element => {
        if (element[prop] > maxObj[prop])
            maxObj = element
    });
    return maxObj;
}

var deleteObject = (array, prop, unique) => {
    array = array.filter(function (el) {
        return el[prop] !== unique;
    });
    return array;

}
var queue = [];
var allTime = 7;
while (allTime > 0 && works.length >= 0) {
    var maxObj = findMaxObject(works, 'result');
    if (allTime >= maxObj.time) {
        queue.push(maxObj.work)
        works = deleteObject(works, 'work', maxObj.work)
        allTime -= maxObj.time;

    } else
        works = deleteObject(works, 'work', maxObj.work)
}

console.log(queue);