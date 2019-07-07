import { Request } from 'express'

/**
 * Generic Request Interface to be loaded with specifialized body definitions pr Request
 **/
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface IGenericRequestInterface<T = any> extends Request {
  query: T
}
