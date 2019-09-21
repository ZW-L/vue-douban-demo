const SPEED_SLOW = 1;
const SPEED_MIDDLE = 3;

export function speedCalc(arr) {
  const index = arr.findIndex(v => v === null);
  let max = 0;
  let temp;
  let newArr;

  if (index === arr.length - 1) {
    newArr = arr.slice(0, index);
  } else {
    newArr = arr.slice(index + 1).concat(arr.slice(0, index));
  }

  console.log(newArr);

  if (!newArr[1]) {
    return [max, 'slow'];
  }

  const behavior = newArr[0] >= newArr[newArr.length - 1] ? 'pullUp' : 'pullDown';

  for (let i = 0; i < newArr.length - 1; i += 1) {
    temp = Math.abs((newArr[i + 1][0] - newArr[i][0]) / (newArr[i + 1][1] - newArr[i][1]));
    max = temp > max ? temp : max;
  }

  if (max < SPEED_SLOW) {
    return [max, 'slow', behavior];
  }

  if (max < SPEED_MIDDLE) {
    return [max, 'middle', behavior];
  }

  return [max, 'fast', behavior];
}
