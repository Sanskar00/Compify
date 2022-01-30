import React, { useContext, useEffect, useState } from "react";
import { ProductContext } from "../../../context/ProductsContext";
import { currentSlideCounter } from "../../../actions/productAction";

const Carousel_Round = (props) => {
  const [state, dispatch] = useContext(ProductContext);

  const [current, setCurrent] = useState(0);

  const { topfeaturedProducts, currentSlide } = state;

  return (
    <div>
      <div className="carousel-indicators absolute right-0 bottom-0 left-0 flex justify-center p-0 mb-4 space-x-2">
        {topfeaturedProducts.map((produce, index) => {
          let color = "white";
          if (index === currentSlide) {
            color = "light-flame-orange";
          }
          return (
            <button
              type="button"
              data-bs-target="#caraouselExampleCaptions"
              data-bs-slide-to="0"
              className={`active h-2 w-2 bg-${color} rounded`}
              aria-current="true"
              aria-label={`Slide ${index}`}
              value={index}
              key={index}
            ></button>
          );
        })}
      </div>
    </div>
  );
};

export default Carousel_Round;
