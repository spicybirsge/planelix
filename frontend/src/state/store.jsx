import { create } from 'zustand'

export const user = create((set) => ({
    loaded: false,
    user: null,

}))