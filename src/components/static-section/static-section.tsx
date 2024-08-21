import { RenderWidgetService, WidgetContext, htmlAttributes } from '@progress/sitefinity-nextjs-sdk';
import { StaticSectionEntity } from './static-section.entry';

export const StaticSection = (props: WidgetContext<StaticSectionEntity>) => {
    return (
        <div {...getStaticSectionAttributes(props)}>
            {props.model.Children.map((child) => {
                return RenderWidgetService.createComponent(child, props.requestContext);
            })}
        </div>
    );
};

const getStaticSectionAttributes = (props: WidgetContext<StaticSectionEntity>): { [key: string]: any } => {
    const viewType = props.model.Properties.ViewType;
    const dataAttributes = htmlAttributes(props);
    if (props.requestContext.isEdit) {
        dataAttributes['data-sfcontainer'] = 'Container';
        dataAttributes['data-sfplaceholderlabel'] = 'Container';
    }

    const attributes: { [key: string]: any } = {
        ...dataAttributes,
        className: `${viewType.toLowerCase()} ${dataAttributes.className}`,
    };

    delete attributes['data-sfisempty'];

    return attributes;
};
