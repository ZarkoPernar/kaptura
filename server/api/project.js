const ProjectModel = require('../models/project')
const url = require('url')

module.exports = {
    async getItem(request, response) {
        const urlParts = url.parse(request.url, true)
        const id = urlParts.query.id

        const result = await ProjectModel.getItem(id)

        response.status(200).json(result)
    },

    async list(request, response) {
        const urlParts = url.parse(request.url, true)

        const result = await ProjectModel.list()

        response.status(200).json(result)
    },

    async create(request, response) {
        convertDates(request.body)
        const { lat, lng, name, google_address, description, created_by, start_date, end_date } = request.body
        const now = new Date()

        const result = await ProjectModel.create({ name })
        response.status(200).json(result)
    },

    async update(request, response) {
        const result = await ProjectModel.update(request.body)
        response.status(200).json(result)
    },

    async remove(request, response) {
        const result = await ProjectModel.remove(request.body._id)
        response.status(200).json(result)
    },
}

function convertDates(obj) {
    if (typeof obj.start_date === 'string') {
        obj.start_date = covertStrToDate(obj.start_date)
    }

    if (typeof obj.end_date === 'string') {
        obj.end_date = covertStrToDate(obj.end_date)
    }
}

function covertStrToDate(str) {
    const [day, month, year] = str.split('.').map(x => parseInt(x))
    return new Date(year, month, day)
}
