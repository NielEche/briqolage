import React, {useState} from "react";
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
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import '../styles/screen.css';
import SearchResult from '../components/search/search-results';

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



export default function Search() {
  const [open, setOpen] = React.useState(false);
    

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  return (
    <div>
      <IconButton className="padding0" aria-label="search" color="inherit" onClick={handleClickOpen}>
    
            <SearchIcon sx={{ fontSize: 'medium'}} />
            
        </IconButton>
      
      <Dialog
        open={open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title">

        <AppContainer>
       
          <DialogContent className='DIALOGRESIZE'>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <SearchResult className="ArtworksCon" />
            </Box>

          </DialogContent>
        </AppContainer>
      </Dialog>
    </div>
  );
}

const AppContainer = styledd.div`
	transition: all 0.5s ease;
	margin-left: ${(p) => (p.libraryStatus ? "20rem" : "0")};
	@media screen and (max-width: 768px) {
		margin-left: 0;
	}
`;
