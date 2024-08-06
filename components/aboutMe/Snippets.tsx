import React from 'react';
import GistSnippet from './GistSnippet';
import { CSSTransition } from 'react-transition-group';

const gistIds = [
  '7f244fc6bd39245b1e25f0e5ca8ada4a',
  '8dea84fcd0c46acb9450d7f0b1c65966'
];

const Snippets: React.FC = () => {
  return (
      <div className='flex grow mt-[44px] border-t'>
          <div className='flex flex-col gap-8 grow mx-10 mt-5'>
              <div>
                  {'// Демонстрация фрагментов кода:'}
              </div>
              <CSSTransition
                  in={true}
                  timeout={300}
                  classNames="snippets"
                  unmountOnExit
              >
                  {state => (
                      <div className={`snippets-${state}`}>
                          {gistIds.map(id => (
                              <GistSnippet
                                  key={id}
                                  id={id}
                              />
                          ))}
                      </div>
                  )}
              </CSSTransition>
          </div>
          <div className='flex justify-center border-l'>
              <div className='h-1.5 mx-1 w-3.5 mt-1 bg-gray'></div>
          </div>
      </div>
  );
};

export default Snippets;
