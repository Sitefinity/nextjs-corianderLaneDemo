# Coriander Lane Demo with Next JS Renderer
This is a sample project for Next JS renderer targeting Coriander lane demo from HostedTrials site. It is a sample demonstrations how you can customize and visualize already created pages and widgets with the our .NetCore renderer. The NextJs renderer is stil not in 

## Setup
+ ### This project is based on Sitefinity NextJS samples starter template:
    + You will need to request a hosted trial demo you can do so on [this url](https://www.progress.com/sitefinity-cms/try-now/get-started/download/hosted).
    + Clone the repo.
    + Run in the console **"npm i"**.
    + Go to .env.development file and set the 'SF_CMS_URL' variable to point to the URL of the CMS which was provided from the Hosted Trial.
    + Run the project with the command **"npm run dev"**

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

