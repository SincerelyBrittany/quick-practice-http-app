import React, { Component } from "react";
import axios from "axios";
import "./App.css";

const apiEndpoint = "https://jsonplaceholder.typicode.com/posts";
class App extends Component {
  state = {
    posts: [],
  };

  async componentDidMount() {
    const { data: posts } = await axios.get(apiEndpoint);
    this.setState({ posts });
  }

  handleAdd = async () => {
    const obj = { title: "a", body: "b" };
    const { data: post } = await axios.post(apiEndpoint, obj);
    const posts = [post, ...this.state.posts];
    this.setState({ posts });
  };

  handleUpdate = async (post) => {
    post.title = "updated";
    // axios.patch // update one or more properties.
    // axios.patch(apiEndpoint + "/" + post.id, { title: post.title });
    // axios.put // updates all properties.
    // await axios.put(apiEndpoint + "/" + post.id, post);

    //pessimistic update - make api call first then update the UI
    await axios.put(`${apiEndpoint}/${post.id}`, post);
    const posts = [...this.state.posts];
    const index = posts.indexOf(post);
    posts[index] = { ...post };
    this.setState({ posts });
  };

  handleDelete = async (post) => {
    // optimistic update - update the UI before making api call
    const originalPosts = this.state.posts;
    const posts = this.state.posts.filter((p) => p.id !== post.id);
    this.setState({ posts });

    try {
      await axios.delete(`${apiEndpoint}/${post.id}`);
      // throw new Error("");
    } catch (ex) {
      // ex.request;
      // ex.response;
      if (ex.response && ex.response.status === 404) {
        //expects (404: not found, 400: bad request) - HTTP protocal client errors, displays a specific error message
        alert("this post has already been deleted");
      } else {
        //unexpected errors - errors that should not happen under normal circumstances (network down, server is down, database is down, bug in application)
        // - must log these erros
        // - displat a generic and friendly error message
        alert("something failed while deleteing a post");
      }

      this.setState({ posts: originalPosts });
    }
  };

  render() {
    return (
      <React.Fragment>
        <button className="btn btn-primary" onClick={this.handleAdd}>
          Add
        </button>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {this.state.posts.map((post) => (
              <tr key={post.id}>
                <td>{post.title}</td>
                <td>
                  <button
                    className="btn btn-info btn-sm"
                    onClick={() => this.handleUpdate(post)}
                  >
                    Update
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => this.handleDelete(post)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default App;
