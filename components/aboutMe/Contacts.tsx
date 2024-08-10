import { Arrow, Mail, Phone } from '@/public/icons'
import { useState } from 'react';

export default function Contacts({defaultIsOpen}: {defaultIsOpen: boolean}) {
    const [isOpen, setIsOpen] = useState<boolean>(defaultIsOpen);

  return (
      <div>
          <button
              className='borderClasses'
              onClick={() => {setIsOpen(!isOpen)}}
          >
              <Arrow className={`transition-rotate ${!isOpen && '-rotate-90'}`}/>
              <p>contacts</p>
          </button>
          {isOpen && <div className="flex flex-col pl-3.5 gap-2 pt-4">
              <a
                  className='commonClasses'
                  href="mailto:nockname2@mail.ru"
              >
                  <Mail />
                  <p>nockname2@mail.ru</p>
              </a>
              <a
                  className='commonClasses'
                  href="tel:89509986963"
              >
                  <Phone />
                  <p>+79509986963</p>
              </a>
          </div>}
          
      </div>
  )
}
