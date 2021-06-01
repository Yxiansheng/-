let pwd = '))20Uq%0'
const l = pwd.length
if (l < 8) {
  console.log("NG")
  return
}

let upCase = 0, lowCase = 0, num = 0, other = 0
let conditionThreeError = false
const childSet = new Set()

for (let i = 0; i < l; i++) {
  const char = pwd[i]
  if (char >= 'A' && char <= 'Z') upCase = 1
  else if (char >= 'a' && char <= 'z') lowCase = 1
  else if (char >= '0' && char <= '9') num = 1
  else other = 1

  if (i < l - 3) {
    const childStr = pwd.slice(i, i + 3)
    if (childSet.has(childStr)) {
      conditionThreeError = true
      break
    } else {
      childSet.add(childStr)
    }
  }
}

if (conditionThreeError || (upCase + lowCase + num + other < 3)) {
  console.log('NG')
} else {
  console.log('OK')
}