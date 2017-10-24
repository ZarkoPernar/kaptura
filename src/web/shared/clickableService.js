
export function getScrollHost(document) {
    return (
        document.documentElement ||
        document.body.parentNode ||
        document.body
    )
}

export function createRipple(event, scrollHost) {
    const scrollTop = scrollHost.scrollTop

    return {
        pageX: event.pageX,
        pageY: (event.pageY - scrollTop)
    }
}
