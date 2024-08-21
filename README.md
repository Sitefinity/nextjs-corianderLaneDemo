# Coriander Lane Demo with Next JS Renderer
This is a Next JS renderer for Coriander lane demo HostedTrials site, it is a sample demonstrations how you can customize and visualize already created pages and widgets with the our .NetCore renderer. The NextJs renderer is stil not in 

## Setup
This project is based on Sitefinity NextJS samples starter template
For additional setup instructions, see [Setup](https://github.com/sitefinity/nextjs-samples).

You will need to request a hosted trial demo and afterwards connect the renderer to that instance.

## Migration
When building a Next JS renderer for an existing sitefinity site everything should work out of the box.
However in some rare cases you may need to:
+ ### Remap widget templates
    If you have custom widget templates.
    + Open the page/design template where the widget is used.
    + Select the widget.
    + Open the designer of the widget.
    + Go to display settings.
    + Select the correct template from the dropdown.
    + Click on the save button.
    + Click on the publish button.

