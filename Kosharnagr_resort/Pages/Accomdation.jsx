import AccomdationComp from "../Components/AccomdationComp";
import Footer from "../Components/Footer";
import Location from "../Components/Location";
import Navbar from "../Components/Navrbar";


function Accomodation(){
    return(
        <div>
           <Navbar/>
           <div className="mt-20">
            <AccomdationComp/>
           </div>
           <Location/>
           <Footer/>
        </div>
    )
}
export default Accomodation;
