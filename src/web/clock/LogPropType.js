import PropTypes from 'prop-types'

export default PropTypes.shape({
    _id: PropTypes.string,
    start_date: PropTypes.string,
    start_end: PropTypes.string,
    project_id: PropTypes.string,
    project_name: PropTypes.string,
    client_id: PropTypes.string,
    client_name: PropTypes.string,
})
