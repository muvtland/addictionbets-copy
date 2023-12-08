import eth from '../../accets/eth.png'

export const Header = ({ login, userInfo }) => {
    async function connect() {
        try {
            await login();
        } catch (err) {
            console.log(err);
        }
    }
    const address = userInfo?.walletAddress ? userInfo.walletAddress.slice(0, 6) + "..." + userInfo.walletAddress.slice(-6) : null;

    return (
        <div className="min-h-[85px] px-[15px] flex items-center justify-between bg-cyan-800">
            <h2 className="text-white text-3xl font-bold pl-[15px]">
                Addiction Bets
            </h2>
            <div className="flex items-center justify-between">
                {userInfo.balance && (
                    <div className="flex items-center justify-between mr-3 bg-cyan-600 rounded-2xl">
                        <div className="flex items-center justify-between p-[5px]">
                            <img src={eth} alt="eth" className="w-[25px] mr-[10px]"/>
                            <h2 className={'text-white text-2xl mr-3'}>
                                {Number(userInfo.balance).toFixed(5)}
                            </h2>
                        </div>
                    </div>
                )}
                <div className="text-white px-[10px] py-[15px] text-xl">
                    {address ? (<h2 className={'text-white mr-3'}>{address}</h2>) : (
                        <button
                            className="bg-rose-700 p-[12px] rounded-full ext-white transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 hover:bg-indigo-500 duration-300"
                            onClick={connect}
                        >
                            Connect Wallet
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}
