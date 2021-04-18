import { PlayIcon, PauseIcon } from '@heroicons/react/solid'
import moment from 'moment';
import { motion } from 'framer-motion'

interface EpisodeProps {
    imageSrc: string,
    imageAlt: string,
    title: string,
    date: number,
    duration: number,
    id: string,
    onSelect: (id: string) => void,
    selectedEpisodeId: string | undefined,
    pause: () => void,
    playing: boolean,
    resume: () => void,
    index: number
}

const formatSeconds = (seconds: number): string => {
    return new Date(seconds * 1000).toISOString().substr(11, 8);
}

const Episode: React.FC<EpisodeProps> = ({ imageSrc, imageAlt, duration, date, title, id, selectedEpisodeId, onSelect, pause, playing, resume, index }) => {
    let actionIcon = <PlayIcon onClick={() => onSelect(id)} className="text-maroon w-10 inline" />;
    if (id === selectedEpisodeId) {
        // clicking on same episode
        if(playing)
            actionIcon = <PauseIcon onClick={() => pause()} className="text-red-500 w-10 inline" />
        else
            actionIcon = <PlayIcon onClick={() => resume()} className="text-maroon w-10 inline" />
    }
    return (
        <motion.div
            initial="hidden"
            animate="visible"
            exit="end"
            className="w-full p-2 relative"
            transition={{ delay: index * 0.2 }}
            variants={{
                hidden: {
                    opacity: 0,
                    top: -20,
                },
                visible: {
                    top: 0,
                    opacity: 1,
                },
                end: {
                    
                }
            }}
        >
            <div className="flex flex-row rounded overflow-hidden border shadow-md">
                <img
                    className="block h-auto w-24 lg:w-20 bg-cover"
                    src={imageSrc}
                    alt={imageAlt}
                />
                <div className="bg-gray-200 p-2 w-full flex flex-col lg:flex-row justify-between leading-normal">
                    <div className="flex justify-center flex-col mb-1">
                        <p className="text-black font-bold text-lg leading-tight">{title}</p>
                        <p className="text-gray-500 text-sm">{moment(date).format('MMMM DD, YYYY')}</p>
                    </div>
                    <div className="text-sm flex flex-row lg:flex-col items-center lg:justify-center">
                        {actionIcon}
                        &nbsp;{formatSeconds(duration)}
                    </div>
                </div>
            </div>
      </motion.div>
    )
}

export default Episode;