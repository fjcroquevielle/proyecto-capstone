import { Component } from "react";
import {HomeHeader} from "./../components";
import "./styles/Home.css";

class Home extends Component{
    render(){
        return(
            <div className='main-content'>
                <HomeHeader showDownloadButton={true} signup={true} signin={true}/>

                <div className="home-content">


                    <h2>
                        Home Page
                    </h2>
                    
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut iis bonis erigimur, quae expectamus, 
                        sic laetamur iis, quae recordamur. Quamquam id quidem, infinitum est in hac urbe; Terram, mihi crede, 
                        ea lanx et maria deprimet. Quam ob rem tandem, inquit, non satisfacit? Duo Reges: constructio interrete. 
                        Sed finge non solum callidum eum, qui aliquid improbe faciat, verum etiam praepotentem, 
                        ut M. 
                    </p>

                    <p>
                        Nulla profecto est, quin suam vim retineat a primo ad extremum. 
                        Non est ista, inquam, Piso, magna dissensio. At enim hic etiam dolore. 
                        Dicet pro me ipsa virtus nec dubitabit isti vestro beato M. Quid enim de amicitia statueris utilitatis causa expetenda vides. 
                        </p>

                    <p>
                        Quid enim possumus hoc agere divinius? Iam id ipsum absurdum, maximum malum neglegi. 
                        Quorum sine causa fieri nihil putandum est. An est aliquid, quod te sua sponte delectet? Obsecro, inquit, Torquate, haec dicit Epicurus? 
                    </p>

                </div>

             </div>
        )
    }
}

export {Home};