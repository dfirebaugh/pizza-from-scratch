import React from "react";
import ToonBox from "./ToonBox";

const api_url = 'http://10.200.200.155:8080'

const Header = () => (
    <header>
        <p>Welcome, <span id="display-name"></span>!</p>
        <a class="menu" href="/profile">Profile</a>
        <p>|</p>
        <a class="menu" href="/logout">Logout</a>
    </header>
)

class Toons extends React.Component {
    componentDidMount(){
        fetch(`${api_url}/api/toons/`)
            .then(response => response.json())
            .then(json => {
                this.setState({toons:json, curIndex: json.length - 1})
            })
    }
    clickHandler = (d) =>{
        if(d.target.id === 'first'){
            this.setState({curIndex:0})
        }
        else if(d.target.id === 'prev'){
            if(this.state.curIndex > 0){
                this.setState({curIndex:this.state.curIndex - 1})
            }
            else{
                alert("that's as previous as it gets!")	
            }
        }
        else if(d.target.id === 'next'){
            if(this.state.curIndex < this.state.toons.length - 1){
                this.setState({curIndex:this.state.curIndex + 1})
            }
            else{
                alert("That's as next as it gets!")
            }
        }
        else if(d.target.id === 'latest'){
            this.setState({curIndex:this.state.toons.length - 1})
        }
    }
    render() {
        const Btns = () => (
                    <div className='btns'>
                        <button id='first' onClick={this.clickHandler}>First</button>
                        <button id='prev' onClick={this.clickHandler}> Prev </button>
                        <button id='next' onClick={this.clickHandler}> Next </button>
                        <button id='latest' onClick={this.clickHandler}>Latest</button>
                    </div>
                )
        return (
            <div className='toon-container'>
                {/*conditionally render header*/}
                {false && <Header />}
                <div id='toons'>
                    <Btns />
                    <ToonBox toon={this.state && this.state.toons[this.state.curIndex]} />
                    <Btns />
                </div>
            </div>
        );
    }
}

export default Toons;