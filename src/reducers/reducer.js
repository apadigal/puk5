/*

let id = 0;

const reducer = function(state, action) {
  switch (action.type) {
    case 'CHANGE_LANGUAGE':
      return Object.assign({}, state, {
        language: {
          current: action.text,
          id: id++
        }
      })
    
    case 'SET_CURRENT_PARTNER':
     
      return Object.assign({}, state, {
         
        partner: action.partner
      })

    default: 
       // Just return the current state
      return state;
  }
}

*/


export default function (state, action) {

    switch (action.type) {

        case 'SET_CURRENT_PARTNER': {
            return Object.assign({}, state, {
                currentPartner: {
                    id: 1,
                    partner: action.partner
                }
            })
        }

        case 'CHANGE_LANGUAGE': {
            return Object.assign({}, state, {
                language: {
                    current: action.text,
                    id: 1
                }
            })
        }

        default:
            // Just return the current state
            return state;
    }
};
