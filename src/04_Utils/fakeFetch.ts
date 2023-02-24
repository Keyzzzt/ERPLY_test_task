export const fakeFetchFn = (cb: (value: boolean) => void, time: number) => {
    return setTimeout(() => {
        cb(false)
    }, time)
}