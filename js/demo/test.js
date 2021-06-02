const o = {}
Object.defineProperty(o, 'a', {
    configurable: false,
    value: 1,
    writable: false
})

console.log(Reflect.defineProperty(o, 'a', {
    writable: true
})); // false