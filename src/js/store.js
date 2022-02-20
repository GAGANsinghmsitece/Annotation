
import { createStore } from 'framework7';

const store = createStore({
  state: {
    files:[],
    url:undefined,
  },
  getters: {
    getfiles({ state }) {
      return state.files;
    },
    geturl({state}){
      return state.url;
    },
    getfilterfiles({state}){
      return string;
    }
  },
  actions: {
    addFiles({ state }, product) {
      state.files = [...state.files, product];
    },
    setFiles({ state }, filelist){
      console.log(filelist);
      state.files=filelist;
    },
    addUrl({state},pdf_url){
      state.url=pdf_url;
    }
  },
})
export default store;
