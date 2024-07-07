import swal from "sweetalert"
import { useEffect } from "react"

import { useParams , Navigate} from "react-router-dom"
const RegisterFinal = () => {
    const {status} = useParams()
    console.log(status)
    useEffect(() => {
        if(status === 'success'){
            swal("Register Success", "You have successfully registered", "success").then(()=>{
                window.location.href = '/login/:register'
            })
        } else if(status === 'failed'){
            swal("Register Failed", "Please try again", "error").then(()=>{
                window.location.href = '/login/reg'
            })
        }
    }, [])
    return (
        <div>
            
        </div>

    )
}

export default RegisterFinal