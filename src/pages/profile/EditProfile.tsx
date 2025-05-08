import { useAppContext } from "@/contexts/AppContext"
import React, { useState } from "react"
import { Formik , Form , Field , useFormikContext} from 'formik';
import { Button } from "@/components/ui/button";


function EditProfile(){
    const {user , setUser} = useAppContext()
    const [edit , setEdit]= useState(true);
    const [formValue , setFormValue] = useState(user)
    const handleSubmit = ()=>{
        // setUser({...user  , name:})
        setUser({...user , name:formValue.name , email:formValue.email , phone : formValue.phone})
        console.log("User" , user)

    }
    return(
        <div>
            <div className="flex justify-between">
            <h1 className="text-2xl font-bold mb-6">Edit Profile</h1>
            <div onClick={()=>setUser({...user , editable : !user.editable})}>X</div>
            </div>
            <Formik
                initialValues={{name:user.name , phone:user.phone , email:user.email}}
                onSubmit={(values , {setSubmitting} )=>{
                    console.log(values)
                    setFormValue({...user , name:formValue.name , email:formValue.email , phone : formValue.phone})
                    setTimeout(()=>{
                        setSubmitting(false)
                    },2000)
                }}
            >
                  {({ isSubmitting }) => (
                   <Form className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md space-y-4">
                   <div className="flex flex-col">
                     <label htmlFor="email" className="mb-1 text-sm font-medium text-gray-700">Email</label>
                     <Field
                       id="email"
                       className="h-10 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                       readOnly={edit}
                       type="email"
                       name="email"

                     />
                   </div>
                 
                   <div className="flex flex-col">
                     <label htmlFor="name" className="mb-1 text-sm font-medium text-gray-700">Name</label>
                     <Field
                       id="name"
                       className="h-10 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                       readOnly={edit}
                       type="text"
                       name="name"
 
                     />
                   </div>
                 
                   <div className="flex flex-col">
                     <label htmlFor="phone" className="mb-1 text-sm font-medium text-gray-700">Phone</label>
                     <Field
                       id="phone"
                       className="h-10 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                       readOnly={edit}
                       type="tel"
                       name="phone"
 
                     />
                   </div>
                 
                   <div className="flex justify-between space-x-4">
                     <Button
                       type="button"
                       onClick={() => setEdit(prev => !prev)}
                       className="w-full py-2 px-4 text-black border border-gray-300 rounded-md bg-gray-100 hover:bg-gray-200 transition"
                     >
                       {edit ? "Edit" : "Cancel"}
                     </Button>
                     <Button
                       type="submit"
                       onClick={handleSubmit}
                       disabled={isSubmitting}
                       className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                     >
                       {isSubmitting ? "Saving..." : "Save"}
                     </Button>
                   </div>
                 </Form>
                 
                )}
            </Formik>
                
        </div>
    )
}

export default EditProfile