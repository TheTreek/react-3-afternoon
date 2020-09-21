import React, { Component } from 'react';

import './Search.css';

import SearchIcon from 'react-icons/lib/md/search';

//////////////////////////////////////////////////////// THIS COMPONENT IS BEING RENDERED IN THE *HEADER* COMPONENT

export default class Search extends Component {
  constructor(){
    super();
    this.state = {
      input : ''
    }
  }

  handleChange(val){
    this.setState({input: val});
  }

  render() {
    return (
      <section className="Search__parent">

        <div className="Search__content">
          <input placeholder="Search Your Feed" value={this.state.input} onChange={e=>this.handleChange(e.target.value)}/>

          <SearchIcon 
          id="Search__icon" 
          onClick={(e)=>{
            this.props.filterFn(this.state.input)
          }}/>
        </div>
        
      </section>
    )
  }
}