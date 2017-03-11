import React from 'react';
import DropdownButton from 'react-bootstrap/lib/DropdownButton';
import MenuItem from 'react-bootstrap/lib/MenuItem';

class LanguageChoice extends React.Component {

    onChange( eventKey ) {

        alert( eventKey );

    }
    
    render() {
        
        alert( this.props.locale );
        return ( 

            <DropdownButton title="Language" id="languageSelection" onSelect={this.onChange}>
        
                <MenuItem active={true} eventKey={'en'} href="#books">EN</MenuItem>
                <MenuItem active={false} eventKey={'ja'} href="#books">JP</MenuItem>
     
            </DropdownButton>


        );
    }

}

export default LanguageChoice;