import { Button, ListGroup } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinusCircle } from '@fortawesome/free-solid-svg-icons'

const SongList = (props) => {

    const listOfSongs = props.listofsongs

    const removeSong = (e, songID, songName) => {
        e.preventDefault();
        props.handleSetListOfSongsRemove(songName, songID)
    }

    const handleClear = (e) => {
        e.preventDefault();
        props.handleClearSongList()
    }

    return (
        <div>
            <ListGroup>
                {listOfSongs && listOfSongs.map((song) => {
                    return <ListGroup.Item key={song.songID}>
                        <div className="songArtist">{song.artistName}, {song.albumName}</div>
                        <div>
                            {song.songName}
                            <FontAwesomeIcon className="deleteButton" icon={faMinusCircle} onClick={(e) => removeSong(e, song.songID, song.songName)} />
                        </div>

                    </ListGroup.Item>
                })}
                <div className="songListButtons">
                <Button variant="primary" type="delete" className="generateButton" onClick={(e) => handleClear(e)}>Clear List</Button>
                <Button variant="success" type="submit" className="generateButton spotifyButton" onClick={() => props.setShowPopUp(true)}>Create Playlist</Button>
                </div>
            </ListGroup>
        </div>
    )

}

export default SongList
