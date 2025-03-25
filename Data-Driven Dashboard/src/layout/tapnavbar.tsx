import { useAppSelector } from "../redux/store"

 

const TapNavbar = () => {
  const userdata=useAppSelector((state)=>state.onboard.onBoardDetails)
  const headercontent = useAppSelector((state)=>state.navbar.setHeaderContent)
  return (
    <>
      <div className=" bg-white text-black relative" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", }}>
        <div className="w-full flex justify-between items-center sticky">
          <div className="flex justify-between items-center w-full ">
            <p className=" p-5 font-bold text-center text-lg"  >{headercontent}</p>
           
           <div>
           <p className="pt-2 pr-10 pb-0.5">
  {`Welcome `}
  <span className="font-bold text-blue-600">{userdata.fullname?userdata.fullname:"User Name"}</span>
</p> 
            <p className=" pt-0.5 pr-10 pb-2 font-extrabold text-indigo-700 ">{`( ${userdata.role?userdata.role:"Role"} )`}</p>
            </div> 
            </div>
        </div>
      </div> 
    </>
  )
}

export default TapNavbar