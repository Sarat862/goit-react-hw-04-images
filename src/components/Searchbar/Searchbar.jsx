import { Component } from 'react';
import css from './Searchbar.module.css';
import { toast } from 'react-toastify';
import { FcSearch } from 'react-icons/fc';

export class Searchbar extends Component {

    state = {
        imageName: ''
    }

    hadleChange = evt => {
        this.setState({
            imageName: evt.target.value.toLowerCase()
        })
    }

    handleSubmit = evt => {
        evt.preventDefault();

        if (this.state.imageName.trim() === '') {
            return toast.error("Please, put search query!");
        }
        this.props.onSubmit(this.state.imageName);
        this.setState({ imageName: '' });
    }

    render() {
        return (
            <header className={css.searchbar}>
                <form className={css.searchForm} onSubmit={this.handleSubmit}>
                    <button type="submit" className={css.searchForm__button}>
                        <span className={css.searchForm__buttonLabel}><FcSearch size={30}/></span>
                    </button>

                    <input
                        className={css.searchForm__input}
                        type="text"
                        value={this.state.imageName}
                        autoComplete="off"
                        autoFocus
                        placeholder="Search images and photos"
                        onChange={this.hadleChange}
                    />
                </form>
            </header>
    )
  }
}
