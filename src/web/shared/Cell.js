import React from 'react';
import classnames from 'classnames'

const Cell = ({ style, children, className, sm, md, lg, xs, xl }) => {
    let sizes = ''

    if (xl) {
        sizes += ' col-lg-' + lg
    }
    if (lg) {
        sizes += ' col-lg-' + lg
    }
    if (md) {
        sizes += ' col-md-' + md
    }
    if (sm) {
        sizes += ' col-sm-' + sm
    }
    if (xs) {
        sizes += ' col-xs-' + xs
    }

    return (
        <div style={style} className={classnames('col', sizes, className)} >
            { children}
        </div>
    );
};

export default Cell;
