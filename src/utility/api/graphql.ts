export type GQLArgument = {
  name: string;
  value: any;
}

export type GQLField = string | {
  name: string;
  arguments?: GQLArgument[];
  fields: GQLField[]
}

export type GQLQuery = {
  type: 'query';
  fields: GQLField[];
}

export type GQLMutation = {
  type: 'mutation';
  fields: GQLField[];
}

export type GQLRequests = GQLQuery[] | GQLMutation[]

const dbURL = process.env.DB_URL || 'http://localhost:7890/api';

export const apiRequest = async (requests: GQLRequests): Promise<any> => {
  try {
    const requestsString = buildRequest(requests);
    console.log(requestsString);
    const results = await fetch(dbURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: requestsString,
      }),
    });

    const data = await results.json();
    return data;
  } catch (err) {
    return err;
  }
};

export const buildRequest = (requests: GQLRequests) => requests.map((request) => {
  const fields = buildFields(request.fields);
  return `${request.type}{${fields}}`;
}).join('');

const buildFields = (fields: GQLField[]): string => fields.map((field) => {
  if (typeof field !== 'string') {
    const subFields = buildFields(field.fields);
    return `${field.name}${buildArguments(field.arguments)}{${subFields}}`;
  }
  return field;
}).join(',');

const buildArguments = (args: GQLArgument[] | undefined): string => {
  if (!args) {
    return '';
  }

  return `(${args.map((arg) => `${arg.name}:${arg.value}`).join(',')})`;
};
