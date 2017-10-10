import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import io from 'socket.io-client'

const socket = io('', { path: '/napi' })

export const connection = new BehaviorSubject(function(observer) {
    socket.on('connect', function () {
        observer.next(true)
    })

    socket.on('disconnect', function () {
        observer.next(false)
    })
})



export default socket
