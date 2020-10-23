import React from 'react';

const reduceOne = (prevState, groupName, otherGroupName) => {
    prevState[groupName].wasClicked
        ? prevState[groupName].count = prevState[groupName].count - 1
        : prevState[groupName].count = prevState[groupName].count + 1;
    prevState[groupName].wasClicked = !prevState[groupName].wasClicked;
    if (prevState[otherGroupName].wasClicked) {
        prevState[otherGroupName].count = prevState[otherGroupName].count - 1;
        prevState[otherGroupName].wasClicked = false;
    }
    return prevState;
};

const reducer = action =>
    (prevState, props) =>
        action.type === "TOGGLE_LIKE"
            ? reduceOne(prevState, "like", "dislike")
            : reduceOne(prevState, "dislike", "like");

class Post extends React.Component {
    constructor() {
        super();
        this.state = {
            post: {},
            like: {
                count: 0,
                wasClicked: false,
            },
            dislike: {
                count: 0,
                wasClicked: false,
            },
        }
    }

    toggleLike = () => this.setState(reducer({ type: "TOGGLE_LIKE" }));
    toggleDislike = () => this.setState(reducer({ type: "TOGGLE_DISLIKE" }));

    saveEditedPost(e) {
        if (this.refs.name.value === '') {
            alert('Title is required');
            return;
        }
        if (this.refs.posttext.value === '') {
            alert('Post is required');
            return;
        }
        this.setState({
            post: {
                id: this.props.post.id,
                name: this.refs.name.value,
                posttext: this.refs.posttext.value
            }
        }, function () {
            this.props.onEditSave(this.state.post);
        });
    }

    render() {
        if (this.props.post.editMode) {
            return (
                <tr type="addedinfo" className="user-row user-editable-row">
                    <td>
                        <input className="input-name" type="text" ref="name" defaultValue={this.props.post.name} />
                    </td>
                    <td>
                        <input className="input-posttext" type="text" ref="posttext" defaultValue={this.props.post.posttext} />
                    </td>
                    <td>
                        <i>You can't edit this Field</i>
                    </td>
                    <td>
                        <i>You can't edit this Field</i>
                    </td>
                    <td>
                        <input type="button" value="Save" onClick={this.saveEditedPost.bind(this)} />
                        <input type="button" value="Cancel" onClick={this.props.onEditToggle.bind(this, this.props.post.id)} />
                    </td>
                </tr>
            );
        }

        return (
            <tr type="added-info" className="userRow">
                <td>{this.props.post.name}</td>
                <td>{this.props.post.posttext}</td>
                <td>{this.props.post.creationDate}</td>
                <td>
                    <button type="button" className="like-button" onClick={this.toggleLike}>
                        Up Vote | {this.state.like.count}
                    </button>
                    <button type="button" className="dislike-button" onClick={this.toggleDislike}>
                        DownVote | {this.state.dislike.count}
                    </button>
                </td>
                <td>
                    <input type="button" value="Edit" onClick={this.props.onEditToggle.bind(this, this.props.post.id)} />
                    <input type="button" value="Delete" onClick={this.props.onDelete.bind(this, this.props.post.id)} />
                </td>
            </tr>
        );
    }
}

export default Post;