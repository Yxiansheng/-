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

function test(...args) {
    console.log(args);
}
test(1, 22)
