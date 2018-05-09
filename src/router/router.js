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


var admin_sign_account = r => require.ensure([], () => r(require('../modules/admin/applyaccount/index.vue')), 'admin_sign_account');
var admin_sign_audit = r => require.ensure([], () => r(require('../modules/admin/accountaudit/index.vue')), 'admin_sign_audit');



var routerConfig = {
    linkActiveClass: 'active',
    routes: [
        {
            name:'/',
            path: '/',
            components:{
                default:admin_sign_account,
                nav:admin_nav
            }
        },{
            name:'/login',
            path: '/login',
            component:login
        },{
            name:'/admin/applyaccount',
            path: '/admin/applyaccount',
            components:{
                default:admin_sign_account,
                nav:admin_nav
            }
        },{
            name:'/admin/accountaudit',
            path: '/admin/accountaudit',
            components:{
                default:admin_sign_audit,
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