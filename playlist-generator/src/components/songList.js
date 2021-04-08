import { Button, ListGroup } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinusCircle } from '@fortawesome/free-solid-svg-icons'

const SongList = (props) => {

    const listOfSongs = props.listOfSongs

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
                        <div class="songArtist">{song.artistName}, {song.albumName}</div>
                        <div>
                            {song.songName}
                            <FontAwesomeIcon className="deleteButton" icon={faMinusCircle} onClick={(e) => removeSong(e, song.songID, song.songName)} />
                        </div>

                    </ListGroup.Item>
                })}
                <Button variant="primary" type="delete" className="generateButton" onClick={(e) => handleClear(e)}>Clear List</Button>

            </ListGroup>
        </div>
    )

}

export default SongList
