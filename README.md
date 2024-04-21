There are 2 components in the repository that will 
help make it easier for you to develop on Alpine.js.

Plugins are relatively simple, there is more of a demonstration 
of the ideology of component development. Someone will like it, 
someone will not.

## Alpine.js - xGlobal plugin

The plugin allows you to set a component globally, so that it would 
be accessible from any other component or simple js code.

I use this plugin for modal windows, menus and sometimes for 
pop-up messages.

### Simple example of usage:

```html
<div x-data="{message: 'test'}" x-global="myComponent"></div>

<div x-data="{}">
    <!-- Anonymous component -->
    <span x-text="Components.myComponent.message"></span>
</div>
```

### It's that simple! The example below is a little more complicated:

```html
<p>Anonymous component - x-data="{}"</p>

<div x-data="{}" class="actions">
    <a href="#" @click.prevent="Components.alert.show('Success', 'success')">Show success alert</a>
    <a href="#" @click.prevent="Components.alert.show('Info', 'info')">Show info alert</a>
    <a href="#" @click.prevent="Components.alert.show('Danger', 'danger')">Show danger alert</a>
    <a href="#" @click.prevent="Components.alert.hide()">Close alert</a>
</div>

<p>Global component x-data="alert" x-global="alert"</p>
<div class="alert" x-global="alert" x-data="alert" x-bind="bindAlert"></div>

<script>
    /**
     * Alert demo component
     */
    document.addEventListener('alpine:init', () => {
        Alpine.data('alert', () => ({
            message: null,
            type: null,
            
            show(message, type = 'danger') {
                this.message = message;
                this.type    = type;
            },
            
            hide() {
                this.message = null;
                this.type    = null;
            },
            
            bindAlert: {
                [':class']() {
                    let classList = '';

                    if (this.message) {
                        classList += '--active ';
                    }

                    classList += 'alert__' + this.type;

                    return classList;
                },
                ['x-text']() {
                    return this.message;
                },
                ['@click']() {
                    this.hide();
                }
            },
        }));
    });
</script>
```
> In order to make the component global, you need to specify 
**x-global="{alias}"** and after initializing alpine.js you will be 
able to access it through the global **Components.alias** object

### How it works

1. Specify the x-global="{componentAlias}" directive to your component
2. Get a link to your component from any js code Components.{componentAlias}

### How to install

```html
<script src="https://unpkg.com/alpinejs" defer></script>
<script src="src/x-global/x-global.js"></script>
```

## Alpine.js - xSocket plugin

The purpose of this plugin is to solve the problem 
of inter-component interaction.

For example, you have many forms and each has a preloader and alert. 
If you don't want to write the same bindings for these elements, 
then you can pack them into separate components and connect 
them to a socket.

### Usage example

```html
<p>Anonymous component - x-data="{}"</p>

<div x-data="{}" x-socket="form" class="actions">
    <a href="#" @click.prevent="connected.alert.show('Success', 'success')">Show success alert</a>
    <a href="#" @click.prevent="connected.alert.show('Info', 'info')">Show info alert</a>
    <a href="#" @click.prevent="connected.alert.show('Danger', 'danger')">Show danger alert</a>
    <a href="#" @click.prevent="connected.alert.hide()">Close alert</a>
    
    <p>Nested component x-data="alert" x-socket.form="alert"</p>
    <div class="alert" x-socket.form="alert" x-data="alert" x-bind="bindAlert"></div>
</div>

<script>
    /**
     * Alert demo component
     */
    document.addEventListener('alpine:init', () => {
        Alpine.data('alert', () => ({
            message: null,
            type: null,
            
            show(message, type = 'danger') {
                this.message = message;
                this.type    = type;
            },
            
            hide() {
                this.message = null;
                this.type    = null;
            },
            
            bindAlert: {
                [':class']() {
                    let classList = '';

                    if (this.message) {
                        classList += '--active ';
                    }

                    classList += 'alert__' + this.type;

                    return classList;
                },
                ['x-text']() {
                    return this.message;
                },
                ['@click']() {
                    this.hide();
                }
            },
        }));
    });
</script>
```

It is impossible to manage a nested component in alpine itself. 
To do this, you need to pass a link from the nested one to the 
parent one. This plugin only automates this process by adding 
two new directives.

### How it works

1. Specify the component to connect to **x-socket="{socket_name}"**
2. Specify the component that we want to connect **x-connect.{socket_name}="{componentAlias}"**

> Important! When naming sockets, use snake_case. If you use 
> camelCase, you will get unexpected behavior and malfunction of 
> the plugin. The problem is that when specifying the 
> x-connected.MySocket="MyComponent" directive, alpinejs will 
> convert string MySocket to mysocket under the hood.

### How to install

```html
<script src="https://unpkg.com/alpinejs" defer></script>
<script src="src/x-socket/x-socket.js"></script>
```