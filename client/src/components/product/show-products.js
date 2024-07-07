//contantsFilter: filter by color, price, sort by
import { contantsFilter, contantsSort } from "ultils/contants";
import { createUltimatePagination } from "react-ultimate-pagination";

import ProductCard from "./product-card";
import { useState, useEffect } from "react";
import {
    Link,
    useParams,
    useSearchParams,
    useNavigate,
    createSearchParams,
} from "react-router-dom";
import { apiGetProduct, apiGetAllProduct } from "../../apis/productApi";
import Select from "react-select";
import Breadcrumb from "../elements/breadcrumb";

const Button = ({ value, isActive, disabled, onClick }) => (
    <button
        style={isActive ? { fontWeight: "bold" } : null}
        onClick={onClick}
        disabled={disabled}
        className="w-[75px] h-[50px] border hover:text-main-100 mx-1"
    >
        {value}
    </button>
);

export default function ShowProducts() {
    const [products, setProducts] = useState([]);
    const [isNone, setIsNone] = useState(false);

    const { category } = useParams();

    const [params] = useSearchParams();
    const navigate = useNavigate();

    const [selectedSort, setSelectedSort] = useState([]);
    const [selectedColorOption, setSelectedColorOption] = useState([]);
    const [selectedPriceOption, setSelectedPriceOption] = useState([]);
    const [selectedBrandOption, setSelectedBrandOption] = useState([]);

    //paging
    const limitPage = 8; // SET LIMIT PAGE HERE
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(10);

    const PaginatedPage = createUltimatePagination({
        itemTypeToComponent: {
            PAGE: Button,
            ELLIPSIS: () => <Button value="..." />,
            FIRST_PAGE_LINK: () => (
                <Button value="First" onClick={() => setCurrentPage(1)} />
            ),

            PREVIOUS_PAGE_LINK: () => (
                <Button
                    value="<"
                    onClick={() => {
                        if (currentPage > 1) {
                            setCurrentPage(currentPage - 1);
                        }
                    }}
                />
            ),
            NEXT_PAGE_LINK: () => (
                <Button
                    value=">"
                    onClick={() => {
                        if (currentPage < totalPages) {
                            setCurrentPage(currentPage + 1);
                        }
                    }}
                />
            ),

            LAST_PAGE_LINK: () => (
                <Button
                    value="Last"
                    onClick={() => setCurrentPage(totalPages)}
                />
            ),
        },
    });

    useEffect(() => {
        setSelectedSort(params.get("sort"));
        setSelectedBrandOption(params.get("brand"));
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        setCurrentPage(1);
        setTotalPages(10);
        fetchData();
    }, [params, category]);

    const fetchData = async () => {
        if (category === "all") {
            const rs = await apiGetProduct({
                brand: params.getAll("brand"),
                color: params.getAll("color"),
                "price[gte]": params.get("price[gte]"),
                "price[lte]": params.get("price[lte]"),
                sort: params.get("sort"),
            });

            const length = rs.data.res.length;
            if (length == 0) {
                setIsNone(true);
                setTotalPages(1);
                return;
            } else {
                setTotalPages(Math.ceil(parseFloat(length / limitPage)));
                const paging = await apiGetProduct({
                    page: currentPage,
                    limit: limitPage,
                    brand: params.getAll("brand"),
                    color: params.getAll("color"),
                    "price[gte]": params.get("price[gte]"),
                    "price[lte]": params.get("price[lte]"),
                    sort: params.get("sort"),
                });

                setProducts(paging.data.res);
                setIsNone(false);
            }
        } else {
            const rs = await apiGetProduct({
                category: category,
                brand: params.getAll("brand"),
                color: params.getAll("color"),
                "price[gte]": params.get("price[gte]"),
                "price[lte]": params.get("price[lte]"),
                sort: params.get("sort"),
            });
            const length = rs.data.res.length;
            if (length == 0) {
                setIsNone(true);
                setTotalPages(Math.ceil(parseFloat(length / limitPage)) || 1);

                return;
            } else {
                setTotalPages(Math.ceil(parseFloat(length / limitPage)));
                const paging = await apiGetProduct({
                    page: currentPage,
                    limit: limitPage,
                    category: category,
                    brand: params.getAll("brand"),
                    color: params.getAll("color"),
                    "price[gte]": params.get("price[gte]"),
                    "price[lte]": params.get("price[lte]"),
                    sort: params.get("sort"),
                });
                setProducts(paging.data.res);
                setIsNone(false);
            }
        }
    };

    useEffect(() => {
        fetchData();
    }, [currentPage]);

    //color
    useEffect(() => {
        if (selectedColorOption.length > 0) {
            params.delete("color");
            selectedColorOption.map((item) => {
                params.append("color", item.value);
            });

            navigate(`?${params.toString()}`);
        } else {
            params.delete("color");
            navigate(`?${params.toString()}`);
        }
    }, [selectedColorOption]);
    //brand
    useEffect(() => {
        if (selectedBrandOption) {
            params.delete("brand");
            params.append("brand", selectedBrandOption);

            navigate(`?${params.toString()}`);
        } else {
            params.delete("brand");
            navigate(`?${params.toString()}`);
        }
    }, [selectedBrandOption]);
    //price
    useEffect(() => {
        if (selectedPriceOption?.case == "1") {
            params.delete("price[gte]");
            params.delete("price[lte]");
            params.append("price[gte]", selectedPriceOption?.value1);
            params.append("price[lte]", selectedPriceOption?.value2);

            navigate(`?${params.toString()}`);
        } else if (
            selectedPriceOption?.case == "2" &&
            selectedPriceOption?.value1 > 1000000
        ) {
            params.delete("price[gte]");
            params.delete("price[lte]");
            params.append("price[gte]", selectedPriceOption?.value1);

            navigate(`?${params.toString()}`);
        } else if (
            selectedPriceOption?.case == "2" &&
            selectedPriceOption?.value1 <= 1000000
        ) {
            params.delete("price[gte]");
            params.delete("price[lte]");
            params.append("price[lte]", selectedPriceOption?.value1);

            navigate(`?${params.toString()}`);
        } else {
            params.delete("price[gte]");
            params.delete("price[lte]");

            navigate(`?${params.toString()}`);
        }
    }, [selectedPriceOption]);

    //sort
    useEffect(() => {
        if (selectedSort) {
            params.delete("sort");
            if (selectedSort.value === undefined) {
                params.append("sort", selectedSort);
                navigate(`?${params.toString()}`);
                return;
            } else {
                params.append("sort", selectedSort.value);
                navigate(`?${params.toString()}`);
            }
        } else {
            params.delete("sort");
            navigate(`?${params.toString()}`);
        }
    }, [selectedSort]);

    return (
        <div className="w-full h-auto ">
            <div className="w-full h-auto my-5">
                <Breadcrumb category={category} />
            </div>
            <div className="w-full h-auto my-[20px] border flex flex-col md:flex-row">
                <div className="flex flex-col justify-start items-center h-full w-full md:w-[70%]  px-5 py-3">
                    <span className=" w-full font-semibold">Filter by</span>
                    <div className="flex flex-row items-center justify-start w-full gap-2">
                        {contantsFilter.map((item, index) => {
                            return (
                                // <div className=" w-[100px] h-[50px] flex flex-row justify-between items-center border p-3">
                                //     <span>{item.name}</span>
                                //     <MdKeyboardArrowDown />
                                // </div>
                                <Select
                                    isClearable
                                    className={
                                        item.name === "Color"
                                            ? "w-auto"
                                            : "w-[250px]"
                                    }
                                    isMulti={
                                        item.name === "Color" ? true : false
                                    }
                                    onChange={
                                        item.name === "Color"
                                            ? (e) => setSelectedColorOption(e)
                                            : (e) => setSelectedPriceOption(e)
                                    }
                                    options={item.content}
                                    placeholder={item.name}
                                />
                            );
                        })}
                    </div>
                </div>
                <div className="flex flex-col justify-start items-center h-full w-full md:w-[30%]  px-5 p-3">
                    <span className=" w-full font-semibold">Sort by</span>
                    <Select
                        className="w-full"
                        isMulti={false}
                        isClearable={true}
                        onChange={(e) => setSelectedSort(e)}
                        options={contantsSort}
                        placeholder={"None"}
                    />
                </div>
            </div>
            {isNone ? (
                <div className="w-full h-[100px] flex justify-center items-center">
                    <span className="text-[20px]">No product found!</span>
                </div>
            ) : (
                <div className="w-full h-auto  grid grid-cols-2 md:grid-cols-4 gap-3">
                    {products.map((item, index) => {
                        return (
                            <Link
                                to={`/${item.category}/${item._id}/${item.title}`}
                                className="w-full"
                            >
                                <ProductCard
                                    key={index}
                                    product={item}
                                    isAction={true}
                                />
                            </Link>
                        );
                    })}
                </div>
            )}

            <div className="w-full h-[100px] flex justify-center items-center my-5">
                <PaginatedPage
                    totalPages={totalPages}
                    currentPage={currentPage}
                    onChange={(value) => setCurrentPage(value)}
                />
            </div>
        </div>
    );
}
