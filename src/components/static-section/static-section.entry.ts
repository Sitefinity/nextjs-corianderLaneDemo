import { WidgetEntity, ViewSelector } from '@progress/sitefinity-widget-designers-sdk';

@WidgetEntity('StaticSection', 'StaticSection')
export class StaticSectionEntity {
    @ViewSelector([
        { Name: 'Container', Value: 'Container' },
        { Name: 'ContainerFluid', Value: 'ContainerFluid' },
        // { Name: 'TwoMixed', Value: 'TwoMixed' },
        // { Name: 'ThreeAutoLayout', Value: 'ThreeAutoLayout' }
    ])
    ViewType: string = 'Container';
}
