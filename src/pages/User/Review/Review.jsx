import ReviewItem from "./ReviewItem";

const Review = ({ reviews }) => {
  return (
    <div>
      {reviews &&
        reviews.length > 0 &&
        reviews.map((review) => (
          <ReviewItem key={review._id} review={review} />
        ))}
    </div>
  );
};
export default Review;
