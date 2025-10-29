import { Bubbles } from 'lucide-react'
import React from 'react'

const NoData = () => {
  return (
    <div>

        <div className="flex flex-col gap-5 items-center">
            <Bubbles className='size-10
            '></Bubbles>
            <span className='text-xl font-semibold'>Trenutno nema postavljenih opcija za glasanje.</span>
            <span className="text-xl">Proveri ponovo kasnije.</span>
        </div>
    </div>
  )
}

export default NoData