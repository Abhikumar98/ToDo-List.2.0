import React from 'react';
import AddItem from './AddItem';
import TodoList from './TodoList';
import './AllCss.css'
import NoItems from './NoItems';
import SpeechRecognition from 'react-speech-recognition';
import PropTypes from 'prop-types';
import CSSTransitionGroup from 'react-addons-css-transition-group';


class TodoMain extends React.Component{
    constructor(props)
    {
        super();
        this.state = {
            items : [],
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
            this.storage.push(item)
            localStorage.setItem("user", JSON.stringify(this.storage))
        }
    }
    removeItem(index){
        // console.log("copystate =========>",copyState)
        this.state.items.splice(index,1)
        this.setState({
            items : this.state.items
        });
        this.storage = this.state.items;
        localStorage.setItem("user", JSON.stringify(this.state.items))
    }
    componentDidMount(){
        console.log('component mounted');
        
        if (localStorage.getItem('user') !== null && localStorage.getItem("user").length > 2 )
        {
                let json = JSON.parse(localStorage.getItem("user"))
                let data = [...json]
                this.storage = data
                this.setState({
                    items : data
                })
        }
        else this.setState({
            items: ['Type in the input box and press "enter"',
                    'Or you can also click on the mic icon and speak',
                    'Speak once the button turns blue :)']
            })

    }
    handleClick(){
        this.setState({
            addItem : true
        })
    }
    startMicrophone()
    {
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
            alert("This browser doesn't support voice recognition feature. Please use Chrome for it.")
        }
    }
    render(){
        return(
            <div id="container">
                <h1>ToDo List</h1>
                <div className="list-and-input">
                    <AddItem microphone={this.state.microphone} 
                             startMicrophone={this.startMicrophone} 
                             addItem = {this.state.addItem} 
                             addToList={this.addToList} />
                    { (this.state.items).length  === 0 ? <NoItems addItem = {this.handleClick} /> :
                        <CSSTransitionGroup
                            component='ul'
                            transitionName='item'
                            transitionEnterTimeout={300}
                            transitionAppear={true}
                            transitionAppearTimeout={300}
                            transitionLeaveTimeout={1}
                        >
                            {
                                this.state.items.map((item,i) => <TodoList removeItem={this.removeItem} 
                                                                            index={i} 
                                                                            key={i} 
                                                                            item={item} />)
                            }
                        </CSSTransitionGroup>
                    }
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