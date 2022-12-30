export default function hrefTranstion(text: string): string {
  const regex = /(https?:\/\/[^\s]+)/;
  const replacedText = text.replace(regex, '<a href="$1">$1</a>');
  return replacedText;
}
