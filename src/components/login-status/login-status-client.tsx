'use client';

import { WidgetModel } from '@progress/sitefinity-nextjs-sdk';
import { LoginStatusEntity } from './login-status-entity';
import { UserDto } from '@progress/sitefinity-nextjs-sdk/rest-sdk';
import Link from 'next/link';
import { sanitizeTemplateValue } from '@utils';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

/**
 * This component needs to be a client component because when logging out on home page it does not update the user status.
 * My best guess is that when redirecting to the home page (after clicking on the logout option) it actually redirect
 * to the same url and that is the reason why the login status stays unchanged.
 */
export const LoginStatusClient = ({
    model,
    user,
    loginPageUrl = '',
    registrationPageUrl = '',
}: LoginStatusClientProps) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        setIsAuthenticated(user.IsAuthenticated);
    }, [user.IsAuthenticated]);

    return isAuthenticated ? (
        <UserInfo user={user} logoutLabel={model.Properties.LogoutLabel} setIsAuthenticated={setIsAuthenticated} />
    ) : (
        <NoAuthenticatedUser model={model} loginPageUrl={loginPageUrl} registrationPageUrl={registrationPageUrl} />
    );
};

const UserInfo = ({ user, logoutLabel, setIsAuthenticated }: UserInfoProps) => {
    const path = '/Sitefinity/SignOut';
    const { FirstName, LastName } = user;
    const username = `${FirstName || ''} ${LastName || ''}`.trim();
    const router = useRouter();

    const logoutHandler = () => {
        setIsAuthenticated(false);
        router.push(path);
    };

    return (
        <div className='align-items-center d-flex'>
            <span
                title={username}
                className='cl-txt-main-nav d-lg-inline d-none mx-4 text-capitalize text-truncate -cl-max-width-10-em'
            >
                {username}
            </span>
            <Link
                className='text-decoration-none d-flex justify-content-center align-items-center rounded-5 -user-icon'
                href='#'
                role='button'
                id='dropdownMenuLink'
                data-bs-toggle='dropdown'
                aria-expanded='false'
                aria-label='Account Dropdown Button'
            />
            <ul className='dropdown-menu p-0' aria-labelledby='dropdownMenuLink'>
                <li className='border-bottom border-secondary d-lg-none nav-item'>
                    <span className='dropdown-item'>{sanitizeTemplateValue(username)}</span>
                </li>
                <li className='nav-item'>
                    <span className='dropdown-item' onClick={logoutHandler} style={{ cursor: 'pointer' }}>
                        {logoutLabel}
                    </span>
                </li>
            </ul>
        </div>
    );
};

const NoAuthenticatedUser = ({ model, loginPageUrl, registrationPageUrl }: Omit<LoginStatusClientProps, 'user'>) => {
    return (
        <div className='d-flex justify-content-around align-items-center flex-column flex-md-row'>
            {registrationPageUrl && (
                <Link className='cl-txt-main-nav-color rounded-0 me-md-3' href={registrationPageUrl} target='_self'>
                    {model.Properties.RegisterLabel}
                </Link>
            )}
            {loginPageUrl && (
                <Link className='btn btn-primary cl-txt-white rounded-0' href={loginPageUrl} target='_self'>
                    {model.Properties.LoginLabel}
                </Link>
            )}
        </div>
    );
};

interface LoginStatusClientProps {
    model: WidgetModel<LoginStatusEntity>;
    user: UserDto;
    loginPageUrl?: string;
    registrationPageUrl?: string;
}

interface UserInfoProps extends Omit<LoginStatusClientProps, 'model' | 'registrationPageUrl'> {
    logoutLabel: string;
    setIsAuthenticated: (isAuthenticated: boolean) => void;
}
