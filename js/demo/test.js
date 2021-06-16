/**
 * @desc 柯里化函数
 * @param {*} func 
 * @returns 
 */
const currying = (func) => {
  const args = []
  const newFunc = function () {
    if (arguments.length === 0) {
      return func.apply(this, args)
    } else {
      args.push(arguments[0])
      return newFunc
    }
  }
  return newFunc
}

const add = currying((a, b, c) => {
  return a + b + c
})

console.log(add(1)(2)(3)());