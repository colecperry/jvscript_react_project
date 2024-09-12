import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import { BsList } from "react-icons/bs";
import { FaRegHeart, FaHeart } from "react-icons/fa";

const TrackListItem = ({ track, artistName, albumImage, accessToken, allPlaylists, setAllPlaylists, generalToggle, setGeneralToggle, handleLikedSong }) => {
    
    const [backupPreview, setBackupPreview] = useState("");
    const [isFetched, setIsFetched] = useState(false);
    const [isPlaylistClicked, setIsPlaylistClicked] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    
    const history = useHistory();
    
    const likedSong = {
        song_id: track.id,
        song_name: track.name,
        song_link: track.external_urls.spotify,
        artists_id: track.artists[0].id,
        artists: track.artists[0].name,
        artists_link: track.artists[0].external_urls.spotify,
        image: albumImage,
        preview_url: backupPreview
    }
    
    const onLikeButtonClick = () => {
        setIsLiked(!isLiked)
        handleLikedSong(likedSong)
    }

    useEffect(() => {
        fetch('https://api.spotify.com/v1/search?q=' + track.name + '&type=track', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + accessToken
            }
        })
        .then((response) => response.json())
        .then((data) => {
            filterBackups(data.tracks.items)
        })
    }, [])
    
    const filterBackups = (generalBackups) => {
        const backupObj = generalBackups.find((backup) => backup.artists[0].name.toLowerCase() == artistName.toLowerCase())
        let verifiedBackupObj;
        if (backupObj !== undefined) {
            verifiedBackupObj = backupObj
            setIsFetched(true)
        }
        setBackupPreview(verifiedBackupObj.preview_url)
    }

    const dropDownOptions = () => {
        return allPlaylists.map((playlist) => {
            return <Dropdown.Item onClick={() => handleAddToPlaylist(playlist)}>{playlist.name}</Dropdown.Item>
        })
    }

    const handleAddToPlaylist = (playlist) => {
        console.log(playlist.songs)
        fetch(`http://localhost:8000/playlists/${playlist.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                songs: [
                    ...playlist.songs,
                    likedSong
                ]
            })
        })
        .then((response) => response.json())
        .then((addedSongData) => console.log(addedSongData))
        setAllPlaylists([...allPlaylists, likedSong])
        handleToggle()
    }

    const handleToggle = () => {
        setGeneralToggle(!generalToggle)
    }

    const handleCreateNewPlaylist = () => {
        history.push({pathname:"/playlists/new-playlist"})
    }

    return (
        <>
            {isFetched ?
            <span className="trackListSpan">
                <audio className="trackListAudio" controls name="media">
                    <source src={backupPreview} alt="no preview available" type="audio/mp3" />
                </audio>
                {isLiked ? 
                <FaHeart className="trackListEmptyHeart" onClick={() => window.alert("You've already liked this post!")} />            
                : <FaRegHeart className="trackListFullHeart" onClick={onLikeButtonClick} />
                }
                <Dropdown style={{zIndex:"8", left:"555px"}}>
                    <Dropdown.Toggle variant="none" style={{marginBottom:"10px"}}>
                        <BsList className="trackListDropdown" type="select" onClick={() => setIsPlaylistClicked(!isPlaylistClicked)} />
                    </Dropdown.Toggle>
                    <Dropdown.Menu style={{zIndex:"15"}}>
                        <span style={{display:"flex", justifyContent:"center"}}><strong>Add to...</strong></span>
                        <Dropdown.Item style={{zIndex:"15"}} onClick={() => handleCreateNewPlaylist()}>New Playlist</Dropdown.Item>
                    {dropDownOptions()}
                    </Dropdown.Menu>
                </Dropdown>
            </span>
            : <span style={{position:"absolute", right:"75px", width:"350px", alignItems:"center", justifyContent:"flex-end"}}>Preview Not Available</span>}
        </>
    )
}

export default TrackListItem;