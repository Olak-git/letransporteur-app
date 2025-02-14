import NotificationService from '@/components/NotificationService'
import NavThumb from '@/components/navThumb'
import { Button } from '@/components/ui/button'
import Icon from '@/components/ui/icon'
import { format_price, isNumber } from '@/helpers/funcs'
import { catchError, request_api } from '@/helpers/request'
import { PaymentModeType, WalletTransactionType } from '@/helpers/type.models'
import useUser from '@/hooks/useUser'
import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import RequestFormRender from './components/RequestFormRender'
import Balances from './components/Balances'

export default function Wallet() {

    const { user, token, updateUser } = useUser()

    const [loading, setLoading] = useState(true)
    const [showRecap, setShowRecap] = useState(false)
    const [transactions, setTransactions] = useState<Array<WalletTransactionType>>([])
    const [balance, setBalance] = useState(0)
    const [isVisible, setIsVisible] = useState(false)

    const toggleVisible = () => setIsVisible(!isVisible)

    const getWalletState = async () => {

        NotificationService.hide()

        const response = await request_api('/wallet/state', 'GET', null, { 'Authorization': `Bearer ${token}` })

        console.log({ response });

        if (response.hasOwnProperty('success')) {
            if (response?.success) {
                const { user: _user, balance } = response.data
                setBalance(balance)
                updateUser(_user)
            } else {
                if (response?.status_message) {
                    NotificationService
                }
            }
        } else {
            catchError(response, () => setLoading(false))
        }
        setLoading(false)
    }

    const getBalances = async () => {

        NotificationService.hide()

        const response = await request_api('/balances', 'GET', null, { 'Authorization': `Bearer ${token}` })

        console.log({ response });

        if (response.hasOwnProperty('success')) {
            if (response?.success) {
                const { user: _user, balances } = response.data
                setTransactions(balances)
                if (_user) {
                    updateUser(_user)
                }
            } else {
                if (response?.status_message) {
                    NotificationService
                }
            }
        } else {
            catchError(response, () => setLoading(false))
        }
        setLoading(false)
    }

    useEffect(() => {
        getWalletState()
    }, [])

    useEffect(() => {
        if (showRecap) {
            getBalances()
        }
    }, [showRecap])

    return (
        <>
            <Head>
                <title>LeTransporteur | Wallet</title>
            </Head>

            <div className=''>
                <NavThumb
                    data={[
                        {
                            trigger: 'Tableau de bord',
                            link: '/dashboard',
                        },
                        {
                            trigger: 'Portefeuille',
                            link: '#',
                            disabled: true
                        }
                    ]}
                />
                <div className=''>
                    <div className="flex flex-row flex-wrap justify-center items-center gap-4 border rounded p-3 mt-10">
                        <div className="">
                            <Icon.Wallet size={120} className='text-blue-300' />
                        </div>
                        <div className="flex flex-col flex-1 min-h-[120px]">
                            <div className="text-right">
                                <span className="">
                                    <span className="text-2xl font-black">{format_price(user?.wallet || 0)} <sup className="">XOF</sup></span>
                                    {balance>0 && (
                                        <sub className=''>-{format_price(balance)}</sub>
                                    )}
                                </span>
                            </div>
                            <div className="flex flex-1 p-3">
                                <p className="m-auto text-center">
                                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quam quod quaerat fugiat corrupti autem?</p>
                            </div>
                            <div className="">
                                <button onClick={()=>setShowRecap(!showRecap)} className="group">
                                    <span className="flex flex-row items-center">
                                        <span className="overline group-hover:underline" id="t__recaps__">Recaps</span>
                                        <Icon.ChevronDown className='transition group-hover:rotate-180' />
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="text-center mt-5">
                        <Button onClick={toggleVisible} className='dark:bg-orange-700 dark:hover:bg-orange-700/70 text-white'><span className={`${isVisible?'text-red-400':''}`}>{isVisible ? 'X':'$'}</span>&nbsp; Demander un reversement</Button>
                    </div>

                    {isVisible && (
                        <RequestFormRender
                            onClose={toggleVisible}
                            className='mt-8'
                        />
                    )}

                    {showRecap && (
                        <div className="mt-8">
                            <Balances
                                balances={transactions}
                            />
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

