import NotificationService from '@/components/NotificationService'
import Icon from '@/components/ui/icon'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { capitalizeFirstLetter, format_price, getMonthToString, mask } from '@/helpers/funcs'
import { catchError, request_api } from '@/helpers/request'
import { WalletTransactionType } from '@/helpers/type.models'
import useLanguage from '@/hooks/useLanguage'
import useUser from '@/hooks/useUser'
import { format, getDate, getMonth, getYear } from 'date-fns'
import React, { useEffect, useState } from 'react'

export default function Balances({
    balances
}: {
    balances: Array<WalletTransactionType>
}) {
    return (
        <Table>
            <TableHeader className={``}>
                <TableRow>
                    <TableHead className=''>#</TableHead>
                    <TableHead className=''>Opération</TableHead>
                    <TableHead className=''>Montant</TableHead>
                    <TableHead className=''>Tel</TableHead>
                    <TableHead className=''>Statut</TableHead>
                    <TableHead className=''>Date</TableHead>
                    <TableHead className=''>#</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {balances.length == 0 ? (
                    <TableRow>
                        <TableCell colSpan={6} className="text-center">DATA NOT FOUND</TableCell>
                    </TableRow>
                ) : balances.map((balance, i) => (
                    <BalanceRow
                        key={i}
                        item={balance}
                    />
                ))}
            </TableBody>
        </Table>
    )
}

const BalanceRow = ({
    item,
}: {
    item: WalletTransactionType,
}) => {
    const { token } = useUser()
    const { t } = useLanguage()

    const [loader, setLoader] = useState(false)
    const [balance, setBalance] = useState<WalletTransactionType|null>(null)

    const CURRENT_YEAR = getYear(new Date)

    const DATE = new Date(item?.updated_at)

    const onHandleCheckStatus = async () => {

        setLoader(true)

        const response = await request_api(`/${balance?.action}/balances/${balance?.id}/state`, 'PUT', null, { Authorization: `Bearer ${token}` })

        console.log({ response });

        if (response.hasOwnProperty('success')) {
            if (response?.success) {
                const { wallet_transaction } = response.data
                if(wallet_transaction) {
                    // @ts-ignore
                    setBalance(...wallet_transaction)
                }
            } else {
                if (response?.status_message) {
                    NotificationService.alert({
                        type: 'error',
                        title: '',
                        message: response.status_message
                    })
                }
            }
        } else {
            catchError(response, () => {
                setLoader(false)
            })
        }

        setLoader(false)
    }

    const maskId = () => {
        if(balance?.transaction_id) {
            const L = balance?.transaction_id.toString().length;
            return mask(balance?.transaction_id.toString(), '*', 4, L-3, 5)
            // return mask(balance?.transaction_id.toString(), '*', -L, L-3, 6)
        }
        return '?';
    }

    useEffect(()=>{
        setBalance(item)
    },[item])

    return (
        <TableRow className='text-xs'>
            <TableCell className="py-1">{maskId()}</TableCell>
            <TableCell className="py-1">
                {balance?.action}
                {/* {t('code.'+balance?.action)} */}
            </TableCell>
            <TableCell className="py-1">{format_price(balance?.amount||0)} F CFA</TableCell>
            <TableCell className="py-1">{balance?.phone}</TableCell>
            <TableCell className="py-1">
                <span className="">{balance?.transaction_status}</span>
            </TableCell>
            <TableCell className="py-1">
                <span className="">{getDate(DATE)} {capitalizeFirstLetter(getMonthToString(getMonth(DATE)))} {getYear(DATE) != CURRENT_YEAR && getYear(DATE)}</span>
            </TableCell>
            <TableCell className="py-1 w-[60px] text-center">
                {(balance?.transaction_status=='pending' || balance?.transaction_status=='in pending') ? (
                    <button
                        onClick={onHandleCheckStatus}
                        disabled={loader}
                        className=''
                    >
                        <Icon.RefreshCwIcon className={`w-4 h-4 text-neutral-400 ${loader?'animate-spin':''}`} />
                    </button>
                ): (
                    <span className="">#</span>
                )}
            </TableCell>
        </TableRow>
    )
}
