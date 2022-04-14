import { cartActions } from "./cart-slice";
import { uiActions } from "./ui-slice";

export const fetchData = () => {
  return async (dispatch) => {
    const fetchHandler = async () => {
      const res = await fetch(
        "https://redux-http-1c527-default-rtdb.firebaseio.com/cartitems.json"
      );

      const data = await res.json();

      return data;
    };
    try {
      const cartData = await fetchHandler();
      dispatch(cartActions.replaceData(cartData));
    } catch (err) {
      dispatch(
        uiActions.showNotification({
          open: true,
          message: "Request fetching data fail",
          type: "error",
        })
      );
    }
  };
};

export const sendCartData = (cart) => {
  return async (dispatch) => {
    // Send state as Sending request
    dispatch(
      uiActions.showNotification({
        open: true,
        message: "Sending request ",
        type: "warning",
      })
    );
    const sendRequest = async () => {
      const res = await fetch(
        "https://redux-http-1c527-default-rtdb.firebaseio.com/cartitems.json",
        {
          method: "PUT",
          body: JSON.stringify(cart),
        }
      );

      // Send state as Request is successful
      const data = await res.json();
      dispatch(
        uiActions.showNotification({
          open: true,
          message: "Sent request to database successfully ",
          type: "success",
        })
      );
    };
    try {
      await sendRequest();
    } catch (err) {
      // send state as Error
      dispatch(
        uiActions.showNotification({
          open: true,
          message: "Sending request fail",
          type: "error",
        })
      );
    }
  };
};
