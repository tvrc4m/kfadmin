
export default {
    state:{
        user:{
            auth_key:"812"
        }
    },
    mutations:{
        login(state,user){
            state.user.auth_key=user
        },
        login(state){
            state.user.auth_key=null
        }
    }
}