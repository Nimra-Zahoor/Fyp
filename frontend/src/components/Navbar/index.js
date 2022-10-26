import React from 'react';
import {
Nav,
NavLink,
Bars,
NavMenu,
NavBtn,
NavBtnLink,
} from './NavbarElements';

function Navbar (props) {
return (
	<>
	<div>
	<Nav>
		<Bars />
		<NavMenu>
		<NavLink to='/openjobs' >
			Open Jobs
		</NavLink>
		 {/* <NavLink to='/jobposting'>
			Job Posting
		</NavLink>  */}
		 <NavLink to='/joblist'>
			Job List
		</NavLink> 
		 {/* <NavLink to='/createtest'>
			Create Test
		</NavLink>  */}
		 <NavLink to='/tests'>
			Test List
		</NavLink> 
		<NavLink to= 'JobsbyCompany/'>
			Posted jobs
		</NavLink>
		{/* <NavLink to='/sign-up' >
			Sign Up
		</NavLink> */}
		</NavMenu>
		<NavBtn>
		{/* <NavBtnLink to='/sign-in'>{props.login.auth ? "Sign Up" : "Sign In"}</NavBtnLink> */}

		<NavBtnLink to='/sign-in'>Sign In</NavBtnLink>
		</NavBtn>
	</Nav>
	</div>
	</>
);
};

export default Navbar;
