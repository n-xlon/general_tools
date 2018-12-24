import * as fsys from './src/fsys'
import * as dataModification from './src/data-modification'
import * as ajax from './src/ajax'
import { isFields } from './src/props'

const $ = require('jquery')
const list = {}

// import fs from 'fs'

const funcList = {
    ...fsys,
    ...dataModification,
    ...ajax
}

// console.log(fs)
const props = {
	too: { isFields }
}

let func = Object.keys(funcList)

func.map((it) => {
    list[it] = ({...args}) => {
        return new Promise((resolve, reject) => {
            return funcList[it]({...props, resolve, reject}, {...args})
        })
    }
})

window.list = list