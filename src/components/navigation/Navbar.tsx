import React, { useContext } from "react";
import { Link } from 'react-router-dom'
import { routes } from "@routes";
import { AuthUser } from "api-ts-axios";
import LogoutButton from "@components/buttons/LogoutButton";
import { AuthContext, AuthContextType } from "@context/authContext";
import ApiDocsSelector from "@components/selectors/ApiDocsSelector";

interface Props {
  user?: AuthUser
}
const Navbar: React.FC<Props> = ({ user }) => {
  const { permissions } = useContext(AuthContext) as AuthContextType
  const { api: { horizon, telescope, documentation } } = permissions
  const canViewAPiSelector = horizon && telescope && documentation

  const onApiDocsChange = (uri: string) => {
    // @ts-ignore
    window.open(uri, '_blank').focus();
  }
  const authItems = () => (
    <>
      {canViewAPiSelector && <ApiDocsSelector horizon={horizon} telescope={telescope} documentation={documentation} onChange={uri => onApiDocsChange(uri)} />}
      <Link to={routes.auth.profile.path} className='p-4'>{routes.auth.profile.name}</Link>
      <Link to={routes.auth.accessTokens.path} className='p-4'>{routes.auth.accessTokens.name}</Link>
      <Link to={routes.auth.resetPassword.path} className='p-4'>{routes.auth.resetPassword.name}</Link>
      {permissions.users.list && <Link to={routes.users.index.path} className='p-4'>{routes.users.index.name}</Link>}
      <LogoutButton />
    </>
  )
  const items = () => (
    <>
      <Link to={routes.auth.login.path} className='p-4'>{routes.auth.login.name}</Link>
      <Link to={routes.register.path} className='p-4'>{routes.register.name}</Link>
    </>
  )
  return (
    <nav className='flex justify-between items-center h-12 bg-white text-black relative shadow-sm font-mono' role='navigation'>
      <Link to={routes.home.path} className='pl-8'>{routes.home.name}</Link>
      <div className="px-4 cursor-pointer md:hidden">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
        </svg>
      </div>
      <div className='pr-8 md:block hidden'>
        {user ? authItems() : items()}
      </div>
    </nav>
  )
}

export default Navbar