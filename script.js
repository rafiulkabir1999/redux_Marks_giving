const allMatch = document.querySelector('.all-matches')
const addMatch = document.querySelector(".lws-addMatch")
const Total = document.getElementById("Total")

//https://github.com/Learn-with-Sumit/batch-2---assignment-1---scoreboard-rafiulkabir1999



//initialise State
const initialState ={
  match: [
    { 
        total: 0
    }
  ]
}

//Create Reducer
function MatchReducer (state = initialState,action) {
 
//Add Match Action Type
   if(action.type === 'AddMatch'){
    return {
        ...state,
        match : {
            ...state.match,
            [action.payload.index] : {
                ...state.match[action.payload.index],
                total: 0
            }
        }
    }
     
   }

//Increment action type
    if(action.type === 'Increment'){
       if (action.payload.total){
       return{
        ...state,
        match : {
            ...state.match,
            [action.payload.id]: {
                ...state.match[action.payload.id],
                total:state.match[action.payload.id].total + parseFloat(action.payload.total)
            }
        }
       }
        }
    }
//Decrement Action type 
    else if(action.type === "Decrement"){
        if(action.payload.total){
            const updateTotal = {
                ...state,
               match: {
                ...state.match,
               [action.payload.id]:{
                ...state.match[action.payload.id],
                total : state.match[action.payload.id].total - parseFloat(action.payload.total)
               }
                
               }
            }
            if (updateTotal.match[action.payload.id].total <= 0 ){
                return {
                    ...state,
               match: {
                ...state.match,
               [action.payload.id]:{
                ...state.match[action.payload.id],
                total : 0
               }
                }
            }}
            else {
                return updateTotal;
            }
        }
    }

//Reset Action Type
    else if (action.type === 'Reset'){
        
        var superSecret = () => {
            Object.keys(state.match).forEach(function(key){ state.match[key].total = 0 });
            return state.match;
          }
         const match = superSecret()
        return{
              match
             }
        
    }

    else if(action.type === 'RemoveMatch'){
        if(action.payload.id){
          let Remove = state
         delete Remove.match[action.payload.id -1 ]
         return Remove;
        } 
        }
    
        return state;
    
}

//Create redux store
const store = Redux.createStore(MatchReducer)

//Render Function and Subscrbe Method
const render = () => {
    const state = store.getState();

 

   console.log(store.getState())
   //console.log(store.getState().match[0].total)
}
render();
store.subscribe(render)


//Reset Dispatch and Set all value to 0
document.querySelector(".lws-reset").addEventListener('click', () => {
     store.dispatch({
        type:'Reset'
     })
    
     const reset = store.getState().match
     console.log(reset)
  

    const arr = Object.keys(reset)
  
    for ( let i = 0; i < arr.length ; i++ ){
        var id = i+1;
        document.getElementById('Total'+ id).innerText = '0'
       
        }
          



})

//Call Increment Dispatch
const IncrementNumber = (value,id)=> {
 store.dispatch({ 
    type:'Increment',
    payload:{
        total:parseFloat(value),
         id : parseFloat(id-1)
    }

 })

 document.getElementById('Total'+id).innerText = store.getState().match[id - 1].total
}

//Call Decrement Dispatch
const DecrementNumber = (value,id)=> {

    store.dispatch({ 
       type:'Decrement',
       payload:{
           total:parseFloat(value),
            id : parseFloat(id-1)
       }
   
    })

    document.getElementById('Total'+id).innerText = store.getState().match[id - 1].total
   }


//Delete Match Function
const DeleteMatch = (id)=> {
    store.dispatch({
        type:"RemoveMatch",
        payload:{
            id:parseFloat(id-1)
        }
    })
    document.getElementById(id).style.display='none'
}   


// Add another  match 
addMatch.addEventListener('click', () => {
    
    store.dispatch({
                    type:'AddMatch',
                    payload :{ 
                                 index:Object.keys(store.getState().match).length
                              }
                    })
    const id = Object.keys(store.getState().match).length
   

    allMatch.innerHTML += `  
    <div class="match" id=${id} >
    <div class="wrapper">
        <button class="lws-delete" onclick="DeleteMatch(${id})">
            <img src="./image/delete.svg" alt="" />
        </button>
        <h3 class="lws-matchName">Match ${id}</h3>
    </div>
    <div class="inc-dec">
        <form id="incrementForm" class="incrementForm" onsubmit="return false">
            <h4>Increment</h4>
            <input
                type="number"
                name="increment"
                class="lws-increment"
                onchange='IncrementNumber(this.value,${id})'
            />
        </form>
        <form id="decrementForm" class="decrementForm" onsubmit="return false">
            <h4>Decrement</h4>
            <input
                type="number"
                name="decrement"
                class="lws-decrement"
                onchange='DecrementNumber(this.value,${id})'
            />
        </form>
    </div>
    <div class="numbers">
        <h2 id="Total${id}" class="lws-singleResult">0</h2>
    </div>
    </div>`

    
})

