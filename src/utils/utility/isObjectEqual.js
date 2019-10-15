/*
 * 判断两个对象是否相同
 */
function isObj(object) {
    return object && typeof(object) === 'object' && Object.prototype.toString.call(object).toLowerCase() === '[object object]'
}

// function isArray(object) {
//     return object && typeof(object) === 'object' && object.constructor === Array
// }

function getLength(object) {
    var count = 0
    count += Object.keys(object).length
    return count
}

function Compare(objA, objB) {
    // console.log(objA)
    // console.log(objB)
    if (!isObj(objA) || !isObj(objB)) return false
    // if ((!isObj(objA) && isObj(objB)) || (isObj(objA) && !isObj(objB))) return true
    if (getLength(objA) !== getLength(objB)) return false
    return CompareObj(objA, objB, true)
}

function CompareObj(objA, objB, flag) {
    for (let key in objA) {
        if (!flag) break

        if (!objB.hasOwnProperty(key)) {
            flag = false
            break
        }
        if (!Array.isArray(objA[key])) {
            if (objB[key] !== objA[key]) {
                flag = false
                break
            }
        } else {
            if (!Array.isArray(objB[key])) {
                flag = false
                break
            }

            let oA = objA[key].sort()
            let oB = objB[key].sort()

            if (oA.length !== oB.length) {
                flag = false
                break
            }

            for (let k in oA) {
                if (!flag) break
                if (isObj(oA[k]) || Array.isArray(oA[k])) {
                    flag = CompareObj(oA[k], oB[k], flag)
                } else {
                    flag = oA[k] === oB[k]
                }
            }
        }
    }
    return flag
}

export default Compare
