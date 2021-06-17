export class QueryParamBuilder {
  private parameters: QueryParameter[];

  constructor() {
    this.parameters = [];
  }

  addParam(param: QueryParameter): QueryParamBuilder {
    this.parameters.push(param);
    return this;
  }

  toString(): string {
    const urlSearchParams = new URLSearchParams();

    this.parameters.forEach((p) => {
      if (p.value) {
        urlSearchParams.append(p.name, p.value);
      }
    });

    const str = urlSearchParams.toString();
    return str.length > 0 ? `?${str}` : str;
  }
}

export interface QueryParameter {
  name: string;
  value?: string;
}
