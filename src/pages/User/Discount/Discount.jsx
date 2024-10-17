import { useEffect, useState } from "react";
import UserAPI from "../../../api/UserAPI";
import DiscountItem from "./DiscountItem";

const Discount = () => {
  const [discounts, setDiscounts] = useState([]);
  const fetchListDiscount = async () => {
    try {
      const response = await UserAPI.GetUserInfo();
      if (response.status === 200) {
        setDiscounts(response.data.DT.discounts);
      }
    } catch (error) {
      toast.error(error.response.data.EM);
    }
  };

  useEffect(() => {
    fetchListDiscount();
  }, []);
  return (
    <div>
      <h1 className="text-center">Túi Discount</h1>
      {discounts.length === 0 && <p>No discount</p>}
      <div className="d-flex flex-wrap justify-content-between">
        {discounts &&
          discounts.length > 0 &&
          discounts.map((discount) => (
            <DiscountItem discount={discount} key={discount._id} />
          ))}
      </div>
    </div>
  );
};

export default Discount;
