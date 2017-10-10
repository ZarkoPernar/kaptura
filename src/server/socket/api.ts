import { companyClients } from './init'
import { io } from './index'

interface SocketAction {
    type: string
    payload: any
}

export function emitCompanySocket(company_id, { type, payload }: SocketAction, ignoreUser?: string | string[]) {
    const shouldIgnoreUser = Array.isArray(ignoreUser) ? uid => ignoreUser.includes(uid) : uid => uid === ignoreUser

    if (companyClients.has(company_id)) {
        if (companyClients.get(company_id)) {
            companyClients
                .get(company_id)
                .forEach((socket_id, user_id) => {
                    // this is the user that initiated the update
                    // so we do not notify him
                    if (shouldIgnoreUser(user_id)) return

                    io.sockets.connected[socket_id].emit(type, payload)
                })

        }
    }
}
