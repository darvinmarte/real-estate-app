import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Auth from '../utils/auth'


export default function Support() {

    const [amount, setAmount] = useState(0)
    const navigate = useNavigate()
    const handleChange = (event) => {
        setAmount(event.target.value)
    }
    const handleDonate = (event) => {
        event.preventDefault()
        const donation = { donorId: Auth.getProfile().data._id }
        localStorage.setItem('donation', JSON.stringify(donation))
        navigate('/checkout', { state: { amount } })
    }

    return (
        <div>
            <form>
                <input type='number' value={amount} name="amount" onChange={handleChange} />
                <button onClick={handleDonate}>Donate!</button>
            </form>
        </div>
    )
    }