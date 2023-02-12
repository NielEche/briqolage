import React from "react";
import styledd from "styled-components";
import { styled } from '@mui/material/styles';
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
import { pink } from '@mui/material/colors';
import InstaFeeds from './insta/InstaFeeds'
import '../styles/screen.css';

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

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(pink[500]),
  backgroundColor: pink[500],
  '&:hover': {
    backgroundColor: pink[700],
  },
}));


export default function Insta() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(0);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  return (
    <div>
      <Button  className="instasec"  onClick={handleClickOpen}>

        <Tooltip title="Instagram">
              <img alt="instagram"  src="https://res.cloudinary.com/nieleche/image/upload/v1674822636/insta_1_m6lryh.png"  width={110} height={110}  />
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
                        Instagram
                    </Typography>
                </div>
            
            </DialogTitle>
          
          <DialogContent>
            <Box sx={{ borderBottom: 2, borderTop: 2, borderColor: 'black', display: 'flex', justifyContent: 'space-between', p: 2}}>
                <img src="https://res.cloudinary.com/nieleche/image/upload/v1671988936/Instagram_logo.svg_hj7wtg.png"  width={100} height={36} alt="insta"/>
                <ColorButton href="https://www.instagram.com/uzzzoma/" target="_blank" sx={{ border: 2, borderRadius: 10, color: 'black', fontSize: 12, fontWeight: 'bold', px: 3,  borderColor: 'black'}} size="small" variant="contained">FOLLOW</ColorButton>
            </Box>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
           
            </Box>

           
           
           
            <TabPanel value={value} index={0}>
              
            <InstaFeeds token={process.env.REACT_APP_INS_TOKEN} limit={12}/>
            
                <Typography  variant="body2" gutterBottom sx={{
                    width: '100%',

                }}>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been
                 the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley
                  of type and scrambled it to make a type specimen book. It has survived not only five centuries,
                   but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised
                    in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently
                     with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                </Typography>

            
            </TabPanel>
    
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
