import { isEqual, pickBy } from "lodash"

/**
 * returns a promise that will be fulfilled in 'ms' milliseconds
 * @param {number} ms - Time in millisecond
 */
export const timeout = (ms: number): Promise<void> =>
    new Promise((r) => setTimeout(r, ms))

/**
 * returns an array with length equals (to - from / step). If not "to", it will be [0, from)
 * @param {number} from - start value
 * @param {number} to - end value
 * @param {number} [step=1] - step value
 */
export const range = (from: number, to?: number, step = 1): Array<number> => {
    if (!to) {
        ;[from, to] = [0, from]
    }
    const size = Math.floor((to - from) / step)
    if (size <= 0) return []
    return [...Array(size).keys()].map((k) => from + k * step)
}

/**
 * returns value, if it is between a and b.
 * otherwise, returns the number it's gone past.
 */
export const clamp = (value: number, min: number, max: number): number =>
    min < max
        ? value < min
            ? min
            : value > max
            ? max
            : value
        : value < max
        ? max
        : value > min
        ? min
        : value

/**
 * returns random number [from, to). If not "to", it will be [0, from)
 * @param {number} from - start value
 * @param {number} to - end value
 */
export const random = (from: number, to?: number): number => {
    if (!to) {
        ;[from, to] = [0, from]
    }
    to -= from
    return Math.floor(Math.random() * to + from)
}

/**
 * returns a string with a capital first letter
 * @param {string} str - some string
 */
export const capitalizeFirstLetter = (str: string): string =>
    str ? str[0].toUpperCase() + str.slice(1) : str

/**
 * returns an image data url
 * @param {string} base64 - base64
 * @param {string} extension - image extension
 */
export const getDataUrl = (base64: string, extension: string): string =>
    `data:image/${extension};base64,${base64}`

/**
 * returns a base64 string from data url
 * @param {string} dataUrl - data url
 */
export const getBase64 = (dataUrl: string): string | null =>
    dataUrl?.split(";base64,")[1] || null

export const isEmailValid = (email: string) => {
    const emailRE = new RegExp(
        "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$"
    )
    return emailRE.test(email)
}

export function getChangedFields<T extends Record<any, any>>(
    currentObject: T,
    previousObject: T
): T {
    return Object.keys(currentObject).reduce((changed, key) => {
        if (!isEqual(currentObject[key], previousObject[key])) {
            return { ...changed, [key]: currentObject[key] }
        }
        return changed
    }, {} as T)
}

/**
 * takes filter text and array of string values, split it to words and search
 * returns true if at least one match exists
 * @param filter filter string
 * @param values array of string values to search
 */
export const search = (filter: string, values: Array<string>): boolean => {
    const filterWords = filter.split(" ").map((word) => word.toLowerCase())
    return values.some((value) => {
        const valueWords = value.split(" ").map((word) => word.toLowerCase())
        return filterWords.some((filterWord) =>
            valueWords.some((valueWord) => valueWord.indexOf(filterWord) !== -1)
        )
    })
}

/**
 * returns object without fields with names from keys array
 */
export const except = (object: any, keys: Array<string>): any =>
    pickBy(object, (_, key) => !keys.includes(key))

/**
 * pick fields from object
 */
export const pick = (object: any, keys: Array<string>): any =>
    pickBy(object, (_, key) => keys.includes(key))

/**
 * returns stringified variable if it's not string already
 * otherwise insta returns variable
 * @param object {any} var to stringify
 * @returns {string} stringified value
 */
export const stringify = (object: any) => {
    if (typeof object === "string") {
        return object
    }
    return JSON.stringify(object)
}
