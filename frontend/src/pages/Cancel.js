import CANCELIMG from "../assest/cancel.gif"
import { Link } from "react-router-dom"

const Cancel = () => {
  return (
    <div className="bg-slate-200 w-full max-w-md mx-auto flex justify-center items-center flex-col p-6 m-4 rounded">
        <img src={CANCELIMG} width={250} height={250}/>
        <p className="text-red-600 font-bold text-xl">Payment Cancelled</p>
        <Link to="/cart" className="p-2 px-3 mt-5 border-2 border-red-600 rounded font-semibold text-red-600 hover:bg-red-600 hover:text-white">Go To Cart</Link>
    </div>
  )
}

export default Cancel