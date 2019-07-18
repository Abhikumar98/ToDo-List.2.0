import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone } from '@fortawesome/free-solid-svg-icons'

class AddItem extends React.Component{
    constructor(props){
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(e){
        e.preventDefault();
        this.props.addToList(this.userInput.value);
        this.formRef.reset()
    }
    componentDidMount(){
        this.userInput.focus();
    }
    render(){
        if (this.props.addItem) {
            this.userInput.focus()
        }
        let style = {}
        switch(this.props.microphone)
        {
            case true:
                style = {color : 'dodgerblue'}
                break
            case false:
                style = {color : 'grey'}
                break
            default:
                style = {color : 'lightgrey'}
                break
        }
        return(
            <div style={{display: "flex"}}>
                <form ref={input => this.formRef = input} onSubmit={this.handleSubmit} className="input-element">
                    <input 
                        ref={input=> this.userInput = input} 
                        name="userInput" placeholder="press enter to add item" 
                        type="text" 
                    />
                    
                </form>
                    <button style={style}
                            onClick={this.props.startMicrophone} 
                            id="microphone">
                        <FontAwesomeIcon size="2x" icon={faMicrophone} />
                    </button>
            </div>
        )
    }
}

export default AddItem;