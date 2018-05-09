/**
 * Created by JoeLiu on 2017-9-15.
 */
/*import AdInput from 'adminUI/components/admin-input.vue';*/
import store from '../../../vuex';
export default {
    components: {},
    data () {
        return {show:false,
            selectedVal:'首页',
            menusList:[],
            userImage:'',
            allowBack:false,
            defaultPic:require("../../../common/img/icon-customer.png"),
            backgroundRight:false,
            clinicName:'',
            userName:'',
            name:''
        };
    },
    created() {
        let _this = this;
        _.ajax({
            url: '/user/getuserinfo',
            method: 'POST',
            success: function (res) {
                _this.name = res.name;
                _this.clinicName = res.clinicName?res.clinicName:'欢迎使用哈罗美云！';
                _this.userName=res.loginName;
                let _menus = res.menus?res.menus:[];
                _this.userImage = res.headImgUrl;

            }
        },'withCredentials');
        this.auth();


    },
    mounted(){
        this.setDefaultRoute();
    },
    destroyed() {

    },
    methods: {
        auth(){
            let _this = this;
            _.ajax({
                url: '/user/getuserinfo',
                method: 'POST',
                success: function (res) {
                    let _menus = res.menus ? res.menus : [];
                   // let backgroundRight = false;
                    _menus.forEach(m => {
                        let menusid = m.split(':')[2];
                        switch (menusid) {
                            case "systembackground":
                                _this.backgroundRight=true;
                               // backgroundRight = true;
                                break;
                        }
                    });
                    if (!_this.backgroundRight) {
                        _this.$router.push('/');
                    }
                }
            }, 'withCredentials');
        },
        setdropdown(params){
            let _this =this;
            switch(params){
                case 'out':
                    this.show=false;
                    break;
                case 'over':
                    //setTimeout(function () {
                    _this.show=true;
                    //},10);
                    break;
                case 'lazyout':
                    // setTimeout(function () {
                    _this.show=false;
                    // },10);
                    break;
            }
        },
        changeshow(){
            if (this.show==false){
                this.show=true
            }else{
                this.show=false
            }
        },
        goback(){
            if(this.allowBack){
                window.history.back();
            }
            //this.$router.push("/customers");
        },
        gohome(){
            this.$router.push("/");
        },
        incustomers(){
            this.$router.push("/customers");
        },
        intest(){
            this.$router.push("/test");
        },
        inhome(){
            this.$router.push("/home");
        },
        fChooseItem(cmd){
            //this.selectedVal = cmd;
            this.$router.push(cmd);
        },
        fLoginOut(cmd){
            let _This=this;
            if (cmd == "loginout") {
 
                store.state.userInfo=null;
                localStorage.yxsz_userInfo='';

                _This.$router.push("/login");
            }else if(cmd=="backfront"){
                _This.$router.push("/");
            }


        },
        setDefaultRoute(){
            if(this.$route.path.indexOf('customer')>=0){
                this.selectedVal = "联系人中心";
            }else if(this.$route.path.indexOf('consultdashboard')>=0){
                this.selectedVal = "咨询台";

            }else if(this.$route.path.indexOf('casecontrol')>=0){
                this.selectedVal = "咨询台";
            }else if(this.$route.path.indexOf('case')>=0){
                this.selectedVal = "案例中心";
            }else if(this.$route.path.indexOf('triage')>=0){
                this.selectedVal = "分诊中心";
            }else {
                this.selectedVal = "首页";
            }
        }
    },
    watch: {
        $route(){
            this.setDefaultRoute();
            this.allowBack=true;
            this.menusList.forEach(item=>{
                if(item.url==this.$route.path){
                    this.allowBack=false;
                }
            });
        }
    }
}