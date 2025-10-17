export type MusicBrainzArtistCredit = {
    artist: {
      id: string;
      name: string;
    };
  };
  
  export type MusicBrainzRecording = {
    id: string;
    title: string;
    'artist-credit': MusicBrainzArtistCredit[];
    releases?: { 
      'cover-art-archive'?: { 
        front: boolean;
        artwork: boolean;
        id: string;
      } 
    }[];
  };
  
  export type Song = {
    id: string;
    title: string;
    artist: string;
    coverArt?: string;
  };
  