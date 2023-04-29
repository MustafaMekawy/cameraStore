export class Filter {
  constructor() {}
  filter(queryObj) {
    const queryParams = ['clientId', 'returnDate', 'month'];

    if (queryParams.includes(Object.keys(queryObj)[0])) return queryObj;

    return undefined;
  }
}
