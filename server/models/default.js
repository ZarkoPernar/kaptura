"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const NUMBER = 'number';
function modifiedBy(schema, options) {
    schema.add({
        created_by: String,
        updated_by: String,
        deleted_by: String,
    });
}
exports.modifiedBy = modifiedBy;
function location(schema, options) {
    schema.add({
        google_address: String,
        address: String,
        street_number: String,
        city: String,
        state: String,
        country: String,
        country_code: String,
        latitude: Number,
        longitude: Number,
        place_id: String,
        position: {
            type: {
                type: String,
                default: 'Point'
            },
            coordinates: [Number]
        }
    });
    schema.pre('save', function (next) {
        if (typeof this.longitude === NUMBER && typeof this.latitude === NUMBER) {
            this.position.coordinates = [this.longitude, this.latitude];
        }
        next();
    });
    // if (options && options.index) {
    //     schema.path('position').index(options.index)
    // }
}
exports.location = location;
