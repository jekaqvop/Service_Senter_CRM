import React from 'react';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import { useState, useEffect } from 'react';
import axios from '../../api/axios';
import { withStyles } from "@material-ui/core/styles"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faCheck,
	faTimes,
	faInfoCircle,
} from '@fortawesome/free-solid-svg-icons';
import './AddService.css';
import ImageUploading from "react-images-uploading";
import Button from '@material-ui/core/Button';

const styles = theme => ({
    dialogCustomizedWidth: {
      'max-width': '80%',
      'height': '90%',
    }
  });  
 const SERVICES_URL = "/api/private/Services"
const AddServices = (props) => {
  const serviceRef = React.useRef(null);
  const [title, setTitle] = useState('');
	const [validTile, setvalidTile] = useState(false);	
	const [titleFocus, setTitleFocus] = useState(false);

	const [price, setPrice] = useState('');
	const [validPrice, setValidPrice] = useState(false);
	const [priceFocus, setPriceFocus] = useState(false);
	
	const [description, setdescription] = useState('');
	const [validDescription, setvalidDescription] = useState(false);
	const [descriptionFocus, setdescriptionFocus] = useState(false);

  const [images, setImages] = useState([]);

  const maxNumber = 15;


  const handleClose = () => {
    props.setOpen(false);
  };

  const NUMBERS_REGEX = /^\d+$/;
  const TITLE_REGEX = /^[A-zА-я\s\(\)]{5,50}$/; 
  const DESCRIPTION_REGEX = /^[^_]{5,20000}$/;

  const handleSubmit = async () => {		
    const v1 = NUMBERS_REGEX.test(price);	
		
		if (!v1) {
			props.showToast("warning", 'Цена должна быть численной.');
			return;
		}
    let serviceFile = new FormData();
    var i = 0;
    function dataURLtoFile(dataurl, filename) {
      var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
          bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
      while(n--){
          u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], filename, {type:mime});
  }
  
    images.forEach(element=>{
      var fileType = element.data_url.substring("data:image/".length, element.data_url.indexOf(";base64"));
      var file = dataURLtoFile(element.data_url, i + '.' + fileType);
      serviceFile.append('images[' + i + ']', file);
      i += 1;
    });
    
    
    serviceFile.append('title', title);
    serviceFile.append('description', description);
    serviceFile.append('price', price);
		try {
			const response = await axios.post(
				SERVICES_URL,
				serviceFile,
				{
					headers: { 'Content-Type': 'application/json' },
					withCredentials: true,
				}
			);	
      if(response?.data === "Такого пользователя не существует!")
        props.showToast("error", 'Такого пользователя не существует!');
      else if(response?.data === "Ошибка получения доступа!")
        props.showToast("error", 'Ошибка получения доступа!');
      else{
        setTitle('');
        setPrice('');
        setdescription('');
        setImages([]);      
        handleClose();
        props.loadservices();
        props.showToast("success", 'Услуга добавлена!');
      }   
     
		} catch (err) {
			if (!err?.response) {
				props.showToast("error", 'Сервер недоступен. Попробуйте позже.');
			} else if (err.response?.status === 409) {
				props.showToast("error", 'Такая почта или номер телефона уже используются.');
			} else {
				props.showToast("error", 'Возникла ошибка при добавлении услуги!');
			}			
		}
	};
  
  useEffect(()=>{
    setValidPrice(NUMBERS_REGEX.test(price));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [price]);

  useEffect(()=>{
    setvalidTile(TITLE_REGEX.test(title));
       // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title]);
  
  useEffect(()=>{    
      setvalidDescription(DESCRIPTION_REGEX.test(description));   
       // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [description]);


  const onChange = (imageList, addUpdateIndex) => {
    setImages(imageList); 
  };

  return (
    <div id='height-max90'>    
        <Dialog
        fullWidth
        classes={{ paperFullWidth: props.classes.dialogCustomizedWidth }}
         open={props.open} onClose={handleClose}>
          <DialogTitle>
            Добавить новую услугу
          </DialogTitle>
          <DialogContent>
         
          <section id='height-max80'>           
            <form id='height-max90'>   
              <div className="text-field">
              <label htmlFor="title" className="text-field__label" >
                Название
                <FontAwesomeIcon
                  icon={faCheck}
                  className={validTile ? 'valid' : 'hide'}
                />
                <FontAwesomeIcon
                  icon={faTimes}
                  className={validTile || !title ? 'hide' : 'invalid'}
                />
              </label>
              <input
                className="text-field__input" type="text" name="title" id="title" placeholder="Заголовок"  
                autoComplete="off"
                ref={serviceRef}
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                required
                aria-invalid={validTile ? 'false' : 'true'}
                aria-describedby="uidnote"
                onFocus={() => setTitleFocus(true)}
                onBlur={() => setTitleFocus(false)}
              />
              <p
                id="uidnote"
                className={
                  titleFocus && title && !validTile ? 'instructions' : 'offscreen'
                }
              >
                <FontAwesomeIcon icon={faInfoCircle} />
                Длина заголовка должна быть не больше 50 символов.
              </p>
              </div>

              <div className="text-field">
              <label htmlFor="price" className="text-field__label" >
                Цена
                <FontAwesomeIcon
                  icon={faCheck}
                  className={validPrice ? 'valid' : 'hide'}
                />
                <FontAwesomeIcon
                  icon={faTimes}
                  className={validPrice || !price ? 'hide' : 'invalid'}
                />
              </label>
              <input
                className="text-field__input" type="text" name="price" id="price" placeholder="200р"  
                autoComplete="off"
                ref={serviceRef}
                onChange={(e) => setPrice(e.target.value)}
                value={price}
                required
                aria-invalid={validPrice ? 'false' : 'true'}
                aria-describedby="uidnote"
                onFocus={() => setPriceFocus(true)}
                onBlur={() => setPriceFocus(false)}
              />
              <p
                id="uidnote"
                className={
                  priceFocus && price && !validPrice ? 'instructions' : 'offscreen'
                }
              >
                <FontAwesomeIcon icon={faInfoCircle} />
                Должно быть численное значение.
              </p>
              </div>

              <div id='height-max90' className="text-field">
              <label htmlFor="description" className="text-field__label" >
                Описание
                <FontAwesomeIcon
                  icon={faCheck}
                  className={validDescription ? 'valid' : 'hide'}
                />
                <FontAwesomeIcon
                  icon={faTimes}
                  className={validDescription || !description ? 'hide' : 'invalid'}
                />
              </label>
              <textarea  
                className="text-field__input" type="text" name="description" id="description" placeholder="Описание"
                autoComplete="off"
                ref={serviceRef}
                onChange={(e) => setdescription(e.target.value)}
                value={description}
                required
                aria-invalid={validDescription ? 'false' : 'true'}
                aria-describedby="uidnote"
                onFocus={() => setdescriptionFocus(true)}
                onBlur={() => setdescriptionFocus(false)}
              />
              <p
                id="uidnote"
                className={
                  descriptionFocus && description && !validDescription ? 'instructions' : 'offscreen'
                }
              >
                <FontAwesomeIcon icon={faInfoCircle} />
               Максимальная длина описания 20000 симоволов.
              </p>  
              </div>   
            </form>
          </section>
          <ImageUploading
        multiple
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}
        dataURLKey="data_url"
        
      >
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps
        }) => (
          // write your building UI
          <div  className="upload__image-wrapper">
            <button
                className="MuiButtonBase-root MuiButton-root MuiButton-text MuiButton-textPrimary"
                                    color="primary"
              style={isDragging ? { color: "red" } : null}
              onClick={onImageUpload}
              {...dragProps}
            >
              Click or Drop here
            </button>
            &nbsp;
            <button className="MuiButtonBase-root MuiButton-root MuiButton-text MuiButton-textPrimary"
                                     onClick={onImageRemoveAll}>Remove all images</button>
            <div className='images-added'>
            {imageList.map((image, index) => (
              <div key={index} className="image-item">
                <img src={(image.data_url)} alt="" width="100" />
                <div className="image-item__btn-wrapper">
                  <button 
                className="button is-small is-outlined is-primary"
                                    color="primary" onClick={() => onImageUpdate(index)}>Update</button >
                  <button 
                className="button is-small is-outlined is-primary"
                                    color="primary"  onClick={() => onImageRemove(index)}>Remove</button >
                </div>
              </div>
            ))}
            </div>
          </div>
        )}
      </ImageUploading>
 
        </DialogContent>
        <DialogActions>
          <Button  onClick={handleClose} color="primary">
           Close
          </Button>
          <Button disabled={!validTile || !validPrice || !validDescription ? true : false}
                  onClick={handleSubmit} color="primary" autoFocus>
           Добавить новую услугу
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
  
export default withStyles(styles)(AddServices);