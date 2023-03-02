import "./EditForm.css"

const EditForm = ({onSave, children }) => {

  return (
    <div className="EditForm">
      <h1>Edit your profile</h1>
      {children}
      <button onClick={onSave}>Save changes</button>
    </div>
  );
}

export default EditForm;