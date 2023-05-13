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

const PAGE_SIZE = 10;


export function App() {
    const [posts, setPosts] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const [favorites, setFavorites] = useState([]);
    const [page, setPage] = useState(1);
    const [pageCount, setPageCount] = useState(0);
    const [refresh, setRefresh] = useState(true);

    useEffect(() => {
        api.getAllInfo()
            .then(([dataPosts, dataUser]) => {
                setPosts(dataPosts);
                setCurrentUser(dataUser)
            })
            .catch(data => console.log(data))
    }, [])

    useEffect(() => {
      api
        .getPaginateInfo(page)
        .then(([postsData, userInfoData]) => {
          setCurrentUser(userInfoData);
          setPosts(postsData.posts);
          setPageCount(Math.ceil(postsData.total));
        })
        .catch((err) => console.log(err));                                
    }, [page]);
    
    function handlePostLike(post) {
        const like = isLiked(post.likes, currentUser._id);
        return api.changeLikePostStatus(post._id, like).then((updateCard) => {
          const newPosts = posts.map((cardState) => {
            return cardState._id === updateCard._id ? updateCard : cardState;
          });
    
          setPosts(newPosts);
    
          if (!like) {
            setFavorites(prevState => [...prevState, updateCard])
          } else {
              setFavorites(prevState => prevState.filter(card => card._id !== updateCard._id))
            }
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



    return ( 
        <>
        <UserContext.Provider value={currentUser}>
        <AppHeader user={currentUser}/>
        <Routes>
            <Route
              path="/postpage/:postID"
              element={<PostPage onPostLike={handlePostLike} />}
            />
            <Route
              path="/"
              element={
                <LayoutApp
                  posts={posts}
                  onPostLike={handlePostLike}
                  currentUser={currentUser}
                  onDelete={handlePostDelete}
                />
              }
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
          <Space>
          {!!pageCount && 
                        <Pagination 
                        total={pageCount}
                        PageSize={page}
                        defaultCurrent={page}
                        onChange={(page) => setPage(page)}
                        showSizeChanger={false}
                      />
          }
          </Space>
        <AppFooter />
        </UserContext.Provider>
        </>
    )
}


