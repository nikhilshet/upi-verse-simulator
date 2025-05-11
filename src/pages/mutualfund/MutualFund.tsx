import React from "react"
import { useState } from "react"
enum mfPage{
    home="home",
    holding = "holding",
    allMf = "allmf",

}
const MutualFund =()=>{
    const [currentSelection , setCurrentSelection] = useState<mfPage>(mfPage.home)
    if(currentSelection === mfPage.allMf){
        return (
            <div>
                <img src="/all.svg" alt="" />
            </div>
        )
    }
    if(currentSelection === mfPage.holding){
        return(
            <div>
                <img src="/holdings.svg" alt="" />
            </div>
        )
    }
    return(
        <>
            <div>
                <div onClick={()=>(setCurrentSelection(mfPage.holding))} className="w-20 h-20 z-99 absolute mt-48"></div>
                <div onClick={()=>(setCurrentSelection(mfPage.allMf))} className="w-20 h-8 right-8 z-99 absolute top-[420px]"></div>
                <img src="/mf.svg" alt="" />
            </div>
        </>
    )

}
export default MutualFund