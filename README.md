# Phase-2-React-Group-Project - "Codify"

This project is meant to utilize both Spotify's API, as well as a local JSON server to create a music streaming/discovery platform for users.

Component Tree:

App.js
    Header.js
    Home.js
        LikedSongs.js
            LikedSongCard.js
                AddToPlaylist.js
        TopSongs.js
            Song Card
                AddToPlaylist.js
        NewSongs.js
            SongCard.js
                AddToPlaylist.js
    Search.js
        SongCard.js
        ArtistDetails.js
            TrackListItem.js
        AlbumDetails.js
            TrackListItem.js
        PlaylistDetails.js
            TrackListItem.js
    Playlists.js
    CreatePlaylist.js


Component Descriptions:

Header.js
    -Navbar at top of page that stays there no matter the URL to provide easy navigation for the user.
    -Links to Homepage (Home.js), search page (Search.js), and playlist page (Playlists.js).

Home.js
    -Renders three components as a "curated" home page for song recommendations to be used by the user.  The "carousel" feature allows the user to cycle through their liked songs, as well as recommended popular and new songs.

LikedSongs.js, TopSongs.js, and NewSongs.js
    -Take in the data fetched from both the local API as well as Spotify's API.
    -Uses that information to map through, as well as filter certain songs out (such as those in playlists with no audio preview), and uses that information to render song cards.

SongCard.js
    -For songs not currently "liked", allows user to see the song's album image, name of song, artist.
    -Functionality includes being able to "like" the song, add to personal playlists (using AddToPlaylist.js), preview the song's audio, and to click on the Spotify logo for a direct link to the full song on Spotify directly.

LikedSongCard.js
    -Nearly identical to SongCard.js, but instead of having a like button, there is a button to remove from likes.

Playlists.js
    -Displays all current playlists, starting with Liked, Top, and New Playlists from Homepage, followed by all user playlists.
    -No direct children but does include data from other pages, as well as a link to create new playlists.

CreatePlaylist.js
    -Allows user to create a new playlist with a name and description.
    -Adds new playlist to playlists page, and persists in local API.
    -New songs can immediately be added and persist.
    -Upon form submission, redirects user back to playlists page where it is already rendered.

Search.js
    -Takes in user input via text box, and renders top 5 results by category on page (Songs, Artists, Albums, and Playlists)
    -Top songs uses SongCard.js to render top songs, retaining the same functionality.
    -Top artists, albums, and playlists render seperately using another imported "Card" feature from React Bootstrap.
    -Aside from the top songs, each result can be clicked on to display a new page with that object's details.

ArtistDetails.js
    -Top ten most popular songs are displayed on page using TrackListItem.js
        -These songs can be liked, added to playlists, provide an audio preview unless unavailable through Spotify's API (though there are filtering mechanisms to negate that as best as possible), and link directly to Spotify.
    -Top albums are also displayed, and if clicked on will redirect to that album's details page.

AlbumDetails.js
    -A "Card" from React Bootstrap renders at the top of the page with the album's image, name, and release date.
    -Each song in the album is displayed using TrackListItem.js.

PlaylistDetails.js
    -A "Card" from React Bootstrap renders at the top of the page with the playlist's image and name.
    -All songs from the playlist are rendered using TrackListItem.js.

TrackListItem.js
    -Displays a song's album image, audio preview, as well as a like button, option to add to playlists, and direct link to that song on Spotify.