const OrderedItem = ({ item }) => {
    return (
        <div className="hover:border-main-100 w-full flex flex-col justify-start items-start md:flex-row md:justify-normal md:items-center text-[15px] p-2 border rounded">
            <div className=" w-full md:w-[40%] h-auto flex flex-col justify-start items-start">
                <div className="w-auto h-auto flex justify-start items-start">
                    <span className=" font-medium w-full">{item?.products.length >=2 ? "Orders:" : "Order:" }</span>
                </div>
                {item?.products.map((item, index) => {
                    console.log('item', item);

                    return (
                        <div key={index} className=" flex w-full flex-row justify-start items-center gap-5">
                            <div className="w-auto h-auto flex justify-start items-start">
                                <span className="w-full text-[12px] font-normal  rounded">
                                    {item?.product.title}
                                </span>
                            </div>
                            <div className="w-auto h-auto flex justify-start items-start">
                                <span className="w-full  font-normal  rounded">
                                    x{item?.quantity}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className=" w-full md:w-[20%] h-auto flex justify-start items-start">
                <div className="w-auto h-auto flex justify-start items-start pr-2">
                    <span className=" font-medium w-full">Date:</span>
                </div>
                <div className=" h-auto flex justify-start items-start">
                    <span className="w-full  font-normal  rounded">
                        {item?.createAt.split("T")[0]}
                    </span>
                </div>
            </div>
            <div className=" w-full md:w-[25%] h-auto flex justify-start items-start">
                <div className="w-auto h-auto flex justify-start items-start pr-2">
                    <span className=" font-medium w-full">Total Price:</span>
                </div>
                <div className=" h-auto flex justify-start items-start">
                    <span className="w-full  font-normal  rounded">
                        {Math.round(item?.totalPrice * 25415)} ₫
                    </span>
                </div>
            </div>
            <div className=" w-full md:w-[15%] h-auto flex justify-start items-start">
                <div className="w-auto h-auto flex justify-start items-start pr-2">
                    <span className=" font-medium w-full">Status:</span>
                </div>
                <div className=" h-auto flex justify-start items-start">
                    <span className="w-full  font-normal  rounded">
                        {item.status}
                    </span>
                </div>
            </div>
        </div>
    );
};
export default function OrderedAccount({ ordered }) {
    return (
        <div className="w-full h-auto flex justify-center items-center flex-col p-5 gap-5 font-main">
            <div className="w-full h-[50px] flex justify-start items-center">
                <span className="text-[25px] font-bold">My orders</span>
            </div>

            <div className="w-full h-auto flex flex-col justify-center items-center gap-5">
                {ordered.length === 0 ? (
                    <div className="w-full h-[50px] flex justify-center items-center text-[30px] font-light">
                        {" "}
                        You have no orders
                    </div>
                ) : (
                    <>
                        {ordered.map((item) => (
                            <OrderedItem item={item} />
                        ))}
                    </>
                )}
            </div>
        </div>
    );
}
