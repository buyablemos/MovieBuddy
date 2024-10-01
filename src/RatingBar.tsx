interface RatingReviewProps {
    rating: number;
    setRating?: (rating: number) => void;
    readOnly?: boolean;
}

const RatingReview: React.FC<RatingReviewProps> = ({ rating, setRating, readOnly }) => {
    return (
        <div className="mt-4 mb-4">
            {[1, 2, 3, 4, 5].map((star) => {
                return (
                    <span
                        className='start'
                        style={{
                            cursor: readOnly ? 'default' : 'pointer',
                            color: rating >= star ? 'transparent' : 'gray',
                            background: rating >= star ? 'linear-gradient(to right, gold, orange)' : 'gray',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            fontSize: '35px',
                            transition: 'transform 0.2s, background 0.2s',
                            transform: rating >= star ? 'scale(1.2)' : 'scale(1)',
                            filter: rating >= star ? 'drop-shadow(0 0 5px gold)' : 'none', // Efekt świetlisty
                        }}
                        onClick={() => {
                            if (setRating) {
                                setRating(star)
                            }
                        }}
                    >
            {' '}
                        ★{' '}
          </span>
                )
            })}
        </div>
    )
}

export default RatingReview;