export default function (Alpine) {
    Alpine.directive('global', (el, { value, modifiers, expression}) => {
        try {
            if (!global.Components) {
                global.Components = {};
            }

            global.Components[expression] = el._x_dataStack[0];
        } catch (e) {
            let message = "It is not possible to connect the component {" + expression + "} as a global. Error: " + e.message;
            console.error(message)
        }
    });
}