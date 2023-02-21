import React from 'react';
import styledd from "styled-components";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Paper from '@mui/material/Paper';
import Draggable from 'react-draggable';
import Brightness1Icon from '@mui/icons-material/Brightness1';
import Typography from '@mui/material/Typography'; 
import Tooltip from '@mui/material/Tooltip';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import '../styles/screen.css';

import Artworks from '../components/artworks/artworks'


function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};


export default function Gallery() {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  

  


  return (
    <div>
      <Button className='artsec' onClick={handleClickOpen}>
       
        <Tooltip title="Briq Art">
          <img  label="briq ART" src="https://res.cloudinary.com/nieleche/image/upload/v1676945963/art_s9ina0.png"  width={150} height={150}  />
        </Tooltip>
      </Button>

      
      <Dialog
        open={open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title">

        <AppContainer>
          <DialogTitle style={{ cursor: 'move', p: '0',  border: '3px solid black;' }} id="draggable-dialog-title">
            <div className="DialogTags">
              <DialogActions className="DialogTags" > 
                  <Brightness1Icon sx={{ 
                      left: 8,
                      top: 2,
                      cursor: 'pointer',
                      fontSize: 'small',
                      pl: '0px',
                      color: '#FF4A92'}} autoFocus onClick={handleClose} />

                      <Brightness1Icon sx={{ 
                      left: 8,
                      top: 2,
                      cursor: 'pointer',
                      fontSize: 'small',
                      pl: '0px',
                      color: '#FFCF14'}} autoFocus onClick={handleClose} />

                      <Brightness1Icon sx={{ 
                      left: 8,
                      top: 2,
                      cursor: 'pointer',
                      fontSize: 'small',
                      pl: '0px',
                      color: '#3D6AFC'}} autoFocus onClick={handleClose} />
              
              </DialogActions>

              <Typography  variant="body2" gutterBottom sx={{
                    width: '100%',
                    pt: '0.4rem',
                    textAlign: 'center',

                }}>
                    Artworks
                </Typography>
            </div>
          
          </DialogTitle>
          
          <DialogContent className='DIALOGRESIZE'>
            <Box sx={{ borderBottom: 2, borderColor: 'black' }}>
            </Box>
              
            <Artworks className="ArtworksCon" />
          </DialogContent>
        </AppContainer>
      </Dialog>
    </div>
  );
}

document.getElementById('root')


const AppContainer = styledd.div`
	transition: all 0.5s ease;
	margin-left: ${(p) => (p.libraryStatus ? "20rem" : "0")};
	@media screen and (max-width: 768px) {
		margin-left: 0;
	}
`;


