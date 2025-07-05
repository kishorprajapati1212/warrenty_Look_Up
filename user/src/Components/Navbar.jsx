import { useEffect, useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const [isLogin, setIsLogin] = useState(false);
    const [email, setEmail] = useState(null);
    const Backend_url = import.meta.env.VITE_BACKEND_URL
    const navigate = useNavigate();

    const fetchdata = async ({ email, tokenResponse }) => {
        const res2 = await axios.post(`${Backend_url}/saveAuth`, {
            email: email,
        }, {
            headers: {
                Authorization: JSON.stringify(tokenResponse)
            }
        })
        console.log(res2.data)
    }

    const login = useGoogleLogin({
        scope: [
            "https://www.googleapis.com/auth/calendar",
            "https://www.googleapis.com/auth/userinfo.email"
        ].join(" "),
        onSuccess: async (tokenResponse) => {
            const res = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
                headers: {
                    Authorization: `Bearer ${tokenResponse.access_token}`,
                },
            });
            const email = res.data.email;
            fetchdata({ email, tokenResponse })

            // console.log("Logged in as:", email);

            localStorage.setItem("email", email);
            setIsLogin(true);
            setEmail(email);
        },
        onError: () => console.log("Login Failed"),
    });

    useEffect(() => {
        const storedEmail = localStorage.getItem("email");
        if (storedEmail) {
            setIsLogin(true);
            setEmail(storedEmail);
        }
    }, []);

    const handleClick = () => {
        if (isLogin) {
            localStorage.removeItem("email");
            setIsLogin(false);
            setEmail(null);
        } else {
            login();
        }
    };

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '12px 24px',
            margin: '20px',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderRadius: '16px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.8)',
            color: '#F2F2F2',
            border: '1px solid rgba(255, 255, 255, 0.15)',
        }}>

            <div style={{ fontWeight: 'bold', fontSize: '18px', cursor: "pointer" }} onClick={() => navigate('/')}>WO-FO</div>
            <div >
                
                    {isLogin && <button
                    onClick= {() => navigate("/dashboard")}
                    style={{
                        padding: '8px 16px', backgroundColor: '#F2F2F2', color: '#0D0D0D', border: 'none', borderRadius: '8px',
                        fontWeight: 'bold', cursor: 'pointer', transition: 'background 0.3s ease',margin:"0px 10px"
                    }}
                >Dashboard 
                </button>
                }
                <button
                    onClick={handleClick}
                    style={{
                        padding: '8px 16px', backgroundColor: '#F2F2F2', color: '#0D0D0D', border: 'none', borderRadius: '8px',
                        fontWeight: 'bold', cursor: 'pointer', transition: 'background 0.3s ease'
                    }}
                >
                    {isLogin ? "Logout" : "Login"}
                </button>
            </div>
        </div>

    );
};

export default Navbar;
