import { Rating } from "@smastrom/react-rating";

const ReviewItem = ({ review }) => {
  return (
    <div className="d-flex flex-row gap-3 border border-primary align-items-center w-75 my-2 p-2">
      <img src={review.user.image} style={{ width: "75px", height: "75px" }} />
      <div className="d-flex flex-column gap-1">
        <span className="fw-bold">{review.user.username}</span>
        <Rating value={review.rating} readOnly style={{ width: "10%" }} />
        <span>{review.comment}</span>
        <span className="d-flex justify-content-end">{review.createdAt}</span>
      </div>
    </div>
  );
};
export default ReviewItem;
