import { useLocation } from "react-router-dom";

const Payment = () => {
    const location = useLocation();
    const { snap_token, total_amount, order_id } = location.state || {};

    if (!snap_token || !total_amount || !order_id) {
        return <div>Error: Invalid order data.</div>;
    }

    return (
        <div>
            <h1>Payment</h1>
            <p>Order ID: {order_id}</p>
            <p>Total Amount: {total_amount}</p>
            <p>Snap Token: {snap_token}</p>
            {/* Implement Midtrans payment gateway here */}
        </div>
    );
};

export default Payment;
