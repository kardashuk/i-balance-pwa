import React from 'react';

export default function (props) {
    const {children} = props;
    return (
        <div className="page">
            {children}
        </div>
    );
}
