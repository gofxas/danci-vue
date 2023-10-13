// 这个文件 用于自动的合并store文件夹下面vuex 内容,每一个单文件作为一个vuex的module使用

import { createStore } from 'vuex'
const isWebpack = !import.meta.env;
console.log(isWebpack?'是WEBPACK':'不是WEBPACK')
const files = isWebpack?require.context('./', true, /^\.\/.*\.js$/):import.meta.glob('./*.js',{eager: true});
const filenames = isWebpack?files.keys():Object.keys(files);
let storeData = {};

if (typeof storeData !== 'function') {
    storeData.modules = storeData.modules || {};
    for (let filename of filenames) {
        if (filename === './index.js') {
            continue;
        }
        let name = filename.replace(/^\.\//, '').replace(/\.js$/, '');
        let paths = name.split('/');
        let module = getModuleNamespace(storeData, paths);
        name = paths.pop();
        module[name] = getModule(filename);
        module[name].namespaced = true;
    }
}

const store = createStore(storeData);

/**
 * get module by file name
 * this module or state must be a function which returns a Vuex instance of fresh state instance
 *
 * @param {string} filename filename
 * @return {*}
 */
function getModule(filename) {
    const file = isWebpack?files(filename):files[filename];
    const module = file.default || file;

    if (module.commit) {
        throw new Error(
            'store/' + filename.replace('./', '') + ' should export a method which returns a Vuex instance.'
        );
    }

    if (module.state && typeof module.state !== 'function') {
        throw new Error(
            'state should be a function in store/' + filename.replace('./', '')
        );
    }
    return module;
}
/**

 * get module namespace
 *
 * @param {Object} storeData store
 * @param {Array.<string>} paths path
 * @return {Object}
 */
function getModuleNamespace(storeData, paths) {
    if (paths.length === 1) {
        return storeData.modules;
    }

    let namespace = paths.shift();
    let nsModule = storeData.modules[namespace] = storeData.modules[namespace] || {};
    nsModule.namespaced = true;
    nsModule.modules = nsModule.modules || {};

    return getModuleNamespace(nsModule, paths);
}

export default store;