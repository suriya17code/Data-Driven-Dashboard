import   { useEffect, useState } from 'react';
import InputForm from '../common/inputform';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import * as thunk from "../../redux/thunk"

const TaskManager = () => {
  const [tasks, setTasks] = useState<any>([]);
  
  const [searchQuery, setSearchQuery] = useState<string>('');
  const gettasks=useAppSelector((state)=>state.task.getTasks?.data)
   
    
    // const updtaedtask=useAppSelector((state)=>state.task.updatedtask) 
  const [modelStatus,setModelStatus] = useState<any>(false) 
  const dispatch = useAppDispatch()
  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-200';
      case 'Completed':
        return 'bg-green-200';
      case 'InProgress':
        return 'bg-blue-200';
      default:
        return 'bg-gray-200';
    }
  };
  const handleClose=()=>{
    setModelStatus(false)
  }

  const addTask = () => {
    dispatch(thunk.saveEditTask({}))
    dispatch(thunk.editmode(false))
    setModelStatus(true)  
  };
  
  const deleteTask = (id: any) => { 
    dispatch(thunk.Taskdelete(id))
  };
  
  
  const filteredTasks = (Array.isArray(tasks) ? tasks : []).filter((task:any) => 
    task?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase())
  );
  
 
  const handleEdit = (data:any)=>{
    // its goint to setpreious existing data
    dispatch(thunk.saveEditTask(data))
    dispatch(thunk.editmode(true))
    setModelStatus(true) 
  }


 

useEffect(() => {
  console.log("Fetched tasks:", gettasks);
  setTasks(Array.isArray(gettasks) ? gettasks : []);
}, [gettasks]);
useEffect(()=>{
  dispatch(thunk.gettasklist())
  // console.log('updtaedtask',updtaedtask);
  
  },[])

  return (
    <div className='container mx-auto p-4 max-w-3xl h-[550px]'>
      <div className="flex justify-between items-center mb-4">
        <button 
        type='button'
          className=" cursor-pointer bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded"
          onClick={addTask}
        >
          Add Task
        </button>
        <input
          type="text"
          placeholder="Search tasks..."
          className="px-4 py-2 border rounded-md w-64"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

    <div className="container mx-auto p-4 max-w-3xl h-[550px] overflow-auto scrollbar-none custom-scrollbar relative">
    
      
      <div className="bg-white shadow-md rounded-md overflow-hidden ">
        <table className="min-w-full divide-y divide-gray-200 ">
          <thead className="bg-gray-50 sticky top-0 right-0">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr> 
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 ">
            {filteredTasks.map((task:any) => (
              <tr key={task.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{task.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{task.title}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(task.status)}`}>
                    {task.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                  <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                  onClick={()=>handleEdit(task)}>
                    Edit
                  </button>
                  <button 
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                    onClick={() => deleteTask(task.id)}
                  >
                    X
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
     {modelStatus  &&  <InputForm handleClose={handleClose} /> }
    </div>
    </div>
  );
};

export default TaskManager;