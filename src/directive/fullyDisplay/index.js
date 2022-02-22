import fullyDisplay from './fullyDisplay'
const install = function(Vue) {
    Vue.directive('fullyDisplay', fullyDisplay)
}

if (window.Vue) {
    window.fullyDisplay = fullyDisplay
    Vue.use(install); // eslint-disable-line
}

fullyDisplay.install = install
export default fullyDisplay