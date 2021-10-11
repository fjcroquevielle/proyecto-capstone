import { Component } from "react";
import { HomeHeader } from "../components";
import { Button } from "../components/Button";
import "./styles/FreeDownloads.css";

class FreeDownload extends Component{

    downloadPlugin(){
        console.log(process.env.REACT_APP_STAGE);
        console.log(process.env.REACT_APP_API_URL);

        window.location.href = process.env.REACT_APP_API_URL + '/api/products/free-revit-plugin';
    }

    render(){
        return(
            <div className='main-content'>
                <HomeHeader showDownloadButton={false} signup={true} signin={true}/>
                <div className="downloads-content">
                    <div className="download-link">
                        <h2>
                            Free Revit Plugin
                        </h2>
                        <Button onClick={()=>this.downloadPlugin()}>
                            Download
                        </Button>
                    </div>
                    <div className="download-link">
                        <h2>
                            Free VR App
                        </h2>
                        <Button>
                            Download
                        </Button>
                    </div>
                </div>
            </div>
        )
    }
}

export {FreeDownload};