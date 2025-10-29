import React from 'react'

const WarningModal = () => {
  return (
    <div>{/* Open the modal using document.getElementById('ID').showModal() method */}
<dialog id="warningmsgmodal" className="modal bg-red-800">
  <div className="modal-box">
    <h3 className="font-bold text-3xl text-left">VAŽNO OBAVEŠTENJE!</h3>
    <p className="py-4 font-bold text-xl" id='warningmsgtxt'>Primer obaveštenja...</p>
    <div className="modal-action">
      <form method="dialog">
        {/* if there is a button in form, it will close the modal */}
        <div style={{borderTop: "1px solid #cecece", paddingTop: "10px"}} className="items-center flex flex-row gap-5">
                <p className="py-0 text-s">Obaveštenje možete zatvoriti klikom na dugme ispod i tako nastaviti na portal.</p>
        <button className="btn py-4">Zatvori</button>



        </div>
      </form>
    </div>
  </div>
</dialog></div>
  )
}

export default WarningModal