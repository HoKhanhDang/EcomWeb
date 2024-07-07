import path from "./path";

export const thumbImages = [
    {
        id: 1,
        image: "https://cdn2.fptshop.com.vn/unsafe/1920x0/filters:quality(60)/desk_header_c58406ba2c.png",
    },
    {
        id: 2,
        image: "https://cdn2.fptshop.com.vn/unsafe/1920x0/filters:quality(60)/desk_header_27ba10ac0d.png",
    },
    {
        id: 3,
        image: "https://cdn2.fptshop.com.vn/unsafe/1920x0/filters:quality(60)/T1_1240x285_d068bd0588.png",
    }

]

export const brands = [
    {
        _id: "66857904deba086425e82ee9",
        label: "Logitech",
        value: "Logitech",
    },
    {
        _id: "66857904deba086425e82e92",
        label: "Google",
        value: "Google",
    },
    {
        _id: "66857904deba086425e82e8c",
        label: "HTC",
        value: "HTC",
    },
    {
        _id: "66857904deba086425e82e9f",
        label: "HP",
        value: "HP",
    },
    {
        _id: "66857904deba086425e82ea2",
        label: "Dell",
        value: "Dell",
    },
    {
        _id: "66857904deba086425e82e98",
        label: "Lenovo",
        value: "Lenovo",
    },
    {
        _id: "66857904deba086425e82eae",
        label: "Acer",
        value: "Acer",
    },
    {
        _id: "66857904deba086425e82eb1",
        label: "Xiaomi",
        value: "Xiaomi",
    },
    {
        _id: "66857904deba086425e82ebb",
        label: "Samsung",
        value: "Samsung",
    },
    {
        _id: "66857904deba086425e82ec0",
        label: "LG",
        value: "LG",
    },
    {
        _id: "66857904deba086425e82ec9",
        label: "Huawei",
        value: "Huawei",
    },
    {
        _id: "66857904deba086425e82ee0",
        label: "Sennheiser",
        value: "Sennheiser",
    },
    {
        _id: "66857904deba086425e82ee6",
        label: "Motorola",
        value: "Motorola",
    },
    {
        _id: "66857904deba086425e82eed",
        label: "JBL",
        value: "JBL",
    },
    {
        _id: "66857904deba086425e82ea5",
        label: "Asus",
        value: "Asus",
    },
    {
        _id: "66857904deba086425e82ef0",
        label: "Apple",
        value: "Apple",
    },
    {
        _id: "66857904deba086425e82e65",
        label: "Vivo",
        value: "Vivo",
    },
    {
        _id: "66857904deba086425e82e6c",
        label: "Sony",
        value: "Sony",
    },
];

export const contantsSort = [
    {
        id: 1,
        label: "Price: Low to High",
        value: "price",
    },
    {
        id: 2,
        label: "Price: High to Low",
        value: "-price",
    },
    {
        id: 3,
        label: "Newest",
        value: "-createdAt",
    },
    {
        id: 4,
        label: "Oldest",
        value: "createdAt",
    },
    {
        id: 5,
        label: "Best Selling",
        value: "-sold",
    },
];

export const contantsFilter = [
    {
        id: 1,
        name: "Price",
        key: "price",
        content: [
            {
                case: "2",
                value1: "1000000",
                key1: "price[lte]",
                value2: "1000000",
                key2: "price[lte]",
                label: "< 1.000.000 VND",
            },
            {
                case: "1",
                value1: "1000000",
                key1: "price[gte]",
                value2: "5000000",
                key2: "price[lte]",
                label: "1.000.000 - 5.000.000 VND",
            },
            {
                case: "1",
                value1: "5000000",
                key1: "price[gte]",
                value2: "10000000",
                key2: "price[lte]",
                label: "5.000.000 - 10.000.000 VND",
            },
            {
                case: "2",
                value1: "10000000",
                key1: "price[gte]",
                value2: "",
                key2: "price[]",
                label: "> 10.000.000 VND",
            },
        ],
    },
    {
        id: 2,
        name: "Color",
        key: "color",
        content: [
            { value: "Black", label: "Black" },
            { value: "White", label: "White" },
            { value: "Blue", label: "Blue" },
            { value: "Red", label: "Red" },
            { value: "Platinum", label: "Platinum" },
            { value: "Pink", label: "Pink" },
            { value: "Silver", label: "Silver" },
            { value: "Gold", label: "Gold" },
            { value: "Gray", label: "Gray" },
            { value: "Ceramic", label: "Ceramic" },
        ],
    },
];

