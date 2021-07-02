const map = new Map()
map.set('Array', [1, 2, 3, 4])
map.set('Set', new Set([1, 2, 3, 4]))
map.set('String', 'Hello!')
map.set('Map', new Map([[0, 1], [1, 2], [2, 3], [3, 4]]))

for (let [type, iterator] of map) {
    let str = ''
    for (let value of iterator) {
        str += `${value}, `;
    }
    console.log(`${type}：${str.slice(0, -2)}`);
}

function func () {
    let str = ''
    for (let arg of arguments) {
        str += `${arg}, `;
    }
    console.log(`arguments：${str.slice(0, -2)}`)
}
func('arg1', 'arg2', 'arg3', 'arg4')

const interator = 'ssdsd'[Symbol.iterator]()

console.log('interator: ', interator);
let cur = interator.next()
while (!cur.done) {
    console.log(cur.value);
    cur = interator.next()
}
for (let char in 'hello world!') {
    console.log('char: ', char);
}
