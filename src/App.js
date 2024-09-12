import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import './App.css';
import "./index.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "./components/Header";
import Home from "./components/Homepage/Home";
import Playlists from "./components/Playlist-Page/Playlists";
import Search from "./components/Search-Page/Search";
import ArtistDetails from "./components/Search-Page/ArtistDetails";
import AlbumDetails from "./components/Search-Page/AlbumDetails";
import PlaylistDetails from "./components/Search-Page/PlaylistDetails";
import CreatePlaylist from "./components/Playlist-Page/CreatePlaylist";

const CLIENT_ID = "1ff422b13da04c47b1d3639000b11abb";
const CLIENT_SECRET = "403561469b9c409faa37c5f49d39c46e";

function App() {
  const [generalToggle, setGeneralToggle] = useState(false);
  const [accessToken, setAccessToken] = useState("");
  const [allLikedSongs, setAllLikedSongs] = useState([]);
  const [allTopSongs, setAllTopSongs] = useState([]);
  const [allNewSongs, setAllNewSongs] = useState([]);
  const [allPlaylists, setAllPlaylists] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/playlists")
    .then((response) => response.json())
    .then((playlistData) => {
      setAllPlaylists(playlistData)
    })
  }, [generalToggle])

  // Fetch the Access Token from the Spotify API, set to state
  useEffect(() => {
      let authParameters = {
          method: 'POST',
          headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: "grant_type=client_credentials&client_id=" + CLIENT_ID + "&client_secret=" + CLIENT_SECRET
      }
      fetch('https://accounts.spotify.com/api/token', authParameters)
      .then(resp => resp.json())
      .then(data => setAccessToken(data.access_token))
    }, [])

    // Fetch Top Charts Songs from spotify playlist, iterate through each song and return a new array if
    // the song preview url is not null, and set state
    useEffect(() => {
      if (accessToken) {
        fetch('https://api.spotify.com/v1/playlists/37i9dQZEVXbNG2KDcFcKOF', {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + accessToken
          }
        })
        .then(response => response.json())
        .then(data => {
          const filteredSongs = data.tracks.items.filter((song) => song.track.preview_url != null)
          setAllTopSongs(filteredSongs)
        })
      } 
  }, [accessToken])
  
  // Fetch new songs from spotify playlist, iterate through each song and return a new array if 
  // the song preview is not null, and set to state 
  useEffect(() => {
    if (accessToken) {
      fetch('https://api.spotify.com/v1/playlists/37i9dQZF1DX4JAvHpjipBk', {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + accessToken
        }
    })
    .then(response => response.json())
    .then(data => {
        const filteredSongs = data.tracks.items.filter((song) => song.track.preview_url != null)
        setAllNewSongs(filteredSongs)
    })
  }
  }, [accessToken])
  
  // Fetch liked songs from our local JSON file and set to state
  useEffect(() => {
    fetch('http://localhost:8000/likes', {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + accessToken
        }
    })
    .then(response => response.json())
    .then(likedSongs => {
        setAllLikedSongs(likedSongs)
    })
  }, [])
  
  // Post our new liked song to our DB JSON file and add it to our allLikedSongs state
  const handleLikedSong = (likedSong) => {
      fetch("http://localhost:8000/likes", {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify(likedSong)
      })
      .then((response => response.json()))
      .then((likedSong) => console.log(likedSong))
      setAllLikedSongs([...allLikedSongs, likedSong])
  }

  const handleRemovedLike = (song) => {
    fetch("http://localhost:8000/likes/" + song.id, {
      method: "DELETE"
    })
    const allRemainingLikes = allLikedSongs.filter((eachSong) => eachSong.song_id !== song.song_id)
    setAllLikedSongs(allRemainingLikes)
  }

  // Return a NavBar which includes client side routes for Home, Playlists, and Search
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path="/">
          <Home 
            allLikedSongs={allLikedSongs} 
            allTopSongs={allTopSongs} 
            allNewSongs={allNewSongs} 
            allPlaylists={allPlaylists}
            setAllPlaylists={setAllPlaylists}
            handleLikedSong={handleLikedSong}
            handleRemovedLike={handleRemovedLike}
            generalToggle={generalToggle}
            setGeneralToggle={setGeneralToggle}
          />
        </Route>
        <Route exact path="/playlists">
          <Playlists 
            allLikedSongs={allLikedSongs}
            allTopSongs={allTopSongs}
            allNewSongs={allNewSongs}
            allPlaylists={allPlaylists}
            setAllPlaylists={setAllPlaylists}
            generalToggle={generalToggle}
            setGeneralToggle={setGeneralToggle}
          />
        </Route>
        <Route path="/playlists/new-playlist">
          <CreatePlaylist 
            allPlaylists={allPlaylists}
            setAllPlaylists={setAllPlaylists}
            generalToggle={generalToggle}
            setGeneralToggle={setGeneralToggle}
          />
        </Route>
        <Route exact path="/search">
          <Search 
            handleLikedSong={handleLikedSong} 
            accessToken={accessToken} 
            allPlaylists={allPlaylists}
            setAllPlaylists={setAllPlaylists}
            generalToggle={generalToggle}
            setGeneralToggle={setGeneralToggle}
          />
        </Route>
        <Route path="/search/artist/:name/details">
          <ArtistDetails 
            accessToken={accessToken} 
            allPlaylists={allPlaylists}
            setAllPlaylists={setAllPlaylists}
            generalToggle={generalToggle}
            setGeneralToggle={setGeneralToggle}
            handleLikedSong={handleLikedSong}
          />
        </Route>
        <Route path="/search/album/:name/details">
          <AlbumDetails 
            accessToken={accessToken} 
            allPlaylists={allPlaylists}
            setAllPlaylists={setAllPlaylists}
            generalToggle={generalToggle}
            setGeneralToggle={setGeneralToggle}
            handleLikedSong={handleLikedSong}
          />
        </Route>
        <Route path="/search/playlist/:name/details">
          <PlaylistDetails 
            accessToken={accessToken} 
            allPlaylists={allPlaylists}
            setAllPlaylists={setAllPlaylists}
            generalToggle={generalToggle}
            setGeneralToggle={setGeneralToggle}
            handleLikedSong={handleLikedSong}
          />
        </Route>
      </Switch>

    </div>
  );
}

export default App;






























