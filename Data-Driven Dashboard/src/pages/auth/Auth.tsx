import React, {   useState } from 'react';
import * as thunk from "../../redux/thunk"
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../redux/store'; 
import { setActiveMenu, setHeaderContent } from '../../redux/navbar/navbarThunk';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth ,db} from '../../components/Auth/firebase';
import { setDoc,doc } from 'firebase/firestore';
import { toast, ToastContainer } from 'react-toastify';
interface AuthFormData {
  name?: string;
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState<AuthFormData>({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
   
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const loginTab=()=>{
      setIsLogin(true)
       setFormData({
        name:'',
        email: '',
        password: '',
      })
  }
  const signUpTab=()=>{
    setIsLogin(false)
    setFormData({
        name:'',
        email: '',
        password: '',
      })
  }





const handleRegister=async(e:any)=>{
  e.preventDefault();
  setError(null);
  setLoading(true);
  if(isLogin){
    try {
      await signInWithEmailAndPassword(auth,formData.email,formData.password)
      const user :any = auth.currentUser;
     
      console.log('login',user); 
      if(user){
        toast.success("User created successfully!", {position: "top-right",autoClose: 3000, pauseOnHover: true,closeOnClick: true,hideProgressBar: false,}); 
      }
        // Wait for auth state to propagate
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const user :any = auth.currentUser;
        sessionStorage.setItem("Access",user?.accessToken) 
          navigate('/dashboard');
          dispatch(setActiveMenu('dashboard'));
          dispatch(setHeaderContent('Dashboard'));
        unsubscribe(); // Remove the listener
      }
    });
    } catch (error) {
      console.error('error',error);
      toast.error("Credential Wrong!", {position: "top-right",autoClose: 3000,hideProgressBar: false,closeOnClick: true,pauseOnHover: true,});
    } finally {
      setLoading(false);
      // navigate('/dashboard');
    }
   }else{
    try {
      // signUp user
      await createUserWithEmailAndPassword(auth,formData.email,formData.password)
      const user :any = auth.currentUser;
    // add name
      await updateProfile(user, {
        displayName: formData.name,
      }); 
        // store the user data in db
      if(user){
        await setDoc(doc(db,"Users",user.uid),{
          name: formData.name,
          email:formData.email,
          password:formData.password
        })
        toast.success("User created successfully!", {position: "top-right",autoClose: 3000, pauseOnHover: true,closeOnClick: true,hideProgressBar: false,}); 
      }  
      sessionStorage.setItem("Access",user?.accessToken)
      dispatch(thunk.setuserDetails({name:user.displayName}))
      navigate('/Onboarding');
      // dispatch(setActiveMenu('dashboard'));
      // dispatch(setHeaderContent('Dashboard'));
  console.log('signup',user); 
  
    } catch (error) {
      console.error('error',error);
      toast.error("User Exist Already!", {position: "top-right",autoClose: 3000, hideProgressBar: false,closeOnClick: true,pauseOnHover: true,});
    } finally {
      setLoading(false);

    }
   }

}


  return (
    <div className=" h-[720px] bg-slate-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md overflow-hidden">
        {/* Auth Tabs */}
        <div className="flex">
          <button
            className={`w-1/2 py-4 text-center ${
              isLogin ? 'bg-blue-500 text-white' : 'bg-slate-200 text-slate-600'
            }`}
            onClick={loginTab}
          >
            Log In
          </button>
          <button
            className={`w-1/2 py-4 text-center ${
              !isLogin ? 'bg-blue-500 text-white' : 'bg-slate-200 text-slate-600'
            }`}
            onClick={signUpTab}
          >
            Sign Up
          </button>
        </div>

        {/* Auth Form */}
        <div className="p-8">
          <form onSubmit={handleRegister} className="space-y-6">
            {!isLogin && (
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-600">
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required={!isLogin}
                  value={formData.name || ''}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="John Doe"
                />
              </div>
            )}
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-600">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="john@example.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-600">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                // required
                value={formData.password}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="••••••••"
                style={{color:"black",backgroundColor:"transparent"}}
              />
            </div>

            {/* {isLogin && (
              <div className="flex items-center justify-end">
                <button type="button" className="text-sm text-blue-500 hover:text-blue-600">
                  Forgot Password?
                </button>
              </div>
            )} */}

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative">
                {error}
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span>Loading...</span>
                ) : isLogin ? (
                  'Log In'
                ) : (
                  'Sign Up'
                )}
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-slate-600">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button
                type="button"
                className="text-blue-500 hover:text-blue-600"
                onClick={() => setIsLogin(!isLogin)}
              >
                {isLogin ? 'Sign Up' : 'Log In'}
              </button>
            </p>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;