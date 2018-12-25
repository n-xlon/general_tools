/**
 * 数组去重
 * @param arrList  Array  需要去重的数组
 * @param uniqueJudge  String  判断唯一的字段名
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

/**
 *
 * @param arr  Array  需要排序的数组
 * @param sort   String  排序的方式（升序、降序）
 * @param sortKeyWord   String  根据排序的字段名
 * @param key  String  关键字的类型（数字、时间 ex: '2018-12-25'或'2018/12/25'）
 */
export function sortArray ({too, resolve, reject}, {arr, sort = 'desc', sortKeyWord = '', key = 'number'}) {
    if (too.isFields(arr) === 'array') {
        let keyList = []
        let nokeyList = []
        let resList = []
        if (sortKeyWord) {
            if (key === 'number') {
                arr.map((it) => {
                    if (sortKeyWord in it) {
                        keyList.push(it[sortKeyWord])
                    } else {
                        nokeyList.push(it)
                    }
                })
            } else if (key === 'time') {
                arr.map((it) => {
                    if (sortKeyWord in it) {
                        let tm = it[sortKeyWord].split(' ')[0].split('-') || it[sortKeyWord].split(' ')[0].split('/')
                        if (tm.length > 3) {
                            nokeyList.push(it)
                            return
                        } else {
                            let res = tm.filter((time) => {
                                if (isNaN(time)) return true
                            })
                            if (res.length > 0) {
                                nokeyList.push(it)
                                return
                            }
                        }
                        keyList.push(+new Date(it[sortKeyWord]).getTime())
                    } else {
                        nokeyList.push(it)
                    }
                })
            }
            if (keyList.length === 0) reject('Error: sortKeyWord wasn`t found')
        } else {
            resList = arr.sort((a, b) => {
                if (sort === 'desc') {
                    return b - a
                } else {
                    return a - b
                }
            })
            resolve(resList)
        }
        keyList.sort((a, b) => {
            if (sort === 'desc') {
                return b - a
            } else {
                return a - b
            }
        })
        keyList.map((it) => {
            arr.filter((dt) => {
                let data = dt[sortKeyWord]
                if (key === 'time') {
                    data = new Date(data).getTime()
                }
                if (+data === it) {
                    resList.push(dt)
                }
            })
        })
        if (resList.length === arr.length) {
            resolve([...resList, ...nokeyList])
        } else {
            reject('Error: array length isn`t this same source array!')
        }
    } else {
        reject('Error: typeof isn`t array!')
    }
}

/**
 * 过滤符合筛选条件的数据
 * @param obj  Array  需要过滤的数组
 * @param ln  Array/Object  筛选条件
 * @param key  String  需要过滤的key
 */
export function filterObjectElements ({too, resolve, reject}, {obj = [], ln = [], key}) {
    if (too.isFields(obj) === 'array') {
        let result = obj.filter((it) => {
            if (ln.indexOf(it[key]) >= 0) {
                return true
            }
        })
        resolve(result)
    } else {
        reject('Error: typeof isn`t array!')
    }
}