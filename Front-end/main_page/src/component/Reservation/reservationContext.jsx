import { createContext, useEffect } from "react";
import { useParams } from "react-router-dom";

export const ReservationCtx = createContext({

});

export default function ReservationProvider({children}){
    const performance_id = useParams().performance_id;

    useEffect(()=>{
       const fetchInfo = async ()=>{
        try{
            const response = await fetch(`/api/reserve/info/${performance_id}`);
            const result = await response.json();
            console.log(result);
        }catch(e){
            console.log(e)
        }
       }
       fetchInfo();
    },[])


    const reserveCtx = {

    }

    return <ReservationCtx.Provider value={reserveCtx}>{children}</ReservationCtx.Provider>
}