import React from 'react';
import styles from './ToggleOption.module.scss';
import classnames from 'classnames';

let ToggleOption = ({ status, isFilterVisible, onClick, defaultItem }) => {
    return(
        <div
            className={ classnames(styles['c-toggle-option'], isFilterVisible && styles['c-toggle-option-show']) }
        >
            <ul>
                {
                    status.map((item, index) => {
                        return(
                            <li 
                                key={index}
                                onClick={ event => onClick(event) }
                                value={item.id}
                            >
                                { item.stateName }
                            </li>
                        )
                    })
                }
                {
                    defaultItem && (
                        <li
                            className={styles['c-toggle-option-defaultItem']}
                            onClick={ event => onClick(event) }
                            value={0}
                        >
                            { defaultItem }
                        </li>
                    )
                }
            </ul>
        </div>
    );
};

export default ToggleOption;