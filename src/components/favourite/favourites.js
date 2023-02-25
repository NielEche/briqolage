import React, { useState, useEffect, useCallback } from 'react'
import { client } from '../../client'
import '../../styles/screen.css';
import FAVGallery from './FavGallery.js';


const Artworks = () => {
  const [isArtworkLoading, setIsArtworkLeading] = useState(false)
  const [artworkImages, setArtworkImages] = useState([])
	const [favourites, setFavourites] = useState([]);

  // TODO: This code is repeated in another component. Can we clean it up?
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

  // TODO: This code is repeated in another component. Can we clean it up?
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
	};

  const removeFavouriteArt = (slide) => {
		const newFavouriteList = favourites.filter(
			(favourite) => favourite.id !== slide.id
		);

		setFavourites(newFavouriteList);
		saveToLocalStorage(newFavouriteList);
	};

 
  return (

    <>
    <div className='Gallery'>
     <FAVGallery
        artworkImages={favourites}
        handleFavouritesClick={removeFavouriteArt}
      />
    </div>
    </>
  )
}

export default Artworks