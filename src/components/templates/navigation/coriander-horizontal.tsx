import { combineClassNames } from '@progress/sitefinity-nextjs-sdk';
import { NavigationEntity, NavigationViewProps, getClass } from '@progress/sitefinity-nextjs-sdk/widgets';
import { NavigationItem } from '@progress/sitefinity-nextjs-sdk/rest-sdk';
import { getUniqueId, sanitizeTemplateValue } from '@utils';
import { getNavigationDictionaries } from '@localization';
import Link from 'next/link';

export const CorianderHorizontal = async ({
    navCustomAttributes,
    items,
    attributes,
    widgetContext,
}: NavigationViewProps<NavigationEntity>) => {
    let navbarId = getUniqueId('navbar');
    const dict = await getNavigationDictionaries(widgetContext.requestContext.culture);

    return (
        <div {...attributes}>
            <nav className='navbar navbar-dark navbar-expand-xl col-12' {...navCustomAttributes}>
                <button
                    className='navbar-toggler'
                    type='button'
                    data-bs-toggle='collapse'
                    data-bs-target={`#${navbarId}`}
                    aria-controls={`#${navbarId}`}
                    aria-expanded='false'
                    aria-label={dict.AreaLabel}
                >
                    <span className='navbar-toggler-icon' />
                </button>
                <div className='collapse navbar-collapse' id={navbarId}>
                    <ul className='navbar-nav mb-md-0 flex-wrap'>
                        {items.map((node: NavigationItem, idx: number) => {
                            return renderRootLevelNode(node, idx);
                        })}
                    </ul>
                </div>
            </nav>
        </div>
    );
};

const renderRootLevelNode = (node: NavigationItem, idx: number) => {
    const navbarDropdownId = getUniqueId(`navbarDropdownMenuLink-${node.Key}`);
    if (node.ChildNodes.length > 0) {
        {
            return (
                <li key={idx} className={combineClassNames('nav-item', 'dropdown', getClass(node))}>
                    <Link
                        className='nav-link dropdown-toggle cl-txt-main-nav-color text-uppercase d-flex align-items-center justify-content-center py-0'
                        href='#'
                        id={navbarDropdownId}
                        data-bs-toggle='dropdown'
                        aria-haspopup='true'
                        aria-expanded='false'
                    >
                        {sanitizeTemplateValue(node.Title)}
                    </Link>
                    <ul className='dropdown-menu' aria-labelledby={navbarDropdownId}>
                        {renderSubLevelsRecursive(node)}
                    </ul>
                </li>
            );
        }
    }
    return (
        <li key={idx} className='nav-item'>
            <Link
                className={combineClassNames('nav-link cl-txt-main-nav-color text-uppercase py-0', getClass(node))}
                href={node.Url}
                target={node.LinkTarget}
            >
                {sanitizeTemplateValue(node.Title)}
            </Link>
        </li>
    );
};

const renderSubLevelsRecursive = (node: NavigationItem) => {
    {
        return node.ChildNodes.map((childNode, idx: number) => {
            if (childNode.ChildNodes.length) {
                return (
                    <li key={idx} className='dropdown-submenu'>
                        <Link
                            className={combineClassNames('dropdown-item', getClass(childNode))}
                            href={childNode.Url}
                            target={childNode.LinkTarget}
                        >
                            {childNode.Title}
                            <svg
                                xmlns='https://www.w3.org/2000/svg'
                                width='16'
                                height='16'
                                fill='currentColor'
                                className='bi bi-caret-right-fill'
                                viewBox='0 0 16 16'
                            >
                                <path d='M12.14 8.753l-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z' />
                            </svg>
                        </Link>
                        <ul className='dropdown-menu'>{renderSubLevelsRecursive(childNode)}</ul>
                    </li>
                );
            }

            return (
                <li key={idx}>
                    <Link
                        className={combineClassNames('dropdown-item', getClass(childNode))}
                        href={childNode.Url}
                        target={childNode.LinkTarget}
                    >
                        {sanitizeTemplateValue(childNode.Title)}
                    </Link>
                </li>
            );
        });
    }
};
