export const timestampToYYYYMMDDHHMM = (timestamp: number): string => {
    var date = new Date(timestamp);
    var year = date.getFullYear();
    var month = "0" + (date.getMonth() + 1);
    var day = "0" + date.getDate();
    var hours = "0" + date.getHours();
    var minutes = "0" + date.getMinutes();

    return year + '-' + month.substr(-2) + '-' + day.substr(-2) + 'T' + hours.substr(-2) + ':' + minutes.substr(-2);
}

export const nowYYYYMMDDHHMM = (): string => (timestampToYYYYMMDDHHMM(new Date().getTime()))

export const YYYYMMDDHHMMToTimestamp = (dateTime: string): number => (Date.parse(dateTime))