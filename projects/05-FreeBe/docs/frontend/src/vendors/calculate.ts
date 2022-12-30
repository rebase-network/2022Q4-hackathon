export default function calculate(num: string | number): string {
  const param = Number(num);
  if (param < 1000) {
    return `${param}`;
  } else if (param < 10000) {
    return `${Math.round(param / 100) / 10}k`;
  } else if (param < 1000000) {
    return `${Math.round(param / 1000)}k`;
  } else if (param < 1000000000) {
    return `${Math.round(param / 1000000)}m`;
  } else {
    return `${Math.round(param / 1000000000)}b`;
  }
}
