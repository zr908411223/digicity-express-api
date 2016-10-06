import React, { Component } from 'react';
import map from 'lodash/fp/map';
import axios from 'axios';
import {Link} from 'react-router';



export default class PostList extends Component {
  constructor() {
    super();
    this.state={
      posts: []
    };
  }
  getStyles() {
    return {
      content: {
        position: 'relative',
        width: '100%',
        height: '90px',
        maxWidth: '600px',
        margin: '20px auto',
        backgroundColor: '#fff',
        borderRadius: '5px',
        padding: '16px',
        boxShadow: 'rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px'
      },
      title: {
        fontSize: '1.2em'
      },
      LinkOn:{
        color:'#fff',
        display:'block',
        width:'5em',
        height:'2em',
        backgroundColor:'#00bcd4',
        textDecoration:'none',
        lineHeight:'2em',
        borderRadius:'10px',
        textAlign:'center',
        margin:'20px auto'
      },
      ButtonIns:{
        color:'#fff',
        display:'block',
        position:'absolute',
        width:'5em',
        height:'2em',
        backgroundColor:'#00bcd4',
        textDecoration:'none',
        lineHeight:'2em',
        borderRadius:'10px',
        textAlign:'center',
        right:'20px'
      }
    }
  }
  componentWillMount() {
    //  Promise
    axios.get('http://localhost:3000/posts').then(res => {
      console.log('axios');
      this.setState({
        posts: res.data.posts
      });
      console.log(this.state.posts);
    });
  }
  render() {
    const styles = this.getStyles();
    const postList = map((post) => {
      return (
        <div style={styles.content} key={post._id}>
          <div style={styles.title}>{post.classify}<br />{post.title}<br />{post.createdAt}</div>
          <Link to={`/post/${post._id}`} style={styles.ButtonIns}>查看内容</Link>
        </div>
      )
    }, this.state.posts);
    return(
      <div>
        <Link to='/write' style={styles.LinkOn}>写文章</Link>
        { postList }
      </div>
    );
  }
}
