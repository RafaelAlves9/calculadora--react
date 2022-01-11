export default props => {
    //definindo as classes CSS que serão utilizadas no JSX
    let classes = 'square '
    classes += props.operation ? 'operation' : ''
    classes += props.double ? 'double' : ''
    classes += props.triple ? 'triple' : ''
    classes += props.ac ? 'ac' : ''

    return (
        <button
            //definindo evento "click" que retornará o elemento label
            onClick={e => props.click(props.label)}
            //as classes CSS serão as definidas na variável 'classes'
            className={classes}
            //conteúdo desse componente
            >{props.label}
        </button>
    )
}