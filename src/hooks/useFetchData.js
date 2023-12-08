import { useState, useCallback, useEffect } from 'react';
import { Web3 } from 'web3';
import { ABI, testNetContractAddress } from '../config'
import { myFetch } from '../utils/my-fetch';

const checkProvider = async () => {
    const provider = window.ethereum || window.web3?.provider

    if (!provider) {
        console.error('!provider')
        return
    }
    return new Web3(provider);;
}

export function useFetchData() {
    const [balance, setBalance] = useState(null);
    const [walletAddress, setWalletAddress] = useState(null);
    const [transactions, setTransactions] = useState([]);
    const [activeModal, setModalActive] = useState(false);
    const [error, setError] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);

    const verify = useCallback(async () => {
        try {
            const token = localStorage.getItem('access_token');

            if (token) {
                const { user } = await myFetch('/user/verify', 'GET', token);
                if (user) {
                    setBalance(user.balance);
                    setWalletAddress(user.walletAddress);
                } else {
                    localStorage.removeItem('access_token');
                    setBalance('');
                    setWalletAddress('');
                }
            }
        } catch (e) {
            setModalActive(true);
            setError(e.message || 'something went wrong')
            console.log(e);
        }
    }, []);

    const getTransactions = useCallback(async () => {
        try {
            const token = localStorage.getItem('access_token');
            if (token) {
                const { transactions: transactionList } = await myFetch('/transaction', 'GET', token);
                setTransactions(transactionList);
            } else {
                setTransactions(null);
            }
        } catch (e) {
            setModalActive(true);
            setError(e.message || 'something went wrong');
            console.log(e);
        }
    }, []);

    const login = useCallback(async () => {
        try {
            const token = localStorage.getItem('access_token');
            if (token) {
                await verify();
            } else {
                const web3 = await checkProvider();
                if (web3) {
                    const [address] = await web3.eth.requestAccounts()
                    const message = 'Authentication for AddictionBetCopy';
                    const signature = await web3.eth.personal.sign(message, address, '');
                    const { token, user } = await myFetch('/user/login', 'POST', null, {message, address, signature});

                    if (token && user) {
                        localStorage.setItem('access_token', token);
                        setBalance(user.balance);
                        setWalletAddress(user.walletAddress);
                        await getTransactions();
                    }
                }
            }
        } catch (e) {
            setModalActive(true);
            setError(e.message || 'something went wrong');
            console.log(e);
        }
    }, [verify, getTransactions])

    const createTransaction = useCallback(async ({type, amount, coin}) => {
        try {
            const token = localStorage.getItem('access_token');
            if (token && walletAddress) {
                const web3 = await checkProvider();
                const contract = new web3.eth.Contract(ABI, testNetContractAddress);
                const value = web3.utils.toWei(amount, 'ether');
                let txHash;
                setIsProcessing(true);
                if (type === 'deposit') {
                    const transaction = await contract.methods.deposit().send({from: walletAddress, value});
                    txHash = transaction.blockHash;
                } else {
                    const singTx = await myFetch('/transaction/withdraw', 'POST', token, {amount, walletAddress});
                    const transaction = await contract.methods.withdraw(value, singTx.time, singTx.nonce, singTx.signature).send({from: walletAddress});
                    txHash = transaction.blockHash;
                }
                if (txHash){
                    const { transaction } = await myFetch('/transaction', 'POST', token, {type, amount, coin, txHash});
                    setTransactions((prevTransactions) => [transaction, ...prevTransactions]);
                    const { balance: currentBalance } = await myFetch('/user/balance', 'GET', token);
                    let newBalance = type === 'deposit' ? Number(currentBalance) + Number(amount) : Number(currentBalance) - Number(amount);
                    const { user } = await myFetch('/user', 'PUT', token, { balance: newBalance });
                    setBalance(user.balance);
                }
                setIsProcessing(false);
            } else {
                setIsProcessing(false);
                setError('Please connect your wallet');
                setModalActive(true)
            }
        } catch (e) {
            setIsProcessing(false);
            setModalActive(true);
            setError(e.message || 'something went wrong');
            console.log(e);
        }
    }, [walletAddress])

    useEffect(() => {
        verify().then(() => getTransactions());
    }, [verify, getTransactions])


    return {
        login,
        transactions,
        createTransaction,
        isProcessing,
        userInfo: { balance, walletAddress },
        modal: { activeModal, setModalActive, error }
    };
}
