import './Loading.css';

const Loading = () => {
  return (
    <div className='grid h-screen place-items-center'>
      <div className={`lds-ring`}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loading;
