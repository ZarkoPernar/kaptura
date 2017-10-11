import { userClients, companyClients } from './init'
import { io } from './index'

interface SocketAction {
    type: string
    payload: any
    room?: string
}

export function emitCompanySocket(company_id, { type, payload, room }: SocketAction, ignoreUser?: string) {
    const companySocketNS = io.of(`/company/${company_id}`)
    const socketId = companyClients.get(ignoreUser)
    const companySocketForUser = companySocketNS.connected[socketId]

    if (ignoreUser !== undefined && companySocketForUser !== undefined) {
        return companySocketNS.broadcast.emit(type, payload)
    }

    return companySocketNS.emit(type, payload)
}
