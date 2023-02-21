import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import Box from "@mui/material/Box";
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import '../styles/screen.css';
import Music from '../apps/music';
import About from '../apps/about';
import Gallery from '../apps/gallery';
import Insta from '../apps/insta';
import Help from '../apps/help';
import Favourite from '../apps/favourite';
import Search from '../apps/search';
import Draggable from 'react-draggable';


const Home = ({ session }) =>  {
  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState(null)
  const [website, setWebsite] = useState(null)
  const [avatar_url, setAvatarUrl] = useState(null)

  useEffect(() => {
    getProfile()
  }, [session])

  const getProfile = async () => {
    try {
      setLoading(true)
      const { user } = session

      let { data, error, status } = await supabase
        .from('profiles')
        .select(`username, website, avatar_url`)
        .eq('id', user.id)
        .single()

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setUsername(data.username)
        setWebsite(data.website)
        setAvatarUrl(data.avatar_url)
      }
    } catch (error) {
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  const updateProfile = async (e) => {
    e.preventDefault()

    try {
      setLoading(true)
      const { user } = session

      const updates = {
        id: user.id,
        username,
        website,
        avatar_url,
        updated_at: new Date(),
      }

      let { error } = await supabase.from('profiles').upsert(updates)

      if (error) {
        throw error
      }
    } catch (error) {
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }


  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


  const current = new Date().toLocaleString('en-us', {weekday:'short'});
  const date = current.toString().split(' ')[0]; 

  const time = new Date().toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });



  return (
    <>   
      <Box component="span" className="MainMenu" sx={{position: 'fixed', top: 0, left: 0, right: 0 }}>
        <div>
          <ul className='MenuTag'>
                <li>
                  <div>
                    <PopupState variant="popover" popupId="demo-popup-menu">
                    {(popupState) => (
                      <React.Fragment>
                        <Button  className="HomeMenu" {...bindTrigger(popupState)}>
                        B Menu
                        </Button>
                        <Menu {...bindMenu(popupState)}>
                          <MenuItem onClick={popupState.close}>Screen Saver</MenuItem>
                          <MenuItem onClick={popupState.close}>Pick Playist</MenuItem>
                          <MenuItem onClick={popupState.close}>Login</MenuItem>
                        </Menu>
                      </React.Fragment>
                    )}
                    </PopupState>
                  </div>
                </li>
                <li className="abouttext">
                    <About/> 
                </li>
                <li>
                    <Help/>
                </li>
          </ul>
        </div>

        <div>
          <ul className='MenuTag MTright'>
                <li>
                    <IconButton className="padding0" aria-label="account" color="inherit">
                      <VolumeUpIcon sx={{ fontSize: 'medium'}} />
                    </IconButton>
                </li>
                <li>
                  <div>
                    <Button
                      id="demo-positioned-button1"
                      aria-controls={open ? 'demo-positioned-menu1' : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? 'true' : undefined}
                      onClick={handleClick}
                      sx={{color: 'white'}}
                    >
                       <IconButton className="padding0" aria-label="account" color="inherit">
                        <AccountCircleIcon sx={{ fontSize: 'medium'}} />
                      </IconButton>
                    </Button>
                    <Menu
                      id="demo-positioned-menu1"
                      aria-labelledby="demo-positioned-button1"
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                      anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                      }}
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                      }}
                    >
                      <MenuItem>
                      <div className="aligncenter" aria-live="polite">
                        {loading ? (
                          'Saving ...'
                        ) : (
                          <form onSubmit={updateProfile} className="form-widget">
                            {/*<div>
                              <label htmlFor="username"> {session.user.email}</label>
                        </div>*/}
                            <div>
                              <label htmlFor="username">Name</label>
                              <input
                                id="username"
                                type="text"
                                value={username || ''}
                                onChange={(e) => setUsername(e.target.value)}
                              />
                            </div>
                            {/*<div>
                              <label htmlFor="website">Website</label>
                              <input
                                id="website"
                                type="url"
                                value={website || ''}
                                onChange={(e) => setWebsite(e.target.value)}
                              />
                            </div>*/}
                            <div>
                              <button className="button primary" disabled={loading}>
                                Update profile
                              </button>
                            </div>
                          </form>
                        )}
                        <button type="button" sx={{color: 'white'}} className="button" onClick={() => supabase.auth.signOut()}>
                          Sign Out
                        </button>
                      </div>
          
                      </MenuItem>
                    </Menu>
                  </div>
                </li>

                <li>
                    <Search/>
                </li>
                <li>
                       <Typography variant="body2" gutterBottom>
                          {date} {time}
                        </Typography>
                </li>
            </ul>
        </div>
      </Box>

      <div>
        <div id="title-container">
          <div className="flex-container">
              <div>
                  <Draggable>
                    <div className="drag-wrapper">
                      <Gallery/>
                    </div>
                  </Draggable>
              </div>

              <div className="aboutimage">
                  <Draggable>
                    <div className="drag-wrapper">
                        <About/>
                    </div>
                  </Draggable>
              </div>
          </div>
          
          <div>
            <Draggable>
              <div className="drag-wrapper">
                <Music />
              </div>
            </Draggable>
          </div>


          <div>
            <Draggable>
              <div className="drag-wrapper">
                <Insta />
              </div>
            </Draggable>
          </div>
        </div>

        <div className="fav-container"> 
          <Draggable>
          <div className="drag-wrapper">
              <Favourite />
          </div>
          </Draggable>
        </div>

      </div>

      <BottomNavigation className="FooterTag" sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}
        showLabels >
        <BottomNavigationAction sx={{bottom: 37,}} label="briq FM" icon={  <Music /> } />
        <BottomNavigationAction sx={{bottom: 37,}} label="briq Art" icon={ <Gallery/> } />
        <BottomNavigationAction sx={{bottom: 37,}} label="Instagram" icon={   <Insta /> } />
      </BottomNavigation>
    </>
  )
}

export default Home

