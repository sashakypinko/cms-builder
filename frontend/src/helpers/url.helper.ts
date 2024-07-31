export const replaceParamsInReactUrl = (url: string, params: any) => {
  return url
    .split('/')
    .map((el) => {
      if (el[0] === ':') {
        const attribute = el.substring(1);
        return params[attribute] ?? el;
      }
      return el;
    })
    .join('/');
};
