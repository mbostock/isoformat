export default function parse(string) {
  return /^([-+]\d{2})?\d{4}(-\d{2}(-\d{2})?)?(T\d{2}:\d{2}(:\d{2}(\.\d{3})?)?(Z|[-+]\d{2}:?\d{2})?)?$/.test(string += "")
    ? new Date(string)
    : null;
}
