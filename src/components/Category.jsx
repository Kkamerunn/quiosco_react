import useQuiosco from "../hooks/useQuiosco"

const Category = ({category}) => {

    const { icon, id, name } = category
    const { handleClickCurrentCategory, currentCategory } = useQuiosco()

    return (
        <div className={`${currentCategory.id === id ? 'bg-amber-400' : 'bg-white'} flex items-center gap-4 border w-full p-3 hover:bg-amber-400 cursor-pointer`}>
            <img
                src={`img/icono_${icon}.svg`}
                alt="Image icon"
                className="w-12"
            />
            <button
                className="text-lg font-bold cursor-pointer truncate"
                type="button"
                onClick={() => handleClickCurrentCategory(id)}
            >{name}</button>
        </div>
    )
}

export default Category