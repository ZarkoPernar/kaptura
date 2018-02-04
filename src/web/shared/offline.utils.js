import { v4 } from 'uuid'

export function createOfflineId() {
    return 'offline-' + v4()
}
