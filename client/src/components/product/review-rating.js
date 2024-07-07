import { RenderStar } from "ultils/helper";
import { IoSend } from "react-icons/io5";

import { useState, useEffect } from "react";
import ProgressBarCustom from "../elements/progress-bar";
import ScrollableFeed from "react-scrollable-feed";
import { useNavigate ,useParams} from "react-router-dom";

import { MdOutlineStarBorderPurple500 } from "react-icons/md";
import { MdOutlineStarHalf } from "react-icons/md";
import { MdOutlineStarPurple500 } from "react-icons/md";
import { Link } from "react-router-dom"; 
import path from "ultils/path";
import { apiRatingProduct } from "../../apis/productApi";
import swal from "sweetalert";
 
export default function Review({ product }) {

    const localStorage = window.localStorage.getItem("persist:shop/user");
    const { token, isLogin, current } = JSON.parse(localStorage);

    const [oneStar, setOneStar] = useState(0);
    const [twoStar, setTwoStar] = useState(0);
    const [threeStar, setThreeStar] = useState(0);
    const [fourStar, setFourStar] = useState(0);
    const [fiveStar, setFiveStar] = useState(0);

    const [ratingStar, setRatingStar] = useState(0);
    const [comment, setComment] = useState("");

    useEffect(() => {
        let starArrayOrigin = [0, 0, 0, 0, 0, 0];
        let newFinalStarArray = [0, 0, 0, 0, 0, 0];
        product?.rating.map((item) => {
            starArrayOrigin[item.star] += 1;
        });
        const totalRatings = product?.rating.length || 1;
        for (let i = 0; i <= 5; i++) {
            newFinalStarArray[i] = (starArrayOrigin[i] / totalRatings) * 100;
        }

        setOneStar(newFinalStarArray[1]);
        setTwoStar(newFinalStarArray[2]);
        setThreeStar(newFinalStarArray[3]);
        setFourStar(newFinalStarArray[4]);
        setFiveStar(newFinalStarArray[5]);
    }, []);

    const handleSubmit = async () =>{
        if (comment === ""){
            swal("Oops", "Please input your comment", "warning")
            return;
        }

        const response = await apiRatingProduct({star: ratingStar === 0 ?  5 : ratingStar , comment: comment, pid: product._id })
        if (response) {
            window.location.reload();
            setComment('')
            setRatingStar(0);
        }
       
    }

    return (
        <div className="flex flex-col md:flex-row justify-between items-center w-full h-auto md:h-[600px] mt-5">
            <div className="flex flex-col p-3 justify-center items-center w-full md:w-[40%] h-full border-[1px] border-main-100">
                {/* //star bar */}
                <div className="flex flex-col justify-start items-center w-auto gap-3">
                    <span className=" font-bold text-[60px] text-amber-400">
                        {product?.totalRating} / 5
                    </span>
                    <div className="flex flex-row w-full items-center gap-3">
                        <div className="flex flex-row justify-start items-center">
                            <RenderStar
                                totalRating={product?.totalRating}
                                isBig={true}
                            />
                        </div>
                        <div className="flex flex-row justify-start items-center w-auto">
                            {product?.rating.length} ratings
                        </div>
                    </div>
                </div>
                {/* //rating bar */}
                <div className="flex flex-col justify-center items-center w-full gap-3 py-3 text-[15px] font-semibold">
                    <ProgressBarCustom star={5} percent={fiveStar} />
                    <ProgressBarCustom star={4} percent={fourStar} />
                    <ProgressBarCustom star={3} percent={threeStar} />
                    <ProgressBarCustom star={2} percent={twoStar} />
                    <ProgressBarCustom star={1} percent={oneStar} />
                </div>
            </div>

            <div className="flex flex-col justify-start items-start w-full md:w-[60%] h-full  md:px-[30px]">
                <div className="flex flex-col justify-start items-start w-full h-[70%] ">
                    <span className="h-[10%] text-[30px] font-semibold w-full">
                        Comments
                    </span>
                    {product?.rating.length == 0 ? (
                        <div className="w-full h-[90%] flex justify-center items-center text-[20px] opacity-50">
                            <span>This product have no comment! </span>
                        </div>
                    ) : (
                        <div style={{ height: "90%" }} className=" w-full">
                            <ScrollableFeed className="scrollCustom">
                                {product?.rating.map((item) => (
                                    <>
                                        <div className="rounded-[5px] flex flex-col w-full h-auto justify-start items-start border shadow-md my-2 p-3 gap-1">
                                            <div className="flex flex-row">
                                                <RenderStar
                                                    totalRating={item?.star}
                                                    isBig={false}
                                                />
                                            </div>
                                            <span className=" opacity-50">
                                                {item?.postedBy?.firstName}{" "}
                                                {item?.postedBy?.lastName}
                                            </span>
                                            <span className=" text-[15px]">
                                                {item?.comment}{" "}
                                                {item?.createdAt}
                                            </span>
                                        </div>
                                    </>
                                ))}
                            </ScrollableFeed>
                        </div>
                    )}
                </div>

                {isLogin == "true" ? (
                    <div className="flex flex-col justify-center items-start w-full h-auto md:h-[30%] border px-5 gap-2 py-5">
                        <div className="flex flex-row justify-start items-center gap-5">
                            <span className=" font-semibold">Rate star</span>

                            <div className="flex flex-row justify-start items-center text-[30px] text-yellow-400">
                                {ratingStar >= 1 ? (
                                    <MdOutlineStarPurple500
                                        onClick={() => setRatingStar(1)}
                                    />
                                ) : (
                                    <MdOutlineStarBorderPurple500
                                        onClick={() => setRatingStar(1)}
                                    />
                                )}
                                {ratingStar >= 2 ? (
                                    <MdOutlineStarPurple500
                                        onClick={() => setRatingStar(2)}
                                    />
                                ) : (
                                    <MdOutlineStarBorderPurple500
                                        onClick={() => setRatingStar(2)}
                                    />
                                )}
                                {ratingStar >= 3 ? (
                                    <MdOutlineStarPurple500
                                        onClick={() => setRatingStar(3)}
                                    />
                                ) : (
                                    <MdOutlineStarBorderPurple500
                                        onClick={() => setRatingStar(3)}
                                    />
                                )}
                                {ratingStar >= 4 ? (
                                    <MdOutlineStarPurple500
                                        onClick={() => setRatingStar(4)}
                                    />
                                ) : (
                                    <MdOutlineStarBorderPurple500
                                        onClick={() => setRatingStar(4)}
                                    />
                                )}
                                {ratingStar == 5 ? (
                                    <MdOutlineStarPurple500
                                        onClick={() => setRatingStar(5)}
                                    />
                                ) : (
                                    <MdOutlineStarBorderPurple500
                                        onClick={() => setRatingStar(5)}
                                    />
                                )}
                            </div>
                        </div>

                        <span className=" font-semibold">Comment</span>
                        <div className="flex flex-row justify-between items-center w-full h-1/3 gap-3 ">
                            <input
                                value={comment}
                                onChange={(e) => {setComment(e.target.value)}}
                                type="text"
                                className=" w-[90%] h-full px-[40px] border border-gray-400 rounded-[10px]"
                            />
                            <IoSend onClick={handleSubmit} className=" w-[10%] h-full hover:text-red-400 text-main-100"/>
                          
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col justify-center items-center w-full h-[30%] border px-5 text-main-100">
                        <Link to={`/${path.LOGIN}`}>
                            Login to leave a comment!
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
