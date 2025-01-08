import React, { useState } from 'react'
import { Button, Form, Modal, ModalBody, ModalFooter } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { addMemories } from '../features/memories/memoriesSlice';
export const AddMemories = () => {
  const { user } = useSelector((state) => state.user);
  const { loading, message, error } = useSelector((state) => state.memories);
console.log(user.token);
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
    if (!file || !description || !user.id) {
      alert("Please fill all field!");
      return;
    }
    try {

      // const storageRef = ref(storage, `memories/${user.uid}/${file.name}`);
      // const snapshot = await uploadBytes(storageRef, file);
      // const downloadUrl = await getDownloadURL(snapshot.ref);



      const formData = new FormData();

      // Append each field to the FormData object
      formData.append('userId', user.id);
      formData.append('description', description);
      formData.append('image', file); // File objects are appended directly
      dispatch(addMemories(formData));
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
      <button className='btn btn-primary mb-2' onClick={handleShow}>Add Memories</button>
      <Modal show={show} >
        <Modal.Header closeButton onClick={handleClose}>
          <Modal.Title>Add Memories</Modal.Title>
        </Modal.Header>
        <ModalBody>
          <Form onSubmit={handleSubmit}>
            <Form.Group className='mb-3'>
              <Form.Label>File</Form.Label>
              <Form.Control onChange={(e) => setFile(e.target.files[0])} type='file' placeholder='file' />
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
