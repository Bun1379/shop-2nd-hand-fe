import { Rating } from "@smastrom/react-rating";

const ReviewItem = ({ review }) => {
  return (
    <div className="d-flex flex-row gap-3 border rounded shadow-sm p-3 align-items-center w-75 my-3 bg-light">
      <img
        src={review.user.image}
        className="rounded-circle border border-2"
        style={{ width: "75px", height: "75px", objectFit: "cover" }}
        alt={`${review.user.username}'s avatar`}
      />
      <div className="d-flex flex-column gap-1 w-100">
        <span className="fw-bold text-primary">{review.user.username}</span>
        <div className="d-flex align-items-center">
          <Rating value={review.rating} readOnly style={{ width: "10%" }} />
          <small className="text-muted ms-2">{review.rating}/5</small>
        </div>
        <span>{review.comment}</span>
        <span className="text-end text-muted" style={{ fontSize: "0.9rem" }}>
          {new Date(review.createdAt).toLocaleDateString()}
        </span>
      </div>
    </div>
  );
};
export default ReviewItem;
