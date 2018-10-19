export const leftPadding = (pad: string, value: string, maxLen: number): string =>
    ((pad.repeat(maxLen) + value.toString()).substr(maxLen * -1))

export const rightPadding = (pad: string, value: string, maxLen: number): string =>
    ((value.toString() + pad.repeat(maxLen)).substr(maxLen))