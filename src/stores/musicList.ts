import { defineStore } from 'pinia'
import { musicList } from '../resources/musicList';

export const useMusicList = defineStore('musicList', {
  state: () => {
    return { 
      musicListState: musicList
     }
  },
  // could also be defined as
  // state: () => ({ count: 0 })
  actions: {
    filterList(query: string) {
      const musicFiltered = this.musicListState.filter((song) => {
        const songLowerCase = song.songName.toLocaleLowerCase();
        const songTextLowerCase = query.toLocaleLowerCase();
        return songLowerCase.includes(songTextLowerCase);
      });
      return musicFiltered;
    },
    getMyFavoriteMusicList(){
      return this.musicListState.filter(song => song.favorite)
    },
    getPopularMusicList(){
      return this.musicListState.filter(song => song.popular)
    }
  },
})