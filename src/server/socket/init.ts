import 'rxjs'
import { Observable } from 'rxjs/Observable'

import { IUser } from '../models/user'

export const userClients = new Map()
export const companyClients = new Map()

export default function initSocket({ io }): void {
    io.on('connection', function (socket) {
        let _user

        Observable.fromEvent(socket, 'add user')
            .subscribe((user: IUser) => {
                _user = user

                if (userClients.has(user._id)) return

                userClients.set(user._id, socket.id)


                if (companyClients.has(user.company_id)) {
                    const company = companyClients.get(user.company_id)

                    if (!company.has(user._id)) {
                        company.set(user._id, socket.id)
                    }
                } else {
                    const map = new Map()
                    map.set(user._id, socket.id)
                    companyClients.set(user.company_id, map)
                }

            })

        socket.on('disconnect', function () {
            if (!_user) return

            userClients.delete(_user._id)
            companyClients.get(_user.company_id).delete(_user._id)
        })
    })

}
