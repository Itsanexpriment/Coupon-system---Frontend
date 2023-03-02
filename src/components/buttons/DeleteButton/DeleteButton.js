import { confirmAlert } from 'react-confirm-alert';
import './DeleteButton.css'

const DeleteButton = ({ couponUuid, handleOnDelete }) => {
  
  const onDeleteWrapper = () => {
    confirmAlert({
      title: 'Confirm to submit',
      message: 'Are you sure you want to delete this coupon?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {handleOnDelete(null, { coupon: couponUuid })}
        },
        {
          label: 'No'
        }
      ]
    });
  }

  return (
    <div className="delete-container">
      <button className="delete-btn" onClick={onDeleteWrapper}>
        <span className="delete-text">Delete</span>
      </button>
    </div>
  );
}

export default DeleteButton;