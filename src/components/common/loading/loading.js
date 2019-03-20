import React from 'react';
import styles from './loading.scss';
import Logo from '../logo/logo';

export default () => (
    <div className={`${styles.loading}`}>
        <div className={`${styles.logo}`}>
            <Logo></Logo>
        </div>
    </div>
);