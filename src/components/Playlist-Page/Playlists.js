import "../../index.css"
import { useHistory } from "react-router-dom";
import { Container, Accordion, Button } from 'react-bootstrap';
import { BsSpotify } from "react-icons/bs";
import { useEffect } from "react";

const Playlists = ({ allLikedSongs, allTopSongs, allNewSongs, allPlaylists, setAllPlaylists, generalToggle, setGeneralToggle }) => {
    
    const history = useHistory()
    
    const handleDeletePlaylist = (id) => {
        fetch(`http://localhost:8000/playlists/${id}`, {
            method: "DELETE"
        })
        const remainingPlaylists = allPlaylists.filter((playlist) => playlist.id != id)
        setAllPlaylists(remainingPlaylists)
    }
    
    useEffect(() => {
        setGeneralToggle(!generalToggle)
    }, [])
    
    useEffect(() => {
        renderUserPlaylists()
    }, [generalToggle])

    const renderCuratedPlaylists = (playlistName) => {
        return playlistName.map((song) => {
            const songImage = song.track.album.images[0]?.url || process.env.PUBLIC_URL + "logo192.png"
            const songName = song.track.name
            const artistName = song.track.artists[0].name
            const songPreview = song.track.preview_url
            const spotifyLink = song.track.external_urls.spotify
            return (
                <Accordion.Body className="playlistAccordionBody">
                    <img src={songImage} className="playlistAccordionImage"></img>
                    <span style={{position:"absolute", left:"100px"}} >{songName} - {artistName}</span>
                    <audio controls name="media" className="playlistAccordionAudio">
                        <source src={songPreview} alt="no preview available" type="audio/mp3" />
                    </audio>
                    <a href={spotifyLink} target="_blank">
                        <BsSpotify style={{cursor:"pointer", color:"#1DB954", scale:"2.5"}} />
                    </a>
                </Accordion.Body>
            )
        })
    }

    const renderEachLikedSong = () => {
        return allLikedSongs.map((song) => {
            return (
                <Accordion.Body className="playlistAccordionBody">
                    <img src={song.image} className="playlistAccordionImage"></img>
                    <span style={{position:"absolute", left:"100px"}}>{song.song_name} - {song.artists}</span>
                    <audio controls name="media" className="playlistAccordionAudio">
                        <source src={song.preview_url} alt="no preview available" type="audio/mp3" />
                    </audio>
                    <a href={song.song_link} target="_blank">
                        <BsSpotify className="spotifyLogo" />
                    </a>
                </Accordion.Body>
            )
        })
    }

    const renderUserSongs = (playlist) => {
        return playlist.songs.map((song) => {
            return (
                <Accordion.Body className="playlistAccordionBody">
                    <img src={song.image} className="playlistAccordionImage"></img>
                    <span style={{position:"absolute", left:"100px"}}>{song.song_name} - {song.artists}</span>
                    <audio controls name="media" className="playlistAccordionAudio">
                        <source src={song.preview_url} alt="no preview available" type="audio/mp3" />
                    </audio>
                    <a href={song.song_link} target="_blank">
                        <BsSpotify className="spotifyLogo" />
                    </a>
                </Accordion.Body>
            )
        })
    }

    const renderUserPlaylists = () => allPlaylists.map((playlist) => {
        return (
            <Accordion className="playlistAccordion" defaultActiveKey={null}>
                <Accordion.Item>
                <Accordion.Header>{playlist.name}</Accordion.Header>
                    {renderUserSongs(playlist)}
                </Accordion.Item>
                <Button 
                    onClick={() => handleDeletePlaylist(playlist.id)}
                    style={{position: "absolute", display:"flex", justifyContent:"center", marginLeft:"1325px", top:"7.5px", width:"150px"}}>
                    Delete Playlist
                </Button>
            </Accordion>
        )
    })

    return (
        <Container className="playlistDiv">
            <h1 className="pageTitle">Your Playlists</h1>
            <Accordion className="playlistAccordion" defaultActiveKey={null}>
                <Accordion.Item>
                <Accordion.Header>Liked Songs</Accordion.Header>
                   {allLikedSongs !== [] ? renderEachLikedSong() : null}
                </Accordion.Item>
            </Accordion>
            <Accordion className="playlistAccordion" defaultActiveKey={null}>
                <Accordion.Item>
                <Accordion.Header>Top Songs</Accordion.Header>
                    {allTopSongs !== [] ? renderCuratedPlaylists(allTopSongs) : null}
                </Accordion.Item>
            </Accordion>
            <Accordion className="playlistAccordion" defaultActiveKey={null}>
                <Accordion.Item>
                <Accordion.Header>New Songs</Accordion.Header>
                   {allNewSongs !== [] ? renderCuratedPlaylists(allNewSongs) : null}
                </Accordion.Item>
            </Accordion>
            {renderUserPlaylists()}
            <Button onClick={() => history.push({pathname:"/playlists/new-playlist"})}>Create A Playlist</Button>
        </Container>
    )
}

export default Playlists;