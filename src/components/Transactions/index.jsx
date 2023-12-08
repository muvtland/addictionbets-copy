export const Transactions = ({ transactions }) => {
    if (!transactions){
        return(
            <div className="flex justify-center items-center w-full px-[80px]">
                <h2 className="text-red-700 text-2xl">Please connect your wallet</h2>
            </div>
        )
    }

    return (
        <div className="flex justify-center items-center w-full px-[80px]">
            <div className="flex flex-col w-full justify-center items-center px-[30px]">
                <p className="text-red-500 text-2xl mb-[20px]">Transactions</p>
                <hr className="text-gray-700 w-full mb-[15px]"/>
                <div className="flex justify-start items-center w-full mb-5">
                    <p className="text-gray-700 text-xl w-[200px]">TYPE</p>
                    <p className="text-gray-700 text-xl w-[1400px]">HASH</p>
                    <p className="text-gray-700 text-xl w-[200px]">COIN</p>
                    <p className="text-gray-700 text-xl">AMOUNT</p>
                </div>
                <div className="w-full max-h-[400px] overflow-y-auto">
                    {transactions.map(({ type, hash, coin, amount}) => {
                        const isDeposit = type === 'deposit';
                        const color = isDeposit ? 'text-green-500': 'text-red-500';
                        return(
                            <div
                                className={`flex justify-start items-center w-full py-[20px]`}
                                key={hash}
                            >
                                <p className={`${color} w-[200px] uppercase`}>{type}</p>
                                <p className="text-gray-600 w-[1400px] text-clip">{hash}</p>
                                <p className="text-blue-700 w-[200px] ">{coin}</p>
                                <p className={`${color}`}>{isDeposit ? '+' : '-'}{amount}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
