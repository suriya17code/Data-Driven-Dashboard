import React, { useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/store'
import * as thunk from "../../redux/thunk" 
import { resetSavedTask } from '../../redux/taskManager/taskSlice'
interface TaskStatus {
  value: any
  label: string
}

const InputForm = ({handleClose}:any) => {
  const [title, setTitle] = useState('')
  const [status, setStatus] = useState<TaskStatus['value']>('')
  const [generatedId, setGeneratedId] = useState('')
  const [errorTitle, setErrorTitle] = useState('')
  const [errorStatus, setErrorStatus] = useState('')
  const dispatch = useAppDispatch()
  const editdata=useAppSelector((state)=>state.task.savedTask)
  const iseditmode=useAppSelector((state)=>state.task.editstatus)
  const statusOptions: TaskStatus[] = [
    { value: '', label: 'Select Status' },
    { value: 'Pending', label: 'Pending' },
    { value: 'InProgress', label: 'In Progress' },
    { value: 'Completed', label: 'Completed' }
  ]

  // Generate ID whenever title changes
  useEffect(() => {
    if (title) {
      const base = title?.trim().slice(0, 3).toUpperCase().padEnd(3, 'X')
      const randomNumbers = Math.floor(Math.random() * 900 + 100) // Generates 100-999
      const dynamicdata=editdata?.id ?( editdata?.id ) : (`${base}-${randomNumbers}`)
      setGeneratedId(dynamicdata)
    } else {
      setGeneratedId('')
    }
  }, [title])

  const handleSubmit = (e: React.FormEvent) => { 
    e.preventDefault()
    setErrorTitle('')
    setErrorStatus('')

    if ( !title.trim() || !status ) {
        !title.trim() && setErrorTitle('Title is required')
      !status && setErrorStatus('Please select a status')
      return
    }   
    const updateData = { 
      title:title,
       status,
       id: editdata?.id
            }
    {iseditmode?
      dispatch(thunk.TaskUpdate(updateData))
      :
      dispatch(thunk.TaskPost({ title:title.trim(), status,id: generatedId}))
    }
          dispatch(thunk.saveEditTask({}))
    handleClose()
  }

  const handleCancel = () => {
    setTitle('')
    setStatus('')
    setGeneratedId('')
    setErrorStatus('')
    setErrorTitle("")
    dispatch(resetSavedTask())
    handleClose()
  }
  
useEffect(()=>{
    setTitle(editdata?.title)
    setStatus(editdata?.status)
    setGeneratedId(editdata?.id)
    console.log('editdata',editdata);
},[editdata])
  return (
   
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
  <div className=" rounded-xl  max-w-md w-full">
      {/* Dialog content */}
      <div className="flex justify-center items-center w-full h-[625px] p-4">
        <div className="w-md md:max-w-2xl bg-white rounded-lg shadow-md p-6 space-y-6"> 
      <div >
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Edit Your Task</h2>
        
        <div className="space-y-4">
          {/* Generated ID Field */}
          <div>
            <label htmlFor="generatedId" className="block text-sm font-medium text-gray-700 mb-2">
              Generated ID
            </label>
            <input
              id="generatedId"
              type="text"
              readOnly
              value={generatedId}
              className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-50 cursor-not-allowed"
              placeholder="ID will generate automatically"
            />
          </div>

          {/* Title Input */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Task Title
            </label>
            <input
              id="title"
              type="text"
              placeholder="Enter task title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={`w-full px-4 py-2 border ${
                !title &&  errorTitle.includes('Title') ? "border-red-600" : "border-gray-300"
              } rounded-md`}
            />
             {!title && errorTitle && (
            <p className="text-red-600 text-sm mt-1">
              {errorTitle}
            </p>
          )}
          </div>

          {/* Status Select */}
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value as TaskStatus['value'])}
              className={`w-full px-4 py-2 border ${
                !status &&  errorStatus.includes('status') ? "border-red-600" : "border-gray-300"
              } rounded-md `}
            >
              {statusOptions.map((option) => (
                <option 
                  key={option.value} 
                  value={option.value}
                  disabled={option.value === ''}
                  className={option.value === '' ? 'text-gray-400' : ''}
                >
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          
          {/* Error Message */}
          {!status && errorStatus && (
            <p className="text-red-600 text-sm mt-1">
              {errorStatus}
            </p>
          )}
        </div>

    
      </div>
  {/* Action Buttons */}
  <div className="flex flex-col md:flex-row gap-4 justify-end">
          <button
            type="button"
            onClick={handleCancel}
            className=" cursor-pointer w-full md:w-auto px-6 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            onClick={(e)=>handleSubmit(e)}
            className=" cursor-pointer w-full md:w-auto px-6 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
    </div>
  </div>
  )
}

export default InputForm