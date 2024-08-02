import { Dispatch, SetStateAction } from "react";

interface IProps {
  items: React.ReactNode[];
  onSelect: Dispatch<SetStateAction<number>>;
}

const Menu: React.FC<IProps> = ({items, onSelect}) => {
  return (
      <ul className="flex flex-col gap-[33px] w-[68px] pt-[17.46px] pl-[24px] border-r">
          {items.map((item, index) => (
              <li
                  key={index}
                  onClick={() => onSelect(index)}
              >{item}</li>
            ))}
      </ul>
  )
}

export default Menu;
