import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMemories } from '../features/memories/memoriesSlice';
import { setupAxiosInterceptors } from '../api/axiosInstance';
import { Button, Card, Col, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const MemoriesList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.user);
    const token = user?.token;
    const { memories, loading, error } = useSelector((state) => state.memories);

    useEffect(() => {
        setupAxiosInterceptors(token, dispatch, navigate);
        dispatch(fetchMemories()); // Refetch the memories on mount or token change
    }, [dispatch, token, navigate]);

    if (loading) return <p>Loading memories...</p>;
    if (error) return <p>Error fetching memories: {error}</p>;

    if (!Array.isArray(memories) || memories.length === 0) {
        return <p>No memories available</p>;
    }

    return (
        <Row>
            {memories.map(memory => {
                if (!memory.id || !memory.imagePath) {
                    return null; // Skip invalid memory items
                }

                return (
                    <Col key={memory.id} xs={12} sm={6} md={4} lg={3}>
                        <Card style={{ marginBottom: '20px' }}>
                            <Card.Img variant="top" src={`http://127.0.0.1:8000${memory.imagePath}`} />
                            <Card.Body>
                                <Card.Title>{memory.description || "No description"}</Card.Title>
                                <Button variant="primary">View Details</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                );
            })}
        </Row>
    );
};

export default MemoriesList