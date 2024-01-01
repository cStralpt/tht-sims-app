export default function formatNumberIntoIdr(number: number) {
  const formattedNumber = new Intl.NumberFormat("id-ID", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
    useGrouping: true,
  }).format(number);
  return formattedNumber;
}
