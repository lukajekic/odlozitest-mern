import { FileX } from 'lucide-react'
import React from 'react'

const Header = () => {
  return (
    <div className="navbar bg-base-100 shadow-sm flex justify-center">
 <div className="flex flex-row gap-3 items-center">
  <FileX></FileX>
  <span className='text-xl font-semibold'>Odloži test</span>
 </div>
</div>
  )
}

export default Header