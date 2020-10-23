import React from 'react';
import uuid from 'uuid';

class AddPost extends React.Component {

    constructor() {
        super();
        this.state = {
            newPost: {}
        }
    }

    handleAddPost(e) {
        if (this.refs.name.value === '') {
            alert('Title is required');
            return;
        }
        if (this.refs.posttext.value === '') {
            alert('Post is required');
            return;
        }
        this.setState({
            newPost: {
                id: uuid.v4(),
                name: this.refs.name.value,
                posttext: this.refs.posttext.value,
                _creationDate: new Date().toLocaleString(),
                get creationDate() {
                    return this._creationDate;
                },
                set creationDate(value) {
                    this._creationDate = value;
                },
            }
        }, function () {
            this.props.addPost(this.state.newPost);
        });
    }

    render() {
        if (!this.props.visible) {
            return (
                <div>
                    <br />
                    <div type="add-user">
                        <form type="field" onSubmit={this.handleAddPost.bind(this)}>
                            <label><b>Title: </b></label>
                            <input className="input-field" type="text" ref="name" />
                            <label><b>Post: </b></label>
                            <input className="input-field" type="text" ref="posttext" />
                            <input type="add" value="Add" onClick={this.handleAddPost.bind(this)} />
                        </form>
                    </div>
                    <br />
                </div>
            );
        }
    }
}

export default AddPost;