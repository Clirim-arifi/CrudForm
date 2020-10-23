import React from 'react';
import Posts from './components/Posts';
import AddPost from './components/AddPost';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      posts: [],
    }
  }

  componentWillMount() {
    this.setState({
      posts: JSON.parse(localStorage.getItem('posts') || '[]')
    })
  }

  updatePostsInStateAndStorage(posts) {
    localStorage.setItem('posts', JSON.stringify(posts));
    this.setState({ posts: posts });
  }

  handleAddPost(post) {
    let posts = this.state.posts;
    posts.push(post);
    this.updatePostsInStateAndStorage(posts);
  }

  handleEditPost(updatedPost) {
    let posts = this.state.posts;
    let post = posts.find(x => x.id === updatedPost.id);
    post.name = updatedPost.name;
    post.posttext = updatedPost.posttext;
    post.editMode = false;
    this.updatePostsInStateAndStorage(posts);
  }

  handleDeletePost(id) {
    let posts = this.state.posts;
    let index = posts.findIndex(x => x.id === id);
    posts.splice(index, 1);
    this.updatePostsInStateAndStorage(posts);
  }

  toggleEditMode(id) {
    let posts = this.state.posts;
    let postToEdit = posts.find(x => x.id === id);
    postToEdit.editMode = !postToEdit.editMode;
    this.setState({ posts: posts });
  }

  render() {
    return (
      <div className="App">
        <Posts posts={this.state.posts}
          onEditToggle={this.toggleEditMode.bind(this)}
          onEditSave={this.handleEditPost.bind(this)}
          onDelete={this.handleDeletePost.bind(this)} />
        <AddPost addPost={this.handleAddPost.bind(this)} />
      </div>
    );
  }
}

export default App;