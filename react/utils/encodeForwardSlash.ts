/**
 * Encode all "/" by using $2F instead of %2F
 * Since "/" is a special character in URL, it can not be encoded normally,
 */
const encodeForwardSlash = (str: string) => {
  return str.replace(/\//gi, '$2F')
}

export default encodeForwardSlash
