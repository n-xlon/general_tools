import * as fsys from './src/fsys'

let fs = require('fs')


const PROMISE = new Promise((resolve, reject) => {
    return {resolve, reject}
})

const funcList = {
    ...fsys
}

console.log(fs)

let func = Object.keys(funcList)

let list = {}

func.map((it) => {
    list[it] = ({...args}) => {
        funcList[it]({fs, promise: PROMISE}, {...args})
    }
})

// window.list = list