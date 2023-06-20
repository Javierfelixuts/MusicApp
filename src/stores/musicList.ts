import { defineStore } from 'pinia'
import { musicList } from '../resources/musicList';

export const useMusicList = defineStore('musicList', {
  state: () => {
    const musicCloneList = [...musicList];
    const musicPopularSongsInitial = musicCloneList.filter(song => song.popular);
    const musicFavoriteSongsInitial = musicCloneList.filter(song => song.favorite);
    const idFavorite = 0;
    return { 
      musicListState: musicCloneList,
      musicCloneList,
      musicPopularSongs: musicPopularSongsInitial,
      musicPopularSongsInitial,
      musicFavoriteSongs: musicFavoriteSongsInitial,
      musicFavoriteSongsInitial,
      idFavorite,
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
    getIdFromMyFavoriteSong(){
      return this.idFavorite;
    },
    setMyFavoriteMusicList(id: number, isFavorite: boolean){
      this.idFavorite = id;
      this.musicCloneList[id].favorite = isFavorite;
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