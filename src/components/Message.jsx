import { Spinner } from './Spinner';

export const Message = ({ type, text }) => {
  return (
    <div className={`message ${type}`}>
      <div className="flex-1">
        <p className="m-2">{text}</p>
      </div>
      <div className="flex-initial p-1">{type !== 'error' && <Spinner />}</div>
    </div>
  );
};
