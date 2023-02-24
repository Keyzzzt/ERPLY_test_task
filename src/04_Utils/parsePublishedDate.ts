export const parsePublishedDate = (str: string) => {
    if (str) {
        const arr = str.split('T')
        return arr[0].split('-').reverse().join('.')
    }
}