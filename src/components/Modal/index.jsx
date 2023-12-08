import './style.css';
export const Modal = ({ active, setActive, children }) => (
    <div
        className={`${active ? 'modal active' : 'modal'} w-screen h-screen fixed top-0 left-0 flex justify-center items-center flex-wrap`}
        onClick={() => setActive(false)}
    >
        <div
            className={`${active ? 'modal__content active' : 'modal__content'} p-[20px] rounded-[12px] bg-white w-[400px]`}
            onClick={(ev) => ev.stopPropagation()}
        >
            {children}
            <div className="flex w-full justify-end mt-[15px]">
                <button
                    className="px-[20px] text-2xl text-blue-700 font-semibold hover:bg-gray-700 hover:opacity-40 rounded hover:text-white duration-300"
                    onClick={() => setActive(false)}
                >
                    Ok
                </button>
            </div>
        </div>
    </div>
)
