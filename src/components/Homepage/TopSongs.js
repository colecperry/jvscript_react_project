import { Row, Container } from 'react-bootstrap';
import SongCard from "../SongCard";

function TopSongs({ startingIndex, allTopSongs, handleLikedSong, allPlaylists, setAllPlaylists, handleAddToPlaylist, generalToggle, setGeneralToggle }) {

    // Take our allTopSongs state and return a new array of 5 songs 
    // Map through each of the 5 songs and send down the song to our songCard

    const eachTrack = () => {
        const onlyFiveTopSongs = allTopSongs.slice(startingIndex, startingIndex + 5);
        return onlyFiveTopSongs.map((song) => {
            return (
                <SongCard 
                    track={song.track} 
                    allPlaylists={allPlaylists} 
                    setAllPlaylists={setAllPlaylists} 
                    handleAddToPlaylist={handleAddToPlaylist}
                    handleLikedSong={handleLikedSong} 
                    generalToggle={generalToggle} 
                    setGeneralToggle={setGeneralToggle} 
                    key={song.track.id} 
                />
            )
        })
    }

    // RenderTopCharts, 5. Create an inline function to fix the asynch issue: If top 5 is not equal to an empty
    // string, run eachTrack function, else do nothing. We believe that React/JS was trying to run our slice 
    // before it was able to complete the fetch and set the topFive state. With this inline function, it will 
    // not run until the fetch completes and the state is set

    return (
        <Container className="homePageDiv">
            <Row className="mx-2 row row-cols-5">
                {allTopSongs !== [] ? eachTrack() : null}
            </Row>
        </Container>
    )
}

export default TopSongs;