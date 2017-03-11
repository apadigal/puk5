var action = {

    type: 'SET_CURRENT_PARTNER' 
}

switch (action.type ) {
    case 'SET_CURRENT_PARTNER': {
                console.log( 'From reducer..'  );
                break;
    }

      default:
        console.log( 'default');         

}
