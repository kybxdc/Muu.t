import { useEffect } from "react";

export default function Test(){
    useEffect(()=>{
        const fetchReserveSeats = async ()=>{
            try{
                const response = await fetch(`https://muu-t-1.onrender.com/api/reserve/getReserveSeats/3`);
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