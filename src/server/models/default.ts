export interface ITimestampsSchema {
    updated_at: Date
    created_at: Date
    deleted_at: Date
}

export interface IModifiedBySchema {
    created_by: string
    updated_by: string
    deleted_by: string
}

export interface ILocationSchema {
    google_address: string,
    address: string,
    city: string,
    state: string,
    country: string,
    country_code: string,
    latitude: number,
    longitude: number,
    position: {
        type: 'Point',
        coordinates: number[],
    }
}

export function modifiedBy(schema, options) {
    schema.add({
        created_by: String,
        updated_by: String,
        deleted_by: String,
    })
}

export function location(schema, options) {
    schema.add({
        google_address: String,
        address: String,
        city: String,
        state: String,
        country: String,
        country_code: String,
        latitude: Number,
        longitude: Number,
        position: {
            type: {
                type: String,
                // default: 'Point'
            },
            coordinates: [Number]
        }
    })
}

