import React from 'react'
import Episode from './Episode/Episode';

interface EpisodesProps {
    episodes: EpisodeType[],
    onSelect: (id: string) => void,
    selectedEpisodeId: string | undefined,
    pause: () => void,
    playing: boolean,
    resume: () => void,
}

export const Episodes: React.FC<EpisodesProps> = ({ episodes, onSelect, playing, pause, resume, selectedEpisodeId }) => {
    return <div className="overflow-y-auto flex-grow">
    {
      episodes.map( (episode, index) => (
        <Episode
            index={index}
            key={episode.id}
            id={episode.id}
            imageAlt={episode.title_original}
            imageSrc={episode.thumbnail}
            date={episode.pub_date_ms}
            duration={episode.audio_length_sec}
            title={episode.title_original}
            onSelect={onSelect}
            selectedEpisodeId={selectedEpisodeId}
            pause={pause}
            resume={resume}
            playing={playing}
        />
      ))
    }
  </div>;
}