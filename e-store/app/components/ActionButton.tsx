import { Action } from "@prisma/client/runtime/library";
import { IconType } from "react-icons";

interface ActionButtonProps {
  icon: IconType,
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void 
  disabled?: boolean
}

const ActionButton: React.FC<ActionButtonProps> = ({icon: Icon, onClick, disabled}) => {
  return (
    <button
      onClick={onClick} 
      disabled={disabled}
      className={`
        flex 
        items-center 
        justify-center 
        rounded 
        cursor-pointer 
        w-[40px] 
        h-[30px] 
        text-slate-700 
        border 
        border-slate-400 
        ${disabled && "opacity-50 cursor-not-allowed"}
    `}>
      <Icon size={18} />
    </button>
  )
}

export default ActionButton