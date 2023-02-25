import React, { useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const SetFavourite = ({ artworkData }) => {

	const favourites = JSON.parse(localStorage.getItem('briq-app-favourites'));

	const saveToLocalStorage = (items) => {
		localStorage.setItem('briq-app-favourites', JSON.stringify(items));
	};

  	const addToFavourites = (slide) => {
		const newFavouriteList = [...favourites, slide];
		// setFavourites(newFavouriteList);
		saveToLocalStorage(newFavouriteList);
	};

  	const removeFromFavourites = (slide) => {
		const newFavouriteList = favourites.filter(
			(favourite) => favourite.id !== slide.id
		);

		// setFavourites(newFavouriteList);
		saveToLocalStorage(newFavouriteList);
	};

	const favouriteIds = favourites ? favourites.map(artwork => artwork.id) : [];

	const { id } = artworkData

	const isFavourite = favouriteIds.includes(id)

	const favouriteColor = 'red'
	const defaultColor = 'gray'

	const [open, setIsShown] = useState(false);
	const [alertMessage, setAlertMessage] = useState(null)

	const toggleFavourites = (event) => {
		const svgStyle = event.target.parentElement.style
		let message;

		if(isFavourite){
			removeFromFavourites(artworkData)
			svgStyle.fill = defaultColor
			message = 'Removed from Favourites'
		} else {
			addToFavourites(artworkData)
			svgStyle.fill = favouriteColor
			message = 'Added to Favourites'
		}

		setIsShown(true)
		setAlertMessage(message)
	}

	// Alert

	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
		  return;
		}
	
		setIsShown(false);
	  };

	const Alert = React.forwardRef(function Alert(props, ref) {
		return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
	});

	return (
		<>
			<svg
				width='1em'
				height='1em'
				viewBox='0 0 16 16'
				class='bi bi-heart-fill'
				fill={ isFavourite ? favouriteColor : defaultColor }
				xmlns='http://www.w3.org/2000/svg'
				onClick={(event) => toggleFavourites(event)}
			>
				<path
					fill-rule='evenodd'
					d='M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z'
				/>
			</svg>

			{/* show alert on favourite */}
         
			<Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
				<Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
					{alertMessage}
				</Alert>
			</Snackbar>
		</>
	);
};

export default SetFavourite;
