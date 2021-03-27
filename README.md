# **Software Requirement Specification**

> ### **Name**: SCSS Color palette generator

> ### **Target:** This app is a color generator.
>
> The schema is pretty easy. You choose a color and the app generates a palette. 10 colors for the lighter samples and 10 for the darker ones.

> ### **Features:**

1. You can generate scale of any color.
2. You can see information about any color in palette, such as hex code and percent of changing from original base (darker and lighter)
3. You can copy hex code just by clicking on color container.
4. You can copy a set of pre-created colors as SCSS variables.
5. When form is submitted there is a check for correctness of a typed color. If color is incorrect the field would become red-bordered.

> ### **Full description:**

Every color is shown in own container and all containers are equal for their size among. Every container includes information about color in hex and percent of dark or light variation according to original base color. It's possible to use color palette to choose a base color, or type a hex color code in a field. The field and the palette are synchronous, all typing is double in both places.
Also there is a previews for a chosen color.

> ### **Implementation:**

We create two fields which use the same state. And as typing's going it's altering the mutual state. After a click on button called "generate" we get a color palette.

There are some additional files except `index.tsx` and `App.tsx`.

> SingleColor.tsx

This component implements all it requires to display a single color.

> interfaces.ts

Here is described all types that's been used in the app.

> ScssCode.tsx

This component generates SCSS variables and provides coping it into a clipboard.

> ParticleBackground.tsx

This is for the animated particle background. Also folder `config` and accordingly `particle-config.ts`

# Live Version

Live version is: [here](https://link)
