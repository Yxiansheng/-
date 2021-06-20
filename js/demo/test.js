const new2 = (func, ...params) => {
  const o = Object.create(func.prototype)
  const ret = func.apply(o, params)
  return ret instanceof Object ? ret : o
}

const Animal = function (name) {
  this.name = name
}

const dog = new Animal('dog')
console.log(dog.constructor);
console.log(dog.constructor.prototype);

const cat = new2(Animal, 'cat')
console.log(cat.constructor);
console.log(cat.constructor.prototype);