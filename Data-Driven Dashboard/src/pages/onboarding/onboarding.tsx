import React, { useState, useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import * as thunk from "../../redux/thunk";
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../components/Auth/firebase';
 


const OnboardingPage = () => {
  const [formData, setFormData] = useState<any>({
    fullName: '',
    role: '',
    industry: '',
    onboardingCompleted:true
  });
  const [loading, setLoading] = useState(false);  
  
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  
  const token =useAppSelector((state)=>state.auth.token)
  const userdata =useAppSelector((state)=>state.auth.userDetails)
  // Fetch user profile data on component mount

  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); 
    setLoading(true);
    
    try {
         await dispatch(
                thunk.onBoarding({
                  fullname: formData.fullName,
                  role: formData.role,
                  industry: formData.industry,
                })
              ).unwrap();   
              
     // Update Redux store with onboarding data
              dispatch(thunk.onboardingDetails(
                {fullname: formData.fullName,
                role: formData.role,
                industry: formData.industry,}))
                navigate('/dashboard');

      // Redirect to dashboard
      navigate('/dashboard');
    } catch (err) {
      console.error(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (userdata.onboardingCompleted) {
          navigate('/dashboard');
          return
        } 
 setFormData({
    fullName: userdata.name || '',
    role: userdata.role || '',
    industry: userdata.industry || '',
  });
  
}, [token, navigate]);
  useEffect(()=>{
    const storedbData=async()=>{
      const user :any = auth.currentUser;
      await setDoc(doc(db,"Users",user.displayName),{
         fullname: formData.fullName,
         role: formData.role,
         industry: formData.industry,
             })
    }
    storedbData()
  },[auth])

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      {/* Header */}
      {/* <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-xl font-bold text-slate-900">DataDash</h1>
        </div>
      </header> */}
      
      {/* Main Content */}
      <main className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg p-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-slate-900">Complete Your Profile</h2>
            <p className="mt-2 text-slate-600">This helps us personalize your dashboard experience</p>
          </div>
          
          {/* {error && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )} */}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-slate-600">
                Full Name
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                required
                value={formData.fullName}
                placeholder='Enter Your Full Name'
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div>
              <label htmlFor="role" className="block text-sm font-medium text-slate-600">
                Role
              </label>
              <select
                id="role"
                name="role"
                required
                value={formData.role}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select your role</option>
                <option value="Admin">Admin</option>
                <option value="User">User</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="industry" className="block text-sm font-medium text-slate-600">
                Industry
              </label>
              <select
                id="industry"
                name="industry"
                required
                value={formData.industry}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select your industry</option>
                <option value="Retail">Retail</option>
                <option value="Technology">Technology</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Finance">Finance</option>
                <option value="Education">Education</option>
                <option value="Other">Other</option>
              </select>
            </div>
            
            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Processing...' : 'Continue to Dashboard'}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default OnboardingPage;