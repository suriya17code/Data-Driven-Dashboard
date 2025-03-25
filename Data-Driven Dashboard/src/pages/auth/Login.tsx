// // import { div, button, p } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// import LoginBgImg from '../assets/images/Loginimg.jpg';
// import microsoftIcon from '../assets/icons/logos_microsoft-icon.svg';
// import { useDispatch, useSelector } from 'react-redux';
// import { setAuthenticated } from '../redux/features/authslice';
// import { MSLoginServices, refreshServices } from '../services/login-services';
// import { useEffect, useState } from 'react';
// import { setAuthSession } from '../services/auth-service';
 
// export const Login = () => {
//   const navigate = useNavigate();
//   const [temp, setTemp] = useState<any>(null);
//   const [msg, setMsg ] = useState<any>("");


//   // const dispatch = useDispatch();
//   // const authenticated = useSelector((state:any) => state.auth.authenticated);
 
//   // const handleLogin = () => {
//   //   dispatch(setAuthenticated(!authenticated));
//   //   navigate('/batch');
//   // };

//   useEffect(() => {
//     const query = new URLSearchParams(window.location.href);
//     // console.log("params ", query.get("refreshToken"));
//     const refreshToken = query.get("refreshToken");
//     // console.log(refreshToken,'refresh');
//     const message = query.get("message");
   
//     if (message==null){
//     if (refreshToken !== temp) {
//         setTemp(refreshToken);
//     }
//     } else {
//         setMsg(message);
//     }
// }, []);


// useEffect(() => {
//   if (temp) {
//   const postdata = {
//       refreshToken : temp
//   };
//   refreshServices(postdata).then((response: any) => {    
//     console.log(response,"response")
//         if (response) {
//               setAuthSession(response); 
//               navigate("/")
//         }
//         });
// }
// }, [temp]);


//   const handleLogin = async () => {
//       try {
//         const response = await MSLoginServices();
//         window.location.replace(response?.data?.url);

//       } catch (error:any) {
        
//       }
//   };
 
//   return (
//     <div style={{ display: 'flex', flexDirection: 'row' , height: '95vh', width: '100vw' }}>
//       {/* Left Side - Background Image */}
//       <div style={{ flex: 1, display:  'block' , position: 'relative', overflow: 'hidden', alignContent:'center' }}>
//         <img
//           src={LoginBgImg}
//           alt="Login Background"
//           style={{ width: '100%', height: '90%', objectFit: 'contain' }}
//         />
//       </div>
 
//       {/* Right Side - Login Form */}
//       <div style={{ flex: 2, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '0 20px', textAlign: 'center',height: '90vh' }}>
//         <div>
//           <p style={{ fontWeight: '600', fontSize: '58px' , color: '#082045', lineHeight: 1.4 }}>
//             Welcome Back
//           </p>
//           <p style={{ fontWeight: '500', fontSize: '16px', lineHeight: 2, color: '#6D6D6D', paddingBottom: '20px',   }}>
//             Login to earn your certificate
//           </p>
//           <button
//             style={{
//               border: '2px #D1D1D1 solid',
//               background: '#FFFFFF',
//               padding: '10px',
//               width: '550px',
//               color: '#5D5D5D',
//               textTransform: 'capitalize',
//             }}
//             onClick={handleLogin}
//           >
//             <img src={microsoftIcon} alt="Microsoft Icon" style={{ paddingRight: '10px', height: '24px' }} /> Login With Microsoft
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };