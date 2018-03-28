import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import io from 'socket.io-client'
import 'rxjs/add/operator/filter'

const socket = io('', { path: '/napi' })

export function createCompanySocket(company_id) {
    return io('/company/' + company_id, { path: '/napi' })
}

export const connection = new BehaviorSubject(function(observer) {
    socket.on('connect', function() {
        observer.next(true)
    })

    socket.on('disconnect', function() {
        observer.next(false)
    })
})

export default {
    socket,
    connection,
    companySocket$: new BehaviorSubject(null).filter(Boolean),
    createCompany(company_id) {
        if (this._companySocket === undefined) {
            this.companySocket = createCompanySocket(company_id)
            this.companySocket$.next(this.companySocket)
        }

        return this.companySocket
    },
}
