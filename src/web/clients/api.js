import createApi from '../utils/createApi'

const base_url = '/client'
const api = createApi(base_url)
export default {
    ...api,
    loadList: api.list,
}
