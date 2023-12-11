import { useEffect, useState } from "react";
import MusicCard from "../components/card";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import ImageIcon from "@mui/icons-material/Image";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
export default function Home() {
    const [songList, setSongList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentSong, setCurrentSong] = useState(null);
    const [isCurrentSongPlaying, setIsCurrentSongPlaying] = useState(false);
    const [duration, setDuration] = useState("00");
    const [currentTime, setCurrentTime] = useState("00");
    useEffect(() => {
        axios
            .get("http://localhost:3000/api/fetchSongs")
            .catch((err) => {
                console.log(err);
                alert("Failed to fetch songs");
            })
            .then((res) => {
                res.data.sort((a, b) =>
                    a.title.toString().toLowerCase().localeCompare(b.title.toString().toLowerCase()),
                );
                setSongList(res.data);
                setLoading(false);
            });
    }, []);
    useEffect(() => {
        document.querySelector("#MusicPlayer")?.pause();
        document.querySelector("#MusicPlayer")?.load();
        setIsCurrentSongPlaying(true);
    }, [currentSong]);
    return (
        <>
            <div className="flex flex-wrap justify-center select-none w-full">
                {!loading ? (
                    songList.length ? (
                        songList.map((song) => (
                            <MusicCard
                                key={song.timestamp}
                                title={song.title}
                                artist_name={song.creator_name}
                                cover_uri={song.cover_uri}
                                artist_address={song.creator_address}
                                onClickHandler={() => {
                                    setIsCurrentSongPlaying(
                                        JSON.stringify(song) == JSON.stringify(currentSong)
                                            ? !isCurrentSongPlaying
                                            : true,
                                    );
                                    const updatedSongPlayingStatus =
                                        JSON.stringify(song) == JSON.stringify(currentSong)
                                            ? !isCurrentSongPlaying
                                            : true;
                                    if (updatedSongPlayingStatus) {
                                        document.querySelector("#MusicPlayer")?.play();
                                    } else {
                                        document.querySelector("#MusicPlayer")?.pause();
                                    }
                                    setCurrentSong(song);
                                }}
                                isCurrentSongPlaying={isCurrentSongPlaying}
                                isCurrentSong={JSON.stringify(song) == JSON.stringify(currentSong)}
                            />
                        ))
                    ) : (
                        <div>No songs found</div>
                    )
                ) : (
                    <div className="text-center">
                        <CircularProgress size={"5em"} color="primary" />
                        <div className="text-2xl animate-pulse p-2 m-1">Please wait</div>
                    </div>
                )}
            </div>
            <div
                style={{ background: "#002c37" }}
                className="absolute p-3 text-xl font-mono bottom-0 z-10 w-screen -ml-3 text-white justify-between flex"
            >
                <span className="flex space-x-4 items-center h-20 cursor-pointer">
                    <span className="text-yellow-400">Aptofy</span>
                </span>
                <span className="flex space-x-4 items-center h-20">
                    <span>
                        {" "}
                        {!currentSong ? (
                            <ImageIcon fontSize="large" />
                        ) : (
                            <img
                                className="h-16 w-auto rounded-md cursor-pointer hover:h-20 transition-all"
                                alt="Cover Picture"
                                src={currentSong.cover_uri}
                            />
                        )}{" "}
                    </span>
                    <span className="flex h-20 items-center">
                        {"| "}
                        {currentSong ? (
                            <span className="w-44 whitespace-nowrap inline-flex text-ellipsis justify-center ml-2 mr-2">
                                {currentSong.title + " - " + currentSong.creator_name}
                            </span>
                        ) : (
                            "No audio playing"
                        )}
                        {" |"}
                    </span>
                    {currentSong && (
                        <>
                            <span
                                onClick={() => {
                                    if (!isCurrentSongPlaying) {
                                        document.querySelector("#MusicPlayer").play();
                                    } else {
                                        document.querySelector("#MusicPlayer").pause();
                                    }
                                    setIsCurrentSongPlaying(!isCurrentSongPlaying);
                                }}
                                className="cursor-pointer bg-white rounded-full p-3 text-black"
                            >
                                {isCurrentSongPlaying ? <PauseIcon /> : <PlayArrowIcon />}
                            </span>
                            <video
                                onLoadedMetadata={(event) => {
                                    const duration = Math.floor(event.target.duration).toString();
                                    setDuration(duration.length >= 2 ? duration : "0" + duration);
                                    const time = Math.floor(event.target.currentTime).toString();
                                    setCurrentTime(time.length >= 2 ? time : "0" + time);
                                    event.target.play();
                                }}
                                onTimeUpdate={(event) => {
                                    const time = Math.floor(event.target.currentTime).toString();
                                    setCurrentTime(time.length >= 2 ? time : "0" + time);
                                }}
                                onEnded={() => {
                                    document.querySelector("#MusicPlayer").pause();
                                    setIsCurrentSongPlaying(false);
                                }}
                                className="hidden"
                                id="MusicPlayer"
                            >
                                <source src={currentSong.uri} type="audio/mp3" />
                            </video>
                        </>
                    )}
                </span>
                <span className="flex space-x-4 items-center h-20">
                    {" "}
                    {currentSong ? <span>{`${currentTime} : ${duration}`}</span> : null}{" "}
                </span>
            </div>
        </>
    );
}
