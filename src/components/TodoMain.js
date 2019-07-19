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
            items : ['Type in the input box <== and press enter',
                     'Or you can also click on the mic icon and speak',
                     'Speak once the button turns blue :)'],
            microphone : false
        }
        this.addToList = this.addToList.bind(this)
        this.removeItem = this.removeItem.bind(this)
        this.handleClick = this.handleClick.bind(this)
        this.startMicrophone = this.startMicrophone.bind(this)
        this.storage=[]
    }
    addToList(item){
        if (item.length > 0)
        {
            this.setState({
                items : this.state.items.concat([item])
            })
        }
        this.storage.push(item)
        localStorage.setItem("user", JSON.stringify(this.storage))
    }
    removeItem(index){
        // console.log("copystate =========>",copyState)
        this.state.items.splice(index,1)
        this.setState({
            items : this.state.items
        });
        localStorage.setItem("user", JSON.stringify(this.state.items))
    }
    componentDidMount(){
        if (localStorage.getItem("user") != 'null')
        {
            console.log(localStorage.getItem("user"))
        }
        console.log(localStorage.getItem("user"))
        if(localStorage.getItem("user") != 'null' && localStorage.getItem("user").length > 2)
        {
            let json = JSON.parse(localStorage.getItem("user"))
            let data = [...json]
            this.storage = data
            this.setState({
                items : data
            })
        }
        else this.setState({ items: this.state.items })
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
            console.log(this.props.listening)
            console.log("mic on")
        }
        else{
            // =========================stops microphone listening
            this.setState({
                microphone: false
            })
            this.props.stopListening()
            console.log("mic off")
            console.log(this.props.listening)
            this.addToList(this.props.transcript)
            console.log(this.props.transcript)
            this.props.resetTranscript()
        }
        if (!this.props.browserSupportsSpeechRecognition) {
            console.log("not supporting");
        }
    }
    render(){
        console.log("inside render method---------->");
        return(
            <div id="container">
                <h1>ToDo List</h1>
                <div className="list-and-input">
                    <AddItem microphone={this.state.microphone} startMicrophone={this.startMicrophone} addItem = {this.state.addItem} addToList={this.addToList} />
                    { (this.state.items).length  === 0 ? <NoItems addItem = {this.handleClick} /> :  
                    <ul>
                        {
                            this.state.items.map((item,i) => <TodoList removeItem={this.removeItem} index={i} key={i} item={item} />)
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