import React, { useState } from 'react'
import { Button, Form, Modal, ModalBody, ModalFooter } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { storage, db } from '../FirebaseConfig';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { addDoc, collection } from 'firebase/firestore';
import { addMemories, startLoading, stopLoading } from '../slices/memoriesSlice';
export const AddMemories = () => {
  const {user} = useSelector((state) => state.user);
  
  const [show, setShow] = useState(false);
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState('');
  const dispatch = useDispatch();
  const handleShow = () => {
    setShow(true);
  }
  const handleClose = () => {
    setShow(false);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !description || !user.uid) {
      alert("Please fill all field!");
      return;
    }
    try {
      dispatch(startLoading);
      const storageRef = ref(storage, `memories/${user.uid}/${file.name}`);
      const snapshot = await uploadBytes(storageRef, file);
      const downloadUrl = await getDownloadURL(snapshot.ref);

      const memoryData = {
        userId: user.uid,
        description,
        Image: downloadUrl,
        creayedAt: new Date().toISOString()
      };
      const docRef = await addDoc(collection(db, "memories"), memoryData);
      dispatch(addMemories({ id: docRef.id, ...memoryData }));
      setFile(null);
      setDescription("");
      handleClose();
    } catch (error) {
        dispatch();
    } finally {
      dispatch(stopLoading);
    }
  }
  return (
    <>
      <button className='btn btn-primary' onClick={handleShow}>Add Memories</button>
      <Modal show={show} >
        <Modal.Header closeButton onClick={handleClose}>
          <Modal.Title>Add Memories</Modal.Title>
        </Modal.Header>
        <ModalBody>
          <Form onSubmit={handleSubmit}>
            <Form.Group className='mb-3'>
              <Form.Label>File</Form.Label>
              <Form.Control onChange={(e) => setFile(e.target.files[0])} type='file' placeholder='Enter  email!' />
            </Form.Group>

            <Form.Group className='mb-3'>
              <Form.Label>Description</Form.Label>
              <Form.Control onChange={(e) => setDescription(e.target.value)} as="textarea"
                rows={3}></Form.Control>
            </Form.Group>
            <Button type='submit' variant='secondary'>Save Chnages</Button>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button variant='secondary' onClick={handleClose}>Close</Button>
         
        </ModalFooter>
      </Modal>
    </>

  )
}
