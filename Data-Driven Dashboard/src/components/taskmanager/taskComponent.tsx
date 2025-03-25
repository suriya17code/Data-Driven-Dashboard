import   { useEffect, useState } from 'react';
import InputForm from '../common/inputform';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import * as thunk from "../../redux/thunk"
import { resetSavedTask } from '../../redux/taskManager/taskSlice';
 

const TaskManager = () => {
  const [tasks, setTasks] = useState<any>([]);
  
  const [searchQuery, setSearchQuery] = useState<string>('');
  const gettasks=useAppSelector((state)=>state.task.getTasks?.data)
  
    // const editdata=useAppSelector((state)=>state.task.savedTask)
    
    const updtaedtask=useAppSelector((state)=>state.task.updatedtask)
  // const savedTask= useAppSelector((state)=>state.task)
  const [modelStatus,setModelStatus] = useState<any>(false)
  const [newdata,setNewdata] = useState<any>({})
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
    setModelStatus(true)  
  };
  
  const deleteTask = (id: any) => { 
    dispatch(thunk.Taskdelete(id))
  };
  
  
  const filteredTasks = (Array.isArray(tasks) ? tasks : []).filter((task:any) => 
    task?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase())
  );
  
  const hangleCollectData=(data:any)=>{
    setNewdata(data) 
  }
  const handleEdit = (data:any)=>{
    // its goint to setpreious existing data
    dispatch(thunk.saveEditTask(data))
    setModelStatus(true) 
  }

  useEffect(()=>{ 
    
     setTasks([...tasks, newdata]); 
    //  const data :any={}
    //  console.log('newdata',newdata,newdata?.id);
    //  data.title =newdata.title
    //  data.status = newdata.status
    // dispatch(thunk.TaskUpdate(editdata?.id,data))
    dispatch(resetSavedTask())
  },[newdata])
  // Update your useEffect for handling newdata
// useEffect(() => { 
//   if (newdata && Object.keys(newdata).length > 0) {
//     if (editdata?.id) {
//       // Handle update for existing task
//       const updateData:any = { 
//         status: newdata.status
//       };
//       dispatch(thunk.TaskUpdate(editdata.id, updateData));
//     } else {
//       // Handle creation of new task
//       // dispatch(thunk.TaskCreate(newdata));
//       console.log('post');
      
//     }
    
//     // Refresh task list
//     dispatch(thunk.gettasklist());
//     dispatch(resetSavedTask());
//     setModelStatus(false);
//   }
// }, [newdata]);

// Remove this line from your useEffect
// setTasks([...tasks, newdata]); 

useEffect(()=>{
dispatch(thunk.gettasklist())
console.log('updtaedtask',updtaedtask);

},[])
useEffect(() => {
  console.log("Fetched tasks:", gettasks);
  setTasks(Array.isArray(gettasks) ? gettasks : []);
}, [gettasks]);


  return (
    <div className='container mx-auto p-4 max-w-3xl h-[550px]'>
      <div className="flex justify-between items-center mb-4">
        <button 
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
      
      {/* Modal for adding new task - simplified for this example */}
      {/* <div className="mt-4">
        <input
          type="text"
          placeholder="New task title"
          className="px-4 py-2 border rounded-md mr-2"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTask()}
        />
      </div>
       */}
     {modelStatus  &&  <InputForm handleClose={handleClose} hangleCollectData={hangleCollectData} /> }
    </div>
    </div>
  );
};

export default TaskManager;