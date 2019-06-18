interface Result {
  protocol: string;
  slashes: boolean;
  auth: boolean | null;
  host: string;
  port: string | null;
  hostname: string;
  hash: null | string;
  search: null | string;
  query: null | string;
  pathname: string;
  path: string;
  href: string;
}

declare const fn: (url: string, options?: any) => Result;

declare module 'url-parse-lax' {
  export = fn;
}
