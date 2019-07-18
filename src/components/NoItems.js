import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusSquare } from '@fortawesome/free-regular-svg-icons'

const NoItems = (props) => {
    const noItems = <FontAwesomeIcon color="#2E9CCA" size="3x" icon={ faPlusSquare } />
    const buttonStyle = {
            backgroundColor: "transparent",
            border: "none",
    }
    return(
        <div id="no-items">
            <button onClick={props.addItem} style={buttonStyle}>
                {noItems}
            </button>
        </div>
    )
}

export default NoItems