import React from 'react';

export default class Thumbnail extends React.Component{
    onThumbnailClickHandler(event){
        this.props.setCurrent(this.props.title, this.props.url)
    }
    render(){
        return(
            <button onClick={this.onThumbnailClickHandler.bind(this)}>{this.props.title}</button>
        )
    }
}