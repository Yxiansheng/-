# Promise

## 实现Promise.all

```[js]
Promise.all = (quque) => new Promise((resolve, reject) => {
    const n = quque.length
    const result = new Array(n)    
    let overCount = 0

    quque.forEach((task, index) => {
        Promise.resolve(task).then((res) => {
            result[index] = res
            overCount += 1
            if (overCount === n) {
                resolve(result)
            }
        }).catch(err => {
            reject(err)
        })
    })
})   

const task1 = new Promise((resolve, reject) => setTimeout(() => resolve(1), 100))
const task2 = new Promise((resolve, reject) => setTimeout(() => resolve(2), 200))
const task3 = new Promise((resolve, reject) => setTimeout(() => resolve(3), 300))
const task4 = 3

Promise.all([task1, task2, task3, task4]).then(res => {
    console.log('res: ', res);
}).catch(err => {
    console.log('err', err)
})

Promise.resolve(() => 1).then(val => console.log(val));
```

## async await

```[js]
const asyncFun = (generatorFn) => {
    const gen = generatorFn()
    return new Promise((resolve, reject) => {
        if (!gen || typeof gen.next !== 'function') {
            reject(gen)
        }
        const next = (data) => {
            const result = gen.next(data)
            if (result.done) {
                resolve(result.value)
            }
            if (typeof result.value.then !== 'function') {
                next(result.value)
            } else {
                result.value.then(next).catch(reject)
            }
        }
        next()
    })
}

const sleep = (ms) => new Promise((resolve) => {
    const timer = setTimeout(() => {
        clearTimeout(timer)
        resolve(ms)
    }, ms)
})
asyncFun(function* () {
    const a = yield sleep(200)
    const b = yield sleep(400)
    return a + b
}).then(c => {
    console.log(c)
})
```