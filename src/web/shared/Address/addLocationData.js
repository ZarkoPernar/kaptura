import pick from 'lodash/pick'

import { ADDRESS_COMPONENTS } from './const'

export default function addLocationData(item, data) {
    console.log(item, data);

    return {
        ...item,
        ...pick(data, ADDRESS_COMPONENTS),
    }
}
