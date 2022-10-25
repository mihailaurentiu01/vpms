import { AxiosResponse } from 'axios';

export default {
  getFilteredErrorMessage(errorMessage: string) {
    if (errorMessage.includes('ERR_NETWORK'))
      return 'errorMessages.networkError';

    return 'errorMessages.unexpected';
  },
  wait(ms: number, fn: () => any) {
    return new Promise<void>((resolve) => {
      setTimeout(() => resolve(fn()), ms);
    });
  },
  transformData<T>(data: Array<T>) {
    const transformedData: Array<T> = [];

    for (const key in data) {
      const dataObj = {
        id: key,
        ...data[key],
      };

      transformedData.push(dataObj);
    }

    return transformedData;
  },
  serializeObject(obj: {}) {
    return JSON.parse(JSON.stringify(obj));
  },
};
