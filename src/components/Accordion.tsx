import React from 'react';
import BaseAccordion, { combineReducer, preventCloseReducer, singleReducer } from './BaseAccordion.tsx';

export type Props = {
    className?: string;
};

const items = [
  {
    title: '🐴',
    contents: (
      <div>
        Horses can sleep both lying down and standing up. Domestic horses have a
        lifespan of around 25 years. A 19th century horse named 'Old Billy' is
        said to have lived 62 years.
      </div>
    ),
  },
  {
    title: '🦏',
    contents: (
      <div>
        Rhino skin maybe thick but it can be quite sensitive to sunburns and
        insect bites which is why they like wallow so much – when the mud dries
        it acts as protection from the sunburns and insects.
      </div>
    ),
  },
  {
    title: '🦄',
    contents: (
      <div>
        If you’re looking to hunt a unicorn, but don’t know where to begin, try
        Lake Superior State University in Sault Ste. Marie, Michigan. Since
        1971, the university has issued permits to unicorn questers.
      </div>
    ),
  },
]


const Accordion: React.FC<Props> = () => {
 return (
    <BaseAccordion stateReducer={combineReducer(preventCloseReducer, singleReducer)}>
      {({openedIndexes, onItemClick}) => {
        return (
          <div>
            {items.map((item, index) => {
              return (
                <div key={index}>
                  <div onClick={() => onItemClick(index)}>{item.title} {openedIndexes.includes(index) ? '👇' : '👈'}</div>
                  {openedIndexes.includes(index) && <div>{item.contents}</div>}
                </div>
              )
            })}
          </div>
        )
      }}
    </BaseAccordion>
 );
};


export default Accordion;