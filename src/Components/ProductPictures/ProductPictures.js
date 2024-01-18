import React, { useEffect, useState } from "react";
import akash from "../../assets/images/hr_coil.jpg";
import crBaby from "../../assets/images/cr_baby_coil.jpg";
import { getProductPictures } from "../../Api/lotsapi";
import FixComponents from "../FixComponents";

function ProductPictures() {
  const [products, setProducts] = useState(null);
  const [apiLoading, setApiLoding] = useState(false);

  const fetchProduct = () => {
    getProductPictures().then((res) => {
      if (res.status === 200) {
        console.log(res.data?.productImages);
        setProducts(res.data?.productImages);
      }
    });
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <>
      <div className="row">
        {products && products?.length > 0 ? (
          products?.map((lot) => {
            console.log(lot);
            return (
              <div className="col-md-6 col-sm-12 pb-3">
                <div className="card">
                  <div className="material-table">
                    <div className="card-header live_LotsDetails_header">
                      {lot?.title}
                    </div>
                  </div>
                  <div className="card-img">
                    <img src={lot?.image} style={{ width: "100%" }} />
                    {/* <ul className="list-group list-group-flush">
                <li className="list-group-item live_lot_details">
                
                </li>
              </ul> */}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <>
            <FixComponents
              comp={!apiLoading && products != null ? "NoData" : ""}
            />
            {/* <div className="sold_noRecord">No record found</div> */}
          </>
        )}
      </div>
    </>
  );
}

export default ProductPictures;
