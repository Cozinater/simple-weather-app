import dayjs from "dayjs";

export const roundTempToNearestDegree = (floatTemp) => {
    if (floatTemp !=='null' && floatTemp !=='undefined' && typeof floatTemp == 'number') {
        return Math.round(floatTemp);
    } 
    return ''
} 

export const getCurrentDateStr = () => {
    const curDateStr = dayjs().format('YYYY-MM-DD hh:mma');
    console.log(curDateStr);
    return curDateStr;
}

// export const convertDateObjectToString = (DateObj) => {
//     const dateStr = dayjs(DateObj).format('YYYY-MM-DD hh:mma')
//     console.log(dateStr);
// }