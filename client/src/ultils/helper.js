import { MdOutlineStarBorderPurple500 } from "react-icons/md";
import { MdOutlineStarHalf } from "react-icons/md";
import { MdOutlineStarPurple500 } from "react-icons/md";

export const createSlug = (title) => {
    return title
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g)
        .split(" ")
        .join("-");
};

export const RenderStar = ({ totalRating, isBig }) => {
    let stars = [];
    for (let i = 1; i <= 5; i++) {
        if (i <= totalRating) {
            stars.push(
                <MdOutlineStarPurple500
                    class={
                        isBig
                            ? "text-yellow-300 text-[30px]"
                            : "text-yellow-300"
                    }
                />
            );
        } else {
            stars.push(
                <MdOutlineStarBorderPurple500
                    className={
                        isBig
                            ? "text-yellow-300 text-[30px]"
                            : "text-yellow-300"
                    }
                />
            );
        }
    }
    if (totalRating % 1 !== 0) {
        stars[Math.floor(totalRating)] = (
            <MdOutlineStarHalf
                className={
                    isBig ? "text-yellow-300 text-[30px]" : "text-yellow-300"
                }
            />
        );
    }

    return stars;
};

export const ConvertPrice = (price) => {
    const priceStr = price.toString();
    const reversed = priceStr.split("").reverse().join("");
    const withDots = reversed.replace(/(\d{3})(?=\d)/g, "$1.");
    return withDots.split("").reverse().join("");
};
