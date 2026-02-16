import react from "react";
const statsCard = ({title, value})=>{
    return(
        <div className="bg-white shadow p-4 rounded-md w-48 text-center">
            <h3 className="text-gray-500" >{title}</h3>
            <p className="text-2xl font-bold">{value}</p>
        </div>
    )
}
export default statsCard;