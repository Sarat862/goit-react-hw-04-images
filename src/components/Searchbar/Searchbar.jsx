import PropTypes from 'prop-types';
import { useState } from 'react';
import css from './Searchbar.module.css';
import { toast } from 'react-toastify';
import { FcSearch } from 'react-icons/fc';

export function Searchbar({onSubmit}) {

    const [imageName, setImageName] = useState('');

    const handleChange = evt => {
        setImageName(evt.target.value.toLowerCase());
    }

    const handleSubmit = evt => {
        evt.preventDefault();

        if (imageName.trim() === '') {
            return toast.error("Please, put search query!");
        }
        onSubmit(imageName);
        setImageName('');
    }

    return (
        <header className={css.searchbar}>
            <form className={css.searchForm} onSubmit={handleSubmit}>
                <button type="submit" className={css.searchForm__button}>
                    <span className={css.searchForm__buttonLabel}><FcSearch size={30}/></span>
                </button>

                <input
                    className={css.searchForm__input}
                    type="text"
                    value={imageName}
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                    onChange={handleChange}
                />
            </form>
        </header>
    )
}

Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
}