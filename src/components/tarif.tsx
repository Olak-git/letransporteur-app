import { format_price } from '@/helpers/funcs'
import React from 'react'

export default function Tarif({
  unitPrice,
  total
} : {
  unitPrice: number|undefined,
  total: number
}) {
  return (
    <div className="">
      <div className="space-x-1 font-semibold text-orange-500">
          <span className="">Tarif unitaire:</span>
          <span className="">{format_price(unitPrice||0)} XOF</span>
      </div>

      {unitPrice!==undefined && (
          <div className="space-x-1 font-semibold">
              <span className="">À payer:</span>
              <span className="">{format_price(total)} XOF</span>
          </div>
      )}
  </div>
  )
}
