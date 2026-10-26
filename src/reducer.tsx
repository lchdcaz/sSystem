
export default function Reducer(state:{"username":string;"password":string},actions:{type:"username" | "password";value:string}){

    switch(actions.type){
        
        case("username"):{
            return {...state,"username":actions.value};
        }

        case("password"):{
            return {...state,"password":actions.value};
        }
    }
}