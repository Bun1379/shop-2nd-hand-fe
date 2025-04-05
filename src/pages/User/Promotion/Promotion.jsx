import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BannerAPI from "../../../api/BannerAPI";
import ProductItem from "../../../components/ProductItem/ProductItem";
import { Image } from "react-bootstrap";

const PromotionPage = () => {
  const { slug } = useParams();
  const [promotion, setPromotion] = useState({});

  const fetchDataProduct = async () => {
    try {
      const res = await BannerAPI.GetProductBySlug(slug);
      if (res.status === 200) {
        setPromotion(res.data.DT);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchDataProduct();
  }, []);

  return (
    <div>
      <h1>{promotion.title}</h1>
      <Image src={promotion?.image} fluid />
      <div
        className="w-100 mt-4"
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "3rem",
        }}
      >
        {promotion.products?.map((product) => (
          <div
            className="product-item text-wrap shadow"
            key={product._id}
            style={{
              width: "240px",
            }}
          >
            <ProductItem product={product} key={product._id} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PromotionPage;
