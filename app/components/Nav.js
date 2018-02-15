import React from 'react';
/**
 * Link and NavLink renders a anchor tag.
 * But, Link is just the fundamentals from creating a anchor tag.
 * And NavLink is good to dynamically change the style of the anchor tag.
 * - Note: NavLink composes Link but adds extra properties
 */
import { NavLink } from 'react-router-dom';

const Nav = () => (
  <ul className='nav'>
    <li>
      {/* exact: specifies ReactRouter to add activeClassName
        * to exact path.
        */}
      <NavLink exact activeClassName='active' to='/'>
        Home
      </NavLink>
    </li>
    <li>
      <NavLink activeClassName='active' to='/battle'>
        Battle
      </NavLink>
    </li>
    <li>
      <NavLink activeClassName='active' to='/popular'>
        Popular
      </NavLink>
    </li>
  </ul>
)

export default Nav;
