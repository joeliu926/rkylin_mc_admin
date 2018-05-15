/**
 * Created by JoeLiu on 2017-9-15.
 */
/*import AdInput from 'adminUI/components/admin-input.vue';*/
import store from '../../vuex';
var rsaService = require('node-rsa');
export default {
    components: {

    },
 
    data () {
     return{
         sName:"",
         sPassword:"",
         alertPhone:false,
         alertPassword:false,
         alertWaring:false,
     }
    },
    created() {

    },
    mounted(){
 
    },
    destroyed() {

    },
    methods: {
        clearwaring($event,value){
            this.alertWaring = false;
            this.alertPhone = false;
            this.alertPassword = false;
        },
        fLogin(){
            let _this  = this;
            let sUName=_this.sName.trim();
            let sUPassword=_this.sPassword.trim();
            if(sUName==""){
                _this.alertPhone = true;
                _this.alertWaring = false;
                return false;
            }
            if(sUPassword==""){
                _this.alertPassword = true;
                _this.alertWaring = false;
                return false;
            }
            _.ajax({
                url: '/api/user/login',
                method: 'POST',
                data:{
                    loginName:sUName,
                    password:sUPassword
                },
                success: function (res,textStatus, request) {
                    if(res.code==0) {
                        store.state.userInfo =res.data;
                        localStorage.yxsz_userInfo=JSON.stringify(store.state.userInfo);
                        _this.$router.push("/");
                    }else if(res.code==3009)
                    {
                        this.$message.error("用户已被禁用");
                    }else{
                        _this.alertWaring = true;
                        _this.alertPhone = false;
                        _this.alertPassword = false;
                    }
                }
            });
        },
        fMessageBox(msg) {
            this.$alert(msg, '提示', {
                confirmButtonText: '确定',
            });
        }

    }
}