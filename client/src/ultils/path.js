import { Bill } from "pages/public";

const path = {
    HOME: '',
    LOGIN: 'login/:register',
    PUBLIC: '/',
    BLOG: 'blog',
    CONTACT: 'contact',
    PRODUCT: ':category',
    PRODUCT_DETAIL: ':category/:pid/:title',
    FAQ: 'faq',
    REGISTER_FINAL: 'registerFinal/:status',
    RESET_PASSWORD: 'resetPassword/:email',
    CART: 'cart',
    BILL: 'bill',
    PROFILE: 'profile',
    SEARCH: 'search',
    
};

export default path;