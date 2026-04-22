export function H3({ element, children }) {
  switch (element) {
    case 'p':
      return (
        <p className='text-2xl font-semibold'>{children}</p>
      );
    case 'span': 
      return (
        <span className='text-2xl font-semibold '>{children}</span>
      );
    default:
      return (
        <h3 className='text-2xl font-semibold '>{children}</h3>
      );
  }
}