export const contantsInformationProduct = [
    {
        id: 1,
        name: "Description",
        data: "It's been a while since we met the last of the Mi kind. Even though the Xiaomi Mi 4 went on sale back in the summer of 2014, it succeeded in staying relevant for over 20 months and surpassed the lifespan of many competitors. Xiaomi surely took the time to make the Mi 5 worthy of the flagship series name.",
    },
    {
        id: 2,
        name: "WARRANTY",
        data:
            "Limited Warranties are non-transferable. The following Limited Warranties are given to the original retail purchaser of the following Ashley Furniture Industries, Inc.Products:" +
            "\nFrames Used In Upholstered and Leather Products" +
            "\nLimited Lifetime Warranty" +
            "\nA Limited Lifetime Warranty applies to all frames used in sofas, couches, love seats, upholstered chairs, ottomans, sectionals, and sleepers. Ashley Furniture Industries,Inc. warrants these components to you, the original retail purchaser, to be free from material manufacturing defects",
    },
    {
        id: 3,
        name: "DELIVERY",
        data:
            "Before you make your purchase, it’s helpful to know the measurements of the area you plan to place the furniture. You should also measure any doorways and hallways through which the furniture will pass to get to its final destination" +
            "\n Shopify Shop requires that all products are properly inspected BEFORE you take it home to insure there are no surprises. Our team is happy to open all packages and will assist in the inspection process. We will then reseal packages for safe transport. We encourage all customers to bring furniture pads or blankets to protect the items during transport as well as rope or tie downs. Shopify Shop will not be responsible for damage that occurs after leaving the store or during transit. It is the purchaser’s responsibility to make sure the correct items are picked up and in good condition.Delivery" +
            "\n Customers are able to pick the next available delivery day that best fits their schedule. However, to route stops as efficiently as possible, Shopify Shop will provide the time frame. Customers will not be able to choose a time. You will be notified in advance of your scheduled time frame. Please make sure that a responsible adult (18 years or older) will be home at that time" +
            "\nIn preparation for your delivery, please remove existing furniture, pictures, mirrors, accessories, etc. to prevent damages. Also insure that the area where you would like your furniture placed is clear of any old furniture and any other items that may obstruct the passageway of the delivery team. Shopify Shop will deliver, assemble, and set-up your new furniture purchase and remove all packing materials from your home. Our delivery crews are not permitted to move your existing furniture or other household items. Delivery personnel will attempt to deliver the purchased items in a safe and controlled manner but will not attempt to place furniture if they feel it will result in damage to the product or your home. Delivery personnel are unable to remove doors, hoist furniture or carry furniture up more than 3 flights of stairs. An elevator must be available for deliveries to the 4th floor and above.",
    },
    {
        id: 4,
        name: "PAYMENT",
        data:
            "Before you make your purchase, it’s helpful to know the measurements of the area you plan to place the furniture. You should also measure any doorways and hallways through which the furniture will pass to get to its final destination" +
            "\n Shopify Shop requires that all products are properly inspected BEFORE you take it home to insure there are no surprises. Our team is happy to open all packages and will assist in the inspection process. We will then reseal packages for safe transport. We encourage all customers to bring furniture pads or blankets to protect the items during transport as well as rope or tie downs. Shopify Shop will not be responsible for damage that occurs after leaving the store or during transit. It is the purchaser’s responsibility to make sure the correct items are picked up and in good condition.Delivery" +
            "\n Customers are able to pick the next available delivery day that best fits their schedule. However, to route stops as efficiently as possible, Shopify Shop will provide the time frame. Customers will not be able to choose a time. You will be notified in advance of your scheduled time frame. Please make sure that a responsible adult (18 years or older) will be home at that time" +
            "\nIn preparation for your delivery, please remove existing furniture, pictures, mirrors, accessories, etc. to prevent damages. Also insure that the area where you would like your furniture placed is clear of any old furniture and any other items that may obstruct the passageway of the delivery team. Shopify Shop will deliver, assemble, and set-up your new furniture purchase and remove all packing materials from your home. Our delivery crews are not permitted to move your existing furniture or other household items. Delivery personnel will attempt to deliver the purchased items in a safe and controlled manner but will not attempt to place furniture if they feel it will result in damage to the product or your home. Delivery personnel are unable to remove doors, hoist furniture or carry furniture up more than 3 flights of stairs. An elevator must be available for deliveries to the 4th floor and above.",
    },
];

