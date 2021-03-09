import Post from "./Post";
import {connect} from 'react-redux'

const Posts = ({syncPosts}) => {
    if (!syncPosts.length) {
        return <p className={'center'}>Нету постов</p>
    }
    return syncPosts.map(post =>
            <Post post={post}
                  key={post.id}/>)
}

const mapStateToProps = state => {
    return {
        syncPosts: state.posts.posts
    }
}

export default connect(mapStateToProps, null)(Posts)
