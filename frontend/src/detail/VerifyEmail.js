import React, { useEffect } from 'react'
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

function VerifyEmail() {
    const navigate = useNavigate()
    const urlLocation = useLocation()
    const queryParams = new URLSearchParams(urlLocation.search)
    const expires = queryParams.get('expires')
    const signature = queryParams.get('signature')
    const { id, hash } = useParams()
    
    useEffect(() => {
        const verifyemail = () => {
            axios({
                method:'get',
                url: `http://localhost/Allend/backend/public/verifyemail/${id}/${hash}`,
                params: { expires, signature },
                headers: { Authorization: `Bearer ${Cookies.get('token')}`}
            }).then((res) => {
                if(res.status === 200){
                    navigate('/switch')
                }
            }).catch((err) => {
                console.log(err)
                // if(err.response.status === 401 || 400){
                //     navigate('/')
                // }
            })
        }

        verifyemail()
    }, [])

  return (
    <div>處理中...</div>
  )
}

export default VerifyEmail;