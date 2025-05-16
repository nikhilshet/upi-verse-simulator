import { useAppContext } from "@/contexts/AppContext";
import { CheckCircle , Share} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom"

const Transaction = () => {

    const param = useParams();
    const navigate =  useNavigate();
    const { transactions } = useAppContext();
    const transaction = transactions.find((tx) => tx.id === param.id)
    return (
        <div className="flex flex-col items-center bg-white dark:bg-gray-900 py-8 px-4">
            {/* <div className="text-center mb-4">
            <CheckCheckIcon className="text-green-400"/>
            </div>
            <div className="text-4xl font-bold">₹{transaction.amount}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Paid to {transaction.recipient}</div>
          </div>
          <div className="border-t border-gray-300 dark:border-gray-600 pt-4">
            <div className="mb-2"><span className="font-medium">Date:</span> {transaction.date}</div>
            <div className="mb-2"><span className="font-medium">Status:</span> <span className="text-green-500">{transaction.status}</span></div>
            <div className="mb-2"><span className="font-medium">Category:</span> {transaction.category}</div>
            <div className="mb-2"><span className="font-medium">Phone:</span> {transaction.phone}</div>
            <div className="mb-2"><span className="font-medium">Transaction ID:</span> {transaction.transactionId}</div>
            <div className="mb-2"><span className="font-medium">UPI Transaction ID:</span> {transaction.upiTransactionId}</div>
            <div className="mb-2"><span className="font-medium">From:</span> {transaction.from.upi} ({transaction.from.bank})</div>
            <div className="mb-2"><span className="font-medium">To:</span> {transaction.to.upi} ({transaction.to.bank})</div>
            <div><span className="font-medium">Bank:</span> {transaction.bankName}</div> */}
            <div className="flex flex-col  w-full items-center mb-4">
                <CheckCircle color="#00b50f" size={80} className="mb-4"/>
                <p className="text-3xl font-medium mb-4">Payment Successful</p>
                { transaction.type === 'receive' ? "" : <p className="text-md font-medium mb-4">To {transaction.recipient}</p>}
                
                <p className="text-4xl mb-4 font-bold">₹{transaction.amount}</p>
                <p className="mb-2 font-light"> {transaction.date}</p>
            </div>
            
            <div className="space-y-4 w-full border-t border-gray-200 mb-4">
                <div className="mt-4">
                    <p className="text-gray-600 dark:text-gray-300 font-medium">Transaction ID:</p>
                    <p className="text-gray-500 dark:text-gray-400">{transaction.transactionId}</p>
                </div>
                <div>
                    <p className="text-gray-600 dark:text-gray-300 font-medium">UPI Transaction ID:</p>
                    <p className="text-gray-500 dark:text-gray-400">{transaction.upiTransactionId}</p>
                </div>
                <div>
                    <p className="text-gray-600 dark:text-gray-300 font-medium">From:</p>
                    <p className="text-gray-500 dark:text-gray-400">{transaction.from.upi}</p>
                    <p className="text-gray-500 dark:text-gray-400">{transaction.from.bank}</p>

                </div>
                <div>
                    <p className="text-gray-600 dark:text-gray-300 font-medium">To:</p>
                    <p className="text-gray-500 dark:text-gray-400">{transaction.to.upi}</p>
                    <p className="text-gray-500 dark:text-gray-400">{transaction.to.bank}</p>
                </div>
                <div>
                    <p className="text-gray-600 dark:text-gray-300 font-medium">Bank:</p>
                    <p className="text-gray-500 dark:text-gray-400">{transaction.bankName}</p>
                </div>
            </div>
            <div className="flex space-x-4">
            <button className=" px-4 h-12 rounded-full border border-blue-500"><Share size={20}/></button>
            <button onClick={()=>navigate('/')} className="w-32 h-12 text-md rounded-full bg-blue-500 text-white">Done</button>
            </div>

        </div>


    )
}

export default Transaction