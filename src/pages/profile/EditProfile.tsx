import { useAppContext } from "@/contexts/AppContext"
import React, { useState } from "react"
import { Formik , Form , Field} from 'formik';
import { Button } from "@/components/ui/button";


function EditProfile(){
    const {user , setUser} = useAppContext()
    const [edit , setEdit]= useState(true);
    console.log(user)
    const handleSubmit = ()=>{

    }
    return(
        <div>
            <div className="flex justify-between">
                <p>Edit Profile</p>
                <div onClick={()=>setUser({...user , editable : !user.editable})}>X</div>
            </div>
            <Formik
                initialValues={{name:user.name , phone:user.phone , email:user.email}}
                onSubmit={(values , {setSubmitting} )=>{
                    console.log(values)
                    setTimeout(()=>{
                        setSubmitting(false)
                    },2000)
                }}
            >
                  {({ isSubmitting }) => (
                    <Form>
                        <Field className="text-black" readOnly={edit} type="email" name="email" />
                        <Field className="text-black" readOnly={edit} type="text" name="name" />
                        <Field className="text-black" readOnly={edit} type="phone" name="phone" />
                        <Button type="button" onClick={()=>setEdit(prev=>!prev)}>
                            Edit
                        </Button>
                        <Button type="submit" onClick={handleSubmit} disabled={isSubmitting}>
                        {isSubmitting ? "Saving..." : "Save"}
                        </Button>
                       
                    </Form>
                )}
            </Formik>
                
        </div>
    )
}

export default EditProfile