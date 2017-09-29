import { IRequest } from './request.interface'

export function asyncWrap(fn: Function) {
  return (req: IRequest, res, next) => {
    fn(req, res, next).catch(next)
  }
}
