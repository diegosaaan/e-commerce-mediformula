import React, { ReactElement } from 'react';
import { IAccordionProps } from '@/types/interfaces';

export default function Accordion({
  sectionName,
  listName,
  title,
  children,
  isOpen,
  onToogleAccordion,
}: IAccordionProps): ReactElement {
  return (
    <div className={`${sectionName}__${listName}-accordion`}>
      <h6
        tabIndex={0}
        className={`${sectionName}__list-heading ${isOpen ? `${sectionName}__accordion-heading--active` : ''}`}
        onClick={onToogleAccordion}
        onKeyDown={onToogleAccordion}
      >
        {title}
      </h6>
      <ul className={`${sectionName}__${listName}-list ${isOpen ? `${sectionName}__accordion--active` : ''}`}>
        {children}
      </ul>
    </div>
  );
}
