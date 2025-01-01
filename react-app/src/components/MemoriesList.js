import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMemories } from '../features/memories/memoriesSlice';
import { setupAxiosInterceptors } from '../api/axiosInstance';
import { Button, Card, Col, Row } from 'react-bootstrap';

const MemoriesList = () => {
    const dispatch = useDispatch();
    const {user} = useSelector((state) => state.user);
    const token = user?.token;
    const { memories, loading, error } = useSelector((state) => state.memories);
    useEffect(() => {
        setupAxiosInterceptors(token);
        dispatch(fetchMemories());
        
    }, [dispatch])
    
    if (loading) return <p>Loading memories...</p>;
    if (error) return <p>Error fetching memories: {error}</p>;
    console.log(memories);
    return (
        <Row>
        {memories.map(memory => (
            <Col key={memory.id} xs={12} sm={6} md={4} lg={3}>
                <Card style={{ marginBottom: '20px' }}>
                    <Card.Img variant="top" src={`http://127.0.0.1:8000${memory.imagePath}`} />
                    <Card.Body>
                        <Card.Title>{memory.description || "No description"}</Card.Title>
                        <Button variant="primary">View Details</Button>
                    </Card.Body>
                </Card>
            </Col>
        ))}
    </Row>

    )
}

export default MemoriesList