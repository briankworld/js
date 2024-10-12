export function throttle(fn, timeout) {
    let id = null

    return function(...args) {
        if (!id) {
            fn.apply(this, args)
            id = setTimeout(() => {
                id = null
            }, timeout)
        }
    }
}
