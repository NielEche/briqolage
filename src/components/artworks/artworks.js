import React, { useState, useEffect, useCallback } from 'react'
import { client } from '../../client'
import '../../styles/screen.css';
import IMGGallery from './IMGGallery.js';
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import AddFavourites from './AddFavourites';
import RemoveFavourites from './RemoveFavourites';

import IntroScreen from './intro-screen';
import helpers from '../../utils/helpers';

const Artworks = () => {
  const [isArtworkLoading, setIsArtworkLeading] = useState(false)
  const [artworkImages, setArtworkImages] = useState([])
	const [favourites, setFavourites] = useState([]);
  const [open, setIsShown] = useState(false);

  const cleanUpArtworkImages = useCallback((rawData) =>  {
    const cleanArtworks = rawData.map((gallery) => {
      const {sys, fields} = gallery
      const {id} = sys
      const galleryTitle = fields.title
      const galleryDescription = fields.description
      const galleryImage = fields.image.fields.file.url
      const updatedArtworks = {id, galleryTitle, galleryDescription, galleryImage}
      return updatedArtworks

    })

    setArtworkImages(cleanArtworks)
  }, [])

  const getArtworkImages = useCallback(async () => {
    setIsArtworkLeading(true)
      try {
        const response = await client.getEntries({ content_type: 'artworks' })
        const responseData = response.items
        if (responseData) {
          cleanUpArtworkImages(responseData)
        } else {
          setArtworkImages([])
        }
        setIsArtworkLeading(false)
      } catch (error) {
        console.log(error)
        setIsArtworkLeading(false)
      }
    }, [cleanUpArtworkImages])

  useEffect(() => {
    getArtworkImages()
  }, [getArtworkImages])




  // only run once the first time this component is rendered
  useEffect(() => {
		const ArtFavourites = JSON.parse(
			localStorage.getItem('briq-app-favourites')
		);

		if (ArtFavourites) {
			setFavourites(ArtFavourites);
		}
	}, []);


  // run every time our art state changes
  const saveToLocalStorage = (items) => {
		localStorage.setItem('briq-app-favourites', JSON.stringify(items));
	};

  const addFavouriteArt = (slide) => {
		const newFavouriteList = [...favourites, slide];
		setFavourites(newFavouriteList);
		saveToLocalStorage(newFavouriteList);
    setIsShown(true);
	};

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setIsShown(false);
  };

  const [ isExploreClicked, setIsExploreClicked ] = useState(false)

  const { getRandomItem } = helpers
  const bgImage = artworkImages.length > 0 ? getRandomItem(artworkImages).galleryImage : null
 
  return (  
    <>
    {
      isExploreClicked ?
        <div className="Gallery">
            <IMGGallery
              artworkImages={artworkImages}
              handleFavouritesClick={addFavouriteArt}
              favouriteComponent={AddFavourites}
            />
        </div>
        :
        <IntroScreen 
          isExploreClicked={isExploreClicked}
          setIsExploreClicked={setIsExploreClicked} 
          bgImage={bgImage}
        />
    }


          {/* show alert on favourite */}
         
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
            Favourited successfully
          </Alert>
        </Snackbar>

    </>
  )
}

export default Artworks