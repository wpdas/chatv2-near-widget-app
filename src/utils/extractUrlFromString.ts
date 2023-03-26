const extractUrlFromString = (text: string) => text.match(/\bhttps?:\/\/\S+/gi);
export default extractUrlFromString;