export const contantsNav = [
    {
        id: 1,
        name: "HOME",
        path: path.HOME,
        isDropdown: false,
    },
    {
        id: 2,
        name: "COLLECTIONS",
        isDropdown: true,
        items: [
            {
                id: 1,
                label: "Newest",
                value: "-createdAt",
            },
            {
                id: 2,
                label: "Oldest",
                value: "createdAt",
            },
            {
                id: 3,
                label: "Best Selling",
                value: "-sold",
            },
            {
                id: 4,
                label: "Rating",
                value: "-totalRating",
            },
        ],
    },
    {
        id: 9,
        name: "BRANDS",
        isDropdown: true,
        items: [
            {
                _id: "66857904deba086425e82ee9",
                label: "Logitech",
                value: "Logitech",
            },
            {
                _id: "66857904deba086425e82e92",
                label: "Google",
                value: "Google",
            },
            {
                _id: "66857904deba086425e82e8c",
                label: "HTC",
                value: "HTC",
            },
            {
                _id: "66857904deba086425e82e9f",
                label: "HP",
                value: "HP",
            },
            {
                _id: "66857904deba086425e82ea2",
                label: "Dell",
                value: "Dell",
            },
            {
                _id: "66857904deba086425e82e98",
                label: "Lenovo",
                value: "Lenovo",
            },
            {
                _id: "66857904deba086425e82eae",
                label: "Acer",
                value: "Acer",
            },
            {
                _id: "66857904deba086425e82eb1",
                label: "Xiaomi",
                value: "Xiaomi",
            },
            {
                _id: "66857904deba086425e82ebb",
                label: "Samsung",
                value: "Samsung",
            },
            {
                _id: "66857904deba086425e82ec0",
                label: "LG",
                value: "LG",
            },
            {
                _id: "66857904deba086425e82ec9",
                label: "Huawei",
                value: "Huawei",
            },
            {
                _id: "66857904deba086425e82ee0",
                label: "Sennheiser",
                value: "Sennheiser",
            },
            {
                _id: "66857904deba086425e82ee6",
                label: "Motorola",
                value: "Motorola",
            },
            {
                _id: "66857904deba086425e82eed",
                label: "JBL",
                value: "JBL",
            },
            {
                _id: "66857904deba086425e82ea5",
                label: "Asus",
                value: "Asus",
            },
            {
                _id: "66857904deba086425e82ef0",
                label: "Apple",
                value: "Apple",
            },
            {
                _id: "66857904deba086425e82e65",
                label: "Vivo",
                value: "Vivo",
            },
            {
                _id: "66857904deba086425e82e6c",
                label: "Sony",
                value: "Sony",
            },
        ],
    },
    {
        id: 3,
        name: "CATEGORIES",
        isDropdown: true,
        items: [
            {
                id: 1,
                name: "All Products",
                path: "all",
            },
            {
                id: 2,
                name: "Smartphone",
                path: "smartphone",
            },
            {
                id: 3,
                name: "Laptop",
                path: "laptop",
            },
            {
                id: 4,
                name: "Tablet",
                path: "tablet",
            },
            {
                id: 5,
                name: "Accessories",
                path: "accessories",
            },
        ],
    },
    {
        id: 4,
        name: "PHONE",
        path: "smartphone",
        isDropdown: false,
        slug: "phone",
    },
    {
        id: 5,
        name: "LAPTOP",
        path: "laptop",
        isDropdown: false,
        slug: "laptop",
    },
    {
        id: 6,
        name: "TABLET",
        path: "tablet",
        isDropdown: false,
        slug: "tablet",
    },
    {
        id: 7,
        path: "accessories",
        name: "ACCESSORIES",
        isDropdown: false,
        slug: "accessories",
    },
    {
        id: 8,
        name: "CONTACT",
        path: "contact",
        isDropdown: false,
    },
];
