import React from 'react';
import styles from './TextField.module.scss';
import classnames from 'classnames';

let TextField = ({ className, value, onChange, ...props }) => {

    return(
        <input 
            { ...props }
            type="text"
            defaultValue={value}
            onChange={e => onChange(e.target.value.trim())}
            className={ classnames( styles["c-text-field"], className ) }
        />
    );
}
export default TextField;