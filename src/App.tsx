import { createRef, useState } from 'react';
import AudioPlayer from 'react-h5-audio-player'
import 'react-h5-audio-player/lib/styles.css';


import { EpisodeType, searchResult } from './types'
import { Loading } from './components/Loading/Loading';
import { Search } from './components/Search/Search';
import { Episodes } from './components/Episodes/Episodes';
import './style.css';
import { motion } from 'framer-motion';


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
    let data: searchResult = await response.json();
    if (data.results) {
      setEpisodes(data.results); 
    }
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
            <motion.div
              initial="hidden"
              animate="visible"
              className="bottom-0 flex-grow-0"
              transition={{ duration: 0.4 }}
              variants={{
                hidden: {
                  opacity: 0.2,
                  bottom: -20
                },
                visible: {
                  opacity: 1,
                  bottom: 0
                }
              }}
            >
              <AudioPlayer
                ref={audioRef}
                autoPlay={true}
                className="rounded-md"
                layout="horizontal-reverse"
                src={selectedEpisode.audio}
                onPlay={() => !playing && setPlaying(true) }
                onPause={() => playing && setPlaying(false) }
              />
            </motion.div>
          )
        }
      </div>
    </div>
  );
}

export default App;
