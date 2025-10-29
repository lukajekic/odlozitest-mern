import { LoaderCircle } from 'lucide-react'
import React from 'react'

const Spinner = () => {
  return (
    <div>
        <LoaderCircle className='animate-spin size-10'></LoaderCircle>
    </div>
  )
}

export default Spinner