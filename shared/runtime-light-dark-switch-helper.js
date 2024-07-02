const ldsSrc = $('script[src$="lightDarkSwitch.js"]').attr('src');
const { ModeToggle } = await import(ldsSrc);

window.h2lLightDarkSwitchInitialize(ModeToggle);
