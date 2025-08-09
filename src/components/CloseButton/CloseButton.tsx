import './CloseButton.css';

interface ICloseButtonProps {
  onClose: () => void;
}

const CloseButton: React.FC<ICloseButtonProps> = ({ onClose }) => {
  return (
    <div className="close-button-container">
      <div
        className="close-button-wrapper"
        onClick={e => {
          e.preventDefault();
          onClose();
        }}
      >
        <span className="left">
          <span className="circle-left"></span>
          <span className="circle-right"></span>
        </span>
        <span className="right">
          <span className="circle-left"></span>
          <span className="circle-right"></span>
        </span>
      </div>
    </div>
  );
};

export default CloseButton;
