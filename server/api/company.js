"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const company_1 = require("../models/company");
// export async function getItem(request: IRequest, response: Response) {
//     const urlParts = url.parse(request.url, true)
//     const id = urlParts.query.id
//     const result = await TimesheetModel.getItem(id, request.user)
//     response.status(200).json(result)
// }
async function update(request, response) {
    const item = request.body;
    const newItem = Object.assign({}, item);
    if (item.latitude && item.longitude) {
        newItem.position = {
            type: 'Point',
            coordinates: [item.longitude, item.latitude]
        };
    }
    const result = await company_1.default.update({
        company: newItem,
        user: request.user,
    });
    response.status(200).json(result);
}
exports.update = update;
