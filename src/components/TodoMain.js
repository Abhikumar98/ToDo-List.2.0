import React from 'react';
import AddItem from './AddItem';
import TodoList from './TodoList';
import './AllCss.css'
import NoItems from './NoItems';
import SpeechRecognition from 'react-speech-recognition';
import PropTypes from 'prop-types'

class TodoMain extends React.Component{
    constructor(props)
    {
        super();
        this.state = {
            Items : ['Type in the input box <== and press enter','Or you can also click on the mic icon and speak','Speak once the button turns blue :)'],
            microphone : false
        }
        this.addToList = this.addToList.bind(this)
        this.removeItem = this.removeItem.bind(this)
        this.handleClick = this.handleClick.bind(this)
        this.startMicrophone = this.startMicrophone.bind(this)
    }
    addToList(item){
        if (item.length > 0)
        {
            this.setState({
                Items : this.state.Items.concat([item])
            })
        }
    }
    removeItem(index){
        (this.state.Items).splice(index,1)
        this.setState({
            Items : this.state.Items
        })
    }
    handleClick(){
        this.setState({
            addItem : true
        })
    }
    startMicrophone()
    {
        console.log("mic clicked")
        if(!this.state.microphone){
            // =========================starts microphone listening
            this.setState({
                microphone : true
            })
            this.props.startListening()
        }
        else{
            // =========================stops microphone listening
            this.setState({
                microphone: false
            })
            this.props.stopListening()
            this.addToList(this.props.transcript)
            this.props.resetTranscript()
        }
        if (!this.props.browserSupportsSpeechRecognition) {
            console.log("not supporting");
        }
    }
    render(){
        return(
            <div id="container">
                <h1>ToDo List</h1>
                <div className="list-and-input">
                    <AddItem microphone={this.state.microphone} startMicrophone={this.startMicrophone} addItem = {this.state.addItem} addToList={this.addToList} />
                    { (this.state.Items).length  == 0 ? <NoItems addItem = {this.handleClick} /> :  
                    <ul>
                        {
                            this.state.Items.map((item,i) => <TodoList removeItem={this.removeItem} index={i} key={i} item={item} />)
                        }
                    </ul>}
                </div>
            </div>
        )
    }
}

TodoMain.propTypes = {
    transcript: PropTypes.string,
    resetTranscript: PropTypes.func,
    browserSupportsSpeechRecognition: PropTypes.bool
}
const options = {
    autostart : false,
    continuous: false
}
export default SpeechRecognition(options)(TodoMain);