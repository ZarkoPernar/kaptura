

export function timestamps(schema, options) {
    schema.add({
        created_by: String,
        updated_at: Date,
        created_at: Date,
        deleted_at: Date,
    })

    schema.pre('save', function(next) {
        this.created_at = this.created_at === undefined ? new Date() : this.created_at
        this.updated_at = new Date()
        next()
    })

    // if (options && options.index) {
    //     schema.path('lastMod').index(options.index)
    // }
}

export function location(schema, options) {
    schema.add({
        google_address: String,
        address: String,
        city: String,
        state: String,
        country: String,
        lat: Number,
        lng: Number,
        // pos: {
        //     type: {
        //         type: String,
        //         default: 'Point'
        //     },
        //     coordinates: [Number]
        // }
    })

    // schema.pre('save', function(next) {
    //     this.updated_at = new Date
    //     next()
    // })
}

