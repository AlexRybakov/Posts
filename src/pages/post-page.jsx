import { useEffect, useState } from "react";
import api from "../utils/api";
import { useParams } from "react-router";
import { isLiked } from "../utils/post";
import PostDetailed from "../components/post-detailed/post-detailed";


function PostPage() {
    const [post, setPost] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const { postID } = useParams();

    function handlePostLike(post) {
        const like = isLiked(post.likes, currentUser._id);
        api.changeLikePostStatus(post._id, like).then((updatePost) => {
            setPost(updatePost);
        })
    }

    useEffect(() => {
        api.getInfoPost(postID)
            .then(([postData, userData]) => {
                setPost(postData);
                setCurrentUser(userData)
            })

    }, [postID])


    return (
        <PostDetailed {...post} user={currentUser} onPostLike={handlePostLike} />

    );
}

export default PostPage;