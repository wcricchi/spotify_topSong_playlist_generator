import { Modal, Button, Form, Col, Row, ListGroup } from 'react-bootstrap'
import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons'




const SuccessPopUp = (props) => {


    const token = props.token

    const openInNewTab = (url) => {
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
        if (newWindow) newWindow.opener = null
    }

    return (
        <div>
            <Modal
                {...props}
                size="sm"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-sm">
                        Playlist Successfuly Created
                        <FontAwesomeIcon className="successCheck" icon={faCheckCircle} ></FontAwesomeIcon>
          </Modal.Title>
                </Modal.Header>
                <Modal.Body className="openPlaylist">
                    <span onClick={() => openInNewTab(props.playlistLink)}>Open in Spotify  </span>
                    <FontAwesomeIcon icon={faExternalLinkAlt}></FontAwesomeIcon>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default SuccessPopUp