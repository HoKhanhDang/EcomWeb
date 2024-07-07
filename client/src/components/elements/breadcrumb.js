import useBreadcrumbs from "use-react-router-breadcrumbs";
import { NavLink } from "react-router-dom";
import { IoChevronForwardOutline } from "react-icons/io5";

export default function Breadcrumb({ category, title }) {
    const routes = [
        { path: "/:category", breadcrumb: category },
        { path: "/", breadcrumb: "Home" },
        {
            path: "/:category/:pid/:title",
            breadcrumb: title,
        },
    ];
    const breadcrumbs = useBreadcrumbs(routes);
    return (
        <div className=" flex flex-row justify-start items-center py-3 my-3">
            {breadcrumbs
                ?.filter((el) => !el.match.route === false)
                .map(({ match, breadcrumb }, index) => (
                    <>
                        <NavLink
                            key={match.pathname}
                            to={match.pathname}
                            className=" hover:text-main-100"
                        >
                            {breadcrumb}
                        </NavLink>
                        {index < breadcrumbs.length - 2 && (
                            <IoChevronForwardOutline className="h-full text-[15px] pt-1 mx-2"/>
                        )}
                        {( breadcrumbs.length == 2 && index < breadcrumbs.length - 1 ) && (
                            <IoChevronForwardOutline className="h-full text-[15px] pt-1 mx-2"/>
                        )}
                    </>
                ))}
        </div>
    );
}
