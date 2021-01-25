import { onDoneType } from '../dist/index.js'

const input = document.querySelector('input')

const type = document.querySelector('type')

Object.assign(input, onDoneType((e) => type.textContent = e.target.value))