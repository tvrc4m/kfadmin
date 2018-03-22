export default {
    data(){
        return {
            total:0,
            page_size:20
        }
    },
    methods:{
        refresh(data){
            this.total=data.total
            this.page_size=data.per_page
        },
    }
}