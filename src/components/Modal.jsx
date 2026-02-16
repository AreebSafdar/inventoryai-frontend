import { X } from 'lucide-react';
import { colors, borderRadius, shadows } from '../styles/theme';

const Modal = ({ isOpen, onClose, title, children, size = 'medium' }) => {
  if (!isOpen) return null;

  const getSizeWidth = () => {
    const sizes = {
      small: '400px',
      medium: '600px',
      large: '800px',
      xlarge: '1000px'
    };
    return sizes[size] || sizes.medium;
  };

  const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    padding: '20px',
    animation: 'fadeIn 0.2s ease-out'
  };

  const modalStyle = {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    boxShadow: shadows.xl,
    width: '100%',
    maxWidth: getSizeWidth(),
    maxHeight: '90vh',
    display: 'flex',
    flexDirection: 'column',
    animation: 'slideIn 0.3s ease-out'
  };

  const headerStyle = {
    padding: '20px 24px',
    borderBottom: `1px solid ${colors.border}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  };

  const titleStyle = {
    fontSize: '20px',
    fontWeight: '600',
    color: colors.textPrimary
  };

  const closeButtonStyle = {
    width: '36px',
    height: '36px',
    borderRadius: borderRadius.md,
    border: 'none',
    backgroundColor: 'transparent',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    color: colors.textSecondary,
    transition: 'all 0.2s ease'
  };

  const bodyStyle = {
    padding: '24px',
    overflowY: 'auto',
    flex: 1
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div style={overlayStyle} onClick={handleOverlayClick}>
      <div style={modalStyle} className="fade-in">
        <div style={headerStyle}>
          <h2 style={titleStyle}>{title}</h2>
          <button
            style={closeButtonStyle}
            onClick={onClose}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = colors.gray100;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            <X size={20} />
          </button>
        </div>
        <div style={bodyStyle}>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
