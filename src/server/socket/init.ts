import 'rxjs'
import { Observable } from 'rxjs/Observable'

import { IUser } from '../models/user'
import { emitCompanySocket } from './api'

export const userClients = new Map() // { [user_id]: socket_id }
export const companyClients = new Map() // { [user_id]: socket_id } for company NS

const mapKeysToHash = map => {
    const hash = {}

    map.forEach((_, key) => {
        hash[key] = true
    })

    return hash
}

export default function initSocket({ io }): void {
    io.on('connection', function (mainSocket) {
        let _user

        Observable.fromEvent(mainSocket, 'add user')
            .subscribe((user: IUser) => {
                const companyNS = io.of('/company/' + user.company_id)

                _user = user
                userClients.set(user._id, mainSocket.id)



                companyNS.once('connection', companySocket => {
                    console.log('connection');

                    companySocket.broadcast.emit('user connected', user.full_name)
                    companyClients.set(user._id, companySocket.id)

                    companyNS.emit('online_users', mapKeysToHash(companyClients))
                })


                    // finally we send the newly connected user
                    // the full company roster of connected users

                    // TODO: use .clints(ids[])
                    // const hash = {}
                    // companyClients.get(user.company_id).forEach((_, user_id) => {
                    //     hash[user_id] = true
                    // })

                    // emitCompanySocket(user.company_id, {
                    //     type: 'online_users',
                    //     payload: hash,
                    // })

                })

        mainSocket.on('disconnect', function () {
            if (!_user) return

            const companyNS = io.of('/company/' + _user.company_id)

            userClients.delete(_user._id)
            companyClients.get(_user._id)

            companyNS.emit('online_users', mapKeysToHash(companyClients))
        })
    })

}
