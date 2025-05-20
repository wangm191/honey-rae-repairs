import "./Welcome.css"
import beeImg from "../img/bee.jpg"
import honeyImg from "../img/honey.png"

export const Welcome = () => {
    return (
        <div>
            <div className="welcome-container">
                <img className="welcome-img-bee" src={beeImg} alt="bee"/>
                <h1>
                    <span>Welcome to</span>
                    <span>Honey Rae's Repair Shop</span>
                </h1>
                <div>Your one-stop-shop to get all your electronics fixed</div>
            </div>
            <img className="welcome-img-honey" src={honeyImg} alt="honey"/>
        </div>
    )
}