import Episode from './components/Episode';
import AudioPlayer from 'react-h5-audio-player'
import 'react-h5-audio-player/lib/styles.css';
import './style.css';
import { useState } from 'react';
import { EpisodeType, searchResult } from './types'

function App() {
  const [episodes, setEpisodes] = useState<EpisodeType[]>([]);
  const [selectedEpisode, setSelectedEpisode] = useState<EpisodeType>();

  const onSearch = async (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    let target = e.target as HTMLFormElement;
    let value = (target.elements[1] as HTMLInputElement).value;
    let response = await fetch(`https://listen-api.listennotes.com/api/v2/search?q=${encodeURI(value)}`, {
      headers: {
        'X-ListenAPI-Key': '090f8e2ddd514e979a2885af17c56e14'
      }
    });
    let data:searchResult = await response.json();
    setEpisodes(data.results)
  }

  const onSelectEpisode = (id: string) => {
    let episode = episodes.find( epi => epi.id === id);
    setSelectedEpisode(episode);
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
                onSelect={onSelectEpisode}
                imageAlt={episode.title_original}
                imageSrc={episode.thumbnail}
                date={episode.pub_date_ms}
                duration={episode.audio_length_sec}
                title={episode.title_original}
              />
            ))
          }
        </div>
        
        {
          selectedEpisode &&
          (
            <div className="bottom-0">
              <AudioPlayer
                className="rounded-md"
                layout="horizontal-reverse"
                src={selectedEpisode.audio}
              />
            </div>
          )
        }
      </div>
    </div>
  );
}

export default App;
