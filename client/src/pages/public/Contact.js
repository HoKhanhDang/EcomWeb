import Header from "../../components/commons/header";
import Navbar from "../../components/commons/navbar";
import Sidebar from "../../components/commons/sidebar";
import Footer from "../../components/commons/footer";
import { toast, ToastContainer } from 'react-toastify';

const Contact = () => {
    return (
        <div class="w-full flex justify-center flex-col font-Contact font-main">    
            <div className="w-full flex justify-center px-[10%] flex-col mt-[35px]">
                <Header/>
                <Navbar/>
                <Sidebar/>
   
            </div>
            <Footer/>   
            <ToastContainer />
        </div>
    );
}

export default Contact;