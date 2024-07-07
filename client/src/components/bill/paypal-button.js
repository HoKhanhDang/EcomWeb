import {
    PayPalScriptProvider,
    PayPalButtons,
    usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import { useEffect,useState ,useRef } from "react";
import swal from "sweetalert";
import { apiCreateOrders } from "../../apis/orderApi";
import { useNavigate } from "react-router-dom";

const initialOptions = {
    clientId: "test",
    currency: "USD",
    components: "buttons",
};

const style = {
    layout: "vertical",
    width: 200,
};

function useDelayedFunction(initialValue = "", delay = 500, callback) {
    const [value, setValue] = useState(initialValue);
    const callbackRef = useRef(callback);

    useEffect(() => {
        callbackRef.current = callback;
    }, [callback]);

    useEffect(() => {
        const handler = setTimeout(() => {
            callbackRef.current(value);
        }, delay);

        return () => clearTimeout(handler);
    }, [value, delay]);

    return [value, setValue];
}

const ButtonWrapper = ({
    address,
    note,
    amount,
    currency,
    showSpinner,
    payload,
}) => {
  
    const [{ isPending, options }, dispatch] = usePayPalScriptReducer();
    const action = {
        type: "resetOptions",
        value: {
            ...options,
            currency: currency,
        },
    };

    const [isDisabled, setIsDisabled] = useState(true);
    const [addressBill, setAddressBill] = useDelayedFunction('', 500, (currentValue) => {
        dispatch(action);
    });
    const [noteBill, setNoteBill] = useDelayedFunction('', 500, (currentValue) => {
        dispatch(action);
    });
    
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(action);
    }, [currency, showSpinner]);

    useEffect(() => {
        if (address || address.trim() !== "") {
            setAddressBill(address);
            setIsDisabled(false);
        } else {
            setIsDisabled(true);
        }
    }, [address]);
    useEffect(() => {
        setNoteBill(note);
    }, [note]);

    const createOrder = (data, actions) => {
        return actions.order
            .create({
                purchase_units: [
                    {
                        amount: {
                            value: amount,
                            currency_code: currency,
                        },
                    },
                ],
            })
            .then((orderID) => {
                return orderID;
            });
    };
    const onApprove = (data, actions) => {
        return actions.order.capture().then(async (response) => {
            console.log("response", response);

            const data = {
                product: payload,
                status: "Success",
                totalPrice: amount,
                address: addressBill,
                note: noteBill,
            };
            console.log("data", data);

            const rs = await apiCreateOrders(data);
            swal(
                "Payment Successful",
                "Thank you for your purchase",
                "success"
            ).then(() => {
                navigate("/cart");
            });
        });
    };
    return (
        <>
            {isPending ? <div className="spinner" /> : null}
            <PayPalButtons
                className=" h-[150px] w-full "
                style={style}
                disabled={isDisabled}
                forceReRender={[style, currency, amount]}
                fundingSource=""
                createOrder={createOrder}
                onApprove={onApprove}
            />
        </>
    );
};
export default function PayPalButton({
    address,
    note,
    currency,
    amount,
    payload,
}) {
    return (
        <PayPalScriptProvider deferLoading={true} options={initialOptions}>
            <ButtonWrapper
                address={address}
                note={note}
                currency={currency}
                amount={amount}
                payload={payload}
            />
        </PayPalScriptProvider>
    );
}
