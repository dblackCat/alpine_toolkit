document.addEventListener('alpine:init', () => {
    Alpine.directive('global', (el, { value, modifiers, expression}) => {
        try {
            if (!window.Components) {
                window.Components = {};
            }

            window.Components[expression] = el._x_dataStack[0];
        } catch (e) {
            let message = "It is not possible to connect the component {" + expression + "} as a global. Error: " + e.message;
            console.error(message)
        }
    });
});
