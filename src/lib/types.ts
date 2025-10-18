export type AudioDbTrack = {
  idTrack: string;
  strTrack: string;
  strArtist: string;
  strAlbum: string;
  strTrackThumb?: string; // Cover art
  strMusicVid?: string; // Music video URL
};

export type Song = {
  id: string;
  title: string;
  artist: string;
  coverArt?: string;
  audioUrl: string;
  moods?: string[];
};

export type Category = {
  name: string;
  slug: string;
  description: string;
  coverImageUrl: string;
};
