import React from 'react'
import {connect, useDispatch, useSelector} from 'react-redux'
import {createPost} from '../redux/actions'
import {showAlert} from '../redux/actions'
import Alert from "../redux/Alert";

class PostForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: ''
        }
    }

    submitHandler = event => {
        event.preventDefault()
        const {title} = this.state

        if (!title.trim()) {
            return this.props.showAlert('Поле пустое')
        }
        const newPost = {
            title, id: Date.now().toString()
        }
        this.props.createPost(newPost)
        this.setState({title: ''})
    }
    changeInputHandler = event => {
        event.persist()
        this.setState(prev => ({
            ...prev, ...{
                [event.target.name]: event.target.value
            }
        }))
    }

    render() {
        return (
                <form onSubmit={this.submitHandler}>

                    {this.props.alert && <Alert text={this.props.alert}/>}

                    <div className="mb-3">
                        <label htmlFor="title"
                               className="form-label">Заголвок поста</label>
                        <input value={this.state.title}
                               onChange={this.changeInputHandler}
                               type="text"
                               name="title"
                               className="form-control"
                               id="title"/>
                        <button className={'btn btn-success mt-2'}
                                type={'submit'}>Создать
                        </button>
                    </div>
                </form>
        )
    }
}

const mapDispatchToProps = {
    createPost, showAlert
}
const mapStateToProps = state => ({
    alert: state.app.alert
})
export default connect(mapStateToProps, mapDispatchToProps)(PostForm)
