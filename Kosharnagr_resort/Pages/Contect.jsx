import Footer from "../Components/Footer";
import Form from "../Components/Form";
import Location from "../Components/Location";
import Navbar from "../Components/Navrbar";

function Contect(){
    return(
        <div>

    <Navbar/>
    <div className="mt-20">
        <Form/>
    </div>
    <Location/>
    <Footer/>
        </div>
    )
}
export default Contect;
