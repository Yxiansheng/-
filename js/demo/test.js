const func = function (...args) {
  console.log(this.desc);
  console.log('args', args)
}

const a = {
  desc: 'This is a!'
}
const b = {
  desc: 'This is b!'
}

func.call(a, 1, 2, 3)
func.apply(a, [1, 2, 3])