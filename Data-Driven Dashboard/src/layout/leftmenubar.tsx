import React from 'react';
import { menu } from '../constants/leftmenubar';

import * as thunk from "../redux/thunk"
import { useAppDispatch, useAppSelector } from '../redux/store';
import { setActiveMenu, setHeaderContent } from '../redux/navbar/navbarThunk';
import { useNavigate } from 'react-router-dom';
import { auth } from '../components/Auth/firebase';

const LeftMenuBar = () => {
  const activeMenu = useAppSelector((state) => state.navbar.activeMenu);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleMenuClick = (menuList: any) => {
    console.log('menuList', menuList);
    dispatch(setActiveMenu(menuList.content.value));
    navigate(`/${menuList.content.value}`);
    dispatch(setHeaderContent(menuList.content.label));
  };
 const handlelogout=()=>{
  auth.signOut();
  sessionStorage.clear();
  navigate(`/login`); 
    dispatch(thunk.onboardingDetails(
      {fullname: '',
      role: '',
      industry: '',})) 
 }
  const menuItems = menu.map((menuList) => {
    const isActive = activeMenu === menuList.content.value;

    return (
      <React.Fragment key={menuList.content.label}>
        <button
          className={`rounded-[4px] flex gap-2 h-10 px-4 py-2 w-full justify-start cursor-pointer p-[25px] 
            ${isActive ? 'bg-[#1E3A8A] text-white' : 'bg-transparent text-[#B0B0B0]'}`}
          onClick={() => handleMenuClick(menuList)}
        >
          <p className="text-sm font-semibold tracking-normal normal-case whitespace-nowrap overflow-hidden text-ellipsis">
            {menuList.content.label}
          </p>
        </button>
      </React.Fragment>
    );
  });

  return (
    <>
    <div className="relative bg-[#082045] p-[10px] h-[736px] w-[200px] rounded-e-lg">
      <div className="flex p-0.5 justify-between w-full">
        <p className="text-white text-lg font-normal tracking-normal relative w-full ">
          <div itemType="span" className="font-medium text-aliceblue text-lg normal-case ">
            Data
          </div>
          <div itemType="span" className="font-extrabold text-lg normal-case">
            Driven
          </div>
        </p>
      </div>
      <div className='flex flex-col h-[635px] justify-between'> 
      <div className="p-0.5 flex flex-col gap-2.5 justify-center mt-[15px] ">
        <p className="text-[#C8C8C8] text-base font-semibold tracking-normal whitespace-nowrap normal-case">
          Menu
        </p>
        {menuItems} 
      </div>
      <div>
          <button
          onClick={handlelogout}
          className='bg-[#1E3A8A] text-white py-2 px-14 rounded-md cursor-pointer'>
            <p >LOGOUT</p>
          </button>
        </div>
        </div>
    </div>
    </>
  );
};

export default LeftMenuBar;