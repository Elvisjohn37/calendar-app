import React, { useEffect, useState } from 'react';
import styles from './Dropdown.module.scss';
import classnames from 'classnames';

let Dropdown = ({ className, stateId = 0, items, onChange }) => {

    const [status, setStatus] = useState(stateId);
    
    useEffect(() => {
        if(stateId == 0) {
            setStatus(items[0].id);
        }
    }, []);
  
    return(
        <>
            {
                status != 0 && (
                    <select
                        className={ classnames(styles["c-select"], className) }
                        value={status}
                        onChange={(event) => {
                            console.log(event.target.value)
                            onChange(event.target.value);
                            setStatus(event.target.value);
                        }}
                    >
                        {
                            items.map((item, index) => {
                                return (
                                    <option 
                                        key={index}
                                        value={item.id}
                                    >
                                        {item.stateName}
                                    </option>
                                )
                            })
                        }
                    </select>
                )
            }
        </>
    );
}
export default Dropdown;