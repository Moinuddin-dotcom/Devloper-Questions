import React from 'react'
import RegisterInputs from './components/registerInputs'
import SocialLoginReg from '../components/SocialLoginReg'

export default function RegisterPage() {
    return (
        <div>
            <RegisterInputs />
            <div className="divider divider-accent">Social Logins</div>
            <SocialLoginReg />
        </div>
    )
}
