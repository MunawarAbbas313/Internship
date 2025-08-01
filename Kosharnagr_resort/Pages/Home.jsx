
import About from "../Components/About";
import Hero from "../Components/Hero";
import Navbar from "../Components/Navrbar";
import Resort from "../Components/Resort";
import Location from "../Components/Location"
import Review from "../Components/Review"
import Footer from "../Components/Footer"



function Home(){
    return(
        <div className="overflow-hidden"> 
        <div className=" relative">
            <Navbar/>
             <Hero/>
           
        </div>
        <div className="mt-12">
              <About/> 
              <Resort/>
              <Location/>
              <Review/>
              <Footer/>
              
        </div>
         
        </div>
    )
}
export default Home;
