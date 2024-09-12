import { Row, Container } from 'react-bootstrap';
import SongCard from "../SongCard";

function NewSongs({ startingIndex, allNewSongs, handleLikedSong, allPlaylists, setAllPlaylists, generalToggle, setGeneralToggle }) {
    
    const eachTrack = () => {
        const onlyFiveNewSongs = allNewSongs.slice(startingIndex, startingIndex + 5);
        return onlyFiveNewSongs.map((song) => {
            return (
                <SongCard 
                    track={song.track} 
                    allPlaylists={allPlaylists} 
                    setAllPlaylists={setAllPlaylists} 
                    handleLikedSong={handleLikedSong} 
                    generalToggle={generalToggle} 
                    setGeneralToggle={setGeneralToggle}
                    key={song.track.id} 
                />
            )
        })
    }

    return (
        <Container className="homePageDiv">
            <Row className="mx-2 row row-cols-5">
                {allNewSongs !== [] ? eachTrack() : null}
            </Row>
        </Container>
    )
}

export default NewSongs;