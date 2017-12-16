export default [{
    path: '/',
    name: '首页',
    component: (resolve) => {
        require(['./views/home/Index.vue'], resolve);
    }
}]