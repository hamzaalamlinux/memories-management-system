import React, { useState } from 'react'
import { Button, Form, Modal, ModalBody, ModalFooter, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import {  updateMemories } from '../features/memories/memoriesSlice';
export const EditMemoryModal = ({ show, handleClose, memory }) => {
  const { user } = useSelector((state) => state.user);
  const [imagePath, setImagePath] = useState(`http://127.0.0.1:8000${memory.imagePath}` || '');
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState('');
  const dispatch = useDispatch();

  const cnageFile = (e) => {
    const file = e.target.files[0];
    setFile(file);
    setImagePath(URL.createObjectURL(file));
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user.id) {
      alert("Please fill all field!");
      return;
    }
    try {

      // const storageRef = ref(storage, `memories/${user.uid}/${file.name}`);
      // const snapshot = await uploadBytes(storageRef, file);
      // const downloadUrl = await getDownloadURL(snapshot.ref);



      const formData = new FormData();

      // Append each field to the FormData object
      formData.append('Id', memory.id);
      formData.append('userId', user.id);
      formData.append('description', (description) ? description : memory.description);
      formData.append('image', file); // File objects are appended directly
      dispatch(updateMemories(formData));
      // const docRef = await addDoc(collection(db, "memories"), memoryData);
      // dispatch(addMemories({ id: docRef.id, ...memoryData }));
      setFile(null);
      setDescription("");
      handleClose();
    } catch (error) {
      dispatch();
    } finally {

    }
  }
  return (
    <>

      <Modal show={show} >
        <Modal.Header closeButton onClick={handleClose}>
          <Modal.Title>Edit Memories</Modal.Title>
        </Modal.Header>
        <ModalBody>
          <Form onSubmit={handleSubmit}>
            <Form.Group className='mb-3'>
              <Form.Label>File</Form.Label>
              <Form.Control onChange={(e) => cnageFile(e)} type='file' placeholder='file' />
            </Form.Group>

            <Form.Group className='mb-3'>
              <Image
                src={`${imagePath}`}
                alt="Memory Image"
                fluid
                style={{ height: '300px', width: '100%', marginBottom: '20px' }}
              />
            </Form.Group>

            <Form.Group className='mb-3'>
              <Form.Label>Description</Form.Label>
              <Form.Control onChange={(e) => setDescription(e.target.value)} as="textarea"
                rows={3}>{memory.description || ''}</Form.Control>
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
