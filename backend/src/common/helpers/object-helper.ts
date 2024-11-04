export const getNestedValue = <T>(obj: T, path: string): any => {
  const keys = path.replace(/\[(\w+)\]/g, '.$1').split('.');
  let current: any = obj;

  for (const key of keys) {
    if (current && key in current) {
      current = current[key];
    } else {
      return undefined;
    }
  }
  return current;
};

export const setNestedValue = <T>(obj: T, path: string, value: any): void => {
  const keys = path.replace(/\[(\w+)\]/g, '.$1').split('.');
  let current: any = obj;

  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];

    if (!(key in current) || typeof current[key] !== 'object') {
      current[key] = {};
    }

    current = current[key];
  }

  current[keys[keys.length - 1]] = value;
};
