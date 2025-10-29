import { Book, Calendar, Vote } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import confirmSVG from '../assets/confirm.svg';
import axios from 'axios';
import { useNavigate } from 'react-router';

const Card = ({ item, forceHideAction }) => {
  const navigate = useNavigate();
  const ITEMID = item._id;

  const [loading, setLoading] = useState(false);
  const [submitDisabled, setSubmitDisabled] = useState(false);
  const [showModalSec, setShowModalSec] = useState(true);
  const [votedArray, setVotedArray] = useState([]);
  const [hideAction, setHideAction] = useState(false);

  // Load voted items from localStorage on mount
  useEffect(() => {
    const storedArray = JSON.parse(localStorage.getItem('voted')) || [];
    setVotedArray(storedArray);
    setHideAction(storedArray.includes(ITEMID));
  }, [ITEMID]);

  const errorToast = () => {
    setTimeout(() => {
      closeModal();
      toast.error('Desila se greška');
      setSubmitDisabled(false);
      setShowModalSec(true);
      setLoading(false);
    }, 200);
  };

  const addToStorage = () => {
    const updatedArray = [...votedArray, ITEMID];
    setVotedArray(updatedArray);
    localStorage.setItem('voted', JSON.stringify(updatedArray));
    setHideAction(true);
  };

  const increment = async () => {
    try {
      const response = await axios.put(`http://localhost:3000/api/items/${ITEMID}`);
      if (response.status === 200) {
        setTimeout(() => {
          addToStorage();
          navigate('/success');
        }, 1500);
      } else {
        errorToast();
      }
    } catch (error) {
      errorToast();
    }
  };

  const closeModal = () => {
    const modal = document.getElementById(`modal_${ITEMID}`);
    modal.close();
  };

  const handleVoteClick = async () => {
    setLoading(true);
    setSubmitDisabled(true);
    setShowModalSec(false);
    await increment();
  };

  return (
    <>
      <div className="p-0 card card-border bg-base-100 w-96">
        <div className="card-body">
          <h2 className="card-title">{item.title}</h2>

          <div className="mt-1 flex flex-wrap items-center gap-2">
            <span className="flex items-center gap-1">
              <Book />
              <span>{item.subject}</span>
            </span>
          </div>

          <div className="mt-1 flex flex-wrap items-center gap-2">
            <span className="flex items-center gap-1">
              <Calendar />
              <span>{new Date(item.date).toLocaleDateString('sr-RS', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: 'numeric'
                              })}</span>
            </span>
          </div>

          <div className="mt-1 flex flex-wrap items-center gap-2">
            <span className="flex items-center gap-1">
              <Vote />
              <span>{item.votes} glasova</span>
            </span>
          </div>

          <div className="card-actions justify-end">
            {!hideAction && !forceHideAction && (
              <>
                <button
                  className="btn btn-primary mt-5"
                  onClick={() => document.getElementById(`modal_${ITEMID}`).showModal()}
                >
                  open modal
                </button>

                <dialog id={`modal_${ITEMID}`} className="modal">
                  <div className="modal-box">
                    <div className="flex flex-col items-center">
                      <img src={confirmSVG} alt="" style={{ height: '75px' }} />
                      <p className="py-4 font-semibold">
                        Da li ste sigurni da želite glasati za ovaj test/odgovaranje?
                      </p>
                    </div>

                    <div className="modal-action">
                      {showModalSec && (
                        <button className="btn" onClick={closeModal}>
                          Odustani
                        </button>
                      )}
                      <button
                        id="submit"
                        disabled={submitDisabled}
                        className="btn btn-primary"
                        onClick={handleVoteClick}
                      >
                        {loading ? (
                          <span className="loading loading-spinner"></span>
                        ) : (
                          <span>Glasaj</span>
                        )}
                      </button>
                    </div>
                  </div>
                </dialog>
              </>
            )}
          </div>
        </div>
      </div>
      <Toaster />
    </>
  );
};

export default Card;
