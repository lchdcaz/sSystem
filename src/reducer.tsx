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
    |{type:"apply",data:data[]}
    |{type:"new",data:data}
    |{type:"context",value:number}
    |{type:"nav",value:boolean}
    |{type:"nav1",value:boolean}

type state = {
    status:boolean;
    pic:device;
    mount:number;
    apply:data[];
    context:number;
    nav:boolean;
    nav1:boolean;
}

type data = {
    id:number,
    device:string,
    requestid:number,
    user_id:string,
    status:number
}


type adminstate = Pick<state,"status"> & {
    data:data[];
    select:number;
}

type adminActions = 
    |{type:"change",value:boolean}
    |{type:"data",value:data[]}
    |{type:"select",value:number}
    |{type:"datachange",value:string}


function Reducer(state:{"username":string;"password":string},actions:{type:"username" | "password";value:string}){

    switch(actions.type){
        
        case("username"):{
            return {...state,"username":actions.value};
        }

        case("password"):{
            return {...state,"password":actions.value};
        }
        default:{
            alert("报错，请重试");
            return state;
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
        case("apply"):{
            return {...state,apply:actions.data}
        }
        case("new"):{
            return {...state,apply:[...state.apply,actions.data]}
        }
        case("context"):{      
            console.log(state.context,actions.value)
            return {...state,context:(state.context == actions.value)?0:actions.value}
        }
        case("nav"):{
            return {...state,nav:(actions.value) ? false : true}
        }
        case("nav1"):{
            return {...state,nav1:(actions.value) ? false : true}
        }
        default:{
            alert("报错，请重试");
            return state;
        }
    }
}

function AdminReducer(state:adminstate,actions:adminActions){
    switch(actions.type){

        case("change"):{
            return {...state,status:actions.value};
        }

        case("data"):{
            return {...state,data:actions.value};
        }

        case("select"):{
            return {...state,select:actions.value}
        }
        
        case("datachange"):{
            return {...state,data:state.data.map((items)=>{
                return (items.id === state.select)?{...items,status:(actions.value == "agree"?1:2)}:items
                })}
            }
        default:{
            alert("报错，请重试");
            return state;
        }
        }
}

export {Reducer,UserReducer,AdminReducer}