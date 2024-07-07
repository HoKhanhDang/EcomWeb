
import ProgressBar from "@ramonak/react-progress-bar";
import { MdOutlineStarPurple500 } from "react-icons/md";

export default function ProgressBarCustom({percent, star}) {    
    return (
        <div className="flex flex-row justify-center items-center w-full">
            <span className=" w-[10%] flex flex-row items-center justify-center">
                {star} <MdOutlineStarPurple500 className=" text-black ml-1" />
            </span>
            <ProgressBar
                completed={percent}
                maxCompleted={100}
                borderRadius={1}
                isLabelVisible={false}
                bgColor="#FDE047"
                className=" w-[75%] px-3"
            />
            <span className="w-[15%]">{percent== 0 || percent ==100 ? percent: percent.toFixed(1) }%</span>
        </div>
    );
}
