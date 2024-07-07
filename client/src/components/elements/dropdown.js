import { Link } from "react-router-dom";
import "./dropdown.css";
import { FaAngleDown } from "react-icons/fa";

export default function Dropdown(items) {
    return (
        <div class="dropdown pr-[30px] ">
            <div className="flex flex-row justify-center items-center">
                <p class="text-[15px] pr-2">{items.item.name}</p>
                {items?.item.isDropdown && <FaAngleDown />}
            </div>
            {items?.item.isDropdown && items?.item.name === "CATEGORIES" && (
                <div class="dropdown-content">
                    {items?.item.items?.map((item, index) => {
    
                        return (
                            <Link key={index} to={`/${item.path}`}>
                                {item.name}
                            </Link>
                        );
                    })}
                </div>
            )}

            {items?.item.isDropdown && items?.item.name === "COLLECTIONS" && (
                <div class="dropdown-content">
                    {items?.item.items?.map((item, index) => {
                        
                        return (
                            <Link key={index} to={`/all?sort=${item.value}`}>
                                {item.label}
                            </Link>
                        );
                    })}
                </div>
            )}
            {items?.item.isDropdown && items?.item.name === "BRANDS" && (
                <div className= {items.item.items.length > 5 ? "over-items": "dropdown-content "}>
                    {items?.item.items?.map((item, index) => {                   
                        return (
                            <Link key={index} to={`/all?brand=${item.value}`}>
                                {item.label}
                            </Link>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
