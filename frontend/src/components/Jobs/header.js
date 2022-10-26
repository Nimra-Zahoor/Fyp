import React from 'react';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
function Header() {
    return(
       
        <Container maxWidth='xxl'>
        <Typography component="div" style={{ 
                backgroundColor: '#042c4b', height: '5vh', textAlign: 'center',
                padding: '15px',
            
        }}>
          Post Jobs
        </Typography>
      </Container>
    )
}
export default Header;