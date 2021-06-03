const Node = function (val, left = null, right = null) {
    this.val = val
    this.left = left
    this.right = right
}

const generateSearchTree = (root, val) => {
    const newNode = new Node(val)
    if (root.val > val) {
        if (!root.left) {
            root.left = newNode
        } else {
            generateSearchTree(root.left, val)
        }
    } else {
        if (!root.right) {
            root.right = newNode
        } else {
            generateSearchTree(root.right, val)
        }
    }
}

const Tree = function (arr) {
    this.root = null
    if (!Array.isArray(arr) || !arr.length) return
    const _root = new Node(arr[0])
    for (let i = 1; i < arr.length; i++) {
        generateSearchTree(_root, arr[i])
    }
    this.root = _root
}

Tree.prototype[Symbol.iterator] = function* () {
    const root = this.root
    const stack = [root]
    while (stack.length) {
        const cur = stack.pop()
        yield cur.val
        if (cur.right) stack.push(cur.right)
        if (cur.left) stack.push(cur.left)
    }
}

const t = new Tree([1, 3, 2, 4, 6, 8, 5])

const run = (fn) => {
    const gen = fn()
    const next = (data) => {
        const result = gen.next(data)
        if (result.done) return
        result.value(next)
    }
    next()
}

run(function* () {
    const a = yield (success) => {
        const timer = setTimeout(() => {
            clearTimeout(timer)
            success(1)
        }, 300)
    }
    const b = yield (success) => {
        const timer = setTimeout(() => {
            clearTimeout(timer)
            success(2)
        }, 500)
    }
    console.log(a + b)
})