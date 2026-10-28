type device = {
    img:string;
    deviceID:number;
    deviceModule:string;
    parameter:string;
}


type actions = 
    |{type:"change";status:boolean;}
    |{type:"pic";pic:device}
    |{type:"mount",mount:number}
    |{type:"add"}
    |{type:"cut"}

type state = {
    status:boolean;
    pic:device;
    mount:number;
}

function Reducer(state:{"username":string;"password":string},actions:{type:"username" | "password";value:string}){

    switch(actions.type){
        
        case("username"):{
            return {...state,"username":actions.value};
        }

        case("password"):{
            return {...state,"password":actions.value};
        }
    }
}

function UserReducer(state:state,actions:actions){

    switch(actions.type){

        case("change"):{
            return {...state,status:actions.status,mount:0};
        }

        case("pic"):{
            return {...state,pic:actions.pic};
        }
        case("mount"):{
            return {...state,mount:actions.mount}
        }
        case("add"):{
            return {...state,mount:state.mount + 1}
        }
        case("cut"):{
            if(state.mount == 0 )return {...state,mount:state.mount};
            return {...state,mount:state.mount - 1};
        }
    }
}

export {Reducer,UserReducer}