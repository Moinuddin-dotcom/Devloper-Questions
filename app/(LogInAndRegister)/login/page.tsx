import SocialLoginReg from "../components/SocialLoginReg";
import LoginInputs from "./components/LoginInputs";


export default function LoginPage() {
    return (
        <div>
            <LoginInputs />
            <div className="divider divider-accent">Social Logins</div>
            <SocialLoginReg />
        </div>
    )
}
