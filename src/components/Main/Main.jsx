import React from "react";
import './Main.css';
import { assets } from "../../assets/assets";

const Main = () => {
    return(
        <div className="main">
            <div className="nav">
                <p>Gemini</p>
                <img src = {assets.user_icon} alt = "" />
            </div>
            <div className="main-contianer">
                <div className="greet">
                    <p>
                        <span>Hello, Angad.</span>
                    </p>
                    <p>How can I help you today ?</p>
                </div>
                <div className="cards">
                    <div className="card">
                        <p>How to quit VIM</p>
                        <img src={assets.bulb_icon} alt=""/>
                    </div>
                    <div className="card">
                        <p>Debug this java code</p>
                        <img src={assets.code_icon} alt=""/>
                    </div>
                    <div className="card">
                        <p>I want to finish these 25 topics for tomorrow's exam, give me a plan</p>
                        <img src={assets.message_icon} alt=""/>
                    </div>
                    <div className="card">
                        <p>Suggest beautiful places to see on an upcoming road trip</p>
                        <img src={assets.compass_icon} alt=""/>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Main