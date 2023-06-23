import { Button } from "react-bootstrap";
import { confirmAlert } from "react-confirm-alert";

export let deleteHandler = (item, deleteFunction) => {
  confirmAlert({
    customUI: ({ onClose }) => {
      return (
        <div className="react-confirm-alert-body">
          <h1>Are you sure?</h1>
          <p>{`You want to delete ${item.firstName}, ${item.lastName}, ${item.lastName}, id: ${item.id} ?`}</p>
          <Button onClick={onClose} variant="secondary">
            No
          </Button>
          <Button
            variant="secondary"
            onClick={() => {
              deleteFunction(item.id);
              onClose();
            }}
          >
            Yes, Delete it!
          </Button>
        </div>
      );
    },
  });
};
