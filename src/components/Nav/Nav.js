import React from "react";
import styles from './Nav.module.css';

import { NavLink } from "react-router-dom";
import { navLinks } from "../../shared/projectData";

export const Nav = () => {
  return (
    <aside className={styles.mainNav}>
      <nav>
        {
          navLinks.map(link => {
            return (
              <NavLink key={link.id} exact to={link.path} activeClassName={styles.active}>
                <img src={link.thumbnail.src} alt={link.thumbnail.alt} />
                { link.title && <span>{link.title}</span> }
              </NavLink>
            )
          })
        }
      </nav>
    </aside>
  );
};
