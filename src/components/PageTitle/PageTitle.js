import './PageTitle.css'


export default function PageTitle({ title, children }) {

  return (
    <div className='page__title'>
      <h2>{title}</h2>
      {children}
    </div>
  );
}
