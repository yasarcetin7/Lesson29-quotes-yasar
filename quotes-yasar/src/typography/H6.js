export function H6({ element, children }) {
  switch (element) {
    case 'p':
      return (
        <p className='text-l font-semibold text-slate-700'>{children}</p>
      );
    case 'span': 
      return (
        <span className='text-l font-semibold text-slate-700'>{children}</span>
      );
    default:
      return (
        <h3 className='text-l font-semibold text-slate-700'>{children}</h3>
      );
  }
}