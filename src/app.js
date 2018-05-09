/**
 * Created by JoeLiu on 2017-9-15.
 */
import Vuex from './vuex';
export default {
    components: {

    },
    data () {
        let _this=this;
        return {
            showdata:null,
        }
    },
    beforeCreate(){
        
    },
    created() {
       
    },
    mounted(){
        
    },
    destroyed() {

    },
    methods: {
        intext(){
            this.$router.push('/test');
        },
        inhome(){
            this.$router.push('/home');
        },
        activeIndex(){},
        handleSelect(){}
    }
}