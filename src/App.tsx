import { createRef, useState } from 'react';
import AudioPlayer from 'react-h5-audio-player'
import 'react-h5-audio-player/lib/styles.css';


import { EpisodeType, searchResult } from './types'
import { Loading } from './components/Loading/Loading';
import { Search } from './components/Search/Search';
import { Episodes } from './components/Episodes/Episodes';
import './style.css';


function App() {
  const [episodes, setEpisodes] = useState<EpisodeType[]>([]);
  const [selectedEpisode, setSelectedEpisode] = useState<EpisodeType>();
  const [playing, setPlaying] = useState(true);
  const [loading, setLoading] = useState(false);
  const audioRef = createRef<AudioPlayer>();

  const onSearch = async (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    setLoading(true);
    setEpisodes([]);
    let target = e.target as HTMLFormElement;
    let value = (target.elements[1] as HTMLInputElement).value;
    let response = await fetch(`https://listen-api.listennotes.com/api/v2/search?q=${encodeURI(value)}`, {
      headers: {
        'X-ListenAPI-Key': process.env.REACT_APP_ListenAPI_Key!
      }
    });
    let data:searchResult = await response.json();
    setEpisodes(data.results);
    setLoading(false);
    setSelectedEpisode(undefined);
  }

  const playEpisode = (id: string) => {
    let episode = episodes.find( epi => epi.id === id);
    setSelectedEpisode(episode);
    setPlaying(true);
  }
  const pauseEpisode = () => {
    setPlaying(false);
    audioRef.current?.audio.current?.pause();
  }
  const resumeEpisode = () => {
    setPlaying(true);
    audioRef.current?.audio.current?.play();
  }

  console.log(loading);
  return (
    <div className="h-full bg-gradient-to-br from-gray-600 via-teal-7 to-gray-800 p-3">
      
      <div className="w-full h-full bg-white rounded-md flex flex-col">  
        <Search onSearch={onSearch} />

        {
          episodes.length > 0 &&
          <Episodes
            episodes={episodes}
            onSelect={playEpisode}
            selectedEpisodeId={selectedEpisode?.id}
            pause={pauseEpisode}
            resume={resumeEpisode}
            playing={playing}
          />
        }

        { loading && <Loading /> }
        
        {
          (selectedEpisode && episodes.length > 0) &&
          (
            <div className="bottom-0 flex-grow-0">
              <AudioPlayer
                ref={audioRef}
                autoPlay={true}
                className="rounded-md"
                layout="horizontal-reverse"
                src={selectedEpisode.audio}
                onPlay={() => !playing && setPlaying(true) }
                onPause={() => playing && setPlaying(false) }
              />
            </div>
          )
        }
      </div>
    </div>
  );
}

export default App;
