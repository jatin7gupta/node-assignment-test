import React from 'react';
import ReactDOM from 'react-dom';
import data from "./data";
import MainBox from "./components/main-box.jsx";
import Thumbnail from "./components/thumbnail.jsx"

class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            current_title: data[0].title,
            current_url: data[0].url
        };
        this.setCurrent = this.setCurrent.bind(this);
    }
    setCurrent(title, url){
        let new_State = {current_title:title, current_url:url};
        this.setState(new_State);
    }
    render() {
        return(
            <div>App goes here

            <MainBox title={this.state.current_title} url={this.state.current_url}/>
                {
                    data.map(function(item) {
                        return (<Thumbnail title={item.title} url={item.url} setCurrent={this.setCurrent}/>)
                        }.bind(this)
                    )
                }
            </div>
        );
    }
}
let app = <App/>;
let node = document.getElementById('app');
ReactDOM.render(app, node);