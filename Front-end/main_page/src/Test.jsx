import { useEffect } from "react";

export default function Test(){
    useEffect(()=>{
        const fetchReserveSeats = async ()=>{
            try{
                const response = await fetch(`/api/reserve/getReserveSeats/27`);
                console.log(await response.json())
            }catch(e){
                console.log(e);
            }
        }
        fetchReserveSeats();
    })
    return <>
        <div>
            test
        </div>
    </>
}