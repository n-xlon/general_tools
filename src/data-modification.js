/**
 * 数组去重
 */
export function duplicateRemoval ({resolve, reject}, {arrList, uniqueJudge}) {
    if (Array.isArray(arrList)) {
        let uniqueValList = []
        if (uniqueJudge && typeof uniqueJudge === 'string') {
            let uniqueKeys = []
            arrList.map((it) => {
                if (uniqueKeys.indexOf(it[uniqueJudge]) < 0) {
                    uniqueKeys.push(it[uniqueJudge])
                    uniqueValList.push(it)
                }
            })
        } else {
            let uniqueVal = new Set(arrList)
            console.log(uniqueVal)
            for(const value of uniqueVal) {
                uniqueValList.push(value)
            }
        }
        resolve(uniqueValList)
    } else {
        reject('Error: arrList typeof isn`t array')
    }
}