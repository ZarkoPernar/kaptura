import React from 'react';

import './titles.scss'

const Subtitle = ({children}) => {
    return (
        <h3 className="subtitle subtitle--underlined">
            {children}
        </h3>
    );
};

export default Subtitle;
