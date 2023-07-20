class Api {
    #baseUrl;
    #headers;
    
    constructor({baseUrl, headers}) {
        this.#baseUrl = baseUrl;
        this.#headers = headers;
    }

    #onResponse(res) {
        return res.ok? res.json() : res.json().then(err => Promise.reject(err))
    }

    getAllInfo() {
        return Promise.all([this.getPostsList(), this.getUserInfo()])
    }

    getPostsList() {
        return fetch(`${this.#baseUrl}/posts`, {
            headers: this.#headers
        })
            .then(this.#onResponse)
    }

    getUserInfo () {
        return fetch(`${this.#baseUrl}/users/me`, {
            headers: this.#headers
        })
            .then(this.#onResponse)
    }

    changeLikePostStatus(postID, like) {
        return fetch(`${this.#baseUrl}/posts/likes/${postID}`, {
            method: like ? 'DELETE' : 'PUT',
            headers: this.#headers,
        })
            .then(this.#onResponse)
    }

    deletePost(postID) {
        return fetch(`${this.#baseUrl}/posts/${postID}`, {
            method: 'DELETE',
            headers: this.#headers
        })
            .then(this.#onResponse)
    }

    getPostById(idPost) {
        return fetch(`${this.#baseUrl}/posts/${idPost}`, {
            headers: this.#headers
        })
            .then(this.#onResponse)
    }

    getInfoPost(idPost) {
        return Promise.all([this.getPostById(idPost), this.getUserInfo()])
    }

    getPaginate(page) {
        return fetch(`${this.#baseUrl}/posts/paginate?page=${page}&limit=14`, {
          headers: this.#headers,
        }).then(this.#onResponse);
      }

    getPaginateInfo(page) {
        return Promise.all([this.getPaginate(page), this.getUserInfo()]);
      }

    changeUserNameAndAbout (data) {
        return fetch(`${this.#baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this.#headers,
            body: JSON.stringify(data)
        })
            .then(this.#onResponse)
    }

    changeUserAvatar (data) {
        return fetch(`${this.#baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this.#headers,
            body: JSON.stringify(data)
        })
            .then(this.#onResponse)
    }

    createNewPost (data) {
        return fetch(`${this.#baseUrl}/posts`, {
            method: 'POST',
            headers: this.#headers,
            body: JSON.stringify(data)
        })
            .then(this.#onResponse)
    }

    changePost (idPost, data) {
        return fetch(`${this.#baseUrl}/posts/${idPost}`, {
            method: 'PATCH',
            headers: this.#headers,
            body: JSON.stringify(data)
        })
            .then(this.#onResponse)
    }

    createNewComment (idPost, data) {
        return fetch(`${this.#baseUrl}/posts/comments/${idPost}`, {
            method: 'POST',
            headers: this.#headers,
            body: JSON.stringify(data)
        })
            .then(this.#onResponse)
    }

    deleteComment (idPost, idComments) {
        return fetch(`${this.#baseUrl}/posts/comments/${idPost}/${idComments}`, {
            method: 'DELETE',
            headers: this.#headers
        })
            .then(this.#onResponse)
    }

    getCommentPostById(idPost) {
        return fetch(`${this.#baseUrl}/posts/comments/${idPost}`, {
            headers: this.#headers
        })
            .then(this.#onResponse)
    }




}


const api = new Api ({
    baseUrl: 'https://api.react-learning.ru/v2/group-11',
    headers: {
        'content-type': 'application/json',
        authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDEwN2UwOWFhMzk3MTIxODM4ZjI5MDQiLCJncm91cCI6Imdyb3VwLTExIiwiaWF0IjoxNjc4ODAyNDQ5LCJleHAiOjE3MTAzMzg0NDl9.i5H4eUs1sTu6aqHog7xE01mtBDI2jd1-GwSeL0vYUX4'
    }
}
)



export default api;