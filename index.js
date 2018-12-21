import * as fsys from './src/fsys'
import * as dataModification from './src/data-modification'
import * as ajax from './src/ajax'

const $ = require('jquery')

// const fs = require('fs')

const funcList = {
    ...fsys,
    ...dataModification,
    ...ajax
}

// console.log(fs)

let func = Object.keys(funcList)

let list = {}

func.map((it) => {
    list[it] = ({...args}) => {
        return new Promise((resolve, reject) => {
            return funcList[it]({resolve, reject}, {...args})
        })
    }
})

window.list = list