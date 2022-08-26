export function uuidV4() {
  let d = new Date().getTime(); //Timestamp
  let d2 = new Date().getTime() * 1000 || 0; //Time in microseconds since page-load or 0 if unsupported
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    let r = Math.random() * 16; //random number between 0 and 16
    if (d > 0) {
      //Use timestamp until depleted
      r = (d + r) % 16 | 0;
      d = Math.floor(d / 16);
    } else {
      //Use microseconds since page-load if supported
      r = (d2 + r) % 16 | 0;
      d2 = Math.floor(d2 / 16);
    }
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
  });
}

export function removeHttp(url) {
  return url.replace(/^https?:\/\//, '');
}
/**
 * @description function to remove any emoji
 * @param {text} string
 * @returns {String} with not includes emoji
 */
export function removeEmoji(text) {
  return text
    ?.toString()
    ?.replace(
      /(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/g,
      ''
    );
}

export const checkImageURL = (url, callback) => {
  const request = new XMLHttpRequest();
  request.open('GET', url || 'https://', true);
  request.send();
  request.onload = function () {
    if (request.status === 200) {
      callback(true);
    } else {
      callback(false);
    }
  };
};
