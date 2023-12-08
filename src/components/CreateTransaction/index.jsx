import { useState } from 'react';

export const CreateTransaction = ({ createTransaction, isProcessing }) => {
    const [type, setType] = useState('deposit');
    const [amount, setAmount] = useState('');
    const [error, setError] = useState('');

    const setTypeHandler = (currentType) => {
        setType(currentType)
    }

    const setAmountHandler = (event) => {
        setAmount(event.target.value);
        setError('');
    }


    const transactionHandler = async () => {
        if (Number(amount)){
            const coin = 'eth'
            createTransaction({ type, amount, coin });
        }else {
            setError('Pleas enter correct amount')
            setAmount('');
        }
    }
    return (
        <div className="pt-[100px] px-[80px] h-max">
            <div className="flex flex-col justify-center items-center mb-[20px] bg-slate-200 p-[50px] rounded">
                <div className="flex mb-4">
                    <button
                        className={`${type === 'deposit' ? 'bg-blue-500 hover:bg-blue-700' : 'bg-gray-300 hover:bg-gray-400'} text-white font-bold py-2 px-4 rounded mr-3 w-[150px] hover:scale-105 duration-300`}
                        onClick={() => setTypeHandler('deposit')}
                    >
                        DEPOSIT
                    </button>
                    <button
                        className={`${type === 'withdraw' ? 'bg-blue-500 hover:bg-blue-700' : 'bg-gray-300 hover:bg-gray-400'} text-white font-bold py-2 px-4 rounded w-[150px] hover:scale-105 duration-300`}
                        onClick={() => setTypeHandler('withdraw')}
                    >
                        WITHDRAW
                    </button>
                </div>
                <div className="flex mb-4">
                    <div className="inline-block relative w-[80px] mr-3">
                        <select
                            className="block appearance-none w-[80px] bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
                            <option>ETH</option>
                        </select>
                        <div
                            className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                            </svg>
                        </div>
                    </div>
                    <input
                        type="text"
                        id="amount"
                        className="bg-gray-50 w-[220px] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="0.02"
                        onChange={setAmountHandler}
                    />
                </div>
                <div className="flex">
                    <button
                        className={`${isProcessing ? 'focus:outline-none disabled:opacity-25 bg-blue-600' : 'bg-blue-500 hover:bg-blue-700 hover:scale-105 duration-300'} text-white font-bold py-2 px-4 rounded w-[312px] `}
                        onClick={transactionHandler}
                        disabled={isProcessing}
                    >
                        CONFIRM
                    </button>
                </div>
                {error && <p className="text-red-500 mt-5 text-xl">{error}</p>}
            </div>
        </div>
    )
}
