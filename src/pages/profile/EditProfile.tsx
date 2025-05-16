import { useAppContext } from "@/contexts/AppContext"
import React, { useState } from "react"
import { Formik , Form , Field , useFormikContext, ErrorMessage} from 'formik';
import { Button } from "@/components/ui/button";
import { toFormikValidationSchema } from 'zod-formik-adapter';
import {X} from 'lucide-react'

import {z} from 'zod'
interface formValue{
    name: string;
    phone: string;
    email: string;
}

const formValidations = z.object({
  name:z
  .string()
  .min(6 , 'Name should be minimum 6')
  .max(20 , 'Name should be less than 20')
  .regex(/^[A-Za-z\s]+$/ , "Name must not contain special characters"),
  email:z
  .string()
  .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/ ,'Email is incorrect' ),
  phone:z
  .string()
  .regex(/^[6-9]\d{9}$/,'Phone number is incorrect')
}
)
function EditProfile(){
    const {user , setUser} = useAppContext()
    const [readOnly , setReadOnly]= useState(true);
    // const [formValue , setFormValue] = useState<formValue>({name:user.name , phone:user.phone , email:user.email})
    return(
        <div>
            <div className="flex px-4 justify-between">
            <h1 className="text-2xl font-bold mb-6">Edit Profile</h1>
            <div className="" onClick={()=>setUser({...user , editable : !user.editable})}><X className="text-gray-500 dark:text-white" /></div>
            
            </div>
            <Formik
                
                initialValues={{name:user.name , phone:user.phone , email:user.email}}
                validationSchema={toFormikValidationSchema(formValidations)}
                onSubmit={(values , {setSubmitting} )=>{
                    setUser({...user , name:values.name , email:values.email , phone : values.phone , editable : false})

                    // setFormValue(values)
                    setTimeout(()=>{
                        setSubmitting(false)
                    },2000)
                }}
            >
                  {({ isSubmitting , isValid , values, errors, isValidating, touched }) => (
                   <Form className="max-w-md mx-auto p-6 text-black bg-white dark:bg-gray-800 dark:text-white rounded-lg shadow-md space-y-4">
                   <div className="flex flex-col">
                     <label htmlFor="email" className="mb-1 text-sm font-medium text-gray-700 dark:text-white">Email</label>
                     <Field
                       id="email"
                       className={`h-10 px-3 ${readOnly ? "bg-gray-100 pointer-events-none" : "bg-white"}  border border-gray-300 dark:bg-gray-600 dark:border-gray-500 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black`}
                       readOnly={readOnly}
                       type="email"
                       name="email"

                     />
                     { touched.email && <ErrorMessage name="email" className="text-red-500" component="p" />}
                   </div>
                 
                   <div className="flex flex-col">
                     <label htmlFor="name" className="mb-1 text-sm font-medium text-gray-700 dark:text-white">Name</label>
                     <Field
                       id="name"
                       className={`h-10 px-3 ${readOnly ? "bg-gray-100 pointer-events-none" : "bg-white"} border border-gray-300 dark:bg-gray-600 dark:border-gray-500 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black`}
                       readOnly={readOnly}
                       type="text"
                       name="name"
 
                     />
                     { touched.name && <ErrorMessage name="name" className="text-red-500" component="p" />}

                   </div>
                 
                   <div className="flex flex-col">
                     <label htmlFor="phone" className={`mb-1 text-sm font-medium text-gray-700 dark:text-white`}>Phone</label>
                     <Field
                       id="phone"
                       className={`h-10 px-3 ${readOnly ? "bg-gray-100 pointer-events-none" : "bg-white"} border border-gray-300 dark:bg-gray-600 dark:border-gray-500 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black`}
                       readOnly={readOnly}
                       type="tel"
                       name="phone"
 
                     />
                     { touched.phone && <ErrorMessage name="phone"  className="text-red-500" component="p" />}

                   </div>
                 
                   <div className="flex justify-between space-x-4">
                     <Button
                       type="button"
                       onClick={() => setReadOnly(prev => !prev)}
                       className="w-full py-2 px-4 text-black border border-gray-300 rounded-md bg-gray-100 hover:bg-gray-200 transition"
                     >
                       {readOnly ? "Edit" : "Cancel"}
                     </Button>
                     <Button
                       type="submit"
                       variant="glow"
                       disabled={readOnly || !isValid}
                       className="w-full py-2 px-4 bg-blue-600 text-white  rounded-md hover:bg-blue-700 transition"
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