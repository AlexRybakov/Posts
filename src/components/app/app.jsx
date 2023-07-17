import { useEffect, useState } from "react";

import api from "../../utils/api";

import { LayoutApp } from "../Layout/Layout";
import { AppHeader } from "../header/header";
import { AppFooter } from "../footer/footer";
import { Route, Routes } from "react-router";
import { NotFoundPage } from "../../pages/not-found-page";
import PostPage from "../../pages/post-page";
import { isLiked } from "../../utils/post";
import { UserContext } from "../../context/current-user";
import { Pagination, Space } from "antd";
import { PostContext } from "../../context/post-context";



export function App() {
  const [posts, setPosts] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [refresh, setRefresh] = useState(true);

  useEffect(() => {
    api
      .getPaginateInfo(page)
      .then(([postsData, userInfoData]) => {
        setCurrentUser(userInfoData);
        setPosts(postsData.posts);
        setPageCount(Math.ceil(postsData.total));
      })
  }, [page, refresh]);

  function handlePostLike(post) {
    const like = isLiked(post.likes, currentUser._id);
    return api.changeLikePostStatus(post._id, like).then((updateCard) => {
      const newPosts = posts.map((cardState) => {
        return cardState._id === updateCard._id ? updateCard : cardState;
      });
      setPosts(newPosts);
    });
  }

  function handlePostDelete(post) {
    api.deletePost(post._id).then((updatePost) => {
      const newPosts = posts.filter((post) => {
        return post._id !== updatePost._id;
      });
      setPosts(newPosts);
    });
  }

  function handleCreatePost () {
      page === 1 ? setRefresh((refresh) => !refresh) : setPage(1);
  }

  function handleUpdatePost () {
    setRefresh((refresh) => !refresh)
  }
  


  return (
    <>
    <PostContext.Provider value={{handleCreatePost: handleCreatePost, handleUpdatePost: handleUpdatePost, posts}}>
      <UserContext.Provider value={currentUser}>
        <AppHeader user={currentUser} />
        <Routes>
          <Route
            path="/postpage/:postID"
            element={<PostPage onPostLike={handlePostLike} currentUser={currentUser} />}
          />
          <Route
            path="/"
            element={[
              <LayoutApp
                posts={posts}
                onPostLike={handlePostLike}
                currentUser={currentUser}
                onDelete={handlePostDelete}
              />,
              <Space>
              {pageCount &&
                <Pagination
                  total={pageCount}
                  PageSize={page}
                  defaultCurrent={page}
                  onChange={(page) => setPage(page)}
                  showSizeChanger={false}
                />
              }
            </Space>
            ]}
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <AppFooter />
      </UserContext.Provider>
      </PostContext.Provider>
    </>
  )
}


