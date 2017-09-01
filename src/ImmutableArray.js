export default class ImmutableArray extends Array {
    __isSuperArray__ = true

    push(el) {
        return this.concat(el)
    }

    pop() {
        return this.slice(0, this.length - 1)
    }

    shift(el) {
        return new ImmutableArray(el, ...this)
    }

    isEmpty() {
        return this.length === 0
    }

    first() {
        return this[0]
    }

    last() {
        return this[this.length - 1]
    }

    clone() {
        return this.slice()
    }
}
