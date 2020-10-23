import React from 'react';
import Post from './Post';

class Posts extends React.Component {

    render() {
        let postItems;
        if (this.props.posts) {
            postItems = this.props.posts.map(post => {
                return (
                    <Post onEditToggle={this.props.onEditToggle.bind(this)}
                        onEditSave={this.props.onEditSave.bind(this)}
                        onDelete={this.props.onDelete.bind(this)}
                        post={post}
                        key={post.id} />
                );
            });
        }
        return (
            <table className="users-table">
                <tbody>
                    <br />
                    <tr>
                        <th>Title Name</th>
                        <th>Post</th>
                        <th>Creation Date</th>
                        <th>Like/Dislike</th>
                        <th>Action</th>
                    </tr>
                    {postItems}
                </tbody>
            </table>
        );
    }
}

export default Posts;