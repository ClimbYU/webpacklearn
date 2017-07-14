import _ from 'lodash';

/**
 * 最简单的webpack示例
 */
function component() {
    var element = document.createElement('div');

    element.innerHTML = _.join(['Hello', 'webpack'], ' ');

    return element;
}

document.body.appendChild(component());