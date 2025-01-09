import React from 'react'
import { useDispatch } from 'react-redux';
import { deleteMemory } from '../features/memories/memoriesSlice';
import { Button, Modal, ModalBody, ModalFooter } from 'react-bootstrap';

const DeleteMemories = ({ memory, isModalOpen, closeModal }) => {
    const dispatch = useDispatch();
    console.log(isModalOpen);
    const handleDelete = async  () => {
        try {
            dispatch(deleteMemory(memory.id));
            closeModal();
        } catch (error) {
            console.error("Error deleting memory:", error);
            alert("Failed to delete memory. Please try again.");
        } finally {

        }
    };
    return (
        <div>


            {isModalOpen && (
                <Modal show={isModalOpen} >
                    <Modal.Header closeButton onClick={closeModal}>
                        <Modal.Title>Delete Memories</Modal.Title>
                    </Modal.Header>
                    <ModalBody>
                        Are you sure you want to delete this memory?
                       
                    </ModalBody>
                    
                    <ModalFooter>
                        <Button variant='secondary' onClick={closeModal}>Close</Button>
                        <Button type='submit'  onClick= {handleDelete} variant='danger'>Delete</Button>
                    </ModalFooter>
                </Modal>
            )}
        </div>
    )
}

export default DeleteMemories