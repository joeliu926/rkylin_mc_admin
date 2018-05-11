
import tree from '../tree/index.vue';
import store from '../../../vuex';
export default {
    components: {
        tree},
    data () {
        return {
            dealoptions:[
                {
                    value: '选项0',
                    label: '待审核'
                },
                {
                    value: '选项1',
                    label: '已核准'
                },
                {
                    value: '选项2',
                    label: '已拒绝'
                },
            ],
            dealvalue: "待审核",
            searchVal:"",
            applyList:[]
        };
    },
    created() {
       // this.getRolelist(1);
    },
    methods: {
       
        
    }
}