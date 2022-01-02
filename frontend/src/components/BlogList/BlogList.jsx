import React, { Component } from 'react';
import { render } from "react-dom";

import axios from 'axios';


class BlogList extends Component {

  constructor(props) {
    super(props);
        this.state = {
          blogList: [],
          activeItem: {
            id: null,
            title: '',
            body: '',
            private: true,
          },
          editable: false,
        };

        this.fetchTasks = this.fetchTasks.bind(this)
        this.handleChangeTitle = this.handleChangeTitle.bind(this)
        this.handleChangeBody = this.handleChangeBody.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.deleteBlog = this.deleteBlog.bind(this)
        this.getCookie = this.getCookie.bind(this)
  }

    getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }


  componentDidMount() { this.fetchTasks() }

  fetchTasks() {
    console.log("Fetching...")

    fetch("http://localhost:8000/api/v1/feed/")
    .then(response => response.json())
    .then(data =>
        this.setState({ blogList: data })
    )
  }

  handleChangeTitle(e) {
    var title_value = e.target.value

    this.setState({
        activeItem: {
            ...this.state.activeItem,
            title: title_value,
        }
    })
  }

  handleChangeBody(e) {
    var body_value = e.target.value


    this.setState({
        activeItem: {
            ...this.state.activeItem,
            body: body_value,
        }
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log("Item: ", this.state.activeItem);

    var csrftoken = this.getCookie('csrftoken')

    var url = 'http://localhost:8000/api/v1/feed/'
    var set_method = "POST"
    if (this.state.editable == true) {
        url = `http://localhost:8000/api/v1/feed/${ this.state.activeItem.id }/`
        set_method = "PUT"
        this.setState({
            editable: false
        })
    }

    fetch(url, {
        method: set_method,
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken,
        },
        body: JSON.stringify(this.state.activeItem)
    }).then((response) => {
        this.fetchTasks()
        this.setState({
            activeItem: {
                id: null,
                title: '',
                body: '',
                private: true,
            },
        })
    }).catch(function(error) {
        console.log("Error: ", error)
    })

  }

  startEdit(blog) {
    this.setState({
        activeItem: blog,
        editable: true,
    })
  }

  deleteBlog(blog) {
    var csrftoken = this.getCookie('csrftoken')

    fetch(`http://localhost:8000/api/v1/feed/${ blog.id }`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken,
        },
    }).then((response) => {
        this.fetchTasks()
    })
  }

  render() {

    var blogs = this.state.blogList
    var self = this

    return (

      <div className="blog-list">

          <div className="blog-create-form">
              <form onSubmit={this.handleSubmit} id="form">
                  <div><input onChange={this.handleChangeTitle} id="title" type="text" value={this.state.activeItem.title} name="title" placeholder="Write title.." /></div><br/>
                  <div><textarea onChange={this.handleChangeBody} id="body" type="text" value={this.state.activeItem.body} name="body" placeholder="Body for blog.." /></div>
                  <div><input id="submit" type="submit" name="Add"/></div>
              </form>
          </div>
          <hr/>
          <div>
            {blogs.map(function(blog, index) {
              return (
                <div key={index}>
                   <div className="blog-title"> <span>{blog.title}</span> </div>
                   <div className="blog-body"> <span>{blog.body}</span> </div>
                   <div className="blog-edit-button">
                       <button onClick={() => self.startEdit(blog)}>Edit</button>
                       <button onClick={() => self.deleteBlog(blog)}>Delete</button>
                   </div>
                   <hr/>
                </div>
              );
            })}
          </div>

      </div>
    );

  }
}

export default BlogList;