export type StringParameter = string | null;

export type NumberParameter = number | null;

type RequestMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export interface ApiRequest {
  method: RequestMethod;
  url: string;
  form?: boolean;
  body?: any;
  headers?: any;
  authHeader?: StringParameter;
  qs?: any;
}

export interface ApiResponse {
  status: number;
  headers: any;
  body: any;
  duration: any;
}