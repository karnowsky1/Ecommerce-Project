import { IconType } from "react-icons"

interface StatusProps {
  text: string,
  icon: IconType,
  background: string,
  color: string
}

const Status: React.FC<StatusProps> = ({text, icon: Icon, background, color}) => {
  return (
    <div className={`${background} ${color} px-1 py-0.5 rounded items-center gap-1 inline-flex leading-none align-middle`}>
      {text} <Icon size="15"/>
    </div>
  )
}

export default Status