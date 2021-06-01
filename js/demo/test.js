class MyArray {
    constructor(n) {
        return new Array(n)
    }
    static [Symbol.hasInstance] (instance) {
        return Array.isArray(instance)
    }
}

const a = new MyArray(1)
const b = {}

console.log(a instanceof MyArray);
console.log(b instanceof MyArray);