import React, { useEffect } from "react";
import {
  getfreebiesCartProducts,
  removefreebiesCartItem,
  getfreebiesTotalAmount,
} from "../../components/features/freebiesCartSlice";
import { useDispatch, useSelector } from "react-redux";

const FreebiesCart = () => {
  const dispatch = useDispatch();

  const { freebiescartItems } = useSelector((state) => state.freebies);

  useEffect(() => {
    dispatch(getfreebiesCartProducts());

    dispatch(getfreebiesTotalAmount());
  }, [dispatch]);

  return (
    <>
      <div className="row">
        {freebiescartItems.map((e, index) => (
          <div className="col-2" key={e.id}>
            <div
              className="card small-card"
              style={{ marginTop: "1rem", marginBottom: "1rem" }}
            >
              <div>
                <i
                  className="bi bi-x-lg"
                  style={{
                    position: "absolute",
                    marginLeft: "85%",
                    paddingRight: "0.5rem",
                    fontWeight: "bolder",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    dispatch(removefreebiesCartItem(e.id));
                    dispatch(getfreebiesTotalAmount());
                  }}
                ></i>
              </div>

              <div className="card-body">
                <img
                  src={e.image}
                  className="freebie-img"
                  alt="savlon-mask-pack-of-1-grey-earloop-in-new1"
                  width="100px"
                  height="auto"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default FreebiesCart;
