import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Card from '../components/Card'
import WelcomeAlert from '../components/WelcomeAlert'
import MaxAlert from '../components/MaxAlert'
import axios from 'axios'
import Spinner from '../components/Spinner'
import Credit from '../components/Credit'
import WarningModal from '../components/WarningModal'
import { useNavigate } from 'react-router'
import NoData from '../components/NoData'



const Home = () => {
const [loading, setLoading] = useState(true)
const [data, setData] = useState([])
const [hasReachedMaxVotes, setHasReachedMaxVotes] = useState(false)

useEffect(() => {
  Config()

}, []) // Check on component mount


useEffect(() => {
  const votedItems = JSON.parse(localStorage.getItem('voted')) || []
  const activeVotes = data.filter(item => votedItems.includes(item._id)).length
  setHasReachedMaxVotes(activeVotes >= 2)
}, [data])

const getItems = async () => {
  const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL_PREFIX}/items`)
  console.log(response)
  setData(response.data)
  setLoading(false)


}

const navigate = useNavigate()
const Config = async () =>{
  const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL_PREFIX}/config`)
    if (response.status === 200) {
console.log(response.data)
const {maintenance, message, enablemessage} = response.data
if (maintenance === true) {
  navigate('/maintenance')
}
if (enablemessage === true) {
  document.getElementById('warningmsgmodal').showModal()
  document.getElementById('warningmsgtxt').textContent = message
}
    }
  
}


useEffect(()=>{
  getItems()
},[])
  
  return (
    <>
<div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]"></div>    <div className='flex flex-col items-center gap-5'>
    <Header/>
    



    {/* Open the modal using document.getElementById('ID').showModal() method */}


<WelcomeAlert></WelcomeAlert>
<MaxAlert></MaxAlert>
{loading && (
<Spinner></Spinner>

)}

{data.length > 0 ? 
  (data.map((item)=>(
<Card 
  key={item._id} 
  item={item} 
  forceHideAction={hasReachedMaxVotes}
/>
)))
: (<NoData/>)}


<Credit></Credit>

<WarningModal></WarningModal>

    </div>
    </>
  )
}

export default Home



