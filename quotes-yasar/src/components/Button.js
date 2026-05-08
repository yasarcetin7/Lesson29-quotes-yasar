export function Button ({variant, onClick, children}) {
  let buttonStyles = '';

  switch(variant) {
    case 'primary': 
      buttonStyles = 'bg-slate-300/90 text-slate-700';
      break;
    case 'secondary': 
      buttonStyles = 'bg-slate-300/90 text-slate-800';
      break;
    default:
      buttonStyles = 'bg-slate-400/90 text-slate-900';
  }

  return (
    <button className={`text-base font-semibold px-4 py-1 rounded-md flex gap-4 
      text-center justify-center  hover:opacity-70 transition-opacity
     ${buttonStyles}`} onClick={onClick}>
      {children}
    </button>
  );
}