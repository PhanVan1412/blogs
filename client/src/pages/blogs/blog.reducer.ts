import { createReducer, createAction } from '@reduxjs/toolkit'
import { Post } from '../../types/post'
import { initialPostList } from '../../constant/blog'

interface BlogState {
  postList: Post[]
  editPost: Post | null
}

export const addPost = createAction<Post>('blog/addPost')
export const deletePost = createAction<string>('blog/deletePost')
export const startUpdatePost = createAction<string>('blog/startUpdatePost')
export const updatedPost = createAction<Post>('blog/updatedPost')
export const cancelEditPost = createAction('blog/cancelEditPost')

const initialState: BlogState = {
  postList: initialPostList,
  editPost: null
}

const blogReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(addPost, (state, action) => {
      const post = action.payload
      console.log('check post in line 19', post)
      state.postList.push(post)
    })
    .addCase(deletePost, (state, action) => {
      const idPostDelete = action.payload
      const indexPost = state.postList.findIndex((post) => post.id === idPostDelete)
      console.log('delete post in line 26', indexPost)
      state.postList.splice(indexPost, 1)
    })
    .addCase(startUpdatePost, (state, action) => {
      const idPostEdit = action.payload
      const foundPost = state.postList.find((post) => post.id === idPostEdit)
      state.editPost = foundPost || null
    })
    .addCase(updatedPost, (state, action) => {
      const foundPost = action.payload
      const indexfoundPost = state.postList.findIndex((post) => post.id ===foundPost.id);
      console.log("check index of found post in line 41: ", indexfoundPost)
      state.postList[indexfoundPost] = foundPost
      state.editPost = null
    })
    .addCase(cancelEditPost, (state) => {
      state.editPost = null
    })
})

export default blogReducer
