import { Row, Container } from 'react-bootstrap';
import LikedSongCard from "./LikedSongCard";

function LikedSongs({ startingIndex, allLikedSongs, handleRemovedLike, allPlaylists, setAllPlaylists, generalToggle, setGeneralToggle }) {

// Render the LikedSongs container by taking in the first 5 songs of allLikedSongs, mapping over them, and passing
// down their props to the LikedSongCard component
    const renderLikedSongs = () => {
        const onlyFiveLikes = allLikedSongs.slice(startingIndex, startingIndex + 5);
        return onlyFiveLikes.map((song) => {
            return (
                <LikedSongCard 
                    song={song}
                    allPlaylists={allPlaylists}
                    setAllPlaylists={setAllPlaylists}
                    handleRemovedLike={handleRemovedLike}
                    generalToggle={generalToggle}
                    setGeneralToggle={setGeneralToggle}
                    key={song.song_id}
                />
            )
        })
    }

// If allLikedSongs is not equal to an empty string, renderLikedSongs, if not, render null
    return (
        <Container className="homePageDiv">
            <Row className="mx-2 row row-cols-5" style={{overflow:"hidden"}}>
                {allLikedSongs !== [] ? renderLikedSongs() : null}
            </Row>
        </Container>
    )
}

export default LikedSongs;