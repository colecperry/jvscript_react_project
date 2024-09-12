import Carousel from 'react-bootstrap/Carousel';
import TopSongs from "./TopSongs"
import LikedSongs from "./LikedSongs";
import NewSongs from "./NewSongs";

function Home({ allLikedSongs, allTopSongs, allNewSongs, allPlaylists, setAllPlaylists, handleLikedSong, handleRemovedLike, generalToggle, setGeneralToggle }) {
    // Within home, return LikedSongs, with the allLikedSongs and setAllSongs states as props
    // Return TopSongs with the allTopSongs and setAllTopSongs states as props as well as the handleLikedSong
    // function which adds our newLikedSong to our json file
    // Return NewSongs with all the allNewSongs and setAllNewSongs states as props as well as the handleLikedSong
    // function which adds our newLikedSong to our json file
    return (
        <>
            <h1 id="homePageTitle" className="pageTitle">Welcome to Codify!</h1>
            <h2 className="sectionTitle">Your Likes</h2>
            <Carousel className="carousel">
                <Carousel.Item interval={10000}>
                    <LikedSongs 
                        allLikedSongs={allLikedSongs} 
                        handleRemovedLike={handleRemovedLike}
                        allPlaylists={allPlaylists}
                        setAllPlaylists={setAllPlaylists}
                        generalToggle={generalToggle}
                        setGeneralToggle={setGeneralToggle}
                        startingIndex={0}
                        key={"likedSongs1"}
                    />
                </Carousel.Item>
                <Carousel.Item interval={17500}>
                    <LikedSongs 
                        allLikedSongs={allLikedSongs} 
                        handleRemovedLike={handleRemovedLike}
                        allPlaylists={allPlaylists}
                        setAllPlaylists={setAllPlaylists}
                        generalToggle={generalToggle}
                        setGeneralToggle={setGeneralToggle}
                        startingIndex={5}
                        key={"likedSongs2"}
                    />
                </Carousel.Item>
                <Carousel.Item interval={25000}>
                    <LikedSongs 
                        allLikedSongs={allLikedSongs} 
                        handleRemovedLike={handleRemovedLike}
                        allPlaylists={allPlaylists}
                        setAllPlaylists={setAllPlaylists}
                        generalToggle={generalToggle}
                        setGeneralToggle={setGeneralToggle}
                        startingIndex={10}
                        key={"likedSongs3"}
                    />
                </Carousel.Item>
            </Carousel>
            <h2 className="sectionTitle">Top Songs</h2>
            <Carousel className="carousel">
                <Carousel.Item interval={7500}>
                    <TopSongs 
                        allTopSongs={allTopSongs} 
                        allPlaylists={allPlaylists}
                        setAllPlaylists={setAllPlaylists}
                        handleLikedSong={handleLikedSong} 
                        generalToggle={generalToggle}
                        setGeneralToggle={setGeneralToggle}
                        startingIndex={0}
                        key={"topSongs1"}
                    />
                </Carousel.Item>
                <Carousel.Item interval={15000}>
                    <TopSongs 
                        allTopSongs={allTopSongs} 
                        allPlaylists={allPlaylists}
                        setAllPlaylists={setAllPlaylists}
                        handleLikedSong={handleLikedSong} 
                        generalToggle={generalToggle}
                        setGeneralToggle={setGeneralToggle}
                        startingIndex={5}
                        key={"topSongs2"}
                    />
                </Carousel.Item>
                <Carousel.Item interval={22500}>
                    <TopSongs 
                        allTopSongs={allTopSongs} 
                        allPlaylists={allPlaylists}
                        setAllPlaylists={setAllPlaylists}
                        handleLikedSong={handleLikedSong} 
                        generalToggle={generalToggle}
                        setGeneralToggle={setGeneralToggle}
                        startingIndex={10}
                        key={"topSongs3"}
                    />
                </Carousel.Item>
            </Carousel>
            <h2 className="sectionTitle">New Songs</h2>
            <Carousel className="carousel">
                <Carousel.Item interval={7500}>
                    <NewSongs 
                        allNewSongs={allNewSongs} 
                        allPlaylists={allPlaylists}
                        setAllPlaylists={setAllPlaylists}
                        handleLikedSong={handleLikedSong} 
                        generalToggle={generalToggle}
                        setGeneralToggle={setGeneralToggle}
                        startingIndex={0}
                        key={"newSongs1"}
                    />
                </Carousel.Item>
                <Carousel.Item interval={15000}>
                    <NewSongs 
                        allNewSongs={allNewSongs} 
                        allPlaylists={allPlaylists}
                        setAllPlaylists={setAllPlaylists}
                        handleLikedSong={handleLikedSong} 
                        generalToggle={generalToggle}
                        setGeneralToggle={setGeneralToggle}
                        startingIndex={5}
                        key={"newSongs2"}
                    />
                </Carousel.Item>
                <Carousel.Item interval={22500}>
                    <NewSongs 
                        allNewSongs={allNewSongs} 
                        allPlaylists={allPlaylists}
                        setAllPlaylists={setAllPlaylists}
                        handleLikedSong={handleLikedSong} 
                        generalToggle={generalToggle}
                        setGeneralToggle={setGeneralToggle}
                        startingIndex={10}
                        key={"newSongs3"}
                    />
                </Carousel.Item>
            </Carousel>
        </>
    )
}

export default Home;