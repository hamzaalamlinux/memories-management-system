import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMemories } from '../features/memories/memoriesSlice';
import { setupAxiosInterceptors } from '../api/axiosInstance';
import { Button, Card, Col, Dropdown, Row } from 'react-bootstrap';
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
                    <Card style={{ marginBottom: '20px', position: 'relative' }}>
                        <Card.Img variant="top" style={{height: 300, width:500}} src={`http://127.0.0.1:8000${memory.imagePath}`} />
                        <Card.Body style={{ display: 'flex', flexDirection: 'column' }}>
                            <Card.Title className="card-title" style={{overflow:'hidden', textOverflow:'ellipsis', whiteSpace: 'nowrap'}}>{memory.description || "No description"}</Card.Title>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                                <Button variant="primary">View Details</Button>
                            </div>
                        </Card.Body>
                        {/* Three dots dropdown */}
                        <Dropdown style={{ position: 'absolute', top: '10px', right: '10px' }}>
                            <Dropdown.Toggle
                                variant="secondary"
                                id="dropdown-basic"
                                className="dropdown-toggle no-caret"
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    padding: '0',
                                }}
                            >
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={() => console.log('Edit Clicked')}>Edit</Dropdown.Item>
                                <Dropdown.Item onClick={() => console.log('Delete Clicked')}>Delete</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Card>
                </Col>
                
                );
            })}
        </Row>
    );
};

export default MemoriesList