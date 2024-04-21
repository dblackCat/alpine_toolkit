document.addEventListener('alpine:init', () => {
    Alpine.directive('connect', (el, { value, modifiers, expression}) => {
        let socketName = '';

        try {
            socketName = modifiers[0]
        } catch (e) {
            console.error('The x-connected syntax is incorrect. Usage example: x-connected.{socketName}="alias"')
        }

        try {
            let socketSelector  = '[x-socket="' + socketName + '"]';

            let socketComponent    = document.querySelector(socketSelector)._x_dataStack[0];

            if (!socketComponent.connected) {
                socketComponent.connected = {};
            }

            socketComponent.connected[expression] = el._x_dataStack[0];
        } catch (e) {
            let message = "It is not possible to connect the component {" + expression + "} to the socket {" + socketName + "}. Check if they exist."
            console.warn(message)
        }
    });
});


