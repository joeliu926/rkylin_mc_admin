/**
 * Created by JoeLiu on 2017-9-15.
 */
import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../vuex';
Vue.use(VueRouter);

var login = r => require.ensure([], () => r(require('../modules/login/index.vue')), 'login');

var admin_nav = r => require.ensure([], () => r(require('../modules/admin/nav/index.vue')), 'case_base');
var admin_tree = r => require.ensure([], () => r(require('../modules/admin/tree/index.vue')), 'case_base');

var admin_userlist = r => require.ensure([], () => r(require('../modules/admin/userlist/index.vue')), 'admin_userlist');
var admin_userlist_edit = r => require.ensure([], () => r(require('../modules/admin/userlist/edituser/index.vue')), 'admin_userlist_edit');

var routerConfig = {
    linkActiveClass: 'active',
    routes: [
        {
            name:'/',
            path: '/',
            components:{
                default:admin_userlist,
                nav:admin_nav
            }
        },
        {
            name:'/login',
            path: '/login',
            component:login
        },
        {
            name:'/test',
            path: '/test',
            components:{
                default:test,
                nav:nav
            }
        },
        {
            name:'/admin/userlist',
            path: '/admin/userlist',
            components:{
                default:admin_userlist,
                nav:admin_nav
            }
        }, {
            name:'/admin/userlist/edit',
            path: '/admin/userlist/edit/:id',
            components:{
                default:admin_userlist_edit,
                nav:admin_nav
            }
        }
    ]
}

var router = new VueRouter(routerConfig);

router.beforeEach((to, from, next)=>{
    let path=to.path;
    if(path=='/login'){
        next();
        return;
    }else{
      
        if(localStorage.yxsz_userInfo){
            store.state.userInfo=JSON.parse(localStorage.yxsz_userInfo);
        }
        
        if(store.state.userInfo){
            next();    
        }else{
            return next({path:'/login'});
        }
    }
});

export default router;