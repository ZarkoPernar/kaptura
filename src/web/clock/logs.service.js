import { getLast, inOut } from './clock'

export function updateLastLog(log) {
    return function updateState(state) {
        const logs = updateArr(
            state.logs,
            el => el.check_in === getLast(state.logs).check_in,
            log,
        )

        return { logs }
    }

}

export function appendLog(log) {
    return function updateState(state) {
        const logs = [
            ...state.logs,
            log,
        ]
        return { logs }
    }
}

export function getFromStorage(logs) {
    const storage = JSON.parse(window.localStorage.getItem('logs'))
    return Array.isArray(storage) ? storage : logs
}

function addToStorage(logs) {
    window.localStorage.setItem('logs', JSON.stringify(logs))
}

function updateArr(arr, compareFn, updateEl) {
    const newArr = []
    let index = 0

    for (index; index < arr.length; index++) {
        newArr[index] = compareFn(arr[index]) ? updateEl : arr[index]
    }

    return newArr
}

