import React from 'react';
import ReactDOM from 'react-dom';

class HelloWorld extends React.Component{
    render(){
        return(<div>Hello world</div>)
    }
}
var r_e = <div></div>
var r_e = <HelloWorld/>;
var node = document.getElementById('app');
ReactDOM.render(r_e, node);