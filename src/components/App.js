import React, { Component } from 'react';

import './App.css';

import Header from './Header/Header';
import Compose from './Compose/Compose';
import Post from './Post/Post'
import axios from 'axios';

class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: []
    };

    this.updatePost = this.updatePost.bind( this );
    this.deletePost = this.deletePost.bind( this );
    this.createPost = this.createPost.bind( this );
    this.filterPosts = this.filterPosts.bind( this );
  }
  
  componentDidMount() {
    axios.get('https://practiceapi.devmountain.com/api/posts')
    .then(res =>{
      this.setState({posts: res.data});
    })
    .catch(err=>console.log(err))
  }

  updatePost(id,text) {
    axios.put(`https://practiceapi.devmountain.com/api/posts?id=${ id }`,{ text })
      .then(res =>{
        this.setState({posts: res.data});
      }).catch(err=>console.log(err))
  }

  deletePost(id) {
    axios.delete(`https://practiceapi.devmountain.com/api/posts?id=${ id }`)
      .then(res=>this.setState({posts: res.data}))
      .catch(err=>console.log(err));
  }

  createPost(text) {
    axios.post(`https://practiceapi.devmountain.com/api/posts`,{text})
      .then(res=>this.setState({posts:res.data}))
      .catch(err=>console.log(err))
  }

  filterPosts(text){
    axios.get(`https://practiceapi.devmountain.com/api/posts/filter?text=${encodeURIComponent(text)}`)
    .then(res =>{
      this.setState({posts: res.data});
    })
    .catch(err=>console.log(err))
  }

  render() {
    const { posts } = this.state;

    return (
      <div className="App__parent">
        <Header filterFn={this.filterPosts}/>

        <section className="App__content">

          <Compose 
            createPostFn={this.createPost}
          />
          
          {posts.map(el=>{
            return (<Post 
                key={el.id} 
                id={el.id} 
                text={el.text} 
                date={el.date} 
                updatePostFn={this.updatePost}
                deletePostFn={this.deletePost}
              />);
          })}

        </section>
      </div>
    );
  }
}

export default App;
