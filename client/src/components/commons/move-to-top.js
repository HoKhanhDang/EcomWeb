import { MdOutlineArrowUpward } from "react-icons/md";
export default function MoveToTop() {
    return (
        <div className="fixed bottom-[20px] right-[20px] z-[1000] hover:jello-vertical">
            <a href="#" className="w-[50px] h-[50px] rounded-[50%] bg-main-100 text-white flex justify-center items-center">
                <MdOutlineArrowUpward className="text-[30px]"/>
            </a>
        </div>
    )
}