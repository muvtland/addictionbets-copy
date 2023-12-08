import { useFetchData } from './hooks/useFetchData';
import { Header } from './components/Header';
import { CreateTransaction } from './components/CreateTransaction';
import { Transactions } from './components/Transactions';
import { Modal } from "./components/Modal";

function App() {
    const {
        login,
        transactions,
        createTransaction,
        userInfo,
        modal,
        isProcessing
    } = useFetchData();
    return (
        <div>
            <Header login={login} userInfo={userInfo} />
            <CreateTransaction createTransaction={createTransaction} isProcessing={isProcessing}/>
            <Transactions transactions={transactions}/>
            <Modal active={modal.activeModal} setActive={modal.setModalActive}>
                <p className="text-red-500 text-2xl font-bold">{modal.error}</p>
            </Modal>
        </div>
    );
}

export default App;
