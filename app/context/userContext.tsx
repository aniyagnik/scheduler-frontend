import React, { createContext, useState, useEffect, ReactNode, useContext } from "react";
import {User,Task, TaskReport} from "@/interfaces/interfaces"


type UserContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  updateTaskField: <K extends keyof Task> (key: K, value: Task[K],index:number) => void;
  updateTaskReportField: <K extends keyof TaskReport> (key: K, value: TaskReport[K],taskIndex:number) => void;
};

// Create Context
export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

// Context Provider Component
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

function updateTaskField <K extends keyof Task> (key: K, value: Task[K],index:number) {
  setUser((prevUser) => {
    if (!prevUser) return prevUser;
    const updatedTasks = [...prevUser.allTasks]; // Create a new array
    updatedTasks[index] = { ...updatedTasks[index], [key]: value }; // Update task
    return { ...prevUser, allTasks: updatedTasks };
  });
};

function updateTaskReportField <K extends keyof TaskReport> (key: K, value: TaskReport[K],taskIndex:number) {
  setUser((prevUser) => {
    if (!prevUser) return prevUser;
    const updatedTasks = [...prevUser.allTasks];
    const updatedTaskReport = [...updatedTasks[taskIndex].taskReport]; // Copy taskReport array
    updatedTaskReport[0] = { ...updatedTaskReport[0], [key]: value }; // Update field
    updatedTasks[taskIndex] = { ...updatedTasks[taskIndex], taskReport: updatedTaskReport };
    return { ...prevUser, allTasks: updatedTasks };
  });
};
  
  // Fetch User Data
  useEffect(() => {
    const fetchUser = async () => {
      try{
        const response = await fetch("https://scheduler-backend-zzaq.onrender.com/api/v1/user/67a2e79597e84d7681b085f5")
        const data: any = await response.json();
        setUser(data?data.data:null);
      }catch(error){
        console.log('error in fetching user');
        console.log(error);
      }
    }
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, updateTaskField, updateTaskReportField }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};