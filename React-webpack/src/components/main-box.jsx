import React from 'react';

export default class MainBox extends React.Component{
    render(){
        return(
            <img src={this.props.url} alt={this.props.title}/>
        )
    }
}