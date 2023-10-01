import { createReducer, createAction, createSlice, PayloadAction, nanoid } from '@reduxjs/toolkit'
import { Post } from '../../types/post'
import { initialPostList } from '../../constant/blog'

interface BlogState {
  postList: Post[]
  editPost: Post | null
}

const initialState: BlogState = {
  postList: initialPostList,
  editPost: null
}

const blogSlice = createSlice({
  name: 'blog',
  initialState: initialState,
  reducers: {
    deletePost: (state, action: PayloadAction<string>) => {
      const idPostDelete = action.payload
      const indexPost = state.postList.findIndex((post) => post.id === idPostDelete)
      console.log('delete post in line 26', indexPost)
      state.postList.splice(indexPost, 1)
    },
    startUpdatePost: (state, action: PayloadAction<string>) => {
      const idPostEdit = action.payload
        const foundPost = state.postList.find((post) => post.id === idPostEdit)
        state.editPost = foundPost || null
    },
    updatedPost: (state, action: PayloadAction<Post>) => {
      const foundPost = action.payload
      const indexfoundPost = state.postList.findIndex((post) => post.id ===foundPost.id);
      console.log("check index of found post in line 41: ", indexfoundPost)
      state.postList[indexfoundPost] = foundPost
      state.editPost = null
    },
    cancelEditPost: (state) => {
      state.editPost = null
    },
    addPost: {
      reducer: (state, action: PayloadAction<Post>) => {
        const post = action.payload
        state.postList.push(post)
      },
      prepare: (post: Omit<Post, 'id'>) => ({
        payload: {
          ...post,
          id: nanoid()
        }
      }) 
    }
}})


export const {addPost, cancelEditPost, deletePost, startUpdatePost, updatedPost} = blogSlice.actions
const blogReducer = blogSlice.reducer
export default blogReducer
