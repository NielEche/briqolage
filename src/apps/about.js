import React, { useState, useEffect } from "react";
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
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import '../styles/screen.css';

import Contentful from '../utils/contentful'

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

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}



export default function About() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const query = `
    {
      aboutPageCollection {
        items {
          content
        }
      }
    }
  `

  const [aboutPageContent, setAboutPageContent] = useState('')

  useEffect(() => {
    Contentful.get(query)
      .then(({ data, errors }) => {
        if (errors) {
          console.error(errors);
        }

        // rerender the entire component with new data
        setAboutPageContent(data.aboutPageCollection.items[0].content);
      });
  }, []);

  return (
    <div>
      <Button className="abtTypo" sx={{px: 0}} onClick={handleClickOpen}>
        <Typography sx={{fontSize: 12}} variant="body2" gutterBottom>
          About
        </Typography>
      </Button>


      <Button  className="abtImg" onClick={handleClickOpen}>
        <Tooltip title=" About">
              <img id="aboutIcon" alt="about" src="https://res.cloudinary.com/nieleche/image/upload/v1669859352/aboutbriq_grwbqc.png"  width={120} height={120}  />
              </Tooltip>
      </Button>

      
      <Dialog
        open={open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title">

        <AppContainer>
          <DialogTitle style={{ cursor: 'move',   border: '3px solid black;' }} id="draggable-dialog-title">
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
            </div>
          
          </DialogTitle>
          
          <DialogContent className='DIALOGRESIZE'>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                <Tab sx={{ color: 'gray', fontSize: 13, fontWeight: 'bold' }} label="About Briqolage" {...a11yProps(0)} />
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
              
                <Typography  variant="body2" gutterBottom sx={{
                    width: '100%',
                }}>
                  {aboutPageContent}
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
