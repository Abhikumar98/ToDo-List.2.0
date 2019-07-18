import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

class TodoList extends React.Component{
    constructor(props)
    {
        super();
        this.removeItem = this.removeItem.bind(this);
    }
    removeItem(){
        this.props.removeItem(this.props.index)
    }
    render()
    {
        const windowClose = <FontAwesomeIcon icon={faTimes}/>
        const items = this.props
        return(
            <div className="item-container">
                <li>{items.item}</li>
                <button onClick={this.removeItem} id="remove-button">
                    {windowClose}
                </button>
            </div>
        )
    }
}

export default TodoList