import React from 'react'
import { MessageCircleWarning, Star } from 'lucide-react';

const MaxAlert = () => {
  return (
    <div>


        <div role="alert" class="alert alert-error alert-soft max-w-96">
            <MessageCircleWarning className='size-7 mr-2'></MessageCircleWarning>
  <span className='inline' ><span className='font-bold'>Upozorenje!</span><br></br>
  <span>U ovom trenutku aktivno si glasao za dve stavke, više ne možeš glasati dok jedna od stavki za koje si glasao ne bude obrisana sa spiska, tada ćeš moći ponovo.</span>
  
  </span>
</div>
    </div>
  )
}

export default MaxAlert