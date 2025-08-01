import Footer from "../Components/Footer";
import GalleryData from "../Components/GalleryData";
import Navbar from "../Components/Navrbar";
import Review from "../Components/Review";


function Gallary(){
    return(
        <div className="overflow-hidden">
            <Navbar/>
           <div className="mt-28 ">
             <GalleryData/>
           </div>
            <Review />
            <Footer/>

        </div>
    )
}
export default Gallary;
