import React from 'react'
import { Star } from 'lucide-react';

const WelcomeAlert = () => {


    const checkworklink = ()=>{
        window.location.href= "https://lukajekic.github.io/odlozitest/calendar.html"
    }
  return (
    <div>


        <div role="alert" class="alert alert-info alert-soft max-w-96">
            <Star className='size-7 mr-2'></Star>
  <span className='inline' ><span className='font-bold'>Zdravo!</span><br></br>
  <span>Na platformi „Odloži test“ možeš pronaći spas za svaki put kad nisi naučio. Pronađi test ili odgovaranje koji žeeliš da odložiš i glasaj. U isto vreme možeš glasati za dve stavke.</span>
  <br></br>
<button class="btn btn-outline btn-info mt-2" onClick={()=>{checkworklink()}}>Uveri se u moj rad</button>
  </span>
</div>
    </div>
  )
}

export default WelcomeAlert