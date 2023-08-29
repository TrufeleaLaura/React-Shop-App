import React, { useEffect, useState } from 'react';
import { Card, Button, Input, message, Rate } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useAuth } from './AuthComponent';
import {useNavigate} from "react-router-dom";

export function ReviewSection({ productId }) {
    const { user } = useAuth();
    const [reviews, setReviews] = useState([]);
    const [newReviewText, setNewReviewText] = useState('');
    const [newReviewRating, setNewReviewRating] = useState(0);
    const [editingReviewId, setEditingReviewId] = useState(null);
    const [userHasReview, setUserHasReview] = useState(false);
    const navigate = useNavigate();
    const [reload, setReload] = useState(false);

    useEffect(() => {
        console.log(reload);
        axios.get(`http://localhost:8080/api/review/${productId}`)
            .then(response => {
                const userReview = response.data.find(review => review.userId === user?._id);
                setUserHasReview(!!userReview);
                setReviews(response.data);
                setReload(false);
            })
            .catch(error => {
                console.log(error);
            });
    }, [productId, user,reload]);

    const handleDeleteClick = async reviewId => {
        try {
            await axios.delete(`http://localhost:8080/api/review/${user._id}/${reviewId}`, {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });
            setReviews(reviews.filter(review => review._id !== reviewId));
            setUserHasReview(false);
            message.success('Review deleted successfully');
        } catch (error) {
            console.log(error);
        }
    };

    const handleEditClick = reviewId => {
        setEditingReviewId(reviewId);
        const reviewToEdit = reviews.find(review => review._id === reviewId);
        setNewReviewText(reviewToEdit.reviewText);
        setNewReviewRating(reviewToEdit.rating);
    };

    const handleSaveClick = async reviewId => {
        try {
            await axios.put(
                `http://localhost:8080/api/review/${user._id}/${reviewId}`,
                {
                    reviewText: newReviewText,
                    rating: newReviewRating,
                },
                {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                }
            );

            setEditingReviewId(null);
            setNewReviewText('');
            setNewReviewRating(0);
            setReload(true);
            message.success('Review updated successfully');
        } catch (error) {
            console.log(error);
        }
    };

    const handleAddReview = async () => {
        try {
            if (!user) {
                navigate('/login')
                return; // Add your navigation logic here
            }

            const response = await axios.post(
                `http://localhost:8080/api/review/${user._id}/${productId}`,
                {
                    reviewText: newReviewText,
                    rating: newReviewRating,
                },
                {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                }
            );

            setReviews([...reviews, response.data]);
            setUserHasReview(true);
            setNewReviewText('');
            setNewReviewRating(0);
            setReload(true)
            message.success('Review added successfully');
        } catch (error) {
            console.log(error);
            setNewReviewText('');
            setNewReviewRating(0);
            alert(error.response.data)
        }
    };

    return (
        <div className="reviews-container">
            <h2>Reviews Section</h2>
            {!userHasReview && (
                <>
                    <Card className="review-card" style={{ marginBottom: '2rem' }}>
                        <Rate value={newReviewRating} onChange={value => setNewReviewRating(value)} />
                        <Input.TextArea
                            value={newReviewText}
                            placeholder="Write your review here..."
                            onChange={e => setNewReviewText(e.target.value)}
                        />
                        <Button type="primary" onClick={handleAddReview}>
                            Add Review
                        </Button>
                    </Card>
                </>
            )}
            {reviews.map(review => (
                <Card
                    key={review._id}
                    className="review-card"
                    actions={[
                        user && review.userId === user._id ? (
                            editingReviewId === review._id ? (
                                <>
                                    <Button
                                        type="primary"
                                        onClick={() => handleSaveClick(review._id)}
                                    >
                                        Save
                                    </Button>
                                    <Button
                                        type="default"
                                        onClick={() => setEditingReviewId(null)}
                                    >
                                        Cancel
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <Button
                                        type="link"
                                        icon={<DeleteOutlined />}
                                        onClick={() => handleDeleteClick(review._id)}
                                    />
                                    <Button
                                        type="link"
                                        icon={<EditOutlined />}
                                        onClick={() => handleEditClick(review._id)}
                                    />
                                </>
                            )
                        ) : null,
                    ]}
                >
                    {editingReviewId === review._id ? (
                        <>
                            <Rate value={newReviewRating} onChange={value => setNewReviewRating(value)} />
                            <Input.TextArea
                                value={newReviewText}
                                onChange={e => setNewReviewText(e.target.value)}
                            />
                        </>
                    ) : (
                        <>
                            <div className="review-info">
                                <div className="review-rating">
                                    <Rate disabled value={review.rating} />
                                </div>
                                <p>{review.reviewText}</p>
                            </div>
                            <div className="review-meta">
                                <p className="review-date">Date: {review.date}</p>
                                <p className="review-status">Status: {review.status}</p>
                            </div>
                        </>
                    )}
                </Card>
            ))}
        </div>
    );
}
