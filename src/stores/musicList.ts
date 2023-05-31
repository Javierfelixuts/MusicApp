import { defineStore } from 'pinia'
import { musicList } from '../resources/musicList';

export const useMusicList = defineStore('musicList', {
  state: () => {
    const musicCloneList = [...musicList];
    const musicPopularSongsInitial = musicCloneList.filter(song => song.popular);
    const musicFavoriteSongsInitial = musicCloneList.filter(song => song.favorite);
    return { 
      musicListState: musicCloneList,
      musicCloneList,
      musicPopularSongs: musicPopularSongsInitial,
      musicPopularSongsInitial,
      musicFavoriteSongs: musicFavoriteSongsInitial,
      musicFavoriteSongsInitial,
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
      const musicFilteredPopular = this.musicPopularSongsInitial.filter((song) => {
        const songLowerCase = song.description.toLocaleLowerCase();
        const songTextLowerCase = query.toLocaleLowerCase();
        return songLowerCase.includes(songTextLowerCase);
      });
      const musicFilteredFavorites = this.musicFavoriteSongsInitial.filter((song) => {
        const songLowerCase = song.description.toLocaleLowerCase();
        const songTextLowerCase = query.toLocaleLowerCase();
        return songLowerCase.includes(songTextLowerCase);
      });
      
      this.musicListState = musicFiltered;
      this.musicPopularSongs = musicFilteredPopular;
      this.musicFavoriteSongs = musicFilteredFavorites;
      return musicFiltered;
    },
    setMyFavoriteMusicList(id: number, isFavorite: boolean){
      console.log("id: ", id);
      this.musicCloneList[id].favorite = isFavorite;

      console.log("this.musicCloneList: ", this.musicCloneList)
    },
    getMyFavoriteMusicList(){
      return this.musicCloneList.filter(song => song.favorite) 
    },
    getPopularMusicList(){
      return this.musicListState.filter(song => song.popular)
    }
  },
})