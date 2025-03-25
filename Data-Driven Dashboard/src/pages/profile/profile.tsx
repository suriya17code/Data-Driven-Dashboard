import { useEffect } from 'react';
import { useAppDispatch } from '../../redux/store';
import * as thunk from "../../redux/thunk";
import OnboardingPage from '../onboarding/onboarding';

const ProFile = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await dispatch(
          thunk.onBoarding({
            userId: 2,
            role: "user",
            industry: "developer",
          })
        ).unwrap();

        console.log('API - data:', data); 
      } catch (error) {
        console.error('Error fetching onboarding data:', error);
      }
    };

    // fetchData();
    // ()=>{
    //   return  fetchData()
    // }
  }, [dispatch]); // Include dispatch in dependencies

  return (
    <>
      {/* <OnboardingPage /> */}
    </>
  );
};

export default ProFile;
