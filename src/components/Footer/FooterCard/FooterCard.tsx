import React, { ReactElement } from 'react';

export default function SocialNetworksCard(): ReactElement {
  return (
    <div className="footer__social-networks">
      <p className="footer__social-networks-heading">Мы в социальных сетях</p>
      <ul className="footer__icon-list">
        <li className="footer__icon-list-item footer__icon-list-item--whatsapp"></li>
        <li className="footer__icon-list-item footer__icon-list-item--classmates"></li>
        <li className="footer__icon-list-item footer__icon-list-item--vk"></li>
        <li className="footer__icon-list-item footer__icon-list-item--facebook"></li>
      </ul>
    </div>
  );
}
