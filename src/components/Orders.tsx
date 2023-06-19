import { Box, Button } from "@mui/material";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  ShoppingCart,
  completedOrdersAtom,
  currencyAtom,
  ordersAtom,
  productsAtom,
  shoppingCartAtom,
  userIdAtom,
} from "../state/atom";
import { Delete } from "@mui/icons-material";
import { currencyConverter } from "../utils/currencyConverter";
import { toast } from "react-toastify";
import axios from "axios";
import { useOrders } from "../hooks/useOrders";

function Orders() {
  const [shoppingCart, setShoppingCart] = useRecoilState(shoppingCartAtom);
  const currency = useRecoilValue(currencyAtom);
  const [orders, setOrders] = useRecoilState(ordersAtom);
  const userId = useRecoilValue(userIdAtom);
  const { refetch } = useOrders();

  const completedOrders = useRecoilValue(completedOrdersAtom);
  if (shoppingCart.length === 0 && orders.length === 0 && completedOrders.length === 0)
    return <h1 className="text-center text-2xl">Nothing here</h1>;
  const handleCreateOrder = () => {
    setOrders((prev) => [
      ...prev,
      {
        products: shoppingCart,
        date: new Date(),
        total: +currencyConverter(
          currency,
          shoppingCart.reduce((acc, curr) => acc + curr.price * curr.quantity, 0) * 1.15
        ).slice(1),
        id: Math.floor(Math.random() * 100000),
        status: "active",
      },
    ]);
    toast.success("Order created");
    setShoppingCart([]);
  };

  const handleCompleteOrder = async (id: number) => {
    const order = orders.find((order) => order.id === id);
    if (!order) return;
    order.status = "completed";
    try {
      await axios.post("http://localhost:3000/orders", {
        userId: userId,
        products: order.products,
        total: order.total,
      });
    } catch (err) {
      console.log(err);
    }
    toast.success("Order completed, you paid " + order.total + " " + currency);
    refetch();
    setOrders(orders.filter((order) => order.id !== id));
  };

  const handleCancelOrder = (id: number) => {
    setOrders(orders.filter((order) => order.id !== id));
    toast.error("Order canceled");
  };

  return (
    <div className="flex flex-col w-full">
      <Box className="flex flex-col border h-full w-full p-2 gap-y-5">
        {/* COMPLETED ORDERS */}
        {completedOrders?.length ? (
          <div className="flex flex-col justify-between p-2 bg-gray-100 opacity-50 gap-y-2 rounded-xl">
            <p className="text-2xl">Completed orders:</p>
            {completedOrders.map((order) => (
              <div className="flex flex-col gap-y-2">
                {order.products.map((product) => (
                  <div className="flex justify-between border-b p-2">
                    <p className="text-lg">
                      {product.quantity} x {product.title}
                    </p>
                    <p className="text-lg">
                      {currencyConverter(currency, product.price * product.quantity)} {currency}
                    </p>
                  </div>
                ))}
                <div className="flex justify-between"></div>
                <p>Order id: {order._id}</p>
                <p className="text-lg font-bold">Total + (TAX 15%)</p>
                <p className="text-lg self-end font-bold">{currencyConverter(currency, order.total)}</p>
              </div>
            ))}
          </div>
        ) : null}
        {/* PREVIOUS ORDERS */}
        {orders.length ? (
          <div className="flex flex-col justify-between p-2 bg-white gap-y-2 rounded-xl">
            <p className="text-lg">Previous orders:</p>
            {orders.map((order) => (
              <div className="flex flex-col gap-y-2">
                <p className="text-lg mt-2">Created: {order.date.toLocaleDateString()}</p>
                {order.products.map((product) => (
                  <div className="flex justify-between border-b p-2">
                    <p className="text-lg">
                      {product.quantity} x {product.title}
                    </p>
                    <p className="text-lg">{currencyConverter(currency, product.price * product.quantity)}</p>
                  </div>
                ))}
                <div className="flex justify-between"></div>
                <p className="text-lg">Total + (TAX 15%)</p>
                <p className="text-lg self-end">
                  {order.total} {currency}
                </p>
                <div className="self-end">
                  <Button
                    style={{ backgroundColor: "red", color: "white" }}
                    onClick={() => handleCancelOrder(order.id)}
                  >
                    Cancel Order
                  </Button>
                  <Button style={{ marginLeft: "auto" }} onClick={() => handleCompleteOrder(order.id)}>
                    Complete order
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : null}
        {shoppingCart.map((product) => (
          <Order key={product.id} {...product} />
        ))}
      </Box>
      {orders.length ? (
        <div className="flex justify-between border p-2 mt-5">
          <p className="text-lg">Total + (TAX 15%):</p>
          <p className="text-lg">
            {currencyConverter(
              currency,
              shoppingCart.reduce((acc, curr) => acc + curr.price * curr.quantity, 0) * 1.15
            )}
          </p>
        </div>
      ) : null}
      {orders.length ? (
        <Button
          className="border border-black p-2 ml-auto mr-5 mt-4 rounded-lg bg-green-500"
          style={{ marginLeft: "auto", marginRight: "2%", marginTop: "1%", backgroundColor: "#4caf50", color: "white" }}
          onClick={handleCreateOrder}
        >
          Create order
        </Button>
      ) : null}
    </div>
  );
}

const Order = ({ id, quantity }: ShoppingCart) => {
  const products = useRecoilValue(productsAtom);
  const data = products.find((product) => product.id === id);
  const setShoppingCart = useSetRecoilState(shoppingCartAtom);
  const handleClearItem = (id: number) => {
    setShoppingCart((prev) => prev.filter((product) => product.id !== id));
  };
  return (
    <div className="grid grid-flow-col border w-full items-center py-4 bg-white rounded-lg">
      <img src={data?.image} alt="product image" className="w-[100px] h-[100px] object-contain" />
      <p className="text-lg">{data?.title}</p>
      <div className="flex gap-x-4 justify-self-end mr-3">
        <Button style={{ color: "red", borderRadius: "10px" }} onClick={() => handleClearItem(id)}>
          <Delete />
        </Button>
        <p className="text-center border p-4 rounded-xl">{quantity}</p>
      </div>
    </div>
  );
};
export default Orders;
