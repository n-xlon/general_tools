/**
 * 数组去重
 */
export function duplicateRemoval ({too, resolve, reject}, {arrList, uniqueJudge}) {
    if (too.isFields(arrList) === 'array') {
        let uniqueValList = []
        if (uniqueJudge && typeof too.isFields(uniqueJudge) === 'string') {
            let uniqueKeys = []
            arrList.map((it) => {
                if (uniqueKeys.indexOf(it[uniqueJudge]) < 0) {
                    uniqueKeys.push(it[uniqueJudge])
                    uniqueValList.push(it)
                }
            })
        } else {
            let uniqueVal = new Set(arrList)
            for(const value of uniqueVal) {
                uniqueValList.push(value)
            }
        }
        resolve(uniqueValList)
    } else {
        reject('Error: arrList typeof isn`t array')
    }
}