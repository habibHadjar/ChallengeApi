export interface IIndexQuery {
  page?: string;
  limit?: string;
}

export type IReadWhere = Record<string, string|number>;

/* Ici, on utilise un générique, précisé par <T>
Ca veut dire qu'on va passer un autre type comme paramètre, qui sera utilisé à sa place
ex. const res : IIndexResponse<IUser> = {
  rows: [] // <-- Ici on ne peut juste affecter les structures de type IUser
}
*/
export interface IIndexResponse<T> {
  page: number;
  limit: number;
  total: number;
  rows: T[];
}

/**
 * Structure retourné par MySQL quand on fait une requête de type `count(*)`
 */
export interface ITableCount {
  total: number;
}

export interface IApiError {
  code: ErrorCode,
  structured: StructuredErrors,
  message?: string,
  details?: any,
}

export enum ErrorCode {
  NotFound = 404,
  Unauthorized = 403,
  BadRequest = 400,
  TokenExpired = 410,
  TooManyRequests = 429,
  InternalError = 500
}


export type StructuredErrors =
// SQL
  'sql/failed' |
  'sql/not-found' |

  // Crud
  'validation/failed' |

  // Authorization
  'auth/missing-email' |
  'auth/unknown-email' |
  'auth/missing-magic-link-token' |
  'auth/invalid-magic-link-token' |
  'auth/missing-header' |
  'auth/access-token-expired' |
  'auth/invalid-access-token' |


  // Default
  'internal/unknown'
  ;