export function getRandomColor() {
  const red = Math.round(Math.random() * 256);
  const green = Math.round(Math.random() * 256);
  const blue = Math.round(Math.random() * 256);
  return `rgba(${red}, ${green}, ${blue})`;
}
