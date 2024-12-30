import React ,{useEffect} from 'react'
import { useNavigate } from 'react-router-dom'

const Logout = () => {
    const navigate = useNavigate();

    useEffect(()=>{
        const performLogout = async () =>{
            try{
                await fetch('/api/logout', {
                    method:'POST',
                    credentials:'include',
                    headers:{
                        'Content-Type': 'application/json',
                    },
                });

                localStorage.removeItem('authToken');
                sessionStorage.removeItem('authToken');

                navigate('/');
            }   catch(error) {
                console.error('Error during logout:', error);
            } 
        };
        performLogout();
    
    }, [navigate]);
  return (
    <div>
        <p>Logging out...</p>
    </div>
    
  );
};

export default Logout;