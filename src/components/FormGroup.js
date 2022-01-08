import React from 'react';
import classnames from 'classnames';
import styles from './FormGroup.module.scss';

let FormGroup = ({ children, className }) => {
    return(
        <div className={ classnames(styles["c-form-group"], className) }>
            { children }
        </div>
    );
}

export default FormGroup;