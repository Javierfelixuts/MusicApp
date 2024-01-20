import { defineStore } from 'pinia'
import { musicList } from '../resources/musicList';

export const useMusicList = defineStore('musicList', {
  state: () => {
    const musicCloneList = [...musicList];
    return { 
      musicListState: musicCloneList,
      musicCloneList,
     }
  },
  // could also be defined as
  // state: () => ({ count: 0 })
  actions: {
    filterList(query: string) {
      
      const musicFiltered = this.musicCloneList.filter((song) => {
        const songLowerCase = song.description.toLocaleLowerCase();
        const songTextLowerCase = query.toLocaleLowerCase();
        return songLowerCase.includes(songTextLowerCase);
      });
   
      return musicFiltered;
    },
  
    getOneOfMyFavoriteSongs(id: number){
      return this.musicCloneList[id].favorite;
    },
    getMyFavoriteMusicList(){
      return this.musicCloneList.filter(song => song.favorite) 
    },
    getPopularMusicList(){
      return this.musicListState.filter(song => song.popular)
    }
  },
})