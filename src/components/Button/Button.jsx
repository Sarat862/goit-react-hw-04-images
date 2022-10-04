import css from './Button.module.css'

export function Button({loadMore}) {
    return (
      <div className={css.wrapper}>
        <button className={css.button} type="button" onClick={()=>loadMore()}>load more</button>        
      </div>
  )
}
