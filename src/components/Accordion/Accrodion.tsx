import React, { KeyboardEvent, ReactElement } from 'react';
import { IAccordionProps } from '@/types/interfaces';

export default function Accordion({
  sectionName,
  listName,
  title,
  children,
  isOpen,
  onClickAccordion,
  onKeydownAccordion,
}: IAccordionProps): ReactElement {
  return (
    <div className={`${sectionName}__${listName}`}>
      <h6
        tabIndex={0}
        className={`${sectionName}__list-heading ${isOpen ? `${sectionName}__accordion-heading--active` : ''}`}
        onClick={onClickAccordion}
        onKeyDown={onKeydownAccordion ? (event: KeyboardEvent): void => onKeydownAccordion(event) : undefined}
      >
        {title}
      </h6>
      <ul className={`${sectionName}__${listName}-list ${isOpen ? `${sectionName}__accordion--active` : ''}`}>
        {children}
      </ul>
    </div>
  );
}
