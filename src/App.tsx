import Episode from './components/Episode';
import AudioPlayer from 'react-h5-audio-player'
import 'react-h5-audio-player/lib/styles.css';
import './style.css';
import { createRef, useState } from 'react';
import { EpisodeType, searchResult } from './types'
import H5AudioPlayer from 'react-h5-audio-player';

function App() {
  const [episodes, setEpisodes] = useState<EpisodeType[]>([]);
  const [selectedEpisode, setSelectedEpisode] = useState<EpisodeType>();
  const [playing, setPlaying] = useState(true);
  const audioRef = createRef<H5AudioPlayer>();

  const onSearch = async (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    let target = e.target as HTMLFormElement;
    let value = (target.elements[1] as HTMLInputElement).value;
    let response = await fetch(`https://listen-api.listennotes.com/api/v2/search?q=${encodeURI(value)}`, {
      headers: {
        'X-ListenAPI-Key': process.env.REACT_APP_ListenAPI_Key!
      }
    });
    let data:searchResult = await response.json();
    setEpisodes(data.results)
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

  return (
    <div className="h-full bg-gradient-to-br from-gray-600 via-teal-7 to-gray-800 p-3">
      
      <div className="w-full h-full bg-white rounded-md">  
        <form method="GET" onSubmit={onSearch}>
          <div className="relative bg-whiteGray rounded-t-md p-1 border-b-2 border-yellow-900 drop-shadow-sm">
            <span className="absolute inset-y-0 left-0 flex items-center pl-2">
              <button type="submit" className="p-1 focus:outline-none focus:shadow-outline text-gray-800">
                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                viewBox="0 0 24 24" className="w-6 h-6">
                  <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </span>
            <input
              type="search" name="search" id="search"
              autoComplete="on"
              placeholder="search podcasts, episodes, artists and more..."
              autoFocus={true}
              className="w-full pl-10 py-1 text-lg sm:text-base bg-transparent outline-none text-black"
            />
          </div>
        </form>

        <div className="overflow-y-auto" style={{ height: 'calc(100% - 100px)' }}>
          {
            episodes.map( episode => (
              <Episode
                key={episode.id}
                id={episode.id}
                onSelect={playEpisode}
                imageAlt={episode.title_original}
                imageSrc={episode.thumbnail}
                date={episode.pub_date_ms}
                duration={episode.audio_length_sec}
                title={episode.title_original}
                selectedEpisodeId={selectedEpisode?.id}
                pause={pauseEpisode}
                resume={resumeEpisode}
                playing={playing}
              />
            ))
          }
        </div>
        
        {
          selectedEpisode &&
          (
            <div className="bottom-0">
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